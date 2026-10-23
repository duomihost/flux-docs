# 构建依赖维护

本项目部署静态页面；依赖审计还会覆盖构建、文档搜索索引和本地开发服务器。升级后的类型检查、构建与离线回归是兼容性证据，不代表生产页面或真实客服接口验收。

## 2026-10-23 修正基线

- Docusaurus 同组包统一为 3.10.2；本地搜索插件为 0.55.3，锁文件内其他依赖在原有兼容范围内更新。
- checkout v7.0.1、setup-node v7.1.0 固定到官方发布提交 SHA，均使用 Node 24 运行时；项目 Node 22、完整 Git 历史、npm 缓存和验证顺序保持原约定。
- Node 最低要求为 20.19，覆盖下述依赖在 CommonJS 中加载 ESM 的要求；维护和 CI 使用 Node 22。

## 定向覆盖

以下是上游依赖范围尚未接纳的补丁版本，由 `package.json` 的 `overrides` 固定；不使用强制降级或忽略审计。待调用方接纳修补版本后，可在完整回归下移除对应覆盖。

| 依赖 | 固定版本与调用范围 | 兼容性依据 |
| --- | --- | --- |
| tinypool | 2.2.0 | [原型污染修补](https://github.com/advisories/GHSA-85c8-ppgw-ccpr)；保留 Docusaurus 使用的 worker 身份、workerData、资源回收与任务接口，隔离测试实际创建 worker 并验证继承 filename 被忽略。 |
| serialize-javascript | 7.1.3 | [序列化修补](https://github.com/advisories/GHSA-qj8w-gfj5-8c6v)；保留复制与 CSS 压缩插件的 CommonJS 函数入口，测试伪数组不会无界循环及脚本结束标签转义。 |
| postcss-selector-parser | 7.1.7 | [选择器解析修补](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)；保留 PostCSS 调用接口，由实际样式构建与站点回归覆盖。 |
| sockjs → uuid | 11.1.1 | [UUID 修补](https://github.com/advisories/GHSA-w5hq-g745-h8pq)；仅覆盖 SockJS 使用的 CommonJS `v4` 入口，避免改用只有 ESM 入口的新主版本。 |
| cheerio → encoding-sniffer | 1.0.2 | 保留搜索插件使用的解码入口，移除已弃用的 whatwg-encoding；离线验证 CommonJS 加载及 UTF-8 中文解码。 |

## braces 临时防护与审计残留

[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) 影响截至本次核查的全部 braces 稳定版；官方最新版本为 3.0.3，没有已发布修补版本。

`scripts/patch-build-dependencies.mjs` 在安装、启动和构建时为锁文件内每个 braces 3.0.3 安装位置应用最小防护，保留原包名称、版本与 `fill-range` 依赖：

- 字符串解析在创建花括号或圆括号容器前检查深度；`compile`、`expand`、`stringify` 对字符串解析结果及直接传入的 AST 都先作迭代预检，随后才递归处理。AST 根深度为 0、最大深度为 128；字符串最多嵌套 127 个容器，为叶节点预留一层。
- 预检仅沿 `nodes` 子节点边遍历，检测活动路径循环，累计访问最多 65536 次。合法共享叶节点及解析器正常生成的 `parent` / `prev` 回链仍受支持；重复访问共享子树也计入预算，避免有限深度的共享 DAG 带来指数遍历。用于遍历的子节点集合必须为数组。
- 超限、循环或非法节点以带 `ERR_BRACES_COMPLEXITY` 的 `SyntaxError` 拒绝。调用参数中的 `maxDepth: Infinity` 或 `NaN` 不能关闭防护。
- 展开队列按实际子节点遍历传递，不读取外部 `parent` 元数据或其队列，避免父引用循环。引号、范围和原有 AST 修改语义保持原版行为；不混入其他解析行为修正。

脚本逐一核对 `parse.js`、`compile.js`、`expand.js`、`stringify.js` 和新增 `depth-guard.js` 的固定 SHA-256；在所有安装位置全部核验通过后才开始写入，写入后再次核对摘要。允许从原版、上一轮已知字符串补丁或本轮补丁状态迁移，重复执行不会重写已匹配的文件。上游版本、任何受影响源码或补丁结果发生未知变化时立即失败，要求重新审查。

深度和迭代 AST 预检、展开队列处理参考 [上游 PR 82 的固定提交](https://github.com/micromatch/braces/tree/1f11eb558be9ea0cda87861408bb766e2e714086)，以发布版 3.0.3 为基线单独移植；没有直接采用该分支中的引号和范围行为改动。预检源码放在 `scripts/patches/braces-3.0.3/depth-guard.cjs`，原版 MIT 许可证保留在同目录 `LICENSE`，期望摘要固定在补丁脚本中。

`scripts/braces-safety.test.mjs` 将恶意输入置于独立 Node 子进程中，以 8 秒超时、128 MiB 堆上限防止测试进程被拖死；覆盖 4000 层字符串、12000 层 AST、子节点循环、共享 DAG、节点访问预算及异常父引用。另以 `--stack-size=256` 检查 40 组深度边界，31 组原版正常模式保留 93 项输出断言，并测试每个受影响文件的漂移、嵌套安装位置、核验先于写入及幂等性。

防护针对本 advisory 及上述 AST 遍历问题；它不新增展开结果总量预算，也不承诺处理任意 Proxy/getter 的执行副作用。`rangeLimit` 及笛卡尔积输出的既有行为保持不变。

此补丁不伪造上游版本号，也不删除 advisory。升级后原始 npm 审计仍可能报告 30 项 high 依赖计数，根因全部是这一个未发布修补版本的 advisory，不能把它们误报为 30 个独立漏洞，也不能声称 npm 审计已清零。其他 advisory 已通过兼容更新和定向覆盖处理；当次实际结果应以完整审计报告为准。

上游发布修补版本后，应复核其是否覆盖字符串及直接 AST 入口，再更新锁文件、移除临时补丁、补丁资产及对应脚本调用，重跑依赖兼容、类型检查、构建和客户端清单回归。上游剩余项继续在 [#20](https://github.com/duomihost/flux-docs/issues/20) 跟踪。

## 验证顺序

```bash
npm ci
npm run typecheck
npm run build
npm test
```

`npm ci` 的 postinstall 会应用防护；正常构建也会再次核验。不要将 `--ignore-scripts` 当作可交付安装方式。安全测试只运行本地 worker、假输入与构建文件，不连接生产网站。依赖审计通过包注册表 API 获取 advisory，和网页/业务接口探测分开执行。

缓存完整时可用 `npm ci --offline --fund=false` 验证离线干净安装。离线安装即使显示 `found 0 vulnerabilities`，也不能作为实时审计结果；应另行执行完整 `npm audit --json` 取得注册表的 advisory 与真实计数。本轮完整审计仍为 30 high，均来自上述同一个 advisory。

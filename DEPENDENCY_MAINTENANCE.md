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

`scripts/patch-build-dependencies.mjs` 在安装、启动和构建时为锁文件内的 braces 3.0.3 解析器添加深度限制：花括号和圆括号形成的解析栈不超过 128 层，超限在递归遍历前抛出可识别的 `SyntaxError`。普通模式保持原行为；该防护针对本构建链的字符串模式解析，不把它描述为上游库所有 API 的正式修复。

脚本逐一核对实际版本与原始文件 SHA-256，写入后也要求固定摘要；重复执行可核验已补丁文件。上游版本或文件变化立即失败，要求维护者重新审查，不能静默跳过。离线测试先复现 4000 层模式的栈溢出，再验证限制生效、普通模式兼容以及版本/源码漂移被拒绝。

此补丁不伪造上游版本号，也不删除 advisory。升级后原始 npm 审计仍可能报告 30 项 high 依赖计数，根因全部是这一个未发布修补版本的 advisory，不能把它们误报为 30 个独立漏洞，也不能声称 npm 审计已清零。其他 advisory 已通过兼容更新和定向覆盖处理；当次实际结果应以完整审计报告为准。

上游发布修补版本后，应更新锁文件、移除临时补丁及对应脚本调用，再运行依赖兼容、类型检查、构建和客户端清单回归。上游剩余项继续在 [#20](https://github.com/duomihost/flux-docs/issues/20) 跟踪。

## 验证顺序

```bash
npm ci
npm run typecheck
npm run build
npm test
```

`npm ci` 的 postinstall 会应用防护；正常构建也会再次核验。不要将 `--ignore-scripts` 当作可交付安装方式。安全测试只运行本地 worker、假输入与构建文件，不连接生产网站。依赖审计通过包注册表 API 获取 advisory，和网页/业务接口探测分开执行。

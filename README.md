# Paxora Docs

Paxora 客户端与服务使用文档，仓库名为 `flux-docs`，基于 Docusaurus 3.10.1，部署到 Cloudflare Pages。

## 本地开发与验证

使用 Node 22（见 `.node-version`）与锁文件安装依赖：

```bash
npm ci
npm run start
```

完整验证顺序：

```bash
npm run typecheck
npm run build
npm test
```

`build` 先生成五个平台的更新日志页面，再编译站点，最后生成客户端清单，输出到 `build/`。
`npm test` 包含清单校验反例、隔离的客服脚本测试、站点元数据及更新日志回归；部分测试读取生成的页面和清单，需先构建。
测试使用假浏览器对象或本地文件，不连接真实客服、分析或业务接口。

只验证清单解析与客服加载逻辑时可运行：

```bash
node --test scripts/feed-validation.test.mjs scripts/crisp.test.mjs
```

## Cloudflare Pages

```text
Framework preset: Docusaurus
Production branch: main
Build command: npm run build
Build output directory: build
Root directory: /
Environment variable: NODE_VERSION=22
```

推送 `main` 会触发现有自动部署。GitHub Docs CI 在完整 Git 历史下依次执行依赖安装、类型检查、构建和测试。

文档的“最后更新于”来自 Git 的文件修改记录，不使用构建日期。CI 已配置 `fetch-depth: 0`；其他构建环境也应保留完整历史，浅克隆需在构建前补齐历史，避免将检出提交时间误当成文档修改时间。生成的平台更新日志页继承手写总览源的 Git 修改时间；没有 Git 的源码归档使用内容的最新记录日期。

## 客服与页面反馈配置

### Crisp 在线客服

站点配置显式指定现有 Paxora 客服站点，未提供环境变量时沿用该默认站点。可通过环境变量覆盖：

```text
CRISP_WEBSITE_ID=<站点 ID>
```

显式设置 `CRISP_WEBSITE_ID` 为空字符串可在预览或其他环境关闭客服和欢迎脚本；部署平台如不能保存空字符串，可在构建命令中使用 `CRISP_WEBSITE_ID='' npm run build`。
`Root` 只使用传入配置，没有隐藏的站点回退；脚本在客户端挂载后加载，重复挂载不会重复注入。

### PostHog 可选反馈统计

“此页面是否有用？”会按文档路径保存本机选择；未配置统计服务时也可使用。需要统计时设置：

```text
POSTHOG_PROJECT_API_KEY=<公开项目 token>
POSTHOG_HOST=https://us.i.posthog.com
```

EU Cloud 使用 `https://eu.i.posthog.com`，自托管使用对应地址。事件名为 `docs_feedback`，属性包含 `path` 与 `vote`，禁用 person profile 处理；网络或本地存储失败不阻断页面。

## 文档与导航

当前发布内容以 `sidebars.ts` 和 `docusaurus.config.ts` 为准：

| 源目录 | 发布内容 |
| --- | --- |
| `docs/getting-started/`、`docs/intro.md` | 客户端选择、下载与首次连接 |
| `docs/installation/` | Windows、macOS、Android、Linux 官方客户端及 iOS 第三方使用说明 |
| `docs/third-party/` | 按平台组织的第三方客户端与路由器插件教程 |
| `docs/subscription/`、`docs/nodes/choose-node.md` | 订阅、节点选择与流量倍率 |
| `docs/troubleshooting/`、`docs/support/` | 常见问题、反馈、联系入口和服务条款 |
| `docs/announcements/`、`docs/changelog/` | 独立导航与侧栏的公告、客户端更新日志 |

`api/`、`faq/`、`legal/` 等历史源文件以及配置 `exclude` 中列出的单篇文件保留在仓库，未编译为当前站点页面。博客已禁用。
Linux 教程面向 Ubuntu 24.04 GNOME 的 amd64/arm64 `.deb`，复用官方下载目录中的 Paxora-Linux 文件夹；具体安装要求见教程，不自行拼接未经核实的直接下载地址。

## 公告与更新日志（客户端同步）

写作规则、清单字段、兼容性以及与客户端和构造器的分工统一以 [FEED_CONTRACT.md](./FEED_CONTRACT.md) 为准。

- 公告源：`docs/announcements/<年份>.md`。
- 更新日志唯一手写源：`docs/changelog/index.md`。
- Windows、macOS、Android、iOS、Linux 五个平台页由 `scripts/build-changelog-pages.mjs` 生成，不入库、不手改。
- 完整构建后产出 `build/announcements/index.json`、`build/changelog/index.json` 及对应 HTML 片段；字段、地址和合法条目 ID 保持兼容。
- `npm run feeds` 可单独重建清单（需已有 `build/`），同样执行日期、重复标识和更新日志格式校验；英文清单仅在预留翻译源存在时生成。

## 阅读设置与样式

导航栏“阅读设置”统一提供浅色、深色、跟随系统主题，海港蓝（默认 Harbor）、极光绿（Aurora）、石墨（Graphite）、珍珠（Pearl）四种配色，以及小（14px）、标准（默认 15px）、大（17px）三档字号。

配色与字号在当前浏览器持久化，并在多标签页间同步。字号使用 `flux-docs-font-size` 存储键；禁用本地存储时仍可调整当前页面。正文、标题和代码随字号缩放，导航保持 14px；公告与日志保留紧凑比例。设置只改变网页显示，不改变客户端清单内容。

配色变量定义在 `src/css/custom.css`。页面样式包含 React Native 主题移植与项目覆盖；修改时保留小字号和用户偏好，不把框架构建成功等同于视觉验收。

移动端页脚在 601–996px 使用三列，600px 及以下使用“产品 / 支持”双列，第三方客户端独立分组；链接触控高度至少 44px。代码与构建验证不替代视觉或真实安装验收。

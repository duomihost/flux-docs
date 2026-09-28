# Flux Docs

Flux official documentation site built with [Docusaurus](https://docusaurus.io/).

## Local Development

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```

The static output is generated in the `build` directory.

## Color Palette

The active site palette is defined in `src/css/custom.css` as Flux-specific
CSS variables. Visitors can switch palettes from the navbar color button next
to the light/dark toggle. The default palette is **Harbor**, tuned for a clean
technical docs feel:

```text
Background: #f8fbff / #ffffff
Text:       #172033 / #5f6b7a
Link:       #0b6f91 / #085a78
Accent:     #0ea5c6
```

Alternative combinations that work with the same variables:

```text
Aurora
Background: #f7f9f6 / #ffffff
Text:       #1f2937 / #5f6f62
Link:       #16725f / #115e50
Accent:     #65a30d

Graphite
Background: #f7f7f8 / #ffffff
Text:       #18181b / #62616a
Link:       #315f9f / #244c82
Accent:     #7c3aed

Pearl
Background: #fbfaf7 / #ffffff
Text:       #24201a / #6e6254
Link:       #a14d18 / #7c3a13
Accent:     #0f766e
```

## Cloudflare Pages

Recommended build settings:

```text
Framework preset: Docusaurus
Production branch: main
Build command: npm run build
Build output directory: build
Root directory: /
Environment variable: NODE_VERSION=22
```

### Optional PostHog feedback analytics

The "Was this page useful?" control works without analytics. To collect
aggregated feedback in PostHog, set these Cloudflare Pages environment
variables:

```text
POSTHOG_PROJECT_API_KEY=<your public PostHog project token>
POSTHOG_HOST=https://us.i.posthog.com
```

Use `https://eu.i.posthog.com` for EU Cloud, or your own domain for a
self-hosted PostHog instance. Feedback is sent as the `docs_feedback` event
with `path` and `vote` properties, and person profile processing is disabled.

### Optional Crisp customer support

To enable the Crisp chat widget, set this Cloudflare Pages environment
variable:

```text
CRISP_WEBSITE_ID=<your Crisp website id>
```

When this value is not configured, the Crisp script is not loaded.

## 公告与更新日志（客户端同步）

公告 `docs/announcements/<年份>.md` 每年一篇；更新日志 `docs/changelog/index.md` 全平台
一篇（版本号各平台统一，不按年份拆分）。每个版本里用三级标题按平台分小节：
`### 全平台` / `### Windows` / `### macOS` / `### Android` / `### iOS`，某平台这版没改动
就不写。构建前 `scripts/build-changelog-pages.mjs` 从它生成四个平台页面
（`docs/changelog/{windows,macos,android,ios}.md`，不入库），每页只含该平台 + 全平台小节。
每个二级标题（`## `）是一条公告 / 一个版本，正文里的日期（如 `2026.08.28`）会被自动识别，
条目里的第一张图片会作为封面图写入清单，供客户端做卡片式展示。
`npm run build` 结束后由 `scripts/build-feeds.mjs` 额外产出：

```text
build/announcements/<年份>.html   正文 HTML 片段，客户端直接渲染
build/announcements/index.json    年份清单 + 每条的标识、标题、日期、封面图、网页锚点、正文 HTML
build/changelog/index.html
build/changelog/index.json    每条版本另带 platforms(按平台拆好的 HTML)与 pages(平台页面地址)
```

同一条公告追加进展时只需在该条正文里补一段带日期的内容，最后更新日期会自动前进，
客户端据此重新提醒。客户端只需拉 `index.json` 即可显示近期公告与最新版本，
历史内容通过条目的 `url` 跳转到文档站网页。单独重新生成可运行 `npm run feeds`（需先有 `build/`）。

## Documentation Structure

```text
docs/
  getting-started/
  installation/
  subscription/
  nodes/
  troubleshooting/
  api/
  faq/
  changelog/
  legal/
```

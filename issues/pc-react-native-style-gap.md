# Issue: PC 端文档页与 React Native 官网风格差异较大

## 背景

目标参考页：<https://reactnative.dev/docs/getting-started>

目标源码仓库：<https://github.com/react/react-native-website>

本项目当前是 Docusaurus 3.10.1 文档站，入口主要是：

- `docusaurus.config.ts`
- `src/css/custom.css`
- `sidebars.ts`

对比后结论：当前差异不是某一个 CSS 变量导致的，而是本项目只做了局部仿制；目标 React Native 官网使用了完整的 Sass 主题、多份样式文件、swizzled theme 组件、官方字体、Algolia DocSearch、自定义 Prism 主题和文档页交互组件。因此 PC 端整体风格会显著偏离。

## 主要差异

### 1. PC 端整体页面容器没有完全对齐目标站

目标站 PC 文档页外层有固定的主内容宽度策略：`.main-wrapper` 最大约 1400px，内部 docs root 居中，桌面端主内容区域按 sidebar 宽度重新计算。

本项目只在 `src/css/custom.css` 里设置了：

- `--doc-sidebar-width: 266px`
- `.navbar__inner { max-width: 1360px; }`
- `main[class^='docMainContainer'] { max-width: calc(100% - var(--doc-sidebar-width) + 44px); }`

缺少目标站 `.main-wrapper`、`docRoot`、`.container` 在 1320px/1416px 等断点下的约束，所以 PC 端左右留白、正文宽度、三栏比例容易与目标站不一致。

本地相关位置：`src/css/custom.css:1`, `src/css/custom.css:92`, `src/css/custom.css:485`

目标参考：`website/src/css/customTheme.scss` 中的 `.main-wrapper`、`@media (max-width: 1416px)`、`@media (max-width: 1320px) and (min-width: 997px)`。

### 2. 字体体系不同，导致视觉气质和行高重量偏差

目标站使用 Meta 的 `"Optimistic Display"` 字体，并在 CSS 中声明了 300/400/500/700 多个字重。

本项目使用：

```css
--ifm-font-family-base: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--ifm-heading-font-weight: 750;
```

这会导致标题更重、正文灰度和行距观感不同。React Native 官网的 PC 端看起来更轻、更松，本项目更像普通 Docusaurus 主题加粗版。

本地相关位置：`src/css/custom.css:20`, `src/css/custom.css:23`, `src/css/custom.css:263`

目标参考：`website/src/css/customTheme.scss` 的 `@font-face` 和 `--ifm-font-family-base`。

### 3. 顶部导航功能结构不同

目标站 PC 顶部导航包含：

- 左侧 React Native logo + `docsVersionDropdown`
- 右侧 `Development` 下拉、Contributing、Community、Showcase、Blog
- GitHub 图标
- 主题切换
- Algolia DocSearch 搜索框

本项目顶部导航是 Flux 业务导航：

- 左侧自定义 `1.0` dropdown
- 右侧 `文档`、安装、订阅、API、更新日志
- GitHub 图标
- localeDropdown
- 使用本地搜索插件生成单独 `/search`，不是目标站 PC 顶栏内的 DocSearch 样式

因此即使颜色接近，PC 顶部区域的信息密度、控件顺序、搜索框形态都会不同。

本地相关位置：`docusaurus.config.ts:57`, `docusaurus.config.ts:82`

目标参考：`website/docusaurus.config.ts` 的 `navbar.items`、`algolia`、`docsVersionDropdown`。

### 4. 搜索实现不同，目标站的右上角搜索框不会自然出现

目标站使用 Docusaurus Algolia DocSearch，桌面端右上角显示圆角搜索框，并带快捷键提示。

本项目使用 `@easyops-cn/docusaurus-search-local`：

```ts
plugins: [
  [
    '@easyops-cn/docusaurus-search-local',
    {
      hashed: true,
      language: ['en', 'zh'],
      indexDocs: true,
      indexBlog: true,
    },
  ],
]
```

这个插件的 DOM、类名和默认样式与 DocSearch 不同，所以目标站截图里的搜索框、快捷键 keycap、弹窗样式不会自动一致。

本地相关位置：`docusaurus.config.ts:57`

目标参考：`website/docusaurus.config.ts` 的 `themeConfig.algolia`，以及 `customTheme.scss` 中大量 `--docsearch-*` 变量。

### 5. Sidebar 结构和层级样式不同

目标站 sidebar 是对象分组结构，例如 `The Basics`、`Environment setup`、`Workflow` 等，每个分组下有二级链接，且目标 CSS 对 level 1 category、level 2 link、collapsed 状态分别设置了字号、字重、padding 和 active 样式。

本项目 sidebar 是 Flux 业务分类，并且多个分类 `collapsed: false`，导致 PC 左侧比目标站更展开、更重、更密：

- `快速开始`
- `安装教程`
- `订阅教程`
- `节点与线路`
- `故障排查`
- `API 文档`
- `FAQ`
- `更新日志`
- `政策`

本地 CSS 只粗略设置 `.menu`、`.menu__link`、`.menu__link--sublist`，没有完整复刻目标站的 `.menu__list .menu__list .menu__link`、category level、collapsed 等嵌套规则。

本地相关位置：`sidebars.ts:3`, `src/css/custom.css:232`

目标参考：`website/sidebars.ts` 和 `website/src/css/customTheme.scss` 的 sidebar/menu 区块。

### 6. 文档页右侧区域缺少目标站的定制组件细节

目标页 PC 右侧有：

- `Copy page` 按钮
- table of contents
- 复制按钮在 article header 和 aside 中有不同位置
- footer edit buttons 和 last updated 元信息

本项目当前没有对应的 swizzled theme 组件目录，例如 `src/theme`；也没有目标站的 `copyPage`、doc footer、edit button 多按钮逻辑。只靠 `custom.css` 无法生成这些 DOM 结构。

本地相关位置：当前没有 `src/theme` 目录；`docusaurus.config.ts:31` 的 `editUrl` 是普通字符串。

目标参考：目标站 live HTML 中存在 `copyPageButton`、`copyPageAsideAction`、`theme-doc-footer-edit-meta-row` 等类名；目标仓库 README 也说明 `website/src/theme` 放置 swizzled React components。

### 7. 正文内容组件只做了基础样式，没有目标站专用 banner/snack/tabs

目标 `getting-started` 页开头有 `.content-banner`，含右侧设备插图 `/docs/assets/p_android-ios-devices.svg`；页面中还有 `.snack-player`、tabs、admonition 等专用样式。

本项目当前通用 CSS 处理了：

- markdown 标题
- blockquote
- table
- code block
- admonition

但没有目标站这些页面级组件样式和内容组件，因此如果本地内容没有使用同样 class 或 MDX 组件，视觉不会接近目标站。

本地相关位置：`src/css/custom.css:263`, `src/css/custom.css:402`

目标参考：`website/src/css/customTheme.scss` 的 `.content-banner`、`.snack-player`、`.tabs`、`.docsRating` 等区块。

### 8. 代码高亮主题不同

目标站使用自定义 Prism 主题：

- `./core/PrismThemeLight`
- `./core/PrismThemeDark`
- 额外语言和 magic comments

本项目使用：

```ts
prism: {
  theme: prismThemes.github,
  darkTheme: prismThemes.dracula,
}
```

代码块边框可以仿，但语法配色、diff 高亮、标题行、magic comment 高亮都会不同。

本地相关位置：`docusaurus.config.ts:162`, `src/css/custom.css:371`

目标参考：`website/docusaurus.config.ts` 的 `prism` 配置和 `customTheme.scss` 的 `.code-add-line` / `.code-remove-line`。

### 9. Announcement bar 文案、字号和间距不同

目标站 announcement bar 文案是 React Conf 2025 keynote，PC 端内容字号约 20px、加粗、line-height 40px、上下 padding。

本项目文案是 Flux 文档站搭建提示，CSS 只设置了背景、颜色、font-weight，并没有目标站对 `announcementBarContent` 的细粒度间距规则。

本地相关位置：`docusaurus.config.ts:75`, `src/css/custom.css:74`

目标参考：`website/src/css/customTheme.scss` 的 `div[class*="announcementBarContent"]`。

### 10. Footer 与目标站差异明显

目标站 footer 有 Meta Open Source logo、四列导航、较小 uppercase 标题、版权文案和外链 icon 样式。

本项目 footer 是 Flux 三列导航，没有 logo，列标题和间距也只用了 Docusaurus 默认加少量颜色覆盖。

本地相关位置：`docusaurus.config.ts:133`, `src/css/custom.css:447`

目标参考：`website/docusaurus.config.ts` 的 `footer.logo` / `footer.links`，以及 `customTheme.scss` 的 `.footer` 区块。

## 造成差异的直接原因

1. 本项目只有单个 `src/css/custom.css`，目标站使用 Sass，并同时加载 `customTheme.scss`、`index.scss`、`showcase.scss`、`versions.scss`。
2. 本项目没有目标站的 `src/theme` swizzled 组件，所以很多目标 DOM 不存在，CSS 无法生效。
3. 本项目没有目标站的 `core` 目录和自定义 Prism 主题。
4. 本项目没有引入 `"Optimistic Display"` 字体资源。
5. 本项目搜索插件与目标站 DocSearch 不同。
6. 本项目 sidebar 数据结构与目标站不同，左侧层级、展开状态和密度天然不同。
7. 本项目是 Flux 业务信息架构，目标站是 React Native 信息架构；如果要视觉高度一致，需要明确哪些业务导航可以保留，哪些要为了仿站调整。

## 建议修复方向

### P0: 明确目标

先确认是要：

- A. 只让 Flux 文档站 PC 端视觉接近 React Native 官网，但保留 Flux 信息架构；
- B. 尽量完整复刻 React Native 官网主题，再替换内容；
- C. 只修当前截图中的几个 PC 端明显差异。

如果目标是 B，需要移植范围会比较大。

### P1: 先对齐主题基础

- 将 `src/css/custom.css` 拆分或重写为更贴近目标站的主题层。
- 补齐 `.main-wrapper`、container、sidebar、TOC、announcement、footer 的 PC 端布局规则。
- 引入目标字体或选择授权清晰的近似字体，并降低标题/菜单字重。

### P2: 再对齐 Docusaurus 配置

- 评估是否从 local search 切换到 Algolia DocSearch，或为 local search 写一套 DocSearch-like 顶栏样式。
- 将普通版本 dropdown 替换为 Docusaurus `docsVersionDropdown` 或仿其 DOM/样式。
- 补充 `showLastUpdateTime`、自定义 edit button、doc footer 等 docs 配置。

### P3: 需要时移植 swizzled 组件

如果必须接近目标站，需要新增 `src/theme`，实现：

- Copy page 按钮
- 文档 footer edit buttons
- 右侧 TOC/复制按钮布局
- 可能的 sidebar item/category label 组件

### P4: 补齐目标页专用组件

- 新增 `.content-banner` 组件/样式和设备插图资源。
- 新增或替代 `.snack-player` 展示区域。
- 对 tabs、admonition、code diff、docs rating 等组件补齐目标站样式。

## 验收标准

- PC 端 1440px/1920px 下，顶部导航高度、最大宽度、搜索框位置、左侧 sidebar 宽度、正文宽度、右侧 TOC 位置与目标页接近。
- 页面使用截图对比时，首屏结构至少包含：announcement bar、dark navbar、左侧 docs sidebar、正文 h1、content banner、右侧 copy page + TOC。
- 字体、字重、正文行高不再明显偏粗或偏重。
- sidebar active、hover、collapsed 状态与目标站接近。
- footer、announcement bar、code block、admonition 的圆角、边框、色值和间距接近目标站。


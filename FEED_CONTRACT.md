# 公告与更新日志的清单契约

本文件是**公告**与**更新日志**数据的唯一约定，涉及三方：flux-docs（文档站，唯一源与校验）、
flux（客户端，展示）、flux-builder（构造器，发布时自动写入更新日志）。三方分工与约束见第 6 节。
任何一方要改格式，先改这里，再改脚本（`scripts/`）、客户端（`lib/services/docs_feed_service.dart`、
`lib/services/update_notes.dart`）和构造器（`changelog-writer.js`）。客户端仓库的《配置下发契约》、
两个仓库的 AI 规则只指向本文件，不另写一份。

## 1. 哪些东西客户端会读

客户端只读两个 JSON 清单，不读网页、不读 Markdown：

| 地址（相对文档站根地址） | 内容 |
| --- | --- |
| `announcements/index.json` | 公告清单，按年份分片 |
| `changelog/index.json` | 更新日志清单，全平台一篇 |

文档站根地址由下发器参数 `docs.base_urls`（地址池，每行一个）下发，客户端按顺序尝试。

### 1.1 语言版本（英文为预留接口）

| 语言 | 清单地址 | 源文件目录 | 页面地址前缀 |
| --- | --- | --- | --- |
| 简体中文（默认） | `changelog/index.json`、`announcements/index.json` | `docs/` | 无 |
| 英文（预留，尚未上线） | `en/changelog/index.json`、`en/announcements/index.json` | `i18n/en/docusaurus-plugin-content-docs/current/` | `/en` |

- 英文源文件结构与中文完全相同（同样的标题、日期、平台小节），「版本：」行写作 `Version: macOS 2026.1008.1005 Beta`；
  解析器两种写法都认。源文件目录不存在时脚本直接跳过，不生成英文清单。
- 客户端界面语言为中文时只请求默认清单；其他语言先请求 `en/…`，404 或解析失败时退回默认清单。
  英文上线只需加源文件（并在 `docusaurus.config.ts` 的 `i18n.locales` 加上 `en` 生成英文页面），客户端无需改版。
- 条目标识只由「分片名 + 标题」生成，中英文同一条的 `id` 相同，未读状态互通。
`*.html` 片段文件同样会生成，但客户端不依赖它们。

页面排版、侧边栏、导航等改动**不影响**客户端。影响客户端的只有：源文件的写作约定（第 2 节）和清单字段（第 3 节）。

## 2. 源文件写作约定

### 2.1 公告 `docs/announcements/<年份>.md`

- 每年一个文件，文件名四位年份。
- 每条公告一个二级标题 `## 标题`，最新的在最上面。
- 正文首行用加粗日期 `**2026.08.28**`；同一条公告追加进展时在正文里再加一段带日期的内容。
- 正文里所有 `YYYY.MM.DD` / `YYYY-MM-DD` 形式的日期都会被识别：最小值为发布日期，最大值为最后更新日期。
- 条目标识由「年份 + 标题」生成，改正文不变，**改标题会被客户端当成新公告**。
- 标题或正文含「紧急 / 重要 / 故障 / 异常 / urgent / important」时客户端按重要公告显示（警告图标）。

### 2.2 更新日志 `docs/changelog/index.md`

- 只手写这一个文件；`windows.md`、`macos.md`、`android.md`、`ios.md` 由脚本生成，不入库、不手改。
- 每期一个二级标题，标题是**发布日期** `## 2026.0904`（年.月日，月日四位）。客户端比对版本只看版本号前两段，所以标题必须是这个格式。
- 标题下第一行加粗完整日期 `**2026.09.04**`。
- 第二行列出各平台完整版本号：`版本：Windows 2026.0904.0811 · macOS 2026.0904.0809 · Android 2026.0904.0809`。
  用 `·` 分隔，平台名后一个空格再接版本号；没出包的平台不写；这一期尚未出包时整行省略。
  测试包在版本号后加 ` Beta`：`版本：Windows 2026.1006.0984 · macOS 2026.1008.1005 Beta`。
  勾选发布的构建由构造器（flux-builder）自动写入这一行和对应平台小节，测试包自动标 Beta，转正时去掉。
- 之后用三级标题按平台分小节：`### 全平台`、`### Windows`、`### macOS`、`### Android`、`### iOS`、`### Linux`。
  三级标题之前的内容归入「全平台」；某平台这期没改动就不写该小节；识别不了的三级标题归入前一个小节。
- 平台名大小写不敏感，允许别名：`通用`/`all` = 全平台，`mac` = macOS，`安卓` = Android，`ipados` = iOS。
- 构建前校验（`scripts/lib/entries.mjs` 的 `validateChangelog`，不通过则构建失败）：列表项之间不得夹空行；
  `2026.1006` 起每期必须有「版本：」行，版本号与标题同一天，写了平台小节的平台必须出现在「版本：」行里。

### 2.3 文案风格

紧凑、精简、专业：一句话说清改了什么、对用户有什么影响；不写内部术语（议题编号、类名、下发器、签名、KV 等）。

## 3. 清单字段

两个清单结构相同，更新日志多几个字段。当前 `version` 为 2。

```json
{
  "version": 2,
  "generated_at": "2026-09-28T06:26:52.874Z",
  "pages": { "windows": "/docs/changelog/windows", "macos": "…", "android": "…", "ios": "…" },
  "parts": [
    {
      "year": 2026,
      "page": "/docs/announcements/2026",
      "html": "announcements/2026.html",
      "entries": [
        {
          "id": "26621259f7a4",
          "title": "2026.0904",
          "published": "2026-09-04",
          "updated": "2026-09-04",
          "image": "/img/x.png",
          "url": "/docs/changelog#20260904",
          "html": "<p>…</p>",
          "versions": { "windows": "2026.0904.0811", "macos": "2026.0904.0809", "android": "2026.0904.0809" },
          "betas": [],
          "platforms": { "all": "<ul>…</ul>", "windows": "<ul>…</ul>" }
        }
      ]
    }
  ],
  "latest": { "…同 entries 里的一条…" }
}
```

| 字段 | 位置 | 说明 | 客户端用途 |
| --- | --- | --- | --- |
| `version` | 顶层 | 清单格式版本，只在字段语义变化时递增 | 兼容判断 |
| `generated_at` | 顶层 | 构建时间，ISO 8601 | 诊断 |
| `pages` | 顶层，仅更新日志 | 各平台页面地址（站内相对路径） | 「查看完整更新记录」外链 |
| `parts[].year` | 分片，仅公告 | 年份 | 分组 |
| `parts[].page` | 分片 | 分片页面地址 | 「历史公告」外链 |
| `parts[].html` | 分片 | 整片 HTML 文件地址 | 不用 |
| `entries[].id` | 条目 | 稳定标识 | 未读红点、去重 |
| `entries[].title` | 条目 | 公告标题 / 更新日志的发布日期 | 显示；更新日志用它与版本号前两段比对 |
| `entries[].published` / `updated` | 条目 | `YYYY-MM-DD`，发布 / 最后更新日期 | 排序、近期筛选、未读判定 |
| `entries[].image` | 条目，可选 | 正文第一张图片 | 预留卡片封面 |
| `entries[].url` | 条目 | 页面地址 + 标题锚点 | 「在文档站查看本条」 |
| `entries[].html` | 条目 | 整条正文 HTML | 公告正文；更新日志在无 `platforms` 时的回退 |
| `entries[].versions` | 条目，仅更新日志 | 各平台完整版本号 | 软件版本行、版本小节标题显示「平台 V完整版本号」 |
| `entries[].betas` | 条目，仅更新日志 | 这一期以 Beta（测试包）发布的平台键数组，可能为空；旧清单无此字段，按空处理 | Beta 标签、小一号字；正式包把本平台 Beta 的条目视为未发布 |
| `entries[].platforms` | 条目，仅更新日志 | 按平台拆好的 HTML，键为 `all` / `windows` / `macos` / `android` / `ios` / `linux`，只含写了内容的平台 | 只显示本平台小节 + 全平台小节 |
| `latest` | 顶层 | 最后更新日期最大的一条 | 未读红点、软件版本行 |

HTML 只含 Markdown 生成的标签（`p`、`ul`、`ol`、`li`、`strong`、`em`、`a`、`hr`、`img`、`code`），客户端用富文本组件渲染；链接只放行 https。

## 4. 客户端消费规则

- 近期公告 = 最后更新日期在 90 天内、按更新日期倒序、最多 5 条；一条都不够新时给最新一条。
- 未读红点标记 = 最新公告的 `id@updated` + 更新日志最新一条的 `title` + 面板最新公告指纹；打开动态抽屉即按实际展示数据标记已看。
- 「发现新版本」说明 = 更新日志里 `title` 落在（当前版本前两段, 最新版本前两段] 区间的每一条，按日期倒序，每条取本平台 + 全平台小节；一条都没有时退回下发器按平台填的说明。
- Beta：正式包把 `betas` 含本平台的条目当作本平台未发布（不算最新版本、不进升级说明、不在软件版本详情里列出）；测试包照常显示，并标 Beta、正文小一号。
- 拉取失败沿用本地缓存（30 天），整池不通不报错。

## 5. 兼容性承诺与改动流程

- 字段只追加、不删除、不改语义；客户端对缺失字段必须有回退（旧清单无 `platforms` 时用 `html`）。
- 改语义时递增 `version`，客户端先兼容新版再发布文档站。
- 改动顺序：本文件 → `scripts/lib/entries.mjs`（解析）→ `scripts/build-feeds.mjs` / `scripts/build-changelog-pages.mjs`（产出）→ 客户端 → 两边各自的测试（`scripts/` 无测试时以 `npm run build` 的产物核对为准；客户端 `test/services/docs_feed_service_test.dart`、`update_notes_test.dart`）。
- 发布检查：`npm run build` 后确认 `build/changelog/index.json` 每条都有 `title`（日期格式）与 `platforms`，公告每条都有 `published`。

## 6. 更新日志全链路：三方分工与约束

> Beta（测试包）相关的通用约束（版本号区分不了测试包、唯一口径 `build_kind`、灰色细边框标签、上线顺序等）
> 以 flux 仓库 [docs/BETA_COMPAT.md](https://github.com/duomihost/flux/blob/main/docs/BETA_COMPAT.md) 为准，本节只写更新日志这条链路上的具体做法。

```
flux-builder 发布时写入 ─┐
人工补写 / 润色 ─────────┴─→ docs/changelog/index.md（唯一源）
                              │ npm run build：校验 → 生成平台页 → 生成清单
                              ↓
          changelog/index.json（+ 预留 en/changelog/index.json）、各平台页面
                              ↓
                       flux 客户端「动态」/「发现新版本」
```

### 6.1 flux-builder：发布即记录

- **必填**：同时勾了「自动上传至网盘」和「同时回填面板字段」、且目标不是 iOS 时，「更新说明」`release_notes`
  必填（每行一条）。表单、Express、Pages Functions、本机命令行 `--release-notes` 四处校验一致，空的直接拒绝。
- **时机**：先算出版本号、再由 `enforceMainOnlyPublishing` 关掉非 main 的回填，然后写入，最后才触发构建。
  写入失败就拒绝触发或中止构建（Pages、Express、本机三条链路都一样）。
- **写法**（`changelog-writer.js`）：按版本号前两段找到或新建那一期（新建时按倒序插入）；更新「版本：」行里
  本平台的条目；追加到 `### 平台` 小节。同一版本重复构建不会重复追加。
  说明会自动整理：去掉序号、合并空白、去重，统一以全角句号结尾。
- **Beta**：测试包或 Debug 包、且没开 `publish_config_anyway` 时标 Beta，判定和写更新通道是同一个函数
  （`vault-transport.resolveUpdateChannel`）。`promote:test` 转正成功后去掉对应平台版本的 Beta；
  这一步失败不回滚转正，只提示去手工删。
- **凭据**：`DOCS_GITHUB_TOKEN`（只开 flux-docs Contents 读写的细粒度 PAT），没配就回落 `GITHUB_TOKEN`；
  仓库默认 `duomihost/flux-docs`，可用 `DOCS_REPO` 改。
- **只写中文**，英文更新日志不由构造器写。
- **已知限制**：写入发生在构建之前，之后编译或上传失败的话，会留下一条没真正发出去的版本记录，需要手工删。

### 6.2 flux-docs：唯一源与校验

- `docs/changelog/index.md` 是唯一的手写源，平台页由脚本生成、不入库。构造器写入的内容可以润色，
  但版本行和小节结构必须符合 2.2 节。
- **构建前校验**（不通过则 `npm run build` 失败，CI 拦截）：
  - 所有条目的列表中间不得夹空行，否则会渲染成松散列表（`<li><p>`），客户端每项都撑出段落间距；
  - 拼接后的平台页同样不得出现松散列表：「本平台」与「全平台」两段列表直接相接；
  - `2026.1006` 起每期必须有「版本：」行，版本号与标题同一天，写了平台小节的平台必须出现在「版本：」行里。
- **没出包的平台不写版本号**：已有「版本：」行的期里，没列出的平台的小节客户端不会显示，
  等这个平台真正发布时由构造器记入。
- **Beta 展示**：平台页显示「V完整版本号」加一枚灰色细边框的 Beta 标签，正文小一号；总览页只在版本行文字里体现。
- 推送 main 即部署；改动后至少跑一次 `npm run build`。

### 6.3 flux：只展示，不计数

- 只读清单，所有字段缺失时必须有回退（第 5 节）。
- **软件版本行**：清单有本平台版本号时显示「平台名 V完整版本号」（如「macOS V2026.1008.1005」），没有时显示「V期标题」。
- **平台判定**：期里有 `versions` 时只认其中列出的平台；没有时看是否有本平台或全平台小节。
- **Beta**：见第 4 节。补充一条：测试通道的新版本即使文档站还没写这一版，也显示 Beta 标签。标签是灰色细边框，和文档站观感一致。
- **排版**：清单 HTML 统一用共享的紧凑列表样式（`html_feed_extensions.dart` 的 `htmlFeedListStyles`），
  即使清单里出现松散列表也不会撑开；摘要拼接时，全角标点后不补空格。
- **英文**：非中文界面先请求 `en/…` 清单，404 或内容不是清单时退回中文，本次运行内不再重复请求（见 1.1 节）。

### 6.4 改动联动

- 改「版本：」行或 Beta 的语法，三处必须同步：flux-docs `scripts/lib/entries.mjs`（解析与校验）、
  flux-builder `changelog-writer.js`（写入），以及 flux `lib/services/docs_feed_service.dart` 和
  `lib/services/update_notes.dart`（消费）。
- 改校验规则时，先用构造器的写入结果跑一遍 `validateChangelog`，确认自动写入的内容能通过。

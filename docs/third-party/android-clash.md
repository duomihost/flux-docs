---
title: Android 使用 Clash
description: 在 Android 或兼容 Android 应用的设备上导入 Paxora 订阅并使用 Clash。
---

# Android 使用 Clash

## 先看完整流程

**安装 Clash → 复制 Paxora 订阅 → 导入配置 → 启动连接 → 允许 VPN 请求 → 选择节点。**

看到客户端显示运行中，且手机状态栏出现 VPN 标志后，说明连接已经建立。

Paxora Android 官方客户端可以直接登录并同步节点，普通用户建议优先使用。旧版 Clash for Android 已停止维护；本页保留旧教程的完整操作流程，适用于界面相同或相近的兼容客户端。

## 一、使用前准备

- Android 9 或更高版本。
- Paxora 套餐有效，可以进入用户中心。
- 已完全退出其他代理或 VPN 客户端。
- 客户端来自可信的开发者发布渠道。

:::warning
不同 Clash 分支的来源和维护状态差异很大。无法确认安装包来源时，请改用 [Paxora Android 官方客户端](../installation/android.md)。
:::

## 二、复制 Paxora 订阅

1. 打开 [Paxora 用户中心](https://hi.dmhosts.com/)并登录。
2. 找到适用于 Clash 的个人订阅地址。
3. 点击复制。

![从 Paxora 用户中心复制订阅地址](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FHaj0yOZ37k2NPSDm0Ib4%2Fimage.png?alt=media&token=6e37cc6c-3855-4e86-b068-a49e21c95cc2)

:::danger
个人订阅地址包含账号使用权限，不要分享，也不要在截图中显示完整内容。
:::

## 三、手动导入订阅

1. 打开 Clash，点击首页的“配置”。

![点击首页的配置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-49b9807ebd48888a5967cc7806db2e1350fab2f6%2F1.jpg?alt=media)

2. 点击右上角的 **+**。

![点击配置页面右上角的加号](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-86cceeb4e74164a6ae6d5d3903962b575fb4c008%2F2.jpg?alt=media)

3. 选择“从 URL 导入”。

![选择从 URL 导入](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-0f93fadb67faf1478b0a4b1fab231aaa1653e86a%2F3.jpg?alt=media)

4. 按照下面填写：

   - 名称：`Paxora`
   - URL：粘贴刚才复制的订阅地址
   - 自动更新：`1440` 分钟

5. 点击右上角保存。

![填写名称、URL 和自动更新时间](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-0e4a41dc4ad9705084c2e4420fe0ffc6c4602cdc%2F6.jpg?alt=media)

6. 下载完成后，点击新添加的 `Paxora` 配置将它设为当前配置，然后返回首页。

![选中刚刚下载的配置并返回](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-beded4a348bbaa3b38031eaceb9b5d5745cf4081%2F7.jpg?alt=media)

## 四、一键导入（可选）

如果 Paxora 用户中心提供“导入 Clash”按钮，也可以直接点击：

1. 在用户中心点击适用于 Clash 的一键导入入口。

![在用户中心选择一键导入](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FI97HnpGQREcZHfJa3kIm%2F1755430156583.jpg?alt=media&token=52533d9e-2152-482e-b5db-73cb276a31c0)

2. 系统跳转到 Clash 后，检查名称和 URL，再保存配置。

![跳转到 Clash 后确认并保存](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FNj8EaoINFvlr9FFp7xwc%2F1755430243700.jpg?alt=media&token=a3763aaf-0e0e-447f-bbdd-31b38f111b7d)

一键导入失败时，请使用上面的手动导入方法。

## 五、开始连接

1. 返回 Clash 首页。
2. 点击“已停止”或“启动”一栏开始运行。

![点击首页启动 Clash](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-7864507175c14a17ae227168c462c8488e41c223%2F8.jpg?alt=media)

3. 第一次连接时，Android 会显示 VPN 连接请求。点击“确定”或“允许”。

![首次连接时允许 VPN 请求](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-c756d84bf4d661502ab6b7bbc80e12a8f1903ba1%2F9.jpg?alt=media)

如果点击取消，客户端无法建立连接，需要重新启动并再次授权。

## 六、选择节点

1. 连接后点击“代理”或 **Proxies**。

![进入代理页面切换节点](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-fbe1027738b87e364b8369dcd355a2a0e58faa3a%2F10.jpg?alt=media)

2. 打开“手动切换”节点组。
3. 点击需要使用的节点。图片中的节点只用于演示。

![在手动切换中选择节点](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-52f1ebab401202047fbfc117183886e78e5ef75c%2F11.jpg?alt=media)

返回首页确认客户端仍显示运行中，然后打开浏览器测试网络。

## 七、更新订阅

1. 先返回首页停止 Clash，确保处于未连接状态。

![更新订阅前先停止 Clash](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-38dd7cada04e109cd8253d53f07841fd6c477000%2F12.jpg?alt=media)

2. 进入“配置”页面。
3. 找到 Paxora 配置，点击右侧刷新按钮。

![在配置页面刷新订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-da9d609c68a0684e1f9f7ac1d8b58b34e98760af%2F13.jpg?alt=media)

4. 更新完成后重新选择配置，再启动连接。

## 八、重新配置

反复更新失败或节点始终为空时：

1. 先停止 Clash。

![重新配置前确认 Clash 已停止](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-38dd7cada04e109cd8253d53f07841fd6c477000%2F12.jpg?alt=media)

2. 删除旧的 Paxora 配置。
3. 回到用户中心重新复制订阅地址。
4. 按照“手动导入订阅”重新添加。

## 九、规则模式与全局模式

日常建议使用“规则”模式。如果确实需要全局模式：

1. 打开“代理”页面。

![打开 Clash 的代理页面](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F63Wvvg62x0IuBoOcLsIV%2F%7B48680C17-0AB7-40AE-B074-088F8A4B4516%7D.png?alt=media&token=c6e67216-fd1b-4dfa-ac3f-d57f360478f3)

2. 在模式栏选择 **Global（全局）**。

![选择全局模式](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FqgkfoZPR8ST4dMnIGR2g%2F%7B025876D6-3848-4DD3-894E-B5728B756065%7D.png?alt=media&token=c4eb1b24-0a29-480b-af7c-eb7a5d4155d4)

3. 在全局节点组中选择节点。

![为全局模式选择节点](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FZ9tfRtliAiK3wivuE7wc%2F%7BF75488C2-0F18-4BE4-8E1C-3233CB4A0809%7D.png?alt=media&token=3159db26-a95f-4909-ae58-3daa4d4788e0)

4. 返回首页确认连接正在运行。

![返回首页确认全局模式已连接](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FRQlrbtRxu5ge5AOA3wfI%2F%7B2A8DECBC-3F34-41E7-AB8E-DF49D3017464%7D.png?alt=media&token=400737e6-9974-40a2-a9b6-7ede4d4d18bd)

访问变慢或异常时，请改回规则模式。

## 常见问题

### 点击启动没有反应

确认已经选中配置，并检查 Android 是否允许该应用创建 VPN。也要退出其他代理软件。

### 配置更新失败

先停止连接，确认普通网络可以访问用户中心，然后重新复制订阅地址。

### 后台一段时间后断开

在手机电池设置中允许客户端后台运行，并取消对它的省电限制。不同品牌手机的菜单名称可能不同。

---
title: Apple 芯片 Mac 使用 Shadowrocket
description: 在 Apple 芯片 Mac 上安装 Shadowrocket，导入 Paxora 订阅并完成连接。
---

# Apple 芯片 Mac 使用 Shadowrocket

## 先看完整流程

**从 Mac App Store 安装 Shadowrocket → 复制 Paxora 订阅 → 导入订阅 → 选择节点 → 点击连接。**

本教程只适用于 Apple 芯片 Mac；Intel Mac 请使用 Paxora 官方客户端或 Clash Verge Rev。

本教程仅适用于 Apple Silicon 芯片的 Mac，例如 M1、M2、M3、M4 系列。Intel Mac 无法按照本教程运行 iPhone/iPad 版 Shadowrocket，请改用 [Paxora macOS 官方客户端](../installation/macos.md) 或 [Clash Verge Rev](./macos-clash-verge.md)。

## 一、确认 Mac 芯片

1. 点击屏幕左上角 Apple 菜单。
2. 选择“关于本机”。
3. 查看“芯片”一栏是否显示 M1、M2、M3、M4 等 Apple 芯片。

![在关于本机中确认 Apple 芯片](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-87cad6c8c0b120ff1d81511537fe25f031e6aa6a%2Fm1.png?alt=media)

## 二、从 Mac App Store 下载

1. 打开 Mac App Store。

![打开 Mac App Store](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-36499b32ffecdd94f01b143ea2631134d1bc47d5%2Fm2.png?alt=media)

2. 使用自己已购买 Shadowrocket 的 Apple ID。如果需要切换商店账号，只在 App Store 内退出和登录。

![在 App Store 内管理商店账号](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-2a8e3858ad54c46aa4e7c99d0acf3ff990b343e8%2Fm3.png?alt=media)

:::danger[Apple ID 安全]
不要把他人提供的 Apple ID 登录到 iCloud，也不要关闭“查找”或向陌生人提供验证码。优先使用自己的 App Store 账号。
:::

3. 搜索 **Shadowrocket**，确认小火箭图标和应用信息后下载。

![在 Mac App Store 下载 Shadowrocket](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-7136aab15ad11634bbff6dbc0752cf175fc82756%2Fm4.png?alt=media)

4. 下载完成后打开 Shadowrocket。

![在 Apple 芯片 Mac 上打开 Shadowrocket](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-eea9bd623cfd41dbaa2b65c52cf0eb0250aee58c%2Fm5.png?alt=media)

如果 App Store 没有显示兼容版本，说明当前设备或开发者设置不支持，请改用其他客户端。

## 三、复制 Paxora 订阅

1. 打开 [Paxora 用户中心](https://hi.dmhosts.com/)并登录。
2. 找到适用于 Shadowrocket 的个人订阅地址。
3. 点击复制。

![从 Paxora 用户中心复制订阅地址](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FGrO0FJPgoJnasfgNyGfb%2Fimage.png?alt=media&token=105b7715-34d8-454f-8722-79352f08a540)

:::danger
个人订阅地址不要发送给他人，也不要在截图中显示完整内容。
:::

## 四、导入订阅

1. 在 Shadowrocket 主界面点击右上角 **+**。

![点击加号添加订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-57ccb0b4bff333e60234e3c6b130e4a2b0612679%2Fm6.png?alt=media)

2. 点击“类型”。

![打开类型选择页面](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-29aa6b47ae687c44e29cf0cb715cb63531cc949f%2Fm7.png?alt=media)

3. 选择 **Subscribe（订阅）**。

![选择 Subscribe 类型](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-013265997b1cf5fea0c6424da22b4f9294577e24%2FM8.png?alt=media)

4. 在 URL 栏粘贴订阅地址。
5. 备注填写 `Paxora`，然后点击“完成”。

![填写 URL 和 Paxora 备注](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-b8cccbac3dc70e44d3669940c9a765dcb203a164%2Fm9.png?alt=media)

## 五、开启订阅自动更新

1. 打开 Shadowrocket“设置”。
2. 进入订阅相关选项。
3. 开启“打开时更新”和“自动后台更新”。

![开启订阅自动更新](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-ac6ab115353a7217985ab1ad6a3bb78e33aaea90%2Fm10.png?alt=media)

## 六、选择节点

返回主界面，在节点列表中选择需要使用的节点。图片中的节点仅用于演示。

![在 Shadowrocket 中选择节点](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-8902b2b02b55c956c408f2bf94f3766dfbd2535b%2Fm11.png?alt=media)

## 七、开始连接

1. 打开主界面的连接开关。
2. 根据需要确认路由模式。

![打开 Shadowrocket 连接开关](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-6b485557d038c35d02d8d110c88a8124b397386c%2Fm12.png?alt=media)

3. 第一次连接时，Shadowrocket 会请求添加 VPN 配置，先点击“好”。

![确认添加 VPN 配置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-b3c90edae900d1cbe25cbb46ea967a4dfcb90b64%2Fm13.png?alt=media)

4. macOS 再次显示系统授权时，点击“允许”，并使用登录密码或 Touch ID 验证。

![在 macOS 系统提示中点击允许](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-cde68a6b17e18b2766aa83bfd2b7d3848e0076fd%2Fm14.png?alt=media)

5. 当连接开关点亮并显示当前节点时，说明连接成功。

![Shadowrocket 连接成功状态](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-fe3c66da8474c3da68c824f1340903c02579122c%2Fm15.png?alt=media)

使用浏览器测试网络。不再使用时返回 Shadowrocket 关闭连接开关。

## 八、更新订阅

1. 先关闭连接开关。
2. 在订阅列表中找到 Paxora 配置并打开操作菜单。

![在未连接状态打开订阅操作](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F2rskXqDFubFNkVkgblh9%2Fimage.png?alt=media&token=47ac3b86-207c-4d15-93ff-cd9ed77b165c)

3. 点击“更新”，等待完成提示。

![更新 Shadowrocket 订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FvMwaSpZGwdnJ01jkmxqw%2Fimage.png?alt=media&token=4104c3c5-05bb-4d43-9e78-865e1836e417)

## 九、重新配置

反复更新失败时：

1. 关闭连接。
2. 删除旧的 Paxora 订阅标签。

![删除旧的 Paxora 订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FMSxYHUMlgLjNysONEbeT%2F%7B17D70454-E3D3-4276-BC7A-BCEB6A85C519%7D.png?alt=media&token=25f06217-399c-4630-baba-46d8e79c0bf5)

3. 回到用户中心重新复制订阅地址。
4. 按照“导入订阅”重新添加。

## 常见问题

### Mac App Store 搜不到 Shadowrocket

确认 Mac 使用 Apple 芯片，并检查开发者是否允许当前地区和设备下载。无法下载时请改用 Paxora 官方客户端。

### 点击连接后没有反应

退出其他代理/VPN 软件，确认已经选择节点，并检查 macOS 是否弹出了网络配置授权。

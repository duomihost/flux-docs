---
title: iPhone / iPad 使用 Shadowrocket
description: 在 iPhone 或 iPad 上安装 Shadowrocket，导入 Paxora 订阅并完成首次连接。
---

# iPhone / iPad 使用 Shadowrocket

Shadowrocket 是第三方付费应用。本教程适用于 iPhone 和 iPad，建议使用 iOS 12 或更高版本。应用价格、上架地区和版本变化以 App Store 为准。

## 先看完整流程

**安装 Shadowrocket → 复制 Paxora 订阅 → 添加 Subscribe → 选择节点 → 打开连接开关 → 允许 VPN 配置。**

连接成功时，Shadowrocket 的开关会点亮，状态栏也会出现 VPN 标志。

## 一、安装前准备

开始前请确认：

- Paxora 套餐有效，可以登录用户中心。
- 设备已经退出其他代理或 VPN 客户端。
- 使用自己的 App Store 账号，或自己合法持有并已购买 Shadowrocket 的账号。

:::danger[Apple ID 安全]
不要把他人提供的 Apple ID 登录到 iCloud，也不要关闭“查找”。优先使用自己的 App Store 账号；任何情况下都不要向陌生人提供设备验证码。
:::

打开 App Store。账号切换和应用下载都应在 App Store 内完成，不要进入“系统设置”的 iCloud 账号页面操作。

![从 App Store 页面管理应用账号](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-69f51913efd7e896140f13520ffc718a7b2d9efa%2F1.png?alt=media)

## 二、下载 Shadowrocket

1. 在 App Store 搜索 **Shadowrocket**。
2. 核对应用名称、开发者和小火箭图标，避免下载名称相似的应用。
3. 完成购买或下载后打开应用。

![在 App Store 核对 Shadowrocket 应用](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-e88556e82b7109c6fc6c188cf77d69eb56aa56c7%2F2%20%281%29.jpg?alt=media)

## 三、复制 Paxora 订阅

1. 打开 [Paxora 用户中心](https://hi.dmhosts.com/)并登录。
2. 找到“一键订阅”或“订阅地址”。
3. 复制适用于 Shadowrocket 的个人订阅地址。

![在 Paxora 用户中心复制个人订阅地址](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FJmMOyUstGItbx7S5NSbv%2Fimage.png?alt=media&token=c9d6199c-5f53-44dc-a19e-38bb07f0252a)

:::danger
个人订阅地址相当于使用凭据，不要发给他人，也不要在截图中显示完整地址。
:::

## 四、手动导入订阅

1. 打开 Shadowrocket。
2. 点击右上角的 **+**。

![点击右上角加号添加订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-9abbdffcab28abe4944a90b328d96847798b16b3%2F3%20%281%29.jpg?alt=media)

3. 将“类型”选择为 **Subscribe（订阅）**。
4. 在 URL 输入框粘贴刚刚复制的地址。
5. “备注”填写 `Paxora`，然后点击“完成”。

![填写订阅类型、地址和备注](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-ddde380d155f5edb83a7cb047c8018151effa959%2F8%20%281%29.jpg?alt=media)

保存后会返回主界面，并开始加载节点。如果没有节点，请检查 URL 是否粘贴完整。

## 五、一键导入（可选）

如果 Paxora 用户中心提供“导入 Shadowrocket”按钮，也可以点击该按钮直接唤起应用。

![从用户中心一键导入 Shadowrocket](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F9jtGuw49xeNqSxAeIGWE%2Fimage.png?alt=media&token=3291bc5e-1470-45a3-b90d-303323c1f5fc)

跳转后仍要检查备注、订阅地址和节点是否正确。一键导入失败时，请改用上面的手动导入方法。

## 六、设置路由模式

1. 返回 Shadowrocket 首页。
2. 点击“全局路由”。

![打开全局路由设置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-4ddf40dcb3143d659806a9a803270f8b062fe473%2F12%20%281%29.jpg?alt=media)

3. 第一次按旧教程操作时可选择“代理”。日常使用如果已有适合的规则，也可以使用“配置”或规则模式。

![选择 Shadowrocket 路由模式](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-0efc1cc6da1fbd5a59673e8f252055bd44cc7f66%2F13%20%281%29.jpg?alt=media)

## 七、选择节点并连接

1. 在节点列表中点击一个节点。
2. 打开页面顶部的连接开关。

![选择节点并打开连接开关](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-b401b2b7112f3652d8867dff5830e90db2573c01%2F14.jpg?alt=media)

3. 首次连接时，iOS 会请求添加 VPN 配置。点击“允许”，然后按照系统提示使用密码、Face ID 或 Touch ID 验证。

![首次连接时允许添加 VPN 配置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-3509c68124c783bda7682cfca88607f77ca84aec%2F15.jpg?alt=media)

4. 当开关点亮、首页显示当前节点并且状态栏出现 VPN 标记时，说明连接成功。

![Shadowrocket 连接成功状态](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-17be2f70b5f8006e47e3f419c34ec074380cc566%2F16.jpg?alt=media)

打开浏览器访问网页测试网络。不再使用时，返回 Shadowrocket 关闭连接开关。

## 八、更新订阅

节点失效或套餐更新后，可以刷新订阅：

1. 先关闭顶部连接开关，确保处于未连接状态。
2. 在订阅列表中找到 Paxora 配置，向左滑动或打开菜单。

![关闭连接后打开订阅更新操作](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-6d756c7690393bc7eedf3c9a3678aea2fadb889a%2F11%20%281%29.jpg?alt=media)

3. 点击“更新”，等待成功提示。

![Shadowrocket 订阅更新成功提示](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-cee8d0d8adaae9829fd2770d7dd413325d8809a1%2F22.jpg?alt=media)

更新失败时，检查当前普通网络是否正常，再重试一次。

## 九、重新配置订阅

反复更新仍失败时：

1. 关闭连接开关。
2. 删除旧的 Paxora 订阅标签。

![在未连接状态删除旧订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-c90a3a84c452fe0238a91a1c2041489800741559%2F33.png?alt=media)

3. 回到用户中心重新复制订阅地址。
4. 按照“手动导入订阅”重新添加。

## 常见问题

### 点击连接后没有弹出授权

前往“系统设置 → 通用 → VPN 与设备管理”检查是否已有异常配置，也要确认没有其他 VPN 客户端正在运行。不要随意删除公司或学校管理的配置。

### 更新后节点没有变化

先断开连接，重新更新订阅；仍无变化时删除旧标签并重新导入。

### 只有部分网站打不开

先换节点，再检查全局路由设置。其他网站正常时，也可能是目标网站自身限制。

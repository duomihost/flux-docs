---
title: macOS 使用 Clash Verge Rev
description: 在 macOS 上安装 Clash Verge Rev，导入 Paxora 订阅并管理节点。
---

# macOS 使用 Clash Verge Rev

普通用户建议优先使用 Paxora macOS 官方客户端。本页适合需要在 Mac 上使用 Clash Verge Rev 的用户。

## 一、确认芯片并下载

1. 点击屏幕左上角 Apple 菜单，选择“关于本机”。
2. 查看“芯片”或“处理器”：M1、M2、M3、M4 等选择 Apple Silicon 版本；Intel 处理器选择 Intel 版本。
3. 打开 [Clash Verge Rev 官方 GitHub 发布页](https://github.com/clash-verge-rev/clash-verge-rev/releases)。
4. 在最新版本的 **Assets** 中下载对应的 macOS 安装包。

## 二、安装与首次运行

打开下载的安装包，将 Clash Verge Rev 拖入“应用程序”文件夹。

![将 Clash Verge Rev 拖入应用程序文件夹](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FKQID1IMiB6F9Q4tYZ3kp%2Fimage.png?alt=media&token=75680d31-0d6b-47c0-9fac-4517a57a1369)

从“应用程序”中打开 Clash Verge Rev。第一次运行时，客户端可能要求安装帮助程序，请点击“安装”，然后使用 Mac 登录密码或 Touch ID 验证。

![Clash Verge Rev 首次运行界面](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FuKQ0EMsC9XC6FttccnK2%2Fimage.png?alt=media&token=08e7ede4-0eb2-4359-8770-ec8c8678ed60)

如果 macOS 阻止打开，请确认安装包来自官方发布页，然后前往：

**系统设置 → 隐私与安全性 → 安全性 → 仍要打开**

完成密码或 Touch ID 验证后，应用会直接打开。

## 三、复制并导入 Paxora 订阅

1. 打开 [Paxora 用户中心](https://hi.dmhosts.com/)并登录。
2. 复制适用于 Clash 的个人订阅地址。

![在 Paxora 用户中心复制订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FusGJsvCHuTgTJLtCpjIP%2Fimage.png?alt=media&token=adaa08f6-b001-4d6d-937a-11273421a109)

3. 打开 Clash Verge Rev 的“订阅”页面。
4. 将地址粘贴到输入框，点击“导入”。
5. 等待配置下载完成，并点击订阅卡片将它设为当前配置。

![在 Clash Verge Rev 中导入订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FWcDWpAo4lXah3smvJV2N%2Fimage.png?alt=media&token=d4ffc86b-f8ed-4327-a6bf-df23186c144c)

:::danger
个人订阅地址不要分享或截图。如果出现 `Network Error`，请刷新用户中心后重新复制地址，或更换网络再试。
:::

## 四、选择节点

1. 打开“代理”或 **Proxies** 页面。
2. 找到“手动选择”节点组。
3. 选择一个延迟较低的节点。

![在 Clash Verge Rev 中选择节点](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FkE1rkdAfkGtZI7ZqsJqt%2Fimage.png?alt=media&token=3cb649d6-bb47-46ec-b426-1c2852427e62)

图片中的节点只是示例，请根据自己的需要选择。

## 五、开启系统代理

1. 打开“设置”页面。
2. 开启“系统代理”。
3. 如果 macOS 请求权限，按提示完成验证。
4. 打开浏览器测试网络。

![在设置中开启系统代理](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FRSqLCHO4vIlUZsMkbX6j%2Fimage.png?alt=media&token=a7b02d2c-7b2a-4414-8d26-8980b00a174c)

结束使用时先关闭系统代理，再退出客户端。不要同时打开 Paxora、ClashX 或其他代理/VPN 软件。

## 六、更新订阅

1. 先进入“设置”，关闭系统代理。

![更新订阅前关闭系统代理](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fc5zO5Vr35rey8rwOzQHn%2Fimage.png?alt=media&token=e4c53ba4-fbd3-43ff-907e-363051a27dc0)

2. 打开“订阅”页面。
3. 找到 Paxora 配置并点击刷新按钮。

![刷新 Paxora 订阅配置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FM7sFYa6J8KrSjWgOmr9j%2Fimage.png?alt=media&token=30e41cf7-4246-4eaf-bc82-782242e447ad)

更新成功后重新选择节点并开启系统代理。

## 七、重置配置

反复更新仍失败时，可以删除旧配置后重新导入：

1. 关闭系统代理。

![重置配置前确认系统代理关闭](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fc5zO5Vr35rey8rwOzQHn%2Fimage.png?alt=media&token=e4c53ba4-fbd3-43ff-907e-363051a27dc0)

2. 在“订阅”页面删除旧的 Paxora 配置。

![删除旧的订阅配置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FQxyRo2KoVi9TaAzvXmwL%2Fimage.png?alt=media&token=1fb9cca7-554a-41b3-be29-9961715e7811)

3. 回到 Paxora 用户中心重新复制订阅地址。

![重新复制个人订阅地址](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fv99wsNk3vVgOaE5nKzdz%2Fimage.png?alt=media&token=7f937213-96c2-4cac-83a9-86027830cebf)

4. 将新地址粘贴到 Clash Verge Rev 并重新导入。

![重新导入 Paxora 订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FWcDWpAo4lXah3smvJV2N%2Fimage.png?alt=media&token=d4ffc86b-f8ed-4327-a6bf-df23186c144c)

## 八、规则模式与全局模式

日常建议保持“规则”模式。只有明确需要全部流量经过所选节点时，再在“代理”页面选择 **Global（全局）**，重新选择节点并开启系统代理。

如果切换后访问变慢或异常，请改回规则模式并重新连接。

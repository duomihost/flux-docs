---
title: macOS 使用 ClashX
description: 在 macOS 上安装 ClashX，导入 Paxora 订阅并完成系统代理设置。
---

# macOS 使用 ClashX

ClashX 是旧版第三方客户端。本页完整保留旧教程流程，方便已有用户继续使用；新用户建议优先选择 Paxora macOS 官方客户端或 Clash Verge Rev。

## 先看完整流程

**安装 ClashX → 复制 Paxora 订阅 → 添加托管配置 → 选择节点 → 设为系统代理。**

看到菜单栏中的 ClashX 图标变为运行状态后，打开浏览器测试网页。

## 一、安装 ClashX

1. 从 ClashX 开发者的可信发布渠道下载安装包。
2. 打开安装包，将 ClashX 拖入“应用程序”文件夹。

![将 ClashX 拖入应用程序文件夹](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FWOkMR48qN9ZQh8465B8p%2Fimage.png?alt=media&token=203b4b37-6ba7-42f0-bc44-6c71f517149a)

:::warning
旧版客户端可能存在兼容性或安全风险。请勿从不明网盘下载修改版安装包。
:::

## 二、首次运行

从“应用程序”中打开 ClashX。成功启动后，菜单栏会出现猫咪图标。

![ClashX 启动后的菜单栏图标](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fi4R4pTIxpmUE08bFqbaF%2Fimage.png?alt=media&token=04271c9d-69ce-4de5-8172-d6da1e3e8874)

第一次使用时，ClashX 会要求安装帮助程序：

1. 点击“安装”。

![点击安装 ClashX 帮助程序](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FvMxAA2HTxpqGE9dMSQMQ%2Fimage.png?alt=media&token=0352032f-dc6c-42bc-81de-2fa7ad683002)

2. 使用 Mac 登录密码或 Touch ID 验证。

![输入 Mac 密码完成帮助程序安装](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FNZxbxMtq7od7FTUmsnI7%2Fimage.png?alt=media&token=1a2c8837-9253-43c8-9154-e4b6a83abb95)

如果 macOS 阻止打开，请确认文件来源后前往“系统设置 → 隐私与安全性 → 安全性 → 仍要打开”。

## 三、复制 Paxora 订阅

1. 打开 [Paxora 用户中心](https://hi.dmhosts.com/)并登录。
2. 复制适用于 Clash 的个人订阅地址。

![从 Paxora 用户中心复制订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FrW55gYXgJCZhj7aHTBVl%2Fimage.png?alt=media&token=862569b1-d231-4bfd-b738-97e6c250b77b)

## 四、手动添加托管配置

1. 点击菜单栏的 ClashX 猫咪图标。

![打开 ClashX 菜单](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FUnUMEwOS9FuzNVFYtlbI%2Fimage.png?alt=media&token=545cf2ab-d560-4538-a033-2e58d8699e78)

2. 进入“配置 → 托管配置”，点击“添加”。

![点击添加托管配置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FWyATiWdgnTQFnpdME4zW%2Fimage.png?alt=media&token=aefd842a-d281-4eac-87b3-6e21850a59cf)

3. 在 URL 中粘贴订阅地址。
4. Config Name 填写 `Paxora`，然后确认添加。

![填写 URL 和 Paxora 配置名称](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FTsf8DpCqK7mA3EAfwVmu%2Fimage.png?alt=media&token=8186e9a0-755a-48bb-b74d-8dace3089d00)

5. 没有错误提示时关闭配置窗口。

![托管配置添加完成](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F25WRtVe7lzhbrJLTmd2Q%2Fimage.png?alt=media&token=d1e09d8f-e365-47b4-ba6e-282aba41a2fd)

出现 `Network Error` 时，刷新用户中心重新复制订阅地址，或更换网络后重试。

## 五、选择节点并连接

1. 再次点击菜单栏猫咪图标。
2. 在“手动切换”中选择需要使用的节点。

![在 ClashX 中手动选择节点](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FlSq7AvsE71c62XLIqvrd%2F%7B341775DA-77B0-4D95-A086-BF94FABEDF0B%7D.png?alt=media&token=fed134a5-71c7-46a7-9a18-bfb0812a7e8d)

3. 点击“设置为系统代理”。

![开启设置为系统代理](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FH8EUCmbVS12cjuP3w67F%2F%7B97DA3319-72B6-457D-9588-5E3A59945C92%7D.png?alt=media&token=237f1b0b-ca7e-4921-b585-7ba1a9731074)

4. 打开浏览器测试网络。

不再使用时先取消“设置为系统代理”，再退出 ClashX。

## 六、一键导入（可选）

如果用户中心提供 ClashX 一键导入入口，点击后会自动跳转客户端。

![从用户中心一键导入 ClashX](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FfQzrEt9FDIjtGW2ZVaNi%2Fimage.png?alt=media&token=7e6a0899-1dd6-4d35-bdac-49442ea6bac6)

跳转后仍要在“托管配置”中选中新配置，再选择节点并开启系统代理。一键导入失败时请改用手动添加。

## 七、更新订阅

1. 先取消“设置为系统代理”。
2. 打开“配置 → 托管配置”。
3. 找到 Paxora 配置并点击“更新”。

![在托管配置中更新订阅](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FI24ShJC1DV1LPmQN8i3e%2Fimage.png?alt=media&token=aa3ea962-488c-4060-8a59-7d1572965214)

更新完成后重新选择节点并设置为系统代理。

## 八、重新配置

反复更新失败时：

1. 先取消系统代理。

![重新配置前关闭系统代理](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F4RC5emSOw9fUinZDcA92%2F%7B0A9A79C1-7620-47E5-8EDD-1613938B4F43%7D.png?alt=media&token=ed163bcc-95d2-493e-87b6-c1bc2a8d51aa)

2. 回到 Paxora 用户中心重新复制订阅地址。

![重新复制 Paxora 订阅地址](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FUkRm1UtcPvZA1uLPyHT6%2Fimage.png?alt=media&token=8e307532-35b4-4476-82c4-ee02c584eea1)

3. 返回 ClashX 的托管配置页面，删除旧配置。

![返回 ClashX 管理旧配置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FTxrcd6JAbk3QnAg1jFUa%2Fimage.png?alt=media&token=05c97345-a944-41b2-b1cc-338eb1a69af8)

4. 按照“手动添加托管配置”重新导入。

## 九、全局模式

日常建议使用规则模式。明确需要全部流量经过所选节点时：

1. 点击菜单栏猫咪图标。
2. 在“出站模式”中选择“全局连接”。
3. 在 **GLOBAL** 节点组中选择节点。
4. 点击“设置为系统代理”。

![在 ClashX 中开启全局连接](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fcc2axe8Ehoh6fFApCnZb%2Fimage.png?alt=media&token=f6751ce7-6c92-4e6d-8b03-8bd4bb9be3d2)

出现访问异常时改回规则模式，并重新连接。

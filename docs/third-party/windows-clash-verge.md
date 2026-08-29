---
title: Windows 使用 Clash Verge Rev
description: 在 Windows 上安装 Clash Verge Rev，导入 Paxora 订阅、选择节点并更新配置。
---

# Windows 使用 Clash Verge Rev

本教程适用于 Windows 10 和 Windows 11。Paxora 官方客户端可以直接登录并同步节点；只有确实需要第三方客户端时，才需要手动导入订阅。

## 一、下载安装

1. 打开 [Clash Verge Rev 官方 GitHub 发布页](https://github.com/clash-verge-rev/clash-verge-rev/releases)。
2. 在最新版本的 **Assets** 中下载 Windows 安装包。
3. 双击安装包并按照提示完成安装。
4. 从开始菜单打开 Clash Verge Rev。

:::warning
请只从官方 GitHub 发布页下载安装包。第三方网盘中的修改版可能被植入未知内容。
:::

## 二、首次运行

第一次运行时，Windows 防火墙可能询问是否允许 Clash Verge Rev 访问网络。确认软件来自官方发布页后，勾选当前使用的网络并点击“允许访问”。

![Windows 防火墙首次运行提示](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Feim3sr5htC0bUs3llBbf%2Fimage.png?alt=media&token=0bb92cd9-2812-4a99-b34b-af267866ed46)

如果没有出现提示，可以继续下一步；不要为了安装长期关闭 Windows 安全防护。

## 三、复制 Paxora 订阅

1. 打开 [Paxora 用户中心](https://hi.dmhosts.com/)并登录自己的账号。
2. 找到“一键订阅”或“订阅地址”。
3. 选择适用于 Clash 的订阅地址并点击复制。

![在 Paxora 用户中心复制订阅地址](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FDPZAFkvjArAwAebviwuO%2Fimage.png?alt=media&token=0ce203f8-42b7-4ca7-8b90-daef96093b1b)

:::danger
订阅地址包含你的使用权限，不要发送给他人，也不要在截图中显示完整内容。
:::

## 四、导入订阅

1. 打开 Clash Verge Rev 左侧的“订阅”页面。
2. 将刚刚复制的地址粘贴到顶部输入框。
3. 点击“导入”或下载按钮，等待配置下载完成。

![把订阅地址粘贴到 Clash Verge 并下载](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FmiE72MqdOBs4IYSPN4BS%2Fimage.png?alt=media&token=c1d971bb-0e92-461b-8916-33991eaa2fb1)

4. 下载完成后，点击刚刚添加的订阅卡片，将它设为当前配置。

![选中刚刚下载的订阅配置](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FqTONNZvJbeCabPWSVUEI%2Fimage.png?alt=media&token=908663ae-03df-4de9-ace7-e395c8e8989c)

如果出现 `Network Error`：

1. 回到 Paxora 用户中心刷新页面，重新复制订阅地址。
2. 确认复制内容没有缺失。
3. 更换网络，例如临时使用手机热点。
4. 再次点击导入，必要时重试几次。

## 五、选择节点

1. 点击左侧“代理”或 **Proxies**。
2. 找到“手动选择”或相近的节点组。

![打开 Clash Verge 的代理页面](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F2Zj9Z7yAookY8mTIwbEA%2Fimage.png?alt=media&token=e0c209e7-8903-4f89-bbc8-14dc2fffd9e2)

3. 选择需要的国家或地区节点。图片中的节点仅用于演示，不必照着选择。

![在节点列表中手动选择节点](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FECOl8NbPdaAJcLEgvTbF%2Fimage.png?alt=media&token=acf489db-6e54-4ea2-8e79-60545452adc1)

第一次使用时，建议选择延迟较低的普通节点；连接失败时再换同一地区的其他节点。

## 六、开启系统代理

1. 点击左侧“设置”。
2. 找到“系统代理”开关并打开。
3. 打开浏览器访问网页，确认网络正常。

![在 Clash Verge 中开启系统代理](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FOn3gvAUPOPxxdO81Zp6p%2Fimage.png?alt=media&token=66c5b0de-a75d-42bc-b2ce-a3791ab7dfa4)

不再使用时，应先关闭“系统代理”，再退出 Clash Verge Rev。不要同时运行 Paxora 或其他代理/VPN 客户端。

## 七、更新订阅

节点变化或套餐更新后，可以手动刷新配置。

1. 先关闭“系统代理”，确保当前处于未连接状态。

![更新订阅前先关闭系统代理](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FK0UdIx0W7hgKqnOsARLH%2Fimage.png?alt=media&token=5bbfe92b-06d6-4552-a143-cf878153fc0e)

2. 打开“订阅”页面。
3. 找到 Paxora 配置，点击卡片右侧的刷新按钮。

![点击订阅卡片的刷新按钮](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FAYeaM6rc3u4pindW6qyu%2Fimage.png?alt=media&token=a301795f-e324-4be8-8434-bbd092bfc923)

更新完成后重新选择节点，再打开系统代理。

## 八、重置订阅配置

如果反复更新仍然报错，可以删除旧配置后重新导入。

1. 先关闭系统代理。

![重置配置前确认系统代理已关闭](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FR7XjrEFmoOy1jH48Gwe0%2Fimage.png?alt=media&token=8dd98c49-1906-4666-b24b-ed5e56d5b9b9)

2. 回到 Paxora 用户中心重新复制订阅地址。

![重新复制 Paxora 订阅地址](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F5XtjJCgeg8d0MEdxMLkF%2Fimage.png?alt=media&token=dacf654a-bd0b-466d-91ce-e1e0209d14e2)

3. 在 Clash Verge 的“订阅”页面删除旧配置。
4. 粘贴新地址并重新导入。

![删除旧订阅并重新导入](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2FJpC1EXT7KFVMHuRMu81Q%2Fimage.png?alt=media&token=07d8e2f5-2e99-49aa-8410-0c3125412034)

## 九、规则模式与全局模式

日常使用建议保持“规则”模式。只有明确需要全部流量经过所选节点时，再切换到“全局”模式：

1. 打开“代理”页面。
2. 在模式栏选择 **Global（全局）**。
3. 在全局节点组中选择节点。
4. 确认系统代理已经开启。

![在 Clash Verge 中选择全局模式](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F10xrkUbXg7Q0NQbdKquM%2Fimage.png?alt=media&token=116f898f-e1d6-4cf7-8407-87d6943445da)

切换后如果国内网站变慢或访问异常，请改回“规则”模式并重新连接。

## 常见问题

### 导入后没有节点

确认订阅卡片已经选中，并尝试关闭系统代理后更新订阅。如果仍为空，重新复制订阅地址并重置配置。

### 开启系统代理后无法上网

先关闭系统代理，确认普通网络正常；再退出其他代理工具、更新订阅并更换节点。

### 软件按钮与图片不同

Clash Verge Rev 会持续更新，按钮位置可能变化。优先寻找同名功能，例如“订阅 / Profiles”“代理 / Proxies”和“系统代理”。

---
title: macOS 安装与使用 Paxora
description: 在 Mac 上下载安装 Paxora，并完成登录、选择节点和首次连接。
---

# macOS 安装与使用 Paxora

本教程适用于第一次在 Mac 上使用 Paxora 的用户。完成下面的步骤后，你就可以选择节点并建立连接。

## 使用要求

- macOS 10.15 或更高版本
- Apple 芯片或 Intel 芯片的 Mac
- 可用的 Paxora 账号

## 第一步：下载客户端

打开 [Paxora 官方下载目录](https://vault.digitalage.services/index.php/s/E8srJpTGLgQNzW7)，进入 macOS 文件夹并下载 `.dmg` 安装包。

下载前，请先确认 Mac 的芯片类型：

1. 点击屏幕左上角的 Apple 菜单。
2. 选择“关于本机”。
3. 查看“芯片”或“处理器”一栏。
4. Apple M 系列芯片选择 Apple Silicon 版本；Intel 处理器选择 Intel 版本。

![在关于本机中确认 Mac 芯片类型](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2Fgit-blob-87cad6c8c0b120ff1d81511537fe25f031e6aa6a%2Fm1.png?alt=media)

如果主下载目录暂时无法访问，可以使用 [备用下载目录](https://vault.paxoras.com/index.php/s/E8srJpTGLgQNzW7)。

![在官方下载目录中选择 macOS 安装包](https://4037264195-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxSKAXKJRW2vsCyawwV9G%2Fuploads%2F3RTcy8YtWYc1ycdazlBt%2Fimage.png?alt=media&token=574fa4bf-63f6-4e9b-ab44-f0fc02a5d6e1)

:::warning
请只使用以上官方目录，不要安装聊天群或其他网站转发的未知文件。
:::

## 第二步：安装 Paxora

1. 双击下载好的 `.dmg` 文件。
2. 将 **Paxora** 拖入 **Applications（应用程序）** 文件夹。
3. 打开“访达”，进入“应用程序”。
4. 双击 **Paxora** 启动客户端。

### macOS 提示无法打开怎么办？

Apple 使用 **Gatekeeper（安全验证机制）** 检查从互联网下载的应用。首次启动时，macOS 可能因开发者签名或公证状态阻止 Paxora 打开。这是系统的安全保护，不代表客户端发生故障。

确认安装包来自官方渠道后，前往：

**系统设置 → 隐私与安全性 → 安全性 → 仍要打开**

根据提示使用 Mac 登录密码或 Touch ID 完成验证，Paxora 随后会直接打开。

:::warning
只有在确认安装包来自官方渠道时，才应选择“仍要打开”。
:::

## 第三步：登录账号

首次打开 Paxora 时，按照页面提示登录账号：

1. 输入注册邮箱。
2. 输入密码或邮箱验证码。
3. 点击“登录”。
4. 等待客户端加载套餐和节点信息。

登录完成后，首页右侧会显示当前套餐、流量使用情况和已选择的节点。

## 第四步：选择节点

首页左侧是节点列表。第一次使用时，建议选择 **普通优化节点**：

1. 点击页面上方的“普通优化节点”。
2. 在列表中选择需要的国家或地区。
3. 展开地区后，选择一个延迟较低的节点。
4. 确认右侧连接卡片已经显示该节点。

节点旁边的延迟以 `ms` 显示。一般来说，数值越低，连接响应越快。

如果不知道如何选择，也可以直接使用客户端推荐的节点。

## 第五步：开始连接

确认节点后：

1. 点击右侧的“快速连接”。
2. 首次连接时，macOS 可能要求授权网络或代理配置，请按照系统提示完成授权。
3. 等待页面状态变为“已连接”。
4. 打开浏览器访问网页，确认网络可以正常使用。

连接期间请不要退出 Paxora。

## 断开连接

不需要继续使用时，请返回 Paxora，点击连接卡片中的“断开连接”。页面显示“未连接”后即可退出客户端。

## 常见问题

### 打开客户端后没有节点

请确认账号已经登录、套餐仍然有效，并检查 Mac 当前网络是否正常。稍等片刻后，再尝试刷新节点列表。

### 节点延迟很高

尝试选择距离更近的地区，或切换到同一地区的其他节点。

### 点击连接后一直没有成功

依次尝试以下操作：

1. 确认 Mac 可以正常访问互联网。
2. 更换一个节点重新连接。
3. 退出其他代理或 VPN 软件。
4. 断开连接并重新打开 Paxora。
5. 重启 Mac 后再次尝试。

如果仍然无法连接，请向客服提供 macOS 版本、Paxora 版本和页面显示的错误信息。

## 关于代理模式

Paxora 首页下方提供“规则转发/代理模式”等高级选项。第一次使用时无需修改，保持默认设置即可。

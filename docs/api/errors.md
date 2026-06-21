---
title: 错误码
description: Flux API 错误码规范。
---

# 错误码

示例错误响应：

```json
{
  "code": "SUBSCRIPTION_EXPIRED",
  "message": "Subscription has expired."
}
```

常见错误码：

| 错误码 | 含义 |
| --- | --- |
| `UNAUTHORIZED` | 未认证或 token 无效 |
| `SUBSCRIPTION_EXPIRED` | 订阅已过期 |
| `NODE_UNAVAILABLE` | 节点不可用 |
| `RATE_LIMITED` | 请求过于频繁 |

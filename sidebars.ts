import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: '快速开始',
      collapsed: true,
      link: {type: 'doc', id: 'intro'},
      items: [
        {type: 'doc', id: 'getting-started/overview', label: '客户端选择'},
        'getting-started/download',
        {type: 'doc', id: 'getting-started/first-connection', label: '首次连接'},
      ],
    },
    {
      type: 'category',
      label: 'Paxora 定制客户端',
      link: {
        type: 'generated-index',
        slug: '/custom-clients',
        title: 'Paxora 定制客户端',
        description: '查看 Windows、macOS、Android 定制客户端与路由器插件的安装和使用说明。',
      },
      items: [
        {type: 'doc', id: 'installation/windows', label: 'Windows'},
        {type: 'doc', id: 'installation/macos', label: 'macOS'},
        {type: 'doc', id: 'installation/android', label: 'Android'},
        {
          type: 'category',
          label: '路由器',
          link: {
            type: 'generated-index',
            slug: '/third-party-clients/router',
            title: '路由器插件',
            description: '查看 OpenWrt 和 Merlin 路由器插件的安装与订阅配置说明。',
          },
          items: [
            {type: 'doc', id: 'third-party/router-openwrt-merlin', label: 'OpenWrt / Merlin'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '第三方客户端',
      link: {
        type: 'generated-index',
        slug: '/third-party-clients',
        title: '第三方客户端',
        description: '按平台查看兼容客户端的安装与订阅配置教程。第三方软件由其开发者维护。',
      },
      items: [
        {
          type: 'category',
          label: 'Windows',
          link: {
            type: 'generated-index',
            slug: '/third-party-clients/windows',
            title: 'Windows 第三方客户端',
            description: '查看 Windows 平台第三方客户端的安装与订阅配置教程。',
          },
          items: [
            {type: 'doc', id: 'third-party/windows-clash-verge', label: 'Clash Verge Rev'},
          ],
        },
        {
          type: 'category',
          label: 'macOS',
          link: {
            type: 'generated-index',
            slug: '/third-party-clients/macos',
            title: 'macOS 第三方客户端',
            description: '按 Mac 芯片与使用需求选择第三方客户端，旧版客户端已单独标注。',
          },
          items: [
            {type: 'doc', id: 'third-party/macos-clash-verge', label: 'Clash Verge Rev'},
            {type: 'doc', id: 'third-party/macos-shadowrocket', label: 'Shadowrocket（Apple 芯片）'},
            {type: 'doc', id: 'third-party/macos-clashx', label: 'ClashX（旧版）'},
          ],
        },
        {
          type: 'category',
          label: 'Android',
          link: {
            type: 'generated-index',
            slug: '/third-party-clients/android',
            title: 'Android 第三方客户端',
            description: '旧版 Clash 教程供已有用户参考，新用户建议优先使用 Paxora 定制客户端。',
          },
          items: [
            {type: 'doc', id: 'third-party/android-clash', label: 'Clash（旧版）'},
          ],
        },
        {
          type: 'category',
          label: 'iPhone / iPad',
          link: {
            type: 'generated-index',
            slug: '/third-party-clients/ios',
            title: 'iPhone / iPad 第三方客户端',
            description: '了解 iPhone 和 iPad 的使用方式，并通过 Shadowrocket 导入个人订阅。',
          },
          items: [
            {type: 'doc', id: 'installation/ios', label: '使用说明'},
            {type: 'doc', id: 'third-party/ios-shadowrocket', label: 'Shadowrocket'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '服务介绍',
      link: {
        type: 'generated-index',
        slug: '/service',
        title: '服务介绍',
        description: '了解个人订阅的使用方式、节点选择、流量倍率及账号安全。',
      },
      items: [
        {type: 'doc', id: 'subscription/overview', label: '订阅说明'},
        'subscription/import-subscription',
        'subscription/update-subscription',
        {type: 'doc', id: 'nodes/choose-node', label: '节点选择与流量倍率'},
        {type: 'doc', id: 'subscription/security', label: '账号与订阅安全'},
      ],
    },
    {
      type: 'category',
      label: '常见问题',
      link: {
        type: 'generated-index',
        slug: '/faq',
        title: '常见问题',
        description: '按问题现象查找连接、速度、DNS、代理冲突和流量异常的排查方法。',
      },
      items: [
        'troubleshooting/cannot-connect',
        {type: 'doc', id: 'troubleshooting/slow-speed', label: '速度慢与延迟高'},
        {type: 'doc', id: 'troubleshooting/dns-issue', label: 'DNS 与域名解析'},
        {type: 'doc', id: 'troubleshooting/proxy-conflict', label: '代理冲突与浏览器异常'},
        {type: 'doc', id: 'troubleshooting/traffic-usage', label: '流量统计与异常消耗'},
        {type: 'doc', id: 'support/tiktok', label: 'TikTok 使用说明'},
      ],
    },
    {
      type: 'category',
      label: '官网地址与联系我们',
      link: {type: 'doc', id: 'support/contact'},
      items: [
        {type: 'doc', id: 'support/feedback', label: '问题反馈指南'},
      ],
    },
    {type: 'doc', id: 'support/terms', label: '服务条款'},
    {type: 'link', label: '通知与公告', href: '/docs/announcements/2026'},
    {type: 'link', label: '客户端更新日志', href: '/docs/changelog'},
  ],
  announcements: ['announcements/2026', 'announcements/2025'],
  changelog: [
    'changelog/index',
    'changelog/windows',
    'changelog/macos',
    'changelog/android',
    'changelog/ios',
    'changelog/linux',
  ],
};

export default sidebars;

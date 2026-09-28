import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: '快速开始',
      collapsed: false,
      items: [
        'getting-started/overview',
        'getting-started/download',
        'getting-started/first-connection',
      ],
    },
    {
      type: 'category',
      label: 'Paxora 官方客户端',
      collapsed: false,
      items: [
        'installation/windows',
        'installation/macos',
        'installation/android',
      ],
    },
    {
      type: 'category',
      label: 'iPhone / iPad（第三方）',
      collapsed: false,
      items: [
        'installation/ios',
        'third-party/ios-shadowrocket',
      ],
    },
    {
      type: 'category',
      label: '其他第三方客户端',
      items: [
        'third-party/windows-clash-verge',
        'third-party/android-clash',
        'third-party/macos-clash-verge',
        'third-party/macos-shadowrocket',
        'third-party/macos-clashx',
      ],
    },
    {
      type: 'category',
      label: '路由器',
      items: [
        'third-party/router-openwrt-merlin',
      ],
    },
    {
      type: 'category',
      label: '订阅管理',
      items: [
        'subscription/overview',
        'subscription/import-subscription',
        'subscription/update-subscription',
        'subscription/security',
      ],
    },
    {
      type: 'category',
      label: '故障排查',
      items: [
        'troubleshooting/cannot-connect',
        'troubleshooting/traffic-usage',
        'troubleshooting/proxy-conflict',
        'troubleshooting/dns-issue',
        'troubleshooting/slow-speed',
      ],
    },
    {
      type: 'category',
      label: '公告日志',
      items: ['announcements/2026', 'announcements/2025'],
    },
    {
      type: 'category',
      label: '更新日志',
      items: ['changelog/index'],
    },
    {
      type: 'category',
      label: '服务与支持',
      items: [
        'support/tiktok',
        'support/contact',
        'support/terms',
      ],
    },
  ],
};

export default sidebars;

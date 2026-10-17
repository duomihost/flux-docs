import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: '快速开始',
      collapsed: false,
      items: [
        {type: 'doc', id: 'intro', label: '文档导览'},
        'getting-started/overview',
        'getting-started/download',
        'getting-started/first-connection',
      ],
    },
    {
      type: 'category',
      label: '客户端与设备',
      link: {
        type: 'generated-index',
        slug: '/clients',
        title: '客户端与设备',
        description: '按设备选择安装教程。Windows、macOS 和 Android 优先使用 Paxora 官方客户端；iPhone、iPad 和路由器使用兼容的第三方客户端或插件。',
      },
      items: [
        {
          type: 'category',
          label: 'Windows',
          link: {type: 'generated-index', slug: '/clients/windows', title: 'Windows 客户端', description: '优先使用 Paxora 官方客户端，也可选择 Clash Verge Rev。'},
          items: [
            {type: 'doc', id: 'installation/windows', label: 'Paxora（官方）'},
            {type: 'doc', id: 'third-party/windows-clash-verge', label: 'Clash Verge Rev'},
          ],
        },
        {
          type: 'category',
          label: 'macOS',
          link: {type: 'generated-index', slug: '/clients/macos', title: 'macOS 客户端', description: '优先使用 Paxora 官方客户端，第三方客户端请根据 Mac 芯片和兼容性选择。'},
          items: [
            {type: 'doc', id: 'installation/macos', label: 'Paxora（官方）'},
            {type: 'doc', id: 'third-party/macos-clash-verge', label: 'Clash Verge Rev'},
            {type: 'doc', id: 'third-party/macos-shadowrocket', label: 'Shadowrocket（Apple 芯片）'},
            {type: 'doc', id: 'third-party/macos-clashx', label: 'ClashX（旧版）'},
          ],
        },
        {
          type: 'category',
          label: 'Android',
          link: {type: 'generated-index', slug: '/clients/android', title: 'Android 客户端', description: '优先使用 Paxora 官方客户端；旧版 Clash 教程供已有用户参考。'},
          items: [
            {type: 'doc', id: 'installation/android', label: 'Paxora（官方）'},
            {type: 'doc', id: 'third-party/android-clash', label: 'Clash（旧版）'},
          ],
        },
        {
          type: 'category',
          label: 'iPhone / iPad',
          link: {type: 'generated-index', slug: '/clients/ios', title: 'iPhone / iPad 客户端', description: '了解第三方客户端的使用方式，并按 Shadowrocket 教程导入个人订阅。'},
          items: [
            {type: 'doc', id: 'installation/ios', label: '使用说明'},
            {type: 'doc', id: 'third-party/ios-shadowrocket', label: 'Shadowrocket'},
          ],
        },
        {type: 'doc', id: 'third-party/router-openwrt-merlin', label: '路由器（OpenWrt / Merlin）'},
      ],
    },
    {
      type: 'category',
      label: '订阅与节点',
      items: [
        'subscription/overview',
        'nodes/choose-node',
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
        'troubleshooting/slow-speed',
        'troubleshooting/dns-issue',
        'troubleshooting/proxy-conflict',
        'troubleshooting/traffic-usage',
      ],
    },
    {
      type: 'category',
      label: '服务与支持',
      items: [
        'support/contact',
        'support/tiktok',
        'support/terms',
      ],
    },
  ],
  announcements: ['announcements/2026', 'announcements/2025'],
  changelog: [
    'changelog/index',
    'changelog/windows',
    'changelog/macos',
    'changelog/android',
    'changelog/ios',
  ],
};

export default sidebars;

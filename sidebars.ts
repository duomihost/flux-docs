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
        'getting-started/account',
        'getting-started/first-connection',
      ],
    },
    {
      type: 'category',
      label: '安装教程',
      collapsed: false,
      items: [
        'installation/windows',
        'installation/macos',
        'installation/linux',
        'installation/android',
        'installation/ios',
      ],
    },
    {
      type: 'category',
      label: '订阅教程',
      items: [
        'subscription/overview',
        'subscription/import-subscription',
        'subscription/update-subscription',
        'subscription/subscription-expired',
        'subscription/security',
      ],
    },
    {
      type: 'category',
      label: '节点与线路',
      items: [
        'nodes/overview',
        'nodes/choose-node',
        'nodes/latency-test',
        'nodes/protocols',
        'nodes/idc-regions',
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
        'troubleshooting/login-failed',
      ],
    },
    {
      type: 'category',
      label: 'API 文档',
      items: [
        'api/overview',
        'api/authentication',
        'api/errors',
        'api/subscription-api',
        'api/nodes-api',
        'api/webhooks',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'faq/account',
        'faq/billing',
        'faq/subscription',
        'faq/privacy',
      ],
    },
    {
      type: 'category',
      label: '更新日志',
      items: [
        'changelog/index',
        'changelog/client',
        'changelog/api',
      ],
    },
    {
      type: 'category',
      label: '政策',
      items: [
        'legal/terms',
        'legal/privacy',
        'legal/acceptable-use',
      ],
    },
  ],
};

export default sidebars;

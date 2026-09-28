import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Paxora Docs',
  tagline: 'Paxora 客户端下载与使用文档',
  favicon: 'img/logo.png',
  customFields: {
    crispWebsiteId: process.env.CRISP_WEBSITE_ID ?? null,
    posthogProjectApiKey: process.env.POSTHOG_PROJECT_API_KEY ?? null,
    posthogHost: process.env.POSTHOG_HOST ?? 'https://us.i.posthog.com',
  },

  future: {
    v4: true,
  },

  url: 'https://flux-docs.pages.dev',
  baseUrl: '/',

  organizationName: 'duomihost',
  projectName: 'flux-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          exclude: [
            'api/**',
            'faq/**',
            'legal/**',
            'nodes/**',
            'getting-started/account.md',
            'installation/linux.md',
            'subscription/subscription-expired.md',
            'troubleshooting/login-failed.md',
          ],
        },
        blog: false,
        theme: {
          // React Native theme is ported as Sass (see src/css/*.scss).
          // _shared.scss is a Sass partial consumed via `@use "shared"`, so it
          // is intentionally not listed here.
          customCss: [
            './src/css/react-native-theme.scss',
            './src/css/react-native-components.scss',
            './src/css/custom.css',
          ],
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-plugin-sass',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['zh'],
        indexDocs: true,
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Paxora',
      style: 'dark',
      logo: {
        alt: 'Paxora Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          label: '文档',
          type: 'dropdown',
          position: 'right',
          items: [
            {label: '快速开始', to: '/docs/getting-started/overview'},
            {label: 'Paxora 客户端', to: '/docs/installation/windows'},
            {label: 'Apple 移动端', to: '/docs/installation/ios'},
            {label: '第三方客户端', to: '/docs/third-party/windows-clash-verge'},
            {label: '故障排查', to: '/docs/troubleshooting/cannot-connect'},
            {label: '公告日志', to: '/docs/announcements/2026'},
            {label: '更新日志', to: '/docs/changelog/2026'},
          ],
        },
        {to: '/docs/getting-started/download', label: '下载', position: 'right'},
        {to: '/docs/installation/windows', label: 'Paxora 教程', position: 'right'},
        {to: '/docs/installation/ios', label: '第三方教程', position: 'right'},
      ],
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '产品',
          items: [
            {label: '快速开始', to: '/docs/getting-started/overview'},
            {label: '下载客户端', to: '/docs/getting-started/download'},
            {label: 'Paxora 教程', to: '/docs/installation/windows'},
          ],
        },
        {
          title: '支持',
          items: [
            {label: '订阅管理', to: '/docs/subscription/overview'},
            {label: '故障排查', to: '/docs/troubleshooting/cannot-connect'},
            {label: '联系我们', to: '/docs/support/contact'},
            {label: '服务条款', to: '/docs/support/terms'},
          ],
        },
        {
          title: '第三方客户端',
          items: [
            {label: 'iPhone / iPad', to: '/docs/installation/ios'},
            {label: 'Clash Verge', to: '/docs/third-party/windows-clash-verge'},
            {label: '路由器', to: '/docs/third-party/router-openwrt-merlin'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paxora.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      // Enable RN-style code diffing via magic comments. The line classes are
      // styled in src/css/react-native-components.scss.
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-add-line',
          line: 'added-line',
          block: {start: 'added-start', end: 'added-end'},
        },
        {
          className: 'code-remove-line',
          line: 'removed-line',
          block: {start: 'removed-start', end: 'removed-end'},
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

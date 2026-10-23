import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import changelogVersionBadges from './scripts/remark-changelog-versions.mjs';

const config: Config = {
  title: 'Paxora Docs',
  tagline: 'Paxora 客户端下载与使用文档',
  favicon: 'img/logo.png',
  customFields: {
    // Official support is enabled by default; an explicit empty value disables it.
    crispWebsiteId: (process.env.CRISP_WEBSITE_ID ?? '25fdee9f-2b5f-4b83-87ac-dfc13e638660').trim(),
    posthogProjectApiKey: process.env.POSTHOG_PROJECT_API_KEY ?? null,
    posthogHost: process.env.POSTHOG_HOST ?? 'https://us.i.posthog.com',
  },

  // Restore before first paint; blocked storage simply keeps the default size.
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(){try{var s=localStorage.getItem('flux-docs-font-size');if(['small','standard','large'].indexOf(s)!==-1){document.documentElement.dataset.fluxFontSize=s;}}catch(e){}})();`,
    },
  ],

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
          showLastUpdateTime: true,
          remarkPlugins: [changelogVersionBadges],
          exclude: [
            'api/**',
            'faq/**',
            'legal/**',
            'nodes/overview.md',
            'nodes/protocols.md',
            'nodes/idc-regions.md',
            'nodes/latency-test.md',
            'getting-started/account.md',
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
            './src/css/docs-navigation.css',
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
            {label: '文档导览', to: '/docs/'},
            {label: '快速开始', to: '/docs/getting-started/overview'},
            {label: '服务介绍', to: '/docs/service'},
            {label: '常见问题', to: '/docs/faq'},
            {label: '官网地址与联系我们', to: '/docs/support/contact'},
            {label: '服务条款', to: '/docs/support/terms'},
          ],
        },
        {to: '/docs/getting-started/download', label: '下载', position: 'right'},
        {to: '/docs/custom-clients', label: 'Paxora 定制客户端', position: 'right'},
        {to: '/docs/third-party-clients', label: '第三方客户端', position: 'right'},
        {
          label: '通知与公告',
          type: 'dropdown',
          position: 'right',
          items: [
            {label: '2026 年公告', to: '/docs/announcements/2026'},
            {label: '2025 年公告', to: '/docs/announcements/2025'},
          ],
        },
        {
          label: '客户端更新日志',
          type: 'dropdown',
          position: 'right',
          items: [
            {label: '更新日志总览', to: '/docs/changelog'},
            {label: 'Windows', to: '/docs/changelog/windows'},
            {label: 'macOS', to: '/docs/changelog/macos'},
            {label: 'Android', to: '/docs/changelog/android'},
            {label: 'iOS', to: '/docs/changelog/ios'},
            {label: 'Linux', to: '/docs/changelog/linux'},
          ],
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: true,
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
            {label: 'Paxora 定制客户端', to: '/docs/custom-clients'},
            {label: '路由器', to: '/docs/third-party-clients/router'},
            {label: '第三方客户端', to: '/docs/third-party-clients'},
          ],
        },
        {
          title: '支持',
          items: [
            {label: '服务介绍', to: '/docs/service'},
            {label: '常见问题', to: '/docs/faq'},
            {label: '联系我们', to: '/docs/support/contact'},
            {label: '服务条款', to: '/docs/support/terms'},
          ],
        },
        {
          title: '第三方客户端',
          className: 'footer__platforms',
          items: [
            {label: 'Windows', to: '/docs/third-party-clients/windows'},
            {label: 'macOS', to: '/docs/third-party-clients/macos'},
            {label: 'Android', to: '/docs/third-party-clients/android'},
            {label: 'iPhone / iPad', to: '/docs/third-party-clients/ios'},
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

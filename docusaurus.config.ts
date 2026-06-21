import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Flux Docs',
  tagline: 'Flux VPN and IDC service documentation',
  favicon: 'img/logo.svg',

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
    locales: ['zh-Hans', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/duomihost/flux-docs/tree/main/',
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/duomihost/flux-docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
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
        language: ['en', 'zh'],
        indexDocs: true,
        indexBlog: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'initial-docs',
      content: 'Flux 文档站正在搭建中，第一版将优先覆盖安装、订阅、节点和故障排查。',
      backgroundColor: '#20232a',
      textColor: '#f8fafc',
      isCloseable: false,
    },
    navbar: {
      title: 'Flux',
      style: 'dark',
      logo: {
        alt: 'Flux Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: '1.0',
          position: 'left',
          type: 'dropdown',
          items: [
            {label: '当前版本', to: '/docs/'},
            {label: '更新日志', to: '/docs/changelog'},
          ],
        },
        {
          label: '文档',
          type: 'dropdown',
          position: 'right',
          items: [
            {label: '快速开始', to: '/docs/getting-started/overview'},
            {label: '安装教程', to: '/docs/installation/windows'},
            {label: '订阅教程', to: '/docs/subscription/overview'},
            {label: '节点与线路', to: '/docs/nodes/overview'},
            {label: '故障排查', to: '/docs/troubleshooting/cannot-connect'},
          ],
        },
        {to: '/docs/installation/windows', label: '安装', position: 'right'},
        {to: '/docs/subscription/overview', label: '订阅', position: 'right'},
        {to: '/docs/api/overview', label: 'API', position: 'right'},
        {to: '/blog', label: '更新日志', position: 'right'},
        {
          href: 'https://github.com/duomihost/flux',
          'aria-label': 'GitHub repository',
          className: 'navbar-github-link',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
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
            {label: '安装教程', to: '/docs/installation/windows'},
          ],
        },
        {
          title: '支持',
          items: [
            {label: 'FAQ', to: '/docs/faq/account'},
            {label: '故障排查', to: '/docs/troubleshooting/cannot-connect'},
            {label: '更新日志', to: '/docs/changelog'},
          ],
        },
        {
          title: '开发者',
          items: [
            {label: 'API 文档', to: '/docs/api/overview'},
            {label: 'GitHub', href: 'https://github.com/duomihost/flux'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Flux.`,
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

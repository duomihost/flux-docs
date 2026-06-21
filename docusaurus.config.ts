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
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
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
      logo: {
        alt: 'Flux Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: '文档',
        },
        {to: '/docs/installation/windows', label: '安装', position: 'left'},
        {to: '/docs/subscription/overview', label: '订阅', position: 'left'},
        {to: '/docs/api/overview', label: 'API', position: 'left'},
        {to: '/blog', label: '更新日志', position: 'left'},
        {
          href: 'https://github.com/duomihost/flux',
          label: 'GitHub',
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
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

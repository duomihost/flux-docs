import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type Platform = {
  badge: string;
  description: string;
  href: string;
  meta: string;
  name: string;
  primary?: boolean;
};

const platforms: Platform[] = [
  {
    badge: 'Windows',
    description: '适用于 Windows 10 / 11，推荐桌面用户优先下载。',
    href: '/docs/installation/windows',
    meta: 'Paxora 官方客户端',
    name: 'Paxora for Windows',
    primary: true,
  },
  {
    badge: 'macOS',
    description: '支持 Apple Silicon 与 Intel Mac，查看安装与首次连接步骤。',
    href: '/docs/installation/macos',
    meta: 'Paxora 官方客户端',
    name: 'Paxora for macOS',
  },
  {
    badge: 'Android',
    description: '在 Android 手机和平板上登录账号、同步节点并快速连接。',
    href: '/docs/installation/android',
    meta: 'Paxora 官方客户端',
    name: 'Paxora for Android',
  },
  {
    badge: 'iOS',
    description: 'Paxora 暂无 iOS 客户端，请使用 Shadowrocket。',
    href: '/docs/installation/ios',
    meta: '第三方客户端',
    name: 'iPhone / iPad',
  },
];

const guideLinks = [
  {
    title: '首次连接',
    description: '从登录账户到选择节点，完成第一次连接。',
    to: '/docs/getting-started/first-connection',
  },
  {
    title: 'iPhone / iPad',
    description: '使用 Shadowrocket 导入 Paxora 订阅。',
    to: '/docs/installation/ios',
  },
  {
    title: '无法连接',
    description: '按网络、订阅、节点和本机代理冲突逐项排查。',
    to: '/docs/troubleshooting/cannot-connect',
  },
];

export default function Home(): ReactNode {
  const primaryPlatform = platforms.find((platform) => platform.primary);

  return (
    <Layout
      title="Paxora 下载"
      description="下载 Paxora 客户端，查看 Windows、macOS、Android 和 Apple 移动端使用教程。">
      <main className={styles.homepage}>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className="container">
            <div className={styles.heroLayout}>
              <div className={styles.heroContent}>
                <img className={styles.logo} src="/img/logo.svg" alt="" />
                <span className={styles.eyebrow}>Paxora Download Center</span>
                <Heading as="h1" className={styles.title}>
                  下载 Paxora
                </Heading>
                <p className={styles.subtitle}>
                  Windows、macOS 和 Android 优先使用 Paxora 官方客户端。
                  iPhone 与 iPad 暂时使用经过说明的第三方客户端。
                </p>
                <div className={styles.actions}>
                  <Link
                    className={styles.primaryButton}
                    to={primaryPlatform?.href ?? '/docs/getting-started/download'}>
                    下载 Windows 版本
                  </Link>
                  <Link
                    className={styles.secondaryButton}
                    to="/docs/getting-started/download">
                    查看全部下载说明
                  </Link>
                </div>
                <div className={styles.releaseMeta} aria-label="版本信息">
                  <span>Paxora 官方客户端优先</span>
                  <span>Apple 移动端使用第三方客户端</span>
                  <span>请保护个人订阅地址</span>
                </div>
              </div>

              <div className={styles.downloadPanel} aria-label="平台下载列表">
                {platforms.map((platform) => (
                  <Link
                    className={styles.platformCard}
                    data-primary={platform.primary ? 'true' : undefined}
                    key={platform.name}
                    to={platform.href}>
                    <span className={styles.platformBadge}>{platform.badge}</span>
                    <span className={styles.platformContent}>
                      <strong>{platform.name}</strong>
                      <small>{platform.description}</small>
                    </span>
                    <span className={styles.platformMeta}>{platform.meta}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.guides}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">安装后继续</Heading>
              <p>下载完成后，可以按这些文档完成账户、订阅和连接配置。</p>
            </div>
            <div className={styles.guideGrid}>
              {guideLinks.map((item) => (
                <Link className={styles.guideCard} to={item.to} key={item.title}>
                  <span className={styles.guideTitle}>{item.title}</span>
                  <span className={styles.guideDescription}>{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

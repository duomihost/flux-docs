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
    meta: '64-bit 安装指南',
    name: 'Flux for Windows',
    primary: true,
  },
  {
    badge: 'macOS',
    description: '支持 Apple Silicon 与 Intel Mac，适合日常代理和订阅管理。',
    href: '/docs/installation/macos',
    meta: 'DMG 安装指南',
    name: 'Flux for macOS',
  },
  {
    badge: 'Android',
    description: '在 Android 手机、平板和 TV 设备上导入订阅并快速连接。',
    href: '/docs/installation/android',
    meta: 'APK 安装指南',
    name: 'Flux for Android',
  },
  {
    badge: 'iOS',
    description: '面向 iPhone 与 iPad 用户，查看 App Store/TestFlight 安装说明。',
    href: '/docs/installation/ios',
    meta: '移动端安装指南',
    name: 'Flux for iOS',
  },
  {
    badge: 'Linux',
    description: '用于桌面 Linux 或服务器环境，适合高级网络与 IDC 场景。',
    href: '/docs/installation/linux',
    meta: '命令行安装指南',
    name: 'Flux for Linux',
  },
];

const guideLinks = [
  {
    title: '首次连接',
    description: '从登录账户到选择节点，完成第一次连接。',
    to: '/docs/getting-started/first-connection',
  },
  {
    title: '导入订阅',
    description: '添加订阅链接、更新节点列表并保护订阅地址。',
    to: '/docs/subscription/import-subscription',
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
      title="Flux 下载"
      description="下载 Flux VPN 客户端，查看 Windows、macOS、Android、iOS 和 Linux 安装指南。">
      <main className={styles.homepage}>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className="container">
            <div className={styles.heroLayout}>
              <div className={styles.heroContent}>
                <img className={styles.logo} src="/img/logo.svg" alt="" />
                <span className={styles.eyebrow}>Flux Download Center</span>
                <Heading as="h1" className={styles.title}>
                  下载 Flux 客户端
                </Heading>
                <p className={styles.subtitle}>
                  为 Windows、macOS、Android、iOS 和 Linux 设备准备的安装入口。
                  选择你的平台，查看官方安装步骤并安全导入订阅。
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
                  <span>当前文档版本 1.0</span>
                  <span>最后更新 2026-06-21</span>
                  <span>官方渠道优先</span>
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

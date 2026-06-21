import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const primaryLinks = [
  {
    title: '安装客户端',
    description: '在 Windows、macOS、Android 和 iOS 上安装 Flux。',
    to: '/docs/installation/windows',
  },
  {
    title: '导入订阅',
    description: '添加订阅链接、更新节点列表并保护订阅安全。',
    to: '/docs/subscription/import-subscription',
  },
  {
    title: '排查连接',
    description: '处理无法连接、速度慢、DNS 异常和代理冲突。',
    to: '/docs/troubleshooting/cannot-connect',
  },
  {
    title: 'API 文档',
    description: '查看鉴权、错误码、订阅 API、节点 API 和 Webhook。',
    to: '/docs/api/overview',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Flux Docs"
      description="Flux VPN 客户端、订阅、节点、API 和 IDC 服务官方文档。">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Flux Documentation</p>
              <Heading as="h1" className={styles.title}>
                Flux VPN 与 IDC 服务文档中心
              </Heading>
              <p className={styles.subtitle}>
                面向用户、运维和开发者的官方文档：安装客户端、导入订阅、选择节点、排查连接问题，并对接 Flux API。
              </p>
              <div className={styles.actions}>
                <Link className="button button--primary button--lg" to="/docs/getting-started/overview">
                  开始使用
                </Link>
                <Link className="button button--secondary button--lg" to="/docs/api/overview">
                  查看 API
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.quickLinks}>
          <div className="container">
            <div className={styles.grid}>
              {primaryLinks.map((item) => (
                <Link className={styles.card} to={item.to} key={item.title}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.cardDescription}>{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

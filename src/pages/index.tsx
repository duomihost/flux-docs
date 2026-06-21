import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const primaryLinks = [
  {
    title: '安装客户端',
    description: 'Windows、macOS、Android、iOS 和 Linux 安装指南。',
    to: '/docs/installation/windows',
  },
  {
    title: '导入订阅',
    description: '添加订阅链接、更新节点列表并保护订阅地址。',
    to: '/docs/subscription/import-subscription',
  },
  {
    title: '选择节点',
    description: '按地区、延迟、负载和业务场景选择合适线路。',
    to: '/docs/nodes/choose-node',
  },
  {
    title: 'API 文档',
    description: '鉴权、错误码、订阅接口、节点接口和 Webhook。',
    to: '/docs/api/overview',
  },
];

const terminalLines = [
  '$ flux login',
  '$ flux subscription import https://example.com/sub',
  '$ flux connect --region hk --mode global',
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Flux Docs"
      description="Flux VPN 客户端、订阅、节点、API 和 IDC 服务官方文档。">
      <main className={styles.homepage}>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroContent}>
            <img className={styles.logo} src="/img/logo.svg" alt="" />
            <Heading as="h1" className={styles.title}>
              Flux 文档中心
            </Heading>
            <p className={styles.subtitle}>
              VPN 客户端、节点订阅、IDC 服务和开放 API 的官方文档。
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} to="/docs/getting-started/overview">
                开始使用
              </Link>
              <Link className={styles.secondaryButton} to="/docs/api/overview">
                查看 API
              </Link>
            </div>
          </div>
          <div className={styles.deviceStage} aria-hidden="true">
            <div className={styles.device}>
              <div className={styles.deviceHeader}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.signalPanel}>
                <div className={styles.signalRing} />
                <div>
                  <strong>Hong Kong 01</strong>
                  <small>24 ms · WireGuard</small>
                </div>
              </div>
              <div className={styles.routeList}>
                <span>Singapore IDC</span>
                <span>Tokyo Edge</span>
                <span>Los Angeles Transit</span>
              </div>
            </div>
            <div className={styles.terminal}>
              {terminalLines.map((line) => (
                <code key={line}>{line}</code>
              ))}
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

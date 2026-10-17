import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/DocCard/Layout';
import styles from './styles.module.css';

const platformDescriptions: Record<string, string> = {
  Windows: 'Clash Verge Rev 安装与配置',
  macOS: 'Clash Verge Rev、Shadowrocket 与 ClashX',
  Android: 'Clash 安装与订阅配置',
  'iPhone / iPad': 'Shadowrocket 安装、导入与连接',
  '路由器': 'OpenWrt / Merlin 插件配置',
};

function EntryIcon({title}: {title: string}): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {title === 'Windows' ? <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 4v16M4 12h16" /></>
        : title === 'macOS' ? <><rect x="4" y="4" width="16" height="12" rx="2" /><path d="M8 20h8m-4-4v4" /></>
          : title === 'Android' || title === 'iPhone / iPad' ? <><rect x="6" y="3" width="12" height="18" rx="3" /><path d="M10 6h4m-3 12h2" /></>
            : title === '路由器' ? <><rect x="3" y="12" width="18" height="8" rx="2" /><path d="M6 12V5m12 7V5M7 16h.01M11 16h.01" /></>
              : <><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6" /></>}
    </svg>
  );
}

export default function DocCardLayout({item, className, href, title, description}: Props): ReactNode {
  const isCategory = item.type === 'category';
  const summary = isCategory ? platformDescriptions[title] ?? description : description;

  return (
    <Link href={href} className={clsx(styles.entry, className)}>
      <span className={styles.icon}><EntryIcon title={title} /></span>
      <span className={styles.content}>
        <span className={styles.title}>{title}</span>
        {summary && <span className={styles.description}>{summary}</span>}
        {isCategory && <span className={styles.meta}>{item.items.length} 篇文档</span>}
      </span>
      <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
    </Link>
  );
}

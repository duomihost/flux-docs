import type {ReactNode} from 'react';
import OriginalCategoryPage from '@theme-original/DocCategoryGeneratedIndexPage';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';
import styles from './styles.module.css';

export default function DocCategoryGeneratedIndexPage(props: Props): ReactNode {
  return <div className={styles.page}><OriginalCategoryPage {...props} /></div>;
}

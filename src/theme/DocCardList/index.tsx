import type {ReactNode} from 'react';
import clsx from 'clsx';
import {filterDocCardListItems, useCurrentSidebarSiblings} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';
import type {Props} from '@theme/DocCardList';
import styles from './styles.module.css';

function CurrentCategory(props: Props): ReactNode {
  const items = useCurrentSidebarSiblings();
  return <DocCardList {...props} items={items} />;
}

export default function DocCardList(props: Props): ReactNode {
  if (!props.items) return <CurrentCategory {...props} />;
  return (
    <section className={clsx(styles.grid, props.className)}>
      {filterDocCardListItems(props.items).map((item, index) => <DocCard key={index} item={item} />)}
    </section>
  );
}

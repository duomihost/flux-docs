/**
 * Adapted from Docusaurus theme-classic DocSidebarItem/Link (MIT).
 * Copyright (c) Facebook, Inc. and its affiliates.
 */
import type {ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';

export default function DocSidebarItemLink({item, onItemClick, activePath, level, index, ...props}: Props): ReactNode {
  const isActive = isActiveSidebarItem(item, activePath);
  const internal = isInternalUrl(item.href);
  const annotation = /^(.*?)（(旧版|Apple 芯片)）$/.exec(item.label);

  return (
    <li className={clsx(
      ThemeClassNames.docs.docSidebarItemLink,
      ThemeClassNames.docs.docSidebarItemLinkLevel(level),
      'menu__list-item',
      item.className,
    )}>
      <Link
        {...props}
        className={clsx('menu__link', {'menu__link--active': isActive})}
        autoAddBaseUrl={item.autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        aria-label={item.label}
        title={item.label}
        to={item.href}
        onClick={internal && onItemClick ? () => onItemClick(item) : undefined}>
        <span className="flux-sidebar-label">{annotation?.[1] ?? item.label}</span>
        {annotation && <span className="flux-sidebar-badge" aria-hidden="true">{annotation[2]}</span>}
        {!internal && <IconExternalLink />}
      </Link>
    </li>
  );
}

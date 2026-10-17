/**
 * Adapted from Docusaurus theme-classic DocSidebarItem/Category (MIT).
 * Copyright (c) Facebook, Inc. and its affiliates.
 * Category names navigate, including on the current overview page; the
 * separate disclosure button owns collapse and expand interactions.
 */
import {useEffect, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {Collapsible, ThemeClassNames, useCollapsible, usePrevious, useThemeConfig} from '@docusaurus/theme-common';
import {isSamePath} from '@docusaurus/theme-common/internal';
import {findFirstSidebarItemLink, isActiveSidebarItem, useDocSidebarItemsExpandedState, useVisibleSidebarItems} from '@docusaurus/plugin-content-docs/client';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebarItem/Category';

export default function DocSidebarItemCategory({item, onItemClick, activePath, level, index, ...props}: Props): ReactNode {
  const children = useVisibleSidebarItems(item.items, activePath);
  const href = item.linkUnlisted ? undefined : item.href ?? findFirstSidebarItemLink(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);
  const {docs: {sidebar: {autoCollapseCategories}}} = useThemeConfig();
  const {collapsed, setCollapsed} = useCollapsible({initialState: () => item.collapsible && !isActive ? item.collapsed : false});
  const {expandedItem, setExpandedItem} = useDocSidebarItemsExpandedState();
  const previousPath = usePrevious(activePath);

  useEffect(() => {
    if (isActive && previousPath !== activePath) {
      setCollapsed(false);
      setExpandedItem(index);
    }
  }, [activePath, previousPath, isActive, index, setCollapsed, setExpandedItem]);

  useEffect(() => {
    if (item.collapsible && autoCollapseCategories && expandedItem != null && expandedItem !== index) {
      setCollapsed(true);
    }
  }, [item.collapsible, autoCollapseCategories, expandedItem, index, setCollapsed]);

  if (!href) return null;
  const expandable = item.collapsible && children.length > 0;

  return (
    <li className={clsx(
      ThemeClassNames.docs.docSidebarItemCategory,
      ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
      'menu__list-item',
      {'menu__list-item--collapsed': collapsed},
      item.className,
    )}>
      <div className={clsx('menu__list-item-collapsible', {'menu__list-item-collapsible--active': isCurrentPage})}>
        <Link
          {...props}
          href={href}
          className={clsx('menu__link', {'menu__link--sublist': expandable, 'menu__link--active': isActive})}
          aria-current={isCurrentPage ? 'page' : undefined}
          onClick={() => {
            setCollapsed(false);
            setExpandedItem(index);
            onItemClick?.(item);
          }}>
          <span title={item.label}>{item.label}</span>
        </Link>
        {expandable && (
          <button
            type="button"
            className="clean-btn menu__caret"
            aria-label={`${collapsed ? '展开' : '收起'}分类“${item.label}”`}
            aria-expanded={!collapsed}
            onClick={() => {
              setExpandedItem(collapsed ? index : null);
              setCollapsed(!collapsed);
            }}
          />
        )}
      </div>
      {children.length > 0 && (
        <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
          <DocSidebarItems items={children} tabIndex={collapsed ? -1 : 0} onItemClick={onItemClick} activePath={activePath} level={level + 1} />
        </Collapsible>
      )}
    </li>
  );
}

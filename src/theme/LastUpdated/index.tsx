import React, {type ReactNode} from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {Props} from '@theme/LastUpdated';

const localeMap: Record<string, string> = {
  'zh-Hans': 'zh-CN',
  en: 'en-US',
};

export default function LastUpdated({
  lastUpdatedAt,
}: Props): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();

  if (!lastUpdatedAt) {
    return null;
  }

  const atDate = new Date(lastUpdatedAt);
  const label = currentLocale === 'en' ? 'Last updated on' : '最后更新于';
  const formatter = new Intl.DateTimeFormat(
    localeMap[currentLocale] ?? currentLocale,
    {
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
      year: 'numeric',
    },
  );

  return (
    <span className={ThemeClassNames.common.lastUpdated}>
      {label}{' '}
      <b>
        <time dateTime={atDate.toISOString()} itemProp="dateModified">
          {formatter.format(atDate)}
        </time>
      </b>
    </span>
  );
}

import React, {type ReactNode, useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {loadCrisp} from '@site/src/lib/crisp.mjs';

type CustomFields = {
  crispWebsiteId?: string | null;
};

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

export default function Root({children}: {children: ReactNode}): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {crispWebsiteId} = siteConfig.customFields as CustomFields;

  useEffect(() => {
    loadCrisp(crispWebsiteId);
  }, [crispWebsiteId]);

  return <>{children}</>;
}

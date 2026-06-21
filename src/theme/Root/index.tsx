import React, {type ReactNode, useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type CustomFields = {
  crispWebsiteId?: string | null;
};

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

const CRISP_SCRIPT_ID = 'crisp-chatbox-script';
const CRISP_SCRIPT_SRC = 'https://client.crisp.chat/l.js';

function loadCrisp(websiteId: string) {
  window.$crisp = window.$crisp ?? [];
  window.CRISP_WEBSITE_ID = websiteId;

  if (document.getElementById(CRISP_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.id = CRISP_SCRIPT_ID;
  script.src = CRISP_SCRIPT_SRC;
  script.async = true;

  document.head.appendChild(script);
}

export default function Root({children}: {children: ReactNode}): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {crispWebsiteId} = siteConfig.customFields as CustomFields;

  useEffect(() => {
    if (!crispWebsiteId) {
      return;
    }

    loadCrisp(crispWebsiteId);
  }, [crispWebsiteId]);

  return <>{children}</>;
}

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
const WELCOME_SCRIPT_ID = 'crispai-welcome-script';

function loadCrisp(websiteId: string) {
  window.$crisp = window.$crisp ?? [];
  window.CRISP_WEBSITE_ID = websiteId;

  if (!document.getElementById(WELCOME_SCRIPT_ID)) {
    const welcome = document.createElement('script');
    welcome.id = WELCOME_SCRIPT_ID;
    welcome.src = 'https://crisp.cloudarch.org/intro.js';
    welcome.async = true;
    document.head.appendChild(welcome);
  }

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
  const websiteId = crispWebsiteId ?? '25fdee9f-2b5f-4b83-87ac-dfc13e638660';

  useEffect(() => {
    if (!websiteId) {
      return;
    }

    loadCrisp(websiteId);
  }, [websiteId]);

  return <>{children}</>;
}

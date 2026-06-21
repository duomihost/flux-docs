import React, {type ReactNode, useEffect, useMemo, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

type FeedbackVote = 'yes' | 'no';
type FeedbackAnalyticsConfig = {
  posthogHost?: string | null;
  posthogProjectApiKey?: string | null;
};

const STORAGE_PREFIX = 'flux-docs-page-feedback:';
const DISTINCT_ID_KEY = 'flux-docs-posthog-distinct-id';
const POSTHOG_CAPTURE_PATH = '/i/v0/e/';

function getPostHogDistinctId(): string {
  try {
    const storedId = window.localStorage.getItem(DISTINCT_ID_KEY);

    if (storedId) {
      return storedId;
    }

    const randomId =
      typeof window.crypto?.randomUUID === 'function'
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const nextId = `anonymous-${randomId}`;

    window.localStorage.setItem(DISTINCT_ID_KEY, nextId);

    return nextId;
  } catch {
    return `anonymous-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

function normalizePostHogHost(host: string): string {
  return host.replace(/\/+$/, '');
}

export default function PageFeedback(): ReactNode {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const [vote, setVote] = useState<FeedbackVote | null>(null);

  const {posthogHost, posthogProjectApiKey} =
    siteConfig.customFields as FeedbackAnalyticsConfig;
  const storageKey = useMemo(() => `${STORAGE_PREFIX}${pathname}`, [pathname]);

  useEffect(() => {
    try {
      const savedVote = window.localStorage.getItem(storageKey);

      if (savedVote === 'yes' || savedVote === 'no') {
        setVote(savedVote);
      } else {
        setVote(null);
      }
    } catch {
      setVote(null);
    }
  }, [storageKey]);

  function handleVote(nextVote: FeedbackVote) {
    setVote(nextVote);

    try {
      window.localStorage.setItem(storageKey, nextVote);
    } catch {
      // The UI still acknowledges the vote if storage is unavailable.
    }

    if (!posthogProjectApiKey) {
      return;
    }

    const host = normalizePostHogHost(
      posthogHost ?? 'https://us.i.posthog.com',
    );

    void fetch(`${host}${POSTHOG_CAPTURE_PATH}`, {
      body: JSON.stringify({
        api_key: posthogProjectApiKey,
        distinct_id: getPostHogDistinctId(),
        event: 'docs_feedback',
        properties: {
          $current_url: window.location.href,
          $process_person_profile: false,
          path: pathname,
          vote: nextVote,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
      method: 'POST',
    }).catch(() => {
      // Feedback should never make the docs page feel broken.
    });
  }

  return (
    <section className={styles.feedback} aria-labelledby="page-feedback-title">
      <div>
        <h2 id="page-feedback-title" className={styles.title}>
          此页面是否有用？
        </h2>
        <p className={styles.description}>
          你的反馈会帮助我们优先改进文档内容。
        </p>
      </div>
      <div className={styles.actions} aria-label="页面反馈">
        <button
          type="button"
          className={styles.button}
          aria-pressed={vote === 'yes'}
          data-active={vote === 'yes'}
          onClick={() => handleVote('yes')}>
          是
        </button>
        <button
          type="button"
          className={styles.button}
          aria-pressed={vote === 'no'}
          data-active={vote === 'no'}
          onClick={() => handleVote('no')}>
          否
        </button>
      </div>
      {vote && (
        <p className={styles.thanks} role="status">
          感谢反馈，我们已记录本页选择。
        </p>
      )}
    </section>
  );
}

import React, {type ReactNode, useEffect, useMemo, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {captureFeedback, readFeedback, saveFeedback} from '@site/src/lib/page-feedback.mjs';

import styles from './styles.module.css';

type FeedbackVote = 'yes' | 'no';
type FeedbackAnalyticsConfig = {
  posthogHost?: string | null;
  posthogProjectApiKey?: string | null;
};

const STORAGE_PREFIX = 'flux-docs-page-feedback:';

export default function PageFeedback(): ReactNode {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const [vote, setVote] = useState<FeedbackVote | null>(null);

  const {posthogHost, posthogProjectApiKey} =
    siteConfig.customFields as FeedbackAnalyticsConfig;
  const storageKey = useMemo(() => `${STORAGE_PREFIX}${pathname}`, [pathname]);

  useEffect(() => {
    setVote(readFeedback(storageKey));
  }, [storageKey]);

  function handleVote(nextVote: FeedbackVote) {
    setVote(nextVote);

    saveFeedback(storageKey, nextVote);
    void captureFeedback({posthogHost, posthogProjectApiKey}, pathname, nextVote);
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

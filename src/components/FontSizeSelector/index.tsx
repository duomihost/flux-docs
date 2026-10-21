import React, {type ReactNode, useEffect, useState} from 'react';
import styles from './styles.module.css';

const STORAGE_KEY = 'flux-docs-font-size';
const sizes = ['small', 'standard', 'large'] as const;
type FontSize = (typeof sizes)[number];

function isFontSize(value: string | null | undefined): value is FontSize {
  return sizes.includes(value as FontSize);
}

export default function FontSizeSelector(): ReactNode {
  const [size, setSize] = useState<FontSize>('standard');

  useEffect(() => {
    function syncSize() {
      const current = document.documentElement.dataset.fluxFontSize;
      setSize(isFontSize(current) ? current : 'standard');
    }
    syncSize();
    // Desktop and mobile navbar instances share the same preference.
    window.addEventListener('flux-font-size-change', syncSize);
    function onStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY || event.key === null) {
        document.documentElement.dataset.fluxFontSize =
          isFontSize(event.newValue) ? event.newValue : 'standard';
        syncSize();
      }
    }
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('flux-font-size-change', syncSize);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className={styles.control}>
      <span className={styles.label}>字号</span>
      <div role="group" aria-label="阅读字号" className={styles.segments}>
        {sizes.map((option, index) => (
          <button key={option} type="button" aria-pressed={size === option}
            onClick={() => {
              document.documentElement.dataset.fluxFontSize = option;
              setSize(option);
              window.dispatchEvent(new Event('flux-font-size-change'));
              try {window.localStorage.setItem(STORAGE_KEY, option);} catch { /* Session only. */ }
            }}>
            {['小', '标准', '大'][index]}
          </button>
        ))}
      </div>
    </div>
  );
}

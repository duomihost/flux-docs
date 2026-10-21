import React, {type ReactNode, useEffect, useId, useRef, useState} from 'react';
import clsx from 'clsx';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import type {Props} from '@theme/Navbar/ColorModeToggle';
import FontSizeSelector from '@site/src/components/FontSizeSelector';
import styles from './styles.module.css';

type PaletteId = 'harbor' | 'aurora' | 'graphite' | 'pearl';

type PaletteOption = {
  id: PaletteId;
  label: string;
  swatches: readonly string[];
};

const STORAGE_KEY = 'flux-docs-color-palette';

const palettes: readonly PaletteOption[] = [
  {
    id: 'harbor',
    label: 'Harbor',
    swatches: ['#f8fbff', '#172033', '#0b6f91'],
  },
  {
    id: 'aurora',
    label: 'Aurora',
    swatches: ['#f7f9f6', '#1f2937', '#16725f'],
  },
  {
    id: 'graphite',
    label: 'Graphite',
    swatches: ['#f7f7f8', '#18181b', '#315f9f'],
  },
  {
    id: 'pearl',
    label: 'Pearl',
    swatches: ['#fbfaf7', '#24201a', '#a14d18'],
  },
];


function isPaletteId(value: string | null | undefined): value is PaletteId {
  return palettes.some((option) => option.id === value);
}

export default function NavbarColorModeToggle({className}: Props): ReactNode {
  const {colorModeChoice, setColorMode} = useColorMode();
  const {disableSwitch} = useThemeConfig().colorMode;
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<PaletteId>('harbor');
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    function sync() {
      const value = document.documentElement.dataset.fluxPalette;
      setPalette(isPaletteId(value) ? value : 'harbor');
    }
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      document.documentElement.dataset.fluxPalette = isPaletteId(value) ? value : 'harbor';
    } catch { /* Keep controls usable when storage is blocked. */ }
    sync();
    function onStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY || event.key === null) {
        document.documentElement.dataset.fluxPalette = isPaletteId(event.newValue) ? event.newValue : 'harbor';
        sync();
      }
    }
    window.addEventListener('flux-palette-change', sync);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('flux-palette-change', sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    // Move focus into the non-modal panel; Tab can leave and close it.
    root.current?.querySelector<HTMLButtonElement>('[role="dialog"] button')?.focus();
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <div ref={root} className={clsx(styles.root, className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}>
      <button ref={trigger} type="button" className={clsx('clean-btn', styles.trigger)}
        aria-label="阅读设置" title="阅读设置" aria-expanded={open}
        aria-haspopup="dialog" aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h7m4 0h5M4 17h3m4 0h9" />
          <circle cx="13" cy="7" r="2" /><circle cx="9" cy="17" r="2" />
        </svg>
      </button>
      {open && <div id={panelId} role="dialog" aria-label="阅读设置" className={styles.panel}>
        <div className={styles.header}><strong>阅读设置</strong>
          <button type="button" className={styles.close} aria-label="关闭阅读设置"
            onClick={() => {setOpen(false); trigger.current?.focus();}}>×</button>
        </div>
        {!disableSwitch && <div className={styles.section}>
          <span className={styles.label}>主题</span>
          <div role="group" aria-label="主题" className={styles.segments}>
            {([{value: 'light', label: '浅色'}, {value: 'dark', label: '深色'}, {value: null, label: '跟随系统'}] as const).map((option) => (
              <button key={option.label} type="button" aria-pressed={colorModeChoice === option.value}
                onClick={() => setColorMode(option.value)}>{option.label}</button>
            ))}
          </div>
        </div>}
        <div className={styles.section}>
          <span className={styles.label}>配色</span>
          <div role="group" aria-label="配色" className={styles.palettes}>
            {palettes.map((option, index) => (
              <button key={option.id} type="button" aria-label={['海港蓝', '极光绿', '石墨', '珍珠'][index]}
                title={['海港蓝', '极光绿', '石墨', '珍珠'][index]} aria-pressed={palette === option.id}
                onClick={() => {
                  document.documentElement.dataset.fluxPalette = option.id;
                  setPalette(option.id);
                  window.dispatchEvent(new Event('flux-palette-change'));
                  try {localStorage.setItem(STORAGE_KEY, option.id);} catch { /* Session only. */ }
                }}>
                <span style={{background: option.swatches[2]}} />
              </button>
            ))}
          </div>
        </div>
        <FontSizeSelector />
        <p className={styles.hint}>偏好自动保存在当前浏览器</p>
      </div>}
    </div>
  );
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import type {Props} from '@theme/Navbar/ColorModeToggle';
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

function isPaletteId(value: string | null): value is PaletteId {
  return palettes.some((palette) => palette.id === value);
}

function applyPalette(palette: PaletteId) {
  document.documentElement.dataset.fluxPalette = palette;
}

function ColorPaletteSelector({
  darkNavbar,
}: {
  darkNavbar: boolean;
}): ReactNode {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<PaletteId>('harbor');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedPalette = window.localStorage.getItem(STORAGE_KEY);
    const nextPalette = isPaletteId(savedPalette) ? savedPalette : 'harbor';

    setPalette(nextPalette);
    applyPalette(nextPalette);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  function selectPalette(nextPalette: PaletteId) {
    setPalette(nextPalette);
    applyPalette(nextPalette);
    setOpen(false);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextPalette);
    } catch {
      // Palette switching should still work for the current session.
    }
  }

  const activePalette = palettes.find((option) => option.id === palette);

  return (
    <div className={styles.paletteSelector} ref={menuRef}>
      <button
        type="button"
        className={clsx(
          'clean-btn',
          styles.paletteButton,
          darkNavbar && styles.darkNavbarButton,
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="选择站点配色"
        title={`配色：${activePalette?.label ?? 'Harbor'}`}
        onClick={() => setOpen((value) => !value)}>
        <span className={styles.previewSwatches} aria-hidden="true">
          {(activePalette ?? palettes[0]).swatches.map((color) => (
            <span key={color} style={{backgroundColor: color}} />
          ))}
        </span>
      </button>
      {open && (
        <div className={styles.paletteMenu} role="menu">
          {palettes.map((option) => (
            <button
              key={option.id}
              type="button"
              className={styles.paletteMenuItem}
              role="menuitemradio"
              aria-checked={palette === option.id}
              data-active={palette === option.id}
              onClick={() => selectPalette(option.id)}>
              <span className={styles.previewSwatches} aria-hidden="true">
                {option.swatches.map((color) => (
                  <span key={color} style={{backgroundColor: color}} />
                ))}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavbarColorModeToggle({className}: Props): ReactNode {
  const navbarStyle = useThemeConfig().navbar.style;
  const {disableSwitch, respectPrefersColorScheme} = useThemeConfig().colorMode;
  const {colorModeChoice, setColorMode} = useColorMode();
  const darkNavbar = navbarStyle === 'dark';

  if (disableSwitch) {
    return null;
  }

  return (
    <div className={clsx(styles.toggleGroup, className)}>
      <ColorModeToggle
        buttonClassName={
          darkNavbar ? styles.darkNavbarColorModeToggle : undefined
        }
        respectPrefersColorScheme={respectPrefersColorScheme}
        value={colorModeChoice}
        onChange={setColorMode}
      />
      <ColorPaletteSelector darkNavbar={darkNavbar} />
    </div>
  );
}

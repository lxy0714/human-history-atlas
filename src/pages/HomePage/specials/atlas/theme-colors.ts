// EXPORTS: useThemeColors, getEChartsThemeOption

import { AppEvents } from '../../app-events';
import { useEffect, useState } from 'react';

// 读取 CSS 变量值（hex），用于 ECharts 主题适配
function getCssVar(name: string): string {
  if (typeof window === 'undefined') return '#000';
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return val;
}

// hsl 转 hex（简易）
function hslToHex(hslStr: string): string {
  // 输入可能是 "hsl(40 45% 61%)" 或 "#xxx" 或其他
  if (hslStr.startsWith('#')) return hslStr;
  const match = hslStr.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%?\s*\)/);
  if (!match) return '#888888';
  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export interface ThemeColors {
  foreground: string;
  muted: string;
  border: string;
  card: string;
  background: string;
  primary: string;
  tooltipBg: string;
  tooltipText: string;
  axisLine: string;
  splitLine: string;
  textSecondary: string;
}

export function readThemeColors(): ThemeColors {
  const fg = hslToHex(getCssVar('--foreground') || '#000');
  const mutedFg = hslToHex(getCssVar('--muted-foreground') || '#888');
  const border = hslToHex(getCssVar('--border') || '#ddd');
  const card = hslToHex(getCssVar('--card') || '#fff');
  const bg = hslToHex(getCssVar('--background') || '#fff');
  const primary = hslToHex(getCssVar('--primary') || '#1890ff');
  return {
    foreground: fg,
    muted: mutedFg,
    border,
    card,
    background: bg,
    primary,
    tooltipBg: card,
    tooltipText: fg,
    axisLine: border,
    splitLine: border,
    textSecondary: mutedFg,
  };
}

// 响应式 hook：监听主题变化（html[data-theme] 属性切换）
export function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(() => readThemeColors());
  useEffect(() => {
    const update = () => setColors(readThemeColors());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });
    window.addEventListener(AppEvents.THEME_CHANGE, update as EventListener);
    // 初次再读一次，确保 SSR 后正确
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener(AppEvents.THEME_CHANGE, update as EventListener);
    };
  }, []);
  return colors;
}

// 文明颜色（hex）
import { CIVILIZATIONS, type CivilizationKey } from '@/data/history-index';

export function getCivilizationColors(): Record<CivilizationKey, string> {
  const acc: Record<string, string> = {};
  for (const [k, v] of Object.entries(CIVILIZATIONS)) {
    acc[k] = v.color.startsWith('#') ? v.color : '#1890ff';
  }
  return acc as Record<CivilizationKey, string>;
}

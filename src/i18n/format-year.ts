// EXPORTS: formatYearBilingual
// 双语年份格式化
// 中文口径保持与原 formatYear 一致（无小数点、无 k 缩写、|y|≥10000 万、公元前千分位公元不加、em dash、约/初/末/中叶/至今）
// 英文口径：BCE / CE，千分位逗号，≥10000 用 thousand / million，至今 → present

import type { I18nLang } from './types';

const MAX_YEAR = 2026;

function formatZh(year: number): string {
  // 至今
  if (year >= MAX_YEAR - 1) return '至今';
  // 万年级
  const abs = Math.abs(year);
  if (abs >= 10000) {
    const wan = Math.round(year / 10000); // 正负数都取整万年
    if (year < 0) return `前${Math.abs(wan)}万年`;
    return `${wan}万年`;
  }
  // 公元元年
  if (year === 0) return '公元元年';
  if (year > 0) return `公元${year}年`;
  // 公元前加千分位
  const absStr = Math.abs(year).toLocaleString('zh-CN');
  return `前${absStr}年`;
}

function formatEn(year: number): string {
  if (year >= MAX_YEAR - 1) return 'present';
  const abs = Math.abs(year);
  // 大数字用 thousand / million（不用 k 缩写，保持中文同口径的全拼）
  if (abs >= 1_000_000) {
    const mil = Math.round(year / 1_000_000);
    const label = Math.abs(mil) === 1 ? 'million years' : 'million years';
    return year < 0 ? `${Math.abs(mil)} million years BCE` : `${mil} million years CE`;
  }
  if (abs >= 10_000) {
    const thou = Math.round(year / 1000);
    return year < 0
      ? `${Math.abs(thou).toLocaleString('en-US')} thousand BCE`
      : `${thou.toLocaleString('en-US')} thousand CE`;
  }
  const display = Math.abs(year).toLocaleString('en-US');
  if (year < 0) return `${display} BCE`;
  return `${display} CE`;
}

/**
 * 按语言格式化年份。
 * @param year 公元前为负，公元后为正，0 = 公元元年
 * @param lang 目标语言
 */
export function formatYearBilingual(year: number, lang: I18nLang): string {
  if (lang === 'en-US') return formatEn(year);
  return formatZh(year);
}

/**
 * 按语言格式化年份区间（用 em dash 连接）。
 */
export function formatYearRangeBilingual(
  startYear: number,
  endYear: number,
  lang: I18nLang,
): string {
  return `${formatYearBilingual(startYear, lang)} — ${formatYearBilingual(endYear, lang)}`;
}

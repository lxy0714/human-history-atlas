// EXPORTS: yearsAgo, formatYear, setYearFormatLang, getYearFormatLang
// 年份格式化：中文口径为纯函数；英文口径由 I18nProvider 在渲染期注入当前语言。
// 语言状态是模块级的，因为 formatYear 有 100+ 调用点，逐点传 lang 不现实；
// Provider 在自身 render 体内同步设置，先于所有子组件渲染，故不存在读到旧值的时序。
// 依赖仅 format-year（其自身只 import 类型），仍可被 vitest 直接测试。

import { formatYearBilingual } from '@/i18n/format-year';
import type { I18nLang } from '@/i18n/types';

let activeLang: I18nLang = 'zh-CN';

/** 由 I18nProvider 调用，切换年份显示语言。 */
export function setYearFormatLang(lang: I18nLang): void {
  activeLang = lang;
}

/** 读取当前年份显示语言（测试与调试用）。 */
export function getYearFormatLang(): I18nLang {
  return activeLang;
}

export function yearsAgo(year: number): string {
  const now = 2026;
  const diff = now - year;
  if (activeLang === 'en-US') {
    if (diff === 0) return 'this year';
    if (diff > 0) return `about ${diff.toLocaleString('en-US')} years ago`;
    return `${Math.abs(diff).toLocaleString('en-US')} years in the future`;
  }
  if (diff === 0) return '今年';
  if (diff > 0) return `距今约 ${diff.toLocaleString()} 年`;
  return `未来 ${Math.abs(diff).toLocaleString()} 年`;
}

export interface FormatYearOptions {
  /** "至今"的上限阈值，默认 Infinity（不显示至今） */
  maxYear?: number;
  /** @deprecated 已废弃，统一规则下不再区分紧凑/完整模式，保留仅为兼容调用 */
  compact?: boolean;
  /** @deprecated 已废弃，公元前自动加千分位、公元不加，保留仅为兼容调用 */
  useGrouping?: boolean;
}

/**
 * 年份格式化（全站唯一出口）
 * 统一规则：
 *   绝对值 ≥ 10000 → 取整到万年，如「前300万年」「公元1万年」
 *   绝对值 < 10000 → 整数显示
 *     负数（公元前）加千分位，如「前4,000年」「前500年」
 *     正数（公元）不加千分位，如「公元500年」「公元1500年」
 *   0 → 公元元年
 *   一律不带小数点、不用 k 缩写
 */
export function formatYear(year: number, options: FormatYearOptions = {}): string {
  const { maxYear = Infinity } = options;

  if (year >= maxYear - 1) return activeLang === 'en-US' ? 'present' : '至今';

  if (activeLang === 'en-US') {
    // formatYearBilingual 自带「2025+ → present」；上面已按 maxYear 判过至今，
    // 这里让 2025+ 走常规 CE，避免默认 Infinity 时把 2026 误显示成 present。
    if (year >= 2025) return `${Math.round(year).toLocaleString('en-US')} CE`;
    return formatYearBilingual(year, 'en-US');
  }

  const abs = Math.abs(year);

  // ≥ 10000：取整到万
  if (abs >= 10_000) {
    const wan = Math.round(abs / 10_000);
    if (year < 0) return `前${wan}万年`;
    return `公元${wan}万年`;
  }

  // < 10000：整数
  if (year < 0) {
    const intAbs = Math.round(abs);
    const ystr = intAbs >= 1000 ? intAbs.toLocaleString() : `${intAbs}`;
    return `前${ystr}年`;
  }
  if (year === 0) return '公元元年';
  return `公元${Math.round(year)}年`;
}

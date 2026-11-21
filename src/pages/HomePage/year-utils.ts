// EXPORTS: yearsAgo, formatYear
// 纯函数文件：无副作用、无外部运行时依赖，可被 vitest 直接测试

export function yearsAgo(year: number): string {
  const now = 2026;
  const diff = now - year;
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

  if (year >= maxYear - 1) return '至今';

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

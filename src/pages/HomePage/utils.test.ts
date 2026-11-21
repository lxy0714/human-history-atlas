import { describe, it, expect } from 'vitest';
import { formatYear, yearsAgo } from './year-utils';

describe('formatYear', () => {
  // 公元后普通年份（不加千分位）
  it('公元后普通年份', () => {
    expect(formatYear(2024)).toBe('公元2024年');
    expect(formatYear(1911)).toBe('公元1911年');
    expect(formatYear(1)).toBe('公元1年');
    expect(formatYear(500)).toBe('公元500年');
    expect(formatYear(1500)).toBe('公元1500年');
  });

  // 公元前年份（加千分位、前缀「前」）
  it('公元前年份', () => {
    expect(formatYear(-221)).toBe('前221年');
    expect(formatYear(-1)).toBe('前1年');
    expect(formatYear(-500)).toBe('前500年');
    expect(formatYear(-3000)).toBe('前3,000年');
    expect(formatYear(-4000)).toBe('前4,000年');
  });

  // 公元元年
  it('公元元年', () => {
    expect(formatYear(0)).toBe('公元元年');
  });

  // 万年级：绝对值 ≥ 10000 取整到万年
  it('万年级取整到万', () => {
    expect(formatYear(-10_000)).toBe('前1万年');
    expect(formatYear(-30_000)).toBe('前3万年');
    expect(formatYear(-300_000)).toBe('前30万年');
    expect(formatYear(-3_000_000)).toBe('前300万年');
    expect(formatYear(-2_647_512)).toBe('前265万年'); // 四舍五入
    expect(formatYear(10_000)).toBe('公元1万年');
    expect(formatYear(25_000)).toBe('公元3万年');
  });

  // 放映机浮点插值年份：取整后再格式化（无小数点长串）
  it('浮点年份自动取整', () => {
    expect(formatYear(-2647512.2777777654)).toBe('前265万年');
    expect(formatYear(2500.7)).toBe('公元2501年');
    expect(formatYear(-500.3)).toBe('前500年');
    expect(formatYear(1949.5)).toBe('公元1950年');
  });

  // compact 参数已废弃，保留兼容但不影响输出
  it('compact 参数兼容（不影响输出）', () => {
    expect(formatYear(-3000, { compact: true })).toBe('前3,000年');
    expect(formatYear(-3000, { compact: false })).toBe('前3,000年');
    expect(formatYear(-2_000_000, { compact: true })).toBe('前200万年');
    expect(formatYear(-2_000_000, { compact: false })).toBe('前200万年');
  });

  // useGrouping 参数已废弃，公元前自动千分位、公元不加
  it('useGrouping 参数兼容（公元前自动千分位、公元不加）', () => {
    expect(formatYear(2024, { useGrouping: true })).toBe('公元2024年');
    expect(formatYear(-221, { useGrouping: true })).toBe('前221年');
    expect(formatYear(-10000, { useGrouping: true })).toBe('前1万年');
  });

  // maxYear 至今：year >= maxYear - 1 时显示「至今」
  it('maxYear 边界', () => {
    // maxYear=2026, maxYear-1=2025
    expect(formatYear(2024, { maxYear: 2026 })).toBe('公元2024年');
    expect(formatYear(2025, { maxYear: 2026 })).toBe('至今');
    expect(formatYear(2026, { maxYear: 2026 })).toBe('至今');
    // maxYear=2024, maxYear-1=2023
    expect(formatYear(2022, { maxYear: 2024 })).toBe('公元2022年');
    expect(formatYear(2023, { maxYear: 2024 })).toBe('至今');
  });
});

describe('yearsAgo', () => {
  it('返回距今描述', () => {
    // 基于当前年份计算，用模糊匹配
    const result = yearsAgo(-221);
    expect(result).toContain('距今约');
    expect(result).toContain('年');
  });
});

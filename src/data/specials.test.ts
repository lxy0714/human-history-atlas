import { describe, it, expect } from 'vitest';
import { getGanZhi, getShengXiao } from './specials';

describe('getGanZhi 干支纪年', () => {
  // 经典验证：1911 辛亥（辛亥革命）
  it('1911年 = 辛亥', () => {
    expect(getGanZhi(1911)).toBe('辛亥');
  });

  // 2000 庚辰
  it('2000年 = 庚辰', () => {
    expect(getGanZhi(2000)).toBe('庚辰');
  });

  // 2024 甲辰
  it('2024年 = 甲辰', () => {
    expect(getGanZhi(2024)).toBe('甲辰');
  });

  // 1949 己丑
  it('1949年 = 己丑', () => {
    expect(getGanZhi(1949)).toBe('己丑');
  });

  // 甲子年基准：公元 4 年是甲子年（历史公认）
  it('公元4年 = 甲子（基准）', () => {
    expect(getGanZhi(4)).toBe('甲子');
  });

  // 60 年一循环：4 + 60 = 64 也应是甲子
  it('公元64年 = 甲子（60年周期）', () => {
    expect(getGanZhi(64)).toBe('甲子');
  });

  // 公元前：公元前 1 年 = 庚申（公元1年的前一年）
  it('公元前1年 = 庚申', () => {
    expect(getGanZhi(-1)).toBe('庚申');
  });

  // 公元前 2 年 = 己未
  it('公元前2年 = 己未', () => {
    expect(getGanZhi(-2)).toBe('己未');
  });

  // 公元前 221 年（秦统一）
  it('公元前221年 = 庚辰', () => {
    // 验证：-221 调整后 = -221 - 3 = -224
    // -224 % 60 = -44 → +60 = 16
    // 天干 16%10 = 6 → 庚；地支 16%12 = 4 → 辰
    expect(getGanZhi(-221)).toBe('庚辰');
  });

  // 循环完整性：60 个结果互不重复
  it('60甲子循环完整', () => {
    const set = new Set<string>();
    for (let i = 0; i < 60; i++) {
      set.add(getGanZhi(4 + i));
    }
    expect(set.size).toBe(60);
  });

  // 公元元年 (1年) = 辛酉
  it('公元1年 = 辛酉', () => {
    // 4 = 甲子(0), 3 = 癸亥(59), 2 = 壬戌(58), 1 = 辛酉(57)
    expect(getGanZhi(1)).toBe('辛酉');
  });
});

describe('getShengXiao 生肖', () => {
  it('2024年 = 龙', () => {
    expect(getShengXiao(2024)).toBe('龙');
  });

  it('2000年 = 龙', () => {
    expect(getShengXiao(2000)).toBe('龙');
  });

  it('1911年 = 猪', () => {
    expect(getShengXiao(1911)).toBe('猪');
  });

  it('1949年 = 牛', () => {
    expect(getShengXiao(1949)).toBe('牛');
  });

  // 公元前 1 年 = 猴（庚申年，申对应猴）
  it('公元前1年 = 猴', () => {
    expect(getShengXiao(-1)).toBe('猴');
  });

  // 12 年一循环
  it('12年一循环', () => {
    expect(getShengXiao(2000)).toBe(getShengXiao(2012));
    expect(getShengXiao(2024)).toBe(getShengXiao(2036));
  });
});

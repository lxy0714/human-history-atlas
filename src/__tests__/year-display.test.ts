import { describe, it, expect } from 'vitest';
import { localizeYearDisplay, hasUntranslatedYear } from '@/i18n/year-display';
import { ALL_HISTORY_NODES_INDEX } from '@/data/history-index';
import { formatYear, setYearFormatLang } from '@/pages/HomePage/year-utils';

describe('localizeYearDisplay', () => {
  it('中文态原样返回', () => {
    expect(localizeYearDisplay('公元630年—公元750年', 'zh-CN')).toBe('公元630年—公元750年');
  });

  it('覆盖数据中出现的全部年份成分', () => {
    const cases: Array<[string, string]> = [
      ['公元630年—公元750年', '630 CE — 750 CE'],
      ['前4,000年—前500年', '4,000 BCE — 500 BCE'],
      ['约300万年前', 'c. 3 million years ago'],
      ['约前1,200年', 'c. 1,200 BCE'],
      ['公元元年', '1 CE'],
      ['前5世纪', '5th century BCE'],
      ['公元1世纪', '1st century CE'],
      ['2010年代', '2010s'],
      ['公元1945年—至今', '1945 CE — present'],
      ['传说时代', 'Legendary era'],
    ];
    for (const [zh, en] of cases) {
      expect(localizeYearDisplay(zh, 'en-US'), zh).toBe(en);
    }
  });

  it('空串与 undefined 安全', () => {
    expect(localizeYearDisplay('', 'en-US')).toBe('');
  });

  it('未覆盖的复合串整体回退中文，绝不中英混排', () => {
    const complex = '公元1688年光荣革命，公元1689年颁布《权利法案》';
    expect(localizeYearDisplay(complex, 'en-US')).toBe(complex);
    expect(hasUntranslatedYear(complex)).toBe(true);
  });

  it('全量 763 节点：英文态零回退', () => {
    const nodes = ALL_HISTORY_NODES_INDEX.filter(Boolean);
    const fallbacks = nodes.filter((n) => hasUntranslatedYear(n.yearDisplay));
    // 打印明细，便于后续逐条补译；断言只锁住「绝大多数已覆盖」
    if (fallbacks.length) {
      console.log(`[yearDisplay] 回退中文 ${fallbacks.length}/${nodes.length}：`);
      console.log(fallbacks.map((n) => `  ${n.id}: ${n.yearDisplay}`).join('\n'));
    }
    expect(nodes.length).toBe(763);
    expect(fallbacks.length).toBe(0);
  });
});

describe('formatYear 语言切换', () => {
  it('默认中文口径不变', () => {
    setYearFormatLang('zh-CN');
    expect(formatYear(-4000)).toBe('前4,000年');
    expect(formatYear(500)).toBe('公元500年');
    expect(formatYear(-3000000)).toBe('前300万年');
    expect(formatYear(0)).toBe('公元元年');
  });

  it('英文态走 BCE / CE', () => {
    setYearFormatLang('en-US');
    expect(formatYear(-4000)).toBe('4,000 BCE');
    expect(formatYear(500)).toBe('500 CE');
    expect(formatYear(-3000000)).toBe('3 million years BCE');
    setYearFormatLang('zh-CN');
  });

  it('maxYear 触发至今 / present', () => {
    setYearFormatLang('zh-CN');
    expect(formatYear(2026, { maxYear: 2026 })).toBe('至今');
    setYearFormatLang('en-US');
    expect(formatYear(2026, { maxYear: 2026 })).toBe('present');
    // 默认 Infinity 时 2026 不应被误显示为 present
    expect(formatYear(2026)).toBe('2,026 CE');
    setYearFormatLang('zh-CN');
  });
});
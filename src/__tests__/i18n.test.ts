import { describe, it, expect } from 'vitest';
import { formatYearBilingual, formatYearRangeBilingual } from '@/i18n/format-year';
import { getCivilizationName, getCategoryName, getEraName } from '@/data/i18n/content-i18n';
import { EN_NODE_META } from '@/data/i18n/en-node-meta';

// lookup 函数（与 src/i18n 中的实现保持一致，这里 inline 一份避免触发 provider 依赖链）
function lookup(dict: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split('.');
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === 'string' ? cur : undefined;
}

describe('i18n - lookup 纯函数', () => {
  const dict = {
    nav: { timeline: 'Timeline', map: 'Map' },
    common: { loading: 'Loading...' },
  };

  it('命中嵌套 key 返回翻译', () => {
    expect(lookup(dict, 'nav.timeline')).toBe('Timeline');
    expect(lookup(dict, 'common.loading')).toBe('Loading...');
  });

  it('未命中返回 undefined', () => {
    expect(lookup(dict, 'nav.missing')).toBeUndefined();
    expect(lookup(dict, 'nonexistent.key')).toBeUndefined();
  });

  it('空字典返回 undefined', () => {
    expect(lookup({}, 'a.b')).toBeUndefined();
  });
});

describe('i18n - 年份格式化', () => {
  describe('中文', () => {
    it('公元后正年份', () => {
      expect(formatYearBilingual(2026, 'zh-CN')).toBe('至今');
      expect(formatYearBilingual(2025, 'zh-CN')).toBe('至今');
      expect(formatYearBilingual(2000, 'zh-CN')).toBe('公元2000年');
      expect(formatYearBilingual(500, 'zh-CN')).toBe('公元500年');
    });

    it('公元前加千分位', () => {
      expect(formatYearBilingual(-500, 'zh-CN')).toBe('前500年');
      expect(formatYearBilingual(-2024, 'zh-CN')).toBe('前2,024年');
    });

    it('万年级', () => {
      expect(formatYearBilingual(-3000000, 'zh-CN')).toBe('前300万年');
      expect(formatYearBilingual(-10000, 'zh-CN')).toBe('前1万年');
    });

    it('公元元年', () => {
      expect(formatYearBilingual(0, 'zh-CN')).toBe('公元元年');
    });
  });

  describe('英文', () => {
    it('公元后 CE', () => {
      expect(formatYearBilingual(2026, 'en-US')).toBe('present');
      expect(formatYearBilingual(2000, 'en-US')).toBe('2,000 CE');
      expect(formatYearBilingual(500, 'en-US')).toBe('500 CE');
    });

    it('公元前 BCE', () => {
      expect(formatYearBilingual(-500, 'en-US')).toBe('500 BCE');
      expect(formatYearBilingual(-2024, 'en-US')).toBe('2,024 BCE');
    });

    it('大数字用 thousand / million', () => {
      expect(formatYearBilingual(-3000000, 'en-US')).toBe('3 million years BCE');
      expect(formatYearBilingual(-10000, 'en-US')).toBe('10 thousand BCE');
    });

    it('区间用 em dash', () => {
      expect(formatYearRangeBilingual(-500, 500, 'en-US')).toBe('500 BCE — 500 CE');
    });
  });
});

describe('i18n - 文明/分类/时代名', () => {
  it('文明名中英都有', () => {
    expect(getCivilizationName('china', 'zh-CN')).toBe('中国');
    expect(getCivilizationName('china', 'en-US')).toBe('China');
    expect(getCivilizationName('europe', 'en-US')).toBe('Europe');
    expect(getCivilizationName('oceania', 'en-US')).toBe('Oceania');
  });

  it('分类名中英都有', () => {
    expect(getCategoryName('politics', 'zh-CN')).toBe('政治');
    expect(getCategoryName('politics', 'en-US')).toBe('Politics');
    expect(getCategoryName('science', 'en-US')).toBe('Science & Tech');
  });

  it('时代名中英都有', () => {
    expect(getEraName('prehistoric', 'zh-CN')).toBe('史前时代');
    expect(getEraName('classical', 'en-US')).toBe('Classical Era');
    expect(getEraName('modern', 'en-US')).toBe('Modern');
  });
});

describe('i18n - 英文元数据质量', () => {
  it('每个已译节点都有 titleEn 和 summaryEn', () => {
    for (const [id, meta] of Object.entries(EN_NODE_META)) {
      expect(meta.titleEn, `${id} 缺少 titleEn`).toBeTruthy();
      expect(meta.summaryEn, `${id} 缺少 summaryEn`).toBeTruthy();
      expect(meta.titleEn.length).toBeGreaterThan(0);
      expect(meta.summaryEn.length).toBeGreaterThan(0);
    }
  });

  it('英文翻译确实是英文（不含中文字符）', () => {
    for (const [id, meta] of Object.entries(EN_NODE_META)) {
      const hasChinese = /[\u4e00-\u9fff]/.test(meta.titleEn) || /[\u4e00-\u9fff]/.test(meta.summaryEn);
      expect(hasChinese, `${id} 的英文翻译中含中文字符`).toBe(false);
    }
  });

  it('至少翻译了 25 个节点', () => {
    expect(Object.keys(EN_NODE_META).length).toBeGreaterThanOrEqual(25);
  });
});

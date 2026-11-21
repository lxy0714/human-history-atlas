import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { enUS } from '@/i18n/en-US';

// 背景：t('some.key', '中文') 在键缺失时静默回退中文，tsc / eslint / 构建全绿，
// 只有切到英文肉眼才看得见。曾因此漏掉 view.timeline 等键。
// 本测试静态扫描全部 t() 调用，断言每个字面量键都存在于英文词典。

function flatten(obj: unknown, prefix = '', out = new Set<string>()): Set<string> {
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === 'object') flatten(v, key, out);
      else out.add(key);
    }
  }
  return out;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (f === '__tests__' || f === 'node_modules') continue;
      walk(p, out);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) out.push(p);
  }
  return out;
}

describe('英文词典键完整性', () => {
  const keys = flatten(enUS);

  it('词典本身非空且规模合理', () => {
    expect(keys.size).toBeGreaterThan(500);
  });

  it('所有 t() 字面量键都存在于 en-US', () => {
    const missing: string[] = [];
    // 只取单/双引号的字面量键；模板字符串键（动态拼接）另行处理
    const RE = /\bt\(\s*'([A-Za-z0-9_.]+)'\s*,/g;
    for (const file of walk('src')) {
      const src = readFileSync(file, 'utf8');
      let m: RegExpExecArray | null;
      while ((m = RE.exec(src))) {
        const key = m[1];
        if (!keys.has(key)) {
          const line = src.slice(0, m.index).split('\n').length;
          missing.push(`${file}:${line}  ${key}`);
        }
      }
    }
    if (missing.length) console.log('缺失键：\n' + missing.join('\n'));
    expect(missing, `发现 ${missing.length} 个缺失键`).toEqual([]);
  });

  it('动态 eraShort 键七个时代齐全', () => {
    for (const id of ['prehistoric', 'ancient', 'classical', 'medieval', 'earlyModern', 'industrial', 'modern']) {
      expect(keys.has(`timeline.eraShort_${id}`), `缺 timeline.eraShort_${id}`).toBe(true);
    }
  });
});
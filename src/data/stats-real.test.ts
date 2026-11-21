import { describe, it, expect } from 'vitest';
import { ALL_HISTORY_NODES, ERAS, CIVILIZATIONS } from '@/data/history';
import { RELATIONS } from '@/data/relations';

const log = console.info;

function countChars(text: string): number {
  return text.replace(/[\s\*\_\#\-\>\|\`]/g, '').length;
}

describe('真实数据统计', () => {
  it('输出真实节点/关联/文明/时代计数', () => {
    log('=== 节点与关联真实统计 ===');
    log(`总节点数: ${ALL_HISTORY_NODES.length}`);
    log(`总关联数: ${RELATIONS.length}`);
    log(`总时代数: ${ERAS.length}`);
    log(`总文明数: ${Object.keys(CIVILIZATIONS).length}`);

    // 各时代计数 - era 字段名可能是 eraId 等
    const sample = ALL_HISTORY_NODES[0];
    log('\n节点示例字段:', Object.keys(sample).join(', '));

    const eraKey = 'eraId' in sample ? 'eraId' : 'era';
    const civKey = 'civilization';

    const eraCounts: Record<string, number> = {};
    for (const node of ALL_HISTORY_NODES) {
      const era = String((node as any)[eraKey] || 'unknown');
      eraCounts[era] = (eraCounts[era] || 0) + 1;
    }
    log('\n各时代节点数:');
    for (const e of ERAS) {
      log(`  ${e.id}: ${eraCounts[e.id] || 0}`);
    }

    const civCounts: Record<string, number> = {};
    for (const node of ALL_HISTORY_NODES) {
      const civ = String((node as any)[civKey] || 'unknown');
      civCounts[civ] = (civCounts[civ] || 0) + 1;
    }
    log('\n各文明节点数:');
    for (const c of Object.keys(CIVILIZATIONS)) {
      log(`  ${c}: ${civCounts[c] || 0}`);
    }

    const buckets = { lt100: 0, '100-200': 0, '200-300': 0, '300-500': 0, '500-1k': 0, '1k+': 0 };
    for (const n of ALL_HISTORY_NODES) {
      const c = countChars(n.description || '');
      if (c < 100) buckets.lt100++;
      else if (c < 200) buckets['100-200']++;
      else if (c < 300) buckets['200-300']++;
      else if (c < 500) buckets['300-500']++;
      else if (c < 1000) buckets['500-1k']++;
      else buckets['1k+']++;
    }
    log('\n字数分布:');
    log(`  <100: ${buckets.lt100}`);
    log(`  100-200: ${buckets['100-200']}`);
    log(`  200-300: ${buckets['200-300']}`);
    log(`  300-500: ${buckets['300-500']}`);
    log(`  500-1k: ${buckets['500-1k']}`);
    log(`  1k+: ${buckets['1k+']}`);

    expect(ALL_HISTORY_NODES.length).toBeGreaterThan(700);
  });
});

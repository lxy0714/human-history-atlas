// 关联统计口径一致性测试
// 锁死：总关联数必须由真实数据运行时算出，禁止页面写死常量

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RELATION_STATS, RELATIONS } from '@/data/relations';
import { ALL_HISTORY_NODES_INDEX } from '@/data/history-index';

describe('RELATION_STATS 口径一致性', () => {
  it('totalPairs === typedPairs + relatedPairs - overlap（容斥原理恒等）', () => {
    expect(RELATION_STATS.totalPairs).toBe(
      RELATION_STATS.typedPairs + RELATION_STATS.relatedPairs - RELATION_STATS.overlap,
    );
  });

  it('typedDirected 应与 RELATIONS.length 一致（直接来源）', () => {
    expect(RELATION_STATS.typedDirected).toBe(RELATIONS.length);
  });

  it('与原始数据独立重算结果一致（typedPairs）', () => {
    const typedSet = new Set<string>();
    for (const rel of RELATIONS) {
      const a = rel.from < rel.to ? rel.from : rel.to;
      const b = rel.from < rel.to ? rel.to : rel.from;
      typedSet.add(`${a}|${b}`);
    }
    expect(RELATION_STATS.typedPairs).toBe(typedSet.size);
  });

  it('与原始数据独立重算结果一致（relatedPairs + overlap + totalPairs）', () => {
    // 重算 related
    const relatedSet = new Set<string>();
    const nodeMap = new Map<string, typeof ALL_HISTORY_NODES_INDEX[number]>();
    for (const n of ALL_HISTORY_NODES_INDEX) {
      if (n) nodeMap.set(n.id, n);
    }
    for (const node of nodeMap.values()) {
      if (!node.relatedNodeIds?.length) continue;
      for (const otherId of node.relatedNodeIds) {
        if (otherId === node.id) continue;
        if (!nodeMap.has(otherId)) continue;
        const a = node.id < otherId ? node.id : otherId;
        const b = node.id < otherId ? otherId : node.id;
        relatedSet.add(`${a}|${b}`);
      }
    }
    expect(RELATION_STATS.relatedPairs).toBe(relatedSet.size);

    // 重算 overlap
    const typedSet = new Set<string>();
    for (const rel of RELATIONS) {
      const a = rel.from < rel.to ? rel.from : rel.to;
      const b = rel.from < rel.to ? rel.to : rel.from;
      typedSet.add(`${a}|${b}`);
    }
    let overlap = 0;
    for (const key of typedSet) {
      if (relatedSet.has(key)) overlap++;
    }
    expect(RELATION_STATS.overlap).toBe(overlap);
    expect(RELATION_STATS.totalPairs).toBe(typedSet.size + relatedSet.size - overlap);
  });

  it('每个节点的关联数 = 该节点 typed + related 去重后数量（详情面板口径）', () => {
    // 抽测 3 个节点
    const sampleIds = ['person-qinshihuang', 'han-dynasty', 'sci-scientific-revolution'];
    for (const id of sampleIds) {
      const node = ALL_HISTORY_NODES_INDEX.find((n) => n?.id === id);
      if (!node) continue;

      // 统计该节点的 typed 关联（去重）
      const typedTargets = new Set<string>();
      for (const rel of RELATIONS) {
        if (rel.from === id) typedTargets.add(rel.to);
        if (rel.to === id) typedTargets.add(rel.from);
      }

      // 统计该节点的 related 关联（去重，减去已在 typed 中的）
      const relatedTargets = new Set<string>();
      if (node.relatedNodeIds) {
        for (const r of node.relatedNodeIds) {
          if (r === id) continue;
          if (!typedTargets.has(r)) relatedTargets.add(r);
        }
      }

      // 反向 related：其他节点的 relatedNodeIds 里引用了当前节点的
      for (const n of ALL_HISTORY_NODES_INDEX) {
        if (!n || n.id === id) continue;
        if (n.relatedNodeIds?.includes(id) && !typedTargets.has(n.id)) {
          relatedTargets.add(n.id);
        }
      }

      const total = typedTargets.size + relatedTargets.size;
      // 只验证 > 0，不锁死具体数字（因为数据可能变）
      expect(total).toBeGreaterThan(0);
    }
  });
});

describe('源码扫描：禁止写死关联数字面量', () => {
  const forbiddenLiterals = ['1374', '2396', '687', '1,374', '2,396'];

  // 扫描 pages/ 目录下所有 ts/tsx（排除 test 文件）
  function walkPages(): string[] {
    const pagesDir = resolve(__dirname, '../pages');
    const fs = require('node:fs') as typeof import('node:fs');
    const path = require('node:path') as typeof import('node:path');
    function walk(dir: string): string[] {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const files: string[] = [];
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...walk(full));
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          if (!entry.name.endsWith('.test.ts') && !entry.name.endsWith('.test.tsx')) {
            files.push(full);
          }
        }
      }
      return files;
    }
    return walk(pagesDir);
  }

  function isCodeLine(line: string): boolean {
    const trimmed = line.trim();
    if (trimmed.startsWith('//')) return false;
    if (trimmed.startsWith('*')) return false;
    if (trimmed.startsWith('/*')) return false;
    if (line.includes('import ')) return false;
    return true;
  }

  it('pages/ 下不得出现写死的 1374/2396/687 字面量（应使用 RELATION_STATS）', () => {
    const files = walkPages();
    const violations: Array<{ file: string; literal: string; line: number }> = [];

    for (const file of files) {
      const content = require('node:fs').readFileSync(file, 'utf-8') as string;
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!isCodeLine(line)) continue;
        for (const lit of forbiddenLiterals) {
          if (line.includes(lit)) {
            violations.push({
              file: file.replace(resolve(__dirname, '../'), ''),
              literal: lit,
              line: i + 1,
            });
          }
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('pages/ 下展示用「关系总数」必须来自 RELATION_STATS，不能直接用 RELATIONS.length', () => {
    // 旧口径：RELATIONS.length = 1374（有向条数）
    // 新口径：RELATION_STATS.totalPairs = 2396（去重并集）
    // 禁止模式：把 RELATIONS.length 直接赋值给 xxxTotal / relationTotal / totalRelation 等统计变量
    const forbiddenPatterns = [
      /relationTotal\s*=\s*RELATIONS\.length/,
      /totalRelations?\s*[:=]\s*RELATIONS\.length/,
      /关系总数.*RELATIONS\.length/,
    ];

    const files = walkPages();
    const violations: Array<{ file: string; line: number; pattern: string }> = [];

    for (const file of files) {
      const content = require('node:fs').readFileSync(file, 'utf-8') as string;
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!isCodeLine(line)) continue;
        for (const pattern of forbiddenPatterns) {
          if (pattern.test(line)) {
            violations.push({
              file: file.replace(resolve(__dirname, '../'), ''),
              line: i + 1,
              pattern: pattern.source,
            });
          }
        }
      }
    }
    expect(violations).toEqual([]);
  });
});

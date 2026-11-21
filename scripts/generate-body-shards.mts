// 生成历史数据二级分片：按 era + civilization 切，大的文明按年份二分
// 用法：npx tsx scripts/generate-body-shards.mts
import { writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  HISTORY_NODES,
  ALL_HISTORY_NODES,
  ERAS,
  CIVILIZATIONS,
  CATEGORIES,
  CIVILIZATION_COLORS,
} from '../src/data/history.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');
const shardsDir = join(dataDir, 'bodies', 'shards');
mkdirSync(shardsDir, { recursive: true });

// 清理旧 shard 文件
if (existsSync(shardsDir)) {
  for (const f of readdirSync(shardsDir)) {
    if (f.endsWith('.ts')) unlinkSync(join(shardsDir, f));
  }
}

const ERA_IDS = ERAS.map((e) => e.id);
const SHARD_THRESHOLD_BYTES = 250 * 1024; // raw 250KB
const SMALL_CIV_THRESHOLD = 60 * 1024; // 小于 60KB 合并到 others

console.log(`总节点数 (HISTORY_NODES): ${HISTORY_NODES.length}`);
console.log(`总节点数 (ALL_HISTORY_NODES): ${ALL_HISTORY_NODES.length}`);
console.log(`时代数: ${ERAS.length}`);
console.log(`分片阈值: ${SHARD_THRESHOLD_BYTES / 1024} KB raw`);
console.log();

// ========== 第 1 步：计算每个节点的 shardKey ==========

function estimateRawBytes(text: string): number {
  // 按 UTF-8 字节数估算正文大小（中文字符 3 bytes）
  // 加 60 bytes 作为 key/引号/逗号等 JSON overhead
  return Buffer.byteLength(text, 'utf-8') + 60;
}

// 按 era + civ 分组
interface GroupItem {
  id: string;
  year: number;
  description: string;
}

const groupsByEra: Record<string, Record<string, GroupItem[]>> = {};
for (const n of ALL_HISTORY_NODES) {
  const era = n.eraId || 'misc';
  const civ = n.civilization || 'unknown';
  if (!groupsByEra[era]) groupsByEra[era] = {};
  if (!groupsByEra[era][civ]) groupsByEra[era][civ] = [];
  groupsByEra[era][civ].push({
    id: n.id,
    year: n.year,
    description: n.description || '',
  });
}

// 计算每组 raw 大小
function groupBytes(items: GroupItem[]): number {
  let total = 0;
  for (const it of items) total += estimateRawBytes(it.description);
  return total;
}

// 按年份二分：返回 [a组, b组]，a 是前半（year 小），b 是后半
function splitByYear(items: GroupItem[]): [GroupItem[], GroupItem[]] {
  const sorted = [...items].sort((a, b) => a.year - b.year);
  const mid = Math.floor(sorted.length / 2);
  return [sorted.slice(0, mid), sorted.slice(mid)];
}

// 递归二分，直到每片 ≤ 阈值
function splitShard(
  items: GroupItem[],
  baseKey: string,
  depth = 0,
): { shardKey: string; items: GroupItem[] }[] {
  const bytes = groupBytes(items);
  if (bytes <= SHARD_THRESHOLD_BYTES || items.length <= 3 || depth > 3) {
    return [{ shardKey: baseKey, items }];
  }
  const [a, b] = splitByYear(items);
  const suffix = depth === 0 ? ['-a', '-b'] : ['-x', '-y'];
  return [
    ...splitShard(a, baseKey + suffix[0], depth + 1),
    ...splitShard(b, baseKey + suffix[1], depth + 1),
  ];
}

// 给每个节点分配 shardKey
const nodeShardKeys: Record<string, string> = {}; // nodeId -> shardKey
const allShards: Record<string, GroupItem[]> = {}; // shardKey -> items

for (const eraId of ERA_IDS) {
  const eraGroups = groupsByEra[eraId] || {};
  const civEntries = Object.entries(eraGroups);

  // 大文明单独处理；小文明合并到 others
  const largeCivs: [string, GroupItem[]][] = [];
  const smallItems: GroupItem[] = [];
  let miscItems: GroupItem[] = [];

  for (const [civ, items] of civEntries) {
    if (civ === 'unknown' || civ === 'misc') {
      miscItems = miscItems.concat(items);
      continue;
    }
    const bytes = groupBytes(items);
    if (bytes < SMALL_CIV_THRESHOLD) {
      smallItems.push(...items);
    } else {
      largeCivs.push([civ, items]);
    }
  }

  // 大文明：可能需要二分
  for (const [civ, items] of largeCivs) {
    const baseKey = `${eraId}-${civ}`;
    const shards = splitShard(items, baseKey);
    for (const { shardKey, items: shardItems } of shards) {
      allShards[shardKey] = shardItems;
      for (const it of shardItems) nodeShardKeys[it.id] = shardKey;
    }
  }

  // 小文明合并
  if (smallItems.length > 0) {
    const othersKey = `${eraId}-others`;
    // 如果 others 也超过阈值，按年份二分
    const shards = splitShard(smallItems, othersKey);
    for (const { shardKey, items: shardItems } of shards) {
      allShards[shardKey] = shardItems;
      for (const it of shardItems) nodeShardKeys[it.id] = shardKey;
    }
  }

  // unknown / misc
  if (miscItems.length > 0) {
    const miscKey = `${eraId}-misc`;
    const shards = splitShard(miscItems, miscKey);
    for (const { shardKey, items: shardItems } of shards) {
      allShards[shardKey] = shardItems;
      for (const it of shardItems) nodeShardKeys[it.id] = shardKey;
    }
  }
}

// 统计
console.log('=== 分片结果 ===');
let maxShardBytes = 0;
let maxShardKey = '';
const shardKeys = Object.keys(allShards).sort();
for (const key of shardKeys) {
  const items = allShards[key];
  const bytes = groupBytes(items);
  if (bytes > maxShardBytes) {
    maxShardBytes = bytes;
    maxShardKey = key;
  }
  console.log(`  ${key.padEnd(28)} ${String(items.length).padStart(4)} nodes  ${(bytes / 1024).toFixed(1).padStart(6)} KB raw`);
}
console.log();
console.log(`总 shard 数: ${shardKeys.length}`);
console.log(`最大 shard: ${maxShardKey} (${(maxShardBytes / 1024).toFixed(1)} KB raw)`);
console.log(`节点 shardKey 覆盖数: ${Object.keys(nodeShardKeys).length} / ${ALL_HISTORY_NODES.length}`);

// 验证全覆盖
const uncovered = ALL_HISTORY_NODES.filter((n) => !nodeShardKeys[n.id]);
if (uncovered.length > 0) {
  console.error(`❌ ${uncovered.length} 个节点没有 shardKey!`);
  process.exit(1);
}
console.log('✓ 所有节点都有 shardKey');
console.log();

// ========== 第 2 步：生成 shard 文件 ==========

console.log('=== 生成 shard 文件 ===');
for (const key of shardKeys) {
  const items = allShards[key];
  const bodyMap: Record<string, string> = {};
  for (const it of items) bodyMap[it.id] = it.description;

  const content = `// AUTO-GENERATED FILE — 不要手动编辑
// shard: ${key}（era + civilization 二级分片）
// EXPORTS: BODY_MAP

export const BODY_MAP: Record<string, string> = ${JSON.stringify(bodyMap, null, 2)};
`;
  writeFileSync(join(shardsDir, `${key}.ts`), content, 'utf-8');
  console.log(`  ✓ ${key}.ts (${(content.length / 1024).toFixed(1)} KB)`);
}

// ========== 第 3 步：生成 history-index.ts（带 shardKey 字段）==========

console.log();
console.log('=== 生成索引层 ===');

interface IndexNode {
  [key: string]: unknown;
  id: string;
  description: string;
  hasBody: boolean;
  shardKey: string;
}

function makeIndexNode(node: { id: string; description?: string; [k: string]: unknown }): IndexNode {
  return {
    ...node,
    description: '',
    hasBody: Boolean(node.description && node.description.length > 0),
    shardKey: nodeShardKeys[node.id] || '',
  };
}

const indexNodes = ALL_HISTORY_NODES.map(makeIndexNode);
const sortedIndexNodes = HISTORY_NODES.map(makeIndexNode);

const indexContent = `// AUTO-GENERATED FILE — 不要手动编辑
// 由 scripts/generate-body-shards.mts 生成
// 索引层：首屏加载，不含 description 正文，含 shardKey 用于定位正文分片
// EXPORTS: IEra, IHistoryNodeIndex, ERAS, HISTORY_NODES_INDEX, ALL_HISTORY_NODES_INDEX, CIVILIZATIONS, CATEGORIES, CIVILIZATION_COLORS, ERA_IDS

import type { IHistoryNode, CivilizationKey, CategoryKey, HistoryNodeType, IEra } from './history';

export interface IHistoryNodeIndex extends IHistoryNode {
  /** 是否有正文 */
  hasBody?: boolean;
  /** 正文分片 key，用于定位 bodies/shards/<shardKey>.ts */
  shardKey?: string;
}

export type { CivilizationKey, CategoryKey, HistoryNodeType, IEra };

export const ERA_IDS: string[] = ${JSON.stringify(ERA_IDS)};

export const ERAS: IEra[] = ${JSON.stringify(ERAS, null, 2)};

export const CIVILIZATIONS: Record<CivilizationKey, { name: string; color: string }> = ${JSON.stringify(CIVILIZATIONS, null, 2)};

export const CATEGORIES: Record<CategoryKey, { name: string; icon: string }> = ${JSON.stringify(CATEGORIES, null, 2)};

export const CIVILIZATION_COLORS: Record<CivilizationKey, string> = ${JSON.stringify(CIVILIZATION_COLORS, null, 2)};

// 已排序的节点（用于时间轴等需要有序展示的场景）
export const HISTORY_NODES_INDEX: IHistoryNodeIndex[] = ${JSON.stringify(sortedIndexNodes, null, 2)};

// 全部节点
export const ALL_HISTORY_NODES_INDEX: IHistoryNodeIndex[] = ${JSON.stringify(indexNodes, null, 2)};
`;

writeFileSync(join(dataDir, 'history-index.ts'), indexContent, 'utf-8');
console.log(`✓ history-index.ts (${(indexContent.length / 1024).toFixed(1)} KB raw)`);

// ========== 第 4 步：生成 shard-body-map.ts ==========

console.log();
console.log('=== 生成 shard 映射 ===');

const shardMapContent = `// AUTO-GENERATED FILE — 不要手动编辑
// shardKey 到正文文件的映射，用于动态 import
// EXPORTS: SHARD_BODY_IMPORTS

export const SHARD_BODY_IMPORTS: Record<string, () => Promise<{ BODY_MAP: Record<string, string> }>> = {
${shardKeys.map((k) => `  '${k}': () => import('./bodies/shards/${k}'),`).join('\n')}
};
`;

writeFileSync(join(dataDir, 'shard-body-map.ts'), shardMapContent, 'utf-8');
console.log('✓ shard-body-map.ts');

// ========== 第 5 步：生成 era → shardKeys 映射（兼容 loadEraBody） ==========

const eraShardMap: Record<string, string[]> = {};
for (const key of shardKeys) {
  // shardKey 格式: eraId-civname-suffix
  // eraId 可能是 camelCase（如 earlyModern），取第一段
  const eraId = ERA_IDS.find((e) => key.startsWith(e + '-'));
  if (eraId) {
    if (!eraShardMap[eraId]) eraShardMap[eraId] = [];
    eraShardMap[eraId].push(key);
  }
}

const eraShardMapContent = `// AUTO-GENERATED FILE — 不要手动编辑
// eraId 到 shardKey 列表的映射（用于兼容 loadEraBody）
// EXPORTS: ERA_SHARD_KEYS

export const ERA_SHARD_KEYS: Record<string, string[]> = ${JSON.stringify(eraShardMap, null, 2)};
`;

writeFileSync(join(dataDir, 'era-shard-map.ts'), eraShardMapContent, 'utf-8');
console.log('✓ era-shard-map.ts');

// ========== 完成统计 ==========

console.log();
console.log('=== 完成 ===');
console.log(`索引层节点数: ${indexNodes.length}`);
console.log(`正文 shard 数: ${shardKeys.length}`);
let totalBodyChars = 0;
for (const key of shardKeys) {
  totalBodyChars += allShards[key].reduce((s, it) => s + it.description.length, 0);
}
console.log(`正文总字符数: ${totalBodyChars.toLocaleString()}`);
console.log(`最大 shard raw: ${(maxShardBytes / 1024).toFixed(1)} KB (${maxShardKey})`);

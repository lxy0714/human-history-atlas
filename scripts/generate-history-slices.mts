// 生成历史数据分片：索引层 + 按 era 分的正文层
// 用法：npx tsx scripts/generate-history-slices.mts
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// 动态导入数据模块 — 用 vite-node 或 tsx 运行
// 这里用简单方式：直接读 history.ts 然后 eval 不可行，所以通过 import
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
const bodiesDir = join(dataDir, 'bodies');
mkdirSync(bodiesDir, { recursive: true });

const ERA_IDS = ERAS.map(e => e.id);
console.log(`总节点数 (HISTORY_NODES): ${HISTORY_NODES.length}`);
console.log(`总节点数 (ALL_HISTORY_NODES): ${ALL_HISTORY_NODES.length}`);
console.log(`时代数: ${ERAS.length} (${ERA_IDS.join(', ')})`);

// 1. 生成索引层
// 索引节点类型：不含 description，含 hasBody；保留 IHistoryNode 的所有其他字段
function makeIndexNode(node) {
  // description 设为空串，保证类型兼容 IHistoryNode；正文通过 loadEraBody 按需加载
  return {
    ...node,
    description: '',
    hasBody: Boolean(node.description && node.description.length > 0),
  };
}

const indexNodes = ALL_HISTORY_NODES.map(makeIndexNode);
const sortedIndexNodes = HISTORY_NODES.map(makeIndexNode);

// 统计各 era 节点数
const eraCounts = {};
for (const n of ALL_HISTORY_NODES) {
  const era = n.eraId || 'misc';
  eraCounts[era] = (eraCounts[era] || 0) + 1;
}
console.log('各时代节点数:', eraCounts);

// 生成索引文件
const indexContent = `// AUTO-GENERATED FILE — 不要手动编辑
// 由 scripts/generate-history-slices.mts 生成
// 索引层：首屏加载，不含 description 正文
// EXPORTS: IEra, IHistoryNodeIndex, ERAS, HISTORY_NODES_INDEX, ALL_HISTORY_NODES_INDEX, CIVILIZATIONS, CATEGORIES, CIVILIZATION_COLORS, ERA_IDS

import type { IHistoryNode, CivilizationKey, CategoryKey, HistoryNodeType, IEra } from './history';

export interface IHistoryNodeIndex extends IHistoryNode {
  /** 是否有正文（索引层为 true 或 undefined；正文体加载后可确认） */
  hasBody?: boolean;
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
console.log(`✓ 生成 history-index.ts (${(indexContent.length / 1024).toFixed(1)} KB)`);

// 2. 生成各 era 的正文文件
// 把节点按 eraId 分组，提取 id -> description 映射
const bodiesByEra = {};
for (const n of ALL_HISTORY_NODES) {
  const era = n.eraId || 'misc';
  if (!bodiesByEra[era]) bodiesByEra[era] = {};
  if (n.description) {
    bodiesByEra[era][n.id] = n.description;
  }
}

const validEraIds = [];
for (const eraId of ERA_IDS) {
  if (bodiesByEra[eraId]) {
    validEraIds.push(eraId);
    const bodyMap = bodiesByEra[eraId];
    const bodyContent = `// AUTO-GENERATED FILE — 不要手动编辑
// ${eraId} 时代正文数据
// EXPORTS: BODY_MAP

export const BODY_MAP: Record<string, string> = ${JSON.stringify(bodyMap, null, 2)};
`;
    writeFileSync(join(bodiesDir, `${eraId}.ts`), bodyContent, 'utf-8');
    const count = Object.keys(bodyMap).length;
    console.log(`✓ 生成 bodies/${eraId}.ts (${count} 个节点, ${(bodyContent.length / 1024).toFixed(1)} KB)`);
  }
}

// 3. 生成一个总入口（用于全文搜索等需要全量正文的场景）
// 不直接导出，而是通过动态 import 加载

// 4. 生成 era -> 文件路径映射（供 loader 使用）
const eraBodyMapContent = `// AUTO-GENERATED FILE — 不要手动编辑
// eraId 到正文文件的映射，用于动态 import
// EXPORTS: ERA_BODY_IMPORTS

export const ERA_BODY_IMPORTS: Record<string, () => Promise<{ BODY_MAP: Record<string, string> }>> = {
${validEraIds.map(id => `  '${id}': () => import('./bodies/${id}'),`).join('\n')}
};
`;

writeFileSync(join(dataDir, 'era-body-map.ts'), eraBodyMapContent, 'utf-8');
console.log(`✓ 生成 era-body-map.ts`);

console.log('\n=== 完成 ===');
console.log(`索引层节点数: ${indexNodes.length}`);
console.log(`正文分片数: ${validEraIds.length}`);
let totalBodyChars = 0;
for (const eraId of validEraIds) {
  totalBodyChars += Object.values(bodiesByEra[eraId]).join('').length;
}
console.log(`正文总字符数: ${totalBodyChars.toLocaleString()}`);

// 翻译进度导出脚本
// 用法：npx tsx scripts/translation-progress.ts
// 输出：待译节点数、已译节点数、剩余字数等统计信息
// 说明：每轮翻译后重新运行，可查进度

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { logger } from '@lark-apaas/client-toolkit-lite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// —— 配置 ——
const ROOT = path.resolve(__dirname, '..');
const EN_NODE_META_PATH = path.join(ROOT, 'src/data/i18n/en-node-meta.ts');
const HISTORY_INDEX_PATH = path.join(ROOT, 'src/data/history-index.ts');
const BODIES_DIR = path.join(ROOT, 'src/data/bodies/shards');
const EN_BODIES_DIR = path.join(ROOT, 'src/data/bodies/en/shards');
const EN_SHARD_MAP_PATH = path.join(ROOT, 'src/data/en-shard-body-map.ts');
const OUTPUT_PATH = path.join(ROOT, 'tmp/translation-progress.json');

interface ProgressReport {
  generatedAt: string;
  nodes: {
    total: number;
    important: number;
    titleTranslated: number;
    titleRemaining: number;
    summaryTranslated: number;
    summaryRemaining: number;
  };
  bodies: {
    totalShardFiles: number;
    totalChars: number;
    translatedShardFiles: number;
    translatedNodes: number;
    translatedChars: number;
    remainingChars: number;
    translatedShardKeys: string[];
  };
  untranslatedImportantNodeIds: string[];
}

// 简单解析 EN_NODE_META 文件里的 key（不用 AST，直接正则取 id 列表）
function extractTranslatedNodeIds(): string[] {
  if (!fs.existsSync(EN_NODE_META_PATH)) return [];
  const content = fs.readFileSync(EN_NODE_META_PATH, 'utf-8');
  const ids: string[] = [];
  const re = /^\s*['"]([^'"]+)['"]:\s*\{/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) {
    const id = m[1];
    if (id && id !== 'id' && !id.includes(' ')) ids.push(id);
  }
  return ids;
}

// 从 history-index.ts 里提取节点信息
function extractNodesFromIndex(): Array<{ id: string; title: string; summary: string; important?: boolean; hasBody?: boolean }> {
  const content = fs.readFileSync(HISTORY_INDEX_PATH, 'utf-8');
  // 找 HISTORY_NODES_INDEX 数组里的每个对象
  const nodes: Array<{ id: string; title: string; summary: string; important?: boolean; hasBody?: boolean }> = [];
  const re = /\{[^{]*?"id":\s*"([^"]+)"[^}]*?"title":\s*"([^"]+)"[^}]*?"summary":\s*"([^"]*)"[^}]*?important[^}]*?\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) {
    nodes.push({
      id: m[1],
      title: m[2],
      summary: m[3],
      important: /"important":\s*true/.test(m[0]),
      hasBody: /"hasBody":\s*true/.test(m[0]),
    });
  }
  return nodes;
}

// 统计中文字符数
function countChineseChars(str: string): number {
  const matches = str.match(/[\u4e00-\u9fff]/g);
  return matches ? matches.length : 0;
}

// 统计正文总字数（bodies/ 下所有 BODY_MAP 里的 value）
function countBodyChars(): number {
  if (!fs.existsSync(BODIES_DIR)) return 0;
  let total = 0;
  const files = fs.readdirSync(BODIES_DIR).filter((f) => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(BODIES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    total += countChineseChars(content);
  }
  return total;
}

// 从 en-shard-body-map.ts 提取已译 shard key 列表
function extractTranslatedShardKeys(): string[] {
  if (!fs.existsSync(EN_SHARD_MAP_PATH)) return [];
  const content = fs.readFileSync(EN_SHARD_MAP_PATH, 'utf-8');
  const re = /^\s*['"]([^'"\n]+)['"]:\s*\(\)\s*=>\s*import/gm;
  const keys: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) {
    keys.push(m[1]);
  }
  return keys;
}

// 统计某个 shard 的正文节点数与中文字数
function countShardStats(shardPath: string): { nodeCount: number; chineseChars: number } {
  if (!fs.existsSync(shardPath)) return { nodeCount: 0, chineseChars: 0 };
  const content = fs.readFileSync(shardPath, 'utf-8');
  // 数 BODY_MAP 里的 key
  const keyMatches = content.match(/^\s*['"][^'"\n]+['"]:\s*['"]/gm);
  const nodeCount = keyMatches ? keyMatches.length : 0;
  return {
    nodeCount,
    chineseChars: countChineseChars(content),
  };
}

function main() {
  const translatedIds = new Set(extractTranslatedNodeIds());
  const nodes = extractNodesFromIndex();

  const importantNodes = nodes.filter((n) => n.important);
  const titleTranslated = nodes.filter((n) => translatedIds.has(n.id)).length;
  const summaryTranslated = titleTranslated; // 目前结构上 title/summary 同步
  const importantTranslated = importantNodes.filter((n) => translatedIds.has(n.id)).length;

  const totalBodyChars = countBodyChars();
  const translatedShardKeys = extractTranslatedShardKeys();

  let translatedBodyNodes = 0;
  let translatedBodyChars = 0;
  for (const key of translatedShardKeys) {
    const enPath = path.join(EN_BODIES_DIR, `${key}.ts`);
    const stats = countShardStats(enPath);
    translatedBodyNodes += stats.nodeCount;
    translatedBodyChars += stats.chineseChars;
  }

  const totalShardFiles = fs.existsSync(BODIES_DIR)
    ? fs.readdirSync(BODIES_DIR).filter((f) => f.endsWith('.ts')).length
    : 0;

  const report: ProgressReport = {
    generatedAt: new Date().toISOString(),
    nodes: {
      total: nodes.length,
      important: importantNodes.length,
      titleTranslated,
      titleRemaining: nodes.length - titleTranslated,
      summaryTranslated,
      summaryRemaining: nodes.length - summaryTranslated,
    },
    bodies: {
      totalShardFiles,
      totalChars: totalBodyChars,
      translatedShardFiles: translatedShardKeys.length,
      translatedNodes: translatedBodyNodes,
      translatedChars: translatedBodyChars,
      remainingChars: totalBodyChars - translatedBodyChars,
      translatedShardKeys,
    },
    untranslatedImportantNodeIds: importantNodes
      .filter((n) => !translatedIds.has(n.id))
      .map((n) => n.id)
      .sort(),
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf-8');

  // 控制台摘要
  logger.info('=== 翻译进度 ===');
  logger.info(`节点总数: ${nodes.length}`);
  logger.info(`重要节点: ${importantNodes.length}`);
  logger.info(`标题已译: ${titleTranslated} / ${nodes.length} (${((titleTranslated / nodes.length) * 100).toFixed(1)}%)`);
  logger.info(`重要节点已译: ${importantTranslated} / ${importantNodes.length} (${((importantTranslated / importantNodes.length) * 100).toFixed(1)}%)`);
  logger.info(`正文中文字数: ${totalBodyChars.toLocaleString('zh-CN')}`);
  logger.info(`已译 shard: ${translatedShardKeys.length} / ${totalShardFiles}`);
  logger.info(`已译正文节点: ${translatedBodyNodes}`);
  logger.info(`已译正文字数: ${translatedBodyChars.toLocaleString('zh-CN')} (${((translatedBodyChars / Math.max(1, totalBodyChars)) * 100).toFixed(2)}%)`);
  logger.info(`待译重要节点数: ${report.untranslatedImportantNodeIds.length}`);
  logger.info(`\n完整报告: ${OUTPUT_PATH}`);
}

main();

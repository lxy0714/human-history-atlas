// 完整的节点去重合并脚本（一次性执行）
// 步骤：解析所有节点 -> 跨文件合并字段 -> 删除节点 -> 替换引用 -> 关系去重去自环
import fs from 'fs';
import path from 'path';

// ===================== 配置 =====================
const MERGE_GROUPS = [
  { title: '米诺斯文明', keep: 'minos-civilization', remove: ['ancient-minoan-civilization'] },
  { title: '印度河文明', keep: 'indus-valley-civilization', remove: ['indus-valley'] },
  { title: '迈锡尼文明', keep: 'mycenaean-civilization', remove: ['mycenaean'] },
  { title: '特洛伊战争', keep: 'trojan-war', remove: ['war-trojan'] },
  { title: '老子', keep: 'laozi', remove: ['person-laozi'] },
  { title: '孔子', keep: 'confucius', remove: ['person-confucius'] },
  { title: '百家争鸣', keep: 'china-baijia', remove: ['idea-renaissance-chinese'] },
  { title: '商鞅变法', keep: 'china-shangyang', remove: ['shang-yang-reform'] },
  { title: '佩特拉古城', keep: 'landmark-petra', remove: ['building-petra'] },
  { title: '长平之战', keep: 'china-changping', remove: ['war-changping'] },
  { title: '项羽', keep: 'xiang-yu', remove: ['person-xiangyu'] },
  { title: '万里长城', keep: 'landmark-great-wall', remove: ['building-great-wall'] },
  { title: '楚汉争霸', keep: 'china-chu-han', remove: ['war-chu-han'] },
  { title: '楚汉相争', keep: 'china-chu-han-contention', remove: ['event-xiangyu-liubang-chu-han'] },
  { title: '君士坦丁大帝', keep: 'person-constantine', remove: ['rome-constantine'] },
  { title: '开元盛世', keep: 'event-kaiyuan', remove: ['china-kaiyuan-shengshi'] },
  { title: '安史之乱', keep: 'an-shi-rebellion', remove: ['event-an-shi'] },
  { title: '五代十国', keep: 'dynasty-wudaishi', remove: ['five-dynasties'] },
  { title: '十字军东征', keep: 'crusades', remove: ['war-crusades'] },
  { title: '岳飞', keep: 'yue-fei', remove: ['person-yuefei'] },
  { title: '文艺复兴', keep: 'renaissance', remove: ['idea-renaissance'] },
  { title: '王阳明', keep: 'wang-yangming', remove: ['person-wangyangming'] },
  { title: '伊丽莎白一世', keep: 'elizabeth-i', remove: ['person-elizabeth-i'] },
  { title: '三十年战争', keep: 'thirty-years-war', remove: ['war-thirty-years'] },
  { title: '彼得大帝', keep: 'peter-great', remove: ['person-peter-the-great'] },
  { title: '伏尔泰', keep: 'person-voltaire', remove: ['thinker-voltaire'] },
  { title: '卢梭', keep: 'person-rousseau', remove: ['thinker-rousseau'] },
  { title: '启蒙运动', keep: 'enlightenment', remove: ['idea-enlightenment'] },
  { title: '滑铁卢战役', keep: 'waterloo', remove: ['war-waterloo'] },
  { title: '鸦片战争', keep: 'event-opium-war', remove: ['war-opium'] },
  { title: '美国南北战争', keep: 'war-american-civil', remove: ['us-civil-war-detail'] },
  { title: '孙中山', keep: 'sun-yat-sen', remove: ['person-sunzhongshan'] },
  { title: '富兰克林·罗斯福', keep: 'roosevelt', remove: ['person-roosevelt'] },
  { title: '辛亥革命', keep: 'xinhai-revolution', remove: ['event-xinhai'] },
  { title: '第一次世界大战', keep: 'world-war-1', remove: ['war-wwi'] },
  { title: '大萧条', keep: 'great-depression', remove: ['econ-great-depression', 'economy-1929-depression'] },
  { title: '第二次世界大战', keep: 'world-war-2', remove: ['war-wwii'] },
  { title: '斯大林格勒战役', keep: 'war-stalingrad', remove: ['stalingrad-battle'] },
  { title: '古巴导弹危机', keep: 'cuban-missile-crisis', remove: ['cuban-missile-crisis-deep'] },
];

const ID_MAP = {}; // oldId -> newId
const REMOVE_SET = new Set();
for (const g of MERGE_GROUPS) {
  for (const oldId of g.remove) {
    ID_MAP[oldId] = g.keep;
    REMOVE_SET.add(oldId);
  }
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ===================== 工具函数 =====================

// 找出文件中所有节点定义
// 返回 Map<id, { start, end }>
function findAllNodes(lines) {
  const nodes = new Map();
  for (let i = 0; i < lines.length; i++) {
    const idMatch = lines[i].match(/^(\s*)id:\s*['"]([^'"]+)['"],?\s*$/);
    if (!idMatch) continue;
    const id = idMatch[2];
    
    let start = i;
    for (let j = i; j >= Math.max(0, i - 5); j--) {
      if (lines[j].includes('{')) { start = j; break; }
    }
    
    let brace = 0, started = false, end = start;
    for (let j = start; j < Math.min(start + 200, lines.length); j++) {
      for (const ch of lines[j]) {
        if (ch === '{') { brace++; started = true; }
        if (ch === '}') brace--;
      }
      if (started && brace === 0) { end = j; break; }
    }
    
    if (end > start) nodes.set(id, { start, end });
  }
  return nodes;
}

function extractArray(nodeLines, fieldName) {
  const full = nodeLines.join('\n');
  const re = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`);
  const m = full.match(re);
  if (!m) return [];
  const items = [];
  const itemRe = /['"]([^'"]+)['"]/g;
  let item;
  while ((item = itemRe.exec(m[1])) !== null) items.push(item[1]);
  return items;
}

// 把 remove 节点的数组合并到 keep 节点
// 返回 { lines, changed: boolean }
function mergeField(keepLines, removeLines, fieldName) {
  const keepItems = extractArray(keepLines, fieldName);
  const removeItems = extractArray(removeLines, fieldName);
  if (removeItems.length === 0) return { lines: keepLines, added: 0 };
  
  const merged = [...new Set([...keepItems, ...removeItems])];
  if (merged.length === keepItems.length) return { lines: keepLines, added: 0 };
  
  const full = keepLines.join('\n');
  const re = new RegExp(`(\\s*)${fieldName}:\\s*\\[[\\s\\S]*?\\]`);
  const m = full.match(re);
  if (!m) return { lines: keepLines, added: 0 };
  
  const indent = m[1];
  const newStr = `${indent}${fieldName}: [${merged.map((s) => `'${s}'`).join(', ')}]`;
  return {
    lines: full.replace(re, newStr).split('\n'),
    added: merged.length - keepItems.length,
  };
}

// 给节点增加 important: true（如果没有）
function ensureImportant(lines) {
  if (lines.some((l) => l.includes('important: true'))) return lines;
  const idx = lines.findIndex((l) => l.includes('summary:'));
  if (idx < 0) return lines;
  const newLines = [...lines];
  newLines.splice(idx + 1, 0, '    important: true,');
  return newLines;
}

// ===================== 主流程 =====================

const dataDir = 'src/data';
const nodeFiles = [
  path.join(dataDir, 'history.ts'),
  ...fs.readdirSync(dataDir)
    .filter((f) => f.startsWith('phase') && f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .map((f) => path.join(dataDir, f)),
];

console.log(`节点文件数: ${nodeFiles.length}`);

// ---- Step 1: 先读取所有节点的完整内容（用于跨文件合并）----
const nodeCache = new Map(); // id -> { file, lines }
for (const f of nodeFiles) {
  const content = fs.readFileSync(f, 'utf-8');
  const lines = content.split('\n');
  const nodes = findAllNodes(lines);
  for (const [id, pos] of nodes) {
    if (!nodeCache.has(id)) {
      nodeCache.set(id, { file: f, lines: lines.slice(pos.start, pos.end + 1) });
    }
  }
}
console.log(`缓存节点数: ${nodeCache.size}`);

// ---- Step 2: 计算每个 keep 节点合并后的内容（内存中）----
const keepNodeNewContent = new Map(); // keepId -> 合并后的 lines

for (const g of MERGE_GROUPS) {
  const keepNode = nodeCache.get(g.keep);
  if (!keepNode) continue;
  
  let mergedLines = [...keepNode.lines];
  let changes = [];
  
  for (const removeId of g.remove) {
    const removeNode = nodeCache.get(removeId);
    if (!removeNode) continue;
    
    // 合并 relatedNodeIds
    const r1 = mergeField(mergedLines, removeNode.lines, 'relatedNodeIds');
    if (r1.added > 0) {
      mergedLines = r1.lines;
      changes.push(`relatedNodeIds+${r1.added}`);
    }
    
    // 合并 categories
    const r2 = mergeField(mergedLines, removeNode.lines, 'categories');
    if (r2.added > 0) {
      mergedLines = r2.lines;
      changes.push(`categories+${r2.added}`);
    }
    
    // 如果 remove 有 important: true，保留节点也加上
    const hasImpRemove = removeNode.lines.some((l) => l.includes('important: true'));
    const hasImpKeep = mergedLines.some((l) => l.includes('important: true'));
    if (hasImpRemove && !hasImpKeep) {
      mergedLines = ensureImportant(mergedLines);
      changes.push('+important');
    }
  }
  
  if (changes.length > 0) {
    keepNodeNewContent.set(g.keep, { file: keepNode.file, lines: mergedLines, changes });
  }
}

console.log(`需要合并字段的组: ${keepNodeNewContent.size}`);

// ---- Step 3: 逐文件写入（替换 keep 节点内容 + 删除 remove 节点）----
let totalDeleted = 0;
let totalMerged = 0;

for (const filePath of nodeFiles) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let lines = content.split('\n');
  const nodes = findAllNodes(lines);
  
  // 先做：替换 keep 节点的新内容（从后往前，保持行号稳定）
  const keepUpdates = [];
  for (const [keepId, info] of keepNodeNewContent) {
    if (info.file === filePath && nodes.has(keepId)) {
      keepUpdates.push({ id: keepId, pos: nodes.get(keepId), newLines: info.lines, changes: info.changes });
    }
  }
  
  if (keepUpdates.length > 0 || [...nodes.keys()].some((id) => REMOVE_SET.has(id))) {
    console.log(`\n${path.basename(filePath)}:`);
  }
  
  // 按行号从大到小处理 keep 更新
  keepUpdates.sort((a, b) => b.pos.start - a.pos.start);
  for (const up of keepUpdates) {
    const oldLen = up.pos.end - up.pos.start + 1;
    const newLen = up.newLines.length;
    lines.splice(up.pos.start, oldLen, ...up.newLines);
    console.log(`  合并 ${up.id}: ${up.changes.join(', ')}`);
    totalMerged++;
    
    // 更新其他节点位置
    const delta = newLen - oldLen;
    for (const node of nodes.values()) {
      if (node.start > up.pos.start) {
        node.start += delta;
        node.end += delta;
      }
    }
    up.pos.end = up.pos.start + newLen - 1;
  }
  
  // 删除 remove 节点（从后往前）
  const toDelete = [];
  for (const id of REMOVE_SET) {
    if (nodes.has(id)) toDelete.push({ id, pos: nodes.get(id) });
  }
  toDelete.sort((a, b) => b.pos.start - a.pos.start);
  
  for (const { id, pos } of toDelete) {
    const count = pos.end - pos.start + 1;
    lines.splice(pos.start, count);
    console.log(`  删除 ${id} (${count} 行)`);
    totalDeleted++;
  }
  
  if (keepUpdates.length > 0 || toDelete.length > 0) {
    fs.writeFileSync(filePath, lines.join('\n'));
  }
}

console.log(`\n=== Step 1-3 完成：删除 ${totalDeleted} 节点，${totalMerged} 组合并字段 ===`);

// ---- Step 4: 替换所有数据文件中的 id 引用（跳过节点 id: 行）----
const allDataFiles = fs.readdirSync(dataDir)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts') && !f.endsWith('.tmp.ts') && !f.endsWith('.d.ts'))
  .map((f) => path.join(dataDir, f));

console.log(`\n替换引用：扫描 ${allDataFiles.length} 个文件`);

let totalReplacements = 0;
for (const filePath of allDataFiles) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let fileCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    // 跳过节点对象的 id: 字段行
    if (/^\s*id:\s*['"]/.test(lines[i])) continue;
    
    for (const [oldId, newId] of Object.entries(ID_MAP)) {
      const re = new RegExp(`(['"])${escapeRe(oldId)}\\1`, 'g');
      if (re.test(lines[i])) {
        const matches = lines[i].match(re);
        lines[i] = lines[i].replace(re, `$1${newId}$1`);
        fileCount += matches?.length || 0;
      }
    }
  }
  
  if (fileCount > 0) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`  ${path.basename(filePath)}: ${fileCount} 处`);
    totalReplacements += fileCount;
  }
}

console.log(`\n=== Step 4 完成：替换 ${totalReplacements} 处引用 ===`);

// ---- Step 5: 关系去重 + 去自环 ----
console.log('\nStep 5: 关系去重 + 去自环');
const relFilePath = path.join(dataDir, 'relations.ts');
let relContent = fs.readFileSync(relFilePath, 'utf-8');
const relLines = relContent.split('\n');

// 找出 RELATIONS 数组的起止
let relStart = -1, relEnd = -1;
for (let i = 0; i < relLines.length; i++) {
  if (/export const RELATIONS/.test(relLines[i]) || /const RELATIONS/.test(relLines[i])) {
    relStart = i;
    break;
  }
}

if (relStart >= 0) {
  // 找到第一个 [
  for (let i = relStart; i < relLines.length; i++) {
    if (relLines[i].includes('[')) { relStart = i; break; }
  }
  
  // 找到匹配的 ]
  let brace = 0, started = false;
  for (let i = relStart; i < relLines.length; i++) {
    for (const ch of relLines[i]) {
      if (ch === '[') { brace++; started = true; }
      if (ch === ']') brace--;
    }
    if (started && brace === 0) { relEnd = i; break; }
  }
}

if (relStart >= 0 && relEnd > relStart) {
  // 解析所有关系行
  const relations = [];
  const seen = new Set();
  let selfLoops = 0;
  let duplicates = 0;
  
  for (let i = relStart + 1; i < relEnd; i++) {
    const line = relLines[i];
    // 匹配 { from: 'xxx', to: 'xxx', type: 'xxx' } 或类似结构
    const fromMatch = line.match(/from:\s*['"]([^'"]+)['"]/);
    const toMatch = line.match(/to:\s*['"]([^'"]+)['"]/);
    if (!fromMatch || !toMatch) continue;
    const from = fromMatch[1];
    const to = toMatch[1];
    const typeMatch = line.match(/type:\s*['"]([^'"]+)['"]/);
    const type = typeMatch ? typeMatch[1] : '';
    
    // 自环
    if (from === to) {
      selfLoops++;
      continue;
    }
    
    // 去重（双向对称的两条只保留不重复的；完全相同的才是重复）
    const key = `${from}|${to}|${type}`;
    if (seen.has(key)) {
      duplicates++;
      continue;
    }
    seen.add(key);
    relations.push({ line, index: i });
  }
  
  // 写回：只保留不重复的关系行
  const newRelLines = [
    ...relLines.slice(0, relStart + 1),
    ...relations.map((r) => r.line),
    ...relLines.slice(relEnd),
  ];
  
  fs.writeFileSync(relFilePath, newRelLines.join('\n'));
  console.log(`  自环: ${selfLoops} 条`);
  console.log(`  重复: ${duplicates} 条`);
  console.log(`  剩余: ${relations.length} 条`);
}

console.log('\n✅ 全部完成');

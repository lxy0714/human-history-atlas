// 合并后验证：悬空、孤立、双向对称、重复标题
import fs from 'fs';
import path from 'path';

const dataDir = 'src/data';
const nodeFiles = [
  path.join(dataDir, 'history.ts'),
  ...fs.readdirSync(dataDir)
    .filter((f) => f.startsWith('phase') && f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .map((f) => path.join(dataDir, f)),
];

// 收集所有节点 id
const allNodeIds = new Set();
const nodeTitles = new Map(); // id -> title
const nodeTypes = new Map(); // id -> type
const nodeFile = new Map(); // id -> file

for (const f of nodeFiles) {
  const content = fs.readFileSync(f, 'utf-8');
  const lines = content.split('\n');
  
  // 找每个节点的 id 和 title
  let currentId = null;
  for (const line of lines) {
    const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      currentId = idMatch[1];
      allNodeIds.add(currentId);
      nodeFile.set(currentId, f);
    }
    if (currentId) {
      const titleMatch = line.match(/^\s*title:\s*['"]([^'"]+)['"]/);
      if (titleMatch) nodeTitles.set(currentId, titleMatch[1]);
      const typeMatch = line.match(/^\s*type:\s*['"]([^'"]+)['"]/);
      if (typeMatch) nodeTypes.set(currentId, typeMatch[1]);
    }
  }
}

console.log(`节点总数: ${allNodeIds.size}`);

// 检查重复标题
const titleToIds = new Map();
for (const [id, title] of nodeTitles) {
  if (!titleToIds.has(title)) titleToIds.set(title, []);
  titleToIds.get(title).push(id);
}

const duplicateTitles = [...titleToIds.entries()].filter(([, ids]) => ids.length > 1);
console.log(`\n重复标题组数: ${duplicateTitles.length}`);
duplicateTitles.forEach(([title, ids]) => {
  console.log(`  ${title}: ${ids.join(', ')}`);
});

// 从关系文件中收集关系
const relPath = path.join(dataDir, 'relations.ts');
const relContent = fs.readFileSync(relPath, 'utf-8');
const relations = [];
const relRe = /from:\s*['"]([^'"]+)['"][\s\S]*?to:\s*['"]([^'"]+)['"][\s\S]*?type:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = relRe.exec(relContent)) !== null) {
  relations.push({ from: m[1], to: m[2], type: m[3] });
}
console.log(`\n关系总数: ${relations.length}`);

// 自环
const selfLoops = relations.filter((r) => r.from === r.to);
console.log(`自环: ${selfLoops.length}`);

// 悬空：from 或 to 不在节点集合中
const dangling = [];
for (const r of relations) {
  if (!allNodeIds.has(r.from)) dangling.push({ side: 'from', id: r.from });
  if (!allNodeIds.has(r.to)) dangling.push({ side: 'to', id: r.to });
}
const uniqueDangling = [...new Set(dangling.map((d) => d.id))];
console.log(`悬空节点: ${uniqueDangling.length}`);
if (uniqueDangling.length > 0) {
  uniqueDangling.slice(0, 20).forEach((id) => console.log(`  ${id}`));
}

// 双向对称检查
const relationKeys = new Set(relations.map((r) => `${r.from}|${r.to}|${r.type}`));
let asymmetricCount = 0;
for (const r of relations) {
  const reverseKey = `${r.to}|${r.from}|${r.type}`;
  if (!relationKeys.has(reverseKey)) {
    asymmetricCount++;
  }
}
console.log(`\n不对称关系数: ${asymmetricCount}`);
console.log(`双向对称率: ${((1 - asymmetricCount / relations.length) * 100).toFixed(2)}%`);

// 孤立节点（没有任何关系）
const nodesInRelations = new Set();
for (const r of relations) {
  nodesInRelations.add(r.from);
  nodesInRelations.add(r.to);
}
const isolated = [...allNodeIds].filter((id) => !nodesInRelations.has(id));
console.log(`\n孤立节点数: ${isolated.length}`);
if (isolated.length > 0) {
  isolated.slice(0, 20).forEach((id) => console.log(`  ${id} (${nodeTitles.get(id) || '?'})`));
}

// 各类型分布
const typeCount = {};
for (const type of nodeTypes.values()) {
  typeCount[type] = (typeCount[type] || 0) + 1;
}
console.log(`\n节点类型分布:`);
Object.entries(typeCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => console.log(`  ${type}: ${count}`));

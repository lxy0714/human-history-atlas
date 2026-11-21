// 探查两套关联系统的覆盖与重叠
import fs from 'fs';
import path from 'path';

const nodeFiles = [
  'src/data/history.ts',
  ...fs.readdirSync('src/data')
    .filter((f) => f.startsWith('phase') && f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .map((f) => path.join('src/data', f)),
];

const nodes = [];

for (const f of nodeFiles) {
  const content = fs.readFileSync(f, 'utf-8');
  const idRe = /^\s*id:\s*['"]([^'"]+)['"]/gm;
  let m;
  
  while ((m = idRe.exec(content)) !== null) {
    const id = m[1];
    const startIdx = m.index;
    const slice = content.slice(startIdx, startIdx + 2000);
    const relMatch = slice.match(/relatedNodeIds:\s*\[([\s\S]*?)\]/);
    
    let relatedIds = [];
    if (relMatch) {
      const idMatches = relMatch[1].match(/['"]([^'"]+)['"]/g);
      if (idMatches) {
        relatedIds = idMatches.map((s) => s.replace(/['"]/g, ''));
      }
    }
    
    nodes.push({ id, relatedNodeIds: relatedIds });
  }
}

console.log(`节点总数: ${nodes.length}`);

const hasRelated = nodes.filter((n) => n.relatedNodeIds.length > 0);
console.log(`有 relatedNodeIds 的节点: ${hasRelated.length}`);

let totalRelated = 0;
let totalUniqueRelated = 0;
for (const n of nodes) {
  totalRelated += n.relatedNodeIds.length;
  totalUniqueRelated += new Set(n.relatedNodeIds).size;
}
console.log(`relatedNodeIds 总条目: ${totalRelated}（去重后 ${totalUniqueRelated}）`);

// 读取 RELATIONS
const relContent = fs.readFileSync('src/data/relations.ts', 'utf-8');
const relMatches = relContent.match(/\{[^}]*from:\s*['"]([^'"]+)['"][^}]*to:\s*['"]([^'"]+)['"][^}]*\}/g);
const relations = [];
if (relMatches) {
  for (const m of relMatches) {
    const fromMatch = m.match(/from:\s*['"]([^'"]+)['"]/);
    const toMatch = m.match(/to:\s*['"]([^'"]+)['"]/);
    const typeMatch = m.match(/type:\s*['"]([^'"]+)['"]/);
    if (fromMatch && toMatch) {
      relations.push({ from: fromMatch[1], to: toMatch[1], type: typeMatch?.[1] || '' });
    }
  }
}
console.log(`RELATIONS 关系数: ${relations.length}`);

// RELATIONS 无向集合
const relSet = new Set();
for (const r of relations) {
  const key = [r.from, r.to].sort().join('|');
  relSet.add(key);
}

// relatedNodeIds 中有多少在 RELATIONS 中
let inRelations = 0;
let notInRelations = 0;
const notInRelPairs = [];

for (const node of nodes) {
  // 先去重再统计
  const uniqueIds = [...new Set(node.relatedNodeIds)];
  for (const otherId of uniqueIds) {
    const key = [node.id, otherId].sort().join('|');
    if (relSet.has(key)) {
      inRelations++;
    } else {
      notInRelations++;
      if (notInRelPairs.length < 20) {
        notInRelPairs.push(`${node.id} → ${otherId}`);
      }
    }
  }
}

console.log(`\nrelatedNodeIds 去重后条目:`);
console.log(`  在 RELATIONS 中: ${inRelations}`);
console.log(`  不在 RELATIONS 中: ${notInRelations}`);
const totalUnique = inRelations + notInRelations;
console.log(`  重叠率: ${((inRelations / totalUnique) * 100).toFixed(1)}%`);

console.log(`\n不在 RELATIONS 中的示例（20条）:`);
notInRelPairs.forEach((p) => console.log(`  ${p}`));

// RELATIONS 中有多少在 relatedNodeIds 中
const relatedSet = new Set();
for (const node of nodes) {
  for (const otherId of node.relatedNodeIds) {
    const key = [node.id, otherId].sort().join('|');
    relatedSet.add(key);
  }
}

let relInRelated = 0;
for (const key of relSet) {
  if (relatedSet.has(key)) relInRelated++;
}
console.log(`\nRELATIONS 去重后 ${relSet.size} 对：`);
console.log(`  在 relatedNodeIds 中: ${relInRelated}（${((relInRelated / relSet.size) * 100).toFixed(1)}%）`);

// 覆盖统计
const allNodeIds = new Set(nodes.map((n) => n.id));
const nodesWithAnyRelation = new Set();
for (const r of relations) {
  nodesWithAnyRelation.add(r.from);
  nodesWithAnyRelation.add(r.to);
}
for (const n of nodes) {
  if (n.relatedNodeIds.length > 0) {
    nodesWithAnyRelation.add(n.id);
  }
}
const isolatedCount = allNodeIds.size - nodesWithAnyRelation.size;
console.log(`\n有任何关联的节点: ${nodesWithAnyRelation.size} / ${allNodeIds.size}`);
console.log(`完全孤立节点: ${isolatedCount}`);

const relNodeCount = new Set([...relations.flatMap((r) => [r.from, r.to])]).size;
console.log(`RELATIONS 覆盖节点: ${relNodeCount}`);
console.log(`relatedNodeIds 覆盖节点: ${hasRelated.length}`);

// 只在 RELATIONS 中有的节点
const relOnly = new Set();
for (const r of relations) {
  if (!hasRelated.find((n) => n.id === r.from)) relOnly.add(r.from);
  if (!hasRelated.find((n) => n.id === r.to)) relOnly.add(r.to);
}
console.log(`\n只在 RELATIONS 中（relatedNodeIds 为空）的节点: ${relOnly.size}`);

// 只在 relatedNodeIds 中有的节点
const relatedOnly = hasRelated.filter((n) => !Array.from(nodesWithAnyRelation).includes(n.id) 
  ? false // 已经在 any 里了，换个判定
  : false);
// 重新算：有 relatedNodeIds 但不在 RELATIONS 中
const relNodeSet = new Set();
for (const r of relations) {
  relNodeSet.add(r.from);
  relNodeSet.add(r.to);
}
const onlyInRelated = hasRelated.filter((n) => !relNodeSet.has(n.id));
console.log(`有 relatedNodeIds 但 RELATIONS 中无任何正式关系的节点: ${onlyInRelated.length}`);
if (onlyInRelated.length > 0) {
  onlyInRelated.slice(0, 15).forEach((n) => console.log(`  ${n.id} (${n.relatedNodeIds.length}个关联)`));
}

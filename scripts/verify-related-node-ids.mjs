// 验证并清理 relatedNodeIds：悬空检测、自环检测、明显错误检测
import fs from 'fs';
import path from 'path';

const nodeFiles = [
  'src/data/history.ts',
  ...fs.readdirSync('src/data')
    .filter((f) => f.startsWith('phase') && f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .map((f) => path.join('src/data', f)),
];

// 收集所有节点 id
const allNodeIds = new Set();
const nodesWithRelated = []; // {id, file, relatedNodeIds[]}

for (const f of nodeFiles) {
  const content = fs.readFileSync(f, 'utf-8');
  const idRe = /^\s*id:\s*['"]([^'"]+)['"]/gm;
  let m;
  
  while ((m = idRe.exec(content)) !== null) {
    const id = m[1];
    allNodeIds.add(id);
    
    const startIdx = m.index;
    const slice = content.slice(startIdx, startIdx + 2000);
    const relMatch = slice.match(/relatedNodeIds:\s*\[([\s\S]*?)\]/);
    
    if (relMatch) {
      const idMatches = relMatch[1].match(/['"]([^'"]+)['"]/g);
      const relatedIds = idMatches ? idMatches.map((s) => s.replace(/['"]/g, '')) : [];
      if (relatedIds.length > 0) {
        nodesWithRelated.push({ id, file: path.basename(f), relatedNodeIds: relatedIds });
      }
    }
  }
}

console.log(`节点总数: ${allNodeIds.size}`);
console.log(`有 relatedNodeIds 的节点: ${nodesWithRelated.length}`);

// 1. 自环检测
console.log('\n=== 自环检测 ===');
let selfLoopCount = 0;
for (const n of nodesWithRelated) {
  const loops = n.relatedNodeIds.filter((id) => id === n.id);
  if (loops.length > 0) {
    console.log(`  ${n.id} (${n.file}): 自环 ${loops.length} 个`);
    selfLoopCount += loops.length;
  }
}
console.log(`自环总数: ${selfLoopCount}`);

// 2. 悬空检测（引用不存在的节点）
console.log('\n=== 悬空检测 ===');
let danglingCount = 0;
const danglingExamples = [];
for (const n of nodesWithRelated) {
  const dangling = n.relatedNodeIds.filter((id) => !allNodeIds.has(id));
  if (dangling.length > 0) {
    danglingCount += dangling.length;
    if (danglingExamples.length < 30) {
      danglingExamples.push(`${n.id} (${n.file}): ${dangling.join(', ')}`);
    }
  }
}
console.log(`悬空引用总数: ${danglingCount}`);
danglingExamples.forEach((e) => console.log(`  ${e}`));

// 3. 重复项检测
console.log('\n=== 重复项检测 ===');
let dupCount = 0;
for (const n of nodesWithRelated) {
  const seen = new Set();
  const dups = [];
  for (const id of n.relatedNodeIds) {
    if (seen.has(id)) dups.push(id);
    seen.add(id);
  }
  if (dups.length > 0) {
    console.log(`  ${n.id} (${n.file}): 重复 ${dups.join(', ')}`);
    dupCount += dups.length;
  }
}
console.log(`重复项总数: ${dupCount}`);

// 4. RELATIONS 双向对称检查（简要）
console.log('\n=== RELATIONS 双向对称检查 ===');
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

// 检查双向：对每一条 (from, to, type)，是否存在 (to, from, type)
const relKeySet = new Set(relations.map((r) => `${r.from}|${r.to}|${r.type}`));
let asymmetricCount = 0;
const asymmetricExamples = [];
for (const r of relations) {
  const reverseKey = `${r.to}|${r.from}|${r.type}`;
  if (!relKeySet.has(reverseKey)) {
    asymmetricCount++;
    if (asymmetricExamples.length < 10) {
      asymmetricExamples.push(`${r.from} → ${r.to} (${r.type}) 缺反向`);
    }
  }
}
console.log(`关系总数: ${relations.length}`);
console.log(`单向（缺反向）: ${asymmetricCount}`);
if (asymmetricExamples.length > 0) {
  asymmetricExamples.forEach((e) => console.log(`  ${e}`));
}

// 5. 每个节点统一关联数统计
console.log('\n=== 统一关联统计 ===');

// 构建 RELATIONS 的无向集合
const relSetUndirected = new Set();
for (const r of relations) {
  const key = [r.from, r.to].sort().join('|');
  relSetUndirected.add(key);
}

// 构建 relatedNodeIds 的无向集合（去重后）
const relatedSetUndirected = new Set();
for (const n of nodesWithRelated) {
  const uniqueIds = [...new Set(n.relatedNodeIds)];
  for (const otherId of uniqueIds) {
    if (otherId === n.id) continue; // 去自环
    const key = [n.id, otherId].sort().join('|');
    relatedSetUndirected.add(key);
  }
}

// 统一关联（去重、去自环）
const unifiedSet = new Set([...relSetUndirected, ...relatedSetUndirected]);

// 统计每个节点的度数
const degreeMap = new Map();
for (const key of unifiedSet) {
  const [a, b] = key.split('|');
  degreeMap.set(a, (degreeMap.get(a) || 0) + 1);
  degreeMap.set(b, (degreeMap.get(b) || 0) + 1);
}

const isolated = [];
for (const id of allNodeIds) {
  if (!degreeMap.has(id)) isolated.push(id);
}
console.log(`统一关联（去重去自环后）: ${unifiedSet.size} 对`);
console.log(`有统一关联的节点: ${degreeMap.size} / ${allNodeIds.size}`);
console.log(`孤立节点数: ${isolated.length}`);
if (isolated.length > 0 && isolated.length <= 30) {
  isolated.forEach((id) => console.log(`  ${id}`));
}

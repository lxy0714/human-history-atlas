import { ALL_HISTORY_NODES } from './history';
import { RELATIONS } from './relations';
import { GLOSSARY_TERMS } from './glossary';
import { QUIZ_QUESTIONS } from './quiz';
import { LEARNING_PATHS } from './learning-paths';
import { NODE_KEY_POINTS } from './key-points';
import { MONTH_DAY_EVENTS } from './month-day-events';
import { HISTORY_ROUTES } from './routes';
import { logger } from '@lark-apaas/client-toolkit-lite';

const log = (s: string) => logger.info(s);
const idSet = new Set(ALL_HISTORY_NODES.map(n => n.id));

// === 1. 节点统计 ===
log('========== 1. 节点统计 ==========');
log(`节点总数: ${ALL_HISTORY_NODES.length}`);
const typeCount: Record<string, number> = {};
const civCount: Record<string, number> = {};
ALL_HISTORY_NODES.forEach(n => {
  typeCount[n.type || 'undefined'] = (typeCount[n.type || 'undefined'] || 0) + 1;
  const civs = Array.isArray(n.civilization) ? n.civilization : [n.civilization || 'undefined'];
  civs.forEach((c: string) => {
    civCount[c] = (civCount[c] || 0) + 1;
  });
});
log(`类型分布: ${JSON.stringify(typeCount)}`);
log(`文明分布: ${JSON.stringify(civCount)}`);

// === 2. 关系统计（统一口径孤立） ===
log('\n========== 2. 关系与孤立 ==========');
const outDeg = new Map<string, number>();
const inDeg = new Map<string, number>();

ALL_HISTORY_NODES.forEach(n => {
  outDeg.set(n.id, (n.relatedNodeIds || []).length);
});
RELATIONS.forEach(r => {
  outDeg.set(r.from, (outDeg.get(r.from) || 0) + 1);
  inDeg.set(r.to, (inDeg.get(r.to) || 0) + 1);
});
ALL_HISTORY_NODES.forEach(n => {
  (n.relatedNodeIds || []).forEach(rid => {
    inDeg.set(rid, (inDeg.get(rid) || 0) + 1);
  });
});

const trulyIsolated = ALL_HISTORY_NODES.filter(
  n => (outDeg.get(n.id) || 0) === 0 && (inDeg.get(n.id) || 0) === 0
);

log(`RELATIONS 总数: ${RELATIONS.length}`);
let relatedTotal = 0;
ALL_HISTORY_NODES.forEach(n => relatedTotal += (n.relatedNodeIds || []).length);
log(`relatedNodeIds 总数（条）: ${relatedTotal}`);

const relTypeCount: Record<string, number> = {};
RELATIONS.forEach(r => {
  relTypeCount[r.type] = (relTypeCount[r.type] || 0) + 1;
});
log(`关系类型分布: ${JSON.stringify(relTypeCount)}`);

const totalOut = Array.from(outDeg.values()).reduce((a,b)=>a+b,0);
const totalIn = Array.from(inDeg.values()).reduce((a,b)=>a+b,0);
log(`总出度: ${totalOut}, 总入度: ${totalIn}`);
log(`平均每节点度数: ${((totalOut + totalIn) / ALL_HISTORY_NODES.length).toFixed(2)}`);

log(`\n真正孤立节点（两源全无）: ${trulyIsolated.length}`);
trulyIsolated.forEach(n => log(`  ${n.id} | ${n.title} | ${n.type} | ${JSON.stringify(n.civilization)}`));

// === 3. 悬空检查 ===
log('\n========== 3. 悬空检查 ==========');
const danglingRel = RELATIONS.filter(r => !idSet.has(r.from) || !idSet.has(r.to));
log(`RELATIONS 悬空: ${danglingRel.length}`);
danglingRel.slice(0, 10).forEach(r => log(`  ${r.from} -> ${r.to}`));

let danglingRelated = 0;
ALL_HISTORY_NODES.forEach(n => {
  (n.relatedNodeIds || []).forEach(rid => {
    if (!idSet.has(rid)) danglingRelated++;
  });
});
log(`relatedNodeIds 悬空: ${danglingRelated}`);

let glossaryDangling = 0;
GLOSSARY_TERMS.forEach(g => {
  (g.relatedNodeIds || []).forEach(rid => {
    if (!idSet.has(rid)) glossaryDangling++;
  });
});
log(`术语词典 悬空: ${glossaryDangling}`);

let quizDangling = 0;
QUIZ_QUESTIONS.forEach(q => {
  if (q.relatedNodeId && !idSet.has(q.relatedNodeId)) quizDangling++;
});
log(`测验题库 悬空: ${quizDangling}`);

let pathDangling = 0;
LEARNING_PATHS.forEach(p => {
  p.chapters.forEach(c => {
    c.nodeIds.forEach(nid => {
      if (!idSet.has(nid)) pathDangling++;
    });
  });
});
log(`学习路径 悬空: ${pathDangling}`);

let kpDangling = 0;
Object.keys(NODE_KEY_POINTS).forEach(k => {
  if (!idSet.has(k)) kpDangling++;
});
log(`记忆点 悬空: ${kpDangling}`);

let mdDangling = 0;
Object.keys(MONTH_DAY_EVENTS).forEach(k => {
  if (!idSet.has(k)) mdDangling++;
});
log(`月日事件 悬空: ${mdDangling}`);

let routeDangling = 0;
HISTORY_ROUTES.forEach(r => {
  r.points.forEach(p => {
    if (p.nodeId && !idSet.has(p.nodeId)) routeDangling++;
  });
});
log(`历史路线 悬空: ${routeDangling}`);

// === 4. 题库 ===
log('\n========== 4. 题库 ==========');
log(`题目总数: ${QUIZ_QUESTIONS.length}`);
const quizCat: Record<string, number> = {};
QUIZ_QUESTIONS.forEach(q => {
  quizCat[q.category] = (quizCat[q.category] || 0) + 1;
});
log(`分类分布: ${JSON.stringify(quizCat)}`);

const dupQ: string[] = [];
for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
  for (let j = i + 1; j < QUIZ_QUESTIONS.length; j++) {
    const a = QUIZ_QUESTIONS[i].question.replace(/\s/g, '');
    const b = QUIZ_QUESTIONS[j].question.replace(/\s/g, '');
    if (a === b || (a.length > 10 && b.length > 10 && (a.includes(b) || b.includes(a)))) {
      dupQ.push(`${QUIZ_QUESTIONS[i].id} ↔ ${QUIZ_QUESTIONS[j].id}: "${QUIZ_QUESTIONS[i].question.slice(0,30)}"`);
    }
  }
}
log(`完全/近似重复题: ${dupQ.length}`);
dupQ.forEach(d => log(`  ${d}`));

// === 5. 术语词典 ===
log('\n========== 5. 术语词典 ==========');
log(`词条总数: ${GLOSSARY_TERMS.length}`);
const glossCat: Record<string, number> = {};
GLOSSARY_TERMS.forEach(g => {
  glossCat[g.category] = (glossCat[g.category] || 0) + 1;
});
log(`分类分布: ${JSON.stringify(glossCat)}`);

// === 6. 学习路径时序 ===
log('\n========== 6. 学习路径时序 ==========');
const nodeYearMap = new Map<string, number>();
ALL_HISTORY_NODES.forEach(n => nodeYearMap.set(n.id, n.year));

LEARNING_PATHS.forEach(p => {
  log(`\n路径: ${p.id} - ${p.title}`);
  let prevYear = -Infinity;
  let disorderCount = 0;
  p.chapters.forEach((c, ci) => {
    const years = c.nodeIds.map(id => nodeYearMap.get(id) ?? 0).sort((a,b)=>a-b);
    const chapterMin = years[0] ?? 0;
    const chapterMax = years[years.length-1] ?? 0;
    if (chapterMin < prevYear && ci > 0) {
      disorderCount++;
      log(`  ⚠ 第${ci+1}章「${c.title}」(${chapterMin}~${chapterMax}) 早于上一章末(${prevYear})`);
    }
    prevYear = chapterMax;
  });
  if (disorderCount === 0) log(`  ✓ 章节时序正常`);
  // 章内乱序
  p.chapters.forEach((c, ci) => {
    const chYears = c.nodeIds.map(id => nodeYearMap.get(id) ?? 0);
    for (let i = 1; i < chYears.length; i++) {
      if (chYears[i] < chYears[i-1]) {
        log(`  ⚠ 第${ci+1}章「${c.title}」节点乱序: ${c.nodeIds[i-1]}(${chYears[i-1]}) > ${c.nodeIds[i]}(${chYears[i]})`);
      }
    }
  });
});

// === 7. 月日事件 ===
log('\n========== 7. 月日事件 ==========');
log(`月日事件总数: ${Object.keys(MONTH_DAY_EVENTS).length}`);

// === 8. person关系统计 ===
log('\n========== 8. Person 关系统计 ==========');
const personNodes = ALL_HISTORY_NODES.filter(n => n.type === 'person');
const personRelCount = new Map<string, number>();
RELATIONS.forEach(r => {
  if (r.type === 'person') {
    personRelCount.set(r.from, (personRelCount.get(r.from) || 0) + 1);
    personRelCount.set(r.to, (personRelCount.get(r.to) || 0) + 1);
  }
});
const zeroPerson = personNodes.filter(n => !personRelCount.has(n.id));
log(`Person节点数: ${personNodes.length}`);
log(`0条person关系的人物: ${zeroPerson.length}`);
zeroPerson.forEach(n => log(`  ${n.id} | ${n.title}`));

// === 9. 双向对称率 ===
log('\n========== 9. 双向对称率 ==========');
const relSet = new Set(RELATIONS.map(r => `${r.from}|${r.to}|${r.type}`));
let asymmetric = 0;
RELATIONS.forEach(r => {
  if (!relSet.has(`${r.to}|${r.from}|${r.type}`)) {
    asymmetric++;
  }
});
log(`非对称关系数: ${asymmetric}`);
log(`双向对称率: ${(((RELATIONS.length - asymmetric) / RELATIONS.length) * 100).toFixed(1)}%`);

log('\n========== 校验完毕 ==========');

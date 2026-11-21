import { ALL_HISTORY_NODES } from './history';
import { RELATIONS } from './relations';
import { HISTORY_ROUTES } from './routes';
import { logger } from '@lark-apaas/client-toolkit-lite';

interface Stat {
  label: string;
  value: number | string;
  detail?: string[];
  pass?: boolean;
}

const stats: Stat[] = [];
const issues: { category: string; id?: string; title?: string; message: string }[] = [];

// 1. 节点总数
const totalNodes = ALL_HISTORY_NODES.length;
stats.push({ label: '节点总数', value: totalNodes });

// 2. 重复ID
const idMap = new Map<string, number>();
ALL_HISTORY_NODES.forEach((n, i) => {
  idMap.set(n.id, (idMap.get(n.id) || 0) + 1);
});
const dupIds = [...idMap.entries()].filter(([, c]) => c > 1).map(([id, c]) => `${id} (×${c})`);
stats.push({ label: '重复ID数', value: dupIds.length, detail: dupIds, pass: dupIds.length === 0 });
dupIds.forEach((d) => issues.push({ category: '重复ID', message: d }));

// 3. 各文明分布
const civCounts: Record<string, number> = {};
ALL_HISTORY_NODES.forEach((n) => {
  civCounts[n.civilization] = (civCounts[n.civilization] || 0) + 1;
});
stats.push({
  label: '各文明节点数',
  value: Object.keys(civCounts).length + ' 类',
  detail: Object.entries(civCounts).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`),
});

// 4. 各类型分布
const typeCounts: Record<string, number> = {};
ALL_HISTORY_NODES.forEach((n) => {
  const t = n.type || 'undefined';
  typeCounts[t] = (typeCounts[t] || 0) + 1;
});
stats.push({
  label: '各类型节点数',
  value: Object.keys(typeCounts).length + ' 类',
  detail: Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`),
});

// 5. 各时代分布
const eraCounts: Record<string, number> = {};
ALL_HISTORY_NODES.forEach((n) => {
  const e = n.eraId || 'undefined';
  eraCounts[e] = (eraCounts[e] || 0) + 1;
});
stats.push({
  label: '各时代节点数',
  value: Object.keys(eraCounts).length + ' 个时代',
  detail: Object.entries(eraCounts).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`),
});

// 6. 关系总数
stats.push({ label: '关系总数（RELATIONS显式）', value: RELATIONS.length });

// 6b. relatedNodeIds 关系总数
let relatedCount = 0;
ALL_HISTORY_NODES.forEach((n) => {
  relatedCount += (n.relatedNodeIds || []).length;
});
stats.push({ label: 'relatedNodeIds关系总数（含重复）', value: relatedCount });

// 7. 缺必填字段
const requiredFields = ['id', 'year', 'title', 'civilization', 'type', 'description', 'eraId', 'summary', 'imageEra', 'relatedNodeIds', 'categories'] as const;
type ReqField = typeof requiredFields[number];
const missingFieldNodes: { id: string; missing: string[]; title?: string }[] = [];
ALL_HISTORY_NODES.forEach((n) => {
  const missing: string[] = [];
  if (!n.id) missing.push('id');
  if (n.year === undefined || n.year === null) missing.push('year');
  if (!n.title) missing.push('title');
  if (!n.civilization) missing.push('civilization');
  if (!n.type) missing.push('type');
  if (!n.description) missing.push('description');
  if (!n.eraId) missing.push('eraId');
  if (!n.summary) missing.push('summary');
  if (!n.imageEra) missing.push('imageEra');
  if (!n.relatedNodeIds) missing.push('relatedNodeIds');
  if (!n.categories || n.categories.length === 0) missing.push('categories');
  if (missing.length > 0) {
    missingFieldNodes.push({ id: n.id, title: n.title, missing });
  }
});
stats.push({
  label: '缺必填字段节点数',
  value: missingFieldNodes.length,
  detail: missingFieldNodes.slice(0, 20).map((n) => `${n.id} (${n.title}): 缺[${n.missing.join(',')}]`),
  pass: missingFieldNodes.length === 0,
});
missingFieldNodes.forEach((n) =>
  issues.push({ category: '缺字段', id: n.id, title: n.title, message: `缺[${n.missing.join(',')}]` })
);

// 8. 孤立节点（既不在RELATIONS两端，也不在任何relatedNodeIds里）
const allRelatedIds = new Set<string>();
RELATIONS.forEach((r) => {
  allRelatedIds.add(r.from);
  allRelatedIds.add(r.to);
});
ALL_HISTORY_NODES.forEach((n) => {
  (n.relatedNodeIds || []).forEach((rid) => {
    allRelatedIds.add(rid);
  });
  if (n.relatedNodeIds && n.relatedNodeIds.length > 0) {
    allRelatedIds.add(n.id); // 有出关系的节点不算孤立
  }
});
// 再精确判定：节点本身有出(relatedNodeIds>0) 或 被别人引用(出现在任何relatedNodeIds或RELATIONS任一端) → 不算孤立
const inDegree = new Map<string, number>();
const outDegree = new Map<string, number>();
ALL_HISTORY_NODES.forEach((n) => {
  outDegree.set(n.id, (n.relatedNodeIds || []).length);
});
RELATIONS.forEach((r) => {
  outDegree.set(r.from, (outDegree.get(r.from) || 0) + 1);
  inDegree.set(r.to, (inDegree.get(r.to) || 0) + 1);
});
ALL_HISTORY_NODES.forEach((n) => {
  (n.relatedNodeIds || []).forEach((rid) => {
    inDegree.set(rid, (inDegree.get(rid) || 0) + 1);
  });
});
const isolatedNodes = ALL_HISTORY_NODES.filter(
  (n) => (outDegree.get(n.id) || 0) === 0 && (inDegree.get(n.id) || 0) === 0
);
stats.push({
  label: '孤立节点数（无任何关系）',
  value: isolatedNodes.length,
  detail: isolatedNodes.map((n) => `${n.id} - ${n.title}`),
  pass: isolatedNodes.length === 0,
});
isolatedNodes.forEach((n) =>
  issues.push({ category: '孤立节点', id: n.id, title: n.title, message: '无任何关系' })
);

// 9. 悬空关系 RELATIONS
const idSet = new Set(ALL_HISTORY_NODES.map((n) => n.id));
const danglingRelations = RELATIONS.filter(
  (r) => !idSet.has(r.from) || !idSet.has(r.to)
);
stats.push({
  label: 'RELATIONS悬空关系数',
  value: danglingRelations.length,
  detail: danglingRelations.slice(0, 20).map(
    (r) => `${r.from} → ${r.to} (${r.type}: ${r.label})`
  ),
  pass: danglingRelations.length === 0,
});
danglingRelations.forEach((r) =>
  issues.push({
    category: 'RELATIONS悬空',
    id: r.from,
    message: `${r.from} → ${r.to} (${r.type}: ${r.label})`,
  })
);

// 9b. relatedNodeIds 悬空引用
const danglingRelated: { from: string; fromTitle: string; to: string }[] = [];
ALL_HISTORY_NODES.forEach((n) => {
  (n.relatedNodeIds || []).forEach((rid) => {
    if (!idSet.has(rid)) {
      danglingRelated.push({ from: n.id, fromTitle: n.title, to: rid });
    }
  });
});
stats.push({
  label: 'relatedNodeIds悬空引用数',
  value: danglingRelated.length,
  detail: danglingRelated.slice(0, 20).map(
    (d) => `${d.from} (${d.fromTitle}) → ${d.to}`
  ),
  pass: danglingRelated.length === 0,
});
danglingRelated.forEach((d) =>
  issues.push({
    category: 'relatedNodeIds悬空',
    id: d.from,
    title: d.fromTitle,
    message: `引用不存在的 id: ${d.to}`,
  })
);

// 10. description <50字
const shortDescNodes = ALL_HISTORY_NODES.filter((n) => !n.description || n.description.length < 50);
stats.push({
  label: 'description<50字节点数',
  value: shortDescNodes.length,
  detail: shortDescNodes.slice(0, 20).map(
    (n) => `${n.id} (${n.title}): ${n.description?.length || 0}字`
  ),
});

// 11. 缺坐标但应在地图显示的节点
const mapTypes = ['event', 'dynasty'];
const noLocationMapNodes = ALL_HISTORY_NODES.filter(
  (n) => mapTypes.includes(n.type || '') && !n.location
);
stats.push({
  label: '事件/王朝类缺坐标节点数',
  value: noLocationMapNodes.length,
  detail: noLocationMapNodes.slice(0, 20).map((n) => `${n.id} (${n.title}, ${n.type})`),
});

// 12. description字数分布
const descRanges = [
  { name: '<200字', test: (l: number) => l < 200 },
  { name: '200-500字', test: (l: number) => l >= 200 && l < 500 },
  { name: '500-800字', test: (l: number) => l >= 500 && l < 800 },
  { name: '800-1500字', test: (l: number) => l >= 800 && l < 1500 },
  { name: '>1500字', test: (l: number) => l >= 1500 },
];
const descDist = descRanges.map((r) => {
  const count = ALL_HISTORY_NODES.filter((n) => r.test(n.description?.length || 0)).length;
  return `${r.name}: ${count}`;
});
stats.push({ label: 'description字数分布', value: '', detail: descDist });

// ===== 输出 =====
logger.info('='.repeat(70));
logger.info('  全库数据完整性权威校验报告');
logger.info('='.repeat(70));
logger.info('');

for (const s of stats) {
  const status = s.pass === undefined ? '' : s.pass ? ' ✓' : ' ✗';
  logger.info(`■ ${s.label}: ${s.value}${status}`);
  if (s.detail && s.detail.length > 0) {
    const shown = s.detail.slice(0, 15);
    shown.forEach((d) => logger.info(`   · ${d}`));
    if (s.detail.length > 15) {
      logger.info(`   ... 共 ${s.detail.length} 项`);
    }
  }
  logger.info('');
}

logger.info('='.repeat(70));
logger.info('  问题汇总');
logger.info('='.repeat(70));
const issueCategories = [...new Set(issues.map((i) => i.category))];
for (const cat of issueCategories) {
  const catIssues = issues.filter((i) => i.category === cat);
  logger.info(`\n【${cat}】共 ${catIssues.length} 项`);
  catIssues.slice(0, 10).forEach((i) => {
    logger.info(`  · ${i.id || '-'} ${i.title ? `(${i.title})` : ''}: ${i.message}`);
  });
  if (catIssues.length > 10) logger.info(`  ... 共 ${catIssues.length} 项`);
}

logger.info('\n' + '='.repeat(70));
logger.info('  抽样验证 Phase 11 节点');
logger.info('='.repeat(70));

const samples = [
  // 非洲
  ['person-mansa-musa', '曼萨穆萨'],
  ['africa-adwa', '阿杜瓦战役'],
  // 中亚
  ['timurid-empire', '帖木儿帝国'],
  ['mamluk-sultanate', '马穆鲁克王朝'],
  // 东南亚
  ['landmark-angkor-wat', '吴哥窟'],
  ['sea-majapahit', '满者伯夷'],
  // 美洲
  ['america-teotihuacan', '特奥蒂瓦坎'],
  ['america-austronesian-voyaging', '南岛语族航海'],
  // 东欧
  ['europe-rus-baptism', '罗斯受洗'],
  ['europe-ugra-standoff', '乌格拉河对峙'],
  // 中国思想
  ['laozi', '老子'],
  ['person-hanfeizi', '韩非子'],
  ['wang-yangming', '王阳明'],
  // 经济
  ['econ-bretton-woods', '布雷顿森林体系'],
  ['economy-2008-crisis', '2008金融危机'],
  // 近现代
  ['war-stalingrad', '斯大林格勒战役'],
  ['meiji-restoration', '明治维新'],
];

let samplePass = 0;
let sampleFail = 0;
for (const [id, name] of samples) {
  const node = ALL_HISTORY_NODES.find((n) => n.id === id);
  if (node) {
    const relCount = (node.relatedNodeIds || []).length;
    const descLen = node.description?.length || 0;
    const hasLoc = !!node.location;
    logger.info(`  ✓ ${id} (${name}): year=${node.year}, type=${node.type}, 关系=${relCount}, 描述=${descLen}字, 坐标=${hasLoc}`);
    samplePass++;
  } else {
    logger.info(`  ✗ ${id} (${name}): 未找到！`);
    sampleFail++;
  }
}
logger.info(`\n抽样: ${samplePass} 通过, ${sampleFail} 失败`);

// ===== 跨模块完整性校验 =====
logger.info('\n======================================================================');
logger.info('  跨模块完整性校验（HISTORY_ROUTES / RELATIONS）');
logger.info('======================================================================');

const mainIds = new Set(ALL_HISTORY_NODES.map((n) => n.id));

// HISTORY_ROUTES 中的 nodeId 是否都在主数据中
const routeNodeIds: string[] = [];
HISTORY_ROUTES.forEach((r) => {
  r.points.forEach((p) => {
    if (p.nodeId) routeNodeIds.push(p.nodeId);
  });
});
const danglingRouteIds = routeNodeIds.filter((id) => !mainIds.has(id));
logger.info(`\n■ HISTORY_ROUTES 节点引用: ${routeNodeIds.length} 个`);
logger.info(`  悬空引用: ${danglingRouteIds.length} 个${danglingRouteIds.length === 0 ? ' ✓' : ' ✗'}`);
if (danglingRouteIds.length > 0) {
  const byId = new Map<string, number>();
  danglingRouteIds.forEach((id) => byId.set(id, (byId.get(id) || 0) + 1));
  [...byId.entries()].forEach(([id, c]) => logger.info(`  · ${id}: ×${c}`));
}

// RELATIONS 两端是否都在主数据中
const danglingRel = RELATIONS.filter((r) => !mainIds.has(r.from) || !mainIds.has(r.to));
logger.info(`\n■ RELATIONS 关系: ${RELATIONS.length} 条`);
logger.info(`  悬空关系: ${danglingRel.length} 条${danglingRel.length === 0 ? ' ✓' : ' ✗'}`);
if (danglingRel.length > 0) {
  danglingRel.slice(0, 10).forEach((r) => {
    const f = mainIds.has(r.from) ? '✓' : '✗';
    const t = mainIds.has(r.to) ? '✓' : '✗';
    logger.info(`  ${f} ${r.from} → ${t} ${r.to}`);
  });
}

// relatedNodeIds 悬空（主数据内部，跨模块段用）
const crossDanglingRelated: { from: string; fromTitle: string; to: string }[] = [];
ALL_HISTORY_NODES.forEach((n) => {
  (n.relatedNodeIds || []).forEach((rid) => {
    if (!mainIds.has(rid)) {
      crossDanglingRelated.push({ from: n.id, fromTitle: n.title, to: rid });
    }
  });
});
logger.info(`\n■ relatedNodeIds 引用（主数据内）: 共 ${ALL_HISTORY_NODES.reduce((s, n) => s + (n.relatedNodeIds?.length || 0), 0)} 条`);
logger.info(`  悬空引用: ${crossDanglingRelated.length} 条${crossDanglingRelated.length === 0 ? ' ✓' : ' ✗'}`);
if (crossDanglingRelated.length > 0) {
  const byTarget = new Map<string, number>();
  crossDanglingRelated.forEach((d) => byTarget.set(d.to, (byTarget.get(d.to) || 0) + 1));
  [...byTarget.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([tid, count]) => {
    logger.info(`  · ${tid}: ×${count}`);
  });
}

const allOk = danglingRouteIds.length === 0 && danglingRel.length === 0 && crossDanglingRelated.length === 0;
logger.info(`\n■ 全库引用完整性: ${allOk ? '零悬空 ✓' : '存在悬空 ✗'}`);

logger.info('\n校验完成。');

import { describe, it, expect } from 'vitest';
import { ALL_HISTORY_NODES, CIVILIZATIONS, ERAS } from '@/data/history';
import { RELATIONS, getNodeAssociations } from '@/data/relations';
import { ACHIEVEMENTS } from '@/data/achievements';
import { EMPIRES } from '@/data/empires';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import {
  RELATIONSHIP_GRAPHS,
  FASHION_TIMELINE,
  WEAPON_TIMELINE,
  ON_THIS_DAY_EVENTS,
  FUN_FACTS,
  QUOTES,
  RANKINGS,
  COMPARISON_DATA,
} from '@/data/specials';
// 使用纯 console.info 输出统计，避免引入 client-toolkit-lite（其 crypto-js 子路径在 vitest ESM 下有兼容问题）
const log = console.info;

describe('全量数据统计', () => {
  it('输出完整数据规模', () => {
    // 节点总数与类型分布
    const typeCount: Record<string, number> = {};
    const civCount: Record<string, number> = {};
    const eraCount: Record<string, number> = {};
    let importantCount = 0;
    let disputedCount = 0;

    for (const n of ALL_HISTORY_NODES) {
      typeCount[n.type] = (typeCount[n.type] || 0) + 1;
      civCount[n.civilization] = (civCount[n.civilization] || 0) + 1;
      eraCount[n.eraId] = (eraCount[n.eraId] || 0) + 1;
      if (n.important) importantCount++;
      if (n.disputed) disputedCount++;
    }

    // 关联统计
    let totalTyped = 0;
    let totalRelated = 0;
    let minDegree = Infinity;
    let maxDegree = 0;
    let isolatedCount = 0;
    let danglingCount = 0;
    let selfLoopCount = 0;
    let dupCount = 0;
    let asymmetricCount = 0;
    const allNodeIds = new Set(ALL_HISTORY_NODES.map((n) => n.id));

    for (const node of ALL_HISTORY_NODES) {
      const assoc = getNodeAssociations(node.id);
      totalTyped += assoc.typed.length;
      totalRelated += assoc.related.length;
      const deg = assoc.total;
      if (deg < minDegree) minDegree = deg;
      if (deg > maxDegree) maxDegree = deg;
      if (deg === 0) isolatedCount++;

      // 悬空检查
      for (const item of assoc.all) {
        if (!allNodeIds.has(item.targetId)) danglingCount++;
        if (item.targetId === node.id) selfLoopCount++;
      }

      // 重复检查
      const seen = new Set<string>();
      for (const item of assoc.all) {
        if (seen.has(item.targetId)) dupCount++;
        seen.add(item.targetId);
      }
    }

    // 双向对称检查（抽样 + 全量计数）
    for (const node of ALL_HISTORY_NODES) {
      const assoc = getNodeAssociations(node.id);
      for (const item of assoc.all) {
        const reverse = getNodeAssociations(item.targetId);
        const hasRev = reverse.all.some((r) => r.targetId === node.id);
        if (!hasRev) asymmetricCount++;
      }
    }

    const typedEdges = totalTyped / 2;
    const relatedEdges = totalRelated / 2;
    const totalEdges = typedEdges + relatedEdges;
    const avgDegree = (totalTyped + totalRelated) / ALL_HISTORY_NODES.length;

    log('\n========== 全量数据报告 ==========');
    log(`\n【节点】总数: ${ALL_HISTORY_NODES.length}`);
    log(`  重要节点: ${importantCount}  争议节点: ${disputedCount}`);
    log(`  类型分布:`, JSON.stringify(typeCount));
    log(`  文明分布:`, JSON.stringify(civCount));
    log(`  文明数: ${Object.keys(CIVILIZATIONS).length}`);
    log(`  时代分布:`, JSON.stringify(eraCount));
    log(`  时代数: ${ERAS.length}`);

    log(`\n【关联】`);
    log(`  正式关系 (typed): ${typedEdges} 条边`);
    log(`  轻量相关 (related): ${relatedEdges} 条边`);
    log(`  总关联边: ${totalEdges} 条`);
    log(`  平均度数: ${avgDegree.toFixed(2)}`);
    log(`  最小度数: ${minDegree}  最大度数: ${maxDegree}`);

    log(`\n【质量】`);
    log(`  孤立节点: ${isolatedCount}`);
    log(`  悬空引用: ${danglingCount}`);
    log(`  自环: ${selfLoopCount}`);
    log(`  重复关联: ${dupCount}`);
    log(`  双向不对称: ${asymmetricCount}`);

    log(`\n【其他数据】`);
    log(`  成就: ${ACHIEVEMENTS.length} 个`);
    log(`  学习路径: 83 条 (另行统计)`);
    log(`  帝国疆域: ${EMPIRES.length} 个`);
    log(`  选择题: ${QUIZ_QUESTIONS.length} 道`);
    log(`  特殊展厅:`);
    log(`    关系图谱: ${RELATIONSHIP_GRAPHS.length} 组`);
    log(`    服饰时间线: ${FASHION_TIMELINE.length} 件`);
    log(`    兵器时间线: ${WEAPON_TIMELINE.length} 件`);
    log(`    历史上的今天: ${ON_THIS_DAY_EVENTS.length} 条`);
    log(`    冷知识: ${FUN_FACTS.length} 条`);
    log(`    名人名言: ${QUOTES.length} 条`);
    log(`    榜单: ${RANKINGS.length} 组`);
    log(`    对比卡: ${COMPARISON_DATA.length} 对`);
    log('==================================\n');

    // 断言：核心质量指标
    expect(isolatedCount).toBe(0);
    expect(danglingCount).toBe(0);
    expect(selfLoopCount).toBe(0);
    expect(dupCount).toBe(0);
    expect(asymmetricCount).toBe(0);
  });
});

// EXPORTS: clusterNodes, type ClusterGroup
// 地图节点聚集：纯函数，不依赖 leaflet，可用于测试
import type { IHistoryNodeIndex } from '@/data/history-index';
import { CIVILIZATIONS, type CivilizationKey } from '@/data/history-constants';

export interface ClusterGroup {
  /** 聚集唯一 key（坐标键） */
  key: string;
  /** 聚集中心纬度 */
  lat: number;
  /** 聚集中心经度 */
  lng: number;
  /** 聚集内节点列表 */
  nodes: IHistoryNodeIndex[];
  /** 节点数量 */
  count: number;
  /** 主色（该位置出现最多的文明色） */
  primaryColor: string;
}

/**
 * 将节点按坐标聚集（同坐标或距离小于 threshold 的视为同一组）
 * @param nodes 节点列表
 * @param thresholdDegree 距离阈值（度，1度≈111km，默认0即完全同坐标）
 */
export function clusterNodes(
  nodes: IHistoryNodeIndex[],
  thresholdDegree = 0,
): ClusterGroup[] {
  const validNodes = nodes.filter(
    (n) => n.location?.lat !== undefined && n.location?.lng !== undefined,
  );

  const groups = new Map<string, ClusterGroup>();

  for (const node of validNodes) {
    const { lat, lng } = node.location!;

    // 找最近的已有聚集组
    let foundKey: string | null = null;
    let minDist = Infinity;

    if (thresholdDegree <= 0) {
      // 完全同坐标
      const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
      foundKey = groups.has(key) ? key : null;
    } else {
      // 在阈值内找最近的
      for (const [key, group] of groups) {
        const dLat = lat - group.lat;
        const dLng = lng - group.lng;
        const dist = Math.sqrt(dLat * dLat + dLng * dLng);
        if (dist < thresholdDegree && dist < minDist) {
          minDist = dist;
          foundKey = key;
        }
      }
    }

    if (foundKey && groups.has(foundKey)) {
      const g = groups.get(foundKey)!;
      g.nodes.push(node);
      g.count++;
    } else {
      const key = thresholdDegree <= 0
        ? `${lat.toFixed(4)},${lng.toFixed(4)}`
        : `g_${groups.size}`;
      const civColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
      groups.set(key, {
        key,
        lat,
        lng,
        nodes: [node],
        count: 1,
        primaryColor: civColor,
      });
    }
  }

  // 重新计算每个组的主色（按文明出现频率）
  const result: ClusterGroup[] = [];
  for (const group of groups.values()) {
    if (group.count > 1) {
      const civCount = new Map<string, number>();
      for (const n of group.nodes) {
        civCount.set(n.civilization, (civCount.get(n.civilization) ?? 0) + 1);
      }
      let maxCiv: CivilizationKey = group.nodes[0].civilization;
      let maxCount = 0;
      for (const [civ, c] of civCount) {
        if (c > maxCount) {
          maxCount = c;
          maxCiv = civ as CivilizationKey;
        }
      }
      group.primaryColor = CIVILIZATIONS[maxCiv]?.color ?? '#888';
    }
    result.push(group);
  }

  return result;
}

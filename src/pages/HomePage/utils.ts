// EXPORTS: safeStorage, getNodeTimeRange
import type { IHistoryNodeIndex } from '@/data/history-index';
import { getRandomNodeIdFromData } from '@/data/history-loader';
// 纯函数（年份格式化等）抽到独立文件，避免引入运行时依赖，方便单测
export { yearsAgo, formatYear } from './year-utils';
export type { FormatYearOptions } from './year-utils';

// 安全的 localStorage 操作（隐私模式下不报错）
function getStorage(): Storage | null {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return localStorage;
  } catch {
    return null;
  }
}

const storage = getStorage();

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return storage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): boolean {
    try {
      storage?.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem(key: string): boolean {
    try {
      storage?.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

// 获取节点的时间范围 [startYear, endYear]
// - person/dynasty 类型：从 description 里解析（简化：用 year ± 估算寿命/国祚）
// - 其他类型：year ± 10 年
const PERSON_LIFESPAN = 40; // 人物默认估算寿命
const DYNASTY_DURATION = 200; // 朝代默认估算国祚
const EVENT_WINDOW = 10; // 事件窗口

export function getNodeTimeRange(node: IHistoryNodeIndex): [number, number] {
  if (node.type === 'person') {
    // 从 yearDisplay 尝试解析生卒年，失败则用估算
    const match = node.yearDisplay.match(/(-?\d+)[^-0-9]+(-?\d+)/);
    if (match) {
      const a = parseInt(match[1], 10);
      const b = parseInt(match[2], 10);
      // year 字段通常取出生年
      const birth = node.year;
      const death = a === birth ? b : a;
      if (death > birth) return [birth, death];
    }
    return [node.year, node.year + PERSON_LIFESPAN];
  }
  if (node.type === 'dynasty') {
    return [node.year, node.year + DYNASTY_DURATION];
  }
  return [node.year - EVENT_WINDOW, node.year + EVENT_WINDOW];
}

// 判断两个节点是否同时期（时间范围有重叠）
export function isContemporary(a: IHistoryNodeIndex, b: IHistoryNodeIndex): boolean {
  if (a.id === b.id) return false;
  const [aStart, aEnd] = getNodeTimeRange(a);
  const [bStart, bEnd] = getNodeTimeRange(b);
  return aStart <= bEnd && bStart <= aEnd;
}

// 从描述中提取目录项（每段取前20字）
export function extractToc(description: string): { id: string; label: string }[] {
  const paras = description.split('\\n\\n').filter((p) => p.trim().length > 0);
  return paras.map((p, i) => {
    const trimmed = p.trim();
    const label = trimmed.length > 22 ? trimmed.slice(0, 20) + '…' : trimmed;
    return { id: `para-${i}`, label };
  });
}

// 随机选择一个节点（数据未加载时返回空串）
export function getRandomNodeId(): string {
  return getRandomNodeIdFromData();
}

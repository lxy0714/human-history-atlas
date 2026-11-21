// —— 历史放映机：纯工具函数 & 常量（零状态依赖，从主组件抽出） ——

import L from 'leaflet';
import { ERAS } from '@/data/history-index';
import { type IEmpire } from '@/data/empires';
import { formatYear } from '@/pages/HomePage/year-utils';

// 七个时代解说词
export const ERA_NARRATIONS: Record<string, string> = {
  prehistoric: '史前时代：人类从非洲起源，逐次走出非洲，在五大洲点亮文明火种，工具与火的使用开启了漫长的进化之路。',
  ancient: '古代文明：两河与尼罗河率先催生城邦与文字，埃及金字塔、汉谟拉比法典、商朝甲骨文——人类迈入文明门槛。',
  classical: '古典时代：欧亚大陆几大帝国并立，轴心时代思想爆发。希腊哲学、波斯帝国、秦汉一统、印度孔雀，共同塑造了古代世界的秩序。',
  medieval: '中世纪：罗马陷落、伊斯兰崛起、唐宋繁荣、美洲文明绽放。丝绸之路连接欧亚，贸易与宗教在广袤大陆上流动。',
  earlyModern: '近代早期：大航海时代开启全球连接，文艺复兴点亮欧洲，明清更替、莫卧儿兴盛，世界从分散走向整体。',
  industrial: '工业时代：蒸汽机轰鸣，欧洲主导世界秩序。革命浪潮席卷欧美，殖民帝国瓜分全球，人类社会加速转型。',
  modern: '现当代：两次世界大战重塑世界格局，冷战与科技革命并驾齐驱，信息化与全球化将人类带入前所未有的紧密联系。',
};

// 时代里程碑（重要节点 id）
export const MILESTONE_IDS = [
  'homo-sapiens',
  'invention-fire',
  'sumer-civilization',
  'pyramid-age',
  'hammurabi-code',
  'shang-dynasty',
  'zhou-dynasty',
  'persian-empire',
  'greece-golden-age',
  'alexander',
  'qin-unification',
  'rome-republic',
  'han-dynasty',
  'fall-of-rome',
  'islamic-rise',
  'tang-dynasty',
  'song-dynasty',
  'mongol-empire',
  'renaissance',
  'columbian-exchange',
  'ming-yongle-era',
  'age-of-enlightenment',
  'industrial-revolution',
  'french-revolution',
  'british-empire',
  'world-war-one',
  'world-war-two',
  'moon-landing',
  'internet-revolution',
];

export const SPEED_OPTIONS = [
  { value: 0.5, label: '0.5x' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 4, label: '4x' },
];

// 七个时代权重表（共用，避免 progressToYear/yearToProgress 各写一份）
const ERA_WEIGHTS = [
  { id: 'prehistoric', weight: 12 },
  { id: 'ancient', weight: 14 },
  { id: 'classical', weight: 15 },
  { id: 'medieval', weight: 16 },
  { id: 'earlyModern', weight: 15 },
  { id: 'industrial', weight: 14 },
  { id: 'modern', weight: 14 },
];

const TOTAL_WEIGHT = ERA_WEIGHTS.reduce((s, e) => s + e.weight, 0);

// 非线性时间映射：史前快，近现代慢
// 输入 progress 0-100，输出年份
export function progressToYear(progress: number): number {
  let accumulated = 0;
  for (const eraWeight of ERA_WEIGHTS) {
    const era = ERAS.find((e) => e.id === eraWeight.id);
    if (!era) continue;
    const pct = (eraWeight.weight / TOTAL_WEIGHT) * 100;
    if (progress <= accumulated + pct) {
      const localProgress = (progress - accumulated) / pct;
      return era.startYear + localProgress * (era.endYear - era.startYear);
    }
    accumulated += pct;
  }
  return ERAS[ERAS.length - 1].endYear;
}

export function yearToProgress(year: number): number {
  let accumulatedWeight = 0;
  for (const eraWeight of ERA_WEIGHTS) {
    const era = ERAS.find((e) => e.id === eraWeight.id);
    if (!era) continue;
    const pct = (eraWeight.weight / TOTAL_WEIGHT) * 100;
    if (year <= era.endYear) {
      const localProgress = Math.max(0, (year - era.startYear) / (era.endYear - era.startYear));
      return accumulatedWeight + localProgress * pct;
    }
    accumulatedWeight += pct;
  }
  return 100;
}

export { formatYear };

// 创建疆域多边形
export function createEmpirePolygons(empire: IEmpire, color: string): L.Polygon[] {
  return empire.polygons.map((ring) =>
    L.polygon(ring as L.LatLngTuple[], {
      color,
      weight: 1.5,
      opacity: 0.85,
      fillColor: color,
      fillOpacity: 0.25,
      lineJoin: 'round',
      lineCap: 'round',
      interactive: true,
    }),
  );
}

export function createDivIcon(color: string, important: boolean) {
  const size = important ? 16 : 10;
  return L.divIcon({
    className: 'projector-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: ${color};
      border: 2px solid rgba(10, 10, 10, 0.85);
      box-shadow: 0 0 0 2px ${color}50, 0 0 14px ${color};
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// 解析路线 era 字段为 startYear/endYear（如 '前2世纪 — 15世纪'、'1405 — 1433'）
export function parseRouteEra(eraStr: string): [number, number] {
  const parts = eraStr.split(/—|–|-/).map((s) => s.trim());
  if (parts.length !== 2) return [-2000, 2000];
  const parseOne = (s: string): number => {
    s = s.replace(/年/g, '').trim();
    // 公元前：前X年 / 前X世纪
    const bcCentury = s.match(/^前(\d+)世纪$/);
    if (bcCentury) return -(parseInt(bcCentury[1], 10) * 100);
    const bcYear = s.match(/^前(\d+)$/);
    if (bcYear) return -parseInt(bcYear[1], 1);
    // 公元后：X年 / X世纪
    const adCentury = s.match(/^(\d+)世纪$/);
    if (adCentury) return parseInt(adCentury[1], 10) * 100 - 100;
    const num = parseInt(s, 10);
    if (!isNaN(num)) return num;
    return 0;
  };
  return [parseOne(parts[0]), parseOne(parts[1])];
}

// EXPORTS: CIVILIZATIONS, CIVILIZATION_COLORS, CATEGORIES, ERAS, HISTORY_META
// 轻量首屏常量：时代、文明、分类、元数据统计
// 注意：此文件严禁引入大数组，首屏同步加载
// 类型仅做 type import（不影响打包体积）

import type { CivilizationKey, CategoryKey, IEra } from './history';

export type { CivilizationKey, CategoryKey, IEra };

export const CIVILIZATIONS: Record<CivilizationKey, { name: string; color: string }> = {
  china: { name: '中国', color: '#c0392b' },
  europe: { name: '欧洲', color: '#2c3e80' },
  middleEast: { name: '中东', color: '#d4a843' },
  southAsia: { name: '南亚', color: '#e67e22' },
  eastAsia: { name: '东亚其他', color: '#16a085' },
  america: { name: '美洲', color: '#27ae60' },
  africa: { name: '非洲', color: '#a0522d' },
  centralAsia: { name: '中亚', color: '#c0793a' },
  oceania: { name: '大洋洲', color: '#2980b9' },
  global: { name: '全球', color: '#9b59b6' },
};

export const CIVILIZATION_COLORS: Record<CivilizationKey, string> = {
  china: '#c0392b',
  europe: '#2c3e80',
  middleEast: '#d4a843',
  southAsia: '#e67e22',
  eastAsia: '#16a085',
  america: '#27ae60',
  africa: '#a0522d',
  centralAsia: '#c0793a',
  oceania: '#2980b9',
  global: '#9b59b6',
};

export const CATEGORIES: Record<CategoryKey, { name: string; icon: string }> = {
  politics: { name: '政治', icon: '' },
  military: { name: '军事', icon: '' },
  science: { name: '科技', icon: '' },
  culture: { name: '文化', icon: '' },
  myth: { name: '神话', icon: '' },
  artifact: { name: '文物', icon: '' },
};

export const ERAS: IEra[] = [
  {
    id: 'prehistoric',
    name: '史前时代',
    nameEn: 'Prehistoric',
    startYear: -3000000,
    endYear: -4000,
    description: '从人类起源到文明曙光，包括旧石器时代、新石器时代和铜石并用时代。',
    bgFrom: '#2a1f15',
    bgTo: '#1a1410',
    accent: '#8b7355',
  },
  {
    id: 'ancient',
    name: '古代文明',
    nameEn: 'Ancient Civilizations',
    startYear: -4000,
    endYear: -500,
    description: '人类最早的文明诞生于两河流域、尼罗河流域、印度河流域和黄河流域。',
    bgFrom: '#3d3020',
    bgTo: '#2a2015',
    accent: '#d4a843',
  },
  {
    id: 'classical',
    name: '古典时代',
    nameEn: 'Classical Era',
    startYear: -500,
    endYear: 500,
    description: '希腊罗马的辉煌与中华帝国的崛起，东西方文明交相辉映。',
    bgFrom: '#1a2a3a',
    bgTo: '#151f2a',
    accent: '#5a8fa8',
  },
  {
    id: 'medieval',
    name: '中世纪',
    nameEn: 'Medieval',
    startYear: 500,
    endYear: 1500,
    description: '欧洲的黑暗时期与伊斯兰黄金时代，唐宋文明的鼎盛与蒙古帝国的狂飙。',
    bgFrom: '#1a1a24',
    bgTo: '#15151c',
    accent: '#6b5b7a',
  },
  {
    id: 'earlyModern',
    name: '大航海与近代',
    nameEn: 'Early Modern',
    startYear: 1500,
    endYear: 1800,
    description: '地理大发现、文艺复兴、宗教改革、科学革命与启蒙运动。',
    bgFrom: '#0f1e35',
    bgTo: '#0a1525',
    accent: '#4a7ab8',
  },
  {
    id: 'industrial',
    name: '工业时代',
    nameEn: 'Industrial Era',
    startYear: 1800,
    endYear: 1945,
    description: '蒸汽机的轰鸣改变世界，两次世界大战重塑全球格局。',
    bgFrom: '#252528',
    bgTo: '#1a1a1c',
    accent: '#888888',
  },
  {
    id: 'modern',
    name: '现代',
    nameEn: 'Modern',
    startYear: 1945,
    endYear: 2026,
    description: '冷战、太空竞赛、信息革命与AI时代的开启。',
    bgFrom: '#0a0e1a',
    bgTo: '#050810',
    accent: '#3b82f6',
  },
];

// 预计算的元数据（首屏立即可用，无需等大数组加载）
// 总数与各时代/文明节点计数，构建期已知
export const HISTORY_META = {
  totalNodes: 763,
  totalRelations: 1374,
  totalEras: 7,
  totalCivilizations: 10,
  // 各时代节点数（预统计，首屏骨架期可用）
  eraCounts: {
    prehistoric: 10,
    ancient: 80,
    classical: 173,
    medieval: 246,
    earlyModern: 108,
    industrial: 70,
    modern: 76,
  } as Record<string, number>,
  // 各文明节点数（预统计）
  civCounts: {
    china: 270,
    europe: 226,
    middleEast: 47,
    southAsia: 22,
    eastAsia: 39,
    america: 50,
    africa: 46,
    centralAsia: 23,
    oceania: 15,
    global: 25,
  } as Record<string, number>,
};

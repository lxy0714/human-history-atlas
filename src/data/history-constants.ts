// EXPORTS: CIVILIZATIONS, CIVILIZATION_COLORS, CATEGORIES, ERAS, HISTORY_META
// 轻量首屏常量：时代、文明、分类、元数据统计
// 注意：此文件严禁引入大数组，首屏同步加载
// 类型仅做 type import（不影响打包体积）

import type { CivilizationKey, CategoryKey, IEra } from './history';

export type { CivilizationKey, CategoryKey, IEra };

export const CIVILIZATIONS: Record<CivilizationKey, { name: string; nameEn: string; color: string }> = {
  china: { name: '中国', nameEn: 'China', color: '#c0392b' },
  europe: { name: '欧洲', nameEn: 'Europe', color: '#2c3e80' },
  middleEast: { name: '中东', nameEn: 'Middle East', color: '#d4a843' },
  southAsia: { name: '南亚', nameEn: 'South Asia', color: '#e67e22' },
  eastAsia: { name: '东亚其他', nameEn: 'East Asia', color: '#16a085' },
  america: { name: '美洲', nameEn: 'Americas', color: '#27ae60' },
  africa: { name: '非洲', nameEn: 'Africa', color: '#a0522d' },
  centralAsia: { name: '中亚', nameEn: 'Central Asia', color: '#c0793a' },
  oceania: { name: '大洋洲', nameEn: 'Oceania', color: '#2980b9' },
  global: { name: '全球', nameEn: 'Global', color: '#9b59b6' },
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

export const CATEGORIES: Record<CategoryKey, { name: string; nameEn: string; icon: string }> = {
  politics: { name: '政治', nameEn: 'Politics', icon: '' },
  military: { name: '军事', nameEn: 'Military', icon: '' },
  science: { name: '科技', nameEn: 'Science & Tech', icon: '' },
  culture: { name: '文化', nameEn: 'Culture', icon: '' },
  myth: { name: '神话', nameEn: 'Mythology', icon: '' },
  artifact: { name: '文物', nameEn: 'Artifact', icon: '' },
};

export const ERAS: IEra[] = [
  {
    id: 'prehistoric',
    name: '史前时代',
    nameEn: 'Prehistoric',
    startYear: -3000000,
    endYear: -4000,
    description: '从人类起源到文明曙光，包括旧石器时代、新石器时代和铜石并用时代。',
    descriptionEn: 'From human origins to the dawn of civilization: Palaeolithic, Neolithic and Chalcolithic.',
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
    descriptionEn: 'The first civilizations arose in Mesopotamia, the Nile, the Indus and the Yellow River valleys.',
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
    descriptionEn: 'The splendour of Greece and Rome alongside the rise of the Chinese empires — East and West in parallel.',
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
    descriptionEn: 'Europe’s dark centuries and the Islamic Golden Age; Tang-Song civilization at its height and the Mongol storm.',
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
    descriptionEn: 'The Age of Discovery, Renaissance, Reformation, Scientific Revolution and Enlightenment.',
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
    descriptionEn: 'The roar of the steam engine remade the world; two world wars reshaped the global order.',
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
    descriptionEn: 'The Cold War, the space race, the information revolution and the opening of the AI era.',
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

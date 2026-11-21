// EXPORTS: HISTORY_ROUTES
// 历史路线数据 - 用于地图视图动画绘制

export interface RoutePoint {
  name: string;
  lat: number;
  lng: number;
  nodeId?: string; // 关联的历史节点 ID（可选）
}

export interface HistoryRoute {
  id: string;
  name: string;
  era: string; // 年代描述
  description: string;
  color: string;
  dashed?: boolean; // 是否虚线（海上航线）
  points: RoutePoint[];
}

export const HISTORY_ROUTES: HistoryRoute[] = [
  {
    id: 'silk-road',
    name: '丝绸之路',
    era: '前2世纪 — 15世纪',
    description: '从长安到罗马，连接东西方文明的贸易与文化通道',
    color: '#d4af37',
    points: [
      { name: '长安', lat: 34.3, lng: 108.9, nodeId: 'han-dynasty' },
      { name: '兰州', lat: 36.1, lng: 103.8 },
      { name: '武威', lat: 37.9, lng: 102.6 },
      { name: '敦煌', lat: 40.1, lng: 94.7 },
      { name: '哈密', lat: 42.8, lng: 93.5 },
      { name: '吐鲁番', lat: 42.9, lng: 89.2 },
      { name: '喀什', lat: 39.5, lng: 75.9 },
      { name: '撒马尔罕', lat: 39.7, lng: 66.97 },
      { name: '布哈拉', lat: 39.8, lng: 64.4 },
      { name: '木鹿', lat: 37.7, lng: 62.2 },
      { name: '泰西封', lat: 33.1, lng: 44.6 },
      { name: '大马士革', lat: 33.5, lng: 36.3 },
      { name: '安条克', lat: 36.2, lng: 36.2 },
      { name: '君士坦丁堡', lat: 41.0, lng: 28.9, nodeId: 'byzantine-empire' },
      { name: '罗马', lat: 41.9, lng: 12.5, nodeId: 'roman-empire' },
    ],
  },
  {
    id: 'alexander-conquest',
    name: '亚历山大东征',
    era: '前334 — 前323',
    description: '马其顿国王亚历山大十年征战，建立横跨欧亚非的庞大帝国',
    color: '#c0392b',
    points: [
      { name: '佩拉', lat: 40.9, lng: 22.9, nodeId: 'alexander-empire' },
      { name: '格拉尼库斯', lat: 40.3, lng: 27.3 },
      { name: '伊苏斯', lat: 36.8, lng: 36.3 },
      { name: '推罗', lat: 33.3, lng: 35.2 },
      { name: '加沙', lat: 31.5, lng: 34.4 },
      { name: '孟菲斯', lat: 30.0, lng: 31.2, nodeId: 'egypt-unification' },
      { name: '高加米拉', lat: 36.6, lng: 43.5 },
      { name: '巴比伦', lat: 32.5, lng: 44.4, nodeId: 'babylon' },
      { name: '苏萨', lat: 32.2, lng: 48.3 },
      { name: '波斯波利斯', lat: 29.9, lng: 52.9, nodeId: 'persian-empire' },
      { name: '赫拉特', lat: 34.3, lng: 62.2 },
      { name: '撒马尔罕', lat: 39.7, lng: 66.97 },
      { name: '印度河', lat: 31.2, lng: 72.5 },
      { name: '巴比伦（终）', lat: 32.5, lng: 44.4 },
    ],
  },
  {
    id: 'mongol-west',
    name: '蒙古西征',
    era: '1219 — 1242',
    description: '蒙古帝国三次西征，铁骑横扫欧亚大陆',
    color: '#8b3a3a',
    points: [
      { name: '哈拉和林', lat: 47.2, lng: 102.8, nodeId: 'mongol-empire' },
      { name: '撒马尔罕', lat: 39.7, lng: 66.97 },
      { name: '布哈拉', lat: 39.8, lng: 64.4 },
      { name: '玉龙杰赤', lat: 42.3, lng: 60.6 },
      { name: '基辅', lat: 50.5, lng: 30.5, nodeId: 'europe-kievan-rus' },
      { name: '莫斯科', lat: 55.8, lng: 37.6 },
      { name: '里格尼茨', lat: 51.2, lng: 16.2 },
      { name: '布达佩斯', lat: 47.5, lng: 19.0 },
      { name: '维也纳', lat: 48.2, lng: 16.4 },
    ],
  },
  {
    id: 'zhenghe-voyages',
    name: '郑和下西洋',
    era: '1405 — 1433',
    description: '明朝三宝太监七下西洋，最远到达东非',
    color: '#3498db',
    dashed: true,
    points: [
      { name: '南京', lat: 32.1, lng: 118.8, nodeId: 'ming-dynasty' },
      { name: '泉州', lat: 24.9, lng: 118.6 },
      { name: '占城', lat: 13.8, lng: 109.2 },
      { name: '满剌加', lat: 2.2, lng: 102.3 },
      { name: '旧港', lat: -2.99, lng: 104.76 },
      { name: '锡兰', lat: 6.0, lng: 80.2 },
      { name: '古里', lat: 11.2, lng: 75.8 },
      { name: '忽鲁谟斯', lat: 27.1, lng: 56.5 },
      { name: '阿丹', lat: 12.8, lng: 45.0 },
      { name: '天方', lat: 21.5, lng: 39.2 },
      { name: '木骨都束', lat: 2.0, lng: 45.3 },
      { name: '麻林', lat: -3.2, lng: 40.1 },
    ],
  },
  {
    id: 'age-of-exploration',
    name: '大航海时代',
    era: '1492 — 1522',
    description: '哥伦布、达伽马、麦哲伦，地理大发现的三条伟大航线',
    color: '#27ae60',
    dashed: true,
    points: [
      { name: '帕洛斯', lat: 37.2, lng: -6.9 },
      { name: '加那利群岛', lat: 28.1, lng: -15.4 },
      { name: '巴哈马', lat: 24.0, lng: -74.5 },
      { name: '古巴', lat: 21.9, lng: -78.8 },
    ],
  },
  {
    id: 'vasco-da-gama',
    name: '达伽马航线',
    era: '1497 — 1498',
    description: '绕过好望角，开辟欧洲到印度的海上通道',
    color: '#8e44ad',
    dashed: true,
    points: [
      { name: '里斯本', lat: 38.7, lng: -9.1 },
      { name: '好望角', lat: -34.4, lng: 18.5 },
      { name: '蒙巴萨', lat: -4.0, lng: 39.7 },
      { name: '卡利卡特', lat: 11.2, lng: 75.8 },
    ],
  },
  {
    id: 'magellan-circuit',
    name: '麦哲伦环球航行',
    era: '1519 — 1522',
    description: '人类历史上首次环球航行，证明地球是圆的',
    color: '#e67e22',
    dashed: true,
    points: [
      { name: '塞维利亚', lat: 37.4, lng: -6.0, nodeId: 'spanish-empire' },
      { name: '里约热内卢', lat: -22.9, lng: -43.2 },
      { name: '麦哲伦海峡', lat: -53.2, lng: -71.0 },
      { name: '关岛', lat: 13.4, lng: 144.8 },
      { name: '宿务', lat: 10.3, lng: 123.9 },
      { name: '好望角', lat: -34.4, lng: 18.5 },
      { name: '塞维利亚（终）', lat: 37.4, lng: -6.0 },
    ],
  },
  {
    id: 'long-march',
    name: '红军长征',
    era: '1934 — 1936',
    description: '二万五千里长征，人类历史上最伟大的远征',
    color: '#e74c3c',
    points: [
      { name: '瑞金', lat: 25.9, lng: 116.0 },
      { name: '湘江战役', lat: 25.3, lng: 110.3 },
      { name: '遵义', lat: 27.7, lng: 106.9 },
      { name: '四渡赤水', lat: 27.9, lng: 106.4 },
      { name: '巧渡金沙江', lat: 26.3, lng: 102.5 },
      { name: '安顺场', lat: 29.3, lng: 102.3 },
      { name: '泸定桥', lat: 29.9, lng: 102.2 },
      { name: '夹金山', lat: 30.9, lng: 102.9 },
      { name: '松潘草地', lat: 32.6, lng: 103.6 },
      { name: '腊子口', lat: 34.2, lng: 103.9 },
      { name: '吴起镇', lat: 36.9, lng: 108.2 },
      { name: '会宁', lat: 35.7, lng: 105.1 },
    ],
  },
];

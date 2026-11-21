// EXPORTS: IEmpire, EmpireCapital, EMPIRES, EMPIRE_ERA_SHORTCUTS
// 帝国/王朝/文明示意性疆域数据（历史概略，不追求现代国界精度）

import type { CivilizationKey } from './history';

export interface EmpireCapital {
  name: string;
  nameEn?: string;
  lat: number;
  lng: number;
}

export interface IEmpire {
  id: string;
  name: string; // 中文名
  nameEn?: string; // 英文名
  civilization: CivilizationKey; // 对应文明色
  startYear: number; // 起（公元前用负数）
  endYear: number; // 讫
  peakYear: number; // 极盛年
  capital: EmpireCapital;
  brief: string; // 一句极盛说明
  relatedNodeIds: string[]; // 关联历史节点，必须真实存在
  polygons: number[][][]; // 多个多边形，每个为 [lat, lng][] 顶点数组
}

// 简化多边形：核心领土 + 主要扩张范围的示意轮廓
// 顶点均为 [纬度, 经度] 格式（与 Leaflet LatLng 一致）
export const EMPIRES: IEmpire[] = [
  // ========== 古代 ==========
  {
    id: 'emp-egypt-new',
    name: '古埃及新王国',
    nameEn: 'New Kingdom of Egypt',
    civilization: 'africa',
    startYear: -1550,
    endYear: -1070,
    peakYear: -1279,
    capital: { name: '底比斯', nameEn: 'Thebes', lat: 25.7, lng: 32.6 },
    brief: '图特摩斯三世至拉美西斯二世时期，地跨西亚北非，版图达埃及历史巅峰。',
    relatedNodeIds: ['sumer'],
    polygons: [
      // 尼罗河谷 + 三角洲 + 黎凡特 + 努比亚
      [
        [31.5, 29.5], [30.5, 28], [30, 25], [29, 22], [27.5, 18],
        [25, 15], [22, 12], [20, 13], [18, 16], [16, 20],
        [14, 24], [15, 29], [17, 32], [20, 34], [24, 36],
        [27, 37], [30, 36], [31.5, 34], [32, 31], [31.5, 29.5],
      ],
    ],
  },
  {
    id: 'emp-akkad-babylon',
    name: '阿卡德·古巴比伦',
    nameEn: 'Akkad & Old Babylon',
    civilization: 'middleEast',
    startYear: -2334,
    endYear: -1595,
    peakYear: -1750,
    capital: { name: '巴比伦', nameEn: 'Babylon', lat: 32.5, lng: 44.4 },
    brief: '两河流域首个统一帝国，汉谟拉比时期臻于鼎盛，颁布最早成文法典。',
    relatedNodeIds: ['sumer-dawn', 'artifact-hammurabi'],
    polygons: [
      [
        [37, 39], [36, 40], [34, 41], [33, 43], [32.5, 46],
        [31, 48], [29.5, 47], [28, 45], [27, 43], [27, 40],
        [28, 37], [30, 36], [33, 35], [36, 36], [37, 39],
      ],
    ],
  },
  {
    id: 'emp-assyria',
    name: '亚述帝国',
    nameEn: 'Assyrian Empire',
    civilization: 'middleEast',
    startYear: -911,
    endYear: -612,
    peakYear: -669,
    capital: { name: '尼尼微', nameEn: 'Nineveh', lat: 36.3, lng: 43.1 },
    brief: '古代西亚军事强国，亚述巴尼拔时期疆域从埃及延伸至波斯湾。',
    relatedNodeIds: ['assyrian-empire'],
    polygons: [
      [
        [38, 32], [37, 34], [36, 36], [35, 39], [34, 42],
        [33, 45], [31, 48], [29, 49], [26, 48], [23, 45],
        [21, 41], [20, 37], [22, 33], [25, 30], [28, 28],
        [31, 28], [34, 30], [37, 31], [38, 32],
      ],
    ],
  },
  {
    id: 'emp-achaemenid',
    name: '阿契美尼德波斯',
    nameEn: 'Achaemenid Persia',
    civilization: 'middleEast',
    startYear: -550,
    endYear: -330,
    peakYear: -500,
    capital: { name: '波斯波利斯', nameEn: 'Persepolis', lat: 29.9, lng: 52.9 },
    brief: '居鲁士大帝建立，大流士一世时横跨欧亚非三大洲，世界史上首个世界性帝国。',
    relatedNodeIds: ['persian-empire'],
    polygons: [
      [
        [42, 27], [41, 30], [40, 33], [39, 38], [38, 43],
        [37, 48], [36, 54], [35, 60], [36, 66], [37, 69],
        [34, 72], [30, 70], [26, 65], [22, 58], [18, 52],
        [16, 46], [14, 40], [15, 35], [18, 32], [22, 29],
        [26, 27], [30, 26], [34, 26], [38, 26.5], [42, 27],
      ],
    ],
  },
  {
    id: 'emp-alexander',
    name: '亚历山大帝国',
    nameEn: 'Empire of Alexander',
    civilization: 'europe',
    startYear: -336,
    endYear: -323,
    peakYear: -326,
    capital: { name: '巴比伦', nameEn: 'Babylon', lat: 32.5, lng: 44.4 },
    brief: '亚历山大东征十年间建立的横跨欧亚非的庞大帝国，从希腊延伸至印度河。',
    relatedNodeIds: ['alexander-empire'],
    polygons: [
      [
        [42, 18], [41, 22], [40, 28], [39, 35], [38, 42],
        [37, 48], [36, 54], [35, 60], [34, 65], [33, 70],
        [30, 73], [26, 72], [22, 68], [18, 62], [15, 55],
        [14, 48], [15, 40], [18, 32], [22, 26], [28, 22],
        [33, 20], [37, 19], [40, 18.5], [42, 18],
      ],
    ],
  },
  {
    id: 'emp-maurya',
    name: '孔雀王朝',
    nameEn: 'Maurya Empire',
    civilization: 'southAsia',
    startYear: -322,
    endYear: -185,
    peakYear: -265,
    capital: { name: '华氏城', nameEn: 'Pataliputra', lat: 25.6, lng: 85.1 },
    brief: '阿育王时期基本统一印度次大陆，推崇佛教并向外传播。',
    relatedNodeIds: ['maurya-empire', 'person-ashoka'],
    polygons: [
      [
        [35, 72], [33, 74], [30, 76], [27, 78], [25, 81],
        [23, 85], [21, 89], [20, 92], [18, 93], [16, 92],
        [13, 88], [10, 82], [8, 78], [6, 76], [7, 73],
        [10, 70], [14, 68], [18, 68], [22, 69], [26, 69.5],
        [30, 70], [33, 71], [35, 72],
      ],
    ],
  },
  {
    id: 'emp-qin',
    name: '秦朝',
    nameEn: 'Qin Dynasty',
    civilization: 'china',
    startYear: -221,
    endYear: -207,
    peakYear: -221,
    capital: { name: '咸阳', nameEn: 'Xianyang', lat: 34.3, lng: 108.7 },
    brief: '秦始皇统一六国，建立中国历史上第一个中央集权大一统王朝。',
    relatedNodeIds: ['qin-unification', 'person-qinshihuang'],
    polygons: [
      [
        [41, 105], [40, 108], [38, 110], [37, 114], [36, 118],
        [34, 120], [32, 121], [30, 120], [28, 118], [25, 115],
        [23, 110], [22, 105], [23, 100], [25, 97], [28, 95],
        [31, 97], [34, 100], [37, 102], [40, 104], [41, 105],
      ],
    ],
  },
  {
    id: 'emp-western-han',
    name: '西汉',
    nameEn: 'Western Han',
    civilization: 'china',
    startYear: -202,
    endYear: 8,
    peakYear: -100,
    capital: { name: '长安', nameEn: 'Chang’an', lat: 34.3, lng: 108.9 },
    brief: '汉武帝时期北击匈奴、通西域，版图扩至西域都护府，丝绸之路开通。',
    relatedNodeIds: ['china-liu-bang', 'china-han-wudi', 'econ-silk-road'],
    polygons: [
      [
        [43, 75], [42, 85], [41, 92], [40, 100], [39, 108],
        [38, 115], [37, 120], [35, 123], [32, 124], [28, 122],
        [25, 118], [22, 113], [21, 108], [22, 102], [23, 97],
        [26, 93], [28, 90], [30, 88], [32, 86], [34, 85],
        [36, 82], [38, 78], [40, 76], [43, 75],
      ],
    ],
  },
  {
    id: 'emp-roman',
    name: '罗马帝国',
    nameEn: 'Roman Empire',
    civilization: 'europe',
    startYear: -27,
    endYear: 395,
    peakYear: 117,
    capital: { name: '罗马', nameEn: 'Rome', lat: 41.9, lng: 12.5 },
    brief: '图拉真时期疆域达极盛，环绕地中海，地跨欧亚非三洲。',
    relatedNodeIds: ['roman-republic', 'roman-empire'],
    polygons: [
      // 环绕地中海的帝国轮廓
      [
        [55, -5], [54, 2], [53, 8], [50, 12], [48, 15],
        [45, 20], [42, 25], [40, 28], [37, 32], [35, 36],
        [31, 40], [28, 42], [24, 39], [20, 33], [17, 28],
        [14, 22], [12, 14], [13, 5], [16, -2], [20, -6],
        [25, -8], [30, -6], [35, -3], [40, 0], [45, -1],
        [50, -3], [53, -4], [55, -5],
      ],
      // 不列颠岛
      [
        [55.5, -5], [55, -2], [53, 0], [51, 1], [50, -2],
        [51, -5], [53, -6], [55.5, -5],
      ],
    ],
  },
  {
    id: 'emp-eastern-han',
    name: '东汉',
    nameEn: 'Eastern Han',
    civilization: 'china',
    startYear: 25,
    endYear: 220,
    peakYear: 100,
    capital: { name: '洛阳', nameEn: 'Luoyang', lat: 34.6, lng: 112.4 },
    brief: '光武中兴，班超再通西域，疆域延续西汉规模，文化科技繁荣。',
    relatedNodeIds: ['event-guangwu-zhongxing', 'person-ban-chao', 'econ-silk-road'],
    polygons: [
      [
        [43, 75], [42, 85], [41, 92], [40, 100], [39, 108],
        [38, 115], [37, 120], [35, 123], [32, 124], [28, 122],
        [25, 118], [22, 113], [21, 108], [22, 102], [23, 97],
        [26, 93], [28, 90], [30, 88], [32, 86], [34, 85],
        [36, 82], [38, 78], [40, 76], [43, 75],
      ],
    ],
  },
  {
    id: 'emp-kushan',
    name: '贵霜帝国',
    nameEn: 'Kushan Empire',
    civilization: 'southAsia',
    startYear: 30,
    endYear: 375,
    peakYear: 127,
    capital: { name: '白沙瓦', nameEn: 'Peshawar', lat: 34.0, lng: 71.6 },
    brief: '迦腻色迦时期横跨中亚与北印度，丝绸之路枢纽，佛教犍陀罗艺术中心。',
    relatedNodeIds: ['kushan-empire'],
    polygons: [
      [
        [40, 62], [39, 65], [37, 68], [35, 71], [33, 74],
        [31, 76], [28, 77], [25, 76], [22, 73], [20, 68],
        [21, 63], [24, 58], [28, 55], [32, 54], [36, 56],
        [39, 59], [40, 62],
      ],
    ],
  },
  {
    id: 'emp-parthia',
    name: '安息帕提亚',
    nameEn: 'Parthia (Arsacid)',
    civilization: 'middleEast',
    startYear: -247,
    endYear: 224,
    peakYear: 95,
    capital: { name: '泰西封', nameEn: 'Ctesiphon', lat: 33.1, lng: 45.6 },
    brief: '帕提亚王国长期与罗马帝国对峙，控制两河流域与伊朗高原，是丝绸之路西段枢纽。',
    relatedNodeIds: ['event-parthia-empire'],
    polygons: [
      [
        [40, 40], [39, 44], [38, 48], [37, 52], [36, 56],
        [35, 60], [34, 62], [32, 63], [29, 62], [26, 59],
        [23, 55], [20, 50], [18, 45], [17, 40], [18, 36],
        [22, 32], [26, 30], [30, 30], [34, 32], [37, 36],
        [40, 40],
      ],
    ],
  },

  // ========== 中古 ==========
  {
    id: 'emp-byzantine',
    name: '拜占庭帝国',
    nameEn: 'Byzantine Empire',
    civilization: 'europe',
    startYear: 395,
    endYear: 1453,
    peakYear: 555,
    capital: { name: '君士坦丁堡', nameEn: 'Constantinople', lat: 41.0, lng: 29.0 },
    brief: '查士丁尼大帝时期收复意大利大部与北非，地中海几乎再度成为内湖。',
    relatedNodeIds: ['rome-justinian-reconquest'],
    polygons: [
      [
        [48, 20], [46, 24], [44, 28], [42, 32], [40, 35],
        [38, 37], [36, 36], [34, 34], [32, 32], [30, 28],
        [28, 22], [26, 14], [24, 10], [22, 8], [20, 10],
        [20, 14], [22, 18], [26, 20], [30, 20], [35, 18],
        [40, 14], [44, 12], [46, 15], [48, 20],
      ],
    ],
  },
  {
    id: 'emp-sassanid',
    name: '萨珊波斯',
    nameEn: 'Sasanian Persia',
    civilization: 'middleEast',
    startYear: 224,
    endYear: 651,
    peakYear: 620,
    capital: { name: '泰西封', nameEn: 'Ctesiphon', lat: 33.1, lng: 45.6 },
    brief: '萨珊王朝是波斯第二帝国，与拜占庭长期争霸，疆域从美索不达米亚延伸至中亚。',
    relatedNodeIds: ['kushan-empire'],
    polygons: [
      [
        [42, 38], [41, 42], [40, 48], [39, 54], [38, 60],
        [37, 64], [35, 68], [32, 70], [29, 68], [26, 64],
        [23, 58], [20, 50], [18, 44], [18, 38], [20, 32],
        [24, 28], [28, 25], [32, 24], [36, 26], [39, 30],
        [42, 38],
      ],
    ],
  },
  {
    id: 'emp-tang',
    name: '唐朝',
    nameEn: 'Tang Dynasty',
    civilization: 'china',
    startYear: 618,
    endYear: 907,
    peakYear: 669,
    capital: { name: '长安', nameEn: 'Chang’an', lat: 34.3, lng: 108.9 },
    brief: '唐高宗时期疆域达极盛，东至朝鲜、西达中亚咸海，设安西、北庭都护府。',
    relatedNodeIds: ['tang-dynasty', 'event-zhenguan', 'an-shi-rebellion'],
    polygons: [
      [
        [50, 50], [49, 60], [47, 70], [45, 80], [44, 90],
        [43, 100], [42, 110], [41, 120], [40, 128], [38, 132],
        [35, 135], [30, 133], [25, 128], [22, 120], [21, 110],
        [22, 100], [23, 90], [26, 82], [28, 75], [30, 70],
        [32, 65], [35, 60], [38, 55], [42, 52], [45, 51],
        [50, 50],
      ],
    ],
  },
  {
    id: 'emp-umayyad',
    name: '阿拉伯帝国（倭马亚）',
    nameEn: 'Umayyad Caliphate',
    civilization: 'middleEast',
    startYear: 661,
    endYear: 750,
    peakYear: 730,
    capital: { name: '大马士革', nameEn: 'Damascus', lat: 33.5, lng: 36.3 },
    brief: '倭马亚王朝疆域横跨欧亚非三大洲，西起伊比利亚、东至中亚，是历史上最大的帝国之一。',
    relatedNodeIds: ['islamic-conquest'],
    polygons: [
      // 从伊比利亚到中亚的广阔疆域（简化为一条连续带）
      [
        [42, -8], [41, -2], [39, 4], [37, 10], [35, 16],
        [33, 22], [31, 28], [28, 32], [25, 36], [22, 40],
        [20, 44], [18, 48], [17, 52], [18, 56], [20, 60],
        [22, 64], [24, 68], [27, 72], [30, 74], [33, 72],
        [36, 68], [38, 62], [39, 56], [40, 50], [41, 44],
        [41, 38], [40, 32], [38, 26], [36, 20], [34, 14],
        [33, 8], [34, 2], [36, -4], [38, -6], [40, -7],
        [42, -8],
      ],
      // 伊比利亚半岛
      [
        [43.5, -9], [42, -9.5], [40, -9], [37, -7], [35, -5],
        [36, -2], [38, 0], [41, 2], [43, 1], [43.5, -9],
      ],
    ],
  },
  {
    id: 'emp-carolingian',
    name: '查理曼帝国',
    nameEn: 'Carolingian Empire',
    civilization: 'europe',
    startYear: 768,
    endYear: 888,
    peakYear: 814,
    capital: { name: '亚琛', nameEn: 'Aachen', lat: 50.8, lng: 6.1 },
    brief: '查理曼大帝统一西欧大部，800年加冕为罗马人的皇帝，奠定法德意三国基础。',
    relatedNodeIds: ['carolingian-empire', 'person-charlemagne'],
    polygons: [
      [
        [55, -2], [54, 4], [53, 8], [52, 12], [50, 14],
        [48, 16], [46, 16], [44, 14], [42, 10], [40, 5],
        [41, 0], [43, -2], [46, -3], [49, -3], [52, -2.5],
        [55, -2],
      ],
    ],
  },
  {
    id: 'emp-song',
    name: '宋朝（两宋）',
    nameEn: 'Song Dynasty',
    civilization: 'china',
    startYear: 960,
    endYear: 1279,
    peakYear: 1100,
    capital: { name: '开封/临安', nameEn: 'Kaifeng / Lin’an', lat: 34.8, lng: 114.3 },
    brief: '两宋经济文化高度发达，商业与科技领先世界，疆域以中原和江南为核心。',
    relatedNodeIds: ['song-dynasty'],
    polygons: [
      [
        [40, 100], [39, 105], [38, 110], [37, 116], [36, 120],
        [34, 122], [31, 122], [28, 120], [25, 116], [23, 110],
        [22, 105], [23, 100], [25, 96], [28, 94], [31, 95],
        [34, 97], [37, 99], [40, 100],
      ],
    ],
  },
  {
    id: 'emp-abbasid',
    name: '阿拔斯哈里发国',
    nameEn: 'Abbasid Caliphate',
    civilization: 'middleEast',
    startYear: 750,
    endYear: 1258,
    peakYear: 850,
    capital: { name: '巴格达', nameEn: 'Baghdad', lat: 33.3, lng: 44.4 },
    brief: '阿拔斯王朝是伊斯兰黄金时代的核心，巴格达是当时世界最大城市之一，学术翻译与科学繁荣。',
    relatedNodeIds: ['abbasid-baghdad', 'islamic-conquest'],
    polygons: [
      [
        [36, 42], [35, 45], [34, 48], [32, 50], [30, 52],
        [28, 54], [26, 56], [24, 58], [22, 60], [20, 62],
        [18, 63], [16, 62], [15, 58], [16, 52], [18, 48],
        [22, 44], [26, 42], [30, 40], [33, 40], [36, 42],
      ],
    ],
  },
  {
    id: 'emp-mongol',
    name: '蒙古帝国',
    nameEn: 'Mongol Empire',
    civilization: 'centralAsia',
    startYear: 1206,
    endYear: 1368,
    peakYear: 1279,
    capital: { name: '哈拉和林', nameEn: 'Karakorum', lat: 47.3, lng: 102.7 },
    brief: '人类历史上疆域最大的陆上帝国，从东海延伸至多瑙河畔，四大汗国横跨欧亚。',
    relatedNodeIds: ['mongol-empire'],
    polygons: [
      // 大汗汗国 + 四大汗国概略
      [
        [55, 20], [53, 30], [50, 40], [48, 50], [46, 60],
        [45, 70], [44, 80], [43, 90], [44, 100], [45, 110],
        [46, 120], [45, 130], [42, 140], [38, 143], [33, 140],
        [28, 130], [25, 120], [23, 110], [22, 100], [23, 90],
        [26, 80], [28, 70], [30, 60], [32, 50], [35, 42],
        [40, 32], [44, 24], [48, 20], [51, 19], [55, 20],
      ],
    ],
  },
  {
    id: 'emp-yuan',
    name: '元朝',
    nameEn: 'Yuan Dynasty',
    civilization: 'china',
    startYear: 1271,
    endYear: 1368,
    peakYear: 1330,
    capital: { name: '大都', nameEn: 'Dadu (Khanbaliq)', lat: 39.9, lng: 116.4 },
    brief: '忽必烈建立元朝，统一中国，行省制度影响深远，海陆贸易繁荣。',
    relatedNodeIds: ['yuan-dynasty'],
    polygons: [
      [
        [53, 75], [52, 85], [51, 95], [50, 105], [49, 115],
        [48, 125], [46, 135], [43, 142], [38, 143], [33, 140],
        [28, 130], [25, 120], [22, 110], [21, 102], [22, 96],
        [26, 88], [30, 80], [34, 75], [38, 73], [42, 72],
        [46, 72], [50, 73], [53, 75],
      ],
    ],
  },
  {
    id: 'emp-ming',
    name: '明朝',
    nameEn: 'Ming Dynasty',
    civilization: 'china',
    startYear: 1368,
    endYear: 1644,
    peakYear: 1424,
    capital: { name: '北京', nameEn: 'Beijing', lat: 39.9, lng: 116.4 },
    brief: '永乐时期疆域达盛，郑和下西洋扬威海外，长城与紫禁城奠定后世格局。',
    relatedNodeIds: ['event-jingnan-move-capital', 'event-zhenghe'],
    polygons: [
      [
        [46, 100], [45, 105], [44, 110], [43, 118], [42, 124],
        [40, 128], [36, 130], [30, 128], [25, 122], [22, 114],
        [21, 108], [22, 102], [23, 98], [26, 94], [28, 92],
        [31, 92], [34, 95], [38, 98], [42, 99], [46, 100],
      ],
    ],
  },
  {
    id: 'emp-ottoman',
    name: '奥斯曼帝国',
    nameEn: 'Ottoman Empire',
    civilization: 'middleEast',
    startYear: 1299,
    endYear: 1922,
    peakYear: 1566,
    capital: { name: '伊斯坦布尔', nameEn: 'Istanbul', lat: 41.0, lng: 29.0 },
    brief: '苏莱曼大帝时期地跨欧亚非三洲，控制地中海东部与黑海通道。',
    relatedNodeIds: ['ottoman-empire', 'constantinople-fall'],
    polygons: [
      [
        [48, 14], [47, 20], [45, 26], [43, 30], [41, 34],
        [39, 38], [37, 40], [34, 42], [31, 40], [28, 36],
        [25, 32], [22, 26], [20, 20], [20, 14], [22, 8],
        [26, 5], [30, 4], [34, 5], [38, 8], [42, 10],
        [45, 12], [48, 14],
      ],
      // 北非沿岸
      [
        [37, -1], [35, 2], [32, 8], [28, 12], [24, 14],
        [22, 12], [23, 8], [26, 4], [30, 2], [33, 1],
        [37, -1],
      ],
    ],
  },
  {
    id: 'emp-safavid',
    name: '萨法维波斯',
    nameEn: 'Safavid Persia',
    civilization: 'middleEast',
    startYear: 1501,
    endYear: 1736,
    peakYear: 1587,
    capital: { name: '伊斯法罕', nameEn: 'Isfahan', lat: 32.7, lng: 51.7 },
    brief: '萨法维王朝与奥斯曼东西并立，阿拔斯大帝时期经济文化繁荣，伊斯兰什叶派中心。',
    relatedNodeIds: ['safavid-persia'],
    polygons: [
      [
        [40, 44], [39, 48], [38, 54], [37, 60], [36, 64],
        [34, 68], [31, 70], [28, 68], [25, 64], [22, 58],
        [20, 52], [18, 46], [18, 40], [20, 35], [24, 30],
        [28, 28], [32, 27], [36, 29], [39, 36], [40, 44],
      ],
    ],
  },
  {
    id: 'emp-mughal',
    name: '莫卧儿帝国',
    nameEn: 'Mughal Empire',
    civilization: 'southAsia',
    startYear: 1526,
    endYear: 1857,
    peakYear: 1700,
    capital: { name: '德里', nameEn: 'Delhi', lat: 28.6, lng: 77.2 },
    brief: '奥朗则布时期疆域达极盛，几乎统一整个印度次大陆，建筑与艺术成就辉煌。',
    relatedNodeIds: ['mughal-empire', 'akbar-religious-synthesis', 'aurangzeb-decline'],
    polygons: [
      [
        [37, 68], [35, 70], [33, 72], [30, 74], [27, 76],
        [24, 78], [22, 82], [20, 86], [18, 89], [15, 90],
        [12, 86], [8, 80], [6, 76], [7, 72], [10, 68],
        [14, 66], [18, 65], [22, 65], [26, 66], [30, 66.5],
        [33, 67], [37, 68],
      ],
    ],
  },
  {
    id: 'emp-inka',
    name: '印加帝国',
    nameEn: 'Inca Empire',
    civilization: 'america',
    startYear: 1438,
    endYear: 1533,
    peakYear: 1527,
    capital: { name: '库斯科', nameEn: 'Cusco', lat: -13.5, lng: -71.9 },
    brief: '安第斯山脉的黄金帝国，沿太平洋沿岸从厄瓜多尔延伸至智利中部。',
    relatedNodeIds: ['inca-empire'],
    polygons: [
      [
        [2, -78], [0, -78], [-3, -77], [-6, -76], [-9, -75],
        [-12, -75], [-15, -73], [-18, -71], [-22, -70], [-25, -70],
        [-28, -71], [-33, -72], [-35, -71], [-33, -68], [-28, -65],
        [-22, -63], [-16, -62], [-10, -62], [-5, -65], [0, -68],
        [2, -72], [2, -78],
      ],
    ],
  },
  {
    id: 'emp-aztec',
    name: '阿兹特克帝国',
    nameEn: 'Aztec Empire',
    civilization: 'america',
    startYear: 1428,
    endYear: 1521,
    peakYear: 1500,
    capital: { name: '特诺奇蒂特兰', nameEn: 'Tenochtitlan', lat: 19.4, lng: -99.1 },
    brief: '中美洲霸主，以墨西哥谷地为中心，宗教与军事文明高度发达。',
    relatedNodeIds: ['aztec-empire'],
    polygons: [
      [
        [24, -100], [23, -98], [21, -96], [19, -95], [17, -94],
        [15, -93], [14, -96], [15, -99], [17, -102], [20, -103],
        [23, -102], [24, -100],
      ],
    ],
  },

  // ========== 近代 ==========
  {
    id: 'emp-spanish',
    name: '西班牙帝国',
    nameEn: 'Spanish Empire',
    civilization: 'europe',
    startYear: 1492,
    endYear: 1898,
    peakYear: 1600,
    capital: { name: '马德里', nameEn: 'Madrid', lat: 40.4, lng: -3.7 },
    brief: '首个日不落帝国，美洲大片殖民地 + 菲律宾 + 尼德兰 + 南意大利，黄金时代。',
    relatedNodeIds: ['spanish-empire', 'columbus'],
    polygons: [
      // 伊比利亚本土
      [
        [43.5, -9], [42, -9.5], [40, -9], [37, -7], [36, -5],
        [37, -2], [40, 0], [42, 1], [43, 0.5], [43.5, -9],
      ],
      // 中美洲
      [
        [24, -107], [22, -105], [20, -102], [17, -100], [15, -97],
        [14, -94], [13, -92], [10, -88], [8, -83], [9, -80],
        [12, -77], [15, -75], [18, -73], [20, -75], [22, -78],
        [24, -82], [25, -88], [25, -95], [24, -107],
      ],
      // 南美洲（简化轮廓）
      [
        [12, -72], [8, -74], [4, -76], [0, -78], [-5, -78],
        [-10, -76], [-15, -72], [-20, -68], [-25, -65], [-30, -65],
        [-35, -64], [-38, -62], [-40, -58], [-38, -52], [-33, -48],
        [-28, -46], [-22, -42], [-15, -38], [-8, -35], [0, -34],
        [5, -36], [10, -42], [12, -50], [11, -60], [12, -72],
      ],
      // 菲律宾
      [
        [19, 117], [17, 119], [14, 121], [10, 123], [6, 125],
        [5, 127], [7, 128], [11, 126], [15, 124], [18, 122],
        [19, 120], [19, 117],
      ],
    ],
  },
  {
    id: 'emp-portuguese',
    name: '葡萄牙殖民帝国',
    nameEn: 'Portuguese Empire',
    civilization: 'europe',
    startYear: 1415,
    endYear: 1999,
    peakYear: 1550,
    capital: { name: '里斯本', nameEn: 'Lisbon', lat: 38.7, lng: -9.1 },
    brief: '大航海时代先驱，拥有巴西、莫桑比克、安哥拉、果阿、澳门等海外领地。',
    relatedNodeIds: ['da-gama', 'magellan'],
    polygons: [
      // 葡萄牙本土
      [
        [42, -8.8], [40, -8.5], [38, -8], [37, -7.5], [37, -8.5],
        [38, -9], [40, -9.2], [42, -8.8],
      ],
      // 巴西
      [
        [4, -52], [2, -54], [-2, -56], [-6, -56], [-10, -55],
        [-14, -52], [-18, -48], [-22, -43], [-25, -38], [-28, -33],
        [-30, -30], [-32, -26], [-34, -20], [-33, -16], [-28, -12],
        [-22, -10], [-15, -9], [-8, -10], [-3, -12], [0, -20],
        [2, -30], [4, -40], [4, -52],
      ],
    ],
  },
  {
    id: 'emp-dutch',
    name: '荷兰海上帝国',
    nameEn: 'Dutch Maritime Empire',
    civilization: 'europe',
    startYear: 1581,
    endYear: 1975,
    peakYear: 1650,
    capital: { name: '阿姆斯特丹', nameEn: 'Amsterdam', lat: 52.4, lng: 4.9 },
    brief: '17世纪海上马车夫，拥有东印度公司，控制马六甲、好望角、新尼德兰等。',
    relatedNodeIds: ['dutch-revolt', 'economy-dutch-finance'],
    polygons: [
      // 尼德兰本土（小，简化）
      [
        [53.5, 3], [52, 3.5], [51, 4], [50.5, 5], [51.5, 7],
        [53, 6.5], [53.5, 3],
      ],
      // 印度尼西亚群岛（简化）
      [
        [-2, 96], [-5, 100], [-7, 105], [-8, 110], [-7, 115],
        [-5, 120], [-3, 125], [0, 128], [3, 125], [5, 120],
        [4, 112], [2, 106], [0, 100], [-2, 96],
      ],
    ],
  },
  {
    id: 'emp-napoleonic',
    name: '法兰西第一帝国',
    nameEn: 'First French Empire',
    civilization: 'europe',
    startYear: 1804,
    endYear: 1815,
    peakYear: 1812,
    capital: { name: '巴黎', nameEn: 'Paris', lat: 48.9, lng: 2.3 },
    brief: '拿破仑极盛时期几乎控制整个西欧，法军东征莫斯科，法国影响力达顶峰。',
    relatedNodeIds: ['napoleon', 'war-napoleonic'],
    polygons: [
      [
        [55, -1], [53, 2], [52, 6], [51, 10], [50, 14],
        [48, 18], [45, 20], [42, 18], [40, 14], [38, 8],
        [37, 2], [38, -2], [42, -4], [46, -3], [49, -2],
        [52, -1], [55, -1],
      ],
    ],
  },
  {
    id: 'emp-british',
    name: '大英帝国',
    nameEn: 'British Empire',
    civilization: 'europe',
    startYear: 1583,
    endYear: 1997,
    peakYear: 1920,
    capital: { name: '伦敦', nameEn: 'London', lat: 51.5, lng: -0.1 },
    brief: '历史上最大的日不落帝国，殖民地遍布全球，维多利亚时代疆域达3367万平方公里。',
    relatedNodeIds: ['british-empire', 'industrial-revolution'],
    polygons: [
      // 不列颠
      [
        [59, -4], [58, -2], [56, 0], [54, 1], [52, 1.5],
        [51, -1], [50, -3], [50, -5.5], [52, -6], [55, -6],
        [57, -5.5], [59, -4],
      ],
      // 印度
      [
        [35, 68], [33, 70], [30, 72], [27, 74], [24, 76],
        [21, 80], [18, 84], [15, 88], [12, 82], [8, 78],
        [7, 74], [9, 70], [14, 66], [20, 64], [26, 64],
        [31, 66], [35, 68],
      ],
      // 加拿大（简化北部边界）
      [
        [70, -140], [68, -120], [66, -100], [64, -80], [60, -60],
        [55, -55], [50, -60], [48, -68], [49, -80], [50, -95],
        [52, -110], [55, -125], [60, -135], [65, -140], [70, -140],
      ],
      // 澳大利亚
      [
        [-12, 113], [-18, 115], [-23, 114], [-30, 116], [-34, 120],
        [-38, 125], [-39, 130], [-37, 138], [-33, 143], [-28, 146],
        [-20, 143], [-15, 138], [-12, 130], [-11, 122], [-12, 113],
      ],
      // 南非
      [
        [-22, 14], [-28, 14], [-33, 17], [-35, 20], [-34, 25],
        [-30, 30], [-25, 32], [-22, 30], [-20, 24], [-22, 14],
      ],
      // 埃及（苏伊士运河区，简化）
      [
        [32, 25], [30, 25], [28, 26], [25, 28], [22, 30],
        [22, 34], [25, 36], [28, 35], [31, 33], [32, 30],
        [32, 25],
      ],
    ],
  },
  {
    id: 'emp-qing',
    name: '清朝',
    nameEn: 'Qing Dynasty',
    civilization: 'china',
    startYear: 1644,
    endYear: 1912,
    peakYear: 1760,
    capital: { name: '北京', nameEn: 'Beijing', lat: 39.9, lng: 116.4 },
    brief: '乾隆时期疆域达极盛，西跨葱岭、东接太平洋、北至西伯利亚、南包南海诸岛。',
    relatedNodeIds: ['qing-dynasty'],
    polygons: [
      [
        [54, 70], [53, 80], [52, 90], [51, 100], [50, 110],
        [49, 120], [48, 130], [46, 135], [44, 138], [40, 138],
        [35, 135], [30, 130], [22, 120], [21, 110], [22, 102],
        [23, 95], [21, 88], [22, 80], [25, 72], [28, 65],
        [32, 58], [36, 52], [40, 48], [44, 48], [48, 50],
        [52, 55], [54, 62], [54, 70],
      ],
    ],
  },
  {
    id: 'emp-russian',
    name: '俄罗斯帝国',
    nameEn: 'Russian Empire',
    civilization: 'europe',
    startYear: 1721,
    endYear: 1917,
    peakYear: 1900,
    capital: { name: '圣彼得堡', nameEn: 'Saint Petersburg', lat: 59.9, lng: 30.3 },
    brief: '从波罗的海延伸至太平洋，横跨欧亚，世界历史上连续领土面积最大的国家之一。',
    relatedNodeIds: ['russian-empire', 'peter-the-great-reform'],
    polygons: [
      [
        [70, 20], [68, 30], [66, 40], [65, 50], [64, 60],
        [62, 70], [60, 80], [58, 90], [56, 100], [55, 110],
        [54, 120], [55, 130], [56, 140], [58, 150], [60, 160],
        [62, 170], [65, -170], [67, -160], [68, -150], [69, -140],
        [70, -130], [70, -120], [68, -110], [66, -100], [64, -90],
        [62, -80], [60, -70], [58, -60], [56, -50], [55, -40],
        [54, -30], [55, -20], [57, -10], [59, 0], [62, 10],
        [65, 15], [68, 18], [70, 20],
      ],
    ],
  },
  {
    id: 'emp-german-2nd',
    name: '德意志第二帝国',
    nameEn: 'German Empire (Second Reich)',
    civilization: 'europe',
    startYear: 1871,
    endYear: 1918,
    peakYear: 1900,
    capital: { name: '柏林', nameEn: 'Berlin', lat: 52.5, lng: 13.4 },
    brief: '俾斯麦统一德意志，工业与军事迅速崛起，一战前成为欧洲第二大强国。',
    relatedNodeIds: ['german-unification', 'person-bismarck', 'ww1-western-front'],
    polygons: [
      [
        [55, 6], [54, 8], [53, 10], [52, 12], [51, 14],
        [50, 15], [49, 14], [48, 12], [47.5, 10], [47.5, 8],
        [48, 6], [50, 5], [52, 5], [54, 5.5], [55, 6],
      ],
    ],
  },

  // ========== 现代 ==========
  {
    id: 'emp-soviet',
    name: '苏联',
    nameEn: 'Soviet Union',
    civilization: 'europe',
    startYear: 1922,
    endYear: 1991,
    peakYear: 1975,
    capital: { name: '莫斯科', nameEn: 'Moscow', lat: 55.8, lng: 37.6 },
    brief: '冷战时期超级大国，疆域横跨欧亚大陆，与美国形成两极格局。',
    relatedNodeIds: ['october-revolution', 'event-soviet-industrialization', 'cold-war'],
    polygons: [
      [
        [68, 20], [66, 30], [64, 40], [62, 50], [60, 60],
        [58, 70], [56, 80], [54, 90], [53, 100], [52, 110],
        [51, 120], [52, 130], [54, 140], [56, 150], [58, 160],
        [60, 170], [62, -170], [64, -160], [66, -150], [68, -140],
        [70, -130], [70, -120], [68, -110], [66, -100], [64, -90],
        [62, -80], [60, -70], [58, -60], [56, -50], [54, -40],
        [52, -30], [50, -20], [48, -10], [46, 0], [45, 10],
        [48, 18], [52, 20], [56, 22], [60, 20], [64, 18],
        [68, 20],
      ],
    ],
  },
  {
    id: 'emp-usa-20c',
    name: '美国（20世纪）',
    nameEn: 'United States (20th century)',
    civilization: 'america',
    startYear: 1898,
    endYear: 2026,
    peakYear: 2000,
    capital: { name: '华盛顿', nameEn: 'Washington', lat: 38.9, lng: -77.0 },
    brief: '20世纪崛起为超级大国，二战后主导全球秩序，冷战后成为唯一超级大国。',
    relatedNodeIds: ['ww2-pearl-harbor', 'cold-war'],
    polygons: [
      // 本土 48 州
      [
        [49, -125], [48, -120], [47, -115], [46, -110], [45, -105],
        [45, -100], [44, -95], [43, -90], [42, -85], [41, -80],
        [40, -75], [38, -72], [35, -76], [32, -80], [30, -82],
        [28, -82], [25, -80], [26, -85], [29, -90], [31, -95],
        [32, -100], [33, -105], [34, -110], [35, -115], [36, -119],
        [38, -123], [40, -125], [43, -125], [46, -125], [49, -125],
      ],
      // 阿拉斯加
      [
        [71, -170], [68, -165], [65, -160], [62, -155], [60, -150],
        [55, -145], [54, -140], [56, -135], [58, -130], [60, -130],
        [62, -135], [65, -140], [68, -145], [70, -150], [71, -170],
      ],
      // 夏威夷
      [
        [22.3, -159], [22, -156], [21, -157], [20.5, -156], [20, -155.5],
        [19, -155.5], [18.5, -156], [18.8, -157], [19.5, -158], [20.5, -159],
        [21.5, -160], [22.3, -159],
      ],
    ],
  },
];

// 时代快进快捷键（用 ERAS 的对应时代起点）
export const EMPIRE_ERA_SHORTCUTS: { id: string; name: string; year: number }[] = [
  { id: 'bronze', name: '青铜时代', year: -2000 },
  { id: 'axial', name: '轴心时代', year: -500 },
  { id: 'rome-han', name: '汉与罗马', year: 1 },
  { id: 'golden-age', name: '唐朝盛世', year: 750 },
  { id: 'mongol', name: '蒙古扩张', year: 1250 },
  { id: 'exploration', name: '大航海时代', year: 1550 },
  { id: 'imperialism', name: '帝国时代', year: 1850 },
  { id: 'coldwar', name: '冷战两极', year: 1960 },
];

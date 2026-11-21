// AUTO-GENERATED FILE — 不要手动编辑
// 由 scripts/generate-body-shards.mts 生成
// 索引层：首屏加载，不含 description 正文，含 shardKey 用于定位正文分片
// EXPORTS: IEra, IHistoryNodeIndex, ERAS, HISTORY_NODES_INDEX, ALL_HISTORY_NODES_INDEX, CIVILIZATIONS, CATEGORIES, CIVILIZATION_COLORS, ERA_IDS

import type { IHistoryNode, CivilizationKey, CategoryKey, HistoryNodeType, IEra } from './history';

export interface IHistoryNodeIndex extends IHistoryNode {
  /** 是否有正文 */
  hasBody?: boolean;
  /** 正文分片 key，用于定位 bodies/shards/<shardKey>.ts */
  shardKey?: string;
}

export type { CivilizationKey, CategoryKey, HistoryNodeType, IEra };

export const ERA_IDS: string[] = ["prehistoric","ancient","classical","medieval","earlyModern","industrial","modern"];

export const ERAS: IEra[] = [
  {
    "id": "prehistoric",
    "name": "史前时代",
    "nameEn": "Prehistoric",
    "startYear": -3000000,
    "endYear": -4000,
    "description": "从人类起源到文明曙光，包括旧石器时代、新石器时代和铜石并用时代。",
    "bgFrom": "#2a1f15",
    "bgTo": "#1a1410",
    "accent": "#8b7355"
  },
  {
    "id": "ancient",
    "name": "古代文明",
    "nameEn": "Ancient Civilizations",
    "startYear": -4000,
    "endYear": -500,
    "description": "人类最早的文明诞生于两河流域、尼罗河流域、印度河流域和黄河流域。",
    "bgFrom": "#3d3020",
    "bgTo": "#2a2015",
    "accent": "#d4a843"
  },
  {
    "id": "classical",
    "name": "古典时代",
    "nameEn": "Classical Era",
    "startYear": -500,
    "endYear": 500,
    "description": "希腊罗马的辉煌与中华帝国的崛起，东西方文明交相辉映。",
    "bgFrom": "#1a2a3a",
    "bgTo": "#151f2a",
    "accent": "#5a8fa8"
  },
  {
    "id": "medieval",
    "name": "中世纪",
    "nameEn": "Medieval",
    "startYear": 500,
    "endYear": 1500,
    "description": "欧洲的黑暗时期与伊斯兰黄金时代，唐宋文明的鼎盛与蒙古帝国的狂飙。",
    "bgFrom": "#1a1a24",
    "bgTo": "#15151c",
    "accent": "#6b5b7a"
  },
  {
    "id": "earlyModern",
    "name": "大航海与近代",
    "nameEn": "Early Modern",
    "startYear": 1500,
    "endYear": 1800,
    "description": "地理大发现、文艺复兴、宗教改革、科学革命与启蒙运动。",
    "bgFrom": "#0f1e35",
    "bgTo": "#0a1525",
    "accent": "#4a7ab8"
  },
  {
    "id": "industrial",
    "name": "工业时代",
    "nameEn": "Industrial Era",
    "startYear": 1800,
    "endYear": 1945,
    "description": "蒸汽机的轰鸣改变世界，两次世界大战重塑全球格局。",
    "bgFrom": "#252528",
    "bgTo": "#1a1a1c",
    "accent": "#888888"
  },
  {
    "id": "modern",
    "name": "现代",
    "nameEn": "Modern",
    "startYear": 1945,
    "endYear": 2026,
    "description": "冷战、太空竞赛、信息革命与AI时代的开启。",
    "bgFrom": "#0a0e1a",
    "bgTo": "#050810",
    "accent": "#3b82f6"
  }
];

export const CIVILIZATIONS: Record<CivilizationKey, { name: string; nameEn: string; color: string }> = {
  "china": {
    "name": "中国",
    "nameEn": "China",
    "color": "#c0392b"
  },
  "europe": {
    "name": "欧洲",
    "nameEn": "Europe",
    "color": "#2c3e80"
  },
  "middleEast": {
    "name": "中东",
    "nameEn": "Middle East",
    "color": "#d4a843"
  },
  "southAsia": {
    "name": "南亚",
    "nameEn": "South Asia",
    "color": "#e67e22"
  },
  "eastAsia": {
    "name": "东亚其他",
    "nameEn": "East Asia",
    "color": "#16a085"
  },
  "america": {
    "name": "美洲",
    "nameEn": "Americas",
    "color": "#27ae60"
  },
  "africa": {
    "name": "非洲",
    "nameEn": "Africa",
    "color": "#a0522d"
  },
  "centralAsia": {
    "name": "中亚",
    "nameEn": "Central Asia",
    "color": "#c0793a"
  },
  "oceania": {
    "name": "大洋洲",
    "nameEn": "Oceania",
    "color": "#2980b9"
  },
  "global": {
    "name": "全球",
    "nameEn": "Global",
    "color": "#9b59b6"
  }
};

export const CATEGORIES: Record<CategoryKey, { name: string; nameEn: string; icon: string }> = {
  "politics": {
    "name": "政治",
    "nameEn": "Politics",
    "icon": ""
  },
  "military": {
    "name": "军事",
    "nameEn": "Military",
    "icon": ""
  },
  "science": {
    "name": "科技",
    "nameEn": "Science & Tech",
    "icon": ""
  },
  "culture": {
    "name": "文化",
    "nameEn": "Culture",
    "icon": ""
  },
  "myth": {
    "name": "神话",
    "nameEn": "Mythology",
    "icon": ""
  },
  "artifact": {
    "name": "文物",
    "nameEn": "Artifact",
    "icon": ""
  }
};

export const CIVILIZATION_COLORS: Record<CivilizationKey, string> = {
  "china": "#c0392b",
  "europe": "#2c3e80",
  "middleEast": "#d4a843",
  "southAsia": "#e67e22",
  "eastAsia": "#16a085",
  "america": "#27ae60",
  "africa": "#a0522d",
  "centralAsia": "#c0793a",
  "oceania": "#2980b9",
  "global": "#9b59b6"
};

// 已排序的节点（用于时间轴等需要有序展示的场景）
export const HISTORY_NODES_INDEX: IHistoryNodeIndex[] = [
  {
    "id": "australopithecus",
    "title": "南方古猿出现",
    "year": -3000000,
    "yearDisplay": "约300万年前",
    "civilization": "africa",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 9,
      "lng": 35
    },
    "summary": "人类演化的开端，最早的人科动物出现在非洲东部。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "homo-habilis",
      "homo-erectus"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "homo-habilis",
    "title": "能人出现，石器时代开端",
    "year": -2500000,
    "yearDisplay": "约250万年前",
    "civilization": "africa",
    "categories": [
      "science",
      "artifact"
    ],
    "type": "artifact",
    "eraId": "prehistoric",
    "location": {
      "lat": -2,
      "lng": 37
    },
    "summary": "能人开始制造石器工具，旧石器时代正式开始。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "australopithecus",
      "homo-erectus"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "homo-erectus",
    "title": "直立人与火的使用",
    "year": -1700000,
    "yearDisplay": "约170万年前",
    "civilization": "africa",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 39.9,
      "lng": 116
    },
    "summary": "直立人学会使用火，开始走出非洲，北京人、元谋人是其东亚代表。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "homo-habilis",
      "homo-sapiens"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "homo-sapiens",
    "title": "智人出现，尼安德特人共存",
    "year": -300000,
    "yearDisplay": "约30万年前",
    "civilization": "africa",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 32,
      "lng": 7
    },
    "summary": "智人在非洲出现，与尼安德特人等古人类长期共存。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "homo-erectus",
      "out-of-africa"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "out-of-africa",
    "title": "智人走出非洲与认知革命",
    "year": -70000,
    "yearDisplay": "约7万年前",
    "civilization": "africa",
    "categories": [
      "science",
      "culture"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 13,
      "lng": 43
    },
    "summary": "智人走出非洲，认知革命使人类获得虚构故事的能力。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "homo-sapiens",
      "ice-age-end"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "ice-age-end",
    "title": "末次冰期结束",
    "year": -15000,
    "yearDisplay": "约15,000年前",
    "civilization": "global",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 50,
      "lng": 0
    },
    "summary": "末次冰期结束，气候变暖，人类开始定居生活。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "neolithic",
      "out-of-africa"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "neolithic",
    "title": "新石器时代与农业革命",
    "year": -10000,
    "yearDisplay": "约1万年前",
    "civilization": "middleEast",
    "categories": [
      "science",
      "culture"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 33,
      "lng": 36
    },
    "summary": "农业革命开始，小麦和水稻被驯化，人类从采集走向生产。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "ice-age-end",
      "jericho"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "jericho",
    "title": "杰里科等最早城市出现",
    "year": -8000,
    "yearDisplay": "约8000年前",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "artifact"
    ],
    "type": "artifact",
    "eraId": "prehistoric",
    "location": {
      "lat": 31.85,
      "lng": 35.45
    },
    "summary": "耶利哥等人类最早的城市定居点出现，石头城墙和塔楼矗立。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "neolithic",
      "sumer"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "sumer-dawn",
    "title": "苏美尔文明萌芽",
    "year": -6000,
    "yearDisplay": "约6000年前",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "prehistoric",
    "location": {
      "lat": 32,
      "lng": 46
    },
    "summary": "苏美尔人在两河流域建立最早的城邦，铜器时代开始。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "neolithic"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "sumer",
    "title": "苏美尔文明与楔形文字",
    "year": -3500,
    "yearDisplay": "约前3,500年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 31.5,
      "lng": 45
    },
    "summary": "两河流域的苏美尔人创造最早的城邦文明和楔形文字。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer-dawn",
      "akkad",
      "babylon"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "egypt-unification",
    "title": "古埃及统一",
    "year": -3100,
    "yearDisplay": "约前3,100年",
    "civilization": "africa",
    "categories": [
      "politics",
      "artifact"
    ],
    "type": "artifact",
    "eraId": "ancient",
    "location": {
      "lat": 26,
      "lng": 32
    },
    "summary": "美尼斯统一上下埃及，第一王朝建立，三千年法老时代开启。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "moses"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "yellow-emperor",
    "title": "黄帝时代",
    "year": -2700,
    "yearDisplay": "约前2,700年",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 35,
      "lng": 109
    },
    "summary": "传说中的黄帝时代，炎黄联盟形成，仓颉造字，中华文明奠基。",
    "disputed": "黄帝属于上古传说人物，其生卒年与具体事迹尚无同时期文字记载可证。现代考古发现（如仰韶文化、龙山文化遗址）可与传说时代部分对应，但具体历史人物仍属传说范畴，非信史。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "xia-dynasty",
      "shang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "akkad",
    "title": "阿卡德帝国",
    "year": -2300,
    "yearDisplay": "约前2,300年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 33,
      "lng": 44
    },
    "summary": "萨尔贡建立人类历史上第一个帝国，统一两河流域。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "babylon"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "xia-dynasty",
    "title": "夏朝建立",
    "year": -2070,
    "yearDisplay": "约前2,070年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 35,
      "lng": 110
    },
    "summary": "大禹之子启建立夏朝，\"家天下\"取代禅让制。",
    "disputed": "夏朝的存在与否及二里头文化的归属在国际学界仍有争议。目前主要依据《史记》等后世文献记载，二里头遗址被多数学者认为可能是夏朝中晚期都城，但尚缺乏直接文字证据（如商代甲骨文）确证。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "yellow-emperor",
      "shang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "babylon",
    "title": "古巴比伦王国与汉谟拉比法典",
    "year": -1750,
    "yearDisplay": "约前1,750年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 32.5,
      "lng": 44.5
    },
    "summary": "汉谟拉比统一两河流域，颁布人类最早的成文法典。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "akkad",
      "sumer"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "shang-dynasty",
    "title": "商朝与甲骨文",
    "year": -1600,
    "yearDisplay": "约前1,600年",
    "civilization": "china",
    "categories": [
      "culture",
      "artifact"
    ],
    "type": "artifact",
    "eraId": "ancient",
    "location": {
      "lat": 36,
      "lng": 114
    },
    "summary": "商朝建立，甲骨文出现，青铜文明达到鼎盛。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "xia-dynasty",
      "zhou-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "aryan-invasion",
    "title": "雅利安人进入印度",
    "year": -1500,
    "yearDisplay": "约前1,500年",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 29,
      "lng": 77
    },
    "summary": "雅利安人进入印度次大陆，吠陀文明兴起，种姓制度萌芽。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "indus-valley-civilization"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "moses",
    "title": "摩西出埃及与犹太教",
    "year": -1200,
    "yearDisplay": "约前1,200年",
    "civilization": "middleEast",
    "categories": [
      "myth",
      "culture"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 30,
      "lng": 32.5
    },
    "summary": "摩西带领以色列人出埃及，一神教传统由此奠基。",
    "description": "",
    "disputed": "摩西与出埃及的叙事主要见于宗教文献，史学界对其历史真实性与具体规模仍有争议。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "egypt-unification",
      "jesus"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "zhou-dynasty",
    "title": "周朝建立",
    "year": -1046,
    "yearDisplay": "前1,046年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 109
    },
    "summary": "周武王伐纣，周朝建立，分封制、礼乐制度奠定。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "shang-dynasty",
      "spring-autumn",
      "confucius"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "spring-autumn",
    "title": "春秋时代开始",
    "year": -770,
    "yearDisplay": "前770年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "周平王东迁洛邑，东周开始，春秋时代，礼崩乐坏。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "zhou-dynasty",
      "warring-states"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "confucius",
    "title": "孔子",
    "year": -551,
    "yearDisplay": "前551年—前479年",
    "civilization": "china",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 35.6,
      "lng": 116.9
    },
    "summary": "儒家学派创始人，中国历史上最伟大的思想家、教育家，被尊为\"至圣先师\"。",
    "description": "",
    "disputed": "《论语》由孔子弟子及再传弟子编纂，其中部分章句的作者与成书年代在学界有讨论，但其作为儒家核心经典的地位是确定的。",
    "imageEra": "classical",
    "relatedNodeIds": [
      "laozi",
      "spring-autumn",
      "warring-states",
      "han-dynasty",
      "person-mencius",
      "person-hanwudi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "laozi",
    "title": "老子",
    "year": -571,
    "yearDisplay": "约前571年—前471年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 33.8,
      "lng": 115.7
    },
    "summary": "道家学派创始人，著《道德经》五千言，主张无为而治、道法自然。",
    "description": "",
    "disputed": "老子其人与《老子》（《道德经》）的成书年代与作者归属在学界有不同看法，传统说法为春秋末年李耳所作，现代学者多认为该书经历代编纂，成书于战国时期。",
    "imageEra": "classical",
    "relatedNodeIds": [
      "confucius",
      "spring-autumn",
      "han-dynasty",
      "person-zhuangzi",
      "warring-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "athenian-democracy",
    "title": "雅典民主制度确立",
    "year": -508,
    "yearDisplay": "前508年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 37.98,
      "lng": 23.73
    },
    "summary": "克里斯提尼改革确立雅典民主制，公民直接参与政治决策。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "greek-city-states",
      "greco-persian-wars",
      "plato"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "greco-persian-wars",
    "title": "希波战争与马拉松战役",
    "year": -490,
    "yearDisplay": "前490年",
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 38.1,
      "lng": 23.95
    },
    "summary": "希腊城邦击败波斯帝国入侵，马拉松战役诞生运动传奇。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "athenian-democracy",
      "alexander"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "warring-states",
    "title": "战国时代开始",
    "year": -475,
    "yearDisplay": "前475年",
    "civilization": "china",
    "categories": [
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 112
    },
    "summary": "战国七雄并立，百家争鸣，中国思想文化的黄金时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "confucius",
      "china-shangyang",
      "qin-unification"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "plato",
    "title": "柏拉图诞生",
    "year": -427,
    "yearDisplay": "前427年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 37.98,
      "lng": 23.73
    },
    "summary": "古希腊哲学家柏拉图诞生，《理想国》奠定西方哲学传统。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "athenian-democracy",
      "aristotle"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "aristotle",
    "title": "亚里士多德诞生",
    "year": -384,
    "yearDisplay": "前384年",
    "civilization": "europe",
    "categories": [
      "science",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 40.5,
      "lng": 22.5
    },
    "summary": "古希腊百科全书式学者，逻辑学、生物学奠基者。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "plato",
      "alexander"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "alexander",
    "title": "亚历山大大帝东征",
    "year": -336,
    "yearDisplay": "前336年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 40.6,
      "lng": 22.9
    },
    "summary": "亚历山大即位并开始东征，建立横跨欧亚非的庞大帝国。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "aristotle",
      "rome-conquest-greece"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "xiang-yu",
    "title": "项羽",
    "year": -232,
    "yearDisplay": "前232年—前202年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 33.9,
      "lng": 117.2
    },
    "summary": "西楚霸王，中国历史上最勇猛的武将之一，楚汉相争的悲剧英雄。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "qin-unification",
      "han-dynasty",
      "china-chu-han-contention"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "qin-unification",
    "title": "秦始皇统一中国",
    "year": -221,
    "yearDisplay": "前221年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.25,
      "lng": 108.9
    },
    "summary": "嬴政灭六国统一中国，建立中央集权的大一统王朝。",
    "description": "",
    "disputed": "秦始皇是否为千古一帝或暴君存在争议，其统一制度之功与严刑峻法之过皆为后世讨论焦点。",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shangyang",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "han-dynasty",
    "title": "汉朝建立与丝绸之路",
    "year": -202,
    "yearDisplay": "前202年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "classical",
    "location": {
      "lat": 34.25,
      "lng": 108.9
    },
    "summary": "刘邦建立汉朝，汉武帝开辟丝绸之路，中华文明的黄金时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "qin-unification",
      "confucius",
      "eastern-han",
      "zhang-qian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "zhang-qian",
    "title": "张骞通西域",
    "year": -138,
    "yearDisplay": "前138年—前114年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 33,
      "lng": 107
    },
    "summary": "丝绸之路的开辟者，\"凿空\"西域，第一个睁开眼睛看世界的中国人。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "rome-conquest-greece",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "rome-conquest-greece",
    "title": "罗马征服希腊",
    "year": -146,
    "yearDisplay": "前146年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "罗马征服希腊和迦太基，成为地中海世界的霸主。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "alexander",
      "rome-empire"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "rome-empire",
    "title": "罗马帝国建立",
    "year": -27,
    "yearDisplay": "前27年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "屋大维获得\"奥古斯都\"尊号，罗马从共和国进入帝国时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "rome-conquest-greece",
      "jesus",
      "rome-split"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "jesus",
    "title": "耶稣诞生",
    "year": 1,
    "yearDisplay": "公元元年",
    "civilization": "middleEast",
    "categories": [
      "myth",
      "culture"
    ],
    "type": "myth",
    "eraId": "classical",
    "location": {
      "lat": 31.8,
      "lng": 35.2
    },
    "summary": "基督教创始人耶稣诞生，公元纪年由此开始。",
    "description": "",
    "disputed": "耶稣的生平事迹主要见于宗教文献，历史学界对其真实生平与神性叙事的区分存在持续讨论。",
    "imageEra": "classical",
    "relatedNodeIds": [
      "moses",
      "rome-empire",
      "edict-of-milan"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "eastern-han",
    "title": "东汉建立与造纸术",
    "year": 25,
    "yearDisplay": "公元25年",
    "civilization": "china",
    "categories": [
      "politics",
      "science"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "刘秀建立东汉，蔡伦改进造纸术，对人类文明贡献巨大。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "yellow-turban"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "yellow-turban",
    "title": "黄巾起义",
    "year": 184,
    "yearDisplay": "公元184年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34,
      "lng": 114
    },
    "summary": "黄巾起义爆发，东汉王朝名存实亡，乱世开启。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "eastern-han",
      "three-kingdoms"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "three-kingdoms",
    "title": "三国时代开始",
    "year": 220,
    "yearDisplay": "公元220年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34,
      "lng": 113
    },
    "summary": "曹丕代汉建魏，三国鼎立时代正式开始。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "yellow-turban",
      "western-jin"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "western-jin",
    "title": "西晋短暂统一",
    "year": 280,
    "yearDisplay": "公元280年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "晋武帝司马炎灭吴，三国归晋，短暂统一。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "three-kingdoms",
      "five-hu"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "edict-of-milan",
    "title": "米兰敕令",
    "year": 313,
    "yearDisplay": "公元313年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 45.5,
      "lng": 9.2
    },
    "summary": "罗马皇帝君士坦丁颁布米兰敕令，基督教合法化。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "jesus",
      "rome-split"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "five-hu",
    "title": "五胡乱华",
    "year": 316,
    "yearDisplay": "公元316年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 110
    },
    "summary": "匈奴、鲜卑、羯、氐、羌五族入主中原，西晋灭亡。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "western-jin",
      "sui-dynasty"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "rome-split",
    "title": "罗马帝国分裂",
    "year": 395,
    "yearDisplay": "公元395年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41,
      "lng": 12.5
    },
    "summary": "罗马帝国分裂为东西两部分，西罗马和东罗马走上不同道路。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "rome-empire",
      "western-rome-fall"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "western-rome-fall",
    "title": "西罗马帝国灭亡",
    "year": 476,
    "yearDisplay": "公元476年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "西罗马帝国灭亡，欧洲古典时代结束，中世纪开始。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "rome-split",
      "sui-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "sui-dynasty",
    "title": "隋朝建立",
    "year": 581,
    "yearDisplay": "公元581年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 109
    },
    "summary": "杨坚建立隋朝，科举制创立，大运河开凿，盛世前奏。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "five-hu",
      "tang-dynasty",
      "xuanzang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "xuanzang",
    "title": "玄奘西行",
    "year": 629,
    "yearDisplay": "公元602年—公元664年",
    "civilization": "china",
    "categories": [
      "culture",
      "science"
    ],
    "type": "person",
    "eraId": "medieval",
    "location": {
      "lat": 34.5,
      "lng": 108.9
    },
    "summary": "唐代高僧，法相唯识宗创始人，《西游记》中唐僧的原型，西行求法的伟大旅行家。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "islam",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "tang-dynasty",
    "title": "唐朝建立",
    "year": 618,
    "yearDisplay": "公元618年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 34.25,
      "lng": 108.95
    },
    "summary": "李渊建立唐朝，贞观之治、开元盛世，中华文明的黄金时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sui-dynasty",
      "an-shi-rebellion",
      "wu-zetian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "islam",
    "title": "伊斯兰教诞生",
    "year": 622,
    "yearDisplay": "公元622年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "medieval",
    "location": {
      "lat": 21.4,
      "lng": 39.8
    },
    "summary": "穆罕默德在麦加传教，希吉拉纪元开始，伊斯兰教兴起。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "arab-empire",
      "abbasid"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "wu-zetian",
    "title": "武则天称帝",
    "year": 690,
    "yearDisplay": "公元690年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.25,
      "lng": 108.95
    },
    "summary": "中国历史上唯一的女皇帝武则天登基，改国号为周。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "abbasid",
    "title": "阿拔斯王朝与伊斯兰黄金时代",
    "year": 750,
    "yearDisplay": "公元750年",
    "civilization": "middleEast",
    "categories": [
      "science",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 33.3,
      "lng": 44.4
    },
    "summary": "阿拔斯王朝建立，巴格达智慧宫成为世界学术中心。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "islam",
      "arab-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "an-shi-rebellion",
    "title": "安史之乱",
    "year": 755,
    "yearDisplay": "公元755年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.25,
      "lng": 108.95
    },
    "summary": "安禄山史思明叛乱，唐朝由盛转衰的转折点。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "song-dynasty",
      "event-kaiyuan",
      "person-libai"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "verdun-treaty",
    "title": "凡尔登条约",
    "year": 843,
    "yearDisplay": "公元843年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 49.1,
      "lng": 5.4
    },
    "summary": "查理曼帝国一分为三，奠定现代法德意三国雏形。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "western-rome-fall",
      "norman-conquest"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "song-dynasty",
    "title": "宋朝建立",
    "year": 960,
    "yearDisplay": "公元960年",
    "civilization": "china",
    "categories": [
      "politics",
      "science",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 34.8,
      "lng": 114.3
    },
    "summary": "赵匡胤黄袍加身建立宋朝，经济文化科技达到中国古代顶峰。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-wudaishi",
      "jingkang",
      "mongol-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "great-schism",
    "title": "东西教会大分裂",
    "year": 1054,
    "yearDisplay": "公元1054年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 41,
      "lng": 29
    },
    "summary": "基督教分裂为罗马天主教和东正教两大教派。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "rome-split",
      "crusades"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "norman-conquest",
    "title": "诺曼征服英格兰",
    "year": 1066,
    "yearDisplay": "公元1066年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 50.9,
      "lng": 0.5
    },
    "summary": "诺曼底公爵威廉征服英格兰，改变了英国的语言和历史。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "verdun-treaty",
      "magna-carta"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "jingkang",
    "title": "靖康之变",
    "year": 1127,
    "yearDisplay": "公元1127年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.8,
      "lng": 114.3
    },
    "summary": "金军攻破开封，北宋灭亡，南宋开始。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "mongol-empire",
      "yue-fei"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "yue-fei",
    "title": "岳飞",
    "year": 1103,
    "yearDisplay": "公元1103年—公元1142年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "type": "person",
    "eraId": "medieval",
    "location": {
      "lat": 35.9,
      "lng": 114.3
    },
    "summary": "南宋抗金名将，民族英雄，\"精忠报国\"精神的象征。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "jingkang",
      "mongol-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "mongol-empire",
    "title": "蒙古帝国建立",
    "year": 1206,
    "yearDisplay": "公元1206年",
    "civilization": "eastAsia",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 48,
      "lng": 108
    },
    "summary": "铁木真统一蒙古各部，建立大蒙古国，开启狂飙时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "yuan-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "magna-carta",
    "title": "英国大宪章",
    "year": 1215,
    "yearDisplay": "公元1215年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 51.4,
      "lng": -0.6
    },
    "summary": "英格兰国王约翰被迫签署《大宪章》，限制王权的里程碑。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "norman-conquest",
      "british-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "yuan-dynasty",
    "title": "元朝建立",
    "year": 1271,
    "yearDisplay": "公元1271年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "忽必烈建立元朝，定都大都（北京），中国首次由少数民族完全统一。",
    "disputed": "马可·波罗是否真正到过中国，学界存在争议。部分学者认为其游记可能基于波斯商人口述与道听途说拼接，缺少对中国典型事物（如茶、筷子、长城）的记载；但也有学者认为其细节描述（如元朝官职制度、城市布局）有亲历者特征。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "ming-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "yashan",
    "title": "崖山海战",
    "year": 1279,
    "yearDisplay": "公元1279年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 22.1,
      "lng": 113.6
    },
    "summary": "南宋灭亡，陆秀夫背幼帝投海殉国。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "yuan-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "ming-dynasty",
    "title": "明朝建立",
    "year": 1368,
    "yearDisplay": "公元1368年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "朱元璋推翻元朝建立明朝，汉人重新执掌中原政权。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "yuan-dynasty",
      "qing-dynasty",
      "wang-yangming"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "wang-yangming",
    "title": "王阳明",
    "year": 1472,
    "yearDisplay": "公元1472年—公元1529年",
    "civilization": "china",
    "categories": [
      "culture",
      "military"
    ],
    "type": "person",
    "eraId": "medieval",
    "location": {
      "lat": 29.9,
      "lng": 121.5
    },
    "summary": "明代最伟大的思想家，心学集大成者，\"立德、立功、立言\"三不朽圣人。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "qing-dynasty",
      "meiji-restoration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "constantinople-fall",
    "title": "君士坦丁堡陷落",
    "year": 1453,
    "yearDisplay": "公元1453年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 41,
      "lng": 29
    },
    "summary": "奥斯曼土耳其攻陷君士坦丁堡，东罗马帝国灭亡。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "rome-split",
      "columbus"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "gutenberg",
    "title": "古腾堡活字印刷术",
    "year": 1455,
    "yearDisplay": "公元1455年",
    "civilization": "europe",
    "categories": [
      "science",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 50,
      "lng": 8.3
    },
    "summary": "古腾堡发明金属活字印刷，知识传播革命开启。",
    "description": "",
    "disputed": "古腾堡金属活字印刷术是欧洲近代印刷业的开端；活字印刷技术此前已在东亚有发展，不同文明各自的技术传统与历史影响学界有不同评价。",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "reformation",
      "da-vinci"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "da-vinci",
    "title": "达·芬奇",
    "year": 1452,
    "yearDisplay": "公元1452年—公元1519年",
    "civilization": "europe",
    "categories": [
      "culture",
      "science"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 43.7,
      "lng": 10.9
    },
    "summary": "意大利文艺复兴全盛期最伟大的全才，画家、科学家、发明家的完美统一。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "michelangelo",
      "gutenberg"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "michelangelo",
    "title": "米开朗基罗",
    "year": 1475,
    "yearDisplay": "公元1475年—公元1564年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 43.7,
      "lng": 11.2
    },
    "summary": "文艺复兴美术三杰之一，雕塑家、画家、建筑师，艺术史上的巨人。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "da-vinci",
      "newton"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "columbus",
    "title": "哥伦布发现美洲",
    "year": 1492,
    "yearDisplay": "公元1492年",
    "civilization": "america",
    "categories": [
      "science",
      "military"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 20,
      "lng": -75
    },
    "summary": "哥伦布横渡大西洋到达美洲，地理大发现时代正式开始。",
    "description": "",
    "disputed": "美洲原住民早在哥伦布抵达前数万年已在此繁衍生息，「发现」是欧洲中心视角的表述；更准确的说法是哥伦布「首次到达」或「开启了欧洲与美洲的大规模接触」。",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "constantinople-fall",
      "da-gama",
      "magellan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "da-gama",
    "title": "达伽马开辟印度新航路",
    "year": 1498,
    "yearDisplay": "公元1498年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 15.6,
      "lng": 73.8
    },
    "summary": "葡萄牙航海家达伽马绕过好望角到达印度，开辟东西方新航路。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "columbus",
      "magellan"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "reformation",
    "title": "马丁·路德宗教改革",
    "year": 1517,
    "yearDisplay": "公元1517年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 52,
      "lng": 11.6
    },
    "summary": "马丁·路德贴出《九十五条论纲》，新教诞生，基督教世界再次大分裂。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "great-schism",
      "gutenberg",
      "enlightenment"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-calvin",
    "title": "加尔文",
    "year": 1509,
    "yearDisplay": "公元1509年—公元1564年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 46.2,
      "lng": 6.1
    },
    "summary": "宗教改革家，加尔文宗创始人，《基督教要义》系统阐述新教神学，影响深远。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "reformation",
      "person-martin-luther",
      "enlightenment"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "magellan",
    "title": "麦哲伦环球航行",
    "year": 1519,
    "yearDisplay": "公元1519年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": -33,
      "lng": -70
    },
    "summary": "麦哲伦船队首次环球航行，证明地球是圆的。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "columbus",
      "da-gama",
      "elizabeth-i"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "elizabeth-i",
    "title": "伊丽莎白一世",
    "year": 1533,
    "yearDisplay": "公元1533年—公元1603年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英格兰都铎王朝末代女王，\"童贞女王\"，统治时期被称为\"伊丽莎白时代\"——英国的黄金时代。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "shakespeare",
      "reformation",
      "person-shakespeare",
      "spanish-armada",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "copernicus",
    "title": "哥白尼日心说",
    "year": 1543,
    "yearDisplay": "公元1543年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 53.1,
      "lng": 18.6
    },
    "summary": "哥白尼《天体运行论》出版，日心说挑战地心说，科学革命开端。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "newton",
      "gutenberg"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "shakespeare",
    "title": "莎士比亚",
    "year": 1564,
    "yearDisplay": "公元1564年—公元1616年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 52.2,
      "lng": -1.7
    },
    "summary": "英国最伟大的剧作家、诗人，世界文学史上的巅峰人物。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "elizabeth-i",
      "da-vinci"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "galileo",
    "title": "伽利略",
    "year": 1564,
    "yearDisplay": "公元1564年—公元1642年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 43.7,
      "lng": 10.4
    },
    "summary": "意大利天文学家、物理学家，\"现代科学之父\"，科学革命的关键人物。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "copernicus",
      "newton",
      "renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "thirty-years-war",
    "title": "三十年战争",
    "year": 1618,
    "yearDisplay": "公元1618年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 50,
      "lng": 10
    },
    "summary": "欧洲三十年战争爆发，宗教与政治交织的全欧大混战。",
    "important": true,
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "reformation",
      "british-revolution",
      "renaissance",
      "protestant-reformation",
      "enlightenment"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "british-revolution",
    "title": "英国资产阶级革命",
    "year": 1640,
    "yearDisplay": "公元1640年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英国议会与国王的内战爆发，近代民主政治的开端。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "magna-carta",
      "glorious-revolution"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "qing-dynasty",
    "title": "清朝建立",
    "year": 1636,
    "yearDisplay": "公元1636年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 41.8,
      "lng": 123.4
    },
    "summary": "皇太极改国号为清，清朝正式建立，后入主中原。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "ming-dynasty",
      "opium-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "newton",
    "title": "牛顿",
    "year": 1643,
    "yearDisplay": "公元1643年—公元1727年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 52.8,
      "lng": -0.6
    },
    "summary": "人类历史上最伟大的科学家之一，经典力学的创立者，微积分发明者。",
    "description": "",
    "disputed": "牛顿与苹果落地的故事是后世广为流传的传说，其万有引力理论的建立是长期科学研究的结果，苹果故事更多具象征意义。",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "galileo",
      "copernicus",
      "enlightenment",
      "industrial-revolution",
      "einstein"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "glorious-revolution",
    "title": "光荣革命与权利法案",
    "year": 1688,
    "yearDisplay": "公元1688年光荣革命，1689年颁布《权利法案》",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英国光荣革命后颁布《权利法案》，君主立宪制正式确立。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "british-revolution",
      "magna-carta"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "enlightenment",
    "title": "启蒙运动",
    "year": 1720,
    "yearDisplay": "18世纪",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "伏尔泰、卢梭、孟德斯鸠等思想家高举理性旗帜，启蒙运动进入高潮。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "newton",
      "french-revolution",
      "american-independence",
      "sci-scientific-revolution",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "peter-great",
    "title": "彼得大帝",
    "year": 1672,
    "yearDisplay": "公元1672年—公元1725年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 59.9,
      "lng": 30.3
    },
    "summary": "俄国罗曼诺夫王朝最伟大的沙皇，俄罗斯帝国的缔造者，\"俄罗斯之父\"。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "enlightenment",
      "columbus",
      "russian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "industrial-revolution",
    "title": "瓦特改良蒸汽机",
    "year": 1769,
    "yearDisplay": "公元1769年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 52.5,
      "lng": -2
    },
    "summary": "瓦特改良蒸汽机投入使用，工业革命正式开始，人类进入蒸汽时代。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "newton",
      "first-industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "american-independence",
    "title": "美国独立宣言",
    "year": 1776,
    "yearDisplay": "公元1776年",
    "civilization": "america",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 38.9,
      "lng": -77
    },
    "summary": "《独立宣言》发表，美国诞生，启蒙思想的第一次伟大实践。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "enlightenment",
      "french-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "french-revolution",
    "title": "法国大革命",
    "year": 1789,
    "yearDisplay": "公元1789年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "巴黎人民攻占巴士底狱，法国大革命爆发，震撼整个欧洲。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "enlightenment",
      "napoleon",
      "american-independence"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "napoleon",
    "title": "拿破仑称帝与拿破仑法典",
    "year": 1804,
    "yearDisplay": "公元1804年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "拿破仑加冕为皇帝，颁布《拿破仑法典》，重塑欧洲秩序。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "french-revolution",
      "waterloo"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "waterloo",
    "title": "滑铁卢战役",
    "year": 1815,
    "yearDisplay": "公元1815年",
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 50.7,
      "lng": 4.4
    },
    "summary": "拿破仑在滑铁卢战败，拿破仑帝国终结，维也纳体系建立。",
    "important": true,
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "napoleon",
      "first-industrial-revolution",
      "war-napoleonic",
      "person-napoleon",
      "world-war-1"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "opium-war",
    "title": "鸦片战争与虎门销烟",
    "year": 1839,
    "yearDisplay": "公元1839年（虎门销烟），1840年战争爆发",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 22.3,
      "lng": 113.6
    },
    "summary": "鸦片战争爆发，中国近代史的开端，百年屈辱的开始。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "qing-dynasty",
      "sino-japanese-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "first-industrial-revolution",
    "title": "第一次工业革命完成",
    "year": 1840,
    "yearDisplay": "约公元1840年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 53.5,
      "lng": -2.2
    },
    "summary": "英国率先完成工业革命，成为\"世界工厂\"。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "industrial-revolution",
      "second-industrial-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "communist-manifesto",
    "title": "《共产党宣言》发表",
    "year": 1848,
    "yearDisplay": "公元1848年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "马克思恩格斯发表《共产党宣言》，社会主义从空想变为科学。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "first-industrial-revolution",
      "october-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "darwin",
    "title": "达尔文",
    "year": 1809,
    "yearDisplay": "公元1809年—公元1882年",
    "civilization": "europe",
    "categories": [
      "science",
      "culture"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 52.7,
      "lng": -2.8
    },
    "summary": "英国博物学家，生物进化论的奠基人，改变了人类对生命的认知。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "newton",
      "copernicus",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "lincoln",
    "title": "林肯",
    "year": 1809,
    "yearDisplay": "公元1809年—公元1865年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 37.6,
      "lng": -85.6
    },
    "summary": "美国第16任总统，废除奴隶制、维护国家统一的伟大政治家。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "industrial-revolution",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "second-industrial-revolution",
    "title": "爱迪生发明电灯与第二次工业革命",
    "year": 1879,
    "yearDisplay": "公元1879年",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 40.7,
      "lng": -74
    },
    "summary": "爱迪生发明实用电灯，电力革命开启，人类进入电气时代。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "wright-brothers",
      "first-industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "sino-japanese-war",
    "title": "甲午战争",
    "year": 1895,
    "yearDisplay": "公元1895年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 39,
      "lng": 122
    },
    "summary": "中日甲午战争，清朝战败，《马关条约》签订，民族危机空前加深。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "opium-war",
      "meiji-restoration",
      "xinhai-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "wright-brothers",
    "title": "莱特兄弟发明飞机",
    "year": 1903,
    "yearDisplay": "公元1903年",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 36,
      "lng": -75.7
    },
    "summary": "莱特兄弟完成人类首次动力飞行，人类翱翔蓝天的梦想实现。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "second-industrial-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "sun-yat-sen",
    "title": "孙中山",
    "year": 1866,
    "yearDisplay": "公元1866年—公元1925年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 22.5,
      "lng": 113.4
    },
    "summary": "中华民国国父，中国民主革命的伟大先驱，三民主义的创立者。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "xinhai-revolution",
      "qing-dynasty",
      "sino-japanese-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "xinhai-revolution",
    "title": "辛亥革命",
    "year": 1911,
    "yearDisplay": "公元1911年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 30.6,
      "lng": 114.3
    },
    "summary": "辛亥革命推翻清朝，中华民国成立，中国结束两千年帝制。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "qing-dynasty",
      "sino-japanese-war",
      "dynasty-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "world-war-1",
    "title": "第一次世界大战",
    "year": 1914,
    "yearDisplay": "公元1914年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 50,
      "lng": 5
    },
    "summary": "第一次世界大战爆发，人类历史上第一次全球性战争。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "october-revolution",
      "world-war-2",
      "person-churchill"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "october-revolution",
    "title": "俄国十月革命",
    "year": 1917,
    "yearDisplay": "公元1917年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "十月革命推翻临时政府，苏维埃俄国诞生，世界上第一个社会主义国家。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "communist-manifesto",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "great-depression",
    "title": "大萧条",
    "year": 1929,
    "yearDisplay": "公元1929年",
    "civilization": "america",
    "categories": [
      "politics",
      "science",
      "culture"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 40.7,
      "lng": -74
    },
    "summary": "美国股市崩盘，经济大萧条席卷全球。",
    "important": true,
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "world-war-2",
      "second-industrial-revolution",
      "world-war-1",
      "roosevelt",
      "economy-roosevelt-new-deal",
      "econ-bretton-woods",
      "economy-2008-crisis"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "world-war-2",
    "title": "第二次世界大战",
    "year": 1939,
    "yearDisplay": "公元1939年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 52,
      "lng": 10
    },
    "summary": "德军入侵波兰，二战全面爆发，人类历史上规模最大的战争。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "world-war-1",
      "atomic-bomb",
      "cold-war",
      "person-churchill",
      "person-einstein"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "einstein",
    "title": "爱因斯坦",
    "year": 1879,
    "yearDisplay": "公元1879年—公元1955年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "modern",
    "location": {
      "lat": 48.4,
      "lng": 9.9
    },
    "summary": "德裔美籍物理学家，相对论创立者，20世纪最伟大的科学家。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "newton",
      "galileo",
      "atomic-bomb",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "churchill",
    "title": "丘吉尔",
    "year": 1874,
    "yearDisplay": "公元1874年—公元1965年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "modern",
    "location": {
      "lat": 51.3,
      "lng": 1
    },
    "summary": "英国首相，二战中领导英国抵抗纳粹的伟大领袖，20世纪最伟大的政治家之一。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "roosevelt",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "roosevelt",
    "title": "富兰克林·罗斯福",
    "year": 1882,
    "yearDisplay": "公元1882年—公元1945年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "person",
    "eraId": "modern",
    "location": {
      "lat": 41.7,
      "lng": -73.9
    },
    "summary": "美国第32任总统，唯一连任四届，带领美国走出大萧条、赢得二战。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "great-depression",
      "world-war-2",
      "churchill",
      "cold-war",
      "world-war-2",
      "person-churchill"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "atomic-bomb",
    "title": "原子弹投放与二战结束",
    "year": 1945,
    "yearDisplay": "公元1945年",
    "civilization": "america",
    "categories": [
      "military",
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 34.4,
      "lng": 132.5
    },
    "summary": "广岛长崎原子弹爆炸，二战结束，核时代开启，联合国成立。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "cold-war",
    "title": "冷战开始",
    "year": 1947,
    "yearDisplay": "公元1947年",
    "civilization": "global",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 50,
      "lng": 10
    },
    "summary": "杜鲁门主义出台，美苏冷战开始，世界进入两极格局。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "atomic-bomb",
      "soviet-collapse"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "prc-founding",
    "title": "中华人民共和国成立",
    "year": 1949,
    "yearDisplay": "公元1949年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "毛泽东在天安门宣告新中国成立，中国人民从此站起来了。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "xinhai-revolution",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "korean-war",
    "title": "朝鲜战争",
    "year": 1950,
    "yearDisplay": "公元1950年",
    "civilization": "eastAsia",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 38,
      "lng": 127
    },
    "summary": "朝鲜战争爆发，冷战中的第一场热战。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "prc-founding"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "sputnik",
    "title": "斯普特尼克一号与太空时代",
    "year": 1957,
    "yearDisplay": "公元1957年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "dynasty",
    "eraId": "modern",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "苏联发射人类第一颗人造地球卫星，太空时代开启。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "gagarin",
      "apollo-11"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "gagarin",
    "title": "人类首次进入太空",
    "year": 1961,
    "yearDisplay": "公元1961年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "modern",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "苏联宇航员加加林乘坐东方一号进入太空，人类首次进入太空。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "sputnik",
      "apollo-11"
    ],
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "cuban-missile-crisis",
    "title": "古巴导弹危机",
    "year": 1962,
    "yearDisplay": "公元1962年",
    "civilization": "america",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 23,
      "lng": -82
    },
    "summary": "美苏在古巴部署导弹问题上对峙，人类最接近核战争的时刻。",
    "important": true,
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "atomic-bomb",
      "hiroshima-nagasaki",
      "vietnam-war-detail",
      "space-race"
    ],
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "apollo-11",
    "title": "阿波罗11号登月",
    "year": 1969,
    "yearDisplay": "公元1969年",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 0.67,
      "lng": 23.47
    },
    "summary": "人类首次登上月球，阿姆斯特朗迈出「个人的一小步，人类的一大步」。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "sputnik",
      "gagarin"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "reform-and-opening",
    "title": "中国改革开放",
    "year": 1978,
    "yearDisplay": "公元1978年",
    "civilization": "china",
    "categories": [
      "politics",
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 22.5,
      "lng": 114.1
    },
    "summary": "十一届三中全会召开，改革开放政策启动，中国经济腾飞。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "prc-founding"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "berlin-wall-fall",
    "title": "柏林墙倒塌",
    "year": 1989,
    "yearDisplay": "公元1989年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 52.5,
      "lng": 13.4
    },
    "summary": "柏林墙倒塌，冷战走向终结，东欧剧变开始。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "soviet-collapse"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "soviet-collapse",
    "title": "苏联解体",
    "year": 1991,
    "yearDisplay": "公元1991年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "苏联正式解体，冷战结束，世界格局进入一超多强时代。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "berlin-wall-fall"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "internet",
    "title": "互联网商业化",
    "year": 1993,
    "yearDisplay": "公元1993年",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 37.4,
      "lng": -122
    },
    "summary": "万维网向公众开放，互联网时代到来，信息革命开启。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mobile-internet",
      "ai-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "wto",
    "title": "中国加入WTO",
    "year": 2001,
    "yearDisplay": "公元2001年",
    "civilization": "china",
    "categories": [
      "science",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "modern",
    "location": {
      "lat": 31.2,
      "lng": 121.5
    },
    "summary": "中国正式加入世界贸易组织，全面融入全球经济体系。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "reform-and-opening"
    ],
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "mobile-internet",
    "title": "移动互联网时代",
    "year": 2010,
    "yearDisplay": "2010年代",
    "civilization": "global",
    "categories": [
      "science"
    ],
    "type": "dynasty",
    "eraId": "modern",
    "location": {
      "lat": 37.3,
      "lng": -122
    },
    "summary": "智能手机普及，移动互联网深入生活每一个角落。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "internet",
      "ai-revolution"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "covid",
    "title": "新冠疫情全球大流行",
    "year": 2020,
    "yearDisplay": "公元2020年",
    "civilization": "global",
    "categories": [
      "science",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 30.6,
      "lng": 114.3
    },
    "summary": "新冠疫情席卷全球，百年未遇的大流行深刻改变世界。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "ai-revolution"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "ai-revolution",
    "title": "ChatGPT与AI革命",
    "year": 2022,
    "yearDisplay": "公元2022年",
    "civilization": "global",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 37.8,
      "lng": -122.4
    },
    "summary": "ChatGPT横空出世，生成式AI爆发，人工智能革命开端。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "internet",
      "mobile-internet"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "china-dayu-flood",
    "title": "大禹治水",
    "year": -2070,
    "yearDisplay": "约前2,070年",
    "civilization": "china",
    "categories": [
      "politics",
      "myth"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113.5
    },
    "summary": "禹继父业改堵为疏，三过家门而不入，平定水患，舜禅位于禹，铸九鼎定九州。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-xia-qi",
      "myth-shun"
    ],
    "disputed": "大禹治水的传说见于后世文献，考古学界对其历史真实性与具体规模仍有争议。",
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-xia-qi",
    "title": "启建夏朝",
    "year": -2050,
    "yearDisplay": "约前2,050年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.8,
      "lng": 112.5
    },
    "summary": "禹之子启打破禅让制继位称王，建立中国第一个世袭制王朝，\"家天下\"由此开始。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-dayu-flood",
      "china-shaokang"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-shaokang",
    "title": "少康中兴",
    "year": -1900,
    "yearDisplay": "约前1,900年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34,
      "lng": 113
    },
    "summary": "夏朝中期后羿代夏、寒浞篡位，少康以一成一旅起家，诛寒浞复国，史称\"少康中兴\"。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-xia-qi",
      "china-xia-jie"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-xia-jie",
    "title": "夏桀亡国",
    "year": -1600,
    "yearDisplay": "约前1,600年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 111
    },
    "summary": "末代君主桀暴虐无道，宠妺喜，建瑶台，杀忠臣关龙逄，商汤伐桀战于鸣条，夏亡。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-shaokang",
      "shang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-warring-states",
    "title": "战国七雄",
    "year": -350,
    "yearDisplay": "前4世纪",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 114
    },
    "summary": "齐楚燕韩赵魏秦七雄并立，各国变法图强，最终秦国商鞅变法最为彻底。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shangyang",
      "china-baijia"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-shangyang",
    "title": "商鞅变法",
    "year": -356,
    "yearDisplay": "前356年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 109
    },
    "summary": "商鞅徙木立信，废井田开阡陌，奖励耕战，行连坐法，秦国一跃成为最强。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-warring-states",
      "china-qin-shihuang",
      "warring-states",
      "qin-unification"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-baijia",
    "title": "百家争鸣",
    "year": -300,
    "yearDisplay": "前4—3世纪",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 114
    },
    "summary": "儒道法墨名阴阳纵横兵农杂家诸子百家争鸣，中国思想史上的黄金时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-warring-states",
      "confucius",
      "laozi",
      "person-zhuangzi",
      "person-qinshihuang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-he-zhong-lian-heng",
    "title": "合纵连横",
    "year": -300,
    "yearDisplay": "前4—3世纪",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 114
    },
    "summary": "苏秦佩六国相印合纵抗秦，张仪以连横破之，战国纵横家凭口舌左右天下格局。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shangyang",
      "china-changping"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-changping",
    "title": "长平之战",
    "year": -260,
    "yearDisplay": "前260年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35.8,
      "lng": 112.9
    },
    "summary": "秦赵决战，赵括纸上谈兵，白起坑杀赵军四十万，六国再无力抗秦。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-he-zhong-lian-heng",
      "china-qin-shihuang",
      "war-muye",
      "person-qinshihuang",
      "war-julu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-dujiangyan",
    "title": "都江堰与郑国渠",
    "year": -250,
    "yearDisplay": "前3世纪",
    "civilization": "china",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 31,
      "lng": 103.6
    },
    "summary": "李冰父子修建都江堰，使成都平原\"水旱从人不知饥馑\"，至今仍在使用。郑国渠灌溉关中。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shangyang",
      "china-qin-shihuang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-jing-ke",
    "title": "荆轲刺秦王",
    "year": -227,
    "yearDisplay": "前227年",
    "civilization": "china",
    "categories": [
      "military",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "燕太子丹派荆轲以献督亢地图为名刺秦王，\"风萧萧兮易水寒\"，图穷匕见，事败被杀。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-changping",
      "china-qin-shihuang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-qin-shihuang",
    "title": "秦始皇统一六国",
    "year": -221,
    "yearDisplay": "前221年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "嬴政十年灭六国，建立中国第一个大一统中央集权帝国，自称\"始皇帝\"。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-changping",
      "china-shangyang",
      "china-shu-tongwen"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-shu-tongwen",
    "title": "书同文车同轨",
    "year": -220,
    "yearDisplay": "前220年",
    "civilization": "china",
    "categories": [
      "politics",
      "science"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "统一文字、度量衡、货币、车轨，修驰道直道，建郡县制，奠定两千年制度基础。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-qin-shihuang",
      "china-fenshu-kengru"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-fenshu-kengru",
    "title": "焚书坑儒与万里长城",
    "year": -213,
    "yearDisplay": "前213年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 40,
      "lng": 116
    },
    "summary": "焚书坑儒统一思想，蒙恬北击匈奴修万里长城，南征百越修灵渠。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-qin-shihuang",
      "china-shaqiu-zhibian"
    ],
    "disputed": "「焚书坑儒」的具体内容与规模在学界有不同解读，「坑儒」是否为方士还是儒生存在争议，传统说法经后世文献不断层累形成。",
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-shaqiu-zhibian",
    "title": "沙丘之变与秦亡",
    "year": -207,
    "yearDisplay": "前207年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "始皇病逝沙丘，赵高李斯立胡亥；陈胜吴广起义，项羽刘邦并起，秦二世而亡。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-qin-shihuang",
      "china-chu-han"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-chu-han",
    "title": "楚汉争霸",
    "year": -202,
    "yearDisplay": "前206年—前202年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 33,
      "lng": 116
    },
    "summary": "项羽刘邦争天下，鸿门宴、暗度陈仓、垓下之围，项羽自刎乌江，刘邦建汉。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shaqiu-zhibian",
      "china-liu-bang",
      "xiang-yu",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-liu-bang",
    "title": "刘邦建汉与郡国并行",
    "year": -202,
    "yearDisplay": "前202年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "汉高祖刘邦建汉定都长安，郡国并行，后铲除异姓王，白马之盟非刘氏不王。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-chu-han",
      "china-wenjing"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-wenjing",
    "title": "文景之治",
    "year": -150,
    "yearDisplay": "前180年—前141年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "文帝景帝推崇黄老之术，轻徭薄赋三十税一，与民休息，国家富庶。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-liu-bang",
      "china-han-wudi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-han-wudi",
    "title": "汉武帝大一统",
    "year": -100,
    "yearDisplay": "前141年—前87年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "汉武帝刘彻在位54年，罢黜百家独尊儒术，推恩令削藩，北击匈奴，凿空西域，西汉鼎盛。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-wenjing",
      "china-weiqing-huoqubing",
      "china-zhangqian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-weiqing-huoqubing",
    "title": "卫青霍去病北击匈奴",
    "year": -119,
    "yearDisplay": "前119年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 42,
      "lng": 110
    },
    "summary": "卫青七战七捷收复河套，霍去病封狼居胥饮马瀚海，大破匈奴，西汉最强音。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-han-wudi",
      "china-zhangqian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-zhangqian",
    "title": "张骞通西域与丝绸之路",
    "year": -100,
    "yearDisplay": "前138年—前115年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture",
      "science"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 40,
      "lng": 90
    },
    "summary": "张骞两次出使西域，凿空之旅开辟丝绸之路，中国丝绸远销罗马，佛教葡萄等传入中国。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-han-wudi",
      "china-weiqing-huoqubing"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-sima-qian",
    "title": "司马迁著《史记》",
    "year": -100,
    "yearDisplay": "前91年前后",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "司马迁受宫刑忍辱著《史记》130篇，纪传体通史开山之作，史家之绝唱。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-han-wudi",
      "china-liu-bang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-zhaojun",
    "title": "昭君出塞",
    "year": -33,
    "yearDisplay": "前33年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 40.8,
      "lng": 111.7
    },
    "summary": "王昭君远嫁匈奴呼韩邪单于，维护汉匈和平半个世纪，青冢向黄昏。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-han-wudi",
      "china-weiqing-huoqubing"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "dynasty-xia",
    "title": "夏朝",
    "year": -1800,
    "yearDisplay": "约前2,070年—前1,600年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.7,
      "lng": 112.7
    },
    "summary": "中国史书记载的第一个世袭制王朝，共传14代17后，约470年，末代桀被商汤所灭。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-dayu-flood",
      "shang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "dynasty-shang",
    "title": "商朝",
    "year": -1300,
    "yearDisplay": "约前1,600年—前1,046年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture",
      "artifact"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 36.1,
      "lng": 114.4
    },
    "summary": "商汤灭夏建商，以甲骨文和青铜器闻名，盘庚迁殷后稳定，纣王暴虐被周武王所灭。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "dynasty-xia",
      "dynasty-western-zhou",
      "shang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "dynasty-western-zhou",
    "title": "西周",
    "year": -1000,
    "yearDisplay": "前1,046年—前771年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture",
      "military"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "周武王灭商建立，分封制、宗法制、礼乐制奠定中国政治文化基础，幽王烽火戏诸侯而亡。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "dynasty-shang",
      "zhou-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "dynasty-spring-autumn",
    "title": "东周·春秋",
    "year": -600,
    "yearDisplay": "前770年—前476年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "周平王东迁洛邑，王室衰微，诸侯争霸，百家争鸣萌芽，思想文化第一个黄金时代。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "dynasty-western-zhou",
      "dynasty-warring-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "dynasty-warring-states",
    "title": "战国",
    "year": -300,
    "yearDisplay": "前475年—前221年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture",
      "science"
    ],
    "type": "dynasty",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 114
    },
    "summary": "齐楚燕韩赵魏秦七雄并立，各国变法图强，百家争鸣，秦灭六国统一天下。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "dynasty-spring-autumn",
      "qin-unification",
      "china-baijia"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "dynasty-xin",
    "title": "新朝",
    "year": 15,
    "yearDisplay": "公元9年—公元23年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "dynasty",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "西汉外戚王莽篡汉建立，托古改制失败，绿林赤眉起义推翻，仅存15年。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "eastern-han"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "dynasty-sanguo",
    "title": "三国",
    "year": 220,
    "yearDisplay": "公元220年—公元280年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 33,
      "lng": 114
    },
    "summary": "东汉灭亡后魏蜀吴三足鼎立，群英荟萃，最终司马氏篡魏建晋，灭吴统一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-xijin",
      "person-cao-cao",
      "person-zhugeliang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "dynasty-xijin",
    "title": "西晋",
    "year": 280,
    "yearDisplay": "公元266年—公元316年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "司马炎篡魏建立，短暂统一后八王之乱，五胡乱华，永嘉之乱而亡。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-sanguo",
      "dynasty-dongjin"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "dynasty-dongjin",
    "title": "东晋",
    "year": 383,
    "yearDisplay": "公元317年—公元420年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "司马睿偏安江南，门阀政治鼎盛，淝水之战大败前秦，王羲之陶渊明为文化亮点。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-xijin",
      "dynasty-nanbeichao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "dynasty-nanbeichao",
    "title": "南北朝",
    "year": 500,
    "yearDisplay": "公元420年—公元589年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 33,
      "lng": 114
    },
    "summary": "南朝宋齐梁陈相继，北朝北魏统一后分裂东西魏，民族大融合，佛教鼎盛。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-dongjin",
      "sui-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "dynasty-wudaishi",
    "title": "五代十国",
    "year": 950,
    "yearDisplay": "公元907年—公元960年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 34,
      "lng": 113
    },
    "summary": "唐亡后中原五代相继，南方十国割据，战乱频繁，后周柴荣早逝，赵匡胤陈桥兵变建宋。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "song-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "dynasty-liao",
    "title": "辽朝",
    "year": 1004,
    "yearDisplay": "公元916年—公元1125年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 41.8,
      "lng": 118.9
    },
    "summary": "契丹族耶律阿保机建立，南北面官制，与北宋澶渊之盟约为兄弟之国，被金所灭。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "dynasty-jin"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "dynasty-xixia",
    "title": "西夏",
    "year": 1038,
    "yearDisplay": "公元1038年—公元1227年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 38.5,
      "lng": 106.3
    },
    "summary": "党项族李元昊建立，创制西夏文，与宋辽金长期周旋，立国189年被蒙古所灭。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "mongol-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "dynasty-jin",
    "title": "金朝",
    "year": 1153,
    "yearDisplay": "公元1115年—公元1234年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "女真族完颜阿骨打建立，灭辽灭北宋，与南宋对峙，金世宗大定之治为鼎盛，被蒙古所灭。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-liao",
      "song-dynasty",
      "mongol-empire",
      "jingkang"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "dynasty-republic",
    "title": "中华民国",
    "year": 1912,
    "yearDisplay": "公元1912年—公元1949年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "industrial",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "孙中山领导辛亥革命推翻清朝，建立亚洲第一个共和国，历经北洋政府、国民政府，最终退守台湾。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "xinhai-revolution",
      "xinhai-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "event-zhenguan",
    "title": "贞观之治",
    "year": 630,
    "yearDisplay": "公元627年—公元649年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "唐太宗李世民在位期间的治世，政治清明、经济复苏、文化繁荣，被尊为天可汗。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "person-taizong",
      "event-kaiyuan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "event-kaiyuan",
    "title": "开元盛世",
    "year": 730,
    "yearDisplay": "公元713年—公元741年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "唐玄宗开元年间的盛世，唐朝巅峰，中国封建社会最繁荣时期之一，诗歌艺术全面繁荣。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "person-taizong",
      "an-shi-rebellion",
      "person-libai",
      "person-dufu",
      "event-zhenguan",
      "china-kaihuang-zhi",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "event-zhenghe",
    "title": "郑和下西洋",
    "year": 1405,
    "yearDisplay": "公元1405年—公元1433年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture",
      "science"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 26,
      "lng": 119.3
    },
    "summary": "明成祖派郑和率庞大船队七次下西洋，世界航海史壮举，比哥伦布早87年。",
    "disputed": "郑和宝船的具体尺寸（史载\"长四十四丈、宽十八丈\"）学界存在争议。部分学者认为木结构帆船难以达到如此规模，实际尺寸可能较小。航行路线与到达范围也有不同说法（如是否到达美洲等）。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "ming-dynasty",
      "person-zhu-yuanzhang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "event-kangqian",
    "title": "康乾盛世",
    "year": 1750,
    "yearDisplay": "公元1661年—公元1796年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "康熙雍正乾隆三朝约130余年的盛世，中国封建社会最后一个盛世，奠定现代中国版图基础。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "person-kangxi",
      "event-opium-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "event-opium-war",
    "title": "鸦片战争",
    "year": 1840,
    "yearDisplay": "公元1840年—公元1842年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 22.5,
      "lng": 113.9
    },
    "summary": "英国对中国发动的侵略战争，中国近代史的开端，《南京条约》是第一个不平等条约。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "event-kangqian",
      "qing-dynasty",
      "person-linxun"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "myth-pangu",
    "title": "盘古",
    "year": -5000,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113.6
    },
    "type": "myth",
    "summary": "中国创世神话中的开天辟地之神，死后身体化为世间万物。",
    "disputed": "盘古为中国古代神话传说人物，非历史人物。创世神话是人类对宇宙起源的想象与解释，各文明均有类似创世神话。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-nuwa",
      "myth-fuxi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-nuwa",
    "title": "女娲",
    "year": -4900,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113.6
    },
    "type": "myth",
    "summary": "中国上古神话中的创世女神和人类始祖，抟土造人、炼石补天。",
    "disputed": "女娲为中国古代神话传说人物，非历史人物。抟土造人、炼石补天等均为神话传说，反映了上古人类对自身起源和自然灾变的想象与解释。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-pangu",
      "myth-fuxi",
      "myth-gonggong"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-fuxi",
    "title": "伏羲",
    "year": -4800,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113.6
    },
    "type": "myth",
    "summary": "三皇之首，人文始祖，始画八卦，教民渔猎，定嫁娶之礼。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-nuwa",
      "myth-shennong",
      "myth-huangdi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-shennong",
    "title": "神农（炎帝）",
    "year": -4700,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "culture",
      "science"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 32,
      "lng": 110.5
    },
    "type": "myth",
    "summary": "即炎帝，中华民族共同始祖，教民耕种、亲尝百草，是农业和医药之神。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-huangdi",
      "myth-fuxi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-huangdi",
    "title": "黄帝",
    "year": -2717,
    "yearDisplay": "传说时代（约前2,717年—前2,599年）",
    "civilization": "china",
    "categories": [
      "myth",
      "politics",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 35.6,
      "lng": 109.3
    },
    "summary": "姬姓轩辕氏，五帝之首，中华民族人文初祖，统一中原，诸多发明创造。",
    "description": "",
    "disputed": "黄帝是中国古史传说中的人物，与炎帝并称为华夏人文初祖；其事迹主要见于后世文献，考古学上尚无同期证据可直接对应。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-shennong",
      "myth-chiyou",
      "myth-zhuanxu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-chiyou",
    "title": "蚩尤",
    "year": -2600,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "military"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 36,
      "lng": 115
    },
    "type": "myth",
    "summary": "九黎部落联盟首领，兵主战神，与黄帝战于涿鹿，战败被杀。",
    "description": "",
    "disputed": "蚩尤是中国上古神话传说人物，与黄帝的战争记载主要见于后世文献，缺乏同期史料佐证。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-huangdi",
      "myth-shennong"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-zhuanxu",
    "title": "颛顼",
    "year": -2500,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "politics"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 35.5,
      "lng": 113
    },
    "type": "myth",
    "summary": "五帝之一，黄帝之孙，号高阳氏，绝地天通，改革宗教和历法。",
    "description": "",
    "disputed": "颛顼是中国古史传说中的五帝之一，属传说人物，尚无同期考古与文字证据可证。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-huangdi",
      "myth-gonggong",
      "myth-diku"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-diku",
    "title": "帝喾",
    "year": -2400,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "politics"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113
    },
    "type": "myth",
    "summary": "五帝之一，黄帝曾孙，号高辛氏，仁惠诚信，前接炎黄后启尧舜。",
    "description": "",
    "disputed": "帝喾是中国古史传说中的五帝之一，属传说人物，其事迹主要载于后世文献。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-zhuanxu",
      "myth-yao",
      "myth-shun"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-yao",
    "title": "尧",
    "year": -2300,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "politics"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 35.5,
      "lng": 112.5
    },
    "type": "myth",
    "summary": "五帝之一，号陶唐氏，设官定历，禅让于舜，是儒家推崇的圣王典范。",
    "description": "",
    "disputed": "尧是中国古史传说中的圣王，禅让制的记载主要见于战国以后文献，学界对其历史真实性存争议。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-diku",
      "myth-shun",
      "myth-yu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-shun",
    "title": "舜",
    "year": -2200,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "politics"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 25.5,
      "lng": 111.5
    },
    "type": "myth",
    "summary": "五帝之一，号有虞氏，以孝闻名，禅位于禹，是儒家德治的典范。",
    "description": "",
    "disputed": "舜是中国古史传说中的圣王，尧帝禅让的记载主要见于后世文献，学界对传说与史实的边界仍有讨论。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-yao",
      "myth-yu",
      "myth-huangdi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-yu",
    "title": "禹",
    "year": -2070,
    "yearDisplay": "传说时代（约前2,070年建夏）",
    "civilization": "china",
    "categories": [
      "myth",
      "politics",
      "science"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 34.7,
      "lng": 112.7
    },
    "summary": "夏朝奠基者，大禹治水，三过家门而不入，划定九州，铸九鼎，建夏朝。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-shun",
      "dynasty-xia",
      "myth-yao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-zhurong",
    "title": "祝融",
    "year": -4500,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 28.2,
      "lng": 112.9
    },
    "type": "myth",
    "summary": "中国神话中的火神、南方之神，本名重黎，帝喾时居火正，能光融天下。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-gonggong",
      "myth-zhuanxu",
      "myth-nuwa"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-gonggong",
    "title": "共工",
    "year": -4500,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 36,
      "lng": 114
    },
    "type": "myth",
    "summary": "中国神话中的水神，人面蛇身朱发，与颛顼争帝怒触不周山，天柱折地维绝。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-zhurong",
      "myth-nuwa",
      "myth-zhuanxu"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-houyi",
    "title": "后羿",
    "year": -2300,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 36.5,
      "lng": 117
    },
    "type": "myth",
    "summary": "中国神话中的神射手，射日除害，妻子嫦娥奔月，留千古佳话。",
    "description": "",
    "disputed": "后羿射日是中国上古神话传说，历史上的有穷氏后羿与神话中的羿形象常被混同，需加以区分。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-change",
      "myth-yao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-change",
    "title": "嫦娥",
    "year": -2300,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 37,
      "lng": 115
    },
    "type": "myth",
    "summary": "月宫仙子，后羿之妻，偷吃不死药奔月，独居广寒宫，中秋节拜月的由来。",
    "description": "",
    "disputed": "嫦娥奔月是中国上古神话传说，属民间文学创作，非历史记载。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-houyi",
      "myth-yao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "person-qinshihuang",
    "title": "秦始皇·嬴政",
    "year": -221,
    "yearDisplay": "前259年—前210年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "中国第一个大一统帝国的建立者，千古一帝，书同文车同轨，奠定两千年帝制格局。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "dynasty-warring-states",
      "qin-unification",
      "qin-unification"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-hanwudi",
    "title": "汉武帝·刘彻",
    "year": -100,
    "yearDisplay": "前156年—前87年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "西汉第七位皇帝，在位54年，雄才大略，汉朝鼎盛，汉民族称谓由此而来。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "china-zhangqian",
      "person-qinshihuang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-cao-cao",
    "title": "曹操",
    "year": 200,
    "yearDisplay": "公元155年—公元220年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 33.9,
      "lng": 115.8
    },
    "summary": "东汉末年杰出的政治家、军事家、文学家，曹魏政权奠基人，建安文学领袖。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-sanguo",
      "person-zhugeliang",
      "person-taizong"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-zhugeliang",
    "title": "诸葛亮",
    "year": 228,
    "yearDisplay": "公元181年—公元234年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 32,
      "lng": 112.1
    },
    "summary": "蜀汉丞相，智慧与忠诚的象征，鞠躬尽瘁死而后已，千古人臣典范。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-sanguo",
      "person-cao-cao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-taizong",
    "title": "唐太宗·李世民",
    "year": 630,
    "yearDisplay": "公元598年—公元649年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "唐朝第二位皇帝，贞观之治开创者，中国历史上最杰出的帝王之一，被尊为天可汗。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-zhenguan",
      "event-kaiyuan",
      "person-wuzetian",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-wuzetian",
    "title": "武则天",
    "year": 690,
    "yearDisplay": "公元624年—公元705年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.7,
      "lng": 112.4
    },
    "summary": "中国历史上唯一的正统女皇帝，14岁入宫，67岁称帝，在位15年，立无字碑。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-taizong",
      "event-kaiyuan",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-libai",
    "title": "李白",
    "year": 750,
    "yearDisplay": "公元701年—公元762年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 31.7,
      "lng": 104.7
    },
    "summary": "唐代最伟大的浪漫主义诗人，诗仙，诗风豪放飘逸想象瑰丽，存诗近千首。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-dufu",
      "event-kaiyuan",
      "an-shi-rebellion",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-dufu",
    "title": "杜甫",
    "year": 760,
    "yearDisplay": "公元712年—公元770年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 30.7,
      "lng": 104
    },
    "summary": "唐代最伟大的现实主义诗人，诗圣，其诗被称为诗史，忧国忧民，存诗1400余首。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-libai",
      "an-shi-rebellion",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-songtaizu",
    "title": "宋太祖·赵匡胤",
    "year": 960,
    "yearDisplay": "公元927年—公元976年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.8,
      "lng": 114.3
    },
    "summary": "宋朝开国皇帝，陈桥兵变黄袍加身，杯酒释兵权，开创宋朝三百年基业。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "dynasty-wudaishi",
      "dynasty-liao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-chengjisihan",
    "title": "成吉思汗·铁木真",
    "year": 1206,
    "yearDisplay": "公元1162年—公元1227年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 47.9,
      "lng": 107
    },
    "summary": "蒙古帝国创建者，世界历史上最伟大的军事统帅之一，一代天骄。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "yuan-dynasty",
      "dynasty-jin",
      "dynasty-xixia"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "person-zhu-yuanzhang",
    "title": "朱元璋",
    "year": 1368,
    "yearDisplay": "公元1328年—公元1398年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "明朝开国皇帝，出身最卑微的开国皇帝，从乞丐到帝王，逆袭传奇。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "event-zhenghe",
      "yuan-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "person-kangxi",
    "title": "康熙·玄烨",
    "year": 1685,
    "yearDisplay": "公元1654年—公元1722年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "清朝入关后第二位皇帝，在位61年，中国历史上在位时间最长的皇帝，开创康乾盛世。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "event-kangqian",
      "qing-dynasty",
      "event-opium-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "myth-xiyouji",
    "title": "西游记神话体系",
    "year": 1592,
    "yearDisplay": "明代（文学作品）",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "medieval",
    "type": "myth",
    "location": {
      "lat": 34.5,
      "lng": 108.9
    },
    "summary": "以吴承恩《西游记》为核心的神魔小说体系，孙悟空大闹天宫、唐僧西天取经、九九八十一难。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "myth-daojiao",
      "myth-shanhaijing",
      "person-libai"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "myth-shanhaijing",
    "title": "山海经神话体系",
    "year": -300,
    "yearDisplay": "战国至汉代（文献成书）",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "中国先秦古籍，保存了大量上古神话，夸父逐日、精卫填海、刑天舞干戚、女娲补天。",
    "description": "",
    "disputed": "《山海经》是中国上古神话地理文献，内容包含大量神话传说与地理想象，不宜视为信史。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "myth-nuwa",
      "myth-houyi",
      "myth-gonggong",
      "myth-zhurong",
      "myth-xiyouji"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-daojiao",
    "title": "道教神系",
    "year": 142,
    "yearDisplay": "东汉以来",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "classical",
    "type": "myth",
    "location": {
      "lat": 32.7,
      "lng": 108.5
    },
    "summary": "中国本土宗教道教的神仙体系，三清四御、玉皇大帝、八仙过海、得道成仙。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "myth-xiyouji",
      "myth-shanhaijing",
      "person-hanwudi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "minos-civilization",
    "title": "米诺斯文明",
    "year": -2700,
    "yearDisplay": "前2,700年—前1,450年",
    "civilization": "europe",
    "categories": [
      "culture",
      "artifact",
      "politics"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 35.3,
      "lng": 25.1
    },
    "summary": "欧洲最早的文明，以克里特岛为中心，克诺索斯宫有\"迷宫\"之称，使用线形文字A，因锡拉火山喷发和迈锡尼入侵而衰落。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "mycenaean-civilization",
      "trojan-war",
      "myth-greek",
      "mycenaean-civilization",
      "ancient-phoenicia",
      "greek-city-states",
      "ancient-hellenistic-era"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "mycenaean-civilization",
    "title": "迈锡尼文明",
    "year": -1600,
    "yearDisplay": "前1,600年—前1,100年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture",
      "artifact"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 37.7,
      "lng": 22.8
    },
    "summary": "希腊本土青铜时代文明，以迈锡尼、梯林斯为中心，使用线形文字B，建造巨石城堡（独眼巨人墙），前1200年左右衰亡。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "minos-civilization",
      "trojan-war",
      "greek-city-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "greek-city-states",
    "title": "希腊城邦",
    "year": -800,
    "yearDisplay": "前800年—前338年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture",
      "military"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 37.9,
      "lng": 23.7
    },
    "summary": "古风和古典时代希腊世界的政治形态，数百个独立城邦，雅典民主制与斯巴达军事寡头交相辉映，诞生了哲学戏剧史学等伟大成就。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-alexander",
      "persian-empire",
      "myth-greek",
      "roman-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "alexander-empire",
    "title": "亚历山大帝国",
    "year": -336,
    "yearDisplay": "前336年—前323年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 31.2,
      "lng": 29.9
    },
    "summary": "亚历山大大帝建立的横跨欧亚非的大帝国，33岁病逝于巴比伦，帝国随即分裂，开启了希腊化时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-alexander",
      "greek-city-states",
      "persian-empire",
      "roman-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "roman-republic",
    "title": "罗马共和国",
    "year": -509,
    "yearDisplay": "前509年—前27年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "罗马从城邦发展为地中海霸主的共和时期，元老院、执政官、公民大会三权分立，前27年屋大维成为奥古斯都，共和国终结。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "person-julius-caesar",
      "person-augustus",
      "greek-city-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "roman-empire",
    "title": "罗马帝国",
    "year": -27,
    "yearDisplay": "前27年—公元395年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "以地中海为内湖的超级帝国，罗马和平时期经济文化繁荣，395年分裂为东西两部分，476年西罗马帝国灭亡。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-republic",
      "byzantine-empire",
      "person-augustus",
      "person-julius-caesar",
      "person-constantine"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "byzantine-empire",
    "title": "拜占庭帝国",
    "year": 395,
    "yearDisplay": "公元395年—公元1453年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 41,
      "lng": 28.9
    },
    "summary": "东罗马帝国，延续千年的中世纪帝国，以君士坦丁堡为首都，保存了古希腊罗马文化，1453年被奥斯曼帝国灭亡。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "roman-empire",
      "ottoman-empire",
      "crusades",
      "arab-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "carolingian-empire",
    "title": "查理曼帝国",
    "year": 768,
    "yearDisplay": "公元768年—公元843年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 50.9,
      "lng": 6.9
    },
    "summary": "查理曼建立的西欧大帝国，800年加冕为罗马人的皇帝，843年三分帝国形成法德意雏形。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-charlemagne",
      "holy-roman-empire",
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "holy-roman-empire",
    "title": "神圣罗马帝国",
    "year": 962,
    "yearDisplay": "公元962年—公元1806年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 50.1,
      "lng": 8.7
    },
    "summary": "以德意志为核心的中世纪欧洲帝国，奥托一世加冕称帝，伏尔泰评价\"既不神圣、也不罗马、更非帝国\"，1806年被拿破仑解散。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "carolingian-empire",
      "person-napoleon",
      "protestant-reformation",
      "crusades",
      "black-death"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "viking-age",
    "title": "维京时代",
    "year": 793,
    "yearDisplay": "公元793年—公元1066年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 59.9,
      "lng": 10.7
    },
    "summary": "斯堪的纳维亚海盗时代，维京人驾驶长船劫掠、贸易和殖民，足迹从北美到里海，深刻影响了中世纪欧洲。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "myth-norse",
      "carolingian-empire",
      "holy-roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "spanish-empire",
    "title": "西班牙帝国",
    "year": 1492,
    "yearDisplay": "公元1492年—公元1898年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "science"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 40.4,
      "lng": -3.7
    },
    "summary": "第一个日不落帝国，通过大航海和殖民征服美洲获取巨额黄金白银，16世纪达到鼎盛，1898年美西战争后衰落。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "age-of-exploration",
      "aztec-empire",
      "inca-empire",
      "british-empire",
      "maya-civilization"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "british-empire",
    "title": "大英帝国",
    "year": 1588,
    "yearDisplay": "公元1588年—公元1997年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "science"
    ],
    "eraId": "industrial",
    "type": "dynasty",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "历史上最大的殖民帝国，疆域最大时占世界陆地面积四分之一，被称为日不落帝国，工业革命后称霸世界。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "age-of-exploration",
      "person-napoleon",
      "mughal-empire",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "russian-empire",
    "title": "俄罗斯帝国",
    "year": 1721,
    "yearDisplay": "公元1721年—公元1917年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "industrial",
    "type": "dynasty",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "彼得大帝建立的俄罗斯帝国，从东欧小国扩张为横跨欧亚的超级大国，1917年二月革命后终结。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "person-napoleon",
      "ottoman-empire",
      "holy-roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "renaissance",
    "title": "文艺复兴",
    "year": 1350,
    "yearDisplay": "公元1350年—公元1600年",
    "civilization": "europe",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 43.8,
      "lng": 11.2
    },
    "summary": "14-16世纪发源于意大利的文化运动，复兴古希腊罗马文化，诞生了达芬奇、米开朗基罗、拉斐尔等巨匠。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "age-of-exploration",
      "protestant-reformation",
      "black-death",
      "byzantine-empire",
      "sci-scientific-revolution",
      "enlightenment"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "assyrian-empire",
    "title": "亚述帝国",
    "year": -911,
    "yearDisplay": "前911年—前612年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 36.3,
      "lng": 43.1
    },
    "summary": "两河流域北部的军事帝国，以穷兵黩武和残暴著称，亚述巴尼拔建立了人类最早的系统图书馆。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "babylon",
      "persian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "persian-empire",
    "title": "波斯第一帝国",
    "year": -550,
    "yearDisplay": "前550年—前330年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 30.2,
      "lng": 52.9
    },
    "summary": "又称阿契美尼德王朝，人类历史上第一个横跨欧亚非的大帝国，以宗教宽容和行省自治著称。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "person-cyrus",
      "alexander-empire",
      "greek-city-states",
      "arab-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "arab-empire",
    "title": "阿拉伯帝国",
    "year": 632,
    "yearDisplay": "公元632年—公元1258年",
    "civilization": "middleEast",
    "categories": [
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 33.3,
      "lng": 44.4
    },
    "summary": "穆罕默德创立伊斯兰教后阿拉伯人建立的帝国，阿拔斯王朝时期伊斯兰黄金时代学术繁荣。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "persian-empire",
      "ottoman-empire",
      "gupta-empire",
      "byzantine-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "ottoman-empire",
    "title": "奥斯曼帝国",
    "year": 1299,
    "yearDisplay": "公元1299年—公元1922年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 41,
      "lng": 28.9
    },
    "summary": "奥斯曼土耳其人建立的帝国，1453年攻陷君士坦丁堡灭亡拜占庭，苏莱曼一世时期达到鼎盛。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "byzantine-empire",
      "arab-empire",
      "age-of-exploration",
      "russian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "indus-valley-civilization",
    "title": "印度河文明",
    "year": -2600,
    "yearDisplay": "前2,600年—前1,900年",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "artifact",
      "science"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 30.3,
      "lng": 70.9
    },
    "summary": "又称哈拉帕文明，四大古文明之一，以惊人的城市规划和地下排水系统著称。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "maurya-empire",
      "sumer",
      "myth-egyptian",
      "aryan-invasion"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "maurya-empire",
    "title": "孔雀王朝",
    "year": -322,
    "yearDisplay": "前322年—前185年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 25.6,
      "lng": 85.1
    },
    "summary": "印度历史上第一个大一统帝国，阿育王时期达到鼎盛，皈依佛教后将佛教发展为世界性宗教。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-ashoka",
      "gupta-empire",
      "alexander-empire",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "gupta-empire",
    "title": "笈多王朝",
    "year": 320,
    "yearDisplay": "公元320年—公元550年",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 25.6,
      "lng": 85.1
    },
    "summary": "印度古典文化的黄金时代，被称为印度的文艺复兴，数学天文学成就惊人，发明了0的概念和十进制。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "maurya-empire",
      "arab-empire",
      "mughal-empire",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "mughal-empire",
    "title": "莫卧儿帝国",
    "year": 1526,
    "yearDisplay": "公元1526年—公元1857年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "culture",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 27.2,
      "lng": 78
    },
    "summary": "突厥化蒙古人在印度建立的帝国，阿克巴大帝推行宗教宽容，沙贾汗时期建筑艺术巅峰（泰姬陵）。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "maurya-empire",
      "gupta-empire",
      "british-empire",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "maya-civilization",
    "title": "玛雅文明",
    "year": -2000,
    "yearDisplay": "前2,000年—公元1500年",
    "civilization": "america",
    "categories": [
      "culture",
      "science",
      "artifact"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 17.2,
      "lng": -89.6
    },
    "summary": "中美洲最辉煌的古文明，数学上独立发明0的概念，天文观测精确，创制象形文字和历法。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "aztec-empire",
      "inca-empire",
      "spanish-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "aztec-empire",
    "title": "阿兹特克帝国",
    "year": 1325,
    "yearDisplay": "公元1325年—公元1521年",
    "civilization": "america",
    "categories": [
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 19.4,
      "lng": -99.1
    },
    "summary": "墨西加人在墨西哥中部建立的帝国，首都特诺奇蒂特兰是当时世界最大城市之一，1521年被科尔特斯摧毁。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "maya-civilization",
      "inca-empire",
      "spanish-empire",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "inca-empire",
    "title": "印加帝国",
    "year": 1438,
    "yearDisplay": "公元1438年—公元1533年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -13.5,
      "lng": -71.9
    },
    "summary": "美洲最大的前哥伦布时期帝国，沿安第斯山脉延伸4000公里，道路系统长达4万公里，使用奇普结绳记事。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "maya-civilization",
      "aztec-empire",
      "spanish-empire",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "person-alexander",
    "title": "亚历山大大帝",
    "year": -356,
    "yearDisplay": "前356年—前323年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 40.9,
      "lng": 22.9
    },
    "summary": "马其顿国王，历史上最伟大的军事统帅之一，东征建立横跨欧亚非的大帝国，33岁病逝于巴比伦，开启了希腊化时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "alexander-empire",
      "greek-city-states",
      "persian-empire",
      "person-cyrus"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-julius-caesar",
    "title": "尤利乌斯·凯撒",
    "year": -100,
    "yearDisplay": "前100年—前44年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "罗马共和国末期军事统帅、政治家，征服高卢，渡过卢比孔河击败庞培成为终身独裁官，是罗马帝国的奠基者。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-republic",
      "roman-empire",
      "person-augustus"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-augustus",
    "title": "奥古斯都·屋大维",
    "year": -63,
    "yearDisplay": "前63年—公元14年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "罗马帝国开国皇帝，凯撒的甥孙和养子，击败安东尼后统一罗马，以元首制开创了200年的罗马和平时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-julius-caesar",
      "roman-empire",
      "roman-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-constantine",
    "title": "君士坦丁大帝",
    "year": 272,
    "yearDisplay": "公元272年—公元337年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 41,
      "lng": 28.9
    },
    "summary": "罗马帝国皇帝，使基督教从受迫害宗教转变为帝国主导宗教的关键人物，发布米兰敕令，建新都君士坦丁堡。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "byzantine-empire",
      "crusades",
      "rome-diocletian-tetrarchy",
      "idea-christianity",
      "western-rome-fall",
      "constantinople-fall"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-charlemagne",
    "title": "查理曼",
    "year": 742,
    "yearDisplay": "公元742年—公元814年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 50.9,
      "lng": 6.9
    },
    "summary": "法兰克国王、查理曼帝国创建者，被称为欧洲之父，800年加冕为罗马人的皇帝，推行加洛林文艺复兴。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "carolingian-empire",
      "holy-roman-empire",
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "person-napoleon",
    "title": "拿破仑·波拿巴",
    "year": 1769,
    "yearDisplay": "公元1769年—公元1821年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 41.9,
      "lng": 8.7
    },
    "summary": "法兰西第一帝国皇帝，近代最伟大的军事家和立法者之一，颁布拿破仑法典奠定大陆法系基石。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "holy-roman-empire",
      "british-empire",
      "russian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-cyrus",
    "title": "居鲁士大帝",
    "year": -590,
    "yearDisplay": "前590年—前530年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "ancient",
    "type": "person",
    "location": {
      "lat": 30.2,
      "lng": 52.9
    },
    "summary": "波斯阿契美尼德王朝缔造者，万王之王，实行宽容政策，居鲁士圆柱被认为是人类最早的人权宣言之一。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "persian-empire",
      "person-alexander",
      "sumer"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "person-ashoka",
    "title": "阿育王",
    "year": -304,
    "yearDisplay": "前304年—前232年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 25.6,
      "lng": 85.1
    },
    "summary": "孔雀王朝第三代皇帝，佛教史上最重要的护法君主，征服羯陵伽后皈依佛教，以达摩治国，将佛教传播为世界性宗教。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "maurya-empire",
      "gupta-empire",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "myth-greek",
    "title": "希腊神话体系",
    "year": -4000,
    "yearDisplay": "古代",
    "civilization": "europe",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 37.9,
      "lng": 23.7
    },
    "summary": "古希腊人的神话和宗教体系，是西方文明最重要的神话源头，以奥林匹斯十二主神和众多英雄传说著称。",
    "description": "",
    "disputed": "希腊奥林匹斯诸神是古希腊神话中的神祇体系，属神话传说而非历史人物。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "greek-city-states",
      "trojan-war",
      "minos-civilization",
      "myth-norse"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-norse",
    "title": "北欧神话体系",
    "year": 500,
    "yearDisplay": "中世纪",
    "civilization": "europe",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "medieval",
    "type": "myth",
    "location": {
      "lat": 59.9,
      "lng": 10.7
    },
    "summary": "斯堪的纳维亚和日耳曼民族的神话体系，充满宿命论和悲壮色彩，以奥丁、托尔等神祇和诸神黄昏概念著称。",
    "description": "",
    "disputed": "北欧诸神是北欧神话中的神祇体系，属古代日耳曼人的神话传说，非历史记载。",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "viking-age",
      "myth-greek",
      "myth-egyptian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "myth-egyptian",
    "title": "埃及神话体系",
    "year": -4000,
    "yearDisplay": "古代",
    "civilization": "africa",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 25.7,
      "lng": 32.6
    },
    "summary": "古埃及宗教神话体系，延续3000多年，神祇多为人身兽首，以拉、奥西里斯、伊西斯、荷鲁斯等为核心。",
    "description": "",
    "disputed": "古埃及诸神是古埃及宗教中的神祇体系，属神话与宗教信仰范畴。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "aksum-empire",
      "myth-greek"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-indian",
    "title": "印度神话体系",
    "year": -4000,
    "yearDisplay": "古代",
    "civilization": "southAsia",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 25.6,
      "lng": 85.1
    },
    "summary": "印度教神话体系，世界上最古老且仍在活跃的宗教神话传统之一，以梵天、毗湿奴、湿婆三大主神和两大史诗著称。",
    "description": "",
    "disputed": "印度教诸神是印度教神话与宗教信仰中的神祇体系，其形象与事迹经历代文献演化。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "maurya-empire",
      "person-ashoka",
      "gupta-empire",
      "mughal-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "trojan-war",
    "title": "特洛伊战争",
    "year": -1200,
    "yearDisplay": "约前1,200年",
    "civilization": "europe",
    "categories": [
      "military",
      "myth"
    ],
    "eraId": "ancient",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 26.2
    },
    "summary": "荷马史诗《伊利亚特》记载的希腊联军与特洛伊城之间的十年战争，以木马计攻陷特洛伊告终。",
    "description": "",
    "disputed": "特洛伊战争的史实性在学界有长期讨论，《荷马史诗》中神与人交织的叙事属文学与神话创作，考古发现的特洛伊遗址与史诗记载的对应关系仍有争议。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "mycenaean-civilization",
      "myth-greek",
      "minos-civilization",
      "greek-city-states",
      "alexander",
      "greco-persian-wars"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "crusades",
    "title": "十字军东征",
    "year": 1096,
    "yearDisplay": "公元1096年—公元1291年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 31.8,
      "lng": 35.2
    },
    "summary": "西欧天主教国家对地中海东岸穆斯林地区发动的一系列宗教战争，共八次持续近200年。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "byzantine-empire",
      "holy-roman-empire",
      "arab-empire",
      "ottoman-empire",
      "mongol-conquests"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "black-death",
    "title": "黑死病",
    "year": 1347,
    "yearDisplay": "公元1347年—公元1351年",
    "civilization": "europe",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 43.7,
      "lng": 11.2
    },
    "summary": "人类历史上最致命的瘟疫，1347年从克里米亚传入欧洲，造成约2500-5000万人死亡，加速了封建制度的崩溃。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "protestant-reformation",
      "holy-roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "age-of-exploration",
    "title": "大航海时代",
    "year": 1415,
    "yearDisplay": "公元1415年—公元1650年",
    "civilization": "global",
    "categories": [
      "science",
      "military",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 38.7,
      "lng": -9.1
    },
    "summary": "又称地理大发现，欧洲人开辟新航路发现新大陆的时代，哥伦布发现美洲、麦哲伦船队环球航行，世界从分散走向整体。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "spanish-empire",
      "british-empire",
      "renaissance",
      "aztec-empire",
      "inca-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "protestant-reformation",
    "title": "宗教改革",
    "year": 1517,
    "yearDisplay": "公元1517年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 51.8,
      "lng": 10.5
    },
    "summary": "16世纪欧洲基督教改革运动，马丁·路德张贴《九十五条论纲》反对赎罪券，导致新教诞生和西方基督教永久分裂。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "holy-roman-empire",
      "british-empire",
      "black-death"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  }
];

// 全部节点
export const ALL_HISTORY_NODES_INDEX: IHistoryNodeIndex[] = [
  {
    "id": "australopithecus",
    "title": "南方古猿出现",
    "year": -3000000,
    "yearDisplay": "约300万年前",
    "civilization": "africa",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 9,
      "lng": 35
    },
    "summary": "人类演化的开端，最早的人科动物出现在非洲东部。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "homo-habilis",
      "homo-erectus"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "homo-habilis",
    "title": "能人出现，石器时代开端",
    "year": -2500000,
    "yearDisplay": "约250万年前",
    "civilization": "africa",
    "categories": [
      "science",
      "artifact"
    ],
    "type": "artifact",
    "eraId": "prehistoric",
    "location": {
      "lat": -2,
      "lng": 37
    },
    "summary": "能人开始制造石器工具，旧石器时代正式开始。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "australopithecus",
      "homo-erectus"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "homo-erectus",
    "title": "直立人与火的使用",
    "year": -1700000,
    "yearDisplay": "约170万年前",
    "civilization": "africa",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 39.9,
      "lng": 116
    },
    "summary": "直立人学会使用火，开始走出非洲，北京人、元谋人是其东亚代表。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "homo-habilis",
      "homo-sapiens"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "homo-sapiens",
    "title": "智人出现，尼安德特人共存",
    "year": -300000,
    "yearDisplay": "约30万年前",
    "civilization": "africa",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 32,
      "lng": 7
    },
    "summary": "智人在非洲出现，与尼安德特人等古人类长期共存。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "homo-erectus",
      "out-of-africa"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "out-of-africa",
    "title": "智人走出非洲与认知革命",
    "year": -70000,
    "yearDisplay": "约7万年前",
    "civilization": "africa",
    "categories": [
      "science",
      "culture"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 13,
      "lng": 43
    },
    "summary": "智人走出非洲，认知革命使人类获得虚构故事的能力。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "homo-sapiens",
      "ice-age-end"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "ice-age-end",
    "title": "末次冰期结束",
    "year": -15000,
    "yearDisplay": "约15,000年前",
    "civilization": "global",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 50,
      "lng": 0
    },
    "summary": "末次冰期结束，气候变暖，人类开始定居生活。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "neolithic",
      "out-of-africa"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "neolithic",
    "title": "新石器时代与农业革命",
    "year": -10000,
    "yearDisplay": "约1万年前",
    "civilization": "middleEast",
    "categories": [
      "science",
      "culture"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 33,
      "lng": 36
    },
    "summary": "农业革命开始，小麦和水稻被驯化，人类从采集走向生产。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "ice-age-end",
      "jericho"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "jericho",
    "title": "杰里科等最早城市出现",
    "year": -8000,
    "yearDisplay": "约8000年前",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "artifact"
    ],
    "type": "artifact",
    "eraId": "prehistoric",
    "location": {
      "lat": 31.85,
      "lng": 35.45
    },
    "summary": "耶利哥等人类最早的城市定居点出现，石头城墙和塔楼矗立。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "neolithic",
      "sumer"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "sumer-dawn",
    "title": "苏美尔文明萌芽",
    "year": -6000,
    "yearDisplay": "约6000年前",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "prehistoric",
    "location": {
      "lat": 32,
      "lng": 46
    },
    "summary": "苏美尔人在两河流域建立最早的城邦，铜器时代开始。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "neolithic"
    ],
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "myth-pangu",
    "title": "盘古",
    "year": -5000,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113.6
    },
    "type": "myth",
    "summary": "中国创世神话中的开天辟地之神，死后身体化为世间万物。",
    "disputed": "盘古为中国古代神话传说人物，非历史人物。创世神话是人类对宇宙起源的想象与解释，各文明均有类似创世神话。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-nuwa",
      "myth-fuxi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-nuwa",
    "title": "女娲",
    "year": -4900,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113.6
    },
    "type": "myth",
    "summary": "中国上古神话中的创世女神和人类始祖，抟土造人、炼石补天。",
    "disputed": "女娲为中国古代神话传说人物，非历史人物。抟土造人、炼石补天等均为神话传说，反映了上古人类对自身起源和自然灾变的想象与解释。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-pangu",
      "myth-fuxi",
      "myth-gonggong"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-fuxi",
    "title": "伏羲",
    "year": -4800,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113.6
    },
    "type": "myth",
    "summary": "三皇之首，人文始祖，始画八卦，教民渔猎，定嫁娶之礼。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-nuwa",
      "myth-shennong",
      "myth-huangdi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-shennong",
    "title": "神农（炎帝）",
    "year": -4700,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "culture",
      "science"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 32,
      "lng": 110.5
    },
    "type": "myth",
    "summary": "即炎帝，中华民族共同始祖，教民耕种、亲尝百草，是农业和医药之神。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-huangdi",
      "myth-fuxi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-zhurong",
    "title": "祝融",
    "year": -4500,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 28.2,
      "lng": 112.9
    },
    "type": "myth",
    "summary": "中国神话中的火神、南方之神，本名重黎，帝喾时居火正，能光融天下。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-gonggong",
      "myth-zhuanxu",
      "myth-nuwa"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-gonggong",
    "title": "共工",
    "year": -4500,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 36,
      "lng": 114
    },
    "type": "myth",
    "summary": "中国神话中的水神，人面蛇身朱发，与颛顼争帝怒触不周山，天柱折地维绝。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-zhurong",
      "myth-nuwa",
      "myth-zhuanxu"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-greek",
    "title": "希腊神话体系",
    "year": -4000,
    "yearDisplay": "古代",
    "civilization": "europe",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 37.9,
      "lng": 23.7
    },
    "summary": "古希腊人的神话和宗教体系，是西方文明最重要的神话源头，以奥林匹斯十二主神和众多英雄传说著称。",
    "description": "",
    "disputed": "希腊奥林匹斯诸神是古希腊神话中的神祇体系，属神话传说而非历史人物。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "greek-city-states",
      "trojan-war",
      "minos-civilization",
      "myth-norse"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-egyptian",
    "title": "埃及神话体系",
    "year": -4000,
    "yearDisplay": "古代",
    "civilization": "africa",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 25.7,
      "lng": 32.6
    },
    "summary": "古埃及宗教神话体系，延续3000多年，神祇多为人身兽首，以拉、奥西里斯、伊西斯、荷鲁斯等为核心。",
    "description": "",
    "disputed": "古埃及诸神是古埃及宗教中的神祇体系，属神话与宗教信仰范畴。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "aksum-empire",
      "myth-greek"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-indian",
    "title": "印度神话体系",
    "year": -4000,
    "yearDisplay": "古代",
    "civilization": "southAsia",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 25.6,
      "lng": 85.1
    },
    "summary": "印度教神话体系，世界上最古老且仍在活跃的宗教神话传统之一，以梵天、毗湿奴、湿婆三大主神和两大史诗著称。",
    "description": "",
    "disputed": "印度教诸神是印度教神话与宗教信仰中的神祇体系，其形象与事迹经历代文献演化。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "maurya-empire",
      "person-ashoka",
      "gupta-empire",
      "mughal-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "sumer",
    "title": "苏美尔文明与楔形文字",
    "year": -3500,
    "yearDisplay": "约前3,500年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 31.5,
      "lng": 45
    },
    "summary": "两河流域的苏美尔人创造最早的城邦文明和楔形文字。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer-dawn",
      "akkad",
      "babylon"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "china-liangzhu-civilization",
    "title": "良渚文明",
    "year": -3300,
    "yearDisplay": "约前3,300年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "prehistoric",
    "location": {
      "lat": 30.4,
      "lng": 120
    },
    "summary": "长江下游的良渚文明以精美的玉琮玉璧、宏伟的古城遗址和水利系统实证了中华五千年文明，2019年列入世界遗产，改写了中国文明起源的认识。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "neolithic",
      "xia-dynasty",
      "shang-dynasty",
      "artifact-sanxingdui-tree"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "prehistoric-others"
  },
  {
    "id": "egypt-unification",
    "title": "古埃及统一",
    "year": -3100,
    "yearDisplay": "约前3,100年",
    "civilization": "africa",
    "categories": [
      "politics",
      "artifact"
    ],
    "type": "artifact",
    "eraId": "ancient",
    "location": {
      "lat": 26,
      "lng": 32
    },
    "summary": "美尼斯统一上下埃及，第一王朝建立，三千年法老时代开启。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "moses"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "artifact-jade-cong",
    "title": "良渚玉琮",
    "year": -3000,
    "yearDisplay": "约前3,300年—前2,300年",
    "civilization": "china",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 30.4,
      "lng": 120
    },
    "summary": "良渚文化玉琮，中国最早的玉礼器，五千年文明实证。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "shang-dynasty",
      "artifact-simuwu"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-sanxingdui-civilization",
    "title": "三星堆与古蜀文明",
    "year": -2800,
    "yearDisplay": "约前2,800年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 31,
      "lng": 104.2
    },
    "summary": "四川广汉三星堆遗址出土了青铜神树、大立人、纵目面具等奇特文物，揭示了一个迥异于中原的古蜀青铜文明，改写了中华文明起源的格局。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-liangzhu-civilization",
      "shang-dynasty",
      "xia-dynasty",
      "zhou-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-huangdi",
    "title": "黄帝",
    "year": -2717,
    "yearDisplay": "传说时代（约前2,717年—前2,599年）",
    "civilization": "china",
    "categories": [
      "myth",
      "politics",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 35.6,
      "lng": 109.3
    },
    "summary": "姬姓轩辕氏，五帝之首，中华民族人文初祖，统一中原，诸多发明创造。",
    "description": "",
    "disputed": "黄帝是中国古史传说中的人物，与炎帝并称为华夏人文初祖；其事迹主要见于后世文献，考古学上尚无同期证据可直接对应。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-shennong",
      "myth-chiyou",
      "myth-zhuanxu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "yellow-emperor",
    "title": "黄帝时代",
    "year": -2700,
    "yearDisplay": "约前2,700年",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 35,
      "lng": 109
    },
    "summary": "传说中的黄帝时代，炎黄联盟形成，仓颉造字，中华文明奠基。",
    "disputed": "黄帝属于上古传说人物，其生卒年与具体事迹尚无同时期文字记载可证。现代考古发现（如仰韶文化、龙山文化遗址）可与传说时代部分对应，但具体历史人物仍属传说范畴，非信史。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "xia-dynasty",
      "shang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "minos-civilization",
    "title": "米诺斯文明",
    "year": -2700,
    "yearDisplay": "前2,700年—前1,450年",
    "civilization": "europe",
    "categories": [
      "culture",
      "artifact",
      "politics"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 35.3,
      "lng": 25.1
    },
    "summary": "欧洲最早的文明，以克里特岛为中心，克诺索斯宫有\"迷宫\"之称，使用线形文字A，因锡拉火山喷发和迈锡尼入侵而衰落。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "mycenaean-civilization",
      "trojan-war",
      "myth-greek",
      "mycenaean-civilization",
      "ancient-phoenicia",
      "greek-city-states",
      "ancient-hellenistic-era"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-chiyou",
    "title": "蚩尤",
    "year": -2600,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "military"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 36,
      "lng": 115
    },
    "type": "myth",
    "summary": "九黎部落联盟首领，兵主战神，与黄帝战于涿鹿，战败被杀。",
    "description": "",
    "disputed": "蚩尤是中国上古神话传说人物，与黄帝的战争记载主要见于后世文献，缺乏同期史料佐证。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-huangdi",
      "myth-shennong"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "indus-valley-civilization",
    "title": "印度河文明",
    "year": -2600,
    "yearDisplay": "前2,600年—前1,900年",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "artifact",
      "science"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 30.3,
      "lng": 70.9
    },
    "summary": "又称哈拉帕文明，四大古文明之一，以惊人的城市规划和地下排水系统著称。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "maurya-empire",
      "sumer",
      "myth-egyptian",
      "aryan-invasion"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-ra",
    "title": "拉与埃及九柱神",
    "year": -2600,
    "yearDisplay": "约前2,600年（古王国时期）",
    "civilization": "africa",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 29.8,
      "lng": 32.9
    },
    "summary": "古埃及的太阳神与众神之王，每日驾太阳船穿越天空与冥界，是永恒秩序的化身。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "myth-egyptian",
      "landmark-pyramids",
      "egypt-unification"
    ],
    "important": true,
    "disputed": "",
    "keyPoints": [
      "太阳神，众神之王，玛阿特的化身",
      "每日驾太阳船穿越天空与冥界",
      "九柱神体系的源头",
      "与阿蒙/荷鲁斯等神不断融合"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "landmark-pyramids",
    "title": "吉萨金字塔群",
    "year": -2560,
    "yearDisplay": "约前2,560年",
    "civilization": "africa",
    "categories": [
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 29.98,
      "lng": 31.13
    },
    "summary": "古埃及吉萨高原三大金字塔与狮身人面像，古代世界七大奇迹唯一尚存者。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "artifact-tutankhamun-mask"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "myth-zhuanxu",
    "title": "颛顼",
    "year": -2500,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "politics"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 35.5,
      "lng": 113
    },
    "type": "myth",
    "summary": "五帝之一，黄帝之孙，号高阳氏，绝地天通，改革宗教和历法。",
    "description": "",
    "disputed": "颛顼是中国古史传说中的五帝之一，属传说人物，尚无同期考古与文字证据可证。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-huangdi",
      "myth-gonggong",
      "myth-diku"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "building-stonehenge",
    "title": "巨石阵",
    "year": -2500,
    "yearDisplay": "约前3,000年—前1,600年",
    "civilization": "europe",
    "categories": [
      "artifact"
    ],
    "eraId": "ancient",
    "type": "artifact",
    "location": {
      "lat": 51.18,
      "lng": -1.83
    },
    "summary": "英国最著名的史前巨石建筑，夏至日出精确对齐，建造之谜至今未解。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "landmark-pyramids",
      "indus-valley-civilization"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-diku",
    "title": "帝喾",
    "year": -2400,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "politics"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113
    },
    "type": "myth",
    "summary": "五帝之一，黄帝曾孙，号高辛氏，仁惠诚信，前接炎黄后启尧舜。",
    "description": "",
    "disputed": "帝喾是中国古史传说中的五帝之一，属传说人物，其事迹主要载于后世文献。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-zhuanxu",
      "myth-yao",
      "myth-shun"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-osiris",
    "title": "奥西里斯与冥府审判",
    "year": -2400,
    "yearDisplay": "约前2,400年（金字塔铭文时期）",
    "civilization": "africa",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 27.2,
      "lng": 33.8
    },
    "summary": "埃及冥神与死者审判者，被弟弟塞特杀害又被儿子荷鲁斯复仇，象征死而复生与永恒。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "myth-ra",
      "myth-egyptian",
      "landmark-pyramids"
    ],
    "important": true,
    "disputed": "",
    "keyPoints": [
      "被弟弟塞特杀害，尸身被切成十四块",
      "木乃伊神话的起源",
      "儿子荷鲁斯复仇夺回王位",
      "冥府称心审判，《死者之书》的宗教背景"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "akkad",
    "title": "阿卡德帝国",
    "year": -2300,
    "yearDisplay": "约前2,300年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 33,
      "lng": 44
    },
    "summary": "萨尔贡建立人类历史上第一个帝国，统一两河流域。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "babylon"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-yao",
    "title": "尧",
    "year": -2300,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "politics"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 35.5,
      "lng": 112.5
    },
    "type": "myth",
    "summary": "五帝之一，号陶唐氏，设官定历，禅让于舜，是儒家推崇的圣王典范。",
    "description": "",
    "disputed": "尧是中国古史传说中的圣王，禅让制的记载主要见于战国以后文献，学界对其历史真实性存争议。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-diku",
      "myth-shun",
      "myth-yu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-houyi",
    "title": "后羿",
    "year": -2300,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 36.5,
      "lng": 117
    },
    "type": "myth",
    "summary": "中国神话中的神射手，射日除害，妻子嫦娥奔月，留千古佳话。",
    "description": "",
    "disputed": "后羿射日是中国上古神话传说，历史上的有穷氏后羿与神话中的羿形象常被混同，需加以区分。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-change",
      "myth-yao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-change",
    "title": "嫦娥",
    "year": -2300,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 37,
      "lng": 115
    },
    "type": "myth",
    "summary": "月宫仙子，后羿之妻，偷吃不死药奔月，独居广寒宫，中秋节拜月的由来。",
    "description": "",
    "disputed": "嫦娥奔月是中国上古神话传说，属民间文学创作，非历史记载。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-houyi",
      "myth-yao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-shun",
    "title": "舜",
    "year": -2200,
    "yearDisplay": "传说时代",
    "civilization": "china",
    "categories": [
      "myth",
      "politics"
    ],
    "eraId": "ancient",
    "location": {
      "lat": 25.5,
      "lng": 111.5
    },
    "type": "myth",
    "summary": "五帝之一，号有虞氏，以孝闻名，禅位于禹，是儒家德治的典范。",
    "description": "",
    "disputed": "舜是中国古史传说中的圣王，尧帝禅让的记载主要见于后世文献，学界对传说与史实的边界仍有讨论。",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-yao",
      "myth-yu",
      "myth-huangdi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-gilgamesh",
    "title": "吉尔伽美什史诗",
    "year": -2100,
    "yearDisplay": "约前2,100年（苏美尔版）",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 31.3,
      "lng": 45.8
    },
    "summary": "人类最古老的史诗之一，吉尔伽美什与恩基杜的友谊、对永生的追寻与大洪水传说。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "artifact-hammurabi",
      "egypt-unification"
    ],
    "important": true,
    "disputed": "",
    "keyPoints": [
      "人类最古老的史诗，十二块泥板",
      "吉尔伽美什与恩基杜的友谊",
      "大洪水故事与诺亚方舟同源",
      "探讨死亡与永生的主题"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "xia-dynasty",
    "title": "夏朝建立",
    "year": -2070,
    "yearDisplay": "约前2,070年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 35,
      "lng": 110
    },
    "summary": "大禹之子启建立夏朝，\"家天下\"取代禅让制。",
    "disputed": "夏朝的存在与否及二里头文化的归属在国际学界仍有争议。目前主要依据《史记》等后世文献记载，二里头遗址被多数学者认为可能是夏朝中晚期都城，但尚缺乏直接文字证据（如商代甲骨文）确证。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "yellow-emperor",
      "shang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-dayu-flood",
    "title": "大禹治水",
    "year": -2070,
    "yearDisplay": "约前2,070年",
    "civilization": "china",
    "categories": [
      "politics",
      "myth"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 113.5
    },
    "summary": "禹继父业改堵为疏，三过家门而不入，平定水患，舜禅位于禹，铸九鼎定九州。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-xia-qi",
      "myth-shun"
    ],
    "disputed": "大禹治水的传说见于后世文献，考古学界对其历史真实性与具体规模仍有争议。",
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "myth-yu",
    "title": "禹",
    "year": -2070,
    "yearDisplay": "传说时代（约前2,070年建夏）",
    "civilization": "china",
    "categories": [
      "myth",
      "politics",
      "science"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 34.7,
      "lng": 112.7
    },
    "summary": "夏朝奠基者，大禹治水，三过家门而不入，划定九州，铸九鼎，建夏朝。",
    "description": "",
    "imageEra": "prehistoric",
    "relatedNodeIds": [
      "myth-shun",
      "dynasty-xia",
      "myth-yao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-xia-qi",
    "title": "启建夏朝",
    "year": -2050,
    "yearDisplay": "约前2,050年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.8,
      "lng": 112.5
    },
    "summary": "禹之子启打破禅让制继位称王，建立中国第一个世袭制王朝，\"家天下\"由此开始。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-dayu-flood",
      "china-shaokang"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "maya-civilization",
    "title": "玛雅文明",
    "year": -2000,
    "yearDisplay": "前2,000年—公元1500年",
    "civilization": "america",
    "categories": [
      "culture",
      "science",
      "artifact"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 17.2,
      "lng": -89.6
    },
    "summary": "中美洲最辉煌的古文明，数学上独立发明0的概念，天文观测精确，创制象形文字和历法。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "aztec-empire",
      "inca-empire",
      "spanish-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-maya",
    "title": "玛雅神话与创世",
    "year": -2000,
    "yearDisplay": "约前2,000年（传说时期）",
    "civilization": "america",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 17,
      "lng": -91
    },
    "summary": "中美洲玛雅文明的神话体系，以《波波武经》为核心，记载玉米人创世、英雄双子与冥界之战。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "maya-civilization",
      "america-olmec"
    ],
    "important": false,
    "disputed": "",
    "keyPoints": [
      "《波波武经》是玛雅神话核心文本",
      "英雄双子击败冥界死神，化为日月",
      "玉米人创世说",
      "神话与天文历法深度绑定"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "china-shaokang",
    "title": "少康中兴",
    "year": -1900,
    "yearDisplay": "约前1,900年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34,
      "lng": 113
    },
    "summary": "夏朝中期后羿代夏、寒浞篡位，少康以一成一旅起家，诛寒浞复国，史称\"少康中兴\"。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-xia-qi",
      "china-xia-jie"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "dynasty-xia",
    "title": "夏朝",
    "year": -1800,
    "yearDisplay": "约前2,070年—前1,600年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.7,
      "lng": 112.7
    },
    "summary": "中国史书记载的第一个世袭制王朝，共传14代17后，约470年，末代桀被商汤所灭。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-dayu-flood",
      "shang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "artifact-hammurabi",
    "title": "汉谟拉比法典",
    "year": -1754,
    "yearDisplay": "约前1,754年",
    "civilization": "middleEast",
    "categories": [
      "artifact",
      "politics"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 32.5,
      "lng": 44.4
    },
    "summary": "古巴比伦王国法典，世界上现存最早的较完整的成文法典，以眼还眼。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "sumer",
      "babylon"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "babylon",
    "title": "古巴比伦王国与汉谟拉比法典",
    "year": -1750,
    "yearDisplay": "约前1,750年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 32.5,
      "lng": 44.5
    },
    "summary": "汉谟拉比统一两河流域，颁布人类最早的成文法典。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "akkad",
      "sumer"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "shang-dynasty",
    "title": "商朝与甲骨文",
    "year": -1600,
    "yearDisplay": "约前1,600年",
    "civilization": "china",
    "categories": [
      "culture",
      "artifact"
    ],
    "type": "artifact",
    "eraId": "ancient",
    "location": {
      "lat": 36,
      "lng": 114
    },
    "summary": "商朝建立，甲骨文出现，青铜文明达到鼎盛。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "xia-dynasty",
      "zhou-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-xia-jie",
    "title": "夏桀亡国",
    "year": -1600,
    "yearDisplay": "约前1,600年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 111
    },
    "summary": "末代君主桀暴虐无道，宠妺喜，建瑶台，杀忠臣关龙逄，商汤伐桀战于鸣条，夏亡。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-shaokang",
      "shang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "mycenaean-civilization",
    "title": "迈锡尼文明",
    "year": -1600,
    "yearDisplay": "前1,600年—前1,100年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture",
      "artifact"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 37.7,
      "lng": 22.8
    },
    "summary": "希腊本土青铜时代文明，以迈锡尼、梯林斯为中心，使用线形文字B，建造巨石城堡（独眼巨人墙），前1200年左右衰亡。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "minos-civilization",
      "trojan-war",
      "greek-city-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "ancient-hittite-empire",
    "title": "赫梯帝国与冶铁文明",
    "year": -1600,
    "yearDisplay": "约前1,600年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "science"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 39.9,
      "lng": 34.6
    },
    "summary": "赫梯人在安纳托利亚建立最早的冶铁帝国，双马战车与铁制武器称霸近东，卡迭石战役后与埃及签订人类最早的国际和平条约。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "akkad",
      "persian-empire",
      "trojan-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "lapita-culture",
    "title": "拉皮塔文化",
    "year": -1600,
    "yearDisplay": "前1,600年—前500年",
    "civilization": "oceania",
    "categories": [
      "culture"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": -17,
      "lng": 178
    },
    "summary": "太平洋地区的史前文化，以精美的\"齿纹\"陶器著称，是波利尼西亚、美拉尼西亚文化的共同源头。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "polynesian-expansion",
      "america-austronesian-voyaging",
      "america-maori-aotearoa"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "aryan-invasion",
    "title": "雅利安人进入印度",
    "year": -1500,
    "yearDisplay": "约前1,500年",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 29,
      "lng": 77
    },
    "summary": "雅利安人进入印度次大陆，吠陀文明兴起，种姓制度萌芽。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "indus-valley-civilization"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "building-karnak",
    "title": "卡纳克神庙",
    "year": -1500,
    "yearDisplay": "约前2,055年—前100年",
    "civilization": "africa",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "ancient",
    "type": "artifact",
    "location": {
      "lat": 25.72,
      "lng": 32.66
    },
    "summary": "古埃及最大的神庙建筑群，世界古代最大的宗教建筑群，多柱厅石柱如林。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "myth-egyptian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "america-austronesian-voyaging",
    "title": "南岛语族大航海",
    "year": -1500,
    "yearDisplay": "前3,000年—公元1300年",
    "civilization": "oceania",
    "categories": [
      "science",
      "culture"
    ],
    "eraId": "ancient",
    "type": "event",
    "location": {
      "lat": -8,
      "lng": -160
    },
    "summary": "波利尼西亚人靠双体独木舟与星象导航横跨太平洋，人类史前最伟大的航海壮举，从台湾出发扩散至夏威夷、复活节岛、新西兰。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "america-easter-island",
      "america-maori-aotearoa",
      "america-olmec",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "myth-veda",
    "title": "吠陀诸神与印度神话",
    "year": -1500,
    "yearDisplay": "约前1,500年（吠陀时代）",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "classical",
    "location": {
      "lat": 29,
      "lng": 77
    },
    "summary": "古印度吠陀时代的神话体系，以因陀罗、阿耆尼、苏摩等主神为核心，后演化为印度教三大神。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "myth-indian",
      "indus-valley-civilization",
      "maurya-empire"
    ],
    "important": false,
    "disputed": "",
    "keyPoints": [
      "《梨俱吠陀》是印度最古老文献",
      "因陀罗击杀弗栗多释放河水",
      "火神阿耆尼是人与神的信使",
      "从吠陀多神教演变到印度教三大主神"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "micronesia-civilization",
    "title": "密克罗尼西亚文明",
    "year": -1500,
    "yearDisplay": "约前1,500年—公元1900年",
    "civilization": "oceania",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 7,
      "lng": 158
    },
    "summary": "西太平洋密克罗尼西亚群岛的古文明，以关岛拉提石、雅浦石币和纳米都尔古城闻名。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "lapita-culture",
      "polynesian-expansion",
      "samoa-tuala"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "artifact-tutankhamun-mask",
    "title": "图坦卡蒙黄金面具",
    "year": -1323,
    "yearDisplay": "约前1,323年",
    "civilization": "middleEast",
    "categories": [
      "artifact"
    ],
    "eraId": "ancient",
    "type": "artifact",
    "location": {
      "lat": 25.7,
      "lng": 32.6
    },
    "summary": "古埃及最著名的文物，法老图坦卡蒙的死亡面具，纯金打造，象征永恒的年轻法老。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "myth-egyptian",
      "landmark-pyramids"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "dynasty-shang",
    "title": "商朝",
    "year": -1300,
    "yearDisplay": "约前1,600年—前1,046年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture",
      "artifact"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 36.1,
      "lng": 114.4
    },
    "summary": "商汤灭夏建商，以甲骨文和青铜器闻名，盘庚迁殷后稳定，纣王暴虐被周武王所灭。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "dynasty-xia",
      "dynasty-western-zhou",
      "shang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "artifact-simuwu",
    "title": "后母戊鼎",
    "year": -1300,
    "yearDisplay": "约前1,300年",
    "civilization": "china",
    "categories": [
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 36.1,
      "lng": 114.4
    },
    "summary": "商代晚期青铜鼎，中国已发现最大最重的青铜器，镇国之宝。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "shang-dynasty",
      "zhou-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "building-abu-simbel",
    "title": "阿布辛贝神庙",
    "year": -1264,
    "yearDisplay": "约前1,264年",
    "civilization": "africa",
    "categories": [
      "artifact"
    ],
    "eraId": "ancient",
    "type": "artifact",
    "location": {
      "lat": 22.34,
      "lng": 31.63
    },
    "summary": "拉美西斯二世在悬崖上凿建的岩窟神庙，太阳节奇观见证古埃及天文学的巅峰。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "myth-egyptian",
      "building-karnak"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "moses",
    "title": "摩西出埃及与犹太教",
    "year": -1200,
    "yearDisplay": "约前1,200年",
    "civilization": "middleEast",
    "categories": [
      "myth",
      "culture"
    ],
    "type": "myth",
    "eraId": "ancient",
    "location": {
      "lat": 30,
      "lng": 32.5
    },
    "summary": "摩西带领以色列人出埃及，一神教传统由此奠基。",
    "description": "",
    "disputed": "摩西与出埃及的叙事主要见于宗教文献，史学界对其历史真实性与具体规模仍有争议。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "egypt-unification",
      "jesus"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "trojan-war",
    "title": "特洛伊战争",
    "year": -1200,
    "yearDisplay": "约前1,200年",
    "civilization": "europe",
    "categories": [
      "military",
      "myth"
    ],
    "eraId": "ancient",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 26.2
    },
    "summary": "荷马史诗《伊利亚特》记载的希腊联军与特洛伊城之间的十年战争，以木马计攻陷特洛伊告终。",
    "description": "",
    "disputed": "特洛伊战争的史实性在学界有长期讨论，《荷马史诗》中神与人交织的叙事属文学与神话创作，考古发现的特洛伊遗址与史诗记载的对应关系仍有争议。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "mycenaean-civilization",
      "myth-greek",
      "minos-civilization",
      "greek-city-states",
      "alexander",
      "greco-persian-wars"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "artifact-siyangfangzun",
    "title": "四羊方尊",
    "year": -1200,
    "yearDisplay": "约前1,200年",
    "civilization": "china",
    "categories": [
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 28.2,
      "lng": 112.6
    },
    "summary": "商代晚期青铜方尊，青铜器中的臻于极致的典范，以四羊首装饰闻名。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "shang-dynasty",
      "artifact-simuwu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "artifact-sanxingdui-tree",
    "title": "三星堆青铜神树",
    "year": -1200,
    "yearDisplay": "约前1,200年",
    "civilization": "china",
    "categories": [
      "artifact"
    ],
    "eraId": "ancient",
    "type": "artifact",
    "location": {
      "lat": 30.99,
      "lng": 104.22
    },
    "summary": "三星堆出土的商代古蜀文明青铜神树，世界上出土最大的单件青铜文物。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "shang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "artifact-fuhao-owl-zun",
    "title": "妇好鸮尊",
    "year": -1200,
    "yearDisplay": "商代晚期，约前1,200年",
    "civilization": "china",
    "categories": [
      "artifact"
    ],
    "eraId": "ancient",
    "type": "artifact",
    "location": {
      "lat": 36.1,
      "lng": 114.4
    },
    "summary": "商代女将军妇好墓出土的青铜酒器，中国最早的鸟形铜尊，女战神的见证。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "shang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "america-olmec",
    "title": "奥尔梅克文明",
    "year": -1200,
    "yearDisplay": "前1,200年—前400年",
    "civilization": "america",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 18.1,
      "lng": -94.3
    },
    "summary": "中美洲\"文明之母\"，巨石头像、橡胶球戏、美洲豹崇拜，影响了后来的玛雅、特奥蒂瓦坎、阿兹特克等文明。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "america-teotihuacan",
      "maya-civilization",
      "america-aztec",
      "america-chichen-itza"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "ancient-phoenicia",
    "title": "腓尼基城邦与字母革命",
    "year": -1200,
    "yearDisplay": "约前1,200年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 33.3,
      "lng": 35.2
    },
    "summary": "腓尼基人在黎巴嫩沿海建立城邦，以航海、商业和紫色染料闻名，创造了人类历史上第一套字母文字系统，深刻影响了希腊、拉丁乃至世界文字。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "minos-civilization",
      "rome-punic-wars",
      "mycenaean-civilization"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "africa-kush-meroe",
    "title": "库施王国与麦罗埃",
    "year": -1070,
    "yearDisplay": "前1,070年—公元350年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 16.9,
      "lng": 33.5
    },
    "summary": "努比亚黑法老建立第二十五王朝征服埃及，麦罗埃时期成为非洲最早冶铁中心，延续千余年的尼罗河中上游文明。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "aksum-empire",
      "egypt-unification",
      "africa-ghana-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "ancient-israel-kingdom",
    "title": "以色列王国与巴比伦之囚",
    "year": -1050,
    "yearDisplay": "约前1,050年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 31.8,
      "lng": 35.2
    },
    "summary": "以色列人在迦南建立统一王国，大卫和所罗门时期强盛，建造第一圣殿。前586年被新巴比伦灭国，\"巴比伦之囚\"奠定了犹太一神教和大流散的历史格局。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "ancient-neo-babylon",
      "persian-empire",
      "idea-christianity",
      "idea-islam"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "zhou-dynasty",
    "title": "周朝建立",
    "year": -1046,
    "yearDisplay": "前1,046年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.5,
      "lng": 109
    },
    "summary": "周武王伐纣，周朝建立，分封制、礼乐制度奠定。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "shang-dynasty",
      "spring-autumn",
      "confucius"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "war-muye",
    "title": "牧野之战",
    "year": -1046,
    "yearDisplay": "前1,046年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "ancient",
    "type": "event",
    "location": {
      "lat": 35.3,
      "lng": 113.9
    },
    "summary": "周武王灭商决战，奴隶倒戈，商纣自焚，周朝建立，\"吊民伐罪\"的经典战例。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "shang-dynasty",
      "zhou-dynasty",
      "china-changping"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-western-zhou-system",
    "title": "西周分封制与宗法制",
    "year": -1046,
    "yearDisplay": "前1,046年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "西周初年周公制礼作乐，建立分封制和宗法制——分封诸侯拱卫王室、嫡长子继承维系秩序、礼乐文明规范社会，奠定了中华文明三千年的基本格局。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "zhou-dynasty",
      "china-shangyang",
      "qin-unification",
      "spring-autumn"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "dynasty-western-zhou",
    "title": "西周",
    "year": -1000,
    "yearDisplay": "前1,046年—前771年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture",
      "military"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "周武王灭商建立，分封制、宗法制、礼乐制奠定中国政治文化基础，幽王烽火戏诸侯而亡。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "dynasty-shang",
      "zhou-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "samoa-tuala",
    "title": "萨摩亚传统社会",
    "year": -1000,
    "yearDisplay": "约前1,000年—至今",
    "civilization": "oceania",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": -13.8,
      "lng": -171.8
    },
    "summary": "波利尼西亚最古老的文明之一，\"法阿萨摩亚\"传统社会制度延续至今，被称为\"波利尼西亚的摇篮\"。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "lapita-culture",
      "polynesian-expansion",
      "tonga-empire"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "assyrian-empire",
    "title": "亚述帝国",
    "year": -911,
    "yearDisplay": "前911年—前612年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 36.3,
      "lng": 43.1
    },
    "summary": "两河流域北部的军事帝国，以穷兵黩武和残暴著称，亚述巴尼拔建立了人类最早的系统图书馆。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "babylon",
      "persian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "ancient-etruscan",
    "title": "伊特鲁里亚文明",
    "year": -900,
    "yearDisplay": "约前900年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 42.4,
      "lng": 11.8
    },
    "summary": "意大利半岛上伊特鲁里亚人创造的先进文明，深刻影响了罗马人——从拱门、占卜术到托加袍、王权仪式，罗马文化的许多要素都源于伊特鲁里亚。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "roman-republic",
      "roman-empire",
      "ancient-phoenicia",
      "greek-city-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "chavin-culture",
    "title": "查文文明",
    "year": -900,
    "yearDisplay": "前900年—前200年",
    "civilization": "america",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": -9.56,
      "lng": -77.18
    },
    "summary": "安第斯最早的文明之一，以查文德万塔尔遗址为中心，是美洲最古老的宗教文明之一。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "nazca-lines",
      "moche-culture",
      "america-tiwanaku",
      "inca-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "china-guoren-revolt",
    "title": "国人暴动与共和行政",
    "year": -841,
    "yearDisplay": "前841年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "周厉王因\"专利\"和\"弭谤\"引发\"国人\"暴动被驱逐，周公和召公共同执政号称\"共和\"——共和元年是中国历史有确切纪年的开始。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "china-western-zhou-system",
      "zhou-dynasty",
      "spring-autumn",
      "china-shangyang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "carthage-civilization",
    "title": "迦太基（海上商业帝国）",
    "year": -814,
    "yearDisplay": "前814年—前146年",
    "civilization": "africa",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 36.85,
      "lng": 10.32
    },
    "summary": "腓尼基人建立的北非海上商业帝国，控制西地中海贸易达数百年，与罗马进行三次布匿战争后灭亡。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "person-hannibal-barca",
      "jugurtha-war",
      "numidia-kingdom",
      "roman-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "greek-city-states",
    "title": "希腊城邦",
    "year": -800,
    "yearDisplay": "前800年—前338年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture",
      "military"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 37.9,
      "lng": 23.7
    },
    "summary": "古风和古典时代希腊世界的政治形态，数百个独立城邦，雅典民主制与斯巴达军事寡头交相辉映，诞生了哲学戏剧史学等伟大成就。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-alexander",
      "persian-empire",
      "myth-greek",
      "roman-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "ancient-sparta",
    "title": "斯巴达军国体制",
    "year": -800,
    "yearDisplay": "约前800年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 37.1,
      "lng": 22.4
    },
    "summary": "古希腊最尚武的城邦斯巴达，来库古改革建立了独特的军国体制：双王制、公民终身从军、共餐制、严格的优生与训练制度，与雅典形成鲜明对照。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "athenian-democracy",
      "war-peloponnesian",
      "trojan-war",
      "greco-persian-wars"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "spring-autumn",
    "title": "春秋时代开始",
    "year": -770,
    "yearDisplay": "前770年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "周平王东迁洛邑，东周开始，春秋时代，礼崩乐坏。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "zhou-dynasty",
      "warring-states"
    ],
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-spring-autumn-hegemons",
    "title": "春秋五霸",
    "year": -770,
    "yearDisplay": "前770年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 35,
      "lng": 113
    },
    "summary": "平王东迁后周天子式微，诸侯争霸成为时代主题。齐桓公、晋文公、楚庄王、秦穆公、宋襄公等相继称霸，\"尊王攘夷\"的口号与礼崩乐坏并存。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "spring-autumn",
      "warring-states",
      "china-western-zhou-system",
      "china-shangyang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "artifact-homer-epic",
    "title": "荷马史诗",
    "year": -750,
    "yearDisplay": "约前8世纪",
    "civilization": "europe",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 37.9,
      "lng": 23.7
    },
    "summary": "《伊利亚特》与《奥德赛》，口述传统的定本，西方文学之源头，特洛伊战争与奥德修斯归乡的伟大史诗。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "trojan-war",
      "alexander",
      "person-socrates",
      "plato"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "myth-zeus",
    "title": "宙斯与奥林匹斯众神",
    "year": -750,
    "yearDisplay": "前8世纪（《神谱》成型）",
    "civilization": "europe",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "classical",
    "location": {
      "lat": 37.6,
      "lng": 22.7
    },
    "summary": "古希腊神话的众神之王，奥林匹斯十二主神之首，统治天空与雷电。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "myth-greek",
      "greek-city-states",
      "athenian-democracy"
    ],
    "important": true,
    "disputed": "",
    "keyPoints": [
      "推翻泰坦神族，建立奥林匹斯秩序",
      "众神之王，掌控雷电",
      "众多神与英雄的父亲",
      "希腊神话对西方文化影响深远"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "ancient-neo-babylon",
    "title": "新巴比伦王国与空中花园",
    "year": -626,
    "yearDisplay": "前626年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 32.5,
      "lng": 44.4
    },
    "summary": "迦勒底人建立新巴比伦王国，尼布甲尼撒二世建造空中花园（世界七大奇迹之一），攻陷耶路撒冷制造\"巴比伦之囚\"，天文数学繁荣。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "sumer",
      "akkad",
      "persian-empire",
      "ancient-israel-kingdom"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "dynasty-spring-autumn",
    "title": "东周·春秋",
    "year": -600,
    "yearDisplay": "前770年—前476年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "ancient",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "周平王东迁洛邑，王室衰微，诸侯争霸，百家争鸣萌芽，思想文化第一个黄金时代。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "dynasty-western-zhou",
      "dynasty-warring-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "economy-lydian-coinage",
    "title": "吕底亚铸币",
    "year": -600,
    "yearDisplay": "约前600年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 38.6,
      "lng": 28
    },
    "summary": "世界最早的官方铸币——吕底亚的琥珀金币。货币经济取代物物交换，推动商业革命，被希腊城邦继承扩散。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "persian-empire",
      "roman-empire",
      "economy-dutch-finance",
      "econ-bretton-woods"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "person-cyrus",
    "title": "居鲁士大帝",
    "year": -590,
    "yearDisplay": "前590年—前530年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "ancient",
    "type": "person",
    "location": {
      "lat": 30.2,
      "lng": 52.9
    },
    "summary": "波斯阿契美尼德王朝缔造者，万王之王，实行宽容政策，居鲁士圆柱被认为是人类最早的人权宣言之一。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "persian-empire",
      "person-alexander",
      "sumer"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "laozi",
    "title": "老子",
    "year": -571,
    "yearDisplay": "约前571年—前471年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 33.8,
      "lng": 115.7
    },
    "summary": "道家学派创始人，著《道德经》五千言，主张无为而治、道法自然。",
    "description": "",
    "disputed": "老子其人与《老子》（《道德经》）的成书年代与作者归属在学界有不同看法，传统说法为春秋末年李耳所作，现代学者多认为该书经历代编纂，成书于战国时期。",
    "imageEra": "classical",
    "relatedNodeIds": [
      "confucius",
      "spring-autumn",
      "han-dynasty",
      "person-zhuangzi",
      "warring-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-sakyamuni",
    "title": "释迦牟尼（佛陀）",
    "year": -563,
    "yearDisplay": "约前563年—前483年",
    "civilization": "southAsia",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 27.5,
      "lng": 83
    },
    "summary": "古印度释迦族王子乔达摩·悉达多，创立佛教，提出四谛八正道，轴心时代精神突破代表之一。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-ashoka",
      "china-buddhism-introduction",
      "idea-buddhism-spread"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "confucius",
    "title": "孔子",
    "year": -551,
    "yearDisplay": "前551年—前479年",
    "civilization": "china",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 35.6,
      "lng": 116.9
    },
    "summary": "儒家学派创始人，中国历史上最伟大的思想家、教育家，被尊为\"至圣先师\"。",
    "description": "",
    "disputed": "《论语》由孔子弟子及再传弟子编纂，其中部分章句的作者与成书年代在学界有讨论，但其作为儒家核心经典的地位是确定的。",
    "imageEra": "classical",
    "relatedNodeIds": [
      "laozi",
      "spring-autumn",
      "warring-states",
      "han-dynasty",
      "person-mencius",
      "person-hanwudi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "persian-empire",
    "title": "波斯第一帝国",
    "year": -550,
    "yearDisplay": "前550年—前330年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 30.2,
      "lng": 52.9
    },
    "summary": "又称阿契美尼德王朝，人类历史上第一个横跨欧亚非的大帝国，以宗教宽容和行省自治著称。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "person-cyrus",
      "alexander-empire",
      "greek-city-states",
      "arab-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "person-yanhui",
    "title": "颜回（颜子）",
    "year": -521,
    "yearDisplay": "前521年—前490年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.6,
      "lng": 116.9
    },
    "summary": "孔子最得意弟子，孔门十哲之首，以德行著称，安贫乐道，后世尊为\"复圣\"。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "confucius",
      "person-zigong"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-zigong",
    "title": "子贡（端木赐）",
    "year": -520,
    "yearDisplay": "前520年—前456年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.6,
      "lng": 116
    },
    "summary": "孔子弟子，言语科之首，善外交与经商，\"端木遗风\"，曾出使存鲁乱齐破吴强晋霸越。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "confucius",
      "person-yanhui"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "thinker-sunzi",
    "title": "孙子与《孙子兵法》",
    "year": -512,
    "yearDisplay": "约前545年—前470年",
    "civilization": "china",
    "categories": [
      "culture",
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 31.2,
      "lng": 120.6
    },
    "summary": "孙武著《孙子兵法》十三篇，\"兵学圣典\"，知己知彼、不战而屈人之兵，影响古今中外军事思想。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "wang-yangming",
      "idea-axial-age",
      "person-hanfeizi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "roman-republic",
    "title": "罗马共和国",
    "year": -509,
    "yearDisplay": "前509年—前27年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "罗马从城邦发展为地中海霸主的共和时期，元老院、执政官、公民大会三权分立，前27年屋大维成为奥古斯都，共和国终结。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "person-julius-caesar",
      "person-augustus",
      "greek-city-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "athenian-democracy",
    "title": "雅典民主制度确立",
    "year": -508,
    "yearDisplay": "前508年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 37.98,
      "lng": 23.73
    },
    "summary": "克里斯提尼改革确立雅典民主制，公民直接参与政治决策。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "greek-city-states",
      "greco-persian-wars",
      "plato"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-zengzi",
    "title": "曾子（曾参）",
    "year": -505,
    "yearDisplay": "前505年—前435年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.3,
      "lng": 117.8
    },
    "summary": "孔子弟子，以孝著称，传《大学》，儒家道统重要传人，上承孔子下启子思孟子。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "confucius",
      "person-zisi",
      "person-mencius"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "idea-axial-age",
    "title": "轴心时代",
    "year": -500,
    "yearDisplay": "约前8—前2世纪",
    "civilization": "global",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 30,
      "lng": 50
    },
    "summary": "人类思想的黄金时代，孔子、老子、苏格拉底、佛陀、琐罗亚斯德同时涌现。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "confucius",
      "laozi",
      "idea-buddhism-spread",
      "greek-city-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "zhuzi-baijia",
    "title": "诸子百家",
    "year": -500,
    "yearDisplay": "前770年—前221年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "春秋战国时代思想大解放，儒、道、墨、法、名、兵、阴阳、纵横等百家争鸣，奠定中国思想文化根基。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "idea-axial-age",
      "confucius",
      "laozi",
      "person-mencius",
      "person-zhuangzi",
      "spring-autumn",
      "warring-states"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "sogdiana-civilization",
    "title": "粟特（索格底亚那）",
    "year": -500,
    "yearDisplay": "前500年—公元800年",
    "civilization": "centralAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "ancient",
    "type": "dynasty",
    "location": {
      "lat": 39.65,
      "lng": 66.97
    },
    "summary": "中亚阿姆河与锡尔河之间的古老文明，以经商闻名，被称为\"丝绸之路的马车夫\"，发明了粟特字母影响深远。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "kushan-empire",
      "persian-empire",
      "samanid-dynasty",
      "dayuan-kingdom"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "artifact-goujian-sword",
    "title": "越王勾践剑",
    "year": -496,
    "yearDisplay": "约前496年",
    "civilization": "china",
    "categories": [
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 30.4,
      "lng": 112.2
    },
    "summary": "春秋末年越国国王勾践的佩剑，被誉为\"天下第一剑\"，埋藏两千余年仍锋利不锈。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "warring-states",
      "person-wangxizhi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "greco-persian-wars",
    "title": "希波战争与马拉松战役",
    "year": -490,
    "yearDisplay": "前490年",
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 38.1,
      "lng": 23.95
    },
    "summary": "希腊城邦击败波斯帝国入侵，马拉松战役诞生运动传奇。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "athenian-democracy",
      "alexander"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "war-marathon",
    "title": "马拉松战役",
    "year": -490,
    "yearDisplay": "前490年",
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 38.15,
      "lng": 23.97
    },
    "summary": "希波战争中雅典击败波斯入侵，米太亚德以少胜多，马拉松长跑运动的起源。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "greek-city-states",
      "trojan-war",
      "alexander",
      "persian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-zisi",
    "title": "子思（孔伋）",
    "year": -483,
    "yearDisplay": "前483年—前402年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.6,
      "lng": 116.9
    },
    "summary": "孔子之孙，相传作《中庸》，儒家道统关键人物，曾子弟子、孟子师祖，思孟学派开创者。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-zengzi",
      "confucius",
      "person-mencius"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "warring-states",
    "title": "战国时代开始",
    "year": -475,
    "yearDisplay": "前475年",
    "civilization": "china",
    "categories": [
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 112
    },
    "summary": "战国七雄并立，百家争鸣，中国思想文化的黄金时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "confucius",
      "china-shangyang",
      "qin-unification"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-socrates",
    "title": "苏格拉底",
    "year": -469,
    "yearDisplay": "前469年—前399年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 37.9,
      "lng": 23.7
    },
    "summary": "古希腊哲学家，西方哲学奠基者之一，\"认识你自己\"\"产婆术\"。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-plato",
      "person-aristotle",
      "greek-city-states",
      "athenian-democracy"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-mozi",
    "title": "墨子",
    "year": -468,
    "yearDisplay": "约前468年—前376年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics",
      "science"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.1,
      "lng": 117.2
    },
    "summary": "墨家学派创始人，主张兼爱非攻，在逻辑学、物理学、机械学上有重要贡献。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "confucius",
      "person-hanfeizi",
      "spring-autumn",
      "warring-states"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "landmark-parthenon",
    "title": "帕特农神庙",
    "year": -438,
    "yearDisplay": "前438年完工",
    "civilization": "europe",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 37.97,
      "lng": 23.72
    },
    "summary": "雅典卫城帕特农神庙，古希腊建筑艺术的巅峰，民主与理性的象征。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "greek-city-states",
      "athenian-democracy",
      "alexander"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "artifact-bianzhong",
    "title": "曾侯乙编钟",
    "year": -433,
    "yearDisplay": "约前433年，战国早期",
    "civilization": "china",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 31.7,
      "lng": 113.4
    },
    "summary": "战国早期曾国青铜乐器，规模最大保存最完整的编钟，世界音乐史上的奇迹。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "warring-states",
      "artifact-simuwu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "war-peloponnesian",
    "title": "伯罗奔尼撒战争",
    "year": -431,
    "yearDisplay": "前431年—前404年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 37.9,
      "lng": 22.9
    },
    "summary": "雅典与斯巴达的希腊城邦世界大战，修昔底德笔下的经典，雅典民主由盛转衰。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "greek-city-states",
      "athenian-democracy",
      "greco-persian-wars",
      "alexander"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "plato",
    "title": "柏拉图诞生",
    "year": -427,
    "yearDisplay": "前427年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 37.98,
      "lng": 23.73
    },
    "summary": "古希腊哲学家柏拉图诞生，《理想国》奠定西方哲学传统。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "athenian-democracy",
      "aristotle"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-plato",
    "title": "柏拉图",
    "year": -427,
    "yearDisplay": "前427年—前347年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 37.9,
      "lng": 23.7
    },
    "summary": "古希腊哲学家，柏拉图学园创立者，西方客观唯心主义哲学创始人。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-socrates",
      "person-aristotle",
      "greek-city-states",
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "artifact-pali-canon",
    "title": "佛经结集与贝叶经",
    "year": -400,
    "yearDisplay": "约前4世纪起",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 25,
      "lng": 83
    },
    "summary": "三次/四次佛经结集，巴利语梵语贝叶经写本，阿育王派遣传教团，佛教经典体系形成与传播的过程。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "maurya-empire",
      "econ-silk-road",
      "idea-buddhism-spread",
      "env-loulan-oasis"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "china-warring-states-reform",
    "title": "战国变法运动",
    "year": -400,
    "yearDisplay": "前400年前后",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 35,
      "lng": 113
    },
    "summary": "战国时期各国纷纷变法图强——李悝在魏、吴起在楚、申不害在韩、商鞅在秦，变法内容各有侧重，核心是从世卿世禄向官僚制转型，为秦汉大一统奠基。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "warring-states",
      "china-shangyang",
      "qin-unification",
      "china-spring-autumn-hegemons"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "person-guiguzi",
    "title": "鬼谷子（王诩）",
    "year": -400,
    "yearDisplay": "约前4世纪",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 36.5,
      "lng": 115
    },
    "summary": "战国纵横家鼻祖，隐居鬼谷，苏秦、张仪、孙膑、庞涓皆出其门下，著有《鬼谷子》。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-suqin",
      "person-zhangyi",
      "person-sunbin",
      "person-pangjuan"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-pangjuan",
    "title": "庞涓",
    "year": -385,
    "yearDisplay": "约前385年—前341年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.5,
      "lng": 114.4
    },
    "summary": "战国魏国大将，鬼谷子弟子，孙膑同学，嫉妒孙膑之才而陷害之，马陵之战兵败自刎。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-guiguzi",
      "person-sunbin"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "aristotle",
    "title": "亚里士多德诞生",
    "year": -384,
    "yearDisplay": "前384年",
    "civilization": "europe",
    "categories": [
      "science",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 40.5,
      "lng": 22.5
    },
    "summary": "古希腊百科全书式学者，逻辑学、生物学奠基者。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "plato",
      "alexander"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-aristotle",
    "title": "亚里士多德",
    "year": -384,
    "yearDisplay": "前384年—前322年",
    "civilization": "europe",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 40.6,
      "lng": 23
    },
    "summary": "古希腊哲学家、科学家，\"百科全书式的学者\"，形式逻辑和生物学的开创者。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-plato",
      "alexander",
      "person-newton",
      "greek-city-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-sunbin",
    "title": "孙膑",
    "year": -380,
    "yearDisplay": "约前380年—前320年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.4,
      "lng": 115
    },
    "summary": "战国军事家，孙武后代，鬼谷子弟子，遭庞涓陷害受膑刑，桂陵之战马陵之战大败魏军。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-guiguzi",
      "person-pangjuan",
      "person-suqin"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "institution-jixia-academy",
    "title": "稷下学宫",
    "year": -374,
    "yearDisplay": "前374年—前221年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 36.8,
      "lng": 118.1
    },
    "summary": "齐桓公田午创于临淄稷门之下，世界最早官办学术机构之一，百家争鸣中心，孟子、荀子、邹衍曾在此，不治而议论。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-mencius",
      "thinker-xunzi",
      "thinker-zouyan",
      "culture-vertical-horizontal",
      "idea-axial-age"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-mencius",
    "title": "孟子",
    "year": -372,
    "yearDisplay": "约前372年—前289年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.4,
      "lng": 117
    },
    "summary": "战国时期儒家代表人物，\"亚圣\"，主张性善论、仁政、民本思想。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "confucius",
      "person-zhuangzi",
      "person-mozi",
      "spring-autumn"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-zhangyi",
    "title": "张仪",
    "year": -370,
    "yearDisplay": "约前370年—前309年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "战国纵横家，鬼谷子弟子，秦相，首创连横策略，瓦解合纵，为秦统一奠基。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-guiguzi",
      "person-suqin"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-zhuangzi",
    "title": "庄子",
    "year": -369,
    "yearDisplay": "约前369年—前286年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.4,
      "lng": 115.7
    },
    "summary": "战国时期道家代表人物，与老子并称\"老庄\"，主张逍遥游、齐物论。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "laozi",
      "confucius",
      "person-mencius",
      "spring-autumn"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-shangyang",
    "title": "商鞅变法",
    "year": -356,
    "yearDisplay": "前356年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 109
    },
    "summary": "商鞅徙木立信，废井田开阡陌，奖励耕战，行连坐法，秦国一跃成为最强。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-warring-states",
      "china-qin-shihuang",
      "warring-states",
      "qin-unification"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-alexander",
    "title": "亚历山大大帝",
    "year": -356,
    "yearDisplay": "前356年—前323年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 40.9,
      "lng": 22.9
    },
    "summary": "马其顿国王，历史上最伟大的军事统帅之一，东征建立横跨欧亚非的大帝国，33岁病逝于巴比伦，开启了希腊化时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "alexander-empire",
      "greek-city-states",
      "persian-empire",
      "person-cyrus"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "china-warring-states",
    "title": "战国七雄",
    "year": -350,
    "yearDisplay": "前4世纪",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 114
    },
    "summary": "齐楚燕韩赵魏秦七雄并立，各国变法图强，最终秦国商鞅变法最为彻底。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shangyang",
      "china-baijia"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-suqin",
    "title": "苏秦",
    "year": -350,
    "yearDisplay": "约前350年—前284年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.2,
      "lng": 112.8
    },
    "summary": "战国纵横家，鬼谷子弟子，身佩六国相印，合纵抗秦，\"头悬梁锥刺股\"原型之一。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-guiguzi",
      "person-zhangyi",
      "person-sunbin"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-quyuan",
    "title": "屈原",
    "year": -340,
    "yearDisplay": "约前340年—前278年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 30.8,
      "lng": 110.8
    },
    "summary": "战国时期伟大爱国诗人，楚辞开创者，端午节纪念的对象。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "warring-states",
      "qin-unification",
      "confucius"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "alexander",
    "title": "亚历山大大帝东征",
    "year": -336,
    "yearDisplay": "前336年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 40.6,
      "lng": 22.9
    },
    "summary": "亚历山大即位并开始东征，建立横跨欧亚非的庞大帝国。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "aristotle",
      "rome-conquest-greece"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "alexander-empire",
    "title": "亚历山大帝国",
    "year": -336,
    "yearDisplay": "前336年—前323年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 31.2,
      "lng": 29.9
    },
    "summary": "亚历山大大帝建立的横跨欧亚非的大帝国，33岁病逝于巴比伦，帝国随即分裂，开启了希腊化时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-alexander",
      "greek-city-states",
      "persian-empire",
      "roman-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "scientist-euclid",
    "title": "欧几里得",
    "year": -325,
    "yearDisplay": "约前325年—前265年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 31.2,
      "lng": 29.9
    },
    "summary": "《几何原本》13卷，公理化演绎体系的典范，\"几何无王者之道\"，影响西方科学思维两千年。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "scientist-archimedes",
      "newton",
      "alexander",
      "galileo"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "ancient-hellenistic-era",
    "title": "希腊化时代",
    "year": -323,
    "yearDisplay": "前323年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 31.2,
      "lng": 29.9
    },
    "summary": "亚历山大去世后，他的帝国分裂为三大继业者王国（托勒密埃及、塞琉古、安提柯马其顿），希腊文化与东方文明深度融合，科学艺术空前繁荣。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "alexander",
      "ancient-alexandria-library",
      "roman-republic",
      "scientist-euclid"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "maurya-empire",
    "title": "孔雀王朝",
    "year": -322,
    "yearDisplay": "前322年—前185年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 25.6,
      "lng": 85.1
    },
    "summary": "印度历史上第一个大一统帝国，阿育王时期达到鼎盛，皈依佛教后将佛教发展为世界性宗教。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-ashoka",
      "gupta-empire",
      "alexander-empire",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "culture-vertical-horizontal",
    "title": "纵横家与合纵连横",
    "year": -320,
    "yearDisplay": "战国中晚期",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 34.3,
      "lng": 113.6
    },
    "summary": "苏秦合纵六国抗秦、张仪连横破纵，鬼谷子门下，战国外交博弈的巅峰，\"一怒而诸侯惧，安居而天下熄\"。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "zhuzi-baijia",
      "qin-unification",
      "person-mencius"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "landmark-petra",
    "title": "佩特拉古城",
    "year": -312,
    "yearDisplay": "约前312年纳巴泰王国建都",
    "civilization": "middleEast",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 30.32,
      "lng": 35.44
    },
    "summary": "约旦纳巴泰王国玫瑰红古城，世界新七大奇迹之一，雕刻在砂岩上的城市。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "econ-silk-road",
      "alexander",
      "byzantine-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "person-ashoka",
    "title": "阿育王",
    "year": -304,
    "yearDisplay": "前304年—前232年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 25.6,
      "lng": 85.1
    },
    "summary": "孔雀王朝第三代皇帝，佛教史上最重要的护法君主，征服羯陵伽后皈依佛教，以达摩治国，将佛教传播为世界性宗教。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "maurya-empire",
      "gupta-empire",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "china-baijia",
    "title": "百家争鸣",
    "year": -300,
    "yearDisplay": "前4—3世纪",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 114
    },
    "summary": "儒道法墨名阴阳纵横兵农杂家诸子百家争鸣，中国思想史上的黄金时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-warring-states",
      "confucius",
      "laozi",
      "person-zhuangzi",
      "person-qinshihuang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-he-zhong-lian-heng",
    "title": "合纵连横",
    "year": -300,
    "yearDisplay": "前4—3世纪",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 114
    },
    "summary": "苏秦佩六国相印合纵抗秦，张仪以连横破之，战国纵横家凭口舌左右天下格局。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shangyang",
      "china-changping"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "dynasty-warring-states",
    "title": "战国",
    "year": -300,
    "yearDisplay": "前475年—前221年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture",
      "science"
    ],
    "type": "dynasty",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 114
    },
    "summary": "齐楚燕韩赵魏秦七雄并立，各国变法图强，百家争鸣，秦灭六国统一天下。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "dynasty-spring-autumn",
      "qin-unification",
      "china-baijia"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "myth-shanhaijing",
    "title": "山海经神话体系",
    "year": -300,
    "yearDisplay": "战国至汉代（文献成书）",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "ancient",
    "type": "myth",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "中国先秦古籍，保存了大量上古神话，夸父逐日、精卫填海、刑天舞干戚、女娲补天。",
    "description": "",
    "disputed": "《山海经》是中国上古神话地理文献，内容包含大量神话传说与地理想象，不宜视为信史。",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "myth-nuwa",
      "myth-houyi",
      "myth-gonggong",
      "myth-zhurong",
      "myth-xiyouji"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "dayuan-kingdom",
    "title": "大宛（费尔干纳）",
    "year": -300,
    "yearDisplay": "前300年—公元200年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 40.4,
      "lng": 71.7
    },
    "summary": "费尔干纳盆地的古国，以出产汗血宝马闻名，汉武帝为求马两度远征大宛，打通了西域通道。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "sogdiana-civilization",
      "kangju-kingdom",
      "kushan-empire"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "polynesian-expansion",
    "title": "波利尼西亚大扩张",
    "year": -300,
    "yearDisplay": "约前300年—公元1300年",
    "civilization": "oceania",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": -15,
      "lng": -150
    },
    "summary": "人类历史上最伟大的海上迁徙，波利尼西亚人驾驶独木舟征服了几乎整个太平洋三角区。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "lapita-culture",
      "america-austronesian-voyaging",
      "hawaii-kingdom",
      "america-maori-aotearoa",
      "easter-island-rapanui"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "scientist-archimedes",
    "title": "阿基米德",
    "year": -287,
    "yearDisplay": "前287年—前212年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 37.1,
      "lng": 15.3
    },
    "summary": "古希腊最伟大的科学家，浮力定律、杠杆原理、穷竭法（微积分先声）、螺旋提水器，以机械守城，\"给我一个支点，我能撬动地球\"。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "scientist-euclid",
      "newton",
      "galileo",
      "alexander"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-hanfeizi",
    "title": "韩非子",
    "year": -280,
    "yearDisplay": "约前280年—前233年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.5,
      "lng": 113.7
    },
    "summary": "战国末期法家集大成者，主张以法治国、法术势结合，影响两千年中央集权制度。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-qinshihuang",
      "qin-unification",
      "confucius",
      "warring-states"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "ancient-alexandria-library",
    "title": "亚历山大图书馆",
    "year": -280,
    "yearDisplay": "约前280年",
    "civilization": "africa",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 31.2,
      "lng": 29.9
    },
    "summary": "托勒密王朝在埃及亚历山大城建立古代世界最大的图书馆，藏书70万卷，聚集欧几里得、埃拉托色尼等大学者，是人类知识的象征，最终毁于战乱。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "ancient-hellenistic-era",
      "alexander",
      "scientist-euclid",
      "scientist-archimedes"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "war-punic",
    "title": "布匿战争",
    "year": -264,
    "yearDisplay": "前264年—前146年（三次）",
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 36.9,
      "lng": 10.2
    },
    "summary": "罗马与迦太基的百年争霸，汉尼拔翻越阿尔卑斯山，罗马最终毁灭迦太基。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "rome-punic-wars",
    "title": "布匿战争与汉尼拔",
    "year": -264,
    "yearDisplay": "前264年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 36.8,
      "lng": 10.2
    },
    "summary": "罗马与迦太基之间进行了三场布匿战争，汉尼拔翻越阿尔卑斯山远征意大利、坎尼会战以少胜多，最终罗马毁灭迦太基，成为西地中海霸主。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-republic",
      "ancient-phoenicia",
      "western-rome-fall",
      "persian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "china-changping",
    "title": "长平之战",
    "year": -260,
    "yearDisplay": "前260年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35.8,
      "lng": 112.9
    },
    "summary": "秦赵决战，赵括纸上谈兵，白起坑杀赵军四十万，六国再无力抗秦。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-he-zhong-lian-heng",
      "china-qin-shihuang",
      "war-muye",
      "person-qinshihuang",
      "war-julu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "thinker-zouyan",
    "title": "邹衍与阴阳五行",
    "year": -260,
    "yearDisplay": "约前324年—前250年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 36.8,
      "lng": 117.9
    },
    "summary": "邹衍，阴阳家代表，\"五德终始说\"解释王朝更替，大九州说，影响后世政治合法性、中医、天文历法。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "zhuzi-baijia",
      "china-han-wudi",
      "confucius",
      "thinker-xunzi"
    ],
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-dujiangyan",
    "title": "都江堰与郑国渠",
    "year": -250,
    "yearDisplay": "前3世纪",
    "civilization": "china",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 31,
      "lng": 103.6
    },
    "summary": "李冰父子修建都江堰，使成都平原\"水旱从人不知饥馑\"，至今仍在使用。郑国渠灌溉关中。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shangyang",
      "china-qin-shihuang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "artifact-dead-sea-scrolls",
    "title": "死海古卷",
    "year": -250,
    "yearDisplay": "前250年—公元68年",
    "civilization": "middleEast",
    "categories": [
      "culture"
    ],
    "type": "artifact",
    "eraId": "classical",
    "location": {
      "lat": 31.7,
      "lng": 35.4
    },
    "summary": "20世纪最伟大的考古发现之一，犹太教和早期基督教最珍贵的古代文献。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "thinker-xunzi",
    "title": "荀子与性恶论",
    "year": -250,
    "yearDisplay": "约前313年—前238年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.1,
      "lng": 117.2
    },
    "summary": "荀子名况，儒家代表人物，性恶论、隆礼重法、\"制天命而用之\"，韩非李斯之师，稷下学宫三为祭酒。",
    "description": "",
    "imageEra": "axial",
    "relatedNodeIds": [
      "person-mencius",
      "person-hanfeizi",
      "institution-jixia-academy",
      "idea-axial-age"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "event-buddhism-south",
    "title": "南传佛教与上座部",
    "year": -250,
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 6.9,
      "lng": 79.9
    },
    "civilization": "southAsia",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "前250年",
    "summary": "阿育王派僧团南下传教，佛教经斯里兰卡传至东南亚，形成上座...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-sakyamuni",
      "person-ashoka",
      "china-buddhism-introduction"
    ],
    "hasBody": true,
    "shardKey": "ancient-others"
  },
  {
    "id": "kangju-kingdom",
    "title": "康居（游牧行国）",
    "year": -250,
    "yearDisplay": "前250年—公元550年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 43,
      "lng": 68
    },
    "summary": "锡尔河以北的游牧行国，势力强盛时控弦十余万，曾与大月氏、乌孙齐名，是丝绸之路北道的重要国家。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "dayuan-kingdom",
      "yancai-kingdom",
      "kushan-empire",
      "hephtalites"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "event-parthia-empire",
    "title": "帕提亚帝国（安息）",
    "year": -247,
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 36.3,
      "lng": 59.6
    },
    "civilization": "middleEast",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "前247年",
    "summary": "帕提亚帝国（中国史书称安息）兴起于伊朗高原，是丝绸之路上...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "han-dynasty",
      "roman-empire",
      "kushan-empire",
      "econ-silk-road"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "person-hannibal-barca",
    "title": "汉尼拔·巴卡",
    "year": -247,
    "yearDisplay": "前247年—约前183年",
    "civilization": "africa",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 36.85,
      "lng": 10.32
    },
    "summary": "迦太基军事统帅，西方四大名将之一，翻越阿尔卑斯山远征罗马，坎尼之战以少胜多成为军事学经典。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "carthage-civilization",
      "numidia-kingdom",
      "roman-republic",
      "event-hannibal-scipio"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "xiang-yu",
    "title": "项羽",
    "year": -232,
    "yearDisplay": "前232年—前202年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 33.9,
      "lng": 117.2
    },
    "summary": "西楚霸王，中国历史上最勇猛的武将之一，楚汉相争的悲剧英雄。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "qin-unification",
      "han-dynasty",
      "china-chu-han-contention"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-jing-ke",
    "title": "荆轲刺秦王",
    "year": -227,
    "yearDisplay": "前227年",
    "civilization": "china",
    "categories": [
      "military",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "燕太子丹派荆轲以献督亢地图为名刺秦王，\"风萧萧兮易水寒\"，图穷匕见，事败被杀。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-changping",
      "china-qin-shihuang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "qin-unification",
    "title": "秦始皇统一中国",
    "year": -221,
    "yearDisplay": "前221年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.25,
      "lng": 108.9
    },
    "summary": "嬴政灭六国统一中国，建立中央集权的大一统王朝。",
    "description": "",
    "disputed": "秦始皇是否为千古一帝或暴君存在争议，其统一制度之功与严刑峻法之过皆为后世讨论焦点。",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shangyang",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-qin-shihuang",
    "title": "秦始皇统一六国",
    "year": -221,
    "yearDisplay": "前221年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "嬴政十年灭六国，建立中国第一个大一统中央集权帝国，自称\"始皇帝\"。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-changping",
      "china-shangyang",
      "china-shu-tongwen"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "person-qinshihuang",
    "title": "秦始皇·嬴政",
    "year": -221,
    "yearDisplay": "前259年—前210年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "中国第一个大一统帝国的建立者，千古一帝，书同文车同轨，奠定两千年帝制格局。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "dynasty-warring-states",
      "qin-unification",
      "qin-unification"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-qin-unification-institutions",
    "title": "秦统一与制度建设",
    "year": -221,
    "yearDisplay": "前221年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "秦始皇统一六国后推行一整套制度：书同文、车同轨、统一度量衡和货币、郡县制、修驰道长城灵渠，奠定了中国大一统王朝的制度基础。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "qin-unification",
      "china-shangyang",
      "china-warring-states-reform",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "china-shu-tongwen",
    "title": "书同文车同轨",
    "year": -220,
    "yearDisplay": "前220年",
    "civilization": "china",
    "categories": [
      "politics",
      "science"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "统一文字、度量衡、货币、车轨，修驰道直道，建郡县制，奠定两千年制度基础。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-qin-shihuang",
      "china-fenshu-kengru"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "war-cannae",
    "title": "坎尼会战",
    "year": -216,
    "yearDisplay": "前216年",
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 41.3,
      "lng": 16.1
    },
    "summary": "汉尼拔的巅峰之作，西方军事史上最完美的围歼战，罗马一天损失七万人。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "trojan-war",
      "roman-empire",
      "war-napoleonic",
      "war-stalingrad"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "landmark-great-wall",
    "title": "万里长城",
    "year": -214,
    "yearDisplay": "始建于前214年，明代大修",
    "civilization": "china",
    "categories": [
      "artifact",
      "military"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 40.4,
      "lng": 116.6
    },
    "summary": "中国历代修建的军事防御工程，世界文化遗产，人类历史上最宏大的建筑。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "qin-unification",
      "person-qinshihuang",
      "han-dynasty",
      "artifact-terracotta",
      "person-hanwudi",
      "ming-dynasty",
      "mongol-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-fenshu-kengru",
    "title": "焚书坑儒与万里长城",
    "year": -213,
    "yearDisplay": "前213年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 40,
      "lng": 116
    },
    "summary": "焚书坑儒统一思想，蒙恬北击匈奴修万里长城，南征百越修灵渠。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-qin-shihuang",
      "china-shaqiu-zhibian"
    ],
    "disputed": "「焚书坑儒」的具体内容与规模在学界有不同解读，「坑儒」是否为方士还是儒生存在争议，传统说法经后世文献不断层累形成。",
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "artifact-terracotta-army",
    "title": "秦始皇兵马俑",
    "year": -210,
    "yearDisplay": "前210年",
    "civilization": "china",
    "categories": [
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 34.4,
      "lng": 109.3
    },
    "summary": "\"世界第八大奇迹\"，秦始皇陵地下军团，两千年前的地下军队。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "qin-unification",
      "person-qinshihuang",
      "landmark-great-wall",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "artifact-terracotta",
    "title": "兵马俑",
    "year": -210,
    "yearDisplay": "前210年",
    "civilization": "china",
    "categories": [
      "artifact",
      "military"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 34.4,
      "lng": 109.3
    },
    "summary": "秦始皇陵陪葬坑陶制军阵，世界第八大奇迹，两千年前的地下军队。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-qinshihuang",
      "qin-unification",
      "han-dynasty",
      "landmark-great-wall"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-a"
  },
  {
    "id": "china-shaqiu-zhibian",
    "title": "沙丘之变与秦亡",
    "year": -207,
    "yearDisplay": "前207年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "始皇病逝沙丘，赵高李斯立胡亥；陈胜吴广起义，项羽刘邦并起，秦二世而亡。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-qin-shihuang",
      "china-chu-han"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "war-julu",
    "title": "巨鹿之战",
    "year": -207,
    "yearDisplay": "前207年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 37.2,
      "lng": 114.9
    },
    "summary": "项羽破釜沉舟，以五万楚军大败四十万秦军，消灭秦军主力，奠定灭秦基础。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "xiang-yu",
      "qin-unification",
      "china-chu-han",
      "china-changping"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-chu-han-contention",
    "title": "楚汉相争",
    "year": -206,
    "yearDisplay": "前206年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.3,
      "lng": 116.3
    },
    "summary": "秦亡后项羽与刘邦争夺天下，鸿门宴、明修栈道暗度陈仓、垓下之战四面楚歌，项羽乌江自刎，刘邦建立汉朝——中国历史上最精彩的一段争霸故事。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "qin-unification",
      "han-dynasty",
      "china-chu-han",
      "china-qin-unification-institutions",
      "china-liu-bang",
      "xiang-yu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "han-dynasty",
    "title": "汉朝建立与丝绸之路",
    "year": -202,
    "yearDisplay": "前202年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "classical",
    "location": {
      "lat": 34.25,
      "lng": 108.9
    },
    "summary": "刘邦建立汉朝，汉武帝开辟丝绸之路，中华文明的黄金时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "qin-unification",
      "confucius",
      "eastern-han",
      "zhang-qian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-chu-han",
    "title": "楚汉争霸",
    "year": -202,
    "yearDisplay": "前206年—前202年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 33,
      "lng": 116
    },
    "summary": "项羽刘邦争天下，鸿门宴、暗度陈仓、垓下之围，项羽自刎乌江，刘邦建汉。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-shaqiu-zhibian",
      "china-liu-bang",
      "xiang-yu",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-liu-bang",
    "title": "刘邦建汉与郡国并行",
    "year": -202,
    "yearDisplay": "前202年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "汉高祖刘邦建汉定都长安，郡国并行，后铲除异姓王，白马之盟非刘氏不王。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-chu-han",
      "china-wenjing"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "event-hannibal-scipio",
    "title": "布匿战争与汉尼拔、西庇阿",
    "year": -202,
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "description": "",
    "yearDisplay": "前202年",
    "summary": "第二次布匿战争中汉尼拔翻越阿尔卑斯山远征罗马，最终被大西...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "roman-republic",
      "rome-punic-wars",
      "person-alexander"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "numidia-kingdom",
    "title": "努米底亚王国",
    "year": -202,
    "yearDisplay": "前202年—前46年",
    "civilization": "africa",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 36.5,
      "lng": 6.5
    },
    "summary": "柏柏尔人建立的北非古国，马西尼萨统一后成为罗马盟友，骑兵精锐在第二次布匿战争中帮助罗马击败汉尼拔。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "carthage-civilization",
      "person-hannibal-barca",
      "jugurtha-war",
      "roman-republic"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "yancai-kingdom",
    "title": "奄蔡（阿兰/萨尔马提亚）",
    "year": -200,
    "yearDisplay": "前200年—公元350年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 48,
      "lng": 52
    },
    "summary": "咸海至里海北岸的游牧大国，即西方史料中的阿兰聊/萨尔马提亚，与罗马帝国和汉朝均有联系，后被匈人征服。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "kangju-kingdom",
      "roman-republic",
      "hephtalites"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "artifact-rosetta-stone",
    "title": "罗塞塔石碑",
    "year": -196,
    "yearDisplay": "前196年，托勒密王朝",
    "civilization": "africa",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 31.2,
      "lng": 30.4
    },
    "summary": "古埃及托勒密王朝石碑，三种文字对照，破解埃及象形文字的钥匙。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "alexander",
      "roman-empire",
      "artifact-tutankhamun-mask"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "person-dong-zhong-shu",
    "title": "董仲舒",
    "year": -179,
    "yearDisplay": "前179年—前104年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 36.5,
      "lng": 116.5
    },
    "summary": "西汉大儒，上《天人三策》，\"罢黜百家独尊儒术\"，建立经学体系与大一统理论。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-hanwudi",
      "china-han-wudi",
      "confucius"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "artifact-changxin-lamp",
    "title": "长信宫灯",
    "year": -172,
    "yearDisplay": "西汉，前172年",
    "civilization": "china",
    "categories": [
      "artifact",
      "science"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 38.8,
      "lng": 115.4
    },
    "summary": "西汉鎏金宫女形铜灯，被誉为\"中华第一灯\"，两千年前的环保排烟设计。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "artifact-jinlvyuyi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "artifact-mawangdui",
    "title": "马王堆汉墓·辛追",
    "year": -168,
    "yearDisplay": "前168年，西汉",
    "civilization": "china",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 28.2,
      "lng": 113
    },
    "summary": "西汉长沙国丞相利苍之妻墓，出土保存完好的古尸与3000多件珍贵文物。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "artifact-jinlvyuyi",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-zhangqian",
    "title": "张骞",
    "year": -164,
    "yearDisplay": "约前164年—前114年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 33.1,
      "lng": 107
    },
    "summary": "西汉外交家、探险家，\"丝绸之路的开拓者\"，\"凿空西域\"第一人。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "econ-silk-road",
      "person-hanwudi"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-wenjing",
    "title": "文景之治",
    "year": -150,
    "yearDisplay": "前180年—前141年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "文帝景帝推崇黄老之术，轻徭薄赋三十税一，与民休息，国家富庶。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-liu-bang",
      "china-han-wudi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "rome-conquest-greece",
    "title": "罗马征服希腊",
    "year": -146,
    "yearDisplay": "前146年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "罗马征服希腊和迦太基，成为地中海世界的霸主。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "alexander",
      "rome-empire"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-simaqian",
    "title": "司马迁",
    "year": -145,
    "yearDisplay": "约前145年—前86年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35.5,
      "lng": 110.3
    },
    "summary": "西汉史学家、文学家，\"史圣\"，《史记》作者，中国纪传体史学奠基人。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-hanwudi",
      "qin-unification",
      "person-quyuan",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-huoqubing",
    "title": "霍去病",
    "year": -140,
    "yearDisplay": "前140年—前117年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "西汉名将，卫青外甥，封冠军侯，\"封狼居胥\"，六击匈奴斩捕十一万，英年早逝年仅24岁。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-hanwudi",
      "china-weiqing-huoqubing",
      "person-weiqing"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "zhang-qian",
    "title": "张骞通西域",
    "year": -138,
    "yearDisplay": "前138年—前114年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 33,
      "lng": 107
    },
    "summary": "丝绸之路的开辟者，\"凿空\"西域，第一个睁开眼睛看世界的中国人。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "rome-conquest-greece",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "econ-silk-road",
    "title": "丝绸之路",
    "year": -138,
    "yearDisplay": "前2世纪—公元15世纪",
    "civilization": "global",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 39.7,
      "lng": 99
    },
    "summary": "东西方文明的纽带，张骞\"凿空\"，丝绸、香料、宗教与技术的千年通道。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-zhangqian",
      "tang-dynasty",
      "mongol-conquests"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "artifact-venus-milo",
    "title": "米洛的维纳斯",
    "year": -130,
    "yearDisplay": "约前130年，希腊化时期",
    "civilization": "europe",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 36.7,
      "lng": 24.4
    },
    "summary": "古希腊大理石雕像，爱与美之女神阿芙洛狄忒，残缺的完美。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "greek-city-states",
      "alexander",
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-weiqing",
    "title": "卫青",
    "year": -130,
    "yearDisplay": "？—前106年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "西汉名将，汉武帝时期大司马大将军，七击匈奴七战七捷，收复河套，为汉武帝开疆拓土。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-hanwudi",
      "china-weiqing-huoqubing",
      "person-huoqubing"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-weiqing-huoqubing",
    "title": "卫青霍去病北击匈奴",
    "year": -119,
    "yearDisplay": "前119年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 42,
      "lng": 110
    },
    "summary": "卫青七战七捷收复河套，霍去病封狼居胥饮马瀚海，大破匈奴，西汉最强音。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-han-wudi",
      "china-zhangqian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "artifact-jinlvyuyi",
    "title": "金缕玉衣",
    "year": -113,
    "yearDisplay": "西汉，前113年",
    "civilization": "china",
    "categories": [
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 34,
      "lng": 113.6
    },
    "summary": "汉代贵族殓服，金缕编缀玉片而成，金玉在九窍则死者为之不朽。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "artifact-mawangdui",
      "qin-unification",
      "artifact-bianzhong"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "jugurtha-war",
    "title": "朱古达战争",
    "year": -112,
    "yearDisplay": "前112年—前105年",
    "civilization": "africa",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 36.5,
      "lng": 6.5
    },
    "summary": "罗马与努米底亚之间的战争，朱古达以游击战拖垮罗马军队，最终被马略和苏拉平定，暴露了罗马共和国的腐败与军事危机。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "numidia-kingdom",
      "carthage-civilization",
      "roman-republic"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "china-han-wudi",
    "title": "汉武帝大一统",
    "year": -100,
    "yearDisplay": "前141年—前87年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "汉武帝刘彻在位54年，罢黜百家独尊儒术，推恩令削藩，北击匈奴，凿空西域，西汉鼎盛。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-wenjing",
      "china-weiqing-huoqubing",
      "china-zhangqian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-zhangqian",
    "title": "张骞通西域与丝绸之路",
    "year": -100,
    "yearDisplay": "前138年—前115年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture",
      "science"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 40,
      "lng": 90
    },
    "summary": "张骞两次出使西域，凿空之旅开辟丝绸之路，中国丝绸远销罗马，佛教葡萄等传入中国。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-han-wudi",
      "china-weiqing-huoqubing"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "china-sima-qian",
    "title": "司马迁著《史记》",
    "year": -100,
    "yearDisplay": "前91年前后",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "司马迁受宫刑忍辱著《史记》130篇，纪传体通史开山之作，史家之绝唱。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-han-wudi",
      "china-liu-bang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-hanwudi",
    "title": "汉武帝·刘彻",
    "year": -100,
    "yearDisplay": "前156年—前87年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "西汉第七位皇帝，在位54年，雄才大略，汉朝鼎盛，汉民族称谓由此而来。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "china-zhangqian",
      "person-qinshihuang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-julius-caesar",
    "title": "尤利乌斯·凯撒",
    "year": -100,
    "yearDisplay": "前100年—前44年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "罗马共和国末期军事统帅、政治家，征服高卢，渡过卢比孔河击败庞培成为终身独裁官，是罗马帝国的奠基者。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-republic",
      "roman-empire",
      "person-augustus"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "artifact-antikythera",
    "title": "安提基特拉机械",
    "year": -100,
    "yearDisplay": "约前100年",
    "civilization": "europe",
    "categories": [
      "artifact",
      "science"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 37.6,
      "lng": 23.3
    },
    "summary": "古希腊青铜机械计算机，世界上第一台模拟计算机，可计算天文周期和日月食。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "alexander",
      "alexander-empire",
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "rome-spartacus-revolt",
    "title": "斯巴达克斯起义",
    "year": -73,
    "yearDisplay": "前73年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41,
      "lng": 14.3
    },
    "summary": "角斗士斯巴达克斯率领奴隶发动古罗马规模最大的奴隶起义，席卷意大利半岛，震撼了罗马共和国的奴隶制根基，最终被克拉苏镇压。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-republic",
      "rome-punic-wars",
      "rome-first-triumvirate",
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-augustus",
    "title": "奥古斯都·屋大维",
    "year": -63,
    "yearDisplay": "前63年—公元14年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "罗马帝国开国皇帝，凯撒的甥孙和养子，击败安东尼后统一罗马，以元首制开创了200年的罗马和平时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-julius-caesar",
      "roman-empire",
      "roman-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "rome-first-triumvirate",
    "title": "前三头同盟与凯撒",
    "year": -60,
    "yearDisplay": "前60年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "凯撒、庞培、克拉苏结成\"前三头同盟\"垄断罗马政治。凯撒征服高卢、越过卢比孔河\"骰子已掷出\"，击败庞培成为独裁者，最终被元老刺杀。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-republic",
      "rome-spartacus-revolt",
      "roman-empire",
      "alexander"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "china-zhaojun",
    "title": "昭君出塞",
    "year": -33,
    "yearDisplay": "前33年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "person",
    "eraId": "classical",
    "location": {
      "lat": 40.8,
      "lng": 111.7
    },
    "summary": "王昭君远嫁匈奴呼韩邪单于，维护汉匈和平半个世纪，青冢向黄昏。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "china-han-wudi",
      "china-weiqing-huoqubing"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "rome-empire",
    "title": "罗马帝国建立",
    "year": -27,
    "yearDisplay": "前27年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "屋大维获得\"奥古斯都\"尊号，罗马从共和国进入帝国时代。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "rome-conquest-greece",
      "jesus",
      "rome-split"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "roman-empire",
    "title": "罗马帝国",
    "year": -27,
    "yearDisplay": "前27年—公元395年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "以地中海为内湖的超级帝国，罗马和平时期经济文化繁荣，395年分裂为东西两部分，476年西罗马帝国灭亡。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-republic",
      "byzantine-empire",
      "person-augustus",
      "person-julius-caesar",
      "person-constantine"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "env-roman-warm-period",
    "title": "罗马暖期",
    "year": 0,
    "yearDisplay": "前250年—公元400年",
    "civilization": "global",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "气候温暖湿润期，支撑罗马帝国与汉朝农业繁荣与人口增长，之后转冷伴随民族大迁徙与帝国衰落。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "han-dynasty",
      "western-rome-fall",
      "env-little-ice-age"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "jesus",
    "title": "耶稣诞生",
    "year": 1,
    "yearDisplay": "公元元年",
    "civilization": "middleEast",
    "categories": [
      "myth",
      "culture"
    ],
    "type": "myth",
    "eraId": "classical",
    "location": {
      "lat": 31.8,
      "lng": 35.2
    },
    "summary": "基督教创始人耶稣诞生，公元纪年由此开始。",
    "description": "",
    "disputed": "耶稣的生平事迹主要见于宗教文献，历史学界对其真实生平与神性叙事的区分存在持续讨论。",
    "imageEra": "classical",
    "relatedNodeIds": [
      "moses",
      "rome-empire",
      "edict-of-milan"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "person-jesus",
    "title": "耶稣基督",
    "year": 4,
    "yearDisplay": "约前4年—公元30年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 31.8,
      "lng": 35.2
    },
    "summary": "基督教创始人，拿撒勒的耶稣，宣讲天国福音，被钉十字架后复活，西方文明精神支柱。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "idea-christianity",
      "reformation",
      "counter-reformation-jesuits"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "event-wangmang",
    "title": "王莽篡汉与托古改制",
    "year": 9,
    "yearDisplay": "公元9年—公元23年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "王莽以外戚代汉建新朝，托古改制推行王田、五均六筦、币制改革，脱离现实激化矛盾，绿林赤眉起义后速亡。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "han-dynasty",
      "eastern-han",
      "yellow-turban"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "dynasty-xin",
    "title": "新朝",
    "year": 15,
    "yearDisplay": "公元9年—公元23年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "dynasty",
    "eraId": "classical",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "西汉外戚王莽篡汉建立，托古改制失败，绿林赤眉起义推翻，仅存15年。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "eastern-han"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "eastern-han",
    "title": "东汉建立与造纸术",
    "year": 25,
    "yearDisplay": "公元25年",
    "civilization": "china",
    "categories": [
      "politics",
      "science"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "刘秀建立东汉，蔡伦改进造纸术，对人类文明贡献巨大。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "yellow-turban"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "event-guangwu-zhongxing",
    "title": "光武中兴",
    "year": 25,
    "yearDisplay": "公元25年—公元57年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 34.6,
      "lng": 112.5
    },
    "summary": "刘秀重建东汉，柔道治国、释放奴婢、度田、退功臣进文吏，社会经济恢复发展，史称\"光武中兴\"。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "event-wangmang",
      "yellow-turban",
      "han-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "idea-christianity",
    "title": "基督教的兴起与分裂",
    "year": 30,
    "yearDisplay": "1世纪—16世纪",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "基督教从巴勒斯坦的犹太教派发展为世界第一大宗教，经历了东西大分裂和宗教改革。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "renaissance",
      "enlightenment",
      "crusades"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "person-ban-chao",
    "title": "班超",
    "year": 32,
    "yearDisplay": "公元32年—公元102年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "东汉军事家、外交家，\"投笔从戎\"典故主人公，经营西域三十一年。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-zhangqian",
      "econ-silk-road",
      "han-dynasty"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "sea-funan",
    "title": "扶南王国",
    "year": 50,
    "yearDisplay": "约1—6世纪",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 11.5,
      "lng": 104.9
    },
    "summary": "湄公河三角洲的东南亚最早印度化王国，遣使中国东吴，范蔓时代号称\"扶南大王\"，控制海上贸易，是高棉文明的前身。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "khmer-empire",
      "sea-srivijaya",
      "econ-silk-road",
      "han-dynasty"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "event-christian-paul",
    "title": "保罗传教与基督教外邦化",
    "year": 50,
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 37.98,
      "lng": 23.73
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元50年",
    "summary": "使徒保罗将基督教从犹太教派别发展为面向全人类的普世宗教，...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-jesus",
      "moses",
      "idea-christianity"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "kushan-empire",
    "title": "贵霜帝国",
    "year": 55,
    "yearDisplay": "公元55年—公元425年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 34.5,
      "lng": 69.2
    },
    "summary": "大月氏人建立的中亚帝国，与汉、罗马、安息并称四大强国，丝路枢纽，犍陀罗艺术诞生地。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "econ-silk-road",
      "han-dynasty",
      "roman-empire",
      "persian-empire",
      "maurya-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "idea-buddhism-spread",
    "title": "佛教东传",
    "year": 67,
    "yearDisplay": "前3世纪—公元8世纪",
    "civilization": "eastAsia",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "佛教从印度经丝绸之路传入中国并东亚化的过程，深刻塑造东亚文明的哲学、艺术与语言。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "idea-axial-age",
      "maurya-empire",
      "tang-dynasty",
      "person-xuanzang",
      "artifact-mogao-grottoes"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "china-buddhism-introduction",
    "title": "佛教传入与白马寺",
    "year": 67,
    "yearDisplay": "公元67年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "ancient",
    "location": {
      "lat": 34.7,
      "lng": 112.6
    },
    "summary": "东汉明帝感梦求法，遣使西域迎来摄摩腾、竺法兰两位高僧，以白马驮经回到洛阳，建白马寺——中国第一座佛寺，佛教从此在中国扎根并逐渐中国化。",
    "description": "",
    "imageEra": "ancient",
    "relatedNodeIds": [
      "han-dynasty",
      "econ-silk-road",
      "idea-buddhism-spread",
      "artifact-mogao-grottoes"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "ancient-china"
  },
  {
    "id": "scientist-zhang-heng",
    "title": "张衡",
    "year": 78,
    "yearDisplay": "公元78年—公元139年",
    "civilization": "china",
    "categories": [
      "science"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.7,
      "lng": 112.5
    },
    "summary": "东汉科学家，发明浑天仪、地动仪（世界最早地震仪），正确解释月食成因，《二京赋》，\"科圣\"。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "scientist-zu-chongzhi",
      "scientist-li-shizhen",
      "scientist-song-yingxing"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "landmark-colosseum",
    "title": "罗马斗兽场",
    "year": 80,
    "yearDisplay": "公元80年完工",
    "civilization": "europe",
    "categories": [
      "artifact",
      "military"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 41.89,
      "lng": 12.49
    },
    "summary": "古罗马弗拉维圆形剧场，古代最大的圆形竞技场，可容纳5万观众。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "byzantine-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "rome-five-good-emperors",
    "title": "罗马五贤帝时代",
    "year": 96,
    "yearDisplay": "公元96年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "涅尔瓦、图拉真、哈德良、安敦尼·庇护、马可·奥勒留五位贤帝相继统治，采用养子继承制，罗马帝国达到疆域与治世的巅峰，\"人类最幸福的年代\"。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "pantheon-building",
      "western-rome-fall",
      "env-roman-warm-period"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "artifact-matafeiyan",
    "title": "马踏飞燕（铜奔马）",
    "year": 100,
    "yearDisplay": "东汉，约公元100年",
    "civilization": "china",
    "categories": [
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 37.9,
      "lng": 102.6
    },
    "summary": "东汉青铜骏马雕塑，中国旅游标志，以一足踏飞鸟巧妙表现风驰电掣的速度。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "han-dynasty",
      "econ-silk-road",
      "person-hanwudi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "aksum-empire",
    "title": "阿克苏姆王国",
    "year": 100,
    "yearDisplay": "约公元100年—公元940年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 14.1,
      "lng": 38.7
    },
    "summary": "红海贸易帝国，巨型方尖碑闻名，4世纪埃扎纳王皈依基督教，与罗马、波斯、汉朝并列为当时世界四大强国。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "africa-kush-meroe",
      "byzantine-empire",
      "arab-empire",
      "persian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "america-teotihuacan",
    "title": "特奥蒂瓦坎",
    "year": 100,
    "yearDisplay": "前100年—公元650年",
    "civilization": "america",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 19.7,
      "lng": -98.8
    },
    "summary": "\"众神之城\"，中美洲最大的前哥伦布城市，太阳金字塔、月亮金字塔、死亡大道，人口超10万，影响玛雅和阿兹特克。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "america-olmec",
      "maya-civilization",
      "america-aztec",
      "america-chichen-itza"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "anasazi-culture",
    "title": "阿纳萨齐（普韦布洛崖居）",
    "year": 100,
    "yearDisplay": "约公元100年—公元1300年",
    "civilization": "america",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 37.2,
      "lng": -108
    },
    "summary": "美国西南科罗拉多高原的史前文明，以精湛的石建筑和崖居著称，是普韦布洛印第安人的祖先。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "mogollon-culture",
      "america-teotihuacan",
      "america-cahokia"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "nazca-lines",
    "title": "纳斯卡文明与地画",
    "year": 100,
    "yearDisplay": "前300年—公元800年",
    "civilization": "america",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": -14.7,
      "lng": -75.1
    },
    "summary": "秘鲁南部沿海的史前文明，以巨大的纳斯卡地画闻名于世，数百幅巨型图案至今仍是未解之谜。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "chavin-culture",
      "moche-culture",
      "inca-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "moche-culture",
    "title": "莫切文明",
    "year": 100,
    "yearDisplay": "约公元100年—公元700年",
    "civilization": "america",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": -8.1,
      "lng": -79
    },
    "summary": "秘鲁北部沿海的古文明，以精美的彩绘陶和黄金制品闻名，是安第斯最具艺术性的文明之一。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "chavin-culture",
      "nazca-lines",
      "america-tiwanaku",
      "inca-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "sci-four-inventions",
    "title": "四大发明",
    "year": 105,
    "yearDisplay": "前2世纪—公元15世纪",
    "civilization": "china",
    "categories": [
      "science",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.7,
      "lng": 113.7
    },
    "summary": "造纸术、印刷术、火药、指南针——中国对世界文明最伟大的四项技术贡献。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sci-printing-revolution",
      "tang-dynasty",
      "song-dynasty",
      "econ-silk-road",
      "econ-age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "pantheon-building",
    "title": "万神殿",
    "year": 126,
    "yearDisplay": "公元118年—128年重建",
    "civilization": "europe",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "哈德良皇帝时期重建，43米直径混凝土穹顶、顶部天眼，古罗马建筑工程奇迹，拉斐尔等名人安葬于此。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "artist-raffaello",
      "western-rome-fall",
      "renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "myth-daojiao",
    "title": "道教神系",
    "year": 142,
    "yearDisplay": "东汉以来",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "classical",
    "type": "myth",
    "location": {
      "lat": 32.7,
      "lng": 108.5
    },
    "summary": "中国本土宗教道教的神仙体系，三清四御、玉皇大帝、八仙过海、得道成仙。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "myth-xiyouji",
      "myth-shanhaijing",
      "person-hanwudi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-sunjian",
    "title": "孙坚",
    "year": 155,
    "yearDisplay": "公元155年—公元191年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 30,
      "lng": 120
    },
    "summary": "东汉末年名将，东吴奠基人，孙策孙权之父，讨伐董卓先锋，人称\"江东之虎\"。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-sunce",
      "person-sunquan"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "event-danggu",
    "title": "党锢之祸",
    "year": 166,
    "yearDisplay": "公元166年—公元184年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 34.6,
      "lng": 112.5
    },
    "summary": "东汉士大夫清议对抗宦官专权，两次党锢之祸，李膺等名士被禁锢终身，士大夫集团受挫，为黄巾之乱与东汉衰亡伏笔。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "eastern-han",
      "yellow-turban",
      "three-kingdoms"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-sunce",
    "title": "孙策（小霸王）",
    "year": 175,
    "yearDisplay": "公元175年—公元200年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 30,
      "lng": 120
    },
    "summary": "东汉末年名将，孙坚长子，\"小霸王\"，率千人渡江平定江东，东吴实际开创者，二十六岁遇刺身亡。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-sunjian",
      "person-sunquan"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-sima-yi",
    "title": "司马懿",
    "year": 179,
    "yearDisplay": "公元179年—公元251年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.5,
      "lng": 112.8
    },
    "summary": "三国魏国权臣、军事家，诸葛亮宿敌，司马氏篡魏奠基人，孙子司马炎建立晋朝。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-zhugeliang",
      "person-cao-cao",
      "war-red-cliffs"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-sunquan",
    "title": "孙权（吴大帝）",
    "year": 182,
    "yearDisplay": "公元182年—公元252年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 32,
      "lng": 118.7
    },
    "summary": "三国东吴开国皇帝，孙坚次子，兄终弟及，赤壁之战联刘抗曹，称帝建业，在位52年。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-sunjian",
      "person-sunce",
      "war-red-cliffs"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "yellow-turban",
    "title": "黄巾起义",
    "year": 184,
    "yearDisplay": "公元184年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34,
      "lng": 114
    },
    "summary": "黄巾起义爆发，东汉王朝名存实亡，乱世开启。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "eastern-han",
      "three-kingdoms"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-cao-pi",
    "title": "曹丕（魏文帝）",
    "year": 187,
    "yearDisplay": "公元187年—公元226年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.5,
      "lng": 112.8
    },
    "summary": "三国魏开国皇帝，曹操之子，代汉建魏，著《典论·论文》，中国文学批评史开山之作。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-cao-cao",
      "person-cao-zhi"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "sea-cham",
    "title": "占婆王国",
    "year": 192,
    "yearDisplay": "公元192年—公元1832年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 15.8,
      "lng": 108.1
    },
    "summary": "越南中部占人建立的印度教海洋王国，美山圣地是其宗教中心，与真腊、越南争战千年，1832年被阮朝最终吞并。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "sea-angkor-founding",
      "sea-suryavarman-ii",
      "sea-tran-dynasty",
      "sea-ly-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "person-cao-zhi",
    "title": "曹植（陈思王）",
    "year": 192,
    "yearDisplay": "公元192年—公元232年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 34.5,
      "lng": 112.8
    },
    "summary": "三国文学家，曹操之子，才高八斗，七步成诗，建安文学集大成者，《洛神赋》千古传诵。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-cao-cao",
      "person-cao-pi"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "person-cao-cao",
    "title": "曹操",
    "year": 200,
    "yearDisplay": "公元155年—公元220年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 33.9,
      "lng": 115.8
    },
    "summary": "东汉末年杰出的政治家、军事家、文学家，曹魏政权奠基人，建安文学领袖。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-sanguo",
      "person-zhugeliang",
      "person-taizong"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "yamatai-kingdom",
    "title": "邪马台国与大和政权",
    "year": 200,
    "yearDisplay": "约1—6世纪",
    "civilization": "eastAsia",
    "categories": [
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 34.7,
      "lng": 135.8
    },
    "summary": "日本最早的国家形态，女王卑弥呼遣使曹魏，大和国逐步统一日本列岛，天皇\"万世一系\"。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "kofun-period",
      "heian-period",
      "tang-dynasty"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "war-guandu",
    "title": "官渡之战",
    "year": 200,
    "yearDisplay": "公元200年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 35,
      "lng": 113.9
    },
    "summary": "曹操以两万击败袁绍十万大军，奇袭乌巢烧粮，以弱胜强，为统一北方奠定基础。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "war-red-cliffs",
      "war-sanguo",
      "person-cao-cao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "america-tiwanaku",
    "title": "蒂亚瓦纳科",
    "year": 200,
    "yearDisplay": "约公元200年—公元1000年",
    "civilization": "america",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -16.6,
      "lng": -68.7
    },
    "summary": "安第斯的的喀喀湖畔的古代文明，太阳门是其标志，安第斯文明的宗教中心，被认为是印加文明的重要源头之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-inca-roads",
      "america-aztec",
      "mali-empire",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "mogollon-culture",
    "title": "莫戈隆文化",
    "year": 200,
    "yearDisplay": "约公元200年—公元1450年",
    "civilization": "america",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 33.5,
      "lng": -108.5
    },
    "summary": "美国西南新墨西哥州的史前文明，以精美的彩陶和坑房著称，是阿纳萨齐与霍霍坎之间的重要文化。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "anasazi-culture",
      "america-olmec",
      "mississippian-culture"
    ],
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "war-red-cliffs",
    "title": "赤壁之战",
    "year": 208,
    "yearDisplay": "公元208年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 29.7,
      "lng": 113.9
    },
    "summary": "孙刘联军五万大败曹操二十余万大军，火攻破曹，奠定三国鼎立格局。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "war-guandu",
      "war-sanguo",
      "person-zhugeliang",
      "person-cao-cao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "three-kingdoms",
    "title": "三国时代开始",
    "year": 220,
    "yearDisplay": "公元220年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34,
      "lng": 113
    },
    "summary": "曹丕代汉建魏，三国鼎立时代正式开始。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "yellow-turban",
      "western-jin"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "dynasty-sanguo",
    "title": "三国",
    "year": 220,
    "yearDisplay": "公元220年—公元280年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 33,
      "lng": 114
    },
    "summary": "东汉灭亡后魏蜀吴三足鼎立，群英荟萃，最终司马氏篡魏建晋，灭吴统一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-xijin",
      "person-cao-cao",
      "person-zhugeliang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "war-sanguo",
    "title": "三国鼎立",
    "year": 220,
    "yearDisplay": "公元184年—公元280年（汉末三国）",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 30.7,
      "lng": 112.2
    },
    "summary": "魏蜀吴三分天下，英雄辈出的时代，桃园结义、三顾茅庐、赤壁之战。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "han-dynasty",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "institution-nine-rank",
    "title": "九品中正制",
    "year": 220,
    "yearDisplay": "公元220年—隋",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34,
      "lng": 113.7
    },
    "summary": "陈群创制的选官制度，中正官按家世、道德、才能品评士人分九品，\"上品无寒门下品无势族\"，至隋唐被科举取代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "institution-menfa-politics",
      "sui-dynasty",
      "event-zhenguan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-zhugeliang",
    "title": "诸葛亮",
    "year": 228,
    "yearDisplay": "公元181年—公元234年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 32,
      "lng": 112.1
    },
    "summary": "蜀汉丞相，智慧与忠诚的象征，鞠躬尽瘁死而后已，千古人臣典范。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-sanguo",
      "person-cao-cao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "culture-xuanxue",
    "title": "魏晋玄学与竹林七贤",
    "year": 260,
    "yearDisplay": "曹魏-西晋",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 35,
      "lng": 113.5
    },
    "summary": "何晏王弼祖述老庄开玄学之风，嵇康阮籍等竹林七贤越名教而任自然，清谈、服药、饮酒，思想解放时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-wangxizhi",
      "institution-menfa-politics",
      "institution-nine-rank"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-constantine",
    "title": "君士坦丁大帝",
    "year": 272,
    "yearDisplay": "公元272年—公元337年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 41,
      "lng": 28.9
    },
    "summary": "罗马帝国皇帝，使基督教从受迫害宗教转变为帝国主导宗教的关键人物，发布米兰敕令，建新都君士坦丁堡。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "roman-empire",
      "byzantine-empire",
      "crusades",
      "rome-diocletian-tetrarchy",
      "idea-christianity",
      "western-rome-fall",
      "constantinople-fall"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "western-jin",
    "title": "西晋短暂统一",
    "year": 280,
    "yearDisplay": "公元280年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 34.6,
      "lng": 112.4
    },
    "summary": "晋武帝司马炎灭吴，三国归晋，短暂统一。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "three-kingdoms",
      "five-hu"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "dynasty-xijin",
    "title": "西晋",
    "year": 280,
    "yearDisplay": "公元266年—公元316年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "司马炎篡魏建立，短暂统一后八王之乱，五胡乱华，永嘉之乱而亡。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-sanguo",
      "dynasty-dongjin"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "rome-diocletian-tetrarchy",
    "title": "戴克里先与四帝共治",
    "year": 284,
    "yearDisplay": "公元284年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "戴克里先结束三世纪危机，实行\"四帝共治\"——两位奥古斯都（正帝）加两位凯撒（副帝）分治东西，强化君主专制，为罗马帝国最终分裂埋下伏笔。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "rome-five-good-emperors",
      "person-constantine",
      "western-rome-fall",
      "byzantine-macedonian-renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-eight-kings",
    "title": "八王之乱",
    "year": 291,
    "yearDisplay": "公元291年—公元306年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.6,
      "lng": 112.5
    },
    "summary": "西晋司马氏宗王为争夺中央政权混战十六年，国力耗尽，直接引发五胡乱华和永嘉之乱。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-yongjia-nandu",
      "war-feishui",
      "dynasty-nanbeichao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "kofun-period",
    "title": "日本古坟时代",
    "year": 300,
    "yearDisplay": "公元300年—公元592年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.5,
      "lng": 135.8
    },
    "summary": "日本统一政权的起源，巨大古坟时代，大和朝廷逐渐统治日本列岛。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "africa-ghana-empire",
    "title": "加纳帝国",
    "year": 300,
    "yearDisplay": "约公元300年—公元1240年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 15.5,
      "lng": -8
    },
    "summary": "西非首个跨撒哈拉黄金贸易霸权，\"黄金之国\"，索宁克人建立，国王号称\"黄金之王\"，1076年被穆拉比特王朝攻陷后衰落。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mali-empire",
      "songhai-empire",
      "africa-timbuktu",
      "arab-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "person-wangxizhi",
    "title": "王羲之",
    "year": 303,
    "yearDisplay": "公元303年—公元361年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 35.1,
      "lng": 118.3
    },
    "summary": "东晋大书法家，\"书圣\"，《兰亭集序》被誉为天下第一行书。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "event-yongjia-nandu",
    "title": "永嘉之乱与衣冠南渡",
    "year": 311,
    "yearDisplay": "311/317",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 32.1,
      "lng": 118.8
    },
    "summary": "匈奴刘曜破洛阳俘晋怀帝，中原士族大规模南迁，司马睿建康建东晋，经济文化重心首次南移。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-eight-kings",
      "war-feishui",
      "culture-xuanxue"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "edict-of-milan",
    "title": "米兰敕令",
    "year": 313,
    "yearDisplay": "公元313年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 45.5,
      "lng": 9.2
    },
    "summary": "罗马皇帝君士坦丁颁布米兰敕令，基督教合法化。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "jesus",
      "rome-split"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "five-hu",
    "title": "五胡乱华",
    "year": 316,
    "yearDisplay": "公元316年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 35,
      "lng": 110
    },
    "summary": "匈奴、鲜卑、羯、氐、羌五族入主中原，西晋灭亡。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "western-jin",
      "sui-dynasty"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "institution-menfa-politics",
    "title": "东晋门阀政治",
    "year": 317,
    "yearDisplay": "公元317年—公元420年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 32.1,
      "lng": 118.8
    },
    "summary": "\"王与马共天下\"，王导等侨姓士族与皇权共治天下，庾桓谢诸族相继执政，皇权不振的特殊政治形态。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-yongjia-nandu",
      "institution-nine-rank",
      "war-feishui",
      "dynasty-nanbeichao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "gupta-empire",
    "title": "笈多王朝",
    "year": 320,
    "yearDisplay": "公元320年—公元550年",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "classical",
    "type": "dynasty",
    "location": {
      "lat": 25.6,
      "lng": 85.1
    },
    "summary": "印度古典文化的黄金时代，被称为印度的文艺复兴，数学天文学成就惊人，发明了0的概念和十进制。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "maurya-empire",
      "arab-empire",
      "mughal-empire",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "person-ge-hong",
    "title": "葛洪与道教理论化",
    "year": 330,
    "yearDisplay": "公元284年—公元364年",
    "civilization": "china",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 23,
      "lng": 113.4
    },
    "summary": "东晋葛洪著《抱朴子》，外儒内道，系统阐述金丹道理论，神仙方术体系化，医书《肘后备急方》。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "culture-xuanxue",
      "event-yongjia-nandu",
      "tang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-wangxianzhi",
    "title": "王献之",
    "year": 344,
    "yearDisplay": "公元344年—公元386年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "person",
    "location": {
      "lat": 35,
      "lng": 118
    },
    "summary": "东晋书法家，王羲之第七子，\"二王\"之一，行书草书别具一格，与其父并称\"二王\"。",
    "description": "",
    "imageEra": "imperial",
    "relatedNodeIds": [
      "person-wangxizhi",
      "dynasty-nanbeichao"
    ],
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "artifact-lanting",
    "title": "兰亭集序",
    "year": 353,
    "yearDisplay": "东晋，公元353年",
    "civilization": "china",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "classical",
    "type": "artifact",
    "location": {
      "lat": 30,
      "lng": 120.58
    },
    "summary": "王羲之乘兴写下的行书巅峰之作，被誉为\"天下第一行书\"，真迹已失传。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "person-wangxizhi",
      "dynasty-jin"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "artifact-mogao-grottoes",
    "title": "敦煌莫高窟",
    "year": 366,
    "yearDisplay": "前秦至元，公元366年—1368年",
    "civilization": "china",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 40.04,
      "lng": 94.81
    },
    "summary": "世界上规模最大、延续时间最长的佛教艺术宝库，丝路明珠，东方艺术博物馆。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "econ-silk-road",
      "tang-dynasty",
      "person-xuanzang",
      "idea-buddhism-spread"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-wangmeng",
    "title": "王猛与前秦统一北方",
    "year": 370,
    "yearDisplay": "公元357年—公元376年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "苻坚用王猛改革，前秦灭前燕、前凉、代国统一北方。王猛临终劝勿攻晋，苻坚不听，致淝水之败、国家崩溃。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "war-feishui",
      "event-eight-kings",
      "event-yongjia-nandu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "rome-great-migration",
    "title": "民族大迁徙与西罗马灭亡",
    "year": 375,
    "yearDisplay": "公元375年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 47,
      "lng": 10
    },
    "summary": "匈奴人西迁引发日耳曼民族连锁迁徙——西哥特、汪达尔、法兰克、盎格鲁-撒克逊等涌入罗马帝国，476年西罗马帝国灭亡，欧洲进入中世纪。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "western-rome-fall",
      "person-constantine",
      "black-death",
      "byzantine-macedonian-renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-roman-state-church",
    "title": "基督教成为罗马国教",
    "year": 380,
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元380年",
    "summary": "狄奥多西一世颁布《萨洛尼卡敕令》，将基督教定为罗马帝国国...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-constantine",
      "edict-of-milan",
      "great-schism",
      "roman-empire"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "dynasty-dongjin",
    "title": "东晋",
    "year": 383,
    "yearDisplay": "公元317年—公元420年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "司马睿偏安江南，门阀政治鼎盛，淝水之战大败前秦，王羲之陶渊明为文化亮点。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-xijin",
      "dynasty-nanbeichao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "war-feishui",
    "title": "淝水之战",
    "year": 383,
    "yearDisplay": "公元383年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 32.7,
      "lng": 116.8
    },
    "summary": "东晋八万北府兵大败前秦苻坚八十七万大军，风声鹤唳草木皆兵，保住了南朝汉文化。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "war-sanguo",
      "war-guandu",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-china-b"
  },
  {
    "id": "rome-split",
    "title": "罗马帝国分裂",
    "year": 395,
    "yearDisplay": "公元395年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41,
      "lng": 12.5
    },
    "summary": "罗马帝国分裂为东西两部分，西罗马和东罗马走上不同道路。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "rome-empire",
      "western-rome-fall"
    ],
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "byzantine-empire",
    "title": "拜占庭帝国",
    "year": 395,
    "yearDisplay": "公元395年—公元1453年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 41,
      "lng": 28.9
    },
    "summary": "东罗马帝国，延续千年的中世纪帝国，以君士坦丁堡为首都，保存了古希腊罗马文化，1453年被奥斯曼帝国灭亡。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "roman-empire",
      "ottoman-empire",
      "crusades",
      "arab-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "person-faxian",
    "title": "法显西行求法",
    "year": 399,
    "yearDisplay": "公元399年—公元412年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.6,
      "lng": 112.5
    },
    "summary": "65岁高龄西行天竺求法，历14年30余国，携归梵本著《佛国记》，早玄奘230年，由海路归国。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "idea-buddhism-spread",
      "artifact-mogao-grottoes",
      "artifact-longmen-grottoes",
      "tang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "env-loulan-oasis",
    "title": "楼兰消亡与绿洲文明",
    "year": 400,
    "yearDisplay": "约4世纪前后",
    "civilization": "centralAsia",
    "categories": [
      "culture"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 40,
      "lng": 89.8
    },
    "summary": "罗布泊沿岸的楼兰等绿洲城邦，因水源改道、沙漠化、丝路变迁而消亡，环境变迁对文明兴衰的警示。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "econ-silk-road",
      "han-dynasty",
      "env-medieval-warm-period",
      "china-zhangqian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "scientist-zu-chongzhi",
    "title": "祖冲之",
    "year": 429,
    "yearDisplay": "公元429年—公元500年",
    "civilization": "china",
    "categories": [
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "南朝数学家，圆周率精确到小数点后7位（3.1415926-927）领先世界近千年，《大明历》、水碓磨、千里船。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "scientist-zhang-heng",
      "scientist-li-shizhen",
      "scientist-song-yingxing",
      "scientist-zu-chongzhi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "event-northern-wei-unify",
    "title": "北魏统一北方",
    "year": 439,
    "yearDisplay": "公元439年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 37.9,
      "lng": 112.6
    },
    "summary": "北魏太武帝拓跋焘灭北凉，结束十六国分裂局面，鲜卑拓跋部入主中原，北方进入北朝时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-filial-piety",
      "war-feishui",
      "dynasty-nanbeichao"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "hephtalites",
    "title": "嚈哒（白匈奴）",
    "year": 440,
    "yearDisplay": "约公元440年—公元560年",
    "civilization": "centralAsia",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 37,
      "lng": 66
    },
    "summary": "游牧民族建立的中亚帝国，被称为\"白匈奴\"，南下攻灭贵霜、打败萨珊波斯，后被突厥-萨珊联军夹击所灭。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "kushan-empire",
      "gupta-empire",
      "persian-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "artifact-yungang-grottoes",
    "title": "云冈石窟",
    "year": 460,
    "yearDisplay": "公元460年—公元524年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 40.1,
      "lng": 113.1
    },
    "summary": "北魏文成帝时昙曜主持开凿，昙曜五窟为代表，犍陀罗-凉州模式，大佛象征帝王\"皇帝即佛\"，北魏皇家造像艺术巅峰。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "idea-buddhism-spread",
      "artifact-longmen-grottoes",
      "event-filial-piety"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "western-rome-fall",
    "title": "西罗马帝国灭亡",
    "year": 476,
    "yearDisplay": "公元476年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "classical",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "西罗马帝国灭亡，欧洲古典时代结束，中世纪开始。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "rome-split",
      "sui-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-europe"
  },
  {
    "id": "institution-land-equalization",
    "title": "均田制与三长制",
    "year": 485,
    "yearDisplay": "公元485年—唐中期",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 37.9,
      "lng": 112.6
    },
    "summary": "北魏李安世建议，国家授田（露田、桑田），三长（邻、里、党）负责征发，为隋唐均田制与租庸调制之源。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-filial-piety",
      "event-northern-wei-unify",
      "sui-dynasty",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "event-filial-piety",
    "title": "北魏孝文帝汉化改革",
    "year": 493,
    "yearDisplay": "公元471年—公元499年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.6,
      "lng": 112.5
    },
    "summary": "孝文帝元宏迁都洛阳，禁胡服胡语、改汉姓（拓跋→元）、胡汉通婚、行均田制，深度汉化促民族融合，亦埋下六镇之乱伏笔。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-northern-wei-unify",
      "event-six-garrison",
      "institution-land-equalization",
      "artifact-longmen-grottoes"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "artifact-longmen-grottoes",
    "title": "龙门石窟",
    "year": 493,
    "yearDisplay": "公元493年—北宋",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 34.6,
      "lng": 112.5
    },
    "summary": "孝文帝迁都洛阳后开凿，宾阳三洞、卢舍那大佛（唐），中国石窟艺术巅峰，书法珍品\"龙门二十品\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "idea-buddhism-spread",
      "artifact-yungang-grottoes",
      "event-filial-piety",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "dynasty-nanbeichao",
    "title": "南北朝",
    "year": 500,
    "yearDisplay": "公元420年—公元589年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 33,
      "lng": 114
    },
    "summary": "南朝宋齐梁陈相继，北朝北魏统一后分裂东西魏，民族大融合，佛教鼎盛。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-dongjin",
      "sui-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "myth-norse",
    "title": "北欧神话体系",
    "year": 500,
    "yearDisplay": "中世纪",
    "civilization": "europe",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "medieval",
    "type": "myth",
    "location": {
      "lat": 59.9,
      "lng": 10.7
    },
    "summary": "斯堪的纳维亚和日耳曼民族的神话体系，充满宿命论和悲壮色彩，以奥丁、托尔等神祇和诸神黄昏概念著称。",
    "description": "",
    "disputed": "北欧诸神是北欧神话中的神祇体系，属古代日耳曼人的神话传说，非历史记载。",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "viking-age",
      "myth-greek",
      "myth-egyptian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-six-garrison",
    "title": "六镇起义与北魏分裂",
    "year": 523,
    "yearDisplay": "公元523年—公元534年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 40.8,
      "lng": 111.7
    },
    "summary": "北方六镇鲜卑武人集团不满汉化地位下降起兵，尔朱荣崛起、河阴之变，北魏后分裂为东魏西魏，演变为北齐北周。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-filial-piety",
      "event-zhouwu-persecution",
      "sui-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "rome-justinian-reconquest",
    "title": "查士丁尼与罗马法大成",
    "year": 527,
    "yearDisplay": "公元527年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 41,
      "lng": 28.98
    },
    "summary": "拜占庭皇帝查士丁尼一世命人编纂《国法大全》（罗马法集大成之作），派贝利撒留收复意大利北非，兴建圣索菲亚大教堂，是拜占庭第一个黄金时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "rome-great-migration",
      "byzantine-macedonian-renaissance",
      "constantinople-fall",
      "black-death"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "building-hagia-sophia",
    "title": "圣索菲亚大教堂",
    "year": 537,
    "yearDisplay": "公元532年—537年建成",
    "civilization": "europe",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 41.01,
      "lng": 28.98
    },
    "summary": "拜占庭建筑最伟大的杰作，巨大穹顶仿佛由金链悬挂于天国，千年间基督教与伊斯兰教的共同圣所。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "byzantine-empire",
      "ottoman-empire",
      "crusades"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "person-muhammad",
    "title": "穆罕默德",
    "year": 570,
    "yearDisplay": "公元570年—公元632年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 21.4,
      "lng": 39.8
    },
    "summary": "伊斯兰教创始人，阿拉伯政治家军事领袖，统一阿拉伯半岛，建立政教合一的伊斯兰共同体。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "abbasid",
      "delhi-sultanate",
      "mali-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "event-zhouwu-persecution",
    "title": "北周武帝灭佛",
    "year": 574,
    "yearDisplay": "公元574年—公元577年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "\"三武一宗灭佛\"之一，北周武帝灭佛道、还俗僧尼增赋税兵源，灭北齐统一北方，为隋统一奠基。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-six-garrison",
      "sui-dynasty",
      "tang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "sui-dynasty",
    "title": "隋朝建立",
    "year": 581,
    "yearDisplay": "公元581年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 109
    },
    "summary": "杨坚建立隋朝，科举制创立，大运河开凿，盛世前奏。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "five-hu",
      "tang-dynasty",
      "xuanzang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "china-kaihuang-zhi",
    "title": "开皇之治",
    "year": 581,
    "yearDisplay": "公元581年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "隋文帝杨坚代周建隋、统一南北，推行三省六部制、开皇律、初创科举、建大兴城、仓储丰实——为盛唐气象奠定了坚实基础。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-kaiyuan",
      "event-zhenguan",
      "tang-dynasty",
      "sui-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "america-maya-cities",
    "title": "玛雅城邦蒂卡尔与帕伦克",
    "year": 600,
    "yearDisplay": "公元250年—公元900年",
    "civilization": "america",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "classical",
    "type": "event",
    "location": {
      "lat": 17.2,
      "lng": -89.6
    },
    "summary": "玛雅古典期两大城邦：蒂卡尔与卡拉克穆尔争霸数百年，帕伦克的帕卡尔大帝石棺和铭文神庙展现玛雅文明的最高成就。",
    "description": "",
    "imageEra": "classical",
    "relatedNodeIds": [
      "america-olmec",
      "america-teotihuacan",
      "america-chichen-itza",
      "america-aztec"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "classical-others"
  },
  {
    "id": "america-chichen-itza",
    "title": "奇琴伊察",
    "year": 600,
    "yearDisplay": "约公元600年—公元1300年",
    "civilization": "america",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 20.7,
      "lng": -88.6
    },
    "summary": "玛雅-托尔特克文明的中心，库库尔坎金字塔（羽蛇神）春分秋分光影蛇形，玛雅天文历法的巅峰，世界新七大奇迹之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-maya-cities",
      "america-olmec",
      "america-aztec",
      "america-teotihuacan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "wari-empire",
    "title": "瓦里帝国",
    "year": 600,
    "yearDisplay": "约公元600年—公元1100年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -13.5,
      "lng": -74.15
    },
    "summary": "安第斯第一个真正的帝国，以瓦里城为首都，征服了秘鲁大部分地区，是印加帝国的前身。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-tiwanaku",
      "inca-empire",
      "chavin-culture",
      "moche-culture"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "person-xuanzang",
    "title": "玄奘",
    "year": 602,
    "yearDisplay": "公元602年—公元664年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.7,
      "lng": 113
    },
    "summary": "唐代高僧，法相唯识宗创始人，西行天竺取经，《西游记》唐僧原型。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "econ-silk-road",
      "china-kentoshi-jianzhen",
      "china-buddhism-introduction"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "idea-islam",
    "title": "伊斯兰教的兴起与扩张",
    "year": 610,
    "yearDisplay": "7—8世纪",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 21.4,
      "lng": 39.8
    },
    "summary": "穆罕默德创立伊斯兰教，四大哈里发和阿拉伯帝国横跨欧亚非，成为世界第二大宗教。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "arab-empire",
      "ottoman-empire",
      "crusades",
      "persian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "tang-dynasty",
    "title": "唐朝建立",
    "year": 618,
    "yearDisplay": "公元618年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 34.25,
      "lng": 108.95
    },
    "summary": "李渊建立唐朝，贞观之治、开元盛世，中华文明的黄金时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sui-dynasty",
      "an-shi-rebellion",
      "wu-zetian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "islam",
    "title": "伊斯兰教诞生",
    "year": 622,
    "yearDisplay": "公元622年",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "medieval",
    "location": {
      "lat": 21.4,
      "lng": 39.8
    },
    "summary": "穆罕默德在麦加传教，希吉拉纪元开始，伊斯兰教兴起。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "arab-empire",
      "abbasid"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "xuanzang",
    "title": "玄奘西行",
    "year": 629,
    "yearDisplay": "公元602年—公元664年",
    "civilization": "china",
    "categories": [
      "culture",
      "science"
    ],
    "type": "person",
    "eraId": "medieval",
    "location": {
      "lat": 34.5,
      "lng": 108.9
    },
    "summary": "唐代高僧，法相唯识宗创始人，《西游记》中唐僧的原型，西行求法的伟大旅行家。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "islam",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "event-zhenguan",
    "title": "贞观之治",
    "year": 630,
    "yearDisplay": "公元627年—公元649年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "唐太宗李世民在位期间的治世，政治清明、经济复苏、文化繁荣，被尊为天可汗。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "person-taizong",
      "event-kaiyuan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-taizong",
    "title": "唐太宗·李世民",
    "year": 630,
    "yearDisplay": "公元598年—公元649年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "唐朝第二位皇帝，贞观之治开创者，中国历史上最杰出的帝王之一，被尊为天可汗。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-zhenguan",
      "event-kaiyuan",
      "person-wuzetian",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "china-kentoshi-jianzhen",
    "title": "遣唐使与鉴真东渡",
    "year": 630,
    "yearDisplay": "公元630年",
    "civilization": "eastAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.7,
      "lng": 135.5
    },
    "summary": "日本十余次派出遣唐使全面学习唐朝制度文化，推动了日本大化改新；鉴真六次东渡日本传律宗、建唐招提寺，深刻塑造了东亚汉字文化圈。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-kaiyuan",
      "tang-dynasty",
      "china-buddhism-introduction",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "arab-empire",
    "title": "阿拉伯帝国",
    "year": 632,
    "yearDisplay": "公元632年—公元1258年",
    "civilization": "middleEast",
    "categories": [
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 33.3,
      "lng": 44.4
    },
    "summary": "穆罕默德创立伊斯兰教后阿拉伯人建立的帝国，阿拔斯王朝时期伊斯兰黄金时代学术繁荣。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "persian-empire",
      "ottoman-empire",
      "gupta-empire",
      "byzantine-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "islamic-conquest",
    "title": "阿拉伯大征服",
    "year": 632,
    "yearDisplay": "公元632年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 21.4,
      "lng": 39.8
    },
    "summary": "穆罕默德去世后，四大哈里发时期的阿拉伯军队以惊人速度扩张——灭萨珊波斯、大败拜占庭、占领叙利亚埃及波斯，建立地跨欧亚非三大洲的大帝国。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "islam",
      "abbasid",
      "constantinople-fall",
      "crusades"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "event-islam-rashidun",
    "title": "四大哈里发与伊斯兰大征服",
    "year": 632,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 24.5,
      "lng": 39.6
    },
    "civilization": "middleEast",
    "categories": [
      "military",
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元632年",
    "summary": "穆罕默德逝世后，四位正统哈里发（艾布·伯克尔、欧麦尔、奥...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-muhammad",
      "islamic-conquest",
      "arab-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "china-wencheng-princess",
    "title": "文成公主入藏",
    "year": 641,
    "yearDisplay": "公元641年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 29.65,
      "lng": 91.1
    },
    "summary": "唐太宗将文成公主嫁给吐蕃赞普松赞干布，带去中原的典籍、工匠、种子、技术和佛教，促进了汉藏两族的经济文化交流，成为民族团结的千古佳话。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-zhenguan",
      "tang-dynasty",
      "china-buddhism-introduction",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "taika-reform",
    "title": "大化改新",
    "year": 645,
    "yearDisplay": "公元645年—公元701年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.7,
      "lng": 135.8
    },
    "summary": "日本从奴隶社会向封建社会转型的改革，以唐朝为蓝本建立中央集权律令制国家。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "heian-period",
      "kofun-period"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "unified-silla",
    "title": "统一新罗",
    "year": 668,
    "yearDisplay": "公元668年—公元935年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 35.8,
      "lng": 129.2
    },
    "summary": "朝鲜半岛第一个统一国家，佛教艺术鼎盛期，与唐朝密切交流的黄金时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "goryeo-dynasty",
      "heian-period",
      "china-kentoshi-jianzhen"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "sea-srivijaya",
    "title": "室利佛逝",
    "year": 683,
    "yearDisplay": "公元683年—公元1377年",
    "civilization": "eastAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -3,
      "lng": 104.7
    },
    "summary": "苏门答腊巨港的海上佛教商业帝国，控制马六甲海峡与香料航线，唐代称室利佛逝，是东南亚海上强权和佛教传播中心。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-funan",
      "sea-majapahit",
      "econ-silk-road",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "wu-zetian",
    "title": "武则天称帝",
    "year": 690,
    "yearDisplay": "公元690年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.25,
      "lng": 108.95
    },
    "summary": "中国历史上唯一的女皇帝武则天登基，改国号为周。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-wuzetian",
    "title": "武则天",
    "year": 690,
    "yearDisplay": "公元624年—公元705年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.7,
      "lng": 112.4
    },
    "summary": "中国历史上唯一的正统女皇帝，14岁入宫，67岁称帝，在位15年，立无字碑。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-taizong",
      "event-kaiyuan",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "heian-period",
    "title": "日本奈良·平安时代",
    "year": 710,
    "yearDisplay": "公元710年—公元1192年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 35,
      "lng": 135.8
    },
    "summary": "全面学习唐朝的黄金时代，日本文化的形成期，律令制国家的鼎盛与衰落。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "person-xuanzang",
      "song-dynasty",
      "kofun-period",
      "kamakura-shogunate"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "nara-period",
    "title": "奈良时代",
    "year": 710,
    "yearDisplay": "公元710年—公元794年",
    "civilization": "eastAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.7,
      "lng": 135.8
    },
    "summary": "日本全面吸收盛唐文化的黄金时代，遣唐使、鉴真东渡、万叶集，奠定日本文化基础。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "econ-silk-road",
      "idea-buddhism-spread",
      "artifact-mogao-grottoes"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "medieval-reconquista",
    "title": "收复失地运动",
    "year": 722,
    "yearDisplay": "公元722年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 40.4,
      "lng": -3.7
    },
    "summary": "伊比利亚半岛基督教王国长达700多年的\"收复失地\"运动，从一小片山区到逐步南下，1492年格拉纳达陷落，西班牙统一，大航海时代随之开启。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "islam",
      "crusades",
      "age-of-exploration",
      "medieval-hundred-years-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-kaiyuan",
    "title": "开元盛世",
    "year": 730,
    "yearDisplay": "公元713年—公元741年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "唐玄宗开元年间的盛世，唐朝巅峰，中国封建社会最繁荣时期之一，诗歌艺术全面繁荣。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "person-taizong",
      "an-shi-rebellion",
      "person-libai",
      "person-dufu",
      "event-zhenguan",
      "china-kaihuang-zhi",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-charlemagne",
    "title": "查理曼",
    "year": 742,
    "yearDisplay": "公元742年—公元814年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 50.9,
      "lng": 6.9
    },
    "summary": "法兰克国王、查理曼帝国创建者，被称为欧洲之父，800年加冕为罗马人的皇帝，推行加洛林文艺复兴。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "carolingian-empire",
      "holy-roman-empire",
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "abbasid",
    "title": "阿拔斯王朝与伊斯兰黄金时代",
    "year": 750,
    "yearDisplay": "公元750年",
    "civilization": "middleEast",
    "categories": [
      "science",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 33.3,
      "lng": 44.4
    },
    "summary": "阿拔斯王朝建立，巴格达智慧宫成为世界学术中心。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "islam",
      "arab-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "person-libai",
    "title": "李白",
    "year": 750,
    "yearDisplay": "公元701年—公元762年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 31.7,
      "lng": 104.7
    },
    "summary": "唐代最伟大的浪漫主义诗人，诗仙，诗风豪放飘逸想象瑰丽，存诗近千首。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-dufu",
      "event-kaiyuan",
      "an-shi-rebellion",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "abbasid-baghdad",
    "title": "阿拔斯革命与巴格达建城",
    "year": 750,
    "yearDisplay": "公元750年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 33.3,
      "lng": 44.4
    },
    "summary": "阿拔斯王朝取代倭马亚王朝建立\"黑衣大食\"，哈里发曼苏尔兴建巴格达城作为新都——\"和平之城\"很快成为当时世界上最大、最富庶的城市之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "islamic-conquest",
      "islam",
      "translation-movement",
      "mongol-conquests"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "event-paper-talas",
    "title": "怛罗斯之战与造纸术西传",
    "year": 751,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 42.8,
      "lng": 71.4
    },
    "civilization": "middleEast",
    "categories": [
      "culture",
      "military"
    ],
    "description": "",
    "yearDisplay": "公元751年",
    "summary": "751年唐与阿拉伯在中亚怛罗斯交战，唐军被俘工匠将造纸术...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "abbasid",
      "eastern-han",
      "event-samarkand-paper"
    ],
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "an-shi-rebellion",
    "title": "安史之乱",
    "year": 755,
    "yearDisplay": "公元755年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.25,
      "lng": 108.95
    },
    "summary": "安禄山史思明叛乱，唐朝由盛转衰的转折点。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "song-dynasty",
      "event-kaiyuan",
      "person-libai"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-dufu",
    "title": "杜甫",
    "year": 760,
    "yearDisplay": "公元712年—公元770年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 30.7,
      "lng": 104
    },
    "summary": "唐代最伟大的现实主义诗人，诗圣，其诗被称为诗史，忧国忧民，存诗1400余首。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-libai",
      "an-shi-rebellion",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "event-samarkand-paper",
    "title": "撒马尔罕造纸业兴起",
    "year": 760,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 39.6,
      "lng": 66.9
    },
    "civilization": "middleEast",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元760年",
    "summary": "怛罗斯之战后，撒马尔罕成为伊斯兰世界第一个造纸中心，阿拉...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-paper-talas",
      "abbasid",
      "event-baghdad-paper"
    ],
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "carolingian-empire",
    "title": "查理曼帝国",
    "year": 768,
    "yearDisplay": "公元768年—公元843年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 50.9,
      "lng": 6.9
    },
    "summary": "查理曼建立的西欧大帝国，800年加冕为罗马人的皇帝，843年三分帝国形成法德意雏形。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-charlemagne",
      "holy-roman-empire",
      "roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "medieval-charlemagne",
    "title": "查理曼帝国与加洛林文艺复兴",
    "year": 768,
    "yearDisplay": "公元768年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 50.8,
      "lng": 6.4
    },
    "summary": "查理曼统一西欧大部，800年由教皇加冕为\"罗马人的皇帝\"，建立加洛林帝国。他推动文化复兴，843年凡尔登条约三分帝国，奠定法德意雏形。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "rome-great-migration",
      "medieval-holy-roman-empire",
      "viking-age",
      "renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "scientist-al-khwarizmi",
    "title": "花剌子米",
    "year": 780,
    "yearDisplay": "约公元780年—公元850年",
    "civilization": "middleEast",
    "categories": [
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 41.3,
      "lng": 61
    },
    "summary": "《代数学》的作者，al-jabr（代数）和algorithm（算法）两个词的来源，智慧宫学者，代数学之父。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "scientist-ibn-sina",
      "scientist-euclid",
      "aristotle",
      "thinker-ibn-battuta"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "china-fanzhen-liangshui",
    "title": "藩镇割据与两税法",
    "year": 780,
    "yearDisplay": "公元780年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "summary": "安史之乱后唐朝由盛转衰，节度使拥兵自重形成藩镇割据。宰相杨炎推行两税法，以资产征税、夏秋两征，是中国古代赋税制度的里程碑式改革。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "event-kaiyuan",
      "china-kaihuang-zhi",
      "song-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "viking-age",
    "title": "维京时代",
    "year": 793,
    "yearDisplay": "公元793年—公元1066年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 59.9,
      "lng": 10.7
    },
    "summary": "斯堪的纳维亚海盗时代，维京人驾驶长船劫掠、贸易和殖民，足迹从北美到里海，深刻影响了中世纪欧洲。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "myth-norse",
      "carolingian-empire",
      "holy-roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "europe-viking-era",
    "title": "维京时代开端",
    "year": 793,
    "yearDisplay": "公元793年—公元1066年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 55.7,
      "lng": -1.8
    },
    "summary": "793年维京人劫掠林迪斯法恩修道院标志维京时代开始，长船技术革命性突破，瓦良格人东进建基辅罗斯，维京人西进殖民冰岛格陵兰。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-kievan-rus",
      "america-viking-vinland",
      "europe-novgorod",
      "byzantine-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-baghdad-paper",
    "title": "巴格达造纸与智慧宫",
    "year": 795,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 33.3,
      "lng": 44.4
    },
    "civilization": "middleEast",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元795年",
    "summary": "阿拔斯王朝在巴格达建造纸厂，纸张推动智慧宫翻译运动与伊斯...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "abbasid",
      "abbasid-baghdad",
      "translation-movement",
      "event-damascus-paper"
    ],
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "building-borobudur",
    "title": "婆罗浮屠",
    "year": 800,
    "yearDisplay": "约公元780年—公元840年",
    "civilization": "southAsia",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": -7.61,
      "lng": 110.2
    },
    "summary": "世界上最大的佛教遗址，实心的曼荼罗佛塔，佛教宇宙观的立体呈现。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "idea-buddhism-spread",
      "econ-silk-road",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "africa-swahili-city-states",
    "title": "斯瓦希里城邦带",
    "year": 800,
    "yearDisplay": "8—16世纪",
    "civilization": "africa",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -6.2,
      "lng": 39.5
    },
    "summary": "东非海岸一系列城邦国家，班图人与阿拉伯、波斯移民融合形成斯瓦希里文明，控制印度洋贸易网，基尔瓦、蒙巴萨、桑给巴尔最为著名。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "africa-great-zimbabwe",
      "africa-zanzibar-slave-trade",
      "age-of-exploration",
      "songhai-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "translation-movement",
    "title": "百年翻译运动",
    "year": 800,
    "yearDisplay": "公元8—10世纪",
    "civilization": "middleEast",
    "categories": [
      "culture",
      "science"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 33.3,
      "lng": 44.4
    },
    "summary": "阿拔斯王朝的\"智慧宫\"主导了持续两百年的翻译运动——把希腊、波斯、印度的哲学、科学、医学典籍译为阿拉伯文，保存了古典文明火种，反哺了后来的欧洲文艺复兴。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "abbasid-baghdad",
      "islam",
      "renaissance",
      "sci-scientific-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "myth-odin",
    "title": "奥丁与北欧诸神的黄昏",
    "year": 800,
    "yearDisplay": "约公元8—11世纪（维京时代吟唱定型）",
    "civilization": "europe",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "medieval",
    "location": {
      "lat": 60.5,
      "lng": 8
    },
    "summary": "北欧神话的众神之父，以一只眼睛换取智慧，与众神一起迎来诸神黄昏的宿命之战。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "myth-norse",
      "viking-age"
    ],
    "important": true,
    "disputed": "",
    "keyPoints": [
      "阿萨神族之王，独眼智者",
      "倒吊世界树领悟卢恩文字",
      "瓦尔哈拉英灵殿",
      "诸神黄昏——注定毁灭却英勇赴战"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "mississippian-culture",
    "title": "密西西比文化",
    "year": 800,
    "yearDisplay": "约公元800年—公元1600年",
    "civilization": "america",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 38.6,
      "lng": -90.1
    },
    "summary": "北美东部的史前印第安文明，以建造巨大土墩和玉米农业为特征，卡霍基亚是其最大的城市中心。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-cahokia",
      "america-olmec",
      "america-teotihuacan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "muisca-confederation",
    "title": "奇布查穆伊斯卡联盟",
    "year": 800,
    "yearDisplay": "约公元800年—公元1537年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 4.7,
      "lng": -74.1
    },
    "summary": "哥伦比亚安第斯高原的印第安文明，以黄金制品和\"黄金国\"传说闻名，是南美仅次于印加的重要文明。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "inca-empire",
      "america-tiwanaku",
      "toltec-civilization"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "tahiti-culture",
    "title": "塔希提与社会群岛",
    "year": 800,
    "yearDisplay": "约公元800年—公元1880年",
    "civilization": "oceania",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -17.5,
      "lng": -149.5
    },
    "summary": "波利尼西亚文明的中心，以丰富的神话、精美的木雕刻和阿里奥伊教派著称，是波马雷王朝的所在地。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "polynesian-expansion",
      "hawaii-kingdom",
      "samoa-tuala"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "khmer-empire",
    "title": "高棉帝国·吴哥王朝",
    "year": 802,
    "yearDisplay": "公元802年—公元1431年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 13.4,
      "lng": 103.9
    },
    "summary": "东南亚历史上最强大的帝国，吴哥窟的建造者，东南亚文明的璀璨明珠。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "song-dynasty",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "sea-angkor-founding",
    "title": "吴哥王朝建立",
    "year": 802,
    "yearDisplay": "公元802年",
    "civilization": "eastAsia",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 13.4,
      "lng": 103.9
    },
    "summary": "阇耶跋摩二世在荔枝山自称\"转轮王\"，建立高棉帝国，开启吴哥时代，发展出独特的神王合一（提婆罗阇）统治理念。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-funan",
      "sea-suryavarman-ii",
      "sea-jayavarman-vii",
      "sea-ayutthaya"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "event-bai-juyi-yuanzhen",
    "title": "元白诗派与新乐府运动",
    "year": 810,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.3,
      "lng": 108.9
    },
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元810年",
    "summary": "元稹、白居易倡导新乐府运动，主张\"文章合为时而著，歌诗合...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "person-libai",
      "person-dufu"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "qarakhanid-khanate",
    "title": "喀喇汗王朝",
    "year": 840,
    "yearDisplay": "约公元840年—公元1212年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 41,
      "lng": 74
    },
    "summary": "突厥语族建立的中亚王朝，第一个皈依伊斯兰教的突厥王朝，分为东西二部，对新疆与中亚的伊斯兰化有深远影响。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "seljuk-empire",
      "western-liao",
      "samanid-dynasty",
      "khwarazmian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "verdun-treaty",
    "title": "凡尔登条约",
    "year": 843,
    "yearDisplay": "公元843年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 49.1,
      "lng": 5.4
    },
    "summary": "查理曼帝国一分为三，奠定现代法德意三国雏形。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "western-rome-fall",
      "norman-conquest"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "byzantine-macedonian-renaissance",
    "title": "拜占庭马其顿王朝中兴",
    "year": 867,
    "yearDisplay": "公元867年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 41,
      "lng": 28.98
    },
    "summary": "马其顿王朝时期的拜占庭帝国迎来第二个黄金时代：巴西尔二世被称为\"保加利亚屠夫\"，疆域达到查士丁尼之后最大，文化艺术法典全面复兴。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "rome-justinian-reconquest",
      "medieval-fourth-crusade",
      "constantinople-fall",
      "crusades"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "sci-printing-revolution",
    "title": "印刷术与知识革命",
    "year": 868,
    "yearDisplay": "9—16世纪",
    "civilization": "china",
    "categories": [
      "science",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.7,
      "lng": 113.7
    },
    "summary": "从中国雕版印刷到古腾堡金属活字，印刷术改变了人类知识的传播方式，是现代文明的基石。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "song-dynasty",
      "renaissance",
      "idea-reformation",
      "sci-scientific-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "samanid-dynasty",
    "title": "萨曼王朝",
    "year": 874,
    "yearDisplay": "公元874年—公元999年",
    "civilization": "centralAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 39.8,
      "lng": 64.4
    },
    "summary": "波斯-伊斯兰文化复兴的黄金时代，定都布哈拉，波斯语成为行政和文学语言，菲尔多西《列王纪》诞生的时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "al-andalus-caliphate",
      "safavid-persia",
      "timurid-empire",
      "seljuk-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "europe-kievan-rus",
    "title": "基辅罗斯建国",
    "year": 882,
    "yearDisplay": "公元882年—公元1240年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 50.5,
      "lng": 30.5
    },
    "summary": "瓦良格人奥列格沿第聂伯河而下占基辅建立罗斯国家，留里克王朝，\"罗斯城市之母\"，是俄罗斯、乌克兰、白俄罗斯的共同起源。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-viking-era",
      "europe-rus-baptism",
      "europe-yaroslav",
      "europe-moscow-rise"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "america-cahokia",
    "title": "卡霍基亚土墩",
    "year": 900,
    "yearDisplay": "约公元900年—公元1350年",
    "civilization": "america",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 38.7,
      "lng": -90.1
    },
    "summary": "北美密西西比文化最大城邦，僧侣土墩高30米，人口超同期伦敦，是北美原住民最发达的城市文明，曾被低估的北美文明。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-maya-cities",
      "america-aztec",
      "america-olmec",
      "america-tiwanaku"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "event-damascus-paper",
    "title": "大马士革造纸与欧洲传入",
    "year": 900,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 33.5,
      "lng": 36.3
    },
    "civilization": "middleEast",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元900年",
    "summary": "大马士革成为伊斯兰世界最重要的造纸中心，\"大马士革纸\"通...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "abbasid",
      "event-baghdad-paper",
      "event-european-paper"
    ],
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "toltec-civilization",
    "title": "托尔特克文明",
    "year": 900,
    "yearDisplay": "约公元900年—公元1170年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 20.08,
      "lng": -98.87
    },
    "summary": "继特奥蒂瓦坎之后的中美洲文明，以图拉为都城，尚武好战，是阿兹特克文明的直接前身。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-teotihuacan",
      "aztec-empire",
      "america-chichen-itza"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "easter-island-rapanui",
    "title": "复活节岛（拉帕努伊）",
    "year": 900,
    "yearDisplay": "约公元900年—公元1860年",
    "civilization": "oceania",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -27.12,
      "lng": -109.35
    },
    "summary": "地球上最偏远的有人居住岛屿，以近千尊巨型摩艾石像闻名，是人类文明孤立发展与生态崩溃的经典案例。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "polynesian-expansion",
      "hawaii-kingdom",
      "america-easter-island"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "event-ten-kingdoms",
    "title": "十国割据",
    "year": 907,
    "yearDisplay": "公元902年—公元979年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 32.1,
      "lng": 118.8
    },
    "summary": "与五代并立的十个地方割据政权（前蜀后蜀吴南唐吴越闽楚南汉南平北汉），南方相对安定，南唐文艺兴盛。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "event-treaty-of-shanyuan",
      "event-sixteen-prefectures"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "fatimid-caliphate",
    "title": "法蒂玛哈里发",
    "year": 909,
    "yearDisplay": "公元909年—公元1171年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 30,
      "lng": 31.2
    },
    "summary": "什叶派伊斯玛仪支派建立的哈里发国，969年建开罗，爱资哈尔大学是世界最古老存续大学，与阿拔斯、后倭马亚三哈里发并立。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "crusades",
      "mamluk-sultanate"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "person-yelü-abaoji",
    "title": "耶律阿保机建辽",
    "year": 916,
    "yearDisplay": "公元872年—公元926年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 41.9,
      "lng": 123.4
    },
    "summary": "契丹八部统一，916年称帝建契丹国，创契丹大字，征服渤海国，建立了北方强大的辽朝。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "institution-liao-dual-system",
      "event-treaty-of-shanyuan",
      "song-dynasty",
      "person-wanyan-aguda"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "goryeo-dynasty",
    "title": "高丽王朝",
    "year": 918,
    "yearDisplay": "公元918年—公元1392年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 37.6,
      "lng": 126.9
    },
    "summary": "朝鲜半岛的统一王朝，青瓷艺术巅峰，发明金属活字，被蒙古征服后形成\"附属国\"体制。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "unified-silla",
      "mongol-empire",
      "yuan-dynasty",
      "ming-dynasty",
      "joseon-dynasty"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "al-andalus-caliphate",
    "title": "后倭马亚王朝（科尔多瓦哈里发国）",
    "year": 929,
    "yearDisplay": "公元929年—公元1031年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 37.9,
      "lng": -4.8
    },
    "summary": "阿卜杜勒·拉赫曼三世宣布科尔多瓦为哈里发国，科尔多瓦是当时欧洲最繁华城市，科尔多瓦大清真寺是建筑奇迹，三教共存的黄金时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "fatimid-caliphate",
      "crusades",
      "renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-sixteen-prefectures",
    "title": "石敬瑭割让燕云十六州",
    "year": 936,
    "yearDisplay": "公元936年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "后晋石敬瑭认契丹为父、割燕云十六州，中原丧失北方屏障400年，深刻影响宋辽格局和后世历史。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-treaty-of-shanyuan",
      "song-dynasty",
      "jingkang",
      "ming-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "institution-liao-dual-system",
    "title": "辽南北面官制",
    "year": 938,
    "yearDisplay": "辽",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 43.9,
      "lng": 119.4
    },
    "summary": "\"以国制治契丹，以汉制待汉人\"，北面官治游牧、南面官治农耕，因俗而治的双轨制度创新。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-yelü-abaoji",
      "event-treaty-of-shanyuan",
      "song-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "dynasty-wudaishi",
    "title": "五代十国",
    "year": 950,
    "yearDisplay": "公元907年—公元960年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 34,
      "lng": 113
    },
    "summary": "唐亡后中原五代相继，南方十国割据，战乱频繁，后周柴荣早逝，赵匡胤陈桥兵变建宋。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "tang-dynasty",
      "song-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "tonga-empire",
    "title": "汤加帝国（图伊汤加）",
    "year": 950,
    "yearDisplay": "约公元950年—公元1845年",
    "civilization": "oceania",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -21.2,
      "lng": -175.2
    },
    "summary": "太平洋地区的波利尼西亚帝国，以汤加为中心统治了多个岛屿，是波利尼西亚历史上唯一的真正帝国。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "samoa-tuala",
      "polynesian-expansion",
      "hawaii-kingdom"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "person-chai-rong",
    "title": "周世宗柴荣改革",
    "year": 954,
    "yearDisplay": "公元954年—公元959年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.8,
      "lng": 113.7
    },
    "summary": "五代第一明君，励精图治、整军灭佛、南征北伐收复三州，惜英年早逝，为北宋统一奠基。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "event-sixteen-prefectures",
      "event-treaty-of-shanyuan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "kilwa-sultanate",
    "title": "基尔瓦苏丹国",
    "year": 957,
    "yearDisplay": "约公元957年—公元1505年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -8.95,
      "lng": 39.52
    },
    "summary": "东非斯瓦希里海岸最强大的城邦国家，控制印度洋黄金贸易达数百年，大津巴布韦的黄金经此远销中东和印度。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "africa-swahili-city-states",
      "africa-great-zimbabwe",
      "africa-zanzibar-slave-trade"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "song-dynasty",
    "title": "宋朝建立",
    "year": 960,
    "yearDisplay": "公元960年",
    "civilization": "china",
    "categories": [
      "politics",
      "science",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 34.8,
      "lng": 114.3
    },
    "summary": "赵匡胤黄袍加身建立宋朝，经济文化科技达到中国古代顶峰。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-wudaishi",
      "jingkang",
      "mongol-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "person-songtaizu",
    "title": "宋太祖·赵匡胤",
    "year": 960,
    "yearDisplay": "公元927年—公元976年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.8,
      "lng": 114.3
    },
    "summary": "宋朝开国皇帝，陈桥兵变黄袍加身，杯酒释兵权，开创宋朝三百年基业。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "dynasty-wudaishi",
      "dynasty-liao"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "holy-roman-empire",
    "title": "神圣罗马帝国",
    "year": 962,
    "yearDisplay": "公元962年—公元1806年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 50.1,
      "lng": 8.7
    },
    "summary": "以德意志为核心的中世纪欧洲帝国，奥托一世加冕称帝，伏尔泰评价\"既不神圣、也不罗马、更非帝国\"，1806年被拿破仑解散。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "carolingian-empire",
      "person-napoleon",
      "protestant-reformation",
      "crusades",
      "black-death"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "medieval-holy-roman-empire",
    "title": "神圣罗马帝国建立",
    "year": 962,
    "yearDisplay": "公元962年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 52.5,
      "lng": 13.4
    },
    "summary": "德意志国王奥托一世由教皇加冕为\"罗马人的皇帝\"，神圣罗马帝国建立。伏尔泰嘲讽它\"既不神圣，也不罗马，更非帝国\"，延续至1806年被拿破仑解散。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "medieval-charlemagne",
      "medieval-hundred-years-war",
      "renaissance",
      "napoleon"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "song-maritime-trade",
    "title": "市舶司与海上丝绸之路",
    "year": 971,
    "yearDisplay": "宋元",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 24.9,
      "lng": 118.7
    },
    "summary": "宋设广州、泉州等市舶司管理海外贸易，泉州成东方第一大港，瓷器丝绸换取香料珍宝，海上丝路鼎盛。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "economy-south-shift",
      "event-jiaozi",
      "yuan-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-a"
  },
  {
    "id": "scientist-ibn-sina",
    "title": "伊本·西那（阿维森纳）",
    "year": 980,
    "yearDisplay": "公元980年—公元1037年",
    "civilization": "middleEast",
    "categories": [
      "science",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 39.6,
      "lng": 66.9
    },
    "summary": "波斯医学与哲学大家，《医典》集古希腊阿拉伯医学之大成，欧洲大学医学教科书至17世纪，\"医者之尊\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "scientist-ibn-sina",
      "scientist-euclid",
      "aristotle",
      "scientist-al-khwarizmi",
      "thinker-ibn-battuta"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "europe-rus-baptism",
    "title": "罗斯受洗",
    "year": 988,
    "yearDisplay": "公元988年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 50.5,
      "lng": 30.5
    },
    "summary": "弗拉基米尔一世选择东正教为国教，基辅市民在第聂伯河集体受洗，拜占庭文化和西里尔字母传入，深刻塑造了东斯拉夫文明。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-kievan-rus",
      "europe-yaroslav",
      "byzantine-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "america-viking-vinland",
    "title": "维京文兰定居点",
    "year": 1000,
    "yearDisplay": "约公元1000年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 51.6,
      "lng": -55.6
    },
    "summary": "莱夫·埃里克松跨大西洋抵纽芬兰兰塞奥兹牧草地，比哥伦布早500年到达美洲，1960年考古证实，是欧洲人首次踏上美洲土地。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-aztec",
      "age-of-exploration",
      "europe-kievan-rus",
      "renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "europe-st-stephen",
    "title": "圣伊什特万与匈牙利建国",
    "year": 1000,
    "yearDisplay": "公元1000年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 47.5,
      "lng": 19
    },
    "summary": "1000年伊什特万一世加冕为匈牙利国王，立天主教为国教，建立统一的匈牙利王国，圣斯蒂芬王冠成为匈牙利国家象征。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-teutonic-order",
      "byzantine-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "env-medieval-warm-period",
    "title": "中世纪气候异常期",
    "year": 1000,
    "yearDisplay": "公元950年—公元1250年",
    "civilization": "global",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 55,
      "lng": 10
    },
    "summary": "中世纪偏暖期，维京人定居格陵兰、欧洲垦殖扩张、唐宋农业北界北移、人口增长，是中世纪繁荣的气候背景。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "viking-age",
      "tang-dynasty",
      "env-little-ice-age",
      "black-death"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "kereit-tribe",
    "title": "克烈部（草原基督教王国）",
    "year": 1000,
    "yearDisplay": "约公元1000年—公元1203年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 48,
      "lng": 105
    },
    "summary": "蒙古高原中部的突厥-蒙古大部落，信奉景教（基督教聂斯托利派），王罕是铁木真早期的\"汗父\"，后被成吉思汗吞并。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "naiman-tribe",
      "mongol-empire",
      "golden-horde"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "india-muslim-conquest",
    "title": "伽色尼与古尔王朝入侵印度",
    "year": 1001,
    "yearDisplay": "公元1001年",
    "civilization": "southAsia",
    "categories": [
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 31.6,
      "lng": 74.4
    },
    "summary": "伽色尼苏丹马哈茂德17次入侵印度，以掠夺财富和摧毁印度教神庙著称；其后的古尔王朝穆罕默德征服北印，奠定了德里苏丹国的基础，伊斯兰势力大规模进入次大陆。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "delhi-sultanate",
      "mughal-empire",
      "myth-indian",
      "islamic-conquest"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "dynasty-liao",
    "title": "辽朝",
    "year": 1004,
    "yearDisplay": "公元916年—公元1125年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 41.8,
      "lng": 118.9
    },
    "summary": "契丹族耶律阿保机建立，南北面官制，与北宋澶渊之盟约为兄弟之国，被金所灭。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "dynasty-jin"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "event-treaty-of-shanyuan",
    "title": "澶渊之盟",
    "year": 1004,
    "yearDisplay": "公元1004年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 36.1,
      "lng": 116.4
    },
    "summary": "宋辽对峙澶州城下订盟，宋岁币银10万两绢20万匹，约为兄弟之国，换来百年和平，利弊争议至今。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "institution-liao-dual-system",
      "event-sixteen-prefectures",
      "person-wanyan-aguda",
      "jingkang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "sea-ly-dynasty",
    "title": "越南李朝",
    "year": 1009,
    "yearDisplay": "公元1009年—公元1225年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 21,
      "lng": 105.8
    },
    "summary": "李公蕴建立的越南独立王朝，迁都升龙（河内），崇儒兴佛，建立科举制度，独立国家体制成型，是越南第一个稳定的统一王朝。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-tran-dynasty",
      "sea-cham",
      "song-dynasty",
      "tang-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "person-su-xun",
    "title": "苏洵",
    "year": 1009,
    "yearDisplay": "公元1009年—公元1066年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 30,
      "lng": 103.8
    },
    "summary": "北宋散文家，\"三苏\"之父，唐宋八大家之一，《六国论》传诵千古，苏轼苏辙之父。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-sushi",
      "person-su-zhe"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "europe-yaroslav",
    "title": "雅罗斯拉夫智者",
    "year": 1019,
    "yearDisplay": "公元1019年—公元1054年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 50.5,
      "lng": 30.5
    },
    "summary": "雅罗斯拉夫一世（智者）在位时基辅罗斯达到鼎盛，颁布《罗斯法典》，建圣索菲亚大教堂，与欧洲王室联姻，被称为\"欧洲岳父\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-kievan-rus",
      "europe-rus-baptism",
      "europe-novgorod"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "thinker-sima-guang",
    "title": "司马光与《资治通鉴》",
    "year": 1019,
    "yearDisplay": "公元1019年—公元1086年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.8,
      "lng": 111.2
    },
    "summary": "主编编年体通史《资治通鉴》294卷，历时19年，\"鉴于往事，有资于治道\"，与《史记》并称\"史学双璧\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "china-sima-qian",
      "event-kangqian",
      "tang-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "person-sima-guang",
    "title": "司马光",
    "year": 1019,
    "yearDisplay": "公元1019年—公元1086年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34.3,
      "lng": 112.4
    },
    "summary": "北宋史学家、政治家，著《资治通鉴》，王安石变法反对派领袖，\"元祐更化\"主政。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-wanganshi",
      "person-sushi",
      "song-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "person-wanganshi",
    "title": "王安石",
    "year": 1021,
    "yearDisplay": "公元1021年—公元1086年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 27.9,
      "lng": 116.3
    },
    "summary": "北宋政治家、改革家、文学家，主持熙宁变法，\"唐宋八大家\"之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "person-sushi",
      "thinker-sima-guang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "event-jiaozi",
    "title": "交子与宋代金融革命",
    "year": 1023,
    "yearDisplay": "北宋",
    "civilization": "china",
    "categories": [
      "politics",
      "science"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 30.7,
      "lng": 104.1
    },
    "summary": "成都世界最早纸币，北宋设交子务官方发行，比欧洲早600年，后因滥发贬值，宋代商业革命标志性成果。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "economy-south-shift",
      "song-maritime-trade"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "person-sushi",
    "title": "苏轼",
    "year": 1037,
    "yearDisplay": "公元1037年—公元1101年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 30.1,
      "lng": 103.8
    },
    "summary": "北宋文学家、书画家、美食家，\"唐宋八大家\"之一，豪放词派代表。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "person-wanganshi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "seljuk-empire",
    "title": "塞尔柱帝国",
    "year": 1037,
    "yearDisplay": "公元1037年—公元1194年",
    "civilization": "centralAsia",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 39,
      "lng": 35
    },
    "summary": "突厥人建立的西亚大帝国，1071年曼齐克特战役击败拜占庭打开小亚细亚门户，马利克沙与尼扎姆·穆勒克开创伊斯兰学术黄金时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "byzantine-empire",
      "crusades",
      "al-andalus-caliphate",
      "ottoman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "dynasty-xixia",
    "title": "西夏",
    "year": 1038,
    "yearDisplay": "公元1038年—公元1227年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 38.5,
      "lng": 106.3
    },
    "summary": "党项族李元昊建立，创制西夏文，与宋辽金长期周旋，立国189年被蒙古所灭。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "mongol-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "person-su-zhe",
    "title": "苏辙",
    "year": 1039,
    "yearDisplay": "公元1039年—公元1112年",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 30,
      "lng": 103.8
    },
    "summary": "北宋文学家、政治家，\"三苏\"之一，唐宋八大家之一，苏轼之弟，官至尚书右丞。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-sushi",
      "person-su-xun",
      "song-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "event-qingli-new-deal",
    "title": "庆历新政",
    "year": 1043,
    "yearDisplay": "公元1043年—公元1045年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 34.8,
      "lng": 114.3
    },
    "summary": "范仲淹主持\"先天下之忧而忧\"，明黜陟择长官等十事，触及官僚集团利益一年而罢，为王安石变法先声。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-wanganshi",
      "song-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "sea-pagan",
    "title": "蒲甘王朝",
    "year": 1044,
    "yearDisplay": "公元849年—公元1297年",
    "civilization": "eastAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 21.2,
      "lng": 94.9
    },
    "summary": "缅甸第一个统一王朝，阿奴律陀1044年立上座部佛教为国教，伊洛瓦底江边的万塔之城，1287年被蒙古军攻破。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "sea-ayutthaya",
      "sea-srivijaya",
      "sea-angkor-founding"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "naiman-tribe",
    "title": "乃蛮部",
    "year": 1050,
    "yearDisplay": "约公元1050年—公元1204年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 47,
      "lng": 88
    },
    "summary": "蒙古高原西部的突厥大部落，文明程度较高，使用回鹘文，太阳汗是铁木真统一蒙古前的最后一个劲敌。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "kereit-tribe",
      "western-liao",
      "mongol-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "great-schism",
    "title": "东西教会大分裂",
    "year": 1054,
    "yearDisplay": "公元1054年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 41,
      "lng": 29
    },
    "summary": "基督教分裂为罗马天主教和东正教两大教派。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "rome-split",
      "crusades"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "almoravid-dynasty",
    "title": "穆拉比特王朝（阿尔摩拉维德）",
    "year": 1062,
    "yearDisplay": "公元1062年—公元1147年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 31.63,
      "lng": -7.99
    },
    "summary": "柏柏尔桑哈贾部落建立的北非与西班牙帝国，以严格的伊斯兰原教旨主义著称，鼎盛期横跨马格里布与安达卢西亚。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "almohad-dynasty",
      "al-andalus-caliphate",
      "mali-empire",
      "africa-ghana-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "norman-conquest",
    "title": "诺曼征服英格兰",
    "year": 1066,
    "yearDisplay": "公元1066年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 50.9,
      "lng": 0.5
    },
    "summary": "诺曼底公爵威廉征服英格兰，改变了英国的语言和历史。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "verdun-treaty",
      "magna-carta"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "khwarazmian-empire",
    "title": "花剌子模帝国",
    "year": 1077,
    "yearDisplay": "公元1077年—公元1231年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 42.47,
      "lng": 59.6
    },
    "summary": "以花剌子模为中心的突厥-波斯大帝国，鼎盛期疆域从波斯到中亚，因杀害蒙古商队引致成吉思汗西征而灭亡。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "seljuk-empire",
      "timurid-empire",
      "mongol-empire",
      "samanid-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "person-liqingzhao",
    "title": "李清照",
    "year": 1084,
    "yearDisplay": "公元1084年—约公元1155年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 36.7,
      "lng": 117
    },
    "summary": "宋代女词人，婉约词派代表，\"千古第一才女\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "person-sushi",
      "jingkang"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "person-shen-kuo",
    "title": "沈括与《梦溪笔谈》",
    "year": 1088,
    "yearDisplay": "公元1031年—公元1095年",
    "civilization": "china",
    "categories": [
      "science",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 30.3,
      "lng": 120.2
    },
    "summary": "北宋科学全才，《梦溪笔谈》记载活字印刷、指南针、石油命名，被誉为\"中国科学史的坐标\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "person-guo-shoujing",
      "person-wanganshi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "crusades",
    "title": "十字军东征",
    "year": 1096,
    "yearDisplay": "公元1096年—公元1291年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 31.8,
      "lng": 35.2
    },
    "summary": "西欧天主教国家对地中海东岸穆斯林地区发动的一系列宗教战争，共八次持续近200年。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "byzantine-empire",
      "holy-roman-empire",
      "arab-empire",
      "ottoman-empire",
      "mongol-conquests"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "artifact-qingming-riverside",
    "title": "清明上河图",
    "year": 1100,
    "yearDisplay": "北宋，约公元1100年",
    "civilization": "china",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "北宋张择端传世名作，中国十大传世名画之一，描绘汴京繁华的百科全书式长卷。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "person-sushi",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "africa-great-zimbabwe",
    "title": "大津巴布韦",
    "year": 1100,
    "yearDisplay": "约公元1100年—公元1500年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -20.3,
      "lng": 30.9
    },
    "summary": "绍纳人建造的石构都城，撒哈拉以南最大的前殖民石建筑群遗址，控制黄金和象牙贸易，椭圆形大围场是标志性建筑。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "africa-mwene-mutapa",
      "africa-swahili-city-states",
      "africa-kush-meroe"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "yue-fei",
    "title": "岳飞",
    "year": 1103,
    "yearDisplay": "公元1103年—公元1142年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "type": "person",
    "eraId": "medieval",
    "location": {
      "lat": 35.9,
      "lng": 114.3
    },
    "summary": "南宋抗金名将，民族英雄，\"精忠报国\"精神的象征。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "jingkang",
      "mongol-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "institution-meng-an-mouke",
    "title": "猛安谋克制度",
    "year": 1114,
    "yearDisplay": "金",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 45.8,
      "lng": 126.9
    },
    "summary": "女真军事行政合一制度，300户一谋克、10谋克一猛安，兵农合一，后迁入中原屯田渐腐化。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-wanyan-aguda",
      "jingkang",
      "song-dynasty",
      "yue-fei"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "person-wanyan-aguda",
    "title": "完颜阿骨打建金灭辽",
    "year": 1115,
    "yearDisplay": "公元1068年—公元1123年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 45.8,
      "lng": 126.9
    },
    "summary": "女真完颜部起兵反辽，建立金朝，\"猛安谋克\"兵农合一，10年灭辽，为北宋灭亡埋下伏笔。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "institution-meng-an-mouke",
      "jingkang",
      "song-dynasty",
      "person-yelü-abaoji",
      "event-treaty-of-shanyuan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "jingkang",
    "title": "靖康之变",
    "year": 1127,
    "yearDisplay": "公元1127年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 34.8,
      "lng": 114.3
    },
    "summary": "金军攻破开封，北宋灭亡，南宋开始。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "mongol-empire",
      "yue-fei"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "economy-south-shift",
    "title": "经济重心南移完成",
    "year": 1127,
    "yearDisplay": "南宋",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 30.3,
      "lng": 120.2
    },
    "summary": "\"苏湖熟天下足\"，南宋时南方人口经济全面超过北方，大运河与海上丝路支撑，经济重心南移最终完成。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "song-maritime-trade",
      "event-jiaozi",
      "jingkang",
      "event-yongjia-nandu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "western-liao",
    "title": "西辽（喀喇契丹）",
    "year": 1132,
    "yearDisplay": "公元1132年—公元1218年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 42.87,
      "lng": 75.3
    },
    "summary": "辽朝皇族耶律大石西迁后建立的中亚帝国，以中原制度统治中亚，卡特万战役击败塞尔柱联军威震欧亚。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "seljuk-empire",
      "qarakhanid-khanate",
      "khwarazmian-empire",
      "mongol-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "europe-novgorod",
    "title": "诺夫哥罗德共和国",
    "year": 1136,
    "yearDisplay": "公元1136年—公元1478年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 58.5,
      "lng": 31.3
    },
    "summary": "诺夫哥罗德是中世纪东欧唯一的共和国政体，维彻市民议会掌握最高权力，汉萨同盟毛皮贸易枢纽，1478年被伊凡三世吞并。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-viking-era",
      "europe-kievan-rus",
      "europe-yaroslav",
      "europe-moscow-rise"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-yuefei-vs-wuzhu",
    "title": "岳飞抗金与宋金对峙",
    "year": 1140,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 30.3,
      "lng": 120.2
    },
    "civilization": "china",
    "categories": [
      "military"
    ],
    "description": "",
    "yearDisplay": "公元1140年",
    "summary": "岳飞率岳家军北伐抗金，与完颜宗弼（金兀术）多次激战，郾城...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "yue-fei",
      "song-dynasty",
      "person-yelü-abaoji"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "almohad-dynasty",
    "title": "穆瓦希德王朝（阿尔摩哈德）",
    "year": 1147,
    "yearDisplay": "公元1147年—公元1269年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 31.63,
      "lng": -7.99
    },
    "summary": "柏柏尔一神论运动建立的北非大帝国，鼎盛期领土跨马格里布与西班牙，是伊斯兰哲学与学术的黄金时代之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "almoravid-dynasty",
      "al-andalus-caliphate",
      "mali-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "landmark-angkor-wat",
    "title": "吴哥窟",
    "year": 1150,
    "yearDisplay": "约公元1113年—1150年建造",
    "civilization": "eastAsia",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 13.41,
      "lng": 103.87
    },
    "summary": "柬埔寨高棉帝国石庙，世界最大的宗教建筑，世界文化遗产。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "khmer-empire",
      "econ-silk-road",
      "song-maritime-trade"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "sea-suryavarman-ii",
    "title": "苏利耶跋摩二世与吴哥窟",
    "year": 1150,
    "yearDisplay": "公元1113年—公元1150年",
    "civilization": "eastAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 13.4,
      "lng": 103.9
    },
    "summary": "高棉帝国苏利耶跋摩二世建造吴哥窟（世界最大宗教建筑），供奉毗湿奴，800米浅浮雕回廊描绘印度史诗和战争场景。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-angkor-founding",
      "sea-jayavarman-vii",
      "sea-cham",
      "sea-ayutthaya"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "event-european-paper",
    "title": "12世纪欧洲造纸厂兴起",
    "year": 1150,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 42.8,
      "lng": 10.9
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1150年",
    "summary": "12世纪西班牙、意大利先后建立造纸厂，造纸术经阿拉伯世界...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-damascus-paper",
      "gutenberg",
      "renaissance"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-toledo-translation",
    "title": "托莱多翻译运动",
    "year": 1150,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 39.9,
      "lng": -4
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1150年",
    "summary": "基督教收复托莱多后，欧洲学者将阿拉伯语保存的希腊学术与伊...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "translation-movement",
      "renaissance",
      "al-andalus-caliphate"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "dynasty-jin",
    "title": "金朝",
    "year": 1153,
    "yearDisplay": "公元1115年—公元1234年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "女真族完颜阿骨打建立，灭辽灭北宋，与南宋对峙，金世宗大定之治为鼎盛，被蒙古所灭。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "dynasty-liao",
      "song-dynasty",
      "mongol-empire",
      "jingkang"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "person-lu-jiuyuan",
    "title": "陆九渊心学",
    "year": 1175,
    "yearDisplay": "公元1139年—公元1193年",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 28.3,
      "lng": 117.6
    },
    "summary": "\"宇宙便是吾心，吾心即是宇宙\"，心即理，与朱熹鹅湖之会辩理学心学，明王守仁发扬为\"陆王心学\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-wanganshi",
      "wang-yangming",
      "song-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "event-cheng-zhu-lixue",
    "title": "程朱理学与道学传承",
    "year": 1175,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 30.5,
      "lng": 118.3
    },
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1175年",
    "summary": "二程（程颢、程颐）开创洛学，朱熹集大成建立闽学体系，程朱...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "person-lu-jiuyuan",
      "wang-yangming"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "event-egu-lu Debate",
    "title": "鹅湖之辩",
    "year": 1175,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 28.2,
      "lng": 117.9
    },
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1175年",
    "summary": "朱熹与陆九渊在鹅湖寺辩论治学方法，朱熹主\"格物致知\"，陆...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "person-lu-jiuyuan",
      "person-wanganshi"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "africa-benin-bronze",
    "title": "贝宁王国与贝宁青铜",
    "year": 1180,
    "yearDisplay": "约公元1180年—公元1897年",
    "civilization": "africa",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 6.3,
      "lng": 5.6
    },
    "summary": "埃多人建立的西非王国，以失蜡法铸造的青铜和象牙雕刻闻名于世，工艺登峰造极，1897年被英国焚毁劫掠，数千件文物流失海外。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "africa-ghana-empire",
      "mali-empire",
      "age-of-exploration",
      "africa-zanzibar-slave-trade"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "event-compass-westward",
    "title": "指南针西传与大航海",
    "year": 1180,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 42.8,
      "lng": 10.9
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1180年",
    "summary": "宋代航海罗盘经阿拉伯人传入欧洲，直接推动了大航海时代与地...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sci-four-inventions",
      "age-of-exploration",
      "columbus"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "benin-kingdom",
    "title": "贝宁王国",
    "year": 1180,
    "yearDisplay": "约公元1180年—公元1897年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 6.33,
      "lng": 5.62
    },
    "summary": "尼日利亚南部的埃多人建立的强大王国，以精湛的青铜和象牙雕刻闻名，是非洲艺术的巅峰代表之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "africa-benin-bronze",
      "songhai-empire",
      "ashanti-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "kamakura-shogunate",
    "title": "镰仓幕府",
    "year": 1185,
    "yearDisplay": "公元1185年—公元1333年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 35.3,
      "lng": 139.5
    },
    "summary": "日本第一个武家政权，源赖朝建立，开启近700年幕府政治，成功抵御蒙古入侵。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "shogunate-system",
      "heian-period",
      "mongol-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "medieval-saladin",
    "title": "萨拉丁与耶路撒冷收复",
    "year": 1187,
    "yearDisplay": "公元1187年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 31.8,
      "lng": 35.2
    },
    "summary": "库尔德穆斯林将领萨拉丁在哈丁战役中大败十字军，收复耶路撒冷，与狮心王理查三世形成传奇对照。他的骑士精神和仁慈宽厚，成为跨文明的道德典范。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "crusades",
      "islam",
      "abbasid",
      "medieval-reconquista"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "shogunate-system",
    "title": "日本幕府制度",
    "year": 1192,
    "yearDisplay": "公元1192年—公元1868年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 35.5,
      "lng": 139.7
    },
    "summary": "天皇虚位、将军掌实权的独特政治体制，延续近700年，塑造了日本文化和武士道精神。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "ming-dynasty",
      "meiji-restoration",
      "edo-period"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "sea-jayavarman-vii",
    "title": "阇耶跋摩七世与巴戎寺",
    "year": 1200,
    "yearDisplay": "公元1181年—公元1219年",
    "civilization": "eastAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 13.4,
      "lng": 103.9
    },
    "summary": "高棉帝国阇耶跋摩七世改宗大乘佛教，建造巴戎寺（高棉微笑）、塔布隆寺、吴哥王城，兴建医院和驿站，是吴哥最后一位伟大的建设者。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-angkor-founding",
      "sea-suryavarman-ii",
      "sea-cham",
      "sea-ayutthaya"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "event-gunpowder-westward",
    "title": "火药西传与军事革命",
    "year": 1200,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "civilization": "europe",
    "categories": [
      "military",
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1200年",
    "summary": "火药自唐代炼丹家发明，经宋代火器发展、阿拉伯人传至欧洲，...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sci-four-inventions",
      "mongol-empire",
      "age-of-exploration"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "marae-institution",
    "title": "毛利会议（马拉埃）",
    "year": 1200,
    "yearDisplay": "约公元1200年—至今",
    "civilization": "oceania",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": -37,
      "lng": 176
    },
    "summary": "毛利人的传统议事与仪式空间，集政治、宗教、社会功能于一体，是毛利文化的核心制度之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-maori-aotearoa",
      "haka-tradition",
      "treaty-of-waitangi"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "medieval-fourth-crusade",
    "title": "第四次十字军洗劫君士坦丁堡",
    "year": 1204,
    "yearDisplay": "公元1204年",
    "civilization": "europe",
    "categories": [
      "military",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 41,
      "lng": 28.98
    },
    "summary": "第四次十字军原定进攻埃及，却受威尼斯商人怂恿改道攻占并洗劫了同为基督教兄弟的拜占庭帝国首都，建立拉丁帝国，拜占庭从此一蹶不振。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "crusades",
      "constantinople-fall",
      "rome-justinian-reconquest",
      "byzantine-macedonian-renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "mongol-empire",
    "title": "蒙古帝国建立",
    "year": 1206,
    "yearDisplay": "公元1206年",
    "civilization": "eastAsia",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 48,
      "lng": 108
    },
    "summary": "铁木真统一蒙古各部，建立大蒙古国，开启狂飙时代。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "yuan-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "person-chengjisihan",
    "title": "成吉思汗·铁木真",
    "year": 1206,
    "yearDisplay": "公元1162年—公元1227年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 47.9,
      "lng": 107
    },
    "summary": "蒙古帝国创建者，世界历史上最伟大的军事统帅之一，一代天骄。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "yuan-dynasty",
      "dynasty-jin",
      "dynasty-xixia"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "delhi-sultanate",
    "title": "德里苏丹国",
    "year": 1206,
    "yearDisplay": "公元1206年—公元1526年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 28.6,
      "lng": 77.2
    },
    "summary": "古尔王朝奴隶出身的库特布丁建国，北印首个长期伊斯兰政权，五朝更迭，图格鲁克时期一度南征扩张至德干高原。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mughal-empire",
      "timurid-empire",
      "mongol-empire",
      "vijayanagara-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "delhi-sultanate-dynasties",
    "title": "德里苏丹国五朝更替",
    "year": 1206,
    "yearDisplay": "公元1206年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 28.6,
      "lng": 77.2
    },
    "summary": "德里苏丹国历经奴隶、卡尔吉、图格鲁克、赛义德、洛迪五个王朝320年统治，卡尔吉南征德干、图格鲁克疆域最大，印度教-伊斯兰文明深度碰撞交融。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "india-muslim-conquest",
      "mughal-empire",
      "islam",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "magna-carta",
    "title": "英国大宪章",
    "year": 1215,
    "yearDisplay": "公元1215年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 51.4,
      "lng": -0.6
    },
    "summary": "英格兰国王约翰被迫签署《大宪章》，限制王权的里程碑。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "norman-conquest",
      "british-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "mongol-conquests",
    "title": "蒙古三次西征",
    "year": 1219,
    "yearDisplay": "公元1219年",
    "civilization": "centralAsia",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 47.9,
      "lng": 107
    },
    "summary": "蒙古帝国在成吉思汗及其子孙率领下进行了三次大规模西征——征花剌子模、拔都长子西征到东欧、旭烈兀灭阿拔斯，建立了人类历史上疆域最大的陆上帝国。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "abbasid-baghdad",
      "mongol-postal-system",
      "yuan-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "europe-teutonic-order",
    "title": "条顿骑士团与北方十字军",
    "year": 1226,
    "yearDisplay": "公元1226年—公元1410年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 54.4,
      "lng": 18.6
    },
    "summary": "条顿骑士团征服普鲁士波罗的海异教部落建立骑士团国家，北方十字军持续两个世纪，1410年格伦瓦德战役被波兰立陶宛联军击败。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-polish-lithuania",
      "europe-st-stephen",
      "europe-viking-era"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "mali-empire",
    "title": "马里帝国建立",
    "year": 1235,
    "yearDisplay": "公元1235年",
    "civilization": "africa",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 13,
      "lng": -8
    },
    "summary": "松迪亚塔·凯塔在基里纳战役击败苏苏帝国，建立马里帝国，曼丁哥人成为西非新霸主，黄金贸易进入全盛期。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-mansa-musa",
      "africa-ghana-empire",
      "songhai-empire",
      "africa-timbuktu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "person-wen-tianxiang",
    "title": "文天祥",
    "year": 1236,
    "yearDisplay": "公元1236年—公元1283年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 27.1,
      "lng": 114.9
    },
    "summary": "南宋末年政治家、民族英雄，\"人生自古谁无死，留取丹心照汗青\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "yuan-dynasty",
      "song-dynasty",
      "yue-fei"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-x"
  },
  {
    "id": "golden-horde",
    "title": "金帐汗国",
    "year": 1242,
    "yearDisplay": "公元1242年—公元1502年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 48.4,
      "lng": 44.5
    },
    "summary": "拔都建立的蒙古四大汗国之一，又称钦察汗国，统治罗斯诸公国约240年，首都萨莱是当时世界最富庶城市之一，后分裂为喀山、克里米亚等汗国。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "europe-moscow-rise",
      "europe-ugra-standoff",
      "ilkhanate"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "mamluk-sultanate",
    "title": "马穆鲁克苏丹国",
    "year": 1250,
    "yearDisplay": "公元1250年—公元1517年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "medieval",
    "location": {
      "lat": 30,
      "lng": 31.2
    },
    "summary": "突厥/切尔克斯奴隶兵建立的王朝，1260年艾因贾鲁特战役首次击败蒙古铁骑，1291年灭十字军最后据点阿卡，统治埃及和叙利亚267年。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ilkhanate",
      "crusades",
      "fatimid-caliphate",
      "ottoman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "america-easter-island",
    "title": "复活节岛摩艾石像",
    "year": 1250,
    "yearDisplay": "约公元1250年—公元1600年",
    "civilization": "oceania",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": -27.1,
      "lng": -109.4
    },
    "summary": "拉帕努伊人雕凿近千尊巨石像（摩艾），生态崩溃与\"倒下的巨人\"的历史教训，神秘的朗格朗格文字至今未破译。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-austronesian-voyaging",
      "america-maori-aotearoa",
      "america-maya-cities",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "ilkhanate",
    "title": "伊尔汗国",
    "year": 1256,
    "yearDisplay": "公元1256年—公元1335年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 35.7,
      "lng": 51.4
    },
    "summary": "旭烈兀建立的蒙古四大汗国之一，统治伊朗及西亚广大地区，合赞汗改宗伊斯兰教，拉施特《史集》是世界史学巨著。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "golden-horde",
      "mamluk-sultanate",
      "timurid-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "mongol-postal-system",
    "title": "蒙古驿站与世界体系",
    "year": 1260,
    "yearDisplay": "公元13世纪",
    "civilization": "global",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 42,
      "lng": 80
    },
    "summary": "蒙古帝国建立了遍布欧亚的驿站系统（站赤），保护商路畅通，马可波罗等旅行者穿行无阻，东西方交流空前——这就是\"蒙古和平\"的全球化雏形。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-conquests",
      "mongol-empire",
      "black-death",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "thinker-dante",
    "title": "但丁",
    "year": 1265,
    "yearDisplay": "公元1265年—公元1321年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 43.8,
      "lng": 11.3
    },
    "summary": "《神曲》（地狱/炼狱/天堂），中世纪与文艺复兴的交界人物，用托斯卡纳方言写作奠定意大利书面语基础。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "michelangelo",
      "artist-raffaello",
      "thinker-dante"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "yuan-dynasty",
    "title": "元朝建立",
    "year": 1271,
    "yearDisplay": "公元1271年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "忽必烈建立元朝，定都大都（北京），中国首次由少数民族完全统一。",
    "disputed": "马可·波罗是否真正到过中国，学界存在争议。部分学者认为其游记可能基于波斯商人口述与道听途说拼接，缺少对中国典型事物（如茶、筷子、长城）的记载；但也有学者认为其细节描述（如元朝官职制度、城市布局）有亲历者特征。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "ming-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "event-habsburg-family",
    "title": "哈布斯堡家族世系",
    "year": 1273,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 48.2,
      "lng": 16.4
    },
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1273年",
    "summary": "哈布斯堡家族通过联姻与继承，建立\"日不落帝国\"，统治奥地...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "french-revolution",
      "ww1-western-front"
    ],
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "yashan",
    "title": "崖山海战",
    "year": 1279,
    "yearDisplay": "公元1279年",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 22.1,
      "lng": 113.6
    },
    "summary": "南宋灭亡，陆秀夫背幼帝投海殉国。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "song-dynasty",
      "yuan-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "institution-xing-sheng",
    "title": "元朝行省制度",
    "year": 1279,
    "yearDisplay": "元",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "中书省+10行中书省，行省制开端影响至今，宣政院辖西藏、澎湖巡检司辖台湾，驿站体系空前发达。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "yuan-dynasty",
      "song-dynasty",
      "ming-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "person-guo-shoujing",
    "title": "郭守敬与《授时历》",
    "year": 1280,
    "yearDisplay": "公元1231年—公元1316年",
    "civilization": "china",
    "categories": [
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 39.5,
      "lng": 116.7
    },
    "summary": "元朝天文学家，创制简仪等天文仪器，主持四海测验，《授时历》365.2425日与现行公历同精度早300年。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "yuan-dynasty",
      "song-dynasty",
      "person-shen-kuo"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "sea-sukhothai",
    "title": "素可泰与兰甘亨",
    "year": 1283,
    "yearDisplay": "公元1238年—公元1438年",
    "civilization": "eastAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 17,
      "lng": 99.7
    },
    "summary": "泰人首个独立王国，兰甘亨大帝1283年创制泰文字母，石碑记载\"水中有鱼田有稻\"，泰国民族和文化的开端。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-ayutthaya",
      "sea-angkor-founding",
      "sea-pagan",
      "khmer-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "sea-tran-dynasty",
    "title": "越南陈朝三破元军",
    "year": 1288,
    "yearDisplay": "公元1258年、公元1285年、公元1287—公元1288年",
    "civilization": "eastAsia",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 20.8,
      "lng": 106.7
    },
    "summary": "陈兴道（陈国峻）率领越南军民三次击退蒙古元朝入侵，白藤江木桩之战全歼元朝水军，是越南历史上最辉煌的军事胜利之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-ly-dynasty",
      "mongol-empire",
      "sea-cham"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "sea-majapahit",
    "title": "满者伯夷帝国",
    "year": 1293,
    "yearDisplay": "公元1293年—公元1527年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -7.5,
      "lng": 112.2
    },
    "summary": "爪哇岛上的印度教帝国，哈奄·武禄与加查·马达达到鼎盛，控制印尼群岛大部，是东南亚历史上最大的帝国，现代印度尼西亚版图的雏形。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-srivijaya",
      "sea-malacca",
      "mongol-empire",
      "ming-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "ottoman-empire",
    "title": "奥斯曼帝国",
    "year": 1299,
    "yearDisplay": "公元1299年—公元1922年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 41,
      "lng": 28.9
    },
    "summary": "奥斯曼土耳其人建立的帝国，1453年攻陷君士坦丁堡灭亡拜占庭，苏莱曼一世时期达到鼎盛。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "byzantine-empire",
      "arab-empire",
      "age-of-exploration",
      "russian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "person-guan-hanqing",
    "title": "关汉卿与元曲",
    "year": 1300,
    "yearDisplay": "金末-元初",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "元曲四大家之首，《窦娥冤》《救风尘》等，元杂剧是市民文学代表，科举停废使文人转向剧场创作。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "yuan-dynasty",
      "song-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "event-islam-southeast-asia",
    "title": "伊斯兰教传入东南亚",
    "year": 1300,
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": -6.2,
      "lng": 106.8
    },
    "civilization": "eastAsia",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1300年",
    "summary": "海上丝绸之路商人将伊斯兰教传入东南亚，马六甲苏丹国皈依后...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-malacca",
      "abbasid",
      "mali-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "thinker-ibn-battuta",
    "title": "伊本·白图泰",
    "year": 1304,
    "yearDisplay": "公元1304年—公元1377年",
    "civilization": "middleEast",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 34,
      "lng": -6.8
    },
    "summary": "摩洛哥旅行家，30年行程12万公里游遍伊斯兰世界乃至元代中国，《伊本·白图泰游记》，古代最伟大旅行家之一。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "scientist-ibn-sina",
      "scientist-al-khwarizmi",
      "econ-silk-road",
      "thinker-ibn-battuta"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-middleEast"
  },
  {
    "id": "person-liu-bowen",
    "title": "刘伯温（刘基）",
    "year": 1311,
    "yearDisplay": "公元1311年—公元1375年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 28,
      "lng": 119.9
    },
    "summary": "明初开国元勋，朱元璋首席谋士，\"三分天下诸葛亮，一统江山刘伯温\"，通天文兵法数理。",
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "person-zhu-yuanzhang",
      "ming-dynasty"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "america-maori-aotearoa",
    "title": "毛利人定居奥特亚罗瓦",
    "year": 1320,
    "yearDisplay": "约公元1320年",
    "civilization": "oceania",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": -38.7,
      "lng": 176
    },
    "summary": "波利尼西亚人乘瓦卡独木舟抵达新西兰，发展出独特的毛利文化：哈卡战舞、帕堡垒、塔普禁忌、纹身，是波利尼西亚最南端的文明。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "america-austronesian-voyaging",
      "america-easter-island",
      "age-of-exploration",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "person-mansa-musa",
    "title": "曼萨·穆萨朝圣",
    "year": 1324,
    "yearDisplay": "公元1324年—公元1325年",
    "civilization": "africa",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 21.4,
      "lng": 39.8
    },
    "summary": "马里帝国曼萨·穆萨携巨量黄金赴麦加朝圣，沿途施舍致开罗金价暴跌十年，马里的富庶震惊整个地中海世界。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mali-empire",
      "africa-timbuktu",
      "songhai-empire",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "aztec-empire",
    "title": "阿兹特克帝国",
    "year": 1325,
    "yearDisplay": "公元1325年—公元1521年",
    "civilization": "america",
    "categories": [
      "military",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 19.4,
      "lng": -99.1
    },
    "summary": "墨西加人在墨西哥中部建立的帝国，首都特诺奇蒂特兰是当时世界最大城市之一，1521年被科尔特斯摧毁。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "maya-civilization",
      "inca-empire",
      "spanish-empire",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "europe-moscow-rise",
    "title": "莫斯科公国崛起",
    "year": 1325,
    "yearDisplay": "14世纪",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "伊凡一世\"钱袋\"借替金帐汗国收税壮大势力，迁都莫斯科，利用东正教教会中心地位和金帐汗国支持逐步统一罗斯。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-kievan-rus",
      "golden-horde",
      "europe-ugra-standoff"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "muromachi-sengoku",
    "title": "室町幕府与战国时代",
    "year": 1336,
    "yearDisplay": "公元1336年—公元1603年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 35,
      "lng": 135.8
    },
    "summary": "足利尊氏建立室町幕府，应仁之乱后进入战国时代，织田信长、丰臣秀吉逐步统一。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "kamakura-shogunate",
      "edo-period",
      "ming-dynasty",
      "joseon-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "vijayanagara-empire",
    "title": "毗奢耶那伽罗帝国",
    "year": 1336,
    "yearDisplay": "公元1336年—公元1646年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 15.3,
      "lng": 76.5
    },
    "summary": "南印印度教最后大帝国，与德里苏丹国对抗数百年，亨比遗址是世界遗产，1565年塔利哥达战役被德干苏丹国联军击败后衰落。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "delhi-sultanate",
      "mughal-empire",
      "khmer-empire",
      "sea-srivijaya"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "war-hundred-years",
    "title": "英法百年战争",
    "year": 1337,
    "yearDisplay": "公元1337年—公元1453年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 49,
      "lng": 2
    },
    "summary": "英法长达116年的断续战争，圣女贞德传奇，英法民族国家形成的催化剂。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "black-death"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "medieval-hundred-years-war",
    "title": "百年战争",
    "year": 1337,
    "yearDisplay": "公元1337年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 49,
      "lng": 2
    },
    "summary": "英法之间长达116年的战争，英国长弓手在克雷西、普瓦捷、阿金库尔大败法国骑士，最终在贞德的鼓舞下法国反败为胜，催生了近代民族国家。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "medieval-charlemagne",
      "medieval-roses-war",
      "woman-joan-of-arc",
      "renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "building-notre-dame",
    "title": "巴黎圣母院",
    "year": 1345,
    "yearDisplay": "公元1163年—公元1345年",
    "civilization": "europe",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 48.85,
      "lng": 2.35
    },
    "summary": "哥特式建筑的里程碑，法国文学与历史的地标，2019年大火后于2024年修复重开。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "crusades",
      "renaissance",
      "person-napoleon",
      "holy-roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "black-death",
    "title": "黑死病",
    "year": 1347,
    "yearDisplay": "公元1347年—公元1351年",
    "civilization": "europe",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 43.7,
      "lng": 11.2
    },
    "summary": "人类历史上最致命的瘟疫，1347年从克里米亚传入欧洲，造成约2500-5000万人死亡，加速了封建制度的崩溃。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "protestant-reformation",
      "holy-roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "renaissance",
    "title": "文艺复兴",
    "year": 1350,
    "yearDisplay": "公元1350年—公元1600年",
    "civilization": "europe",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 43.8,
      "lng": 11.2
    },
    "summary": "14-16世纪发源于意大利的文化运动，复兴古希腊罗马文化，诞生了达芬奇、米开朗基罗、拉斐尔等巨匠。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "age-of-exploration",
      "protestant-reformation",
      "black-death",
      "byzantine-empire",
      "sci-scientific-revolution",
      "enlightenment"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "sea-ayutthaya",
    "title": "阿瑜陀耶王朝",
    "year": 1351,
    "yearDisplay": "公元1351年—公元1767年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": 14.4,
      "lng": 100.6
    },
    "summary": "乌通王建阿瑜陀耶（大城），417年为暹罗强国，纳黎萱大帝时期达到鼎盛，1767年被缅甸贡榜王朝攻陷屠城，泰国历史上最重要的王朝。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "sea-sukhothai",
      "sea-pagan",
      "sea-angkor-founding",
      "british-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "ming-dynasty",
    "title": "明朝建立",
    "year": 1368,
    "yearDisplay": "公元1368年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "朱元璋推翻元朝建立明朝，汉人重新执掌中原政权。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "yuan-dynasty",
      "qing-dynasty",
      "wang-yangming"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "person-zhu-yuanzhang",
    "title": "朱元璋",
    "year": 1368,
    "yearDisplay": "公元1328年—公元1398年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "明朝开国皇帝，出身最卑微的开国皇帝，从乞丐到帝王，逆袭传奇。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "event-zhenghe",
      "yuan-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "economy-tributary-system",
    "title": "朝贡贸易体系",
    "year": 1368,
    "yearDisplay": "汉代—清代",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "东亚以中国为中心的等级贸易秩序，厚往薄来、勘合贸易，郑和下西洋为其顶峰，与威斯特伐利亚体系形成对照。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "econ-silk-road",
      "event-zhenghe",
      "ming-dynasty",
      "event-kangqian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "timurid-empire",
    "title": "帖木儿帝国",
    "year": 1370,
    "yearDisplay": "公元1370年—公元1507年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 39.7,
      "lng": 66.97
    },
    "summary": "帖木儿建立的突厥化蒙古帝国，以撒马尔罕为都城，征伐无数，文化辉煌，其裔建立莫卧儿帝国。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "mongol-empire",
      "ottoman-empire",
      "mughal-empire",
      "ming-dynasty",
      "byzantine-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "building-pisa-tower",
    "title": "比萨斜塔",
    "year": 1372,
    "yearDisplay": "公元1173年—公元1372年",
    "civilization": "europe",
    "categories": [
      "artifact",
      "science"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 43.72,
      "lng": 10.39
    },
    "summary": "比萨大教堂的钟楼，因地基松软而倾斜，传说伽利略在此做自由落体实验。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "person-galileo",
      "holy-roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "event-zhu-yuanzhang-prime-minister",
    "title": "朱元璋废丞相",
    "year": 1380,
    "yearDisplay": "公元1380年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 32.1,
      "lng": 118.8
    },
    "summary": "胡惟庸案后废中书省丞相，六部直属皇帝，皇权空前加强，后设内阁顾问，明清君主专制达到顶峰。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "institution-ming-cabinet",
      "qing-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "kongolese-kingdom",
    "title": "刚果王国",
    "year": 1390,
    "yearDisplay": "约公元1390年—公元1914年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -4.3,
      "lng": 14.5
    },
    "summary": "刚果河流域的强大班图王国，15世纪与葡萄牙接触后皈依基督教，一度成为非洲最欧洲化的国家。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "africa-kongo-christianization",
      "africa-benin-bronze",
      "songhai-empire"
    ],
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "joseon-dynasty",
    "title": "朝鲜王朝",
    "year": 1392,
    "yearDisplay": "公元1392年—公元1910年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 37.6,
      "lng": 127
    },
    "summary": "朝鲜半岛最后一个统一王朝，儒家文化鼎盛，创制韩文（训民正音），历时518年。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "goryeo-dynasty",
      "ming-dynasty",
      "qing-dynasty",
      "meiji-restoration",
      "sino-japanese-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-eastAsia"
  },
  {
    "id": "medici-family",
    "title": "美第奇家族与文艺复兴赞助",
    "year": 1397,
    "yearDisplay": "公元1397年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 43.8,
      "lng": 11.3
    },
    "summary": "佛罗伦萨银行世家美第奇家族历时三百年，科西莫、洛伦佐等豪华者赞助了达芬奇、米开朗基罗、波提切利等巨匠，是文艺复兴最重要的\"金主\"。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "renaissance",
      "age-of-exploration",
      "person-leonardo"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "africa-timbuktu",
    "title": "廷巴克图与桑科雷大学",
    "year": 1400,
    "yearDisplay": "14—16世纪",
    "civilization": "africa",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 16.8,
      "lng": -3
    },
    "summary": "廷巴克图是跨撒哈拉贸易枢纽和非洲伊斯兰学术中心，桑科雷大学藏数十万手稿，是中世纪世界重要的知识宝库。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mali-empire",
      "songhai-empire",
      "person-mansa-musa",
      "al-andalus-caliphate"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "sea-malacca",
    "title": "马六甲苏丹国",
    "year": 1400,
    "yearDisplay": "约公元1400年—公元1511年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 2.2,
      "lng": 102.3
    },
    "summary": "拜里米苏拉建国，扼马六甲海峡咽喉，是伊斯兰教传入东南亚的枢纽，郑和下西洋的重要中转站，1511年被葡萄牙阿尔布克尔克攻陷。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "sea-srivijaya",
      "sea-majapahit",
      "age-of-exploration",
      "ming-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "malacca-spice-trade",
    "title": "马六甲与香料贸易",
    "year": 1400,
    "yearDisplay": "公元15世纪",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 2.2,
      "lng": 102.3
    },
    "summary": "马六甲苏丹国凭借马六甲海峡的咽喉地位成为香料贸易中心，吸引中国、印度、阿拉伯、欧洲商人云集。葡萄牙、荷兰、英国的东印度公司相继来此争夺贸易霸权。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "age-of-exploration",
      "song-maritime-trade",
      "ming-dynasty",
      "sci-scientific-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "event-jingnan-move-capital",
    "title": "靖难之役与永乐迁都",
    "year": 1402,
    "yearDisplay": "公元1399年—公元1421年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "燕王朱棣\"清君侧\"夺建文帝位，1421年迁都北京\"天子守国门\"，建紫禁城、修永乐大典、五征漠北。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "event-zhu-yuanzhang-prime-minister",
      "institution-ming-cabinet",
      "event-tumu-crisis",
      "event-zhenghe"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "institution-ming-cabinet",
    "title": "明朝内阁制度",
    "year": 1402,
    "yearDisplay": "明-清",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "内阁学士从顾问到票拟权重，司礼监批红制衡，张居正时达权力顶峰，非法定宰相，皇权附庸。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "event-zhu-yuanzhang-prime-minister",
      "person-zhangjuzheng",
      "event-jingnan-move-capital"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "event-zhenghe",
    "title": "郑和下西洋",
    "year": 1405,
    "yearDisplay": "公元1405年—公元1433年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture",
      "science"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 26,
      "lng": 119.3
    },
    "summary": "明成祖派郑和率庞大船队七次下西洋，世界航海史壮举，比哥伦布早87年。",
    "disputed": "郑和宝船的具体尺寸（史载\"长四十四丈、宽十八丈\"）学界存在争议。部分学者认为木结构帆船难以达到如此规模，实际尺寸可能较小。航行路线与到达范围也有不同说法（如是否到达美洲等）。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "ming-dynasty",
      "person-zhu-yuanzhang"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "artifact-yongle-dadian",
    "title": "《永乐大典》",
    "year": 1408,
    "yearDisplay": "1408年成书",
    "civilization": "china",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "解缙、姚广孝主持编纂，22937卷11095册，世界最大类书，正本神秘失踪，副本历经战乱散佚殆尽。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "event-jingnan-move-capital",
      "event-zhenghe",
      "event-kangqian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "woman-joan-of-arc",
    "title": "圣女贞德",
    "year": 1412,
    "yearDisplay": "公元1412年—公元1431年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 48.9,
      "lng": 1.9
    },
    "summary": "奥尔良少女，百年战争中率军解奥尔良之围、助查理七世加冕，被勃艮第人出卖后遭火刑，后平反并被封圣。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "black-death",
      "elizabeth-i",
      "ming-dynasty",
      "viking-age"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "age-of-exploration",
    "title": "大航海时代",
    "year": 1415,
    "yearDisplay": "公元1415年—公元1650年",
    "civilization": "global",
    "categories": [
      "science",
      "military",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 38.7,
      "lng": -9.1
    },
    "summary": "又称地理大发现，欧洲人开辟新航路发现新大陆的时代，哥伦布发现美洲、麦哲伦船队环球航行，世界从分散走向整体。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "spanish-empire",
      "british-empire",
      "renaissance",
      "aztec-empire",
      "inca-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "event-henry-navigator",
    "title": "恩里克王子与葡萄牙航海",
    "year": 1418,
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 37,
      "lng": -8.5
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1418年",
    "summary": "葡萄牙恩里克王子（航海家亨利）创办航海学校，推动大西洋探...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "age-of-exploration",
      "columbus",
      "event-zhenghe"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "africa-mwene-mutapa",
    "title": "姆韦内·穆塔帕王国",
    "year": 1420,
    "yearDisplay": "约公元1420年—公元1902年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": -17.5,
      "lng": 31
    },
    "summary": "绍纳人在大津巴布韦之后建立的帝国，又称莫诺莫塔帕，控制津巴布韦高原黄金矿脉，与葡萄牙通商又长期对抗。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "africa-great-zimbabwe",
      "africa-swahili-city-states",
      "age-of-exploration",
      "ottoman-empire"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "ulugh-beg-observatory",
    "title": "兀鲁伯与天文台",
    "year": 1428,
    "yearDisplay": "公元1394年—公元1449年",
    "civilization": "centralAsia",
    "categories": [
      "science",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 39.7,
      "lng": 66.97
    },
    "summary": "帖木儿之孙兀鲁伯是中世纪最伟大的天文学家之一，建造了当时世界最大的天文台，《兀鲁伯星表》观测1018颗恒星，精度领先欧洲百年。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "timurid-empire",
      "person-galileo",
      "person-newton",
      "samanid-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "later-le-dynasty",
    "title": "后黎朝（蓝山起义）",
    "year": 1428,
    "yearDisplay": "公元1428年—公元1789年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "military"
    ],
    "type": "dynasty",
    "eraId": "earlyModern",
    "location": {
      "lat": 21,
      "lng": 105.8
    },
    "summary": "黎利领导蓝山起义驱逐明朝驻军，建立后黎朝，发布《平吴大诰》宣告独立，\"仁义之举，要在安民\"，越南进入最繁荣的时期。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "sea-tran-dynasty",
      "ming-dynasty",
      "sea-cham"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "america-aztec",
    "title": "阿兹特克三方同盟",
    "year": 1428,
    "yearDisplay": "公元1428年—公元1521年",
    "civilization": "america",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 19.4,
      "lng": -99.1
    },
    "summary": "特诺奇蒂特兰、特斯科科、特拉科潘的三方同盟，特诺奇蒂特兰建在湖上（浮动园地奇南帕），人祭规模空前，1521年被科尔特斯征服。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "america-olmec",
      "america-teotihuacan",
      "america-chichen-itza",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "inca-empire",
    "title": "印加帝国",
    "year": 1438,
    "yearDisplay": "公元1438年—公元1533年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture",
      "science"
    ],
    "eraId": "medieval",
    "type": "dynasty",
    "location": {
      "lat": -13.5,
      "lng": -71.9
    },
    "summary": "美洲最大的前哥伦布时期帝国，沿安第斯山脉延伸4000公里，道路系统长达4万公里，使用奇普结绳记事。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "maya-civilization",
      "aztec-empire",
      "spanish-empire",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "printing-westward",
    "title": "印刷术西传与古腾堡",
    "year": 1440,
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 50,
      "lng": 8.3
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1440年",
    "summary": "印刷术经蒙古时代东西交流传入欧洲，古腾堡在其基础上发展金...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mongol-empire",
      "gutenberg",
      "reformation"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "event-tumu-crisis",
    "title": "土木堡之变",
    "year": 1449,
    "yearDisplay": "公元1449年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 40.4,
      "lng": 114.4
    },
    "summary": "明英宗亲征瓦剌也先，土木堡全军覆没、皇帝被俘，于谦领导北京保卫战取胜，明朝由盛转衰的节点。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "institution-ming-cabinet",
      "person-zhangjuzheng"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "landmark-machu-picchu",
    "title": "马丘比丘",
    "year": 1450,
    "yearDisplay": "约公元1450年",
    "civilization": "america",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": -13.16,
      "lng": -72.54
    },
    "summary": "印加帝国空中之城，世界新七大奇迹之一，失落的印加城市。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "inca-empire",
      "aztec-empire",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "america-inca-roads",
    "title": "印加道路系统与奇普",
    "year": 1450,
    "yearDisplay": "公元1438年—公元1533年",
    "civilization": "america",
    "categories": [
      "science",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": -13.5,
      "lng": -72
    },
    "summary": "印加帝国路网全长约4万公里贯通安第斯，结绳记事奇普（quipu）以绳结记录数据，无文字而治理大帝国，信使接力chasqui效率惊人。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "america-tiwanaku",
      "america-aztec",
      "age-of-exploration",
      "america-maya-cities"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "iroquois-league",
    "title": "易洛魁联盟",
    "year": 1450,
    "yearDisplay": "约公元1450年—公元1779年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 43,
      "lng": -75
    },
    "summary": "北美东北部六个印第安部落组成的联盟，实行部落民主制度，被视为世界上最古老的代议制之一。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "mississippian-culture",
      "america-cahokia",
      "powhatan-confederacy"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "da-vinci",
    "title": "达·芬奇",
    "year": 1452,
    "yearDisplay": "公元1452年—公元1519年",
    "civilization": "europe",
    "categories": [
      "culture",
      "science"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 43.7,
      "lng": 10.9
    },
    "summary": "意大利文艺复兴全盛期最伟大的全才，画家、科学家、发明家的完美统一。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "michelangelo",
      "gutenberg"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-leonardo",
    "title": "列奥纳多·达·芬奇",
    "year": 1452,
    "yearDisplay": "公元1452年—公元1519年",
    "civilization": "europe",
    "categories": [
      "culture",
      "science"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 43.8,
      "lng": 10.9
    },
    "summary": "意大利文艺复兴全盛期全才，画家、科学家、发明家，\"文艺复兴人\"的最高典范。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "person-shakespeare",
      "michelangelo",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "constantinople-fall",
    "title": "君士坦丁堡陷落",
    "year": 1453,
    "yearDisplay": "公元1453年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 41,
      "lng": 29
    },
    "summary": "奥斯曼土耳其攻陷君士坦丁堡，东罗马帝国灭亡。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "rome-split",
      "columbus"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "gutenberg",
    "title": "古腾堡活字印刷术",
    "year": 1455,
    "yearDisplay": "公元1455年",
    "civilization": "europe",
    "categories": [
      "science",
      "culture"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 50,
      "lng": 8.3
    },
    "summary": "古腾堡发明金属活字印刷，知识传播革命开启。",
    "description": "",
    "disputed": "古腾堡金属活字印刷术是欧洲近代印刷业的开端；活字印刷技术此前已在东亚有发展，不同文明各自的技术传统与历史影响学界有不同评价。",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "reformation",
      "da-vinci"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "artifact-gutenberg-bible",
    "title": "古腾堡四十二行圣经",
    "year": 1455,
    "yearDisplay": "1455年印制",
    "civilization": "europe",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "earlyModern",
    "type": "artifact",
    "location": {
      "lat": 50,
      "lng": 8.3
    },
    "summary": "西方第一部用金属活字印刷的书籍，标志着印刷革命的开始，推动了宗教改革、知识普及与现代社会的到来。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "renaissance",
      "protestant-reformation",
      "artifact-de-revolutionibus",
      "gutenberg"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "medieval-roses-war",
    "title": "玫瑰战争",
    "year": 1455,
    "yearDisplay": "公元1455年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "medieval",
    "location": {
      "lat": 52,
      "lng": -1
    },
    "summary": "英国兰开斯特家族（红玫瑰）与约克家族（白玫瑰）为争夺王位展开内战，最终以都铎王朝建立告终，贵族势力大衰，英国迈向中央集权。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "medieval-hundred-years-war",
      "renaissance",
      "elizabeth-i",
      "protestant-reformation"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "kazakh-khanate",
    "title": "哈萨克汗国（三玉兹）",
    "year": 1456,
    "yearDisplay": "公元1456年—公元1847年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 48,
      "lng": 67
    },
    "summary": "哈萨克人建立的草原大帝国，分为大中小三玉兹，鼎盛时期疆域辽阔，是16-18世纪中亚草原的霸主。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "golden-horde",
      "shaibanid-dynasty",
      "bukhara-khanate"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "tupac-ypanqui",
    "title": "图帕克·尤潘基",
    "year": 1471,
    "yearDisplay": "公元1471年—公元1493年",
    "civilization": "america",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": -13.5,
      "lng": -71.97
    },
    "summary": "印加帝国第十一代萨帕·印卡，在位期间大幅扩张领土，将帝国推向鼎盛，是印加最伟大的征服者。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "inca-empire",
      "huayna-capac",
      "america-inca-roads"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "wang-yangming",
    "title": "王阳明",
    "year": 1472,
    "yearDisplay": "公元1472年—公元1529年",
    "civilization": "china",
    "categories": [
      "culture",
      "military"
    ],
    "type": "person",
    "eraId": "medieval",
    "location": {
      "lat": 29.9,
      "lng": 121.5
    },
    "summary": "明代最伟大的思想家，心学集大成者，\"立德、立功、立言\"三不朽圣人。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "qing-dynasty",
      "meiji-restoration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "michelangelo",
    "title": "米开朗基罗",
    "year": 1475,
    "yearDisplay": "公元1475年—公元1564年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 43.7,
      "lng": 11.2
    },
    "summary": "文艺复兴美术三杰之一，雕塑家、画家、建筑师，艺术史上的巨人。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "da-vinci",
      "newton"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "europe-ugra-standoff",
    "title": "乌格拉河对峙",
    "year": 1480,
    "yearDisplay": "公元1480年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 54.6,
      "lng": 35.8
    },
    "summary": "1480年伊凡三世与金帐汗国阿合马汗在乌格拉河对峙，蒙古军不战而退，罗斯彻底摆脱长达约240年的蒙古统治。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "europe-moscow-rise",
      "golden-horde"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "artist-raffaello",
    "title": "拉斐尔",
    "year": 1483,
    "yearDisplay": "公元1483年—公元1520年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 43.7,
      "lng": 12.5
    },
    "summary": "文艺复兴三杰之一，《雅典学院》《西斯廷圣母》，以和谐秀美、古典完美著称，37岁早逝，古典主义典范。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "renaissance",
      "michelangelo",
      "thinker-dante",
      "pantheon-building"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-martin-luther",
    "title": "马丁·路德",
    "year": 1483,
    "yearDisplay": "公元1483年—公元1546年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 51,
      "lng": 12
    },
    "summary": "德国宗教改革家，新教路德宗创始人，《九十五条论纲》揭开宗教改革序幕，主张因信称义。",
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "reformation",
      "protestant-reformation",
      "renaissance"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "africa-kongo-christianization",
    "title": "刚果王国基督教化",
    "year": 1491,
    "yearDisplay": "1491年起",
    "civilization": "africa",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": -6.3,
      "lng": 14.3
    },
    "summary": "刚果国王恩津加·恩库武受洗皈依天主教，与葡萄牙建立平等外交关系，后因奴隶贸易和殖民渗透导致王国衰落。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "age-of-exploration",
      "africa-zanzibar-slave-trade",
      "spanish-empire",
      "person-mansa-musa"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "columbus",
    "title": "哥伦布发现美洲",
    "year": 1492,
    "yearDisplay": "公元1492年",
    "civilization": "america",
    "categories": [
      "science",
      "military"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 20,
      "lng": -75
    },
    "summary": "哥伦布横渡大西洋到达美洲，地理大发现时代正式开始。",
    "description": "",
    "disputed": "美洲原住民早在哥伦布抵达前数万年已在此繁衍生息，「发现」是欧洲中心视角的表述；更准确的说法是哥伦布「首次到达」或「开启了欧洲与美洲的大规模接触」。",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "constantinople-fall",
      "da-gama",
      "magellan"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "spanish-empire",
    "title": "西班牙帝国",
    "year": 1492,
    "yearDisplay": "公元1492年—公元1898年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "science"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 40.4,
      "lng": -3.7
    },
    "summary": "第一个日不落帝国，通过大航海和殖民征服美洲获取巨额黄金白银，16世纪达到鼎盛，1898年美西战争后衰落。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "age-of-exploration",
      "aztec-empire",
      "inca-empire",
      "british-empire",
      "maya-civilization"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "econ-age-of-exploration",
    "title": "地理大发现",
    "year": 1492,
    "yearDisplay": "15—17世纪",
    "civilization": "global",
    "categories": [
      "science",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 28.5,
      "lng": -13.8
    },
    "summary": "大航海时代，哥伦布发现美洲，麦哲伦环球航行，世界从分散走向整体。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "sci-scientific-revolution",
      "aztec-empire",
      "inca-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "econ-columbian-exchange",
    "title": "哥伦布大交换",
    "year": 1492,
    "yearDisplay": "公元1492年—公元1800年",
    "civilization": "global",
    "categories": [
      "science",
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 28.5,
      "lng": -15.4
    },
    "summary": "哥伦布发现美洲后，新旧大陆之间生物、农作物、人种、文化、传染病的大规模交流，深刻改变了世界。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "econ-age-of-exploration",
      "columbus",
      "spanish-empire",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "songhai-empire",
    "title": "桑海帝国阿斯基亚盛世",
    "year": 1493,
    "yearDisplay": "公元1493年—公元1528年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 16.6,
      "lng": -0.5
    },
    "summary": "阿斯基亚·穆罕默德·杜尔建立阿斯基亚王朝，桑海帝国版图超过马里成为西非史上最大，建立官僚体系、完善税收与科举式学者选拔。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mali-empire",
      "africa-timbuktu",
      "person-mansa-musa",
      "ottoman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "huayna-capac",
    "title": "华伊纳·卡帕克",
    "year": 1493,
    "yearDisplay": "公元1493年—公元1527年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": -0.2,
      "lng": -78.5
    },
    "summary": "印加帝国第十二代皇帝，在位期间帝国达到极盛，死于欧洲传入的天花，死后帝国因内战而衰落。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "inca-empire",
      "tupac-ypanqui",
      "atahualpa"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "da-gama",
    "title": "达伽马开辟印度新航路",
    "year": 1498,
    "yearDisplay": "公元1498年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 15.6,
      "lng": 73.8
    },
    "summary": "葡萄牙航海家达伽马绕过好望角到达印度，开辟东西方新航路。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "columbus",
      "magellan"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "env-little-ice-age",
    "title": "小冰期",
    "year": 1500,
    "yearDisplay": "公元1300年—公元1850年",
    "civilization": "global",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 50,
      "lng": 10
    },
    "summary": "全球变冷期，格陵兰维京人消亡、欧洲歉收猎巫、明末连年旱灾蝗灾是明朝灭亡诱因之一，1789法国革命前恶劣收成。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "env-1816-year-without-summer",
      "ming-dynasty",
      "qing-dynasty",
      "env-medieval-warm-period"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-others"
  },
  {
    "id": "renaissance-high-italy",
    "title": "文艺复兴盛期意大利",
    "year": 1500,
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 43.8,
      "lng": 11.3
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1500年",
    "summary": "16世纪初文艺复兴达到鼎盛，以佛罗伦萨、罗马、威尼斯为中...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "medici-family",
      "ming-dynasty"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "event-ming-vs-renaissance",
    "title": "明朝与文艺复兴对照",
    "year": 1500,
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 30,
      "lng": 0
    },
    "civilization": "global",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1500年",
    "summary": "16世纪初，明朝中叶国力仍盛，意大利文艺复兴达到鼎盛，东...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "renaissance",
      "event-kangqian"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "shaibanid-dynasty",
    "title": "昔班尼王朝",
    "year": 1500,
    "yearDisplay": "公元1500年—公元1598年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 39.6,
      "lng": 64.4
    },
    "summary": "乌兹别克人建立的中亚王朝，昔班尼汗率部南下征服河中地区，是乌兹别克民族形成的关键时期。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "timurid-empire",
      "bukhara-khanate",
      "khiva-khanate",
      "golden-horde"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "haka-tradition",
    "title": "哈卡战舞",
    "year": 1500,
    "yearDisplay": "约公元1500年—至今",
    "civilization": "oceania",
    "categories": [
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": -40,
      "lng": 175
    },
    "summary": "毛利人的传统战舞，以瞪眼、吐舌、拍胸、跺脚等动作表现战士的勇猛，现为新西兰国家象征。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "america-maori-aotearoa",
      "treaty-of-waitangi",
      "polynesian-expansion"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "safavid-persia",
    "title": "萨法维王朝",
    "year": 1501,
    "yearDisplay": "公元1501年—公元1736年",
    "civilization": "middleEast",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "earlyModern",
    "location": {
      "lat": 32.7,
      "lng": 51.7
    },
    "summary": "伊斯玛仪一世建立的波斯萨法维王朝，立什叶派十二伊玛目派为国教，阿拔斯大帝建伊斯法罕\"半天下\"，与奥斯曼长期对抗的三大火药帝国之一。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "ottoman-empire",
      "mughal-empire",
      "timurid-empire",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "event-da-vinci",
    "title": "达芬奇与文艺复兴盛期",
    "year": 1503,
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 45.5,
      "lng": 9.2
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1503年",
    "summary": "列奥纳多·达·芬奇是文艺复兴全才的代表，绘画、解剖、工程...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "medici-family",
      "thinker-dante"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "bukhara-khanate",
    "title": "布哈拉汗国",
    "year": 1506,
    "yearDisplay": "公元1506年—公元1920年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 39.77,
      "lng": 64.42
    },
    "summary": "中亚河中地区的伊斯兰王朝，先后经历昔班尼、札尼、曼吉特三朝，布哈拉成为伊斯兰学术中心。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "shaibanid-dynasty",
      "khiva-khanate",
      "kokand-khanate",
      "kazakh-khanate"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "person-calvin",
    "title": "加尔文",
    "year": 1509,
    "yearDisplay": "公元1509年—公元1564年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 46.2,
      "lng": 6.1
    },
    "summary": "宗教改革家，加尔文宗创始人，《基督教要义》系统阐述新教神学，影响深远。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "reformation",
      "person-martin-luther",
      "enlightenment"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "khiva-khanate",
    "title": "希瓦汗国",
    "year": 1512,
    "yearDisplay": "公元1512年—公元1920年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 42.32,
      "lng": 60.36
    },
    "summary": "花剌子模地区的中亚汗国，以绿洲农业和奴隶贸易著称，保留了最传统的伊斯兰制度，最后被苏联征服。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "shaibanid-dynasty",
      "bukhara-khanate",
      "khwarazmian-empire"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "reformation",
    "title": "马丁·路德宗教改革",
    "year": 1517,
    "yearDisplay": "公元1517年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 52,
      "lng": 11.6
    },
    "summary": "马丁·路德贴出《九十五条论纲》，新教诞生，基督教世界再次大分裂。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "great-schism",
      "gutenberg",
      "enlightenment"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "protestant-reformation",
    "title": "宗教改革",
    "year": 1517,
    "yearDisplay": "公元1517年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 51.8,
      "lng": 10.5
    },
    "summary": "16世纪欧洲基督教改革运动，马丁·路德张贴《九十五条论纲》反对赎罪券，导致新教诞生和西方基督教永久分裂。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "holy-roman-empire",
      "british-empire",
      "black-death"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "idea-reformation",
    "title": "宗教改革与反宗教改革",
    "year": 1517,
    "yearDisplay": "公元1517年—公元1648年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 51.8,
      "lng": 10.5
    },
    "summary": "马丁·路德《九十五条论纲》引发基督教第二次大分裂，催生新教，改变欧洲政治与思想格局。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "idea-christianity",
      "renaissance",
      "enlightenment",
      "thirty-years-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "scientist-li-shizhen",
    "title": "李时珍",
    "year": 1518,
    "yearDisplay": "公元1518年—公元1593年",
    "civilization": "china",
    "categories": [
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 30.5,
      "lng": 115
    },
    "summary": "明代医药学家，《本草纲目》52卷1892种药物，历时27年三易其稿，东方博物学巨著，达尔文亦有引用。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "scientist-li-shizhen",
      "ming-dynasty",
      "scientist-zhang-heng",
      "scientist-song-yingxing"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "magellan",
    "title": "麦哲伦环球航行",
    "year": 1519,
    "yearDisplay": "公元1519年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": -33,
      "lng": -70
    },
    "summary": "麦哲伦船队首次环球航行，证明地球是圆的。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "columbus",
      "da-gama",
      "elizabeth-i"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "artifact-mona-lisa",
    "title": "蒙娜丽莎",
    "year": 1519,
    "yearDisplay": "公元1503年—公元1519年",
    "civilization": "europe",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "artifact",
    "location": {
      "lat": 48.86,
      "lng": 2.33
    },
    "summary": "达·芬奇最著名的油画作品，以神秘微笑闻名，世界上最著名的画作。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "person-leonardo",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "cortes-conquers-aztec",
    "title": "科尔特斯征服阿兹特克",
    "year": 1519,
    "yearDisplay": "公元1519年",
    "civilization": "america",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 19.4,
      "lng": -99.1
    },
    "summary": "西班牙殖民者科尔特斯率数百人征服人口数百万的阿兹特克帝国，靠的是马匹、钢铁武器、天花、盟友离间——开启了西班牙美洲殖民时代。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "aztec-empire",
      "age-of-exploration",
      "pizarro-conquers-inca",
      "price-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "mughal-empire",
    "title": "莫卧儿帝国",
    "year": 1526,
    "yearDisplay": "公元1526年—公元1857年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "culture",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 27.2,
      "lng": 78
    },
    "summary": "突厥化蒙古人在印度建立的帝国，阿克巴大帝推行宗教宽容，沙贾汗时期建筑艺术巅峰（泰姬陵）。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "maurya-empire",
      "gupta-empire",
      "british-empire",
      "myth-indian"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "person-qijiguang",
    "title": "戚继光",
    "year": 1528,
    "yearDisplay": "公元1528年—公元1588年",
    "civilization": "china",
    "categories": [
      "military",
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 37.8,
      "lng": 120.7
    },
    "summary": "明代抗倭名将、军事家，组建戚家军，南平倭患北御蒙古。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "wang-yangming",
      "landmark-great-wall"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "pizarro-conquers-inca",
    "title": "皮萨罗征服印加帝国",
    "year": 1532,
    "yearDisplay": "公元1532年",
    "civilization": "america",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": -13.5,
      "lng": -71.9
    },
    "summary": "皮萨罗率168名西班牙士兵趁印加内战与天花，在卡哈马卡设伏俘获皇帝阿塔瓦尔帕，以少胜多灭亡印加帝国，波托西白银涌入全球经济。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "inca-empire",
      "cortes-conquers-aztec",
      "age-of-exploration",
      "price-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "atahualpa",
    "title": "阿塔瓦尔帕",
    "year": 1532,
    "yearDisplay": "公元1532年—公元1533年",
    "civilization": "america",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": -7.16,
      "lng": -78.5
    },
    "summary": "印加帝国末代皇帝，刚在内战中获胜就被西班牙殖民者皮萨罗俘虏，缴纳巨额赎金后仍被处死。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "inca-empire",
      "huayna-capac",
      "america-inca-roads"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "elizabeth-i",
    "title": "伊丽莎白一世",
    "year": 1533,
    "yearDisplay": "公元1533年—公元1603年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英格兰都铎王朝末代女王，\"童贞女王\"，统治时期被称为\"伊丽莎白时代\"——英国的黄金时代。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "shakespeare",
      "reformation",
      "person-shakespeare",
      "spanish-armada",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "event-calvin-reformation",
    "title": "加尔文宗教改革",
    "year": 1541,
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 46.2,
      "lng": 6.1
    },
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1541年",
    "summary": "加尔文在日内瓦建立神权共和国，其\"预定论\"思想深刻影响新...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "reformation",
      "protestant-reformation",
      "enlightenment"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "copernicus",
    "title": "哥白尼日心说",
    "year": 1543,
    "yearDisplay": "公元1543年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 53.1,
      "lng": 18.6
    },
    "summary": "哥白尼《天体运行论》出版，日心说挑战地心说，科学革命开端。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "newton",
      "gutenberg"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "sci-scientific-revolution",
    "title": "科学革命",
    "year": 1543,
    "yearDisplay": "16—17世纪",
    "civilization": "europe",
    "categories": [
      "science",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 43.8,
      "lng": 11.2
    },
    "summary": "从哥白尼到牛顿，近代科学的诞生，人类认识世界方式的根本变革。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "person-galileo",
      "person-newton",
      "enlightenment"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "artifact-de-revolutionibus",
    "title": "《天体运行论》",
    "year": 1543,
    "yearDisplay": "1543年出版",
    "civilization": "europe",
    "categories": [
      "science",
      "artifact"
    ],
    "eraId": "earlyModern",
    "type": "artifact",
    "location": {
      "lat": 53,
      "lng": 18.5
    },
    "summary": "哥白尼临终出版，提出日心说挑战托勒密地心体系，科学革命的开端，\"哥白尼革命\"改变人类宇宙观。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "renaissance",
      "galileo",
      "scientist-kepler",
      "newton"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "counter-reformation-jesuits",
    "title": "反宗教改革与耶稣会",
    "year": 1545,
    "yearDisplay": "公元1545年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 46.1,
      "lng": 11.1
    },
    "summary": "面对新教冲击，天主教发起反宗教改革自救：特伦托公会议整肃教义纪律，罗耀拉创立耶稣会开展海外传教，利玛窦等将天主教传入中国。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "reformation",
      "age-of-exploration",
      "renaissance",
      "sci-scientific-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "price-revolution",
    "title": "价格革命与商业革命",
    "year": 1550,
    "yearDisplay": "公元16世纪",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 40.4,
      "lng": -3.7
    },
    "summary": "美洲白银大量涌入欧洲引发持续百年的通货膨胀，封建地主衰落、商业资产阶级崛起，重商主义兴起，欧洲从封建社会加速向资本主义转型。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "age-of-exploration",
      "cortes-conquers-aztec",
      "pizarro-conquers-inca",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "event-habsburg-bourbon",
    "title": "哈布斯堡与波旁王朝",
    "year": 1556,
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1556年",
    "summary": "查理五世将哈布斯堡帝国分为西班牙与奥地利两支；波旁王朝随...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "renaissance",
      "french-revolution",
      "napoleon"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-nuerhachi",
    "title": "努尔哈赤",
    "year": 1559,
    "yearDisplay": "公元1559年—公元1626年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 41.8,
      "lng": 123.4
    },
    "summary": "后金开国之君，清朝奠基人，\"十三副遗甲起兵\"，统一女真，创立八旗制度与满文。",
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "person-huangtaiji",
      "person-shunzhi"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "shakespeare",
    "title": "莎士比亚",
    "year": 1564,
    "yearDisplay": "公元1564年—公元1616年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 52.2,
      "lng": -1.7
    },
    "summary": "英国最伟大的剧作家、诗人，世界文学史上的巅峰人物。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "elizabeth-i",
      "da-vinci"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "galileo",
    "title": "伽利略",
    "year": 1564,
    "yearDisplay": "公元1564年—公元1642年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 43.7,
      "lng": 10.4
    },
    "summary": "意大利天文学家、物理学家，\"现代科学之父\"，科学革命的关键人物。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "copernicus",
      "newton",
      "renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-galileo",
    "title": "伽利略·伽利雷",
    "year": 1564,
    "yearDisplay": "公元1564年—公元1642年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 43.7,
      "lng": 10.4
    },
    "summary": "意大利物理学家、天文学家，\"现代科学之父\"，近代实验科学的奠基人。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "person-newton",
      "copernicus",
      "sci-scientific-revolution",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-shakespeare",
    "title": "威廉·莎士比亚",
    "year": 1564,
    "yearDisplay": "公元1564年—公元1616年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 52.2,
      "lng": -1.7
    },
    "summary": "英国剧作家、诗人，英语文学史上最伟大的作家，\"不属于一个时代，而属于所有世纪\"。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "person-leonardo",
      "elizabeth-i"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "dutch-revolt",
    "title": "尼德兰革命与荷兰共和国",
    "year": 1568,
    "yearDisplay": "公元1568年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 52.5,
      "lng": 4.9
    },
    "summary": "尼德兰低地地区反抗西班牙统治的八十年战争，诞生了世界上第一个资产阶级共和国——荷兰共和国，\"海上马车夫\"开创了近代商业与金融制度。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "reformation",
      "age-of-exploration",
      "economy-dutch-finance",
      "thirty-years-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "europe-polish-lithuania",
    "title": "波兰立陶宛联邦成立",
    "year": 1569,
    "yearDisplay": "公元1569年—公元1795年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 51.2,
      "lng": 22.6
    },
    "summary": "1569年卢布林联合建立波兰立陶宛联邦，贵族民主制（选王制、自由否决权），疆域欧洲第二大，1795年三遭瓜分而亡。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "europe-teutonic-order",
      "europe-may-3-constitution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "powhatan-confederacy",
    "title": "波瓦坦联盟",
    "year": 1570,
    "yearDisplay": "约公元1570年—公元1646年",
    "civilization": "america",
    "categories": [
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 37.5,
      "lng": -77
    },
    "summary": "弗吉尼亚 Tidewater 地区30多个部落组成的印第安联盟，是英国在北美第一个永久殖民地詹姆斯敦的原住民。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "iroquois-league",
      "mississippian-culture",
      "america-cahokia"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "scientist-kepler",
    "title": "开普勒",
    "year": 1571,
    "yearDisplay": "公元1571年—公元1630年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 48.8,
      "lng": 9.2
    },
    "summary": "行星运动三定律（椭圆轨道），用第谷观测数据推导出太阳系运动规律，\"天空立法者\"，为牛顿万有引力铺路。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "galileo",
      "newton",
      "copernicus",
      "renaissance"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-zhangjuzheng",
    "title": "张居正改革",
    "year": 1573,
    "yearDisplay": "公元1573年—公元1582年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 30.3,
      "lng": 112.2
    },
    "summary": "考成法整顿吏治、一条鞭法赋役合并折银、清丈田亩，万历初年国库充盈，明代最有权势的首辅，死后被清算。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "institution-ming-cabinet",
      "ming-dynasty",
      "event-tumu-crisis",
      "qing-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "akbar-religious-synthesis",
    "title": "阿克巴的宗教融合",
    "year": 1579,
    "yearDisplay": "公元1542年—公元1605年",
    "civilization": "southAsia",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 27.2,
      "lng": 77.5
    },
    "summary": "莫卧儿皇帝阿克巴废除朝圣税和人头税，创立\"神圣信仰\"（丁伊伊拉希），通过拉杰普特联姻和曼萨卜达尔制实现多民族帝国的宗教宽容与融合。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "mughal-empire",
      "aurangzeb-decline",
      "vijayanagara-empire",
      "ottoman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "event-matteo-ricci-china",
    "title": "利玛窦来华与西学东渐",
    "year": 1583,
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "description": "",
    "yearDisplay": "公元1583年",
    "summary": "耶稣会士利玛窦进入中国，开创\"文化适应\"传教策略，引入西...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "counter-reformation-jesuits",
      "ming-dynasty",
      "wang-yangming"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "scientist-song-yingxing",
    "title": "宋应星",
    "year": 1587,
    "yearDisplay": "公元1587年—约公元1666年",
    "civilization": "china",
    "categories": [
      "science"
    ],
    "eraId": "medieval",
    "type": "person",
    "location": {
      "lat": 28.6,
      "lng": 115.7
    },
    "summary": "《天工开物》，\"中国17世纪的工艺百科全书\"，系统记录农业与手工业技术，明代科技集大成之作。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "scientist-li-shizhen",
      "ming-dynasty",
      "scientist-song-yingxing",
      "scientist-zhang-heng"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "british-empire",
    "title": "大英帝国",
    "year": 1588,
    "yearDisplay": "公元1588年—公元1997年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "science"
    ],
    "eraId": "industrial",
    "type": "dynasty",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "历史上最大的殖民帝国，疆域最大时占世界陆地面积四分之一，被称为日不落帝国，工业革命后称霸世界。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "age-of-exploration",
      "person-napoleon",
      "mughal-empire",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "spanish-armada",
    "title": "无敌舰队覆灭",
    "year": 1588,
    "yearDisplay": "公元1588年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 50,
      "lng": -1
    },
    "summary": "西班牙腓力二世派\"无敌舰队\"远征英国，被德雷克的英国海军用火船战术和风暴击溃。这场海战是海权转移的标志——西班牙衰落，英国开始崛起。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "reformation",
      "dutch-revolt",
      "age-of-exploration",
      "elizabeth-i"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "myth-xiyouji",
    "title": "西游记神话体系",
    "year": 1592,
    "yearDisplay": "明代（文学作品）",
    "civilization": "china",
    "categories": [
      "myth",
      "culture"
    ],
    "eraId": "medieval",
    "type": "myth",
    "location": {
      "lat": 34.5,
      "lng": 108.9
    },
    "summary": "以吴承恩《西游记》为核心的神魔小说体系，孙悟空大闹天宫、唐僧西天取经、九九八十一难。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "myth-daojiao",
      "myth-shanhaijing",
      "person-libai"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "person-huangtaiji",
    "title": "皇太极（清太宗）",
    "year": 1592,
    "yearDisplay": "公元1592年—公元1643年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 41.8,
      "lng": 123.4
    },
    "summary": "清朝开国皇帝，努尔哈赤第八子，改国号大清，改族名满洲，统一漠南蒙古，两征朝鲜。",
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "person-nuerhachi",
      "person-shunzhi"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "myth-sun-wukong",
    "title": "孙悟空与大闹天宫",
    "year": 1592,
    "yearDisplay": "明万历二十年（小说《西游记》成书）",
    "civilization": "china",
    "categories": [
      "culture",
      "myth"
    ],
    "type": "myth",
    "eraId": "earlyModern",
    "location": {
      "lat": 34.5,
      "lng": 113.6
    },
    "summary": "中国最著名的神话英雄，花果山水帘洞美猴王齐天大圣，后随唐僧西天取经终成斗战胜佛。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "myth-xiyouji",
      "myth-shanhaijing",
      "myth-daojiao"
    ],
    "important": true,
    "disputed": "",
    "keyPoints": [
      "花果山石猴出世，七十二变筋斗云",
      "大闹天宫，被压五行山五百年",
      "保唐僧西天取经，九九八十一难",
      "终成斗战胜佛，三教融合的文化符号"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "edo-period",
    "title": "德川幕府·江户时代",
    "year": 1603,
    "yearDisplay": "公元1603年—公元1868年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 35.7,
      "lng": 139.7
    },
    "summary": "日本最后一个幕府，幕藩体制、参勤交代、锁国政策，町人文化繁荣，黑船来航后终结。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "muromachi-sengoku",
      "meiji-restoration",
      "qing-dynasty",
      "person-linxun"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "economy-dutch-finance",
    "title": "荷兰金融革命",
    "year": 1609,
    "yearDisplay": "17世纪",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 52.4,
      "lng": 4.9
    },
    "summary": "阿姆斯特丹证券交易所、荷兰东印度公司、阿姆斯特丹银行——现代金融体系的诞生，郁金香狂热是首次投机泡沫。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "economy-lydian-coinage",
      "economy-south-sea-bubble",
      "economy-gold-standard",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "institution-eight-banners",
    "title": "八旗制度",
    "year": 1615,
    "yearDisplay": "清",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 41.8,
      "lng": 123.4
    },
    "summary": "努尔哈赤1615年编牛录为八旗，兵民合一、军政一体，议政王大臣会议，清朝立国基础，后逐渐腐化。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "qing-dynasty",
      "event-kangqian",
      "event-yongzheng-reform",
      "ming-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "thirty-years-war",
    "title": "三十年战争",
    "year": 1618,
    "yearDisplay": "公元1618年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 50,
      "lng": 10
    },
    "summary": "欧洲三十年战争爆发，宗教与政治交织的全欧大混战。",
    "important": true,
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "reformation",
      "british-revolution",
      "renaissance",
      "protestant-reformation",
      "enlightenment"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "event-donglin-party-struggle",
    "title": "东林党争",
    "year": 1620,
    "yearDisplay": "晚明",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 31.6,
      "lng": 120.3
    },
    "summary": "东林书院清议 vs 阉党魏忠贤，复社继起，党争消耗国力与明亡关系密切，\"风声雨声读书声声声入耳\"。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "institution-ming-cabinet",
      "thinker-late-ming-three",
      "qing-dynasty"
    ],
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "person-locke",
    "title": "约翰·洛克",
    "year": 1632,
    "yearDisplay": "公元1632年—公元1704年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英国哲学家，经验主义奠基人，《政府论》提出自然权利和社会契约，自由主义之父。",
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "enlightenment",
      "american-independence",
      "person-newton"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "qing-dynasty",
    "title": "清朝建立",
    "year": 1636,
    "yearDisplay": "公元1636年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 41.8,
      "lng": 123.4
    },
    "summary": "皇太极改国号为清，清朝正式建立，后入主中原。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "ming-dynasty",
      "opium-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "econ-tulip-mania",
    "title": "郁金香泡沫",
    "year": 1637,
    "yearDisplay": "公元1634年—公元1637年",
    "civilization": "europe",
    "categories": [
      "politics",
      "science"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 52.4,
      "lng": 4.9
    },
    "summary": "人类历史上第一次有记载的金融投机泡沫，荷兰郁金香球根价格疯狂上涨后六周内暴跌95%。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "econ-age-of-exploration",
      "great-depression"
    ],
    "important": false,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-shunzhi",
    "title": "顺治皇帝（福临）",
    "year": 1638,
    "yearDisplay": "公元1638年—公元1661年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "清朝入关后第一位皇帝，皇太极第九子，六岁即位，多尔衮摄政，亲政后整顿吏治推行汉化。",
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "person-huangtaiji",
      "person-kangxi"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "british-revolution",
    "title": "英国资产阶级革命",
    "year": 1640,
    "yearDisplay": "公元1640年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英国议会与国王的内战爆发，近代民主政治的开端。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "magna-carta",
      "glorious-revolution"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "newton",
    "title": "牛顿",
    "year": 1643,
    "yearDisplay": "公元1643年—公元1727年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 52.8,
      "lng": -0.6
    },
    "summary": "人类历史上最伟大的科学家之一，经典力学的创立者，微积分发明者。",
    "description": "",
    "disputed": "牛顿与苹果落地的故事是后世广为流传的传说，其万有引力理论的建立是长期科学研究的结果，苹果故事更多具象征意义。",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "galileo",
      "copernicus",
      "enlightenment",
      "industrial-revolution",
      "einstein"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-newton",
    "title": "艾萨克·牛顿",
    "year": 1643,
    "yearDisplay": "公元1643年—公元1727年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 52.8,
      "lng": -0.6
    },
    "summary": "英国物理学家、数学家、天文学家，经典力学奠基人，人类历史上最伟大的科学家之一。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "person-galileo",
      "sci-scientific-revolution",
      "person-einstein",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "westphalia-peace",
    "title": "三十年战争与威斯特伐利亚和约",
    "year": 1648,
    "yearDisplay": "公元1648年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 51.9,
      "lng": 7.6
    },
    "summary": "1618-1648年的三十年战争几乎把欧洲所有国家都卷了进来，德意志人口减少三分之一。威斯特伐利亚和约确立了主权国家原则，是现代国际关系体系的起点。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "reformation",
      "dutch-revolt",
      "thirty-years-war",
      "enlightenment"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "landmark-taj-mahal",
    "title": "泰姬陵",
    "year": 1653,
    "yearDisplay": "公元1632年—1653年建造",
    "civilization": "southAsia",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "artifact",
    "location": {
      "lat": 27.17,
      "lng": 78.04
    },
    "summary": "印度莫卧儿帝国白色大理石陵墓，世界新七大奇迹之一，永恒面颊上的一滴眼泪。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "mughal-empire",
      "ottoman-empire",
      "econ-silk-road"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "thinker-late-ming-three",
    "title": "明末三大思想家",
    "year": 1660,
    "yearDisplay": "明末清初",
    "civilization": "china",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 30,
      "lng": 120
    },
    "summary": "黄宗羲《明夷待访录》批判君主专制，顾炎武\"天下兴亡匹夫有责\"经世致用，王夫之唯物思想，中国早期启蒙先声。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "wang-yangming",
      "ming-dynasty",
      "qing-dynasty",
      "person-wanganshi"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "peter-great",
    "title": "彼得大帝",
    "year": 1672,
    "yearDisplay": "公元1672年—公元1725年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "earlyModern",
    "location": {
      "lat": 59.9,
      "lng": 30.3
    },
    "summary": "俄国罗曼诺夫王朝最伟大的沙皇，俄罗斯帝国的缔造者，\"俄罗斯之父\"。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "renaissance",
      "enlightenment",
      "columbus",
      "russian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-yongzheng",
    "title": "雍正皇帝（胤禛）",
    "year": 1678,
    "yearDisplay": "公元1678年—公元1735年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "清朝第五位皇帝，康熙第四子，铁腕改革：摊丁入亩、火耗归公、军机处、改土归流。",
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "person-kangxi",
      "event-kangqian",
      "event-yongzheng-reform"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "person-kangxi",
    "title": "康熙·玄烨",
    "year": 1685,
    "yearDisplay": "公元1654年—公元1722年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "清朝入关后第二位皇帝，在位61年，中国历史上在位时间最长的皇帝，开创康乾盛世。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "event-kangqian",
      "qing-dynasty",
      "event-opium-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "glorious-revolution",
    "title": "光荣革命与权利法案",
    "year": 1688,
    "yearDisplay": "公元1688年光荣革命，1689年颁布《权利法案》",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英国光荣革命后颁布《权利法案》，君主立宪制正式确立。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "british-revolution",
      "magna-carta"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "glorious-revolution-britain",
    "title": "英国光荣革命",
    "year": 1688,
    "yearDisplay": "公元1688年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "1688年英国不流血推翻信奉天主教的詹姆斯二世，迎立威廉与玛丽，次年《权利法案》确立议会主权和君主立宪，洛克思想成为现实政治制度。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "reformation",
      "enlightenment",
      "british-revolution",
      "french-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "peter-the-great-reform",
    "title": "彼得大帝西化改革",
    "year": 1689,
    "yearDisplay": "公元1689年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 59.9,
      "lng": 30.3
    },
    "summary": "彼得大帝通过微服游历西欧、剪胡须改服装、建圣彼得堡、创建海军、打赢北方战争等手段，推动俄国全面西化，跻身欧洲列强。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "war-seven-years",
      "napoleon",
      "woman-catherine-great",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "person-montesquieu",
    "title": "孟德斯鸠",
    "year": 1689,
    "yearDisplay": "公元1689年—公元1755年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 44.8,
      "lng": -0.5
    },
    "summary": "法国启蒙思想家，《论法的精神》，提出三权分立学说，影响美国宪法与现代宪政。",
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "enlightenment",
      "american-independence"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-voltaire",
    "title": "伏尔泰",
    "year": 1694,
    "yearDisplay": "公元1694年—公元1778年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 48.8,
      "lng": 2.3
    },
    "summary": "法国启蒙运动领袖，哲学家、文学家，提倡自由平等、宗教宽容，\"法兰西思想之父\"。",
    "important": true,
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "enlightenment",
      "french-revolution",
      "person-rousseau",
      "woman-catherine-great",
      "thinker-adam-smith"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "sultanate-of-zanzibar",
    "title": "桑给巴尔苏丹国",
    "year": 1698,
    "yearDisplay": "公元1698年—公元1964年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": -6.17,
      "lng": 39.2
    },
    "summary": "以桑给巴尔岛为中心的印度洋岛国，赛义德大帝时期迁都于此，成为东非奴隶贸易与香料贸易中心。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "africa-swahili-city-states",
      "kilwa-sultanate",
      "africa-zanzibar-slave-trade"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "turkmen-tekke",
    "title": "土库曼帖克部落",
    "year": 1700,
    "yearDisplay": "约公元1700年—公元1881年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 38,
      "lng": 58
    },
    "summary": "土库曼最强大的部落联盟，以骑兵和地毯编织闻名，长期保持独立，盖奥克泰佩战役后被俄国征服。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "khiva-khanate",
      "bukhara-khanate",
      "kazakh-khanate"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "ashanti-empire",
    "title": "阿散蒂帝国",
    "year": 1701,
    "yearDisplay": "公元1701年—公元1902年",
    "civilization": "africa",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 6.7,
      "lng": -1.62
    },
    "summary": "西非阿坎人建立的强大帝国，以金凳子为国家象征，凭借黄金贸易和军事组织与英国殖民军对抗近百年。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "mali-empire",
      "songhai-empire",
      "africa-benin-bronze"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "aurangzeb-decline",
    "title": "奥朗则布与莫卧儿衰落",
    "year": 1707,
    "yearDisplay": "公元1618年—公元1707年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 28.6,
      "lng": 77.2
    },
    "summary": "莫卧儿皇帝奥朗则布疆域达到顶峰，但宗教高压政策、27年德干战争耗尽国力，死后帝国迅速分裂瓦解，为英国殖民铺平道路。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "mughal-empire",
      "akbar-religious-synthesis",
      "british-empire",
      "delhi-sultanate"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "kokand-khanate",
    "title": "浩罕汗国",
    "year": 1709,
    "yearDisplay": "公元1709年—公元1876年",
    "civilization": "centralAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "earlyModern",
    "type": "dynasty",
    "location": {
      "lat": 40.53,
      "lng": 70.95
    },
    "summary": "费尔干纳盆地的中亚汗国，以商业和手工业发达著称，与中国新疆联系密切，曾多次侵入南疆。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "bukhara-khanate",
      "khiva-khanate",
      "qarakhanid-khanate",
      "dayuan-kingdom"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "person-rousseau",
    "title": "卢梭",
    "year": 1712,
    "yearDisplay": "公元1712年—公元1778年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 46.2,
      "lng": 6.1
    },
    "summary": "法国启蒙思想家，\"主权在民\"，《社会契约论》《爱弥儿》，影响法国大革命与浪漫主义。",
    "important": true,
    "description": "",
    "imageEra": "early-modern",
    "relatedNodeIds": [
      "enlightenment",
      "french-revolution",
      "person-voltaire",
      "thinker-adam-smith",
      "woman-catherine-great"
    ],
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "enlightenment",
    "title": "启蒙运动",
    "year": 1720,
    "yearDisplay": "18世纪",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "伏尔泰、卢梭、孟德斯鸠等思想家高举理性旗帜，启蒙运动进入高潮。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "newton",
      "french-revolution",
      "american-independence",
      "sci-scientific-revolution",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "economy-south-sea-bubble",
    "title": "南海泡沫与密西西比泡沫",
    "year": 1720,
    "yearDisplay": "公元1720年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 49,
      "lng": 2
    },
    "summary": "英法几乎同时爆发早期股市超级泡沫，牛顿亏损感叹\"算得清天体运行，算不清人心的疯狂\"，催生泡沫法与监管。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "economy-dutch-finance",
      "newton",
      "great-depression",
      "economy-2008-crisis"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "russian-empire",
    "title": "俄罗斯帝国",
    "year": 1721,
    "yearDisplay": "公元1721年—公元1917年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "industrial",
    "type": "dynasty",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "彼得大帝建立的俄罗斯帝国，从东欧小国扩张为横跨欧亚的超级大国，1917年二月革命后终结。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "person-napoleon",
      "ottoman-empire",
      "holy-roman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "event-yongzheng-reform",
    "title": "雍正改革",
    "year": 1723,
    "yearDisplay": "公元1723年—公元1735年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "摊丁入亩（废人头税并入地银，促人口爆炸）、火耗归公养廉银、改土归流、密折制度，康乾盛世的关键连接点。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "qing-dynasty",
      "event-kangqian",
      "event-gaitu-guiliu",
      "institution-eight-banners"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "thinker-adam-smith",
    "title": "亚当·斯密",
    "year": 1723,
    "yearDisplay": "公元1723年—公元1790年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 56,
      "lng": -3.4
    },
    "summary": "《国富论》\"看不见的手\"、分工与自由市场理论，古典经济学之父，另著《道德情操论》。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "person-rousseau",
      "person-voltaire",
      "industrial-revolution",
      "great-depression"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "event-gaitu-guiliu",
    "title": "改土归流",
    "year": 1726,
    "yearDisplay": "明清",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 26.6,
      "lng": 106.6
    },
    "summary": "明清在西南废除世袭土司改派流官，雍正时鄂尔泰大规模推行，加强边疆治理，巩固统一多民族国家。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "qing-dynasty",
      "event-yongzheng-reform",
      "event-kangqian",
      "ming-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "woman-catherine-great",
    "title": "凯瑟琳大帝",
    "year": 1729,
    "yearDisplay": "公元1729年—公元1796年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 59.9,
      "lng": 30.3
    },
    "summary": "叶卡捷琳娜二世，德意志出身的俄国女皇，\"开明专制\"代表，扩张疆域至黑海与波兰，俄国成为欧洲列强，与伏尔泰通信。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "person-voltaire",
      "person-rousseau",
      "french-revolution",
      "napoleon"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-washington",
    "title": "乔治·华盛顿",
    "year": 1732,
    "yearDisplay": "公元1732年—公元1799年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 38.8,
      "lng": -77
    },
    "summary": "美国国父，第一任总统，独立战争大陆军总司令，主动交权开创民主先例。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "person-lincoln",
      "french-revolution",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "frederick-great",
    "title": "腓特烈大帝",
    "year": 1740,
    "yearDisplay": "公元1740年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 52.4,
      "lng": 13.1
    },
    "summary": "腓特烈二世是普鲁士崛起的关键人物，开明专制典范、军事天才（罗斯巴赫战役以少胜多）、伏尔泰之友，普鲁士军事国家在此成型。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "seven-years-war-global",
      "peter-the-great-reform",
      "person-bismarck",
      "napoleon"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "event-kangqian",
    "title": "康乾盛世",
    "year": 1750,
    "yearDisplay": "公元1661年—公元1796年",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "康熙雍正乾隆三朝约130余年的盛世，中国封建社会最后一个盛世，奠定现代中国版图基础。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "person-kangxi",
      "event-opium-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "enlightenment-encyclopedie",
    "title": "启蒙运动与百科全书派",
    "year": 1751,
    "yearDisplay": "公元1751年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "狄德罗、达朗贝尔主编的《百科全书》汇集理性知识于一体，孟德斯鸠三权分立、卢梭社会契约等思想广泛传播，为美国独立和法国大革命提供了思想武器。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "enlightenment",
      "sci-scientific-revolution",
      "french-revolution",
      "american-independence"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "war-seven-years",
    "title": "七年战争",
    "year": 1756,
    "yearDisplay": "公元1756年—公元1763年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "event",
    "location": {
      "lat": 51.1,
      "lng": 13.3
    },
    "summary": "人类历史上第一次\"世界大战\"，英普对阵法奥俄，战场遍及全球，英国成为日不落帝国。",
    "description": "",
    "imageEra": "renaissance",
    "relatedNodeIds": [
      "war-napoleonic",
      "war-american-civil",
      "british-empire",
      "person-newton"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "musician-mozart",
    "title": "莫扎特",
    "year": 1756,
    "yearDisplay": "公元1756年—公元1791年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 47.8,
      "lng": 13
    },
    "summary": "音乐神童，古典主义巅峰，歌剧（费加罗的婚礼/魔笛）、41部交响曲、安魂曲，35岁早逝的永恒天才。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "musician-beethoven",
      "napoleon",
      "industrial-revolution",
      "musician-mozart"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "seven-years-war-global",
    "title": "七年战争——第一次世界性战争",
    "year": 1756,
    "yearDisplay": "公元1756年",
    "civilization": "global",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "七年战争遍及欧洲、北美、印度、海上，堪称\"第一次世界性战争\"。英国夺取加拿大和印度，奠定\"大英第一帝国\"基础；普鲁士腓特烈大帝一战成名。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "napoleon",
      "american-independence",
      "war-seven-years",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "kamehameha-i",
    "title": "卡米哈米哈大帝",
    "year": 1758,
    "yearDisplay": "约公元1758年—公元1819年",
    "civilization": "oceania",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 19.8,
      "lng": -155.5
    },
    "summary": "夏威夷统一者，第一位夏威夷国王，结束了群岛的长期战乱，被誉为\"太平洋的拿破仑\"。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "hawaii-kingdom",
      "polynesian-expansion"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "woman-mary-wollstonecraft",
    "title": "玛丽·沃斯通克拉夫特",
    "year": 1759,
    "yearDisplay": "公元1759年—公元1797年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "《女权辩护》作者，系统论证女性平等教育与权利，现代女权主义的奠基人和思想先驱。",
    "description": "",
    "imageEra": "exploration",
    "relatedNodeIds": [
      "person-rousseau",
      "french-revolution",
      "woman-rosa-parks",
      "woman-mary-wollstonecraft"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "econ-industrial-revolution",
    "title": "工业革命",
    "year": 1760,
    "yearDisplay": "公元1760年—公元1840年（第一次）",
    "civilization": "europe",
    "categories": [
      "science",
      "politics"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": 53.5,
      "lng": -2.2
    },
    "summary": "从手工到机器，从农业到工业，人类文明最深刻的变革之一，蒸汽机的时代。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "enlightenment",
      "french-revolution",
      "person-newton",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "first-industrial-revolution-detail",
    "title": "第一次工业革命深度",
    "year": 1760,
    "yearDisplay": "公元1760年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 53.5,
      "lng": -2.2
    },
    "summary": "从珍妮纺纱机到瓦特蒸汽机再到史蒂芬森火箭号铁路，第一次工业革命使英国成为\"世界工厂\"，工厂制度与城市化重塑了人类的生产生活方式。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "second-industrial-revolution",
      "napoleon",
      "french-revolution",
      "communist-manifesto"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "industrial-revolution",
    "title": "瓦特改良蒸汽机",
    "year": 1769,
    "yearDisplay": "公元1769年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 52.5,
      "lng": -2
    },
    "summary": "瓦特改良蒸汽机投入使用，工业革命正式开始，人类进入蒸汽时代。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "newton",
      "first-industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "person-napoleon",
    "title": "拿破仑·波拿巴",
    "year": 1769,
    "yearDisplay": "公元1769年—公元1821年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "earlyModern",
    "type": "person",
    "location": {
      "lat": 41.9,
      "lng": 8.7
    },
    "summary": "法兰西第一帝国皇帝，近代最伟大的军事家和立法者之一，颁布拿破仑法典奠定大陆法系基石。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "holy-roman-empire",
      "british-empire",
      "russian-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "musician-beethoven",
    "title": "贝多芬",
    "year": 1770,
    "yearDisplay": "公元1770年—公元1827年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 50.7,
      "lng": 7.1
    },
    "summary": "乐圣，九部交响曲（英雄/命运/田园/欢乐颂），失聪后创作出巅峰作品，承古典主义之结、启浪漫主义之先。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "musician-mozart",
      "napoleon",
      "industrial-revolution",
      "person-rousseau"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "american-independence",
    "title": "美国独立宣言",
    "year": 1776,
    "yearDisplay": "公元1776年",
    "civilization": "america",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 38.9,
      "lng": -77
    },
    "summary": "《独立宣言》发表，美国诞生，启蒙思想的第一次伟大实践。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "enlightenment",
      "french-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-others"
  },
  {
    "id": "event-great-divergence",
    "title": "18世纪东西大分流",
    "year": 1780,
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 50,
      "lng": 0
    },
    "civilization": "global",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1780年",
    "summary": "同一时期，中国走向康乾盛世传统顶峰，欧洲经历启蒙运动与工...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-kangqian",
      "enlightenment",
      "econ-industrial-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "artifact-siku-quanshu",
    "title": "《四库全书》",
    "year": 1782,
    "yearDisplay": "1782年成书",
    "civilization": "china",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "纪昀主持，经史子集四部分类，收书3461种7.9万卷，古代最大丛书，\"寓修于禁毁\"也造成大量典籍失传。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "event-kangqian",
      "event-gaitu-guiliu",
      "artifact-yongle-dadian",
      "artifact-four-great-novels"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "person-linxun",
    "title": "林则徐",
    "year": 1785,
    "yearDisplay": "公元1785年—公元1850年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 26.1,
      "lng": 119.3
    },
    "summary": "清代政治家、民族英雄，虎门销烟主持者，\"开眼看世界第一人\"。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "event-opium-war",
      "qing-dynasty",
      "sun-yat-sen"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "french-revolution",
    "title": "法国大革命",
    "year": 1789,
    "yearDisplay": "公元1789年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "earlyModern",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "巴黎人民攻占巴士底狱，法国大革命爆发，震撼整个欧洲。",
    "description": "",
    "imageEra": "earlyModern",
    "relatedNodeIds": [
      "enlightenment",
      "napoleon",
      "american-independence"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "earlyModern-europe"
  },
  {
    "id": "europe-may-3-constitution",
    "title": "五三宪法",
    "year": 1791,
    "yearDisplay": "公元1791年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": 52.2,
      "lng": 21
    },
    "summary": "1791年5月3日波兰立陶宛联邦通过欧洲第一部、世界第二部成文宪法，改革贵族民主弊端，遭俄罗斯干涉后引发第三次瓜分。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "europe-polish-lithuania",
      "europe-teutonic-order"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "scientist-faraday",
    "title": "法拉第",
    "year": 1791,
    "yearDisplay": "公元1791年—公元1867年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "电磁感应（1831）、电动机与发电机原理、\"场\"概念的提出，学徒出身的实验天才，电气时代奠基人。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "scientist-tesla",
      "newton",
      "industrial-revolution",
      "scientist-faraday"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "artifact-four-great-novels",
    "title": "四大名著成书",
    "year": 1791,
    "yearDisplay": "明清",
    "civilization": "china",
    "categories": [
      "culture",
      "artifact"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 35,
      "lng": 110
    },
    "summary": "三国/水浒/西游/红楼，中国古典章回小说的巅峰，明代市民文学的繁荣，清代发展到艺术顶峰。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "event-kangqian",
      "artifact-siku-quanshu",
      "event-yongzheng-reform"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "haitian-revolution",
    "title": "海地革命",
    "year": 1791,
    "yearDisplay": "公元1791年",
    "civilization": "america",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 18.9,
      "lng": -72.3
    },
    "summary": "杜桑·卢维杜尔领导黑奴起义，击败法国、西班牙、英国三国军队，1804年建立世界上第一个黑人共和国——震撼了整个大西洋的奴隶制体系。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "french-revolution",
      "napoleon",
      "latin-american-independence",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "hawaii-kingdom",
    "title": "夏威夷王国",
    "year": 1795,
    "yearDisplay": "公元1795年—公元1893年",
    "civilization": "oceania",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "industrial",
    "type": "dynasty",
    "location": {
      "lat": 21.3,
      "lng": -157.8
    },
    "summary": "卡米哈米哈大帝统一夏威夷群岛后建立的独立王国，是波利尼西亚第一个现代化国家，后被美国吞并。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "kamehameha-i",
      "polynesian-expansion",
      "easter-island-rapanui"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "sci-vaccines",
    "title": "疫苗与现代医学",
    "year": 1796,
    "yearDisplay": "公元1796年—公元1980年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": 51.5,
      "lng": -2.4
    },
    "summary": "从琴纳牛痘疫苗到消灭天花，现代医学战胜传染病，是人类最伟大的科学成就之一。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "sci-scientific-revolution",
      "econ-industrial-revolution",
      "sci-dna",
      "black-death"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "idea-romanticism",
    "title": "浪漫主义",
    "year": 1800,
    "yearDisplay": "18世纪末—19世纪中",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "对理性与工业的反叛，情感、自然、想象力与个人的时代，贝多芬与歌德。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "enlightenment",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "africa-zanzibar-slave-trade",
    "title": "桑给巴尔与东非奴隶贸易",
    "year": 1800,
    "yearDisplay": "18—19世纪",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": -6.2,
      "lng": 39.2
    },
    "summary": "阿曼苏丹赛义德迁都桑给巴尔，丁香种植园和象牙奴隶贸易达到顶峰，1873年禁奴条约后逐渐废除。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "africa-swahili-city-states",
      "africa-adwa",
      "age-of-exploration",
      "industrial-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "war-napoleonic",
    "title": "拿破仑战争",
    "year": 1803,
    "yearDisplay": "公元1803年—公元1815年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "拿破仑·波拿巴横扫欧洲的战争，从土伦到滑铁卢，改写了整个欧洲的版图。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "french-revolution",
      "industrial-revolution",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "napoleon",
    "title": "拿破仑称帝与拿破仑法典",
    "year": 1804,
    "yearDisplay": "公元1804年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "拿破仑加冕为皇帝，颁布《拿破仑法典》，重塑欧洲秩序。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "french-revolution",
      "waterloo"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "latin-american-independence",
    "title": "拉丁美洲独立运动",
    "year": 1808,
    "yearDisplay": "公元1808年",
    "civilization": "america",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 10.5,
      "lng": -66.9
    },
    "summary": "玻利瓦尔解放南美五国、圣马丁翻越安第斯山，趁拿破仑入侵西班牙之机，西属美洲殖民地纷纷独立，伊比利亚殖民体系在美洲瓦解。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "napoleon",
      "haitian-revolution",
      "american-independence",
      "french-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "darwin",
    "title": "达尔文",
    "year": 1809,
    "yearDisplay": "公元1809年—公元1882年",
    "civilization": "europe",
    "categories": [
      "science",
      "culture"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 52.7,
      "lng": -2.8
    },
    "summary": "英国博物学家，生物进化论的奠基人，改变了人类对生命的认知。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "newton",
      "copernicus",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "lincoln",
    "title": "林肯",
    "year": 1809,
    "yearDisplay": "公元1809年—公元1865年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 37.6,
      "lng": -85.6
    },
    "summary": "美国第16任总统，废除奴隶制、维护国家统一的伟大政治家。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "industrial-revolution",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "person-darwin",
    "title": "查尔斯·达尔文",
    "year": 1809,
    "yearDisplay": "公元1809年—公元1882年",
    "civilization": "europe",
    "categories": [
      "science",
      "culture"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 52.7,
      "lng": -2.7
    },
    "summary": "英国博物学家、生物学家，进化论的奠基人，《物种起源》作者。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "person-newton",
      "industrial-revolution",
      "person-einstein",
      "age-of-exploration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "person-lincoln",
    "title": "亚伯拉罕·林肯",
    "year": 1809,
    "yearDisplay": "公元1809年—公元1865年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 39.8,
      "lng": -89.6
    },
    "summary": "美国第16任总统，领导南北战争、废除奴隶制、维护国家统一。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "industrial-revolution",
      "war-american-civil",
      "person-churchill",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "waterloo",
    "title": "滑铁卢战役",
    "year": 1815,
    "yearDisplay": "公元1815年",
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 50.7,
      "lng": 4.4
    },
    "summary": "拿破仑在滑铁卢战败，拿破仑帝国终结，维也纳体系建立。",
    "important": true,
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "napoleon",
      "first-industrial-revolution",
      "war-napoleonic",
      "person-napoleon",
      "world-war-1"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "person-bismarck",
    "title": "奥托·冯·俾斯麦",
    "year": 1815,
    "yearDisplay": "公元1815年—公元1898年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 52.5,
      "lng": 13.4
    },
    "summary": "普鲁士首相、德意志帝国第一任宰相，\"铁血宰相\"，德国统一的缔造者。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "german-unification",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "wellington-waterloo",
    "title": "威灵顿与滑铁卢战役",
    "year": 1815,
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 50.7,
      "lng": 4.4
    },
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "description": "",
    "yearDisplay": "公元1815年",
    "summary": "威灵顿公爵率反法联军在滑铁卢击败拿破仑，拿破仑战争终结，...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-napoleon",
      "war-napoleonic",
      "french-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "mfecane-wars",
    "title": "姆法肯（祖鲁大扩张）",
    "year": 1815,
    "yearDisplay": "约公元1815年—公元1840年",
    "civilization": "africa",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": -28,
      "lng": 30
    },
    "summary": "南部非洲因祖鲁崛起引发的大规模战争与人口迁徙，改变了整个南部非洲的民族分布和政治格局。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "zulu-kingdom",
      "africa-shaka-zulu",
      "africa-great-zimbabwe"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "africa-shaka-zulu",
    "title": "恰卡与祖鲁王国崛起",
    "year": 1816,
    "yearDisplay": "公元1816年—公元1828年",
    "civilization": "africa",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": -28.5,
      "lng": 31.5
    },
    "summary": "祖鲁首领恰卡进行军事改革（短矛方阵、同龄兵团），统一恩古尼人，建立强大的祖鲁王国，引发姆法肯大迁徙。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "africa-adwa",
      "industrial-revolution",
      "africa-great-zimbabwe"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "economy-gold-standard",
    "title": "金本位体系确立",
    "year": 1816,
    "yearDisplay": "公元1816年—公元1914年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英国率先实行金本位，世界各国跟进，英镑为中心货币，固定汇率体系推动了第一次经济全球化浪潮。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "econ-bretton-woods",
      "great-depression",
      "economy-nixon-shock",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "env-1816-year-without-summer",
    "title": "1816无夏之年",
    "year": 1816,
    "yearDisplay": "公元1816年",
    "civilization": "global",
    "categories": [
      "culture"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": -8.3,
      "lng": 118
    },
    "summary": "1815年坦博拉火山爆发火山灰遮蔽全球，1816年全球异常低温、歉收饥荒，催生自行车发明与《弗兰肯斯坦》等文化产物。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "env-little-ice-age",
      "industrial-revolution",
      "great-depression",
      "napoleon"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "zulu-kingdom",
    "title": "祖鲁王国",
    "year": 1816,
    "yearDisplay": "公元1816年—公元1879年",
    "civilization": "africa",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "industrial",
    "type": "dynasty",
    "location": {
      "lat": -28.5,
      "lng": 31.5
    },
    "summary": "恰卡建立的南部非洲军事强国，通过军事改革建立强大军队，在伊桑德尔瓦纳战役中大败英军，是非洲抵抗殖民的典范。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "africa-shaka-zulu",
      "mfecane-wars",
      "anglo-boer-war",
      "africa-adwa"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "person-marx",
    "title": "卡尔·马克思",
    "year": 1818,
    "yearDisplay": "公元1818年—公元1883年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 49.8,
      "lng": 6.6
    },
    "summary": "德国哲学家、经济学家、革命家，马克思主义创始人，《资本论》作者。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "industrial-revolution",
      "october-revolution",
      "person-einstein",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "woman-florence-nightingale",
    "title": "南丁格尔",
    "year": 1820,
    "yearDisplay": "公元1820年—公元1910年",
    "civilization": "europe",
    "categories": [
      "science",
      "military"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "护理学之母，克里米亚战争\"提灯女神\"，通过改善卫生条件使战地死亡率骤降，创办世界第一所护士学校，统计图表先驱。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "scientist-pasteur",
      "industrial-revolution",
      "woman-rosa-parks",
      "woman-mary-wollstonecraft"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "person-engels",
    "title": "弗里德里希·恩格斯",
    "year": 1820,
    "yearDisplay": "公元1820年—公元1895年",
    "civilization": "europe",
    "categories": [
      "culture"
    ],
    "eraId": "modern",
    "type": "person",
    "location": {
      "lat": 51.2,
      "lng": 6.8
    },
    "summary": "德国思想家，马克思主义创始人之一，马克思挚友与合作者，合著《共产党宣言》《资本论》。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "person-marx",
      "october-revolution"
    ],
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "scientist-pasteur",
    "title": "巴斯德",
    "year": 1822,
    "yearDisplay": "公元1822年—公元1895年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "微生物学之父，巴氏消毒法、狂犬病和炭疽疫苗，生源论否定自然发生说，巴斯德研究所。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "scientist-faraday",
      "scientist-mendeleev",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "event-industrial-spread",
    "title": "工业革命向欧美扩散",
    "year": 1830,
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1830年",
    "summary": "工业革命从英国向比利时、法国、德国、美国扩散，欧美进入工...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "econ-industrial-revolution",
      "meiji-restoration",
      "french-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "scientist-mendeleev",
    "title": "门捷列夫",
    "year": 1834,
    "yearDisplay": "公元1834年—公元1907年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 59.9,
      "lng": 30.3
    },
    "summary": "1869年发现元素周期律，按原子量排列并预言未知元素，《化学原理》，现代化学的里程碑。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "scientist-faraday",
      "scientist-mendeleev",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "opium-war",
    "title": "鸦片战争与虎门销烟",
    "year": 1839,
    "yearDisplay": "公元1839年（虎门销烟），1840年战争爆发",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 22.3,
      "lng": 113.6
    },
    "summary": "鸦片战争爆发，中国近代史的开端，百年屈辱的开始。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "qing-dynasty",
      "sino-japanese-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "first-industrial-revolution",
    "title": "第一次工业革命完成",
    "year": 1840,
    "yearDisplay": "约公元1840年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 53.5,
      "lng": -2.2
    },
    "summary": "英国率先完成工业革命，成为\"世界工厂\"。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "industrial-revolution",
      "second-industrial-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "event-opium-war",
    "title": "鸦片战争",
    "year": 1840,
    "yearDisplay": "公元1840年—公元1842年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 22.5,
      "lng": 113.9
    },
    "summary": "英国对中国发动的侵略战争，中国近代史的开端，《南京条约》是第一个不平等条约。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "event-kangqian",
      "qing-dynasty",
      "person-linxun"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "treaty-of-waitangi",
    "title": "怀唐伊条约",
    "year": 1840,
    "yearDisplay": "公元1840年",
    "civilization": "oceania",
    "categories": [
      "politics"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": -35.27,
      "lng": 174.08
    },
    "summary": "英国王室与毛利部落首领签署的建国条约，是新西兰的建国基础，也是当代毛利权利运动的核心依据。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "america-maori-aotearoa",
      "haka-tradition"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "communist-manifesto",
    "title": "《共产党宣言》发表",
    "year": 1848,
    "yearDisplay": "公元1848年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "马克思恩格斯发表《共产党宣言》，社会主义从空想变为科学。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "first-industrial-revolution",
      "october-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "revolutions-1848",
    "title": "1848年革命年",
    "year": 1848,
    "yearDisplay": "公元1848年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "1848年欧洲多国爆发自由与民族革命，从巴黎到维也纳、从柏林到罗马，革命浪潮席卷大陆。《共产党宣言》也发表于这一年，虽多失败，却推动了统一与改革。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "french-revolution",
      "napoleon",
      "communist-manifesto",
      "industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "crimean-war",
    "title": "克里米亚战争",
    "year": 1853,
    "yearDisplay": "公元1853年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 44.4,
      "lng": 34.1
    },
    "summary": "英法奥斯曼联合对抗俄国的克里米亚战争，催生了南丁格尔护理制度、战地报道与电报，俄国战败推动农奴制改革，维也纳体系彻底动摇。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "napoleon",
      "industrial-revolution",
      "peter-the-great-reform",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "env-yellow-river-flood",
    "title": "黄河改道与王朝兴衰",
    "year": 1855,
    "yearDisplay": "历史六次大改道",
    "civilization": "china",
    "categories": [
      "culture"
    ],
    "eraId": "medieval",
    "type": "event",
    "location": {
      "lat": 35,
      "lng": 115
    },
    "summary": "黄河历史上六次大改道，1855年铜瓦厢改道北流夺大清河入海，黄泛区与捻军太平天国呼应，河运治理影响国运。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ming-dynasty",
      "qing-dynasty",
      "event-opium-war",
      "french-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-china-b-y"
  },
  {
    "id": "scientist-tesla",
    "title": "尼古拉·特斯拉",
    "year": 1856,
    "yearDisplay": "公元1856年—公元1943年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "modern",
    "type": "person",
    "location": {
      "lat": 44.8,
      "lng": 20.5
    },
    "summary": "交流电系统、感应电机、特斯拉线圈，与爱迪生\"电流战争\"中交流胜直流，无线输电的先驱设想。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "scientist-faraday",
      "industrial-revolution",
      "scientist-turing",
      "scientist-tesla"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "mod-second-opium-war",
    "title": "第二次鸦片战争与火烧圆明园",
    "year": 1860,
    "yearDisplay": "公元1856年—公元1860年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "英法联军发动战争，1860年火烧圆明园，签订《天津条约》《北京条约》，沙俄割占北方150万平方公里领土。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "opium-war",
      "mod-west-movement",
      "event-opium-war",
      "qing-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "war-american-civil",
    "title": "美国南北战争",
    "year": 1861,
    "yearDisplay": "公元1861年—公元1865年",
    "civilization": "america",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 38.9,
      "lng": -77
    },
    "summary": "美国历史上最惨烈的战争，林肯废除奴隶制，维护国家统一，60万人丧生。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "person-lincoln",
      "industrial-revolution",
      "lincoln",
      "american-independence",
      "second-industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "war-us-civil-war",
    "title": "美国内战",
    "year": 1861,
    "yearDisplay": "公元1861年—公元1865年",
    "civilization": "america",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": 38.8,
      "lng": -77
    },
    "summary": "美国南北战争，工业时代第一场总体战，林肯解放黑奴，维护国家统一，约75万人死亡。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "person-lincoln",
      "war-seven-years",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "mod-west-movement",
    "title": "洋务运动",
    "year": 1861,
    "yearDisplay": "公元1861年—公元1895年",
    "civilization": "china",
    "categories": [
      "politics",
      "science"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 31.2,
      "lng": 121.5
    },
    "summary": "\"中体西用\"自强求富，军事工业（江南制造总局、福州船政局）、民用工业（轮船招商局）、北洋水师、留美幼童，甲午战败标志破产。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mod-second-opium-war",
      "mod-jiawu-war",
      "opium-war",
      "qing-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "italian-unification",
    "title": "意大利统一（复兴运动）",
    "year": 1861,
    "yearDisplay": "公元1861年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "加富尔的外交手腕、加里波第红衫军远征两西西里、马志尼的青年意大利运动三者合力，1861年意大利王国成立，1871年收复罗马完成统一。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "revolutions-1848",
      "napoleon",
      "person-bismarck",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "event-china-modern-industry",
    "title": "中国近代工业化",
    "year": 1861,
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 31.2,
      "lng": 121.5
    },
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1861年",
    "summary": "洋务运动开启中国近代工业化进程，从军事工业到民用企业，在...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "mod-west-movement",
      "meiji-restoration",
      "event-industrial-spread"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "event-maxwell-electromagnetism",
    "title": "麦克斯韦电磁理论",
    "year": 1865,
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 55.9,
      "lng": -3.2
    },
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "description": "",
    "yearDisplay": "公元1865年",
    "summary": "麦克斯韦建立电磁场方程组，统一电与磁，预言电磁波存在，为...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "scientist-faraday",
      "einstein",
      "second-industrial-revolution-detail"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "event-grant-civil-war",
    "title": "格兰特与南北战争",
    "year": 1865,
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 38.9,
      "lng": -77
    },
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "description": "",
    "yearDisplay": "公元1865年",
    "summary": "格兰特将军率北方联邦军击败南方邦联，林肯总统签署《解放黑...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "lincoln",
      "american-independence",
      "person-napoleon"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "sun-yat-sen",
    "title": "孙中山",
    "year": 1866,
    "yearDisplay": "公元1866年—公元1925年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 22.5,
      "lng": 113.4
    },
    "summary": "中华民国国父，中国民主革命的伟大先驱，三民主义的创立者。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "xinhai-revolution",
      "qing-dynasty",
      "sino-japanese-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "person-curie",
    "title": "居里夫人",
    "year": 1867,
    "yearDisplay": "公元1867年—公元1934年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "modern",
    "type": "person",
    "location": {
      "lat": 52.2,
      "lng": 21
    },
    "summary": "波兰裔法国物理学家、化学家，放射性研究先驱，第一位两获诺贝尔奖的人。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "person-einstein",
      "world-war-1",
      "sci-scientific-revolution",
      "person-newton"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "meiji-restoration",
    "title": "日本明治维新",
    "year": 1868,
    "yearDisplay": "公元1868年—公元1912年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "science",
      "military"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": 35.7,
      "lng": 139.7
    },
    "summary": "推翻幕府、全面西化的资产阶级改革，日本从封建国家迅速崛起为亚洲强国。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "sino-japanese-war",
      "war-russo-japanese",
      "qing-dynasty",
      "wang-yangming",
      "edo-period"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "meiji-restoration-detail",
    "title": "明治维新与日本近代化",
    "year": 1868,
    "yearDisplay": "公元1868年",
    "civilization": "eastAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 35.7,
      "lng": 139.7
    },
    "summary": "佩里黑船叩关后，倒幕派推翻德川幕府，明治政府推行\"废藩置县、殖产兴业、文明开化、富国强兵\"四大政策，成为亚洲第一个成功实现近代化的国家。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "meiji-restoration",
      "person-gandhi",
      "sci-scientific-revolution",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "person-gandhi",
    "title": "莫罕达斯·甘地",
    "year": 1869,
    "yearDisplay": "公元1869年—公元1948年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "modern",
    "type": "person",
    "location": {
      "lat": 21.6,
      "lng": 69.6
    },
    "summary": "印度国父，\"圣雄\"，非暴力不合作运动创始人，以和平手段争取民族独立。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mughal-empire",
      "british-empire",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "second-industrial-revolution-detail",
    "title": "第二次工业革命",
    "year": 1870,
    "yearDisplay": "公元1870年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 40.7,
      "lng": -74
    },
    "summary": "电力、内燃机、化工、钢铁、通信五大领域的突破开启了第二次工业革命，美国和德国领跑，垄断组织出现，人类从蒸汽时代进入电气时代。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "first-industrial-revolution-detail",
      "sci-scientific-revolution",
      "world-war-1",
      "information-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "german-unification",
    "title": "德意志统一与俾斯麦",
    "year": 1871,
    "yearDisplay": "公元1871年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 52.5,
      "lng": 13.4
    },
    "summary": "俾斯麦以\"铁血政策\"主导德意志统一，通过普丹、普奥、普法三次王朝战争，1871年威廉一世在凡尔赛宫加冕为德意志皇帝，彻底改变了欧洲均势。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "person-bismarck",
      "revolutions-1848",
      "napoleon",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "paris-commune-labor",
    "title": "工人运动与巴黎公社",
    "year": 1871,
    "yearDisplay": "公元1871年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "工业革命催生现代工人阶级，宪章运动、第一国际先后兴起。1871年巴黎公社72天的无产阶级政权尝试，留下深刻历史经验，《国际歌》在公社血泊中诞生。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "communist-manifesto",
      "october-revolution",
      "first-industrial-revolution-detail",
      "french-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "event-william-i-bismarck",
    "title": "威廉一世与俾斯麦统一德国",
    "year": 1871,
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 52.5,
      "lng": 13.4
    },
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1871年",
    "summary": "普鲁士国王威廉一世在俾斯麦\"铁血政策\"辅佐下，通过三次王...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "person-bismarck",
      "german-unification",
      "econ-industrial-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "churchill",
    "title": "丘吉尔",
    "year": 1874,
    "yearDisplay": "公元1874年—公元1965年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "person",
    "eraId": "modern",
    "location": {
      "lat": 51.3,
      "lng": 1
    },
    "summary": "英国首相，二战中领导英国抵抗纳粹的伟大领袖，20世纪最伟大的政治家之一。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "roosevelt",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "person-churchill",
    "title": "温斯顿·丘吉尔",
    "year": 1874,
    "yearDisplay": "公元1874年—公元1965年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "eraId": "modern",
    "type": "person",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "英国首相，二战期间领导英国抗击纳粹德国，20世纪最重要的政治家之一。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "roosevelt",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "second-industrial-revolution",
    "title": "爱迪生发明电灯与第二次工业革命",
    "year": 1879,
    "yearDisplay": "公元1879年",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 40.7,
      "lng": -74
    },
    "summary": "爱迪生发明实用电灯，电力革命开启，人类进入电气时代。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "wright-brothers",
      "first-industrial-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "einstein",
    "title": "爱因斯坦",
    "year": 1879,
    "yearDisplay": "公元1879年—公元1955年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "modern",
    "location": {
      "lat": 48.4,
      "lng": 9.9
    },
    "summary": "德裔美籍物理学家，相对论创立者，20世纪最伟大的科学家。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "newton",
      "galileo",
      "atomic-bomb",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "person-einstein",
    "title": "阿尔伯特·爱因斯坦",
    "year": 1879,
    "yearDisplay": "公元1879年—公元1955年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "industrial",
    "type": "person",
    "location": {
      "lat": 48.4,
      "lng": 10
    },
    "summary": "德裔美籍物理学家，相对论创立者，20世纪最伟大的科学家。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "person-newton",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "building-cologne-cathedral",
    "title": "科隆大教堂",
    "year": 1880,
    "yearDisplay": "公元1248年—公元1880年",
    "civilization": "europe",
    "categories": [
      "artifact",
      "culture"
    ],
    "eraId": "medieval",
    "type": "artifact",
    "location": {
      "lat": 50.94,
      "lng": 6.96
    },
    "summary": "世界第三高教堂，建造历时632年，哥特式建筑的集大成者，德国的精神象征。",
    "description": "",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "holy-roman-empire",
      "crusades"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "medieval-europe"
  },
  {
    "id": "roosevelt",
    "title": "富兰克林·罗斯福",
    "year": 1882,
    "yearDisplay": "公元1882年—公元1945年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "person",
    "eraId": "modern",
    "location": {
      "lat": 41.7,
      "lng": -73.9
    },
    "summary": "美国第32任总统，唯一连任四届，带领美国走出大萧条、赢得二战。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "great-depression",
      "world-war-2",
      "churchill",
      "cold-war",
      "world-war-2",
      "person-churchill"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "berlin-conference-africa",
    "title": "柏林会议与瓜分非洲",
    "year": 1884,
    "yearDisplay": "公元1884年",
    "civilization": "africa",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 52.5,
      "lng": 13.4
    },
    "summary": "俾斯麦主持的柏林会议按经纬线瓜分非洲，无视本土族群分布。\"阳光下的地盘\"口号下欧洲列强掀起殖民狂潮，非洲边界问题的种子延续至今。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "person-bismarck",
      "world-war-1",
      "second-industrial-revolution-detail",
      "revolutions-1848"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "mod-jiawu-war",
    "title": "甲午中日战争",
    "year": 1894,
    "yearDisplay": "公元1894年—公元1895年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 38.9,
      "lng": 121.6
    },
    "summary": "丰岛海战、黄海大东沟（邓世昌致远舰）、威海卫北洋水师覆没，《马关条约》割台湾赔2亿两，洋务运动破产。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mod-west-movement",
      "mod-wuxu-reform",
      "war-sino-japanese",
      "qing-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "sino-japanese-war",
    "title": "甲午战争",
    "year": 1895,
    "yearDisplay": "公元1895年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 39,
      "lng": 122
    },
    "summary": "中日甲午战争，清朝战败，《马关条约》签订，民族危机空前加深。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "opium-war",
      "meiji-restoration",
      "xinhai-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "africa-adwa",
    "title": "阿杜瓦战役",
    "year": 1896,
    "yearDisplay": "1896年3月2日",
    "civilization": "africa",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": 14.1,
      "lng": 38.7
    },
    "summary": "孟尼利克二世率埃塞俄比亚军队在阿杜瓦大败意大利殖民军，是非洲历史上唯一以武力击败欧洲殖民列强、保住独立的国家。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "aksum-empire",
      "africa-shaka-zulu",
      "africa-zanzibar-slave-trade",
      "ottoman-empire"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "mod-wuxu-reform",
    "title": "戊戌变法",
    "year": 1898,
    "yearDisplay": "1898年6月—9月",
    "civilization": "china",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "康有为梁启超公车上书，光绪帝\"百日维新\"，政治经济军事文化全面改革，慈禧政变失败，六君子喋血菜市口。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mod-jiawu-war",
      "war-sino-japanese",
      "xinhai-revolution",
      "qing-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "anglo-boer-war",
    "title": "英布战争（布尔战争）",
    "year": 1899,
    "yearDisplay": "公元1899年—公元1902年",
    "civilization": "africa",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "industrial",
    "type": "event",
    "location": {
      "lat": -26,
      "lng": 28
    },
    "summary": "英国与南非布尔人共和国之间的战争，英国虽胜却付出惨重代价，首创集中营制度，影响了20世纪战争形态。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "zulu-kingdom",
      "africa-adwa",
      "africa-shaka-zulu"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "sci-quantum-revolution",
    "title": "量子革命",
    "year": 1900,
    "yearDisplay": "1900—1930年代",
    "civilization": "global",
    "categories": [
      "science"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 48.1,
      "lng": 11.6
    },
    "summary": "20世纪物理学两大革命之一，重新定义微观世界，奠定现代电子科技基石。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "person-einstein",
      "sci-scientific-revolution",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "mod-qing-reform",
    "title": "清末新政与预备立宪",
    "year": 1901,
    "yearDisplay": "公元1901年—公元1911年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "废科举（1905）、练新军、设咨议局，1908钦定宪法大纲，1911皇族内阁令立宪派绝望，加速清朝灭亡。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "war-sino-japanese",
      "mod-wuxu-reform",
      "xinhai-revolution",
      "qing-dynasty"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "wright-brothers",
    "title": "莱特兄弟发明飞机",
    "year": 1903,
    "yearDisplay": "公元1903年",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "industrial",
    "location": {
      "lat": 36,
      "lng": -75.7
    },
    "summary": "莱特兄弟完成人类首次动力飞行，人类翱翔蓝天的梦想实现。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "second-industrial-revolution"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "war-russo-japanese",
    "title": "日俄战争",
    "year": 1904,
    "yearDisplay": "公元1904年—公元1905年",
    "civilization": "eastAsia",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 38.9,
      "lng": 121.6
    },
    "summary": "日本与俄国在中国东北的争夺战，亚洲小国第一次击败欧洲大国，震动世界。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "meiji-restoration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "xinhai-revolution",
    "title": "辛亥革命",
    "year": 1911,
    "yearDisplay": "公元1911年",
    "civilization": "china",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 30.6,
      "lng": 114.3
    },
    "summary": "辛亥革命推翻清朝，中华民国成立，中国结束两千年帝制。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "qing-dynasty",
      "sino-japanese-war",
      "dynasty-republic"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "dynasty-republic",
    "title": "中华民国",
    "year": 1912,
    "yearDisplay": "公元1912年—公元1949年",
    "civilization": "china",
    "categories": [
      "politics",
      "military",
      "culture"
    ],
    "type": "dynasty",
    "eraId": "industrial",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "孙中山领导辛亥革命推翻清朝，建立亚洲第一个共和国，历经北洋政府、国民政府，最终退守台湾。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "xinhai-revolution",
      "xinhai-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "scientist-turing",
    "title": "图灵",
    "year": 1912,
    "yearDisplay": "公元1912年—公元1954年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "modern",
    "type": "person",
    "location": {
      "lat": 51.5,
      "lng": -0.1
    },
    "summary": "图灵机（计算理论基础）、图灵测试（人工智能判据），二战破译德军恩尼格玛密码，计算机科学与人工智能之父。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "scientist-tesla",
      "einstein",
      "world-war-2"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "woman-rosa-parks",
    "title": "罗莎·帕克斯",
    "year": 1913,
    "yearDisplay": "公元1913年—公元2005年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "modern",
    "type": "person",
    "location": {
      "lat": 32.4,
      "lng": -86.3
    },
    "summary": "1955年蒙哥马利公交拒让座事件，引发抵制公交运动，美国民权运动之母，推动马丁·路德·金走向历史舞台。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "lincoln",
      "woman-mary-wollstonecraft",
      "world-war-2",
      "woman-florence-nightingale"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "world-war-1",
    "title": "第一次世界大战",
    "year": 1914,
    "yearDisplay": "公元1914年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 50,
      "lng": 5
    },
    "summary": "第一次世界大战爆发，人类历史上第一次全球性战争。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "october-revolution",
      "world-war-2",
      "person-churchill"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "ww1-western-front",
    "title": "一战西线绞杀",
    "year": 1914,
    "yearDisplay": "公元1914年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 49,
      "lng": 5
    },
    "summary": "马恩河奇迹打破速胜幻想，凡尔登\"绞肉机\"、索姆河坦克首战、伊普尔毒气登场——堑壕战的工业化残酷超乎想象，整整一代人埋葬在西线。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-1",
      "world-war-2",
      "october-revolution",
      "fascism-rise"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "mod-yuan-shikai",
    "title": "袁世凯称帝与护国战争",
    "year": 1915,
    "yearDisplay": "公元1915年—公元1916年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 34,
      "lng": 113.7
    },
    "summary": "袁世凯解散国会、接受二十一条、复辟帝制83天，蔡锷云南护国起义，众叛亲离病死，北洋分裂。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "xinhai-revolution",
      "mod-beiyang-warlord",
      "war-sino-japanese",
      "sun-yat-sen"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "mod-beiyang-warlord",
    "title": "北洋军阀混战",
    "year": 1916,
    "yearDisplay": "公元1916年—公元1928年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "袁世凯死后北洋分裂，直系（冯国璋吴佩孚）、皖系（段祺瑞）、奉系（张作霖），直皖战争、两次直奉战争，民不聊生。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mod-yuan-shikai",
      "xinhai-revolution",
      "war-sino-japanese",
      "mod-three-campaigns"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "october-revolution",
    "title": "俄国十月革命",
    "year": 1917,
    "yearDisplay": "公元1917年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "十月革命推翻临时政府，苏维埃俄国诞生，世界上第一个社会主义国家。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "communist-manifesto",
      "world-war-1"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "october-revolution-deep",
    "title": "俄国十月革命深度",
    "year": 1917,
    "yearDisplay": "公元1917年",
    "civilization": "europe",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 59.9,
      "lng": 30.3
    },
    "summary": "1917年二月革命推翻沙皇，列宁四月提纲指明方向，阿芙乐尔号炮轰冬宫，苏维埃政权建立。布列斯特和约退出一战，三年内战催生苏联。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-1",
      "october-revolution",
      "communist-manifesto",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "event-comintern",
    "title": "共产国际与世界革命",
    "year": 1919,
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1919年",
    "summary": "第三国际（共产国际）在莫斯科成立，指导各国共产党建立与革...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "october-revolution",
      "person-marx",
      "prc-founding"
    ],
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "event-ww1-china-impact",
    "title": "一战对中国的影响",
    "year": 1919,
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1919年",
    "summary": "一战后巴黎和会将德国在山东权益转交日本，引发五四运动，中...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "ww1-western-front",
      "xinhai-revolution",
      "mod-beiyang-warlord"
    ],
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "fascism-rise",
    "title": "法西斯上台",
    "year": 1922,
    "yearDisplay": "公元1922年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 41.9,
      "lng": 12.5
    },
    "summary": "从墨索里尼进军罗马到希特勒1933年组阁，法西斯主义在意大利和德国先后上台。魏玛民主崩溃，大萧条催化极端主义，欧洲走向战争深渊。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-1",
      "world-war-2",
      "holocaust",
      "october-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "event-soviet-industrialization",
    "title": "苏联工业化计划经济",
    "year": 1928,
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1928年",
    "summary": "斯大林推行第一个五年计划，苏联在十多年内从农业国迅速转变...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "october-revolution",
      "great-depression",
      "mod-west-movement"
    ],
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "great-depression",
    "title": "大萧条",
    "year": 1929,
    "yearDisplay": "公元1929年",
    "civilization": "america",
    "categories": [
      "politics",
      "science",
      "culture"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 40.7,
      "lng": -74
    },
    "summary": "美国股市崩盘，经济大萧条席卷全球。",
    "important": true,
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "world-war-2",
      "second-industrial-revolution",
      "world-war-1",
      "roosevelt",
      "economy-roosevelt-new-deal",
      "econ-bretton-woods",
      "economy-2008-crisis"
    ],
    "hasBody": true,
    "shardKey": "industrial-others"
  },
  {
    "id": "event-great-depression-soviet-japan",
    "title": "大萧条与苏联工业化、日本法西斯化",
    "year": 1929,
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 35.7,
      "lng": 139.7
    },
    "civilization": "global",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1929年",
    "summary": "1929-1933年资本主义世界经济大危机，苏联因计划经...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "great-depression",
      "event-soviet-industrialization",
      "ww1-western-front"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "economy-roosevelt-new-deal",
    "title": "罗斯福新政",
    "year": 1933,
    "yearDisplay": "公元1933年—公元1941年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 40.7,
      "lng": -73.9
    },
    "summary": "富兰克林·罗斯福推行\"新政\"：百日新政、以工代赈、社会保障、金融监管、TVA，开创国家干预经济新模式，借鉴凯恩斯主义。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "great-depression",
      "econ-bretton-woods",
      "world-war-2",
      "roosevelt"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "war-sino-japanese",
    "title": "中国抗日战争",
    "year": 1937,
    "yearDisplay": "公元1931年—公元1945年（14年抗战）",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 32,
      "lng": 118.8
    },
    "summary": "中华民族抗击日本侵略的全民族战争，14年浴血奋战，3500万同胞伤亡。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "meiji-restoration"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "world-war-2",
    "title": "第二次世界大战",
    "year": 1939,
    "yearDisplay": "公元1939年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "industrial",
    "location": {
      "lat": 52,
      "lng": 10
    },
    "summary": "德军入侵波兰，二战全面爆发，人类历史上规模最大的战争。",
    "description": "",
    "imageEra": "industrial",
    "relatedNodeIds": [
      "world-war-1",
      "atomic-bomb",
      "cold-war",
      "person-churchill",
      "person-einstein"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "industrial-europe"
  },
  {
    "id": "ww2-pearl-harbor",
    "title": "珍珠港与太平洋战争",
    "year": 1941,
    "yearDisplay": "公元1941年",
    "civilization": "eastAsia",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 21.3,
      "lng": -157.9
    },
    "summary": "山本五十六指挥日军偷袭珍珠港，美国正式参战，二战规模达到最大。中途岛海战后形势逆转，瓜岛跳岛反攻，神风特攻至广岛长崎终战。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "war-stalingrad",
      "hiroshima-nagasaki",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "holocaust",
    "title": "犹太大屠杀",
    "year": 1941,
    "yearDisplay": "公元1941年",
    "civilization": "europe",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 52.3,
      "lng": 19.3
    },
    "summary": "纳粹\"最终解决方案\"系统性屠杀600万犹太人，奥斯维辛等集中营工业化杀人，人类文明之殇。纽伦堡审判确立\"反人类罪\"，警示后世永不忘记。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "fascism-rise",
      "world-war-2",
      "united-nations",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "war-stalingrad",
    "title": "斯大林格勒战役",
    "year": 1942,
    "yearDisplay": "公元1942年—公元1943年",
    "civilization": "europe",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 48.7,
      "lng": 44.5
    },
    "summary": "二战转折点，人类历史上最惨烈的战役，德军第6集团军覆灭，约200万人伤亡。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "war-normandy",
      "war-korean",
      "ww2-pearl-harbor",
      "hiroshima-nagasaki",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "war-midway",
    "title": "中途岛海战",
    "year": 1942,
    "yearDisplay": "公元1942年",
    "civilization": "america",
    "categories": [
      "military"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 28.2,
      "lng": -177.4
    },
    "summary": "太平洋战争的转折点，美军以少胜多击沉日军四艘航母，日本海军精锐尽丧。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "war-normandy",
      "war-sino-japanese"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "war-normandy",
    "title": "诺曼底登陆",
    "year": 1944,
    "yearDisplay": "公元1944年",
    "civilization": "europe",
    "categories": [
      "military"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 49.4,
      "lng": -0.9
    },
    "summary": "人类历史上最大规模的两栖登陆战，D-Day霸王行动，开辟欧洲第二战场，加速纳粹德国灭亡。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "war-stalingrad",
      "war-midway"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "econ-bretton-woods",
    "title": "布雷顿森林体系",
    "year": 1944,
    "yearDisplay": "公元1944年—公元1971年",
    "civilization": "america",
    "categories": [
      "politics",
      "science"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 44.3,
      "lng": -71.8
    },
    "summary": "二战后建立的国际货币金融体系，美元与黄金挂钩、各国货币与美元挂钩，奠定战后经济秩序。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "great-depression",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "atomic-bomb",
    "title": "原子弹投放与二战结束",
    "year": 1945,
    "yearDisplay": "公元1945年",
    "civilization": "america",
    "categories": [
      "military",
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 34.4,
      "lng": 132.5
    },
    "summary": "广岛长崎原子弹爆炸，二战结束，核时代开启，联合国成立。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "hiroshima-nagasaki",
    "title": "广岛长崎核爆",
    "year": 1945,
    "yearDisplay": "公元1945年",
    "civilization": "eastAsia",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 34.4,
      "lng": 132.5
    },
    "summary": "1945年8月曼哈顿计划的产物投向日、长二市，迫使日本投降的同时，也宣告核时代降临——冷战核威慑与和平主义的双重起点。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "ww2-pearl-harbor",
      "cold-war",
      "information-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "united-nations",
    "title": "联合国成立",
    "year": 1945,
    "yearDisplay": "公元1945年",
    "civilization": "global",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 40.8,
      "lng": -73.9
    },
    "summary": "1945年旧金山宪章签署，联合国正式诞生。安理会五常否决权、大会、秘书处体系，以及世行和IMF等配套机构，构成战后集体安全与国际治理体系。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "cold-war",
      "econ-marshall-plan",
      "european-union"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "sci-computer-internet",
    "title": "计算机与互联网",
    "year": 1946,
    "yearDisplay": "公元1946年—至今",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 37.4,
      "lng": -122.1
    },
    "summary": "从电子管计算机到个人电脑，从ARPANET到万维网，信息技术革命重塑了人类社会。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "sci-space-exploration",
      "cold-war",
      "sci-dna"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "information-revolution",
    "title": "信息革命",
    "year": 1946,
    "yearDisplay": "公元1946年",
    "civilization": "global",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 37.4,
      "lng": -122.2
    },
    "summary": "从ENIAC到晶体管、集成电路、个人电脑，从ARPANET到万维网，信息革命用七十年时间把人类带入数字时代，深刻重塑生产、生活与社会结构。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "second-industrial-revolution-detail",
      "space-race",
      "sci-dna",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "cold-war",
    "title": "冷战开始",
    "year": 1947,
    "yearDisplay": "公元1947年",
    "civilization": "global",
    "categories": [
      "politics",
      "military"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 50,
      "lng": 10
    },
    "summary": "杜鲁门主义出台，美苏冷战开始，世界进入两极格局。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "atomic-bomb",
      "soviet-collapse"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "econ-marshall-plan",
    "title": "马歇尔计划",
    "year": 1947,
    "yearDisplay": "公元1948年—公元1952年",
    "civilization": "europe",
    "categories": [
      "politics",
      "science"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "战后欧洲复兴计划，美国援助欧洲130亿美元，重建西欧，开启冷战格局。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "marshall-plan-deep",
    "title": "马歇尔计划与欧洲重建",
    "year": 1947,
    "yearDisplay": "公元1947年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 48.9,
      "lng": 2.3
    },
    "summary": "美国援欧130亿美元重建西欧，帮助欧洲从战争废墟中恢复，遏制共产主义扩张，开启欧美同盟与欧洲经济黄金时代，也成为冷战的经济战线。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "cold-war",
      "european-union",
      "united-nations"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "india-independence",
    "title": "印度独立与印巴分治",
    "year": 1947,
    "yearDisplay": "公元1947年",
    "civilization": "southAsia",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 28.6,
      "lng": 77.2
    },
    "summary": "甘地非暴力不合作运动、真纳穆斯林联盟分治诉求，蒙巴顿方案按宗教分治印度与巴基斯坦，百万人迁徙冲突，尼赫鲁成为首任总理。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "person-gandhi",
      "africa-independence-year",
      "world-war-2",
      "united-nations"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "mod-three-campaigns",
    "title": "三大战役",
    "year": 1948,
    "yearDisplay": "1948年9月—1949年1月",
    "civilization": "china",
    "categories": [
      "military"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 35,
      "lng": 117
    },
    "summary": "辽沈（东北）、淮海（60万胜80万）、平津（北平和平解放），歼敌154万，解放战争奠定胜局。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mod-three-campaigns",
      "war-sino-japanese",
      "prc-founding"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "israel-middle-east-wars",
    "title": "以色列建国与中东战争",
    "year": 1948,
    "yearDisplay": "公元1948年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 31.8,
      "lng": 35.2
    },
    "summary": "犹太复国主义与英国委任统治催生以色列国，五次中东战争塑造中东格局。苏伊士危机、六日战争、巴以冲突延续至今，是冷战与后冷战时代最持久的热点。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "holocaust",
      "united-nations",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "prc-founding",
    "title": "中华人民共和国成立",
    "year": 1949,
    "yearDisplay": "公元1949年",
    "civilization": "china",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 39.9,
      "lng": 116.4
    },
    "summary": "毛泽东在天安门宣告新中国成立，中国人民从此站起来了。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "xinhai-revolution",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "mod-crossing-river-founding",
    "title": "渡江战役与新中国成立",
    "year": 1949,
    "yearDisplay": "1949年4月—10月",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 32.1,
      "lng": 118.8
    },
    "summary": "百万雄师过大江解放南京，结束国民党22年统治；1949年10月1日开国大典，中华人民共和国成立。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mod-three-campaigns",
      "war-sino-japanese",
      "prc-founding"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "korean-war",
    "title": "朝鲜战争",
    "year": 1950,
    "yearDisplay": "公元1950年",
    "civilization": "eastAsia",
    "categories": [
      "military"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 38,
      "lng": 127
    },
    "summary": "朝鲜战争爆发，冷战中的第一场热战。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "prc-founding"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "war-korean",
    "title": "抗美援朝",
    "year": 1950,
    "yearDisplay": "公元1950年—公元1953年",
    "civilization": "china",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 39,
      "lng": 125.7
    },
    "summary": "中国人民志愿军入朝参战，以劣势装备对抗16国联军，将战线稳定在三八线，新中国的立国之战。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "war-sino-japanese"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "european-union",
    "title": "欧洲一体化",
    "year": 1951,
    "yearDisplay": "公元1951年",
    "civilization": "europe",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 50.8,
      "lng": 4.4
    },
    "summary": "从1951年煤钢共同体到1993年欧盟诞生、2002年欧元流通，欧洲一体化是超国家治理的伟大实验，法德和解是核心动力，也是战后和平繁荣的基石。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "marshall-plan-deep",
      "united-nations",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "sci-dna",
    "title": "DNA双螺旋与分子生物学",
    "year": 1953,
    "yearDisplay": "公元1953年—至今",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 52.2,
      "lng": 0.1
    },
    "summary": "沃森和克里克发现DNA双螺旋结构，揭示遗传密码，开创分子生物学和基因工程时代。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "sci-vaccines",
      "sci-scientific-revolution",
      "sci-computer-internet"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "dna-biology-revolution",
    "title": "DNA双螺旋与生物革命",
    "year": 1953,
    "yearDisplay": "公元1953年",
    "civilization": "global",
    "categories": [
      "culture",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 52.2,
      "lng": 0.1
    },
    "summary": "沃森、克里克与富兰克林发现DNA双螺旋结构，奠定分子生物学基础。基因工程、人类基因组计划、绿色革命相继而来，生命科学进入全新纪元。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "sci-scientific-revolution",
      "second-industrial-revolution-detail",
      "information-revolution",
      "space-race"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "algerian-independence-war",
    "title": "阿尔及利亚独立战争",
    "year": 1954,
    "yearDisplay": "公元1954年—公元1962年",
    "civilization": "africa",
    "categories": [
      "military",
      "politics"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 36.75,
      "lng": 3.06
    },
    "summary": "阿尔及利亚民族解放阵线领导的反法独立战争，是20世纪最血腥的殖民地战争之一，直接导致法兰西第四共和国垮台。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "africa-adwa",
      "anglo-boer-war",
      "songhai-empire"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "vietnam-war-detail",
    "title": "越南战争",
    "year": 1955,
    "yearDisplay": "公元1955年",
    "civilization": "eastAsia",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 21,
      "lng": 105.8
    },
    "summary": "美国以多米诺骨牌理论介入越南，胡志明领导越南军民抗争，春节攻势成为转折点，反战运动席卷全美。美国深陷14年最终撤军，是冷战中最大的热战。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "person-gandhi",
      "africa-independence-year",
      "revolutions-1848"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "sputnik",
    "title": "斯普特尼克一号与太空时代",
    "year": 1957,
    "yearDisplay": "公元1957年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "dynasty",
    "eraId": "modern",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "苏联发射人类第一颗人造地球卫星，太空时代开启。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "gagarin",
      "apollo-11"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "sci-space-exploration",
    "title": "人类太空探索",
    "year": 1957,
    "yearDisplay": "公元1957年—至今",
    "civilization": "america",
    "categories": [
      "science",
      "military"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 28.6,
      "lng": -80.6
    },
    "summary": "从斯普特尼克到阿波罗登月，从空间站到火星探测，人类一步步走出地球摇篮。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "cold-war",
      "sci-computer-internet"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "space-race",
    "title": "太空竞赛",
    "year": 1957,
    "yearDisplay": "公元1957年",
    "civilization": "global",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 28.5,
      "lng": -80.7
    },
    "summary": "苏联率先发射斯普特尼克一号，加加林成为首位太空人，美国急起直追。阿波罗11号1969年登月成功。冷战科技较量催生航天与信息技术革命。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "information-revolution",
      "sci-dna",
      "hiroshima-nagasaki"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "africa-independence-year",
    "title": "非洲独立年与去殖民化",
    "year": 1960,
    "yearDisplay": "公元1960年",
    "civilization": "africa",
    "categories": [
      "politics",
      "culture"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 9,
      "lng": 38.7
    },
    "summary": "1960年17个非洲国家宣告独立，殖民体系在非洲加速瓦解。1963年非洲统一组织成立，新兴独立国家构成第三世界不结盟运动的重要力量。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "india-independence",
      "united-nations",
      "berlin-conference-africa"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "event-decolonization-wave",
    "title": "二战后非殖民化浪潮",
    "year": 1960,
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 5.6,
      "lng": -0.2
    },
    "civilization": "global",
    "categories": [
      "politics"
    ],
    "description": "",
    "yearDisplay": "公元1960年",
    "summary": "二战后殖民体系瓦解，印度独立、非洲独立年、越南革命等事件...",
    "imageEra": "medieval",
    "relatedNodeIds": [
      "india-independence",
      "africa-independence-year",
      "vietnam-war-detail"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "gagarin",
    "title": "人类首次进入太空",
    "year": 1961,
    "yearDisplay": "公元1961年",
    "civilization": "europe",
    "categories": [
      "science"
    ],
    "type": "person",
    "eraId": "modern",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "苏联宇航员加加林乘坐东方一号进入太空，人类首次进入太空。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "sputnik",
      "apollo-11"
    ],
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "cuban-missile-crisis",
    "title": "古巴导弹危机",
    "year": 1962,
    "yearDisplay": "公元1962年",
    "civilization": "america",
    "categories": [
      "military",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 23,
      "lng": -82
    },
    "summary": "美苏在古巴部署导弹问题上对峙，人类最接近核战争的时刻。",
    "important": true,
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "atomic-bomb",
      "hiroshima-nagasaki",
      "vietnam-war-detail",
      "space-race"
    ],
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "apollo-11",
    "title": "阿波罗11号登月",
    "year": 1969,
    "yearDisplay": "公元1969年",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 0.67,
      "lng": 23.47
    },
    "summary": "人类首次登上月球，阿姆斯特朗迈出「个人的一小步，人类的一大步」。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "sputnik",
      "gagarin"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "economy-nixon-shock",
    "title": "尼克松冲击与牙买加体系",
    "year": 1971,
    "yearDisplay": "公元1971年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 38.9,
      "lng": -77
    },
    "summary": "尼克松宣布美元停止兑换黄金，布雷顿森林体系瓦解，全球进入信用纸币与浮动汇率时代，世界货币体系重塑。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "econ-bretton-woods",
      "economy-2008-crisis",
      "economy-gold-standard",
      "cold-war"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "reform-and-opening",
    "title": "中国改革开放",
    "year": 1978,
    "yearDisplay": "公元1978年",
    "civilization": "china",
    "categories": [
      "politics",
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 22.5,
      "lng": 114.1
    },
    "summary": "十一届三中全会召开，改革开放政策启动，中国经济腾飞。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "prc-founding"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "berlin-wall-fall",
    "title": "柏林墙倒塌",
    "year": 1989,
    "yearDisplay": "公元1989年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 52.5,
      "lng": 13.4
    },
    "summary": "柏林墙倒塌，冷战走向终结，东欧剧变开始。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "soviet-collapse"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "soviet-collapse",
    "title": "苏联解体",
    "year": 1991,
    "yearDisplay": "公元1991年",
    "civilization": "europe",
    "categories": [
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 55.8,
      "lng": 37.6
    },
    "summary": "苏联正式解体，冷战结束，世界格局进入一超多强时代。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "cold-war",
      "berlin-wall-fall"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-europe"
  },
  {
    "id": "war-gulf-war",
    "title": "海湾战争",
    "year": 1991,
    "yearDisplay": "公元1990年—公元1991年",
    "civilization": "middleEast",
    "categories": [
      "military",
      "science"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 29.3,
      "lng": 47.5
    },
    "summary": "冷战后第一场大规模局部战争，信息化战争时代的开端，42天空袭+100小时地面战击溃伊军。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "world-war-2",
      "war-korean",
      "person-einstein"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "internet",
    "title": "互联网商业化",
    "year": 1993,
    "yearDisplay": "公元1993年",
    "civilization": "america",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 37.4,
      "lng": -122
    },
    "summary": "万维网向公众开放，互联网时代到来，信息革命开启。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "mobile-internet",
      "ai-revolution"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "wto",
    "title": "中国加入WTO",
    "year": 2001,
    "yearDisplay": "公元2001年",
    "civilization": "china",
    "categories": [
      "science",
      "politics"
    ],
    "type": "dynasty",
    "eraId": "modern",
    "location": {
      "lat": 31.2,
      "lng": 121.5
    },
    "summary": "中国正式加入世界贸易组织，全面融入全球经济体系。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "reform-and-opening"
    ],
    "hasBody": true,
    "shardKey": "modern-china"
  },
  {
    "id": "economy-2008-crisis",
    "title": "2008全球金融危机",
    "year": 2008,
    "yearDisplay": "公元2008年—公元2009年",
    "civilization": "america",
    "categories": [
      "politics",
      "culture"
    ],
    "eraId": "modern",
    "type": "event",
    "location": {
      "lat": 40.7,
      "lng": -74
    },
    "summary": "美国次贷危机引发雷曼兄弟破产，全球金融海啸，量化宽松政策应对，暴露金融衍生品风险，引发欧债危机。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "great-depression",
      "economy-nixon-shock",
      "economy-south-sea-bubble",
      "econ-bretton-woods"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-america"
  },
  {
    "id": "mobile-internet",
    "title": "移动互联网时代",
    "year": 2010,
    "yearDisplay": "2010年代",
    "civilization": "global",
    "categories": [
      "science"
    ],
    "type": "dynasty",
    "eraId": "modern",
    "location": {
      "lat": 37.3,
      "lng": -122
    },
    "summary": "智能手机普及，移动互联网深入生活每一个角落。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "internet",
      "ai-revolution"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "covid",
    "title": "新冠疫情全球大流行",
    "year": 2020,
    "yearDisplay": "公元2020年",
    "civilization": "global",
    "categories": [
      "science",
      "politics"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 30.6,
      "lng": 114.3
    },
    "summary": "新冠疫情席卷全球，百年未遇的大流行深刻改变世界。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "ai-revolution"
    ],
    "hasBody": true,
    "shardKey": "modern-others"
  },
  {
    "id": "ai-revolution",
    "title": "ChatGPT与AI革命",
    "year": 2022,
    "yearDisplay": "公元2022年",
    "civilization": "global",
    "categories": [
      "science"
    ],
    "type": "event",
    "eraId": "modern",
    "location": {
      "lat": 37.8,
      "lng": -122.4
    },
    "summary": "ChatGPT横空出世，生成式AI爆发，人工智能革命开端。",
    "description": "",
    "imageEra": "modern",
    "relatedNodeIds": [
      "internet",
      "mobile-internet"
    ],
    "important": true,
    "hasBody": true,
    "shardKey": "modern-others"
  }
];

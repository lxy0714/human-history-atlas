// EXPORTS:
//   IRelationshipNode, IRelationshipGraph, RELATIONSHIP_GRAPHS,
//   IFashionItem, FASHION_TIMELINE,
//   IWeaponItem, WEAPON_TIMELINE,
//   IOnThisDayEvent, ON_THIS_DAY_EVENTS,
//   IFunFact, FUN_FACTS,
//   IQuote, QUOTES,
//   IRankingItem, RANKINGS,
//   IEraInfo, ERA_INFO_MAP,
//   IComparisonData, COMPARISON_DATA

// ===== 1. 人物关系图谱 =====
export interface IRelationshipNode {
  id: string;
  name: string;
  title?: string;
  summary?: string;
  color: string;
  group: string; // 所属分组/朝代
  x: number; // 初始 x 坐标 (0-100%)
  y: number; // 初始 y 坐标 (0-100%)
  relatedTo?: string[]; // 连接的节点 id
  historyNodeId?: string; // 对应历史节点 id（可选）
}

export interface IRelationshipGraph {
  id: string;
  name: string;
  description: string;
  nodes: IRelationshipNode[];
}

export const RELATIONSHIP_GRAPHS: IRelationshipGraph[] = [
  {
    id: 'chinese-emperors',
    name: '中国帝王世系',
    description: '从黄帝到清朝的主要帝王传承脉络',
    nodes: [
      { id: 'huangdi', name: '黄帝', title: '人文初祖', summary: '传说中中华民族的始祖，五帝之首。', color: '#d4a843', group: '上古', x: 50, y: 6, relatedTo: ['zhuanxu', 'diku'] },
      { id: 'zhuanxu', name: '颛顼', title: '五帝之一', summary: '黄帝之孙，绝地通天，改革宗教。', color: '#d4a843', group: '上古', x: 30, y: 14, relatedTo: ['huangdi', 'ku'] },
      { id: 'diku', name: '帝喾', title: '五帝之一', summary: '黄帝曾孙，以德治国。', color: '#d4a843', group: '上古', x: 70, y: 14, relatedTo: ['huangdi', 'yao'] },
      { id: 'yao', name: '尧', title: '唐尧', summary: '帝喾之子，禅让制开端。', color: '#d4a843', group: '上古', x: 60, y: 22, relatedTo: ['diku', 'shun'] },
      { id: 'shun', name: '舜', title: '虞舜', summary: '以孝闻名，禅让于禹。', color: '#d4a843', group: '上古', x: 40, y: 22, relatedTo: ['yao', 'yu'] },
      { id: 'yu', name: '禹', title: '大禹', summary: '治水有功，建立夏朝基础。', color: '#c0392b', group: '夏朝', x: 50, y: 30, relatedTo: ['shun', 'qi'] },
      { id: 'qi', name: '启', title: '夏启', summary: '禹之子，建立夏朝，家天下开始。', color: '#c0392b', group: '夏朝', x: 35, y: 37, relatedTo: ['yu', 'jie'] },
      { id: 'jie', name: '桀', title: '夏桀', summary: '夏朝末代君主，暴虐无道。', color: '#c0392b', group: '夏朝', x: 65, y: 37, relatedTo: ['qi'] },
      { id: 'tang', name: '成汤', title: '商汤', summary: '商朝开国君主，灭夏建商。', color: '#e67e22', group: '商朝', x: 30, y: 44, relatedTo: ['pan-geng'] },
      { id: 'pan-geng', name: '盘庚', title: '商王', summary: '迁都于殷，商朝复兴。', color: '#e67e22', group: '商朝', x: 55, y: 44, relatedTo: ['tang', 'zhou-wuwang'] },
      { id: 'zhou-wuwang', name: '周武王', title: '姬发', summary: '伐纣灭商，建立周朝。', color: '#16a085', group: '周朝', x: 70, y: 51, relatedTo: ['zhou-wenwang', 'zhou-pingwang'] },
      { id: 'zhou-wenwang', name: '周文王', title: '姬昌', summary: '西伯侯，周易推演者。', color: '#16a085', group: '周朝', x: 50, y: 51, relatedTo: ['zhou-wuwang'] },
      { id: 'zhou-pingwang', name: '周平王', title: '姬宜臼', summary: '东迁洛邑，东周开始。', color: '#16a085', group: '周朝', x: 25, y: 58, relatedTo: ['zhou-wuwang'] },
      { id: 'qinshihuang', name: '秦始皇', title: '嬴政', summary: '统一六国，中国第一位皇帝。', color: '#8e44ad', group: '秦朝', x: 50, y: 65, relatedTo: ['qin-ershi', 'han-gauzu'] },
      { id: 'qin-ershi', name: '秦二世', title: '胡亥', summary: '秦朝末代皇帝。', color: '#8e44ad', group: '秦朝', x: 30, y: 65, relatedTo: ['qinshihuang'] },
      { id: 'han-gauzu', name: '汉高祖', title: '刘邦', summary: '西汉开国皇帝，斩白蛇起义。', color: '#c0392b', group: '汉朝', x: 65, y: 72, relatedTo: ['qinshihuang', 'han-wudi'] },
      { id: 'han-wudi', name: '汉武帝', title: '刘彻', summary: '罢黜百家，独尊儒术，北击匈奴。', color: '#c0392b', group: '汉朝', x: 40, y: 72, relatedTo: ['han-gauzu', 'guangwu'] },
      { id: 'guangwu', name: '光武帝', title: '刘秀', summary: '东汉开国皇帝，光武中兴。', color: '#c0392b', group: '汉朝', x: 18, y: 79, relatedTo: ['han-wudi'] },
      { id: 'caocao', name: '曹操', title: '魏武帝', summary: '挟天子以令诸侯，三国曹魏奠基人。', color: '#2980b9', group: '三国', x: 45, y: 79, relatedTo: ['caopi'] },
      { id: 'caopi', name: '曹丕', title: '魏文帝', summary: '代汉建魏，三国曹魏开国皇帝。', color: '#2980b9', group: '三国', x: 65, y: 84, relatedTo: ['caocao', 'sima-yan'] },
      { id: 'sima-yan', name: '司马炎', title: '晋武帝', summary: '西晋开国皇帝，统一三国。', color: '#27ae60', group: '晋朝', x: 82, y: 84, relatedTo: ['caopi'] },
      { id: 'sui-wendi', name: '隋文帝', title: '杨坚', summary: '代周建隋，统一南北。', color: '#d4a843', group: '隋朝', x: 30, y: 89, relatedTo: ['sui-yangdi'] },
      { id: 'sui-yangdi', name: '隋炀帝', title: '杨广', summary: '开凿大运河，三征高句丽。', color: '#d4a843', group: '隋朝', x: 50, y: 89, relatedTo: ['sui-wendi', 'tang-taizong'] },
      { id: 'tang-taizong', name: '唐太宗', title: '李世民', summary: '贞观之治，千古明君。', color: '#c0392b', group: '唐朝', x: 70, y: 89, relatedTo: ['sui-yangdi', 'tang-gaozong', 'wu-zetian'] },
      { id: 'wu-zetian', name: '武则天', title: '则天大圣皇帝', summary: '中国历史上唯一的女皇帝。', color: '#c0392b', group: '唐朝', x: 85, y: 94, relatedTo: ['tang-taizong', 'tang-xuanzong'] },
      { id: 'tang-gaozong', name: '唐高宗', title: '李治', summary: '唐朝第三位皇帝，武则天之夫。', color: '#c0392b', group: '唐朝', x: 55, y: 94, relatedTo: ['tang-taizong', 'wu-zetian'] },
      { id: 'tang-xuanzong', name: '唐玄宗', title: '李隆基', summary: '开元盛世，安史之乱由盛转衰。', color: '#c0392b', group: '唐朝', x: 35, y: 94, relatedTo: ['wu-zetian'] },
      { id: 'song-taizu', name: '宋太祖', title: '赵匡胤', summary: '陈桥兵变，黄袍加身，建立宋朝。', color: '#2c3e80', group: '宋朝', x: 15, y: 94, relatedTo: ['tang-xuanzong'] },
      { id: 'yuan-kublai', name: '忽必烈', title: '元世祖', summary: '建立元朝，统一中国。', color: '#16a085', group: '元朝', x: 15, y: 97, relatedTo: ['song-taizu', 'ming-hongwu'] },
      { id: 'ming-hongwu', name: '明太祖', title: '朱元璋', summary: '乞丐出身，建立明朝，驱逐蒙元。', color: '#e67e22', group: '明朝', x: 40, y: 97, relatedTo: ['yuan-kublai', 'ming-yongle'] },
      { id: 'ming-yongle', name: '明成祖', title: '朱棣', summary: '永乐大帝，迁都北京，郑和下西洋。', color: '#e67e22', group: '明朝', x: 60, y: 97, relatedTo: ['ming-hongwu'] },
      { id: 'qing-kangxi', name: '康熙', title: '爱新觉罗·玄烨', summary: '在位61年，康乾盛世开创者。', color: '#d4a843', group: '清朝', x: 80, y: 97, relatedTo: ['qing-qianlong'] },
      { id: 'qing-qianlong', name: '乾隆', title: '爱新觉罗·弘历', summary: '十全老人，康乾盛世顶峰。', color: '#d4a843', group: '清朝', x: 95, y: 97, relatedTo: ['qing-kangxi'] },
    ],
  },
  {
    id: 'chinese-mythology',
    name: '中国神话神系',
    description: '道教神系与山海经神话体系',
    nodes: [
      { id: 'pangu', name: '盘古', title: '开天辟地', summary: '天地浑沌如鸡子，盘古生其中。', color: '#d4a843', group: '创世', x: 50, y: 5, relatedTo: ['nüwa', 'fuxi'] },
      { id: 'nüwa', name: '女娲', title: '抟土造人', summary: '女娲补天，抟土造人，人类始祖。', color: '#e84393', group: '创世', x: 30, y: 15, relatedTo: ['pangu', 'fuxi'] },
      { id: 'fuxi', name: '伏羲', title: '八卦始祖', summary: '画八卦，结绳记事，人文始祖。', color: '#0984e3', group: '创世', x: 70, y: 15, relatedTo: ['pangu', 'nüwa'] },
      { id: 'shennong', name: '神农', title: '尝百草', summary: '炎帝，尝百草教民耕种。', color: '#00b894', group: '三皇', x: 15, y: 25, relatedTo: ['fuxi', 'huangdi-myth'] },
      { id: 'huangdi-myth', name: '黄帝', title: '轩辕氏', summary: '神话中五帝之首，中华始祖。', color: '#fdcb6e', group: '五帝', x: 50, y: 25, relatedTo: ['shennong', 'chiyou', 'yan-dao'] },
      { id: 'chiyou', name: '蚩尤', title: '兵主战神', summary: '上古战神，与黄帝逐鹿中原。', color: '#d63031', group: '上古', x: 85, y: 25, relatedTo: ['huangdi-myth'] },
      { id: 'yan-dao', name: '炎帝', title: '神农氏', summary: '与黄帝并称炎黄，华夏始祖。', color: '#e17055', group: '五帝', x: 35, y: 35, relatedTo: ['huangdi-myth', 'zhuanxu-m'] },
      { id: 'zhuanxu-m', name: '颛顼', title: '玄帝', summary: '绝地天通，重黎分天地。', color: '#74b9ff', group: '五帝', x: 65, y: 35, relatedTo: ['huangdi-myth', 'ku-m'] },
      { id: 'ku-m', name: '帝喾', title: '高辛氏', summary: '五帝之一，生后稷与契。', color: '#a29bfe', group: '五帝', x: 50, y: 42, relatedTo: ['zhuanxu-m', 'yao-m'] },
      { id: 'yao-m', name: '帝尧', title: '陶唐氏', summary: '仁德之君，设谏鼓谤木。', color: '#fd79a8', group: '五帝', x: 30, y: 50, relatedTo: ['ku-m', 'shun-m'] },
      { id: 'shun-m', name: '帝舜', title: '有虞氏', summary: '以孝闻名，禅让制代表。', color: '#ffeaa7', group: '五帝', x: 70, y: 50, relatedTo: ['yao-m', 'yu-m'] },
      { id: 'yu-m', name: '大禹', title: '夏禹', summary: '治水三过家门而不入。', color: '#55efc4', group: '夏朝', x: 50, y: 57, relatedTo: ['shun-m'] },
      { id: 'jade-emperor', name: '玉皇大帝', title: '昊天上帝', summary: '道教最高神，三界之主。', color: '#dfe6e9', group: '道教', x: 50, y: 68, relatedTo: ['queen-mother', 'sanqing'] },
      { id: 'queen-mother', name: '王母娘娘', title: '西王母', summary: '昆仑山女神，蟠桃会主人。', color: '#fab1a0', group: '道教', x: 25, y: 75, relatedTo: ['jade-emperor'] },
      { id: 'sanqing', name: '三清', title: '元始/灵宝/道德', summary: '道教最高尊神，玉清上清太清。', color: '#b2bec3', group: '道教', x: 75, y: 75, relatedTo: ['jade-emperor', 'laozi'] },
      { id: 'laozi', name: '老子', title: '道德天尊', summary: '道家创始人，太上老君。', color: '#636e72', group: '道教', x: 85, y: 85, relatedTo: ['sanqing'] },
      { id: 'baxian', name: '八仙', title: '铁拐李等八仙', summary: '八仙过海，各显神通。', color: '#74b9ff', group: '道教', x: 55, y: 88, relatedTo: ['jade-emperor'] },
      { id: 'kuafu', name: '夸父', title: '逐日英雄', summary: '夸父追日，道渴而死，化为邓林。', color: '#e17055', group: '山海经', x: 12, y: 70, relatedTo: ['jingwei'] },
      { id: 'jingwei', name: '精卫', title: '填海神鸟', summary: '炎帝之女溺亡，化鸟衔石填海。', color: '#fdcb6e', group: '山海经', x: 18, y: 82, relatedTo: ['kuafu', 'houyi'] },
      { id: 'houyi', name: '后羿', title: '射日英雄', summary: '射落九日，嫦娥之夫。', color: '#d63031', group: '山海经', x: 30, y: 92, relatedTo: ['jingwei', 'change'] },
      { id: 'change', name: '嫦娥', title: '月宫仙子', summary: '偷吃仙药，奔月成仙。', color: '#a29bfe', group: '山海经', x: 48, y: 95, relatedTo: ['houyi'] },
      { id: 'xingtian', name: '刑天', title: '战神', summary: '被断首，以乳为目以脐为口。', color: '#e84393', group: '山海经', x: 8, y: 92, relatedTo: ['huangdi-myth'] },
    ],
  },
  {
    id: 'greek-mythology',
    name: '希腊神话神族',
    description: '从卡俄斯到奥林匹斯十二主神的家族树',
    nodes: [
      { id: 'chaos', name: '卡俄斯', title: '混沌', summary: '宇宙之初的原始混沌，创世前的虚空。', color: '#2c3e50', group: '原始神', x: 50, y: 4, relatedTo: ['gaia', 'tartarus', 'eros'] },
      { id: 'gaia', name: '盖亚', title: '大地女神', summary: '大地之母，生乌拉诺斯、山、海。', color: '#27ae60', group: '原始神', x: 30, y: 14, relatedTo: ['chaos', 'uranus'] },
      { id: 'tartarus', name: '塔耳塔洛斯', title: '地狱深渊', summary: '冥界最深处，关押泰坦的地方。', color: '#636e72', group: '原始神', x: 55, y: 14, relatedTo: ['chaos'] },
      { id: 'eros', name: '厄洛斯', title: '爱欲之神', summary: '原始爱神，使万物结合繁衍。', color: '#e84393', group: '原始神', x: 75, y: 14, relatedTo: ['chaos'] },
      { id: 'uranus', name: '乌拉诺斯', title: '天空之神', summary: '天空之神，盖亚之子与丈夫。', color: '#0984e3', group: '泰坦', x: 40, y: 24, relatedTo: ['gaia', 'cronus'] },
      { id: 'cronus', name: '克洛诺斯', title: '泰坦神王', summary: '阉割父亲乌拉诺斯，建立泰坦统治。', color: '#fdcb6e', group: '泰坦', x: 50, y: 34, relatedTo: ['uranus', 'rhea', 'zeus'] },
      { id: 'rhea', name: '瑞亚', title: '泰坦女神', summary: '克洛诺斯的姐姐与妻子。', color: '#fab1a0', group: '泰坦', x: 70, y: 34, relatedTo: ['cronus', 'zeus'] },
      { id: 'oceanus', name: '俄刻阿诺斯', title: '大洋神', summary: '环绕大地的大洋河之神。', color: '#74b9ff', group: '泰坦', x: 15, y: 30, relatedTo: ['uranus'] },
      { id: 'prometheus', name: '普罗米修斯', title: '先知者', summary: '盗火给人类，被缚高加索山。', color: '#e17055', group: '泰坦', x: 20, y: 42, relatedTo: ['cronus'] },
      { id: 'zeus', name: '宙斯', title: '神王', summary: '奥林匹斯众神之王，雷霆之神。', color: '#f39c12', group: '奥林匹斯', x: 50, y: 48, relatedTo: ['cronus', 'rhea', 'hera', 'poseidon', 'hades', 'athena', 'apollo', 'artemis', 'dionysus'] },
      { id: 'hera', name: '赫拉', title: '天后', summary: '宙斯的姐姐与妻子，婚姻女神。', color: '#9b59b6', group: '奥林匹斯', x: 30, y: 56, relatedTo: ['zeus'] },
      { id: 'poseidon', name: '波塞冬', title: '海神', summary: '宙斯之兄，海洋与地震之神。', color: '#3498db', group: '奥林匹斯', x: 12, y: 56, relatedTo: ['zeus'] },
      { id: 'hades', name: '哈迪斯', title: '冥王', summary: '宙斯之兄，冥界与财富之神。', color: '#2c3e50', group: '奥林匹斯', x: 85, y: 56, relatedTo: ['zeus', 'persephone'] },
      { id: 'athena', name: '雅典娜', title: '智慧女神', summary: '从宙斯头颅中诞生，智慧与战争女神。', color: '#e67e22', group: '奥林匹斯', x: 70, y: 56, relatedTo: ['zeus'] },
      { id: 'apollo', name: '阿波罗', title: '太阳神', summary: '光明、音乐、预言与医药之神。', color: '#f1c40f', group: '奥林匹斯', x: 50, y: 66, relatedTo: ['zeus', 'artemis'] },
      { id: 'artemis', name: '阿尔忒弥斯', title: '月神/狩猎神', summary: '阿波罗的孪生姐妹，狩猎与月亮女神。', color: '#bdc3c7', group: '奥林匹斯', x: 30, y: 66, relatedTo: ['zeus', 'apollo'] },
      { id: 'dionysus', name: '狄俄尼索斯', title: '酒神', summary: '葡萄酒与狂欢之神，戏剧的保护者。', color: '#9b59b6', group: '奥林匹斯', x: 70, y: 72, relatedTo: ['zeus'] },
      { id: 'ares', name: '阿瑞斯', title: '战神', summary: '战争与暴力之神，宙斯与赫拉之子。', color: '#c0392b', group: '奥林匹斯', x: 12, y: 70, relatedTo: ['zeus', 'hera'] },
      { id: 'aphrodite', name: '阿佛洛狄忒', title: '爱与美神', summary: '从海水泡沫中诞生，爱与美丽女神。', color: '#ff7675', group: '奥林匹斯', x: 90, y: 72, relatedTo: ['uranus'] },
      { id: 'hermes', name: '赫尔墨斯', title: '神使', summary: '众神信使，商业与小偷之神。', color: '#fdcb6e', group: '奥林匹斯', x: 12, y: 82, relatedTo: ['zeus'] },
      { id: 'hephaestus', name: '赫菲斯托斯', title: '火神', summary: '锻造与工匠之神，阿佛洛狄忒之夫。', color: '#e67e22', group: '奥林匹斯', x: 50, y: 80, relatedTo: ['zeus', 'hera', 'aphrodite'] },
      { id: 'hestia', name: '赫斯提亚', title: '灶神', summary: '家庭与炉灶女神，宙斯大姐。', color: '#dfe6e9', group: '奥林匹斯', x: 88, y: 84, relatedTo: ['cronus', 'rhea'] },
      { id: 'persephone', name: '珀耳塞福涅', title: '冥后', summary: '哈迪斯之妻，春之女神。', color: '#95a5a6', group: '冥界', x: 85, y: 66, relatedTo: ['hades', 'demeter'] },
      { id: 'demeter', name: '德墨忒尔', title: '农业女神', summary: '丰收与农业女神，珀耳塞福涅之母。', color: '#27ae60', group: '奥林匹斯', x: 30, y: 80, relatedTo: ['zeus', 'persephone'] },
    ],
  },
];

// ===== 2. 服饰演变时间线 =====
export interface IFashionItem {
  id: string;
  region: 'china' | 'west';
  era: string;
  name: string;
  description: string;
  features: string[];
  color: string;
  shape: 'robe' | 'dress' | 'tunic' | 'suit' | 'gown' | 'uniform';
}

export const FASHION_TIMELINE: IFashionItem[] = [
  // 中国
  { id: 'c-xianqin', region: 'china', era: '先秦', name: '深衣·冕服', description: '上衣下裳制，宽袍大袖，体现礼制等级。', features: ['上衣下裳', '宽袍大袖', '交领右衽', '十二章纹'], color: '#8B4513', shape: 'robe' },
  { id: 'c-qinhan', region: 'china', era: '秦汉', name: '曲裾/直裾深衣', description: '绕襟曲裾深衣流行，袍服成为常服。', features: ['曲裾绕襟', '袍服垂胡', '丝织锦绣', '冠冕制度'], color: '#A0522D', shape: 'robe' },
  { id: 'c-weijin', region: 'china', era: '魏晋', name: '褒衣博带', description: '玄学之风，大袖翩翩，名士宽衫。', features: ['宽衣博带', '袒胸露臂', '巾子幅巾', '服药宽衣'], color: '#708090', shape: 'robe' },
  { id: 'c-suitang', region: 'china', era: '隋唐', name: '圆领袍·襦裙半臂', description: '开放华丽，女子服饰丰富多彩。', features: ['圆领窄袖', '齐胸襦裙', '披帛半臂', '胡风盛行'], color: '#CD853F', shape: 'dress' },
  { id: 'c-song', region: 'china', era: '宋代', name: '褙子·抹胸', description: '清雅含蓄，褙子成为流行常服。', features: ['直领对襟', '窄袖褙子', '抹胸裹肚', '素雅简约'], color: '#4682B4', shape: 'tunic' },
  { id: 'c-ming', region: 'china', era: '明代', name: '补服·马面裙', description: '恢复汉服制度，补子区分品级。', features: ['补子品级', '马面褶裙', '云肩霞帔', '飞鱼服'], color: '#B22222', shape: 'robe' },
  { id: 'c-qing', region: 'china', era: '清代', name: '旗装·马褂', description: '剃发易服，旗人服饰成为主流。', features: ['旗装旗袍', '马蹄袖', '顶戴花翎', '瓜皮帽'], color: '#2F4F4F', shape: 'robe' },
  { id: 'c-minguo', region: 'china', era: '民国', name: '中山装·旗袍', description: '中西合璧，旗袍成为女性时尚。', features: ['中山装立领', '旗袍收腰', '学生装', '中西合璧'], color: '#191970', shape: 'uniform' },
  // 西方
  { id: 'w-greek', region: 'west', era: '古希腊', name: '希顿(Chiton)', description: '披裹式长袍，用别针固定的整块布料。', features: ['整块布料', '别针固定', '无剪裁', '自然垂褶'], color: '#D2B48C', shape: 'gown' },
  { id: 'w-roman', region: 'west', era: '古罗马', name: '托加(Toga)', description: '半圆形大袍，罗马公民的标志。', features: ['半圆形布', '缠绕式', '羊毛织物', '公民身份'], color: '#F5F5DC', shape: 'gown' },
  { id: 'w-medieval', region: 'west', era: '中世纪', name: '科特/苏尔科特', description: '宽松长袍，外罩无袖长罩衫。', features: ['长袖内袍', '无袖外罩', '腰带束腰', '教堂风格'], color: '#556B2F', shape: 'robe' },
  { id: 'w-renaissance', region: 'west', era: '文艺复兴', name: '拉夫领·紧身胸衣', description: '拉夫领轮状皱领，裙撑撑起大裙摆。', features: ['拉夫轮领', '紧身胸衣', '法新盖尔裙撑', '织锦绸缎'], color: '#8B0000', shape: 'gown' },
  { id: 'w-baroque', region: 'west', era: '巴洛克/洛可可', name: '蓬巴杜裙·假发', description: '繁复华丽，蕾丝缎带装饰登峰造极。', features: ['大型假发', '荷叶边', '蝴蝶结', '高跟鞋'], color: '#DDA0DD', shape: 'gown' },
  { id: 'w-19c', region: 'west', era: '19世纪', name: '燕尾服·克里诺林裙', description: '工业时代，男装定型燕尾服，女装大裙撑。', features: ['燕尾礼服', '克里诺林裙撑', '高顶礼帽', '紧身胸衣'], color: '#2F4F4F', shape: 'suit' },
  { id: 'w-modern', region: 'west', era: '现代', name: '西装·休闲装', description: '简约实用，现代服装体系确立。', features: ['三件套西装', '休闲运动', '牛仔裤', '高级定制'], color: '#36454F', shape: 'suit' },
];

// ===== 3. 武器演变时间线 =====
export interface IWeaponItem {
  id: string;
  era: string;
  eraYear: string;
  name: string;
  description: string;
  weapons: string[];
  icon: string; // emoji 图标
  color: string;
}

export const WEAPON_TIMELINE: IWeaponItem[] = [
  { id: 'w-old-stone', era: '旧石器时代', eraYear: '约300万-1万年前', name: '打制石器', description: '人类最早的武器，用打制方法制作石制工具。', weapons: ['石斧', '石矛', '刮削器', '尖状器'], icon: '', color: '#8B7355' },
  { id: 'w-neolithic', era: '新石器时代', eraYear: '约1万-4000年前', name: '磨制石器·弓箭', description: '磨制技术出现，弓箭发明，武器精准度大幅提升。', weapons: ['磨制石斧', '弓箭', '石镞', '骨矛'], icon: '', color: '#A0522D' },
  { id: 'w-bronze', era: '青铜时代', eraYear: '约公元前3000-前500年', name: '青铜兵器', description: '青铜冶炼技术，武器进入金属时代，战车出现。', weapons: ['青铜剑', '戈', '矛', '战车', '青铜钺'], icon: '', color: '#CD7F32' },
  { id: 'w-iron', era: '铁器时代', eraYear: '约公元前1200-公元500年', name: '铁制兵器', description: '铁器普及，武器更锋利坚固，骑兵开始兴起。', weapons: ['铁剑', '环首刀', '长矛', '盾牌', '弩'], icon: '', color: '#696969' },
  { id: 'w-middle', era: '中世纪', eraYear: '约500-1500年', name: '骑士装备', description: '重装骑士统治战场，马镫传入改变战争形态。', weapons: ['骑士长剑', '弩', '长弓', '马镫', '全身板甲'], icon: '', color: '#808080' },
  { id: 'w-gunpowder', era: '火药时代', eraYear: '约10-17世纪', name: '热兵器初现', description: '火药发明改变战争，火器逐步取代冷兵器。', weapons: ['火铳', '火绳枪', '滑膛炮', '红衣大炮', '佛郎机'], icon: '', color: '#B22222' },
  { id: 'w-industrial', era: '工业时代', eraYear: '18-19世纪', name: '工业化武器', description: '工业革命使武器量产，后装线膛武器普及。', weapons: ['来复枪', '马克沁机枪', '后装炮', '铁甲舰', '水雷'], icon: '', color: '#2F4F4F' },
  { id: 'w-ww', era: '世界大战', eraYear: '20世纪上半叶', name: '机械化战争', description: '两次世界大战，战争形态全面机械化立体化。', weapons: ['坦克', '飞机', '毒气', '潜艇', '航空母舰'], icon: '', color: '#556B2F' },
  { id: 'w-modern', era: '现代', eraYear: '二战后至今', name: '信息化武器', description: '核武器、精确制导、无人机、信息化战争。', weapons: ['导弹', '核武器', '隐形战机', '无人机', '卫星'], icon: '', color: '#191970' },
];

// ===== 4. 历史上的今天 =====
export interface IOnThisDayEvent {
  month: number;
  day: number;
  year: number;
  title: string;
  description: string;
  category: string;
  civilization?: string;
}

export const ON_THIS_DAY_EVENTS: IOnThisDayEvent[] = [
  { month: 1, day: 1, year: 1912, title: '中华民国成立', description: '孙中山在南京就任临时大总统，中华民国正式成立，结束了两千多年的封建帝制。', category: '政治', civilization: 'china' },
  { month: 1, day: 1, year: 2002, title: '欧元纸币流通', description: '欧元纸币和硬币正式进入12个欧盟成员国流通。', category: '经济', civilization: 'europe' },
  { month: 2, day: 12, year: 1912, title: '清帝退位', description: '宣统皇帝溥仪颁布退位诏书，清朝正式灭亡，中国两千年帝制终结。', category: '政治', civilization: 'china' },
  { month: 2, day: 15, year: 1564, title: '伽利略出生', description: '伽利略·伽利莱出生于意大利比萨，后世尊称"现代科学之父"。', category: '科学', civilization: 'europe' },
  { month: 3, day: 14, year: 1879, title: '爱因斯坦出生', description: '阿尔伯特·爱因斯坦出生于德国乌尔姆，相对论创立者。', category: '科学', civilization: 'europe' },
  { month: 3, day: 21, year: 1960, title: '消除种族歧视国际日', description: '南非沙佩维尔惨案，联合国将此日定为消除种族歧视国际日。', category: '社会', civilization: 'africa' },
  { month: 3, day: 22, year: 1916, title: '袁世凯取消帝制', description: '袁世凯在全国反对声中宣布取消帝制，恢复民国。', category: '政治', civilization: 'china' },
  { month: 4, day: 12, year: 1961, title: '人类首次进入太空', description: '苏联宇航员尤里·加加林乘坐东方一号飞船，成为第一个进入太空的人类。', category: '科学', civilization: 'europe' },
  { month: 4, day: 15, year: 1452, title: '达芬奇出生', description: '列奥纳多·达·芬奇出生于意大利佛罗伦萨，文艺复兴三杰之一。', category: '文化', civilization: 'europe' },
  { month: 5, day: 4, year: 1919, title: '五四运动', description: '北京学生在天安门前举行示威游行，五四运动爆发，新民主主义革命开端。', category: '政治', civilization: 'china' },
  { month: 5, day: 1, year: 1889, title: '国际劳动节', description: '第二国际宣布将每年5月1日定为国际劳动节。', category: '社会', civilization: 'global' },
  { month: 6, day: 28, year: 1914, title: '萨拉热窝事件', description: '奥匈帝国皇储斐迪南大公在萨拉热窝遇刺，成为第一次世界大战导火索。', category: '军事', civilization: 'europe' },
  { month: 6, day: 6, year: 1944, title: '诺曼底登陆', description: '盟军在法国诺曼底登陆，开辟欧洲第二战场，史上最大规模两栖登陆。', category: '军事', civilization: 'europe' },
  { month: 7, day: 4, year: 1776, title: '美国独立宣言', description: '《独立宣言》在费城通过，北美十三个殖民地宣布脱离英国独立。', category: '政治', civilization: 'america' },
  { month: 7, day: 14, year: 1789, title: '攻占巴士底狱', description: '巴黎民众攻占巴士底狱，法国大革命正式爆发。', category: '政治', civilization: 'europe' },
  { month: 7, day: 20, year: 1969, title: '人类首次登月', description: '阿波罗11号宇航员阿姆斯特朗成为第一个踏上月球的人类。', category: '科学', civilization: 'america' },
  { month: 8, day: 1, year: 1927, title: '南昌起义', description: '中国共产党在南昌发动武装起义，打响武装反抗第一枪，建军节由此确立。', category: '军事', civilization: 'china' },
  { month: 8, day: 6, year: 1945, title: '广岛原子弹', description: '美国在日本广岛投下原子弹"小男孩"，人类首次将核武器用于战争。', category: '军事', civilization: 'eastAsia' },
  { month: 8, day: 15, year: 1945, title: '日本无条件投降', description: '日本天皇裕仁宣布接受波茨坦公告，日本无条件投降，第二次世界大战结束。', category: '军事', civilization: 'global' },
  { month: 8, day: 17, year: 1945, title: '印度尼西亚独立', description: '苏加诺和哈达发表《独立宣言》，印度尼西亚共和国成立。', category: '政治', civilization: 'eastAsia' },
  { month: 9, day: 1, year: 1939, title: '二战欧洲战场爆发', description: '德国闪击波兰，第二次世界大战欧洲战场全面爆发。', category: '军事', civilization: 'europe' },
  { month: 9, day: 11, year: 2001, title: '美国911事件', description: '恐怖分子劫持民航客机撞击纽约世贸中心和华盛顿五角大楼。', category: '军事', civilization: 'america' },
  { month: 9, day: 25, year: 1949, title: '中华人民共和国成立前夕', description: '中国人民政治协商会议第一届全体会议在北平召开，定都北平并改名北京。', category: '政治', civilization: 'china' },
  { month: 10, day: 1, year: 1949, title: '中华人民共和国成立', description: '毛泽东在天安门城楼庄严宣告中华人民共和国中央人民政府成立。', category: '政治', civilization: 'china' },
  { month: 10, day: 24, year: 1945, title: '联合国成立', description: '《联合国宪章》生效，联合国正式成立，总部设在纽约。', category: '政治', civilization: 'global' },
  { month: 10, day: 2, year: 1949, title: '新中国首个国庆', description: '中华人民共和国第一个国庆日。', category: '政治', civilization: 'china' },
  { month: 11, day: 9, year: 1989, title: '柏林墙倒塌', description: '东德宣布开放边境，柏林墙倒塌，冷战走向终结。', category: '政治', civilization: 'europe' },
  { month: 11, day: 11, year: 1918, title: '一战停战', description: '德国与协约国在贡比涅森林签署停战协定，第一次世界大战结束。', category: '军事', civilization: 'europe' },
  { month: 12, day: 7, year: 1941, title: '珍珠港事件', description: '日本偷袭美国夏威夷珍珠港海军基地，太平洋战争爆发。', category: '军事', civilization: 'eastAsia' },
  { month: 12, day: 25, year: 1991, title: '苏联解体', description: '戈尔巴乔夫辞去苏联总统职务，苏联正式解体，冷战结束。', category: '政治', civilization: 'europe' },
  { month: 12, day: 25, year: 1642, title: '牛顿出生', description: '艾萨克·牛顿出生于英国林肯郡，经典物理学奠基人。', category: '科学', civilization: 'europe' },
];

// ===== 5. 冷知识卡片墙 =====
export interface IFunFact {
  id: string;
  question: string;
  answer: string;
  category: string;
  civilization: string;
}

export const FUN_FACTS: IFunFact[] = [
  { id: 'ff1', question: '宋朝GDP占全球多少？', answer: '宋朝经济总量在当时世界占比极高，但具体比例学界估算不一（麦迪森估算约22%），"80%"为网络流传说法。可以确证的是宋代城市化率达到古代中国的巅峰（约22%），商品经济、交子（纸币）、夜市、外贸都高度发达。', category: '经济', civilization: 'china' },
  { id: 'ff2', question: '埃及艳后是埃及人吗？', answer: '克利奥帕特拉是希腊人（托勒密王朝），不是埃及人。托勒密王朝是亚历山大部将建立的希腊化王朝，统治埃及近300年。', category: '人物', civilization: 'africa' },
  { id: 'ff3', question: '拿破仑真的很矮吗？', answer: '拿破仑并不矮，他的身高约1.68米，在当时法国男性平均身高（约1.65米）以上。"矮"的误解来自英制与法制长度单位不同以及英国的宣传。', category: '人物', civilization: 'europe' },
  { id: 'ff4', question: '唐朝长安有多大？', answer: '唐朝长安是当时世界最大城市，人口超百万，有西市和东市两个商业区，朱雀大街宽达150米。规划整齐，百业兴旺。', category: '城市', civilization: 'china' },
  { id: 'ff5', question: '维京人戴角盔吗？', answer: '维京人没有角盔，那是19世纪歌剧的发明。维京头盔多为圆顶护鼻式样，角盔是浪漫主义时期艺术家的想象。', category: '军事', civilization: 'europe' },
  { id: 'ff6', question: '兵马俑是彩色的吗？', answer: '兵马俑刚出土时是彩色的，有红、绿、蓝、紫、黄等多种色彩，但接触空气后迅速氧化褪色，大部分在几分钟内变成土灰色。', category: '文物', civilization: 'china' },
  { id: 'ff7', question: '古罗马人用什么洗衣服？', answer: '古罗马人用尿液洗衣服（含氨，有漂白和清洁作用），甚至有政府征收尿税（Vectigal Urinae）。维斯帕先皇帝说"钱没有味道"。', category: '生活', civilization: 'europe' },
  { id: 'ff8', question: '金字塔和猛犸象同时存在过？', answer: '金字塔建造时猛犸象还活着。吉萨大金字塔建于约公元前2560年，而最后一批猛犸象约公元前1650年才灭绝于弗兰格尔岛。', category: '古生物', civilization: 'global' },
  { id: 'ff9', question: '牛津大学有多老？', answer: '牛津大学比阿兹特克帝国还古老——牛津1096年开始有教学活动，而阿兹特克的特诺奇蒂特兰建于1325年。', category: '文化', civilization: 'europe' },
  { id: 'ff10', question: '《蒙娜丽莎》画了多久？', answer: '达芬奇画《蒙娜丽莎》画了约16年，从1503年到他去世的1519年，据研究他随身携带不断修改，至死仍未完成。', category: '艺术', civilization: 'europe' },
  { id: 'ff11', question: '一战中流感死亡多于战死？', answer: '1918年西班牙流感导致约5000万-1亿人死亡，而一战战死约1500万人。流感在全球感染人数约5亿，远超战争。', category: '医学', civilization: 'global' },
  { id: 'ff12', question: '哥伦布知道自己到了新大陆吗？', answer: '哥伦布至死都认为自己到了亚洲（印度）。他认为地球比实际小，没料到中间还有一块美洲大陆。', category: '地理', civilization: 'europe' },
  { id: 'ff13', question: '造纸术中国比欧洲早多少年？', answer: '中国的造纸术比欧洲早约1000年。蔡伦改进造纸术在公元105年左右，而欧洲直到12世纪才通过阿拉伯人学会造纸。', category: '科技', civilization: 'china' },
  { id: 'ff14', question: '古希腊人用什么洗澡？', answer: '古希腊人用橄榄油洗澡，涂满全身后用刮身板（strigil）刮掉油和污垢。他们认为水会软化身体，不如用油清洁。', category: '生活', civilization: 'europe' },
  { id: 'ff15', question: '波斯信使有多快？', answer: '波斯帝国的皇家信使（Angarium）采用驿站换马接力制，一天能跑约270公里。比现代马拉松（42公里）快数倍。', category: '交通', civilization: 'middleEast' },
  { id: 'ff16', question: '玛雅人有轮子吗？', answer: '玛雅人没有将轮子用于运输，但他们有带轮子的儿童玩具。没有大型家畜也是轮子没有实用化的原因之一。', category: '科技', civilization: 'america' },
  { id: 'ff17', question: '唐朝流行什么运动？', answer: '唐朝人酷爱马球（polo），从皇帝到贵族都热衷。唐玄宗、唐宣宗都是马球高手。还有蹴鞠、拔河、射箭等。', category: '体育', civilization: 'china' },
  { id: 'ff18', question: '中世纪欧洲人把心埋在哪？', answer: '中世纪欧洲贵族有时会把心脏单独埋葬。他们认为心脏是灵魂所在，所以有人把心埋在特别的地方，身体埋在另一处。', category: '风俗', civilization: 'europe' },
  { id: 'ff19', question: '哪个明朝皇帝给自己封官？', answer: '明武宗朱厚照给自己封了个官"总督军务威武大将军总兵官"，还改名朱寿。他极度任性，建豹房、自封将军、以征战为乐。', category: '人物', civilization: 'china' },
  { id: 'ff20', question: '印加人有文字吗？', answer: '印加帝国没有文字，用结绳记事（奇普/Quipu）。也没有货币和市场，靠"米塔制"劳役和实物分配运作。', category: '文化', civilization: 'america' },
  { id: 'ff21', question: '苏美尔人喝什么？', answer: '苏美尔人在5000年前就喝啤酒了，啤酒是他们日常饮品，工人工资也用啤酒支付。有专门的啤酒女神宁卡西。', category: '生活', civilization: 'middleEast' },
  { id: 'ff22', question: '乾隆和华盛顿同年去世？', answer: '乾隆和华盛顿同一年去世（1799年），但感觉像两个时代的人。这说明不同文明发展阶段差异极大，同一时间点可能处于完全不同的历史阶段。', category: '人物', civilization: 'global' },
  { id: 'ff23', question: '罗马斗兽场庆典杀了多少动物？', answer: '罗马斗兽场竣工时（公元80年）提图斯皇帝举行了100天庆典，杀死了约9000头动物，包括狮子、大象、犀牛、河马、长颈鹿等。', category: '社会', civilization: 'europe' },
  { id: 'ff24', question: '宋朝有外卖吗？', answer: '宋朝已经有"外卖"服务。《东京梦华录》记载，汴京市民可以从豪华饭店订餐送到家，有专人送餐服务。', category: '生活', civilization: 'china' },
  { id: 'ff25', question: '在位最久的君主是谁？', answer: '埃及法老佩皮二世6岁登基，在位94年（约公元前2278-前2184年），是历史上有记载在位最久的君主。', category: '政治', civilization: 'africa' },
  { id: 'ff26', question: '维京人到过北美吗？', answer: '维京人在北美建立的定居点比哥伦布早约500年。挪威人莱夫·埃里克松约在公元1000年到达纽芬兰，建立了"文兰"定居点。', category: '地理', civilization: 'europe' },
  { id: 'ff27', question: '拿破仑自己给自己加冕？', answer: '拿破仑加冕时自己从教皇庇护七世手中接过皇冠给自己戴上，拒绝让教皇为他加冕。这象征皇权高于神权。', category: '政治', civilization: 'europe' },
  { id: 'ff28', question: '古代奥运会运动员穿衣服吗？', answer: '古代奥运会运动员是裸体参赛的，"体操"（gymnastics）一词来自希腊语"gymnos"，意为"裸体的"。', category: '体育', civilization: 'europe' },
  { id: 'ff29', question: '科举考试有糊名法吗？', answer: '武则天时期科举制已经有了"糊名法"（密封考生姓名），防止考官徇私舞弊。比现代高考密封试卷早了1000多年。', category: '政治', civilization: 'china' },
  { id: 'ff30', question: '阿兹特克人见过马吗？', answer: '阿兹特克人在西班牙人到来前从未见过马。骑兵冲锋对他们来说如同天降神兵，造成巨大心理恐惧。', category: '军事', civilization: 'america' },
  { id: 'ff31', question: '图坦卡蒙陵墓为何著名？', answer: '图坦卡蒙的陵墓是帝王谷唯一未被盗掘的法老陵墓，1922年被霍华德·卡特发现。他19岁去世，黄金面具重约11公斤纯金。', category: '考古', civilization: 'africa' },
  { id: 'ff32', question: '长城真能从太空看见吗？', answer: '长城在太空中（近地轨道）裸眼几乎不可见。宽度只有5-10米，相当于在2公里外看一根头发丝。杨利伟也证实从太空看不到长城。', category: '地理', civilization: 'china' },
];

// ===== 6. 名言典故库 =====
export interface IQuote {
  id: string;
  text: string;
  author: string;
  source?: string;
  background?: string;
  category: 'chinese' | 'western' | 'idiom';
}

export const QUOTES: IQuote[] = [
  // 中国名言
  { id: 'q1', text: '三人行，必有我师焉。', author: '孔子', source: '《论语·述而》', background: '孔子教导弟子要虚心向他人学习，每个人都有值得学习的地方。', category: 'chinese' },
  { id: 'q2', text: '得道多助，失道寡助。', author: '孟子', source: '《孟子·公孙丑下》', background: '站在正义、仁义方面，会得到多数人的支持帮助；违背道义、仁义，必然陷于孤立。', category: 'chinese' },
  { id: 'q3', text: '千里之行，始于足下。', author: '老子', source: '《道德经》第六十四章', background: '走一千里路，是从迈第一步开始的。比喻事情是从头做起，逐步进行的。', category: 'chinese' },
  { id: 'q4', text: '路漫漫其修远兮，吾将上下而求索。', author: '屈原', source: '《离骚》', background: '追求真理的道路漫长而遥远，我将百折不挠地去探索和追求。', category: 'chinese' },
  { id: 'q5', text: '王侯将相宁有种乎！', author: '陈胜', source: '《史记·陈涉世家》', background: '陈胜吴广起义时的呐喊，意为那些称王侯拜将相的人，难道天生就比我们高贵吗？', category: 'chinese' },
  { id: 'q6', text: '人固有一死，或重于泰山，或轻于鸿毛。', author: '司马迁', source: '《报任安书》', background: '人终究免不了一死，但死的价值不同，为了正义而死就比泰山还重。', category: 'chinese' },
  { id: 'q7', text: '鞠躬尽瘁，死而后已。', author: '诸葛亮', source: '《后出师表》', background: '恭敬谨慎地为国家大事用尽我的力量，一直到死为止。', category: 'chinese' },
  { id: 'q8', text: '以铜为镜，可以正衣冠；以史为镜，可以知兴替；以人为镜，可以明得失。', author: '李世民', source: '《旧唐书·魏征传》', background: '魏征去世后唐太宗感叹：用铜作镜子可以端正衣冠，用历史作镜子可以知道兴衰，用人作镜子可以明白得失。', category: 'chinese' },
  { id: 'q9', text: '天生我材必有用，千金散尽还复来。', author: '李白', source: '《将进酒》', background: '每个人天生都有自己的价值和用途，黄金用完了还会再得来。豪放豁达的人生态度。', category: 'chinese' },
  { id: 'q10', text: '安得广厦千万间，大庇天下寒士俱欢颜。', author: '杜甫', source: '《茅屋为秋风所破歌》', background: '如何能得到千万间宽敞的大屋，普遍地庇护天下贫寒的读书人，让他们都笑逐颜开。', category: 'chinese' },
  { id: 'q11', text: '先天下之忧而忧，后天下之乐而乐。', author: '范仲淹', source: '《岳阳楼记》', background: '在天下人忧愁之前先忧愁，在天下人快乐之后才快乐。志士仁人的政治抱负。', category: 'chinese' },
  { id: 'q12', text: '人生自古谁无死，留取丹心照汗青。', author: '文天祥', source: '《过零丁洋》', background: '自古以来人终不免一死，死得要有意义，要留一片爱国丹心映照史册。', category: 'chinese' },
  { id: 'q13', text: '粉骨碎身浑不怕，要留清白在人间。', author: '于谦', source: '《石灰吟》', background: '粉身碎骨都不惧怕，甘愿把一身清白留在人世间。以石灰自喻，表达高洁志向。', category: 'chinese' },
  { id: 'q14', text: '天下兴亡，匹夫有责。', author: '顾炎武', source: '《日知录·正始》', background: '国家的兴盛与灭亡，每一个普通人都有义不容辞的责任。', category: 'chinese' },
  { id: 'q15', text: '朕为始皇帝，后世以计数，二世三世至于万世，传之无穷。', author: '秦始皇', source: '《史记·秦始皇本纪》', background: '秦始皇统一天下后规定帝号，自称"始皇帝"，期望后代按数目字计算，直至万世。', category: 'chinese' },
  { id: 'q16', text: '凡日月所照，江河所至，皆为汉土。', author: '汉宣定胡碑', source: '《后汉书》', background: '凡是日月照耀的地方，江河流经的地方，都是汉朝的疆土。彰显汉朝鼎盛时期的国力与自信。', category: 'chinese' },
  { id: 'q17', text: '明犯强汉者，虽远必诛！', author: '陈汤', source: '《汉书·陈汤传》', background: '陈汤给汉元帝的疏奏：让他们明白敢于侵犯强大汉朝的人，即使再远也一定要诛杀。', category: 'chinese' },
  { id: 'q18', text: '卧榻之侧，岂容他人鼾睡。', author: '赵匡胤', source: '《续资治通鉴长编》', background: '宋太祖赵匡胤对南唐使者说的话，意思是自己的床铺边，怎么能让别人呼呼大睡。比喻不允许别人侵犯自己的利益范围。', category: 'chinese' },
  { id: 'q19', text: '我自横刀向天笑，去留肝胆两昆仑。', author: '谭嗣同', source: '《狱中题壁》', background: '戊戌变法失败后谭嗣同临刑前在狱中墙壁上题诗，意谓横刀而出，仰天大笑，去者留者，其肝胆如昆仑山一般巍峨。', category: 'chinese' },
  { id: 'q20', text: '革命尚未成功，同志仍须努力。', author: '孙中山', source: '《总理遗嘱》', background: '孙中山临终遗言，国民革命尚未成功，各位同志仍需继续努力奋斗。', category: 'chinese' },

  // 西方名言
  { id: 'w1', text: '我思故我在。', author: '笛卡尔', source: '《第一哲学沉思集》', background: 'Cogito, ergo sum。我在思考这件事本身就证明了我的存在，近代哲学的起点。', category: 'western' },
  { id: 'w2', text: '知识就是力量。', author: '培根', source: '《新工具》', background: 'Knowledge is power。弗朗西斯·培根强调科学知识对人类改造自然的巨大力量。', category: 'western' },
  { id: 'w3', text: '吾爱吾师，吾更爱真理。', author: '亚里士多德', source: '《尼各马可伦理学》', background: '柏拉图是亚里士多德的老师，但亚里士多德在真理问题上不盲从老师。', category: 'western' },
  { id: 'w4', text: '未经审视的人生不值得过。', author: '苏格拉底', source: '《申辩篇》', background: '苏格拉底在审判时的申辩，意思是不经过反思的生活没有价值。', category: 'western' },
  { id: 'w5', text: '我来了，我看见，我征服。', author: '凯撒', source: '普鲁塔克《希腊罗马名人传》', background: 'Veni, vidi, vici。凯撒在泽拉战役后写给罗马元老院的著名捷报，用三个词概括了胜利。', category: 'western' },
  { id: 'w6', text: '罗马不是一天建成的。', author: '中世纪谚语', source: '中世纪谚语', background: 'Rome wasn\'t built in a day。比喻伟大的成就需要长时间积累和不懈努力。', category: 'western' },
  { id: 'w7', text: '这是我的立场，我别无选择。', author: '马丁·路德', source: '沃尔姆斯议会', background: '宗教改革领袖马丁·路德在神圣罗马帝国议会上的著名宣言，拒绝收回自己的观点。', category: 'western' },
  { id: 'w8', text: '自由、平等、博爱。', author: '法国大革命', source: '法国大革命口号', background: 'Liberté, Égalité, Fraternité。法国大革命的标志性口号，后成为法国国家格言。', category: 'western' },
  { id: 'w9', text: '我不同意你说的话，但我誓死捍卫你说话的权利。', author: '伏尔泰', source: '伊芙琳·比阿特丽斯·霍尔转述', background: '常被归于伏尔泰，概括了言论自由的精神。原句出自霍尔所著《伏尔泰的朋友们》。', category: 'western' },
  { id: 'w10', text: '人是生而自由的，却无往不在枷锁之中。', author: '卢梭', source: '《社会契约论》', background: '卢梭开篇名言，人天生自由，但社会制度处处束缚着人。', category: 'western' },
  { id: 'w11', text: '天才是百分之一的灵感加百分之九十九的汗水。', author: '爱迪生', source: '演讲', background: '天才的成功主要靠勤奋努力。完整原文还有"但那百分之一的灵感尤为重要"的补充。', category: 'western' },
  { id: 'w12', text: '上帝不掷骰子。', author: '爱因斯坦', source: '书信', background: '爱因斯坦对量子力学随机性的怀疑。他认为宇宙规律是确定的，而非概率性的。', category: 'western' },
  { id: 'w13', text: '不要问国家能为你做什么，要问你能为国家做什么。', author: '肯尼迪', source: '1961年就职演说', background: '美国第35任总统肯尼迪就职演说中最著名的一句话，号召公民承担责任。', category: 'western' },
  { id: 'w14', text: '唯一需要恐惧的，就是恐惧本身。', author: '罗斯福', source: '1933年就职演说', background: '富兰克林·罗斯福在大萧条中就任总统时的名言，鼓舞美国人民战胜危机。', category: 'western' },
  { id: 'w15', text: '生存还是毁灭，这是一个问题。', author: '莎士比亚', source: '《哈姆雷特》', background: 'To be, or not to be, that is the question。哈姆雷特的经典独白，探讨生命意义与行动抉择。', category: 'western' },

  // 成语典故
  { id: 'i1', text: '卧薪尝胆', author: '越王勾践', source: '《史记·越王勾践世家》', background: '越国被吴国打败后，越王勾践睡柴草、尝苦胆，发愤图强，最终灭掉吴国复仇。形容刻苦自励，发愤图强。', category: 'idiom' },
  { id: 'i2', text: '破釜沉舟', author: '项羽', source: '《史记·项羽本纪》', background: '项羽率军渡河后凿沉船只、砸破锅灶，表示决一死战不留退路。后形容下定决心，不顾一切。', category: 'idiom' },
  { id: 'i3', text: '四面楚歌', author: '项羽', source: '《史记·项羽本纪》', background: '垓下之战中，汉军夜唱楚歌瓦解楚军士气。比喻陷入四面受敌、孤立无援的境地。', category: 'idiom' },
  { id: 'i4', text: '背水一战', author: '韩信', source: '《史记·淮阴侯列传》', background: '韩信率军背靠河水布阵，断绝退路激励士兵死战，大败赵军。比喻在绝境中为求出路而决一死战。', category: 'idiom' },
  { id: 'i5', text: '指鹿为马', author: '赵高', source: '《史记·秦始皇本纪》', background: '秦相赵高指鹿为马测试群臣立场，说是鹿的大臣都被陷害。比喻颠倒黑白、混淆是非。', category: 'idiom' },
  { id: 'i6', text: '纸上谈兵', author: '赵括', source: '《史记·廉颇蔺相如列传》', background: '赵括熟读兵书却无实战经验，长平之战大败。比喻空谈理论，不能解决实际问题。', category: 'idiom' },
  { id: 'i7', text: '完璧归赵', author: '蔺相如', source: '《史记·廉颇蔺相如列传》', background: '蔺相如带和氏璧出使秦国，机智地将完好的玉璧带回赵国。比喻把原物完好地归还本人。', category: 'idiom' },
  { id: 'i8', text: '负荆请罪', author: '廉颇', source: '《史记·廉颇蔺相如列传》', background: '廉颇得知蔺相如以大局为重避让自己，深感愧疚，背着荆条上门请罪。表示主动向人认错赔罪。', category: 'idiom' },
  { id: 'i9', text: '三顾茅庐', author: '刘备', source: '《三国志·诸葛亮传》', background: '刘备三次亲自到隆中诸葛亮住处拜访，请他出山辅佐。比喻诚心诚意一再邀请。', category: 'idiom' },
  { id: 'i10', text: '草船借箭', author: '诸葛亮', source: '《三国演义》', background: '诸葛亮用草船诱敌，借得曹军十万支箭。后比喻运用智谋，凭借他人的人力或财力达到自己的目的。', category: 'idiom' },
  { id: 'i11', text: '望梅止渴', author: '曹操', source: '《世说新语》', background: '曹操行军途中士兵口渴，他说前面有梅林，士兵想到酸味口生唾液暂解口渴。比喻用空想安慰自己。', category: 'idiom' },
  { id: 'i12', text: '草木皆兵', author: '苻坚', source: '《晋书·苻坚载记》', background: '淝水之战前秦军队溃逃时，把山上的草木都当做敌兵。形容人在惊慌时疑神疑鬼。', category: 'idiom' },
  { id: 'i13', text: '闻鸡起舞', author: '祖逖', source: '《晋书·祖逖传》', background: '祖逖与刘琨相互勉励，听到鸡叫就起床练剑。比喻有志向的人及时奋发努力。', category: 'idiom' },
  { id: 'i14', text: '凿壁偷光', author: '匡衡', source: '《西京杂记》', background: '西汉匡衡家贫无烛，凿穿墙壁借邻居家灯光读书。形容家贫而读书刻苦。', category: 'idiom' },
  { id: 'i15', text: '精忠报国', author: '岳飞', source: '《宋史·岳飞传》', background: '岳飞背上刺有"尽忠报国"四字（后传为"精忠报国"）。形容为国家竭尽忠诚，牺牲一切。', category: 'idiom' },
];

// ===== 7. 历史数据排行榜 =====
export interface IRankingItem {
  id: string;
  rank: number;
  name: string;
  value: number;
  unit: string;
  civilization: string;
  color: string;
}

export interface IRankingCategory {
  id: string;
  name: string;
  description: string;
  items: IRankingItem[];
}

export const RANKINGS: IRankingCategory[] = [
  {
    id: 'territory',
    name: '疆域最大的帝国',
    description: '历史上疆域面积最大的10个帝国（单位：万平方公里）',
    items: [
      { id: 't1', rank: 1, name: '大英帝国', value: 3400, unit: '万平方公里', civilization: '欧洲', color: '#2c3e80' },
      { id: 't2', rank: 2, name: '蒙古帝国', value: 2400, unit: '万平方公里', civilization: '东亚', color: '#16a085' },
      { id: 't3', rank: 3, name: '俄罗斯帝国', value: 2280, unit: '万平方公里', civilization: '欧洲', color: '#636e72' },
      { id: 't4', rank: 4, name: '西班牙帝国', value: 1900, unit: '万平方公里', civilization: '欧洲', color: '#c0392b' },
      { id: 't5', rank: 5, name: '清朝', value: 1316, unit: '万平方公里', civilization: '中国', color: '#d4a843' },
      { id: 't6', rank: 6, name: '唐朝', value: 1230, unit: '万平方公里', civilization: '中国', color: '#e67e22' },
      { id: 't7', rank: 7, name: '阿拉伯帝国', value: 1110, unit: '万平方公里', civilization: '中东', color: '#b8860b' },
      { id: 't8', rank: 8, name: '明朝', value: 997, unit: '万平方公里', civilization: '中国', color: '#cd853f' },
      { id: 't9', rank: 9, name: '波斯帝国', value: 690, unit: '万平方公里', civilization: '中东', color: '#d4a843' },
      { id: 't10', rank: 10, name: '罗马帝国', value: 500, unit: '万平方公里', civilization: '欧洲', color: '#8b0000' },
    ],
  },
  {
    id: 'reign',
    name: '在位最久的君主',
    description: '历史上在位时间最长的君主（单位：年）',
    items: [
      { id: 'r1', rank: 1, name: '佩皮二世（埃及）', value: 94, unit: '年', civilization: '非洲', color: '#d4a843' },
      { id: 'r2', rank: 2, name: '路易十四（法国）', value: 72, unit: '年', civilization: '欧洲', color: '#2c3e80' },
      { id: 'r3', rank: 3, name: '弗朗茨·约瑟夫（奥匈）', value: 68, unit: '年', civilization: '欧洲', color: '#6b5b7a' },
      { id: 'r4', rank: 4, name: '维多利亚女王（英国）', value: 63, unit: '年', civilization: '欧洲', color: '#5a8fa8' },
      { id: 'r5', rank: 5, name: '康熙（清朝）', value: 61, unit: '年', civilization: '中国', color: '#c0392b' },
      { id: 'r6', rank: 6, name: '乾隆（清朝）', value: 60, unit: '年', civilization: '中国', color: '#d4a843' },
      { id: 'r7', rank: 7, name: '神武天皇（日本）', value: 75, unit: '年（传说）', civilization: '东亚', color: '#e67e22' },
      { id: 'r8', rank: 8, name: '巴希尔二世（拜占庭）', value: 50, unit: '年', civilization: '欧洲', color: '#708090' },
      { id: 'r9', rank: 9, name: '秦始皇（传说不计）', value: 37, unit: '年', civilization: '中国', color: '#8e44ad' },
      { id: 'r10', rank: 10, name: '伊丽莎白二世（英国）', value: 70, unit: '年', civilization: '欧洲', color: '#2980b9' },
    ],
  },
  {
    id: 'population',
    name: '人口最多的帝国',
    description: '历史上人口最多的时代/帝国（单位：亿）',
    items: [
      { id: 'p1', rank: 1, name: '清朝（19世纪）', value: 4.3, unit: '亿人', civilization: '中国', color: '#d4a843' },
      { id: 'p2', rank: 2, name: '蒙古帝国', value: 1.1, unit: '亿人', civilization: '东亚', color: '#16a085' },
      { id: 'p3', rank: 3, name: '宋朝（北宋）', value: 1.2, unit: '亿人', civilization: '中国', color: '#2c3e80' },
      { id: 'p4', rank: 4, name: '罗马帝国', value: 0.7, unit: '亿人', civilization: '欧洲', color: '#8b0000' },
      { id: 'p5', rank: 5, name: '汉朝', value: 0.6, unit: '亿人', civilization: '中国', color: '#c0392b' },
      { id: 'p6', rank: 6, name: '唐朝', value: 0.8, unit: '亿人', civilization: '中国', color: '#e67e22' },
      { id: 'p7', rank: 7, name: '莫卧儿帝国', value: 1.5, unit: '亿人', civilization: '南亚', color: '#ff7675' },
      { id: 'p8', rank: 8, name: '阿拔斯王朝', value: 0.4, unit: '亿人', civilization: '中东', color: '#b8860b' },
      { id: 'p9', rank: 9, name: '明朝', value: 0.9, unit: '亿人', civilization: '中国', color: '#cd853f' },
      { id: 'p10', rank: 10, name: '大英帝国', value: 4.58, unit: '亿人（含殖民地）', civilization: '欧洲', color: '#2c3e80' },
    ],
  },
  {
    id: 'duration',
    name: '国祚最长的王朝',
    description: '持续时间最长的王朝/帝国（单位：年）',
    items: [
      { id: 'd1', rank: 1, name: '日本皇室', value: 2600, unit: '年（传说至今）', civilization: '东亚', color: '#e67e22' },
      { id: 'd2', rank: 2, name: '拜占庭帝国', value: 1058, unit: '年', civilization: '欧洲', color: '#708090' },
      { id: 'd3', rank: 3, name: '神圣罗马帝国', value: 844, unit: '年', civilization: '欧洲', color: '#d4a843' },
      { id: 'd4', rank: 4, name: '周朝', value: 790, unit: '年', civilization: '中国', color: '#16a085' },
      { id: 'd5', rank: 5, name: '奥斯曼帝国', value: 623, unit: '年', civilization: '中东', color: '#2c3e80' },
      { id: 'd6', rank: 6, name: '朝鲜王朝', value: 518, unit: '年', civilization: '东亚', color: '#95a5a6' },
      { id: 'd7', rank: 7, name: '汉朝', value: 405, unit: '年', civilization: '中国', color: '#c0392b' },
      { id: 'd8', rank: 8, name: '宋朝', value: 319, unit: '年', civilization: '中国', color: '#2c3e80' },
      { id: 'd9', rank: 9, name: '唐朝', value: 289, unit: '年', civilization: '中国', color: '#e67e22' },
      { id: 'd10', rank: 10, name: '明朝', value: 276, unit: '年', civilization: '中国', color: '#cd853f' },
    ],
  },
];

// ===== 9. 双文明对比数据 =====
export interface IComparisonDetail {
  timeRange: string;
  capital: string;
  territory: string;
  population: string;
  politics: string;
  economy: string;
  military: string;
  culture: string;
  technology: string;
  influence: string;
}

export interface IComparisonPair {
  id: string;
  nameA: string;
  nameB: string;
  civilizationA: string;
  civilizationB: string;
  colorA: string;
  colorB: string;
  a: IComparisonDetail;
  b: IComparisonDetail;
  summary: string;
}

export const COMPARISON_DATA: IComparisonPair[] = [
  {
    id: 'han-rome',
    nameA: '汉朝',
    nameB: '罗马帝国',
    civilizationA: '中国',
    civilizationB: '欧洲',
    colorA: '#c0392b',
    colorB: '#2c3e80',
    a: {
      timeRange: '公元前202年—公元220年（约422年）',
      capital: '长安（西汉）/ 洛阳（东汉）',
      territory: '约609万平方公里',
      population: '约6000万（峰值）',
      politics: '中央集权郡县制，察举制选官，皇权至上',
      economy: '丝绸之路兴盛，冶铁业发达，重农抑商',
      military: '征兵制，强弩长戟，骑兵逐步发展，长城防御',
      culture: '罢黜百家独尊儒术，汉赋乐府，造纸术发明',
      technology: '造纸术、冶铁技术、地动仪、《九章算术》',
      influence: '奠定"汉"民族与文化认同，影响东亚两千年',
    },
    b: {
      timeRange: '公元前27年—公元476年（约503年）',
      capital: '罗马',
      territory: '约500万平方公里',
      population: '约7000万（峰值）',
      politics: '元首制→君主制，元老院与皇帝共治，行省制度',
      economy: '地中海贸易网，奴隶制大庄园经济，货币体系成熟',
      military: '职业军团制，短剑重标枪，罗马大道后勤体系',
      culture: '拉丁文学，希腊化文化，罗马法，建筑艺术',
      technology: '混凝土、高架水道、道路网、医疗体系',
      influence: '奠定西方法治、政治、文化基石，拉丁语系源头',
    },
    summary: '汉朝与罗马几乎同期鼎盛，分别是东西方世界的超级帝国。汉朝以中央集权和儒家思想构建了超稳定的大一统结构；罗马以法律和工程能力塑造了地中海秩序。两者都通过道路网络（驿道/罗马大道）和货币体系维系广袤疆域，但衰亡路径不同——汉朝亡于内部分裂，罗马亡于蛮族入侵与制度崩溃。',
  },
  {
    id: 'tang-abbasid',
    nameA: '唐朝',
    nameB: '阿拉伯帝国',
    civilizationA: '中国',
    civilizationB: '中东',
    colorA: '#e67e22',
    colorB: '#d4a843',
    a: {
      timeRange: '公元618年—907年（289年）',
      capital: '长安（今西安）',
      territory: '约1237万平方公里（鼎盛）',
      population: '约8000万（峰值）',
      politics: '三省六部制，科举制，开明包容的民族政策',
      economy: '丝绸之路鼎盛，长安成为世界最大城市，市坊制',
      military: '府兵制→募兵制，陌刀队，藩镇节度使制',
      culture: '唐诗鼎盛，书法绘画，胡风盛行，佛道儒三教并立',
      technology: '雕版印刷、火药雏形、曲辕犁、天文历法',
      influence: '中华文化圈形成，日本/朝鲜/越南全面学习唐制',
    },
    b: {
      timeRange: '公元632年—1258年（阿拔斯王朝750-1258）',
      capital: '巴格达',
      territory: '约1110万平方公里（鼎盛）',
      population: '约4000万',
      politics: '哈里发制度，政教合一，官僚体系完善',
      economy: '东西方贸易枢纽，巴格达智慧宫，金融业雏形',
      military: '圣战者+马穆鲁克奴隶兵，轻骑兵+阿拉伯弯刀',
      culture: '百年翻译运动，伊斯兰黄金时代，诗歌文学繁荣',
      technology: '代数学、天文学、医学、化学（炼金术）奠基',
      influence: '传播伊斯兰教和阿拉伯文化，保存并翻译古希腊典籍',
    },
    summary: '唐朝与阿拉伯帝国（阿拔斯王朝）是八世纪世界上最强大的两个帝国，曾在怛罗斯（今哈萨克斯坦）交战。两者都以开放包容著称：唐朝接纳各国使臣与宗教，阿拉伯帝国掀起"百年翻译运动"保存古希腊知识。经济上，两国通过丝绸之路紧密相连，长安与巴格达是当时世界上最繁华的两座城市。',
  },
  {
    id: 'ming-renaissance',
    nameA: '明朝',
    nameB: '文艺复兴',
    civilizationA: '中国',
    civilizationB: '欧洲',
    colorA: '#cd853f',
    colorB: '#9b59b6',
    a: {
      timeRange: '公元1368年—1644年（276年）',
      capital: '南京→北京',
      territory: '约997万平方公里',
      population: '约1.6亿（1600年）',
      politics: '废丞相设内阁，皇权高度集中，八股取士',
      economy: '商品经济高度发达，资本主义萌芽，白银大量流入',
      military: '卫所制，神机营（火器），郑和下西洋的远洋海军',
      culture: '小说鼎盛（四大名著三部出明），理学，心学',
      technology: '郑和宝船、火药武器成熟、《本草纲目》《天工开物》',
      influence: '郑和下西洋宣扬国威，白银流入重塑全球经济格局',
    },
    b: {
      timeRange: '公元14世纪—17世纪（约300年）',
      capital: '佛罗伦萨、威尼斯、罗马等城邦',
      territory: '分散的城邦国家',
      population: '约5000万（全欧）',
      politics: '城邦共和制，美第奇等家族赞助，教皇国并存',
      economy: '地中海贸易，银行业兴起（美第奇银行），资本主义萌芽',
      military: '雇佣兵制度，城邦间战争，火药武器开始普及',
      culture: '人文主义兴起，绘画雕塑建筑登峰造极，文学繁荣',
      technology: '古腾堡活字印刷、透视法绘画、解剖学、天文学革命',
      influence: '开启近代西方文明，为科学革命和启蒙运动奠基',
    },
    summary: '明朝与欧洲文艺复兴几乎同期，都是各自文化的高峰，但走向截然不同的道路。明朝在传统框架内达到巅峰（郑和下西洋后闭关锁国），而欧洲文艺复兴开启了向近代文明的突破（科学革命、地理大发现）。两者都有印刷术的推动——中国是雕版和早期活字，欧洲是古腾堡金属活字，但社会影响的深度与广度迥异。',
  },
];

// ===== 8. 纪年对照表数据 =====
export const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
export const SHENG_XIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 中国主要年号表 [开始年, 结束年, 朝代, 年号, 皇帝]
export const CHINESE_ERA_NAMES: [number, number, string, string, string][] = [
  [-220, -206, '秦', '始皇/二世', '嬴政/胡亥'],
  [200, 220, '东汉', '建安', '汉献帝'],
  [220, 226, '三国·魏', '黄初', '魏文帝曹丕'],
  [265, 290, '西晋', '泰始', '晋武帝司马炎'],
  [317, 322, '东晋', '建武', '晋元帝司马睿'],
  [581, 600, '隋', '开皇', '隋文帝杨坚'],
  [605, 617, '隋', '大业', '隋炀帝杨广'],
  [627, 649, '唐', '贞观', '唐太宗李世民'],
  [713, 741, '唐', '开元', '唐玄宗李隆基'],
  [742, 755, '唐', '天宝', '唐玄宗李隆基'],
  [960, 976, '北宋', '建隆', '宋太祖赵匡胤'],
  [1068, 1077, '北宋', '熙宁', '宋神宗赵顼'],
  [1127, 1162, '南宋', '建炎/绍兴', '宋高宗赵构'],
  [1368, 1398, '明', '洪武', '明太祖朱元璋'],
  [1403, 1424, '明', '永乐', '明成祖朱棣'],
  [1465, 1487, '明', '成化', '明宪宗朱见深'],
  [1567, 1572, '明', '隆庆', '明穆宗朱载坖'],
  [1573, 1620, '明', '万历', '明神宗朱翊钧'],
  [1628, 1644, '明', '崇祯', '明思宗朱由检'],
  [1644, 1661, '清', '顺治', '清世祖福临'],
  [1662, 1722, '清', '康熙', '清圣祖玄烨'],
  [1723, 1735, '清', '雍正', '清世宗胤禛'],
  [1736, 1795, '清', '乾隆', '清高宗弘历'],
  [1796, 1820, '清', '嘉庆', '清仁宗颙琰'],
  [1821, 1850, '清', '道光', '清宣宗旻宁'],
  [1851, 1861, '清', '咸丰', '清文宗奕𬣞'],
  [1862, 1874, '清', '同治', '清穆宗载淳'],
  [1875, 1908, '清', '光绪', '清德宗载湉'],
  [1909, 1911, '清', '宣统', '清逊帝溥仪'],
  [1912, 1949, '中华民国', '民国', ''],
];

// 计算干支纪年
// 注意：历史上没有公元0年，公元前1年之后直接是公元1年
// 公元4年为甲子年，公元前1年为庚申年（即公元1年的前一年，干支序号56）
export function getGanZhi(year: number): string {
  // 公元前年份：由于无公元0年，需+1调整
  // 公式：year > 0 时用 year - 4；year <= 0 时用 year - 3（等价于 year + 1 - 4）
  const adjusted = year > 0 ? year - 4 : year - 3;
  const offset = ((adjusted % 60) + 60) % 60;
  const tianGanIndex = offset % 10;
  const diZhiIndex = offset % 12;
  return TIAN_GAN[tianGanIndex] + DI_ZHI[diZhiIndex];
}

export function getShengXiao(year: number): string {
  const adjusted = year > 0 ? year - 4 : year - 3;
  const offset = ((adjusted % 12) + 12) % 12;
  return SHENG_XIAO[offset];
}

// 查找中国年号
export function getChineseEra(year: number): string {
  for (const [start, end, dynasty, era, emperor] of CHINESE_ERA_NAMES) {
    if (year >= start && year <= end) {
      const yearNum = year - start + 1;
      if (emperor) {
        return `${dynasty}·${era}${yearNum}年（${emperor}）`;
      }
      return `${dynasty}·${era}${yearNum}年`;
    }
  }
  // 如果没匹配到，尝试用朝代判断
  if (year < -221) return '先秦时期';
  if (year < -206) return '秦朝';
  if (year < 25) return '西汉';
  if (year < 220) return '东汉';
  if (year < 280) return '三国';
  if (year < 316) return '西晋';
  if (year < 420) return '东晋十六国';
  if (year < 581) return '南北朝';
  if (year < 618) return '隋朝';
  if (year < 907) return '唐朝';
  if (year < 960) return '五代十国';
  if (year < 1127) return '北宋';
  if (year < 1279) return '南宋';
  if (year < 1368) return '元朝';
  if (year < 1644) return '明朝';
  if (year < 1912) return '清朝';
  if (year < 1949) return '中华民国';
  return '中华人民共和国';
}

// 伊斯兰历转换（粗略：622年7月16日为伊斯兰历元年元旦，每年约354.367天）
export function getIslamicYear(year: number): string {
  // 简化公式：伊斯兰历 = 公历 - 622 + (公历 - 622) * 32.236 / 354.367
  // 更简单的估算法：希吉来历≈公历-622+(公历-622)/32.5
  const ah = Math.floor(year - 622 + (year - 622) / 33);
  return `伊斯兰历 ${ah} 年（约）`;
}

// 佛历：公元前544年为佛历元年
export function getBuddhistYear(year: number): string {
  return `佛历 ${year + 544} 年`;
}

// 罗马建城纪年：公元前753年为建城元年（Ab urbe condita, AUC）
export function getRomanAUC(year: number): string {
  return `罗马建城 ${year + 753} 年（AUC）`;
}

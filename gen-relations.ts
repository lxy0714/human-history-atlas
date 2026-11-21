// 批量生成 Phase 12 关系数据脚本
import { ALL_HISTORY_NODES } from './src/data/history';
import { RELATIONS, type IHistoryRelation, type RelationType } from './src/data/relations';

const idSet = new Set(ALL_HISTORY_NODES.map(n => n.id));

function check(id: string): boolean {
  return idSet.has(id);
}

// 新增关系列表
const newRels: IHistoryRelation[] = [];

function addRel(from: string, to: string, type: RelationType, label: string): boolean {
  if (!check(from) || !check(to)) {
    return false;
  }
  newRels.push({ from, to, type, label });
  return true;
}

// ============================================================
// 一、对照关系 (parallel)
// ============================================================
console.log('=== 一、对照关系 ===');

// 1. 轴心时代
console.log('轴心时代:');
const axial = [
  ['person-laozi', 'person-socrates', '轴心时代同期：中国道家 vs 希腊哲学'],
  ['person-confucius', 'person-socrates', '轴心时代同期：儒家创始人 vs 希腊哲学之父'],
  ['person-mozi', 'person-plato', '轴心时代同期：墨家兼爱 vs 柏拉图理念论'],
  ['person-mencius', 'person-aristotle', '轴心时代同期：孟子性善 vs 亚里士多德伦理学'],
  ['person-confucius', 'person-sakyamuni', '轴心时代同期：儒家入世 vs 佛教出世'],
  ['person-laozi', 'person-sakyamuni', '轴心时代同期：道家无为 vs 佛教涅槃'],
];
axial.forEach(([a, b, l]) => {
  const ok = addRel(a, b, 'parallel', l + ' | 雅斯贝尔斯轴心时代，人类精神同时突破');
  console.log(`  ${a}↔${b}: ${ok ? '✓' : '✗'}`);
});

// 2. 古典帝国并立
console.log('古典帝国:');
const classical = [
  ['han-dynasty', 'roman-empire', '古典欧亚大陆两端：汉朝与罗马帝国，中国称罗马"大秦"，罗马称中国"丝国"Seres'],
  ['eastern-han', 'roman-empire', '东汉与罗马帝国同期并立，丝绸之路两端'],
  ['han-dynasty', 'parthian-empire', '汉朝与帕提亚安息：丝路上的中转帝国'],
  ['roman-empire', 'parthian-empire', '罗马与帕提亚安息：两河流域长期对峙'],
  ['parthian-empire', 'kushan-empire', '帕提亚与贵霜：中亚两大帝国并立'],
  ['kushan-empire', 'han-dynasty', '贵霜帝国与汉朝：佛教东传通道'],
];
classical.forEach(([a, b, l]) => {
  const ok = addRel(a, b, 'parallel', l + ' | 古典欧亚四大帝国并立');
  console.log(`  ${a}↔${b}: ${ok ? '✓' : '✗'}`);
});

// 3. 大分裂同期
console.log('大分裂同期:');
const division = [
  ['dynasty-nanbeichao', 'rome-great-migration', '4-6世纪欧亚大分裂：魏晋南北朝 vs 西罗马灭亡与民族大迁徙'],
  ['five-hu', 'rome-great-migration', '五胡乱华 vs 蛮族入侵：游牧冲击欧亚两端'],
];
division.forEach(([a, b, l]) => {
  const ok = addRel(a, b, 'parallel', l);
  console.log(`  ${a}↔${b}: ${ok ? '✓' : '✗'}`);
});

// 4. 7-9世纪三强并立
console.log('7-9世纪三强:');
const triad79 = [
  ['tang-dynasty', 'abbasid', '唐与阿拔斯王朝：7-9世纪欧亚两强'],
  ['tang-dynasty', 'byzantine-empire', '唐朝与拜占庭：丝绸之路东西端点'],
  ['abbasid', 'byzantine-empire', '阿拔斯与拜占庭：中东长期对峙'],
  ['abbasid-baghdad', 'constantinople-found', '巴格达 vs 君士坦丁堡：中世纪世界级都市对照'],
];
triad79.forEach(([a, b, l]) => {
  const ok = addRel(a, b, 'parallel', l + ' | 8-9世纪世界级文明三强并立');
  console.log(`  ${a}↔${b}: ${ok ? '✓' : '✗'}`);
});

// 唐 vs 查理曼
addRel('tang-dynasty', 'carolingian-empire', 'parallel', '9世纪前后东西两大帝国：唐朝 vs 查理曼帝国（查理曼加冕800年≈唐贞元年间）');

// 5. 宋 vs 中世纪欧洲
addRel('song-dynasty', 'medieval-charlemagne', 'parallel', '宋代经济科技革命 vs 中世纪欧洲封建盛期：大分流前东方领先');

// 6. 蒙古时代
console.log('蒙古时代:');
const mongol = [
  ['mongol-empire', 'song-dynasty', '蒙古帝国征服南宋：Pax Mongolica 下的欧亚一体'],
  ['mongol-empire', 'abbasid-baghdad', '蒙古帝国西征灭阿拔斯：1258年巴格达陷落'],
  ['mongol-empire', 'europe-kievan-rus', '蒙古征服基辅罗斯：金帐汗国统治'],
];
mongol.forEach(([a, b, l]) => {
  const ok = addRel(a, b, 'parallel', l);
  console.log(`  ${a}↔${b}: ${ok ? '✓' : '✗'}`);
});

// 7. 15-16世纪
console.log('15-16世纪:');
const century1516 = [
  ['event-zhenghe', 'columbus', '15世纪航海对照：郑和下西洋（明初） vs 哥伦布大航海（1492）'],
  ['ming-dynasty', 'renaissance', '明朝中叶 vs 文艺复兴盛期：16世纪东西方文化高峰'],
  ['aztec-empire', 'ming-dynasty', '16世纪初新旧大陆文明对照：阿兹特克 vs 明帝国（随即被征服）'],
  ['inca-empire', 'ming-dynasty', '16世纪初新旧大陆文明对照：印加 vs 明帝国'],
];
century1516.forEach(([a, b, l]) => {
  const ok = addRel(a, b, 'parallel', l);
  console.log(`  ${a}↔${b}: ${ok ? '✓' : '✗'}`);
});

// 8. 三大火药帝国
console.log('三大火药帝国:');
addRel('ottoman-empire', 'safavid-persia', 'parallel', '伊斯兰三大火药帝国：奥斯曼 vs 萨法维波斯');
addRel('safavid-persia', 'mughal-empire', 'parallel', '伊斯兰三大火药帝国：萨法维波斯 vs 莫卧儿');
addRel('ottoman-empire', 'mughal-empire', 'parallel', '伊斯兰三大火药帝国：奥斯曼 vs 莫卧儿');

// 9. 18世纪大分流
addRel('qianlong-golden-age', 'enlightenment', 'parallel', '18世纪大分流：康乾盛世传统顶峰 vs 启蒙运动现代转向');
addRel('qianlong-golden-age', 'industrial-revolution', 'parallel', '18世纪大分流：康乾盛世 vs 英国工业革命，东西方命运转折');

// 10. 20世纪
console.log('20世纪:');
addRel('world-war-1', 'xinhai-revolution', 'parallel', '一战与辛亥革命：世界格局变动影响中国（巴黎和会→五四运动）');
addRel('great-depression', 'soviet-first-five-year-plan', 'parallel', '1929大萧条 vs 苏联一五计划：西方危机 vs 苏联高速工业化');
addRel('india-independence', 'africa-independence-year', 'parallel', '二战后非殖民化浪潮：印度独立 vs 非洲独立年');

console.log(`对照关系新增: ${newRels.filter(r => r.type === 'parallel').length} 条`);

// ============================================================
// 二、影响传播链 (culture + causal)
// ============================================================
console.log('\n=== 二、传播链 ===');

// 1. 造纸术西传链
const paperChain = [
  ['person-cai-lun', 'eastern-han', 'culture', '蔡伦改进造纸术于东汉'],
  ['eastern-han', 'battle-talas-751', 'causal', '怛罗斯之战唐军战俘将造纸术传至撒马尔罕'],
  ['battle-talas-751', 'abbasid', 'culture', '造纸术经阿拉伯帝国传入巴格达'],
  ['abbasid', 'byzantine-empire', 'culture', '造纸术经大马士革传入拜占庭'],
  ['byzantine-empire', 'medieval-charlemagne', 'culture', '12世纪造纸术经西班牙传入欧洲'],
  ['medieval-charlemagne', 'gutenberg', 'causal', '欧洲造纸为古腾堡印刷术奠定物质基础'],
];
paperChain.forEach(([a, b, t, l]) => {
  addRel(a, b, t as RelationType, '造纸西传：' + l);
});

// 2. 印刷术西传
const printChain = [
  ['bi-sheng', 'song-dynasty', 'culture', '毕昇发明活字印刷于北宋'],
  ['song-dynasty', 'mongol-empire', 'culture', '蒙古时代东西交流带动印刷术西传'],
  ['mongol-empire', 'gutenberg', 'culture', '印刷术西传影响古腾堡金属活字发明'],
  ['gutenberg', 'reformation', 'causal', '印刷术推动宗教改革：路德小册子广泛传播'],
  ['reformation', 'enlightenment', 'causal', '宗教改革后知识普及为启蒙运动铺垫'],
];
printChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '印刷西传：' + l);
  }
});

// 3. 火药西传
const gunpowderChain = [
  ['person-sun-simiao', 'tang-dynasty', 'culture', '唐代炼丹术中发现火药配方'],
  ['tang-dynasty', 'song-dynasty', 'causal', '火药在宋代发展为实战火器'],
  ['song-dynasty', 'mongol-empire', 'culture', '蒙古西征将火药技术传入阿拉伯（称"中国雪"）'],
  ['mongol-empire', 'ottoman-empire', 'culture', '火药技术经阿拉伯传入欧洲'],
  ['ottoman-empire', 'byzantine-empire', 'causal', '奥斯曼大炮攻克君士坦丁堡，骑士时代终结'],
];
gunpowderChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '火药西传：' + l);
  }
});

// 4. 指南针西传
const compassChain = [
  ['song-dynasty', 'mongol-empire', 'culture', '宋代航海罗盘经阿拉伯商人西传'],
  ['mongol-empire', 'ottoman-empire', 'culture', '指南针经阿拉伯传入欧洲'],
  ['ottoman-empire', 'renaissance', 'causal', '欧洲航海罗盘为大航海时代提供技术基础'],
  ['renaissance', 'columbus', 'causal', '大航海时代开启：哥伦布发现新大陆'],
];
compassChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '指南针西传：' + l);
  }
});

// 5. 佛教传播链
const buddhistChain = [
  ['person-sakyamuni', 'person-ashoka', 'culture', '阿育王派佛教使团向外传播'],
  ['person-ashoka', 'kushan-empire', 'culture', '佛教经贵霜帝国犍陀罗艺术向东传播'],
  ['kushan-empire', 'china-buddhism-introduction', 'culture', '佛教沿丝绸之路传入中国（白马寺）'],
  ['china-buddhism-introduction', 'person-faxian', 'culture', '法显西行求法'],
  ['person-faxian', 'person-xuanzang', 'culture', '玄奘继法显之后西行求法'],
  ['person-xuanzang', 'china-kentoshi-jianzhen', 'culture', '鉴真东渡将佛教传入日本'],
];
buddhistChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '佛教东传：' + l);
  }
});

// 6. 基督教传播链
const xChain = [
  ['jesus', 'reformation', 'culture', '从耶稣传教到宗教改革的两千年发展'],
  ['reformation', 'counter-reformation-jesuits', 'causal', '宗教改革推动耶稣会海外传教'],
  ['counter-reformation-jesuits', 'ming-dynasty', 'culture', '利玛窦等耶稣会士来华传教（明末）'],
];
xChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '基督教传播：' + l);
  }
});

// 7. 伊斯兰教传播链
const islamChain = [
  ['person-muhammad', 'abbasid', 'culture', '从穆罕默德创教到阿拔斯黄金时代'],
  ['abbasid', 'delhi-sultanate', 'culture', '伊斯兰教北传进入印度德里苏丹国'],
  ['delhi-sultanate', 'mughal-empire', 'culture', '莫卧儿帝国延续伊斯兰统治'],
  ['abbasid', 'sea-malacca', 'culture', '伊斯兰教经海上丝路传入东南亚（马六甲）'],
  ['abbasid', 'mali-empire', 'culture', '伊斯兰教跨撒哈拉传入西非马里帝国'],
];
islamChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '伊斯兰传播：' + l);
  }
});

// 8. 知识回流环
const knowledgeRing = [
  ['aristotle', 'abbasid-baghdad', 'culture', '希腊学术（亚里士多德等）经阿拉伯百年翻译运动保存'],
  ['abbasid-baghdad', 'medieval-charlemagne', 'culture', '阿拉伯学术经西班牙托莱多翻译院回流欧洲'],
  ['medieval-charlemagne', 'renaissance', 'causal', '希腊-阿拉伯知识回流推动欧洲文艺复兴'],
];
knowledgeRing.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '知识回流：' + l);
  }
});

// 9. 启蒙革命链
const enlightChain = [
  ['enlightenment', 'french-revolution', 'causal', '启蒙运动思想直接引发法国大革命'],
  ['french-revolution', 'haitian-revolution', 'causal', '法国大革命点燃海地革命（拉美独立先声）'],
  ['french-revolution', 'revolution-1848', 'causal', '法国大革命原则推动1848年欧洲革命'],
];
enlightChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '启蒙革命链：' + l);
  }
});

// 10. 工业革命扩散
const industrialChain = [
  ['first-industrial-revolution', 'second-industrial-revolution', 'causal', '第一次工业革命向第二次工业革命演进'],
  ['second-industrial-revolution', 'meiji-restoration', 'culture', '工业革命成果传入日本，推动明治维新'],
];
industrialChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '工业扩散：' + l);
  }
});

// 11. 红色革命链
const redChain = [
  ['person-marx', 'russian-revolution-1917', 'causal', '马克思主义理论指导十月革命'],
  ['russian-revolution-1917', 'china-may-fourth', 'causal', '十月革命一声炮响给中国送来马克思主义'],
  ['china-may-fourth', 'xinhai-revolution', 'temporal', '辛亥革命后五四运动推动思想解放'],
];
redChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '红色革命链：' + l);
  }
});

// 12. 科学革命链
const sciChain = [
  ['person-copernicus', 'galileo', 'causal', '哥白尼日心说为伽利略实验科学开辟道路'],
  ['galileo', 'person-newton', 'causal', '伽利略力学为牛顿经典力学体系奠基'],
  ['person-newton', 'person-einstein', 'causal', '牛顿经典力学被爱因斯坦相对论突破与包含'],
];
sciChain.forEach(([a, b, t, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, t as RelationType, '科学革命链：' + l);
  }
});

console.log(`传播链新增: ${newRels.filter(r => r.type === 'culture' || r.type === 'causal').length - 0} 条（含所有新增culture+causal）`);

// ============================================================
// 三、人物关系加密 (person)
// ============================================================
console.log('\n=== 三、人物关系 ===');

// 3.1 师承道统
const shicheng = [
  // 儒家道统
  ['person-confucius', 'person-zengzi', '儒家师承：孔子→曾子（传《大学》）'],
  ['person-zengzi', 'person-zisi', '儒家师承：曾子→子思（孔伋，传《中庸》）'],
  ['person-zisi', 'person-mencius', '儒家道统：子思→孟子，思孟学派'],
  ['person-confucius', 'person-yanhuig', '孔门弟子：孔子→颜回（复圣）'],
  ['person-confucius', 'person-zigong', '孔门弟子：孔子→子贡（言语科）'],
  // 希腊四代师承
  ['person-socrates', 'person-plato', '希腊哲学师承：苏格拉底→柏拉图'],
  ['person-plato', 'person-aristotle', '希腊哲学师承：柏拉图→亚里士多德（逍遥学派）'],
  ['person-aristotle', 'person-alexander', '帝王师：亚里士多德→亚历山大大帝'],
  // 宋明理学
  ['person-zhu-xi', 'person-lu-jiuyuan', '鹅湖之辩：朱熹理学 vs 陆九渊心学，论敌兼同道'],
  // 鬼谷子门下
  ['person-guiguzi', 'person-sunbin', '鬼谷门生：鬼谷子→孙膑（兵法）'],
  ['person-sunbin', 'person-pangjuan', '鬼谷同门：孙膑与庞涓，后成对手'],
];
shicheng.forEach(([a, b, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, 'person', l);
  }
});

// 3.2 君臣际遇
const junchen = [
  ['person-liubei', 'person-zhugeliang', '君臣际遇：刘备三顾茅庐得诸葛亮'],
  ['person-fujian', 'person-wangmeng', '君臣际遇：苻坚与王猛，前秦名相'],
  ['person-taizong', 'person-wei-zheng', '君臣际遇：唐太宗与魏征，贞观之治谏臣典范'],
  ['person-hanwudi', 'person-dong-zhong-shu', '君臣际遇：汉武帝采纳董仲舒"罢黜百家独尊儒术"'],
  ['person-zhu-yuanzhang', 'person-liu-bowen', '君臣际遇：朱元璋与刘伯温，明朝开国谋臣'],
  ['person-kangxi', 'person-yongzheng-reform', '父子相继：康熙→雍正，康雍乾盛世过渡'],
  ['person-bismarck', 'person-wilhelm-i', '君臣际遇：俾斯麦与威廉一世，统一德国'],
];
junchen.forEach(([a, b, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, 'person', l);
  }
});

// 3.3 对手/政敌
const duishou = [
  ['person-xiangyu', 'person-liubang', '楚汉相争：项羽 vs 刘邦，对手'],
  ['person-zhugeliang', 'person-sima-yi', '三国对手：诸葛亮 vs 司马懿，六出祁山'],
  ['person-wanganshi', 'person-sima-guang', '新旧党争：王安石 vs 司马光，变法之争'],
];
duishou.forEach(([a, b, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, 'person', l);
  }
});

// 3.4 家族世系
const jiazu = [
  ['person-cao-cao', 'person-cao-pi', '父子：曹操→曹丕，魏文帝'],
  ['person-cao-cao', 'person-cao-zhi', '父子：曹操→曹植，建安文学代表'],
  ['person-sunjian', 'person-sunce', '父子：孙坚→孙策，江东奠基'],
  ['person-sunce', 'person-sunquan', '兄弟：孙策→孙权，东吴开国'],
  ['person-nuerhachi', 'person-huangtaiji', '父子：努尔哈赤→皇太极，清朝开国'],
];
jiazu.forEach(([a, b, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, 'person', l);
  }
});

// 3.5 知己同道
const zhiji = [
  ['person-libai', 'person-dufu', '唐诗双子星：李白与杜甫，知己交游'],
  ['person-marx', 'person-engels', '革命挚友：马克思与恩格斯，共同创立马克思主义'],
];
zhiji.forEach(([a, b, l]) => {
  if (check(a) && check(b)) {
    addRel(a, b, 'person', l);
  }
});

console.log(`人物关系新增: ${newRels.filter(r => r.type === 'person').length} 条`);

// ============================================================
// 四、同城历代聚合 (geographic)
// ============================================================
console.log('\n=== 四、同城聚合 ===');

const cityNodes: Record<string, string[]> = {
  'city-changan': [
    'dynasty-western-zhou',  // 西周丰镐（近似）
    'qin-unification',       // 秦咸阳（近似）
    'han-dynasty',           // 汉长安
    'tang-dynasty',          // 唐长安
    'an-shi-rebellion',      // 安史之乱
    'person-xuanzang',       // 玄奘从长安出发
  ],
  'city-luoyang': [
    'eastern-han',           // 东汉洛阳
    'dynasty-sanguo',        // 曹魏（建都洛阳）
    'dynasty-nanbeichao',    // 北魏孝文帝迁都洛阳
    'tang-dynasty',          // 隋唐东都
  ],
  'city-kaifeng': [
    'song-dynasty',          // 北宋汴京
  ],
  'city-beijing': [
    'mongol-empire',         // 元大都
    'ming-dynasty',          // 明迁都北京
    'person-kangxi',         // 清朝北京
  ],
  'city-nanjing': [
    'ming-dynasty',          // 明初南京
    'xinhai-revolution',     // 中华民国南京
  ],
  'city-rome': [
    'roman-republic',        // 罗马共和国
    'roman-empire',          // 罗马帝国
    'rome-great-migration',  // 410年陷落
    'renaissance',           // 文艺复兴罗马
  ],
  'city-constantinople': [
    'byzantine-empire',      // 拜占庭帝国
    'abbasid-baghdad',       // 近似：东边参照
    'ottoman-empire',        // 1453年后奥斯曼伊斯坦布尔
  ],
  'city-baghdad': [
    'abbasid',               // 阿拔斯王朝建都巴格达
    'abbasid-baghdad',       // 巴格达智慧宫黄金时代
    'mongol-empire',         // 1258年旭烈兀屠城
  ],
  'city-paris': [
    'french-revolution',     // 法国大革命
    'revolution-1848',       // 1848革命
    'paris-commune',         // 巴黎公社
    'enlightenment',         // 启蒙运动中心
  ],
  'city-london': [
    'first-industrial-revolution', // 工业革命发源地
    'second-industrial-revolution',
  ],
};

let geoCount = 0;
for (const [city, nodes] of Object.entries(cityNodes)) {
  // 如果 city 节点存在，就连接
  if (!check(city)) {
    console.log(`  跳过 ${city}（节点不存在）`);
    continue;
  }
  for (const nodeId of nodes) {
    if (check(nodeId) && nodeId !== city) {
      addRel(city, nodeId, 'geographic', '同城史迹：共地关联');
      geoCount++;
    }
  }
}
console.log(`同城关系新增: ${geoCount} 条（实际写入可能更多，含 city 节点自身校验）`);

// ============================================================
// 统计输出
// ============================================================
const typeCount: Record<string, number> = {};
for (const r of newRels) {
  typeCount[r.type] = (typeCount[r.type] || 0) + 1;
}
console.log('\n=== 新增关系总览 ===');
console.log(`新增总数: ${newRels.length}`);
console.log(`类型分布:`, typeCount);

// 去重检查
const existingKeys = new Set(
  RELATIONS.map(r => `${r.from}|${r.to}|${r.type}`)
);
const deduped = newRels.filter(r => {
  const fwd = `${r.from}|${r.to}|${r.type}`;
  const rev = `${r.to}|${r.from}|${r.type}`;
  if (existingKeys.has(fwd) || existingKeys.has(rev)) return false;
  existingKeys.add(fwd);
  return true;
});
console.log(`去重后新增: ${deduped.length}`);

// 悬空检查
const dangling = deduped.filter(r => !check(r.from) || !check(r.to));
console.log(`悬空引用: ${dangling.length}`);

// 输出结果到文件
const fs = await import('fs');
const content = deduped.map(r => 
  `  { from: '${r.from}', to: '${r.to}', type: '${r.type}', label: '${r.label.replace(/'/g, "\\'")}' },`
).join('\n');

fs.writeFileSync('./tmp/new-relations.txt', content);
console.log('已写入 tmp/new-relations.txt');

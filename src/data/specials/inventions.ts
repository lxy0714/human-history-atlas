// EXPORTS: INVENTION_NODES
// 科技发明专题数据：横向时间线展示关键技术突破

export interface IInventionNode {
  id: string;
  title: string;
  year: number;
  yearDisplay: string;
  inventor: string;
  civilization: string;
  category: 'energy' | 'communication' | 'transport' | 'tools' | 'biomedical' | 'information';
  impact: string;
  description: string;
}

export const INVENTION_NODES: IInventionNode[] = [
  {
    id: 'inv-fire',
    title: '火的使用',
    year: -1000000,
    yearDisplay: '约100万年前',
    inventor: '直立人',
    civilization: '非洲/亚洲',
    category: 'energy',
    impact: '人类区别于动物的标志性能力，熟食促进脑容量增长',
    description:
      '约100万年前，直立人开始有意识地使用和保存火种。火不仅提供温暖和驱赶猛兽，更重要的是使人类能够熟食——煮熟的食物更容易消化，为大脑发育提供了更充足的能量。火是人类掌握的第一种自然力，被视为人类文明的开端。',
  },
  {
    id: 'inv-wheel',
    title: '轮子',
    year: -3500,
    yearDisplay: '约前3,500年',
    inventor: '苏美尔人',
    civilization: '两河流域',
    category: 'transport',
    impact: '彻底改变了运输和机械原理，文明的基础设施基石',
    description:
      '已知最早的轮子出现在美索不达米亚的苏美尔文明，最初用于制陶（陶轮），后来应用于车辆。轮子不仅极大提升了运输效率，更奠定了齿轮、轴承等机械原理的基础，是人类工程技术的起点。',
  },
  {
    id: 'inv-writing',
    title: '文字',
    year: -3500,
    yearDisplay: '约前3,500年',
    inventor: '苏美尔人',
    civilization: '两河流域',
    category: 'communication',
    impact: '知识得以跨代传递，历史从此有了记录',
    description:
      '苏美尔人发明了楔形文字，是已知最早的成熟书写系统。与此同时，古埃及的象形文字也大致在同一时期出现。文字使法律、契约、文学、科学能够超越口头传播的局限，积累并传承给后世，是文明的"记忆器官"。',
  },
  {
    id: 'inv-bronze',
    title: '青铜器',
    year: -3300,
    yearDisplay: '约前3,300年',
    inventor: '苏美尔/古埃及',
    civilization: '中东',
    category: 'tools',
    impact: '工具硬度革命性提升，战争和生产方式发生质变',
    description:
      '铜锡合金的青铜比纯铜更坚硬、更耐磨，可以制成锋利的兵器和耐用的工具。青铜技术的传播标志着人类从石器时代进入青铜时代，推动了社会分工和国家形态的形成。',
  },
  {
    id: 'inv-iron',
    title: '铁器',
    year: -1500,
    yearDisplay: '约前1,500年',
    inventor: '赫梯人',
    civilization: '小亚细亚',
    category: 'tools',
    impact: '铁比青铜更坚硬且分布更广，农具普及推动农业革命',
    description:
      '赫梯人是最早掌握冶铁技术的文明。铁的储量远多于铜和锡，使工具和武器不再被贵族垄断。铁制农具（特别是铁犁）大幅提升了农业生产力，推动了人口增长和社会结构变革。',
  },
  {
    id: 'inv-paper',
    title: '造纸术',
    year: 105,
    yearDisplay: '公元105年',
    inventor: '蔡伦（改进）',
    civilization: '中国（东汉）',
    category: 'communication',
    impact: '知识载体成本大幅降低，推动文化普及',
    description:
      '蔡伦用树皮、麻头、破布、渔网等廉价原料改进了造纸术，使纸张成为人人可用的书写材料。在此之前，中国用竹简和缣帛，西方用羊皮纸，都极其昂贵。造纸术后来通过阿拉伯世界传入欧洲，直接推动了文艺复兴和宗教改革时期的知识传播。',
  },
  {
    id: 'inv-printing',
    title: '活字印刷术',
    year: 1041,
    yearDisplay: '公元1041年',
    inventor: '毕昇',
    civilization: '中国（北宋）',
    category: 'communication',
    impact: '书籍批量复制成为可能，知识民主化的开端',
    description:
      '毕昇发明的泥活字印刷术是世界上最早的活字印刷。400年后，古腾堡在欧洲独立发明了金属活字印刷机，引发了信息革命——《圣经》从修道院走向普通家庭，推动了宗教改革、科学革命和启蒙运动。印刷术被麦克卢汉称为"塑造人类文明最重要的发明"。',
  },
  {
    id: 'inv-gunpowder',
    title: '火药',
    year: 850,
    yearDisplay: '公元9世纪',
    inventor: '炼丹术士',
    civilization: '中国（唐朝）',
    category: 'tools',
    impact: '战争方式彻底改变，城堡和骑士阶层走向衰落',
    description:
      '火药最初由中国炼丹术士在追求长生不老的过程中意外发现，唐末开始用于军事。火药通过蒙古西征传入阿拉伯和欧洲，火炮的出现使中世纪的城堡不再坚不可摧，骑士阶层和封建制度随之瓦解。战争从贵族骑士的个人勇武对决转变为国家组织的工业化暴力。',
  },
  {
    id: 'inv-compass',
    title: '指南针',
    year: 1100,
    yearDisplay: '公元11世纪',
    inventor: '未知',
    civilization: '中国（北宋）',
    category: 'transport',
    impact: '远洋航海成为可能，大航海时代的技术前提',
    description:
      '中国人最早发现磁石指南的特性，北宋时指南针已应用于航海。指南针传入欧洲后，配合星盘和航海图，使远洋航行不再依赖沿岸地标。没有指南针，就没有哥伦布发现美洲、麦哲伦环球航行，也就没有全球化的开端。',
  },
  {
    id: 'inv-steam',
    title: '蒸汽机',
    year: 1769,
    yearDisplay: '公元1769年',
    inventor: '詹姆斯·瓦特',
    civilization: '英国',
    category: 'energy',
    impact: '第一次工业革命的核心动力，人类进入机器时代',
    description:
      '瓦特改良的蒸汽机（不是发明，是重大改良）将热能转化为机械能，效率远超此前的纽可门蒸汽机。蒸汽机被应用于纺织、采矿、铁路、轮船，彻底改变了生产方式和社会结构。工业革命使人类从农业社会跃入工业社会，GDP和人口在200年间爆炸式增长。',
  },
  {
    id: 'inv-electricity',
    title: '电力与电灯',
    year: 1879,
    yearDisplay: '公元1879年',
    inventor: '爱迪生/特斯拉',
    civilization: '美国/欧洲',
    category: 'energy',
    impact: '第二次工业革命核心，人类征服了黑夜',
    description:
      '爱迪生改进了实用的白炽灯泡，并建立了世界上第一个电力配送系统。特斯拉发明的交流电系统则解决了远距离输电问题。电力不仅点亮了黑夜，更驱动了电动机、电报、电话、电视、电脑，是现代文明的基础设施。',
  },
  {
    id: 'inv-engine',
    title: '内燃机',
    year: 1876,
    yearDisplay: '公元1876年',
    inventor: '奥托/戴姆勒',
    civilization: '德国',
    category: 'transport',
    impact: '汽车和飞机的动力源，个人交通革命',
    description:
      '奥托发明的四冲程内燃机比蒸汽机更轻、更高效。戴姆勒和本茨随后将其应用于汽车，莱特兄弟用它驱动了飞机。内燃机彻底改变了个人交通方式，催生了石油工业和高速公路网络，重塑了城市形态和生活方式。',
  },
  {
    id: 'inv-radio',
    title: '无线电',
    year: 1895,
    yearDisplay: '公元1895年',
    inventor: '马可尼/波波夫',
    civilization: '意大利/俄国',
    category: 'communication',
    impact: '无线通信时代的开端，信息即时传遍全球',
    description:
      '马可尼首次实现了跨大西洋无线电报，波波夫也独立进行了类似实验。无线电使信息不再依赖物理传输，开创了无线通信时代。从广播到电视到手机到Wi-Fi，所有无线通信技术都可以追溯到这个发明。',
  },
  {
    id: 'inv-airplane',
    title: '飞机',
    year: 1903,
    yearDisplay: '公元1903年',
    inventor: '莱特兄弟',
    civilization: '美国',
    category: 'transport',
    impact: '人类实现飞天梦想，地球距离被大大缩短',
    description:
      '莱特兄弟在北卡罗来纳州基蒂霍克完成了人类首次动力飞行，首飞仅持续12秒、飞行36米。但就是这短短的12秒，开启了航空时代。此后不到70年，人类就登上了月球。飞机使洲际旅行从数月缩短到数小时，彻底改变了战争、商业和个人生活。',
  },
  {
    id: 'inv-penicillin',
    title: '青霉素',
    year: 1928,
    yearDisplay: '公元1928年',
    inventor: '亚历山大·弗莱明',
    civilization: '英国',
    category: 'biomedical',
    impact: '抗生素时代开启，人类平均寿命大幅延长',
    description:
      '弗莱明在偶然中发现青霉菌能杀死细菌，但大规模提纯生产是由弗洛里和钱恩在二战期间完成的。青霉素的发现使肺炎、梅毒、结核等曾经的绝症变成可治之症。抗生素被认为是20世纪医学最伟大的成就，全球人均寿命因此延长了约10年。',
  },
  {
    id: 'inv-computer',
    title: '电子计算机',
    year: 1946,
    yearDisplay: '公元1946年',
    inventor: '冯·诺依曼/图灵',
    civilization: '美国/英国',
    category: 'information',
    impact: '信息革命的基石，人类脑力的延伸',
    description:
      'ENIAC是第一台通用电子计算机，重30吨、占地167平方米、每秒运算5000次。冯·诺依曼提出的存储程序架构成为现代计算机的标准范式。图灵则从理论上证明了通用计算的可能性。计算机从军事用途发展到今天渗透到生活的每一个角落，其影响可能超过任何其他发明。',
  },
  {
    id: 'inv-internet',
    title: '互联网',
    year: 1969,
    yearDisplay: '公元1969年',
    inventor: 'ARPA',
    civilization: '美国',
    category: 'information',
    impact: '全球计算机互联互通，信息爆炸时代到来',
    description:
      '互联网起源于美国国防部的ARPANET项目，最初目的是在核战争中保持通信。后来TCP/IP协议的发明和万维网的出现使互联网从学术工具变成大众媒体。互联网使人类第一次实现了全球即时、免费的信息共享，深刻改变了经济、政治、文化和社交方式。',
  },
  {
    id: 'inv-web',
    title: '万维网',
    year: 1989,
    yearDisplay: '公元1989年',
    inventor: '蒂姆·伯纳斯-李',
    civilization: '英国（CERN）',
    category: 'information',
    impact: '互联网走向大众的关键，信息获取方式彻底改变',
    description:
      '万维网（WWW）是运行在互联网之上的超文本系统，由伯纳斯-李在欧洲核子研究中心发明。他将HTML、HTTP、URL和第一个浏览器组合在一起，使互联网从技术专家的工具变成了普通人也能使用的信息平台。伯纳斯-李放弃了专利，使万维网成为全人类的公共财富。',
  },
  {
    id: 'inv-smartphone',
    title: '智能手机',
    year: 2007,
    yearDisplay: '公元2007年',
    inventor: '苹果/乔布斯',
    civilization: '美国',
    category: 'information',
    impact: '计算机装入口袋，移动互联网时代到来',
    description:
      'iPhone的发布重新定义了手机——它不是带通话功能的PDA，而是装在口袋里的超级计算机。多点触控、App Store、移动互联网的结合，使数十亿人第一次用上了计算设备。智能手机改变了通讯、支付、社交、娱乐、导航……几乎所有领域。',
  },
  {
    id: 'inv-ai',
    title: 'AI大模型',
    year: 2022,
    yearDisplay: '公元2022年',
    inventor: 'OpenAI',
    civilization: '美国',
    category: 'information',
    impact: '通用人工智能的曙光，人类知识工作方式正在改变',
    description:
      'ChatGPT的发布标志着大语言模型走入大众视野。AI大模型能够理解和生成人类语言、编写代码、分析数据、创作文案，正在深刻改变知识工作的方式。这可能是自工业革命以来最重大的技术变革——这一次被替代的不是体力劳动，而是脑力劳动。',
  },
];

export const INVENTION_CATEGORIES = {
  energy: { name: '能源', icon: '', color: '#f39c12' },
  communication: { name: '通信', icon: '', color: '#3498db' },
  transport: { name: '交通', icon: '', color: '#e74c3c' },
  tools: { name: '工具', icon: '', color: '#9b59b6' },
  biomedical: { name: '生物医学', icon: '', color: '#27ae60' },
  information: { name: '信息', icon: '', color: '#1abc9c' },
} as const;

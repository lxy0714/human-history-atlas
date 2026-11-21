// EXPORTS: ILearningPath, ILearningPathChapter, LEARNING_PATHS
// 学习路径数据 —— 史学堂：10 条结构化学习路线


export interface ILearningPathChapter {
  id: string;
  title: string;
  subtitle?: string;
  /** 按学习顺序排列的节点 id，必须真实存在 */
  nodeIds: string[];
}

export interface ILearningPath {
  id: string;
  title: string;
  subtitle: string;
  /** 站酷小薇标题色 */
  accentColor: string;
  /** 卡片主色（与 accentColor 一致，调用方用 color 更直观） */
  color: string;
  /** emoji 图标字符串 */
  icon: string;
  description: string;
  /** 预计阅读时长（分钟） */
  durationMin: number;
  /** 预计阅读时长（小时，粗略估算，展示用） */
  estimatedHours: number;
  /** 难度等级 */
  difficulty: '入门' | '进阶' | '挑战';
  chapters: ILearningPathChapter[];
}

// 注意：nodeIds 的存在性由单测保证（见 history-slices.test.ts），
// 运行时不再做全量校验，避免静态引入 ALL_HISTORY_NODES 导致首屏体积膨胀。

type RawLearningPath = Omit<ILearningPath, 'color' | 'estimatedHours' | 'chapters'> & {
  chapters: ILearningPathChapter[];
};

const rawPaths: RawLearningPath[] = [
  // ============ 1. 中华文明通史 ============
  {
    id: 'china-general',
    title: '中华文明通史',
    subtitle: '从三皇五帝到现代中国',
    accentColor: '#c0392b',
    icon: '',
    description: '以朝代更迭为主线，串联政治、经济、文化与重要人物，系统梳理五千年中华文明的发展脉络。',
    durationMin: 60,
    difficulty: '入门',
    chapters: [
      {
        id: 'c1-origin',
        title: '文明起源与夏商周',
        subtitle: '从神话传说到礼乐制度',
        nodeIds: [
          'myth-pangu',
          'myth-nuwa',
          'myth-huangdi',
          'yellow-emperor',
          'myth-yu',
          'xia-dynasty',
          'shang-dynasty',
          'zhou-dynasty',
          'spring-autumn',
          'laozi',
          'confucius',
          'china-baijia',
        ],
      },
      {
        id: 'c2-qinhan',
        title: '秦汉大一统',
        subtitle: '帝制奠基与汉家天下',
        nodeIds: [
          'warring-states',
          'china-shangyang',
          'xiang-yu',
          'qin-unification',
          'china-qin-shihuang',
          'china-shu-tongwen',
          'china-fenshu-kengru',
          'china-liu-bang',
          'han-dynasty',
          'china-han-wudi',
          'china-zhangqian',
          'china-sima-qian',
          'eastern-han',
        ],
      },
      {
        id: 'c3-wei-jin',
        title: '魏晋南北朝分裂融合',
        subtitle: '乱世中的民族与文化交融',
        nodeIds: [
          'yellow-turban',
          'person-cao-cao',
          'three-kingdoms',
          'person-zhugeliang',
          'western-jin',
          'five-hu',
          'dynasty-nanbeichao',
        ],
      },
      {
        id: 'c4-sui-tang',
        title: '隋唐盛世',
        subtitle: '开放包容的黄金时代',
        nodeIds: [
          'sui-dynasty',
          'tang-dynasty',
          'xuanzang',
          'event-zhenguan',
          'person-taizong',
          'person-wuzetian',
          'event-kaiyuan',
          'person-libai',
          'an-shi-rebellion',
          'person-dufu',
        ],
      },
      {
        id: 'c5-song-yuan',
        title: '宋元变革',
        subtitle: '文治盛世与草原帝国',
        nodeIds: [
          'dynasty-wudaishi',
          'song-dynasty',
          'person-songtaizu',
          'yue-fei',
          'jingkang',
          'mongol-empire',
          'person-chengjisihan',
          'yuan-dynasty',
          'yashan',
        ],
      },
      {
        id: 'c6-ming',
        title: '明朝兴衰',
        subtitle: '专制强化与海上探索',
        nodeIds: [
          'ming-dynasty', 'person-zhu-yuanzhang', 'event-zhenghe',
          'wang-yangming',
        ],
      },
      {
        id: 'c7-qing',
        title: '清帝国与近代转折',
        subtitle: '康乾盛世到屈辱前夜',
        nodeIds: [
          'qing-dynasty', 'person-kangxi', 'event-kangqian',
          'opium-war', 'event-opium-war',
        ],
      },
      {
        id: 'c8-modern',
        title: '近代救亡与现代中国',
        subtitle: '从辛亥革命到改革开放',
        nodeIds: [
          'sun-yat-sen',
          'xinhai-revolution',
          'xinhai-revolution',
          'prc-founding',
          'reform-and-opening',
        ],
      },
    ],
  },

  // ============ 2. 世界文明通史 ============
  {
    id: 'world-general',
    title: '世界文明通史',
    subtitle: '从尼罗河到全球化',
    accentColor: '#2980b9',
    icon: '',
    description: '以全球视野串联各大文明的兴衰与互动，展现人类文明从分散走向整体的壮阔历程。',
    durationMin: 65,
    difficulty: '入门',
    chapters: [
      {
        id: 'c1-early',
        title: '早期文明',
        subtitle: '两河 · 埃及 · 印度河',
        nodeIds: [
          'neolithic',
          'jericho',
          'sumer-dawn',
          'sumer',
          'egypt-unification',
          'indus-valley-civilization',
          'indus-valley-civilization',
          'akkad',
          'babylon',
          'moses',
        ],
      },
      {
        id: 'c2-greco-rome',
        title: '希腊与罗马',
        subtitle: '古典文明的双璧',
        nodeIds: [
          'minos-civilization',
          'mycenaean-civilization',
          'trojan-war',
          'greek-city-states',
          'roman-republic',
          'athenian-democracy',
          'greco-persian-wars',
          'plato',
          'aristotle',
          'alexander',
          'alexander-empire',
          'rome-conquest-greece',
          'person-julius-caesar',
          'person-augustus',
          'rome-empire',
          'jesus',
        ],
      },
      {
        id: 'c3-medieval',
        title: '中世纪欧洲与伊斯兰',
        subtitle: '信仰的时代',
        nodeIds: [
          'edict-of-milan',
          'rome-split',
          'byzantine-empire',
          'western-rome-fall',
          'islam',
          'arab-empire',
          'person-charlemagne',
          'abbasid',
          'carolingian-empire',
          'viking-age',
          'verdun-treaty',
          'holy-roman-empire',
          'great-schism',
          'norman-conquest',
          'crusades',
          'magna-carta',
          'black-death',
        ],
      },
      {
        id: 'c4-exploration',
        title: '大航海时代',
        subtitle: '世界从分散走向连接',
        nodeIds: [
          'renaissance',
          'age-of-exploration',
          'da-vinci',
          'constantinople-fall',
          'gutenberg',
          'michelangelo',
          'columbus',
          'da-gama',
          'magellan',
        ],
      },
      {
        id: 'c5-revolution',
        title: '思想解放与革命',
        subtitle: '理性之光与政体巨变',
        nodeIds: [
          'protestant-reformation',
          'reformation',
          'sci-scientific-revolution',
          'british-revolution',
          'glorious-revolution',
          'enlightenment',
          'american-independence',
          'french-revolution',
          'napoleon',
          'waterloo',
        ],
      },
      {
        id: 'c6-industrial',
        title: '工业时代',
        subtitle: '机器改变世界',
        nodeIds: [
          'ottoman-empire',
          'spanish-empire',
          'mughal-empire',
          'british-empire',
          'thirty-years-war',
          'industrial-revolution',
          'first-industrial-revolution',
          'second-industrial-revolution',
        ],
      },
      {
        id: 'c7-wars',
        title: '两次世界大战',
        subtitle: '人类历史的劫难',
        nodeIds: [
          'churchill',
          'roosevelt',
          'world-war-1',
          'world-war-2',
          'atomic-bomb',
        ],
      },
      {
        id: 'c8-postwar',
        title: '战后与全球化',
        subtitle: '冷战 · 信息革命 · 地球村',
        nodeIds: [
          'wright-brothers',
          'great-depression',
          'cold-war',
          'korean-war',
          'sputnik',
          'cuban-missile-crisis',
          'apollo-11',
          'berlin-wall-fall',
          'soviet-collapse',
          'internet',
          'wto',
          'mobile-internet',
          'covid',
          'ai-revolution',
        ],
      },
    ],
  },

  // ============ 3. 改变世界的思想 ============
  {
    id: 'ideas-history',
    title: '改变世界的思想',
    subtitle: '从轴心时代到现代思潮',
    accentColor: '#8e44ad',
    icon: '',
    description: '追踪人类思想史上最具影响力的思潮与运动，看观念如何塑造制度、改变命运。',
    durationMin: 45,
    difficulty: '进阶',
    chapters: [
      {
        id: 'c1-axis',
        title: '轴心时代',
        subtitle: '东西方思想的同时觉醒',
        nodeIds: [
          'myth-indian',
          'moses',
          'laozi',
          'confucius',
          'person-socrates',
          'plato',
          'person-aristotle',
          'china-baijia',
        ],
      },
      {
        id: 'c2-religions',
        title: '三大宗教的诞生',
        subtitle: '信仰如何组织社会',
        nodeIds: [
          'moses',
          'person-sakyamuni',
          'jesus',
          'islam',
        ],
      },
      {
        id: 'c3-renaissance',
        title: '文艺复兴与人文主义',
        subtitle: '人的重新发现',
        nodeIds: [
          'thinker-dante',
          'renaissance',
          'da-vinci',
          'michelangelo',
        ],
      },
      {
        id: 'c4-reformation',
        title: '宗教改革',
        subtitle: '信仰的个人化',
        nodeIds: [
          'person-martin-luther',
          'protestant-reformation',
          'reformation',
        ],
      },
      {
        id: 'c5-science',
        title: '科学革命',
        subtitle: '理性与实验方法的确立',
        nodeIds: [
          'copernicus', 'galileo', 'newton', 'darwin', 'einstein',
        ],
      },
      {
        id: 'c6-enlightenment',
        title: '启蒙运动',
        subtitle: '理性之光驱散蒙昧',
        nodeIds: [
          'person-locke',
          'person-voltaire',
          'person-rousseau',
          'enlightenment',
        ],
      },
      {
        id: 'c7-modern',
        title: '现代思潮',
        subtitle: '民族主义 · 社会主义 · 存在主义',
        nodeIds: [
          'french-revolution',
          'communist-manifesto',
          'october-revolution',
        ],
      },
    ],
  },

  // ============ 4. 帝国兴衰录 ============
  {
    id: 'empires-rise-fall',
    title: '帝国兴衰录',
    subtitle: '八大帝国的崛起与衰落',
    accentColor: '#d4a843',
    icon: '',
    description: '对比东西方八大帝国的疆域扩张、制度创新与最终衰落，探寻超大规模共同体的兴衰规律。',
    durationMin: 50,
    difficulty: '进阶',
    chapters: [
      {
        id: 'c1-qin-han',
        title: '秦汉帝国',
        subtitle: '中华帝制的奠基',
        nodeIds: ['qin-unification', 'china-qin-shihuang', 'han-dynasty', 'china-han-wudi'],
      },
      {
        id: 'c2-rome',
        title: '罗马帝国',
        subtitle: '地中海的霸主',
        nodeIds: ['roman-republic', 'person-augustus', 'rome-empire', 'rome-split', 'western-rome-fall'],
      },
      {
        id: 'c3-tang',
        title: '大唐帝国',
        subtitle: '开放包容的东亚中心',
        nodeIds: ['tang-dynasty', 'event-zhenguan', 'person-taizong', 'event-kaiyuan', 'an-shi-rebellion'],
      },
      {
        id: 'c4-arab',
        title: '阿拉伯帝国',
        subtitle: '沙漠中崛起的政教合一',
        nodeIds: ['islam', 'arab-empire', 'abbasid'],
      },
      {
        id: 'c5-mongol',
        title: '蒙古帝国',
        subtitle: '人类史上最大的陆地帝国',
        nodeIds: ['mongol-empire', 'person-chengjisihan', 'yuan-dynasty'],
      },
      {
        id: 'c6-ottoman-mughal',
        title: '奥斯曼与莫卧儿',
        subtitle: '伊斯兰火药帝国的巅峰',
        nodeIds: ['ottoman-empire', 'constantinople-fall', 'mughal-empire'],
      },
      {
        id: 'c7-british',
        title: '大英帝国',
        subtitle: '日不落的海上霸权',
        nodeIds: ['british-empire', 'industrial-revolution', 'first-industrial-revolution'],
      },
      {
        id: 'c8-ussr-usa',
        title: '美苏两强',
        subtitle: '二十世纪的超级大国',
        nodeIds: ['cold-war', 'cuban-missile-crisis', 'berlin-wall-fall', 'soviet-collapse'],
      },
    ],
  },

  // ============ 5. 科技发明史 ============
  {
    id: 'tech-inventions',
    title: '科技发明史',
    subtitle: '从石器到 AI 的技术飞跃',
    accentColor: '#1abc9c',
    icon: '',
    description: '追踪人类技术史上最关键的发明与突破，看工具如何定义文明的高度与边界。',
    durationMin: 40,
    difficulty: '入门',
    chapters: [
      {
        id: 'c1-agriculture',
        title: '农业与冶金',
        subtitle: '新石器革命与青铜铁器',
        nodeIds: ['homo-habilis', 'homo-erectus', 'neolithic'],
      },
      {
        id: 'c2-four',
        title: '四大发明',
        subtitle: '造纸 · 印刷 · 火药 · 指南针',
        nodeIds: ['china-sima-qian', 'sci-four-inventions', 'gutenberg'],
      },
      {
        id: 'c3-navigation',
        title: '航海与印刷革命',
        subtitle: '信息与空间的双重拓展',
        nodeIds: ['event-zhenghe', 'gutenberg', 'columbus', 'da-gama', 'magellan'],
      },
      {
        id: 'c4-industrial',
        title: '第一次工业革命',
        subtitle: '蒸汽机与工厂制度',
        nodeIds: ['british-empire', 'industrial-revolution', 'first-industrial-revolution'],
      },
      {
        id: 'c5-electric',
        title: '电气时代',
        subtitle: '电力 · 内燃机 · 化学工业',
        nodeIds: ['second-industrial-revolution', 'wright-brothers'],
      },
      {
        id: 'c6-information',
        title: '信息与航天时代',
        subtitle: '计算机 · 互联网 · 太空探索',
        nodeIds: [
          'sputnik',
          'gagarin',
          'apollo-11',
          'internet',
          'mobile-internet',
          'ai-revolution',
        ],
      },
    ],
  },

  // ============ 6. 战争如何塑造世界 ============
  {
    id: 'war-shaped-world',
    title: '战争如何塑造世界',
    subtitle: '从古典战役到现代全面战争',
    accentColor: '#c0392b',
    icon: '',
    description: '以七场决定性战争/战争形态为线索，看军事技术与制度如何推动政治格局、社会结构的深层变革。',
    durationMin: 48,
    difficulty: '进阶',
    chapters: [
      {
        id: 'c1-classical',
        title: '古典战役',
        subtitle: '方阵 · 军团 · 骑兵',
        nodeIds: [
          'trojan-war',
          'greco-persian-wars',
          'alexander',
          'person-julius-caesar',
          'rome-empire',
        ],
      },
      {
        id: 'c2-medieval',
        title: '中世纪战争',
        subtitle: '骑士 · 城堡 · 十字军',
        nodeIds: [
          'viking-age',
          'norman-conquest',
          'crusades',
          'war-hundred-years',
        ],
      },
      {
        id: 'c3-mongol',
        title: '蒙古征服',
        subtitle: '草原铁骑横扫欧亚',
        nodeIds: ['mongol-empire', 'person-chengjisihan'],
      },
      {
        id: 'c4-gunpowder',
        title: '火药革命',
        subtitle: '热兵器改变战争形态',
        nodeIds: ['event-gunpowder-westward', 'opium-war'],
      },
      {
        id: 'c5-napoleon',
        title: '拿破仑战争',
        subtitle: '全民征兵与总体战的开端',
        nodeIds: ['french-revolution', 'napoleon', 'waterloo'],
      },
      {
        id: 'c6-ww',
        title: '两次世界大战',
        subtitle: '工业化全面战争的恐怖',
        nodeIds: [
          'world-war-1', 'world-war-2', 'atomic-bomb',
        ],
      },
      {
        id: 'c7-cold',
        title: '冷战',
        subtitle: '核威慑下的代理人战争',
        nodeIds: ['cold-war', 'korean-war', 'cuban-missile-crisis'],
      },
    ],
  },

  // ============ 7. 大航海与全球化 ============
  {
    id: 'globalization',
    title: '大航海与全球化',
    subtitle: '从郑和到地球村',
    accentColor: '#3498db',
    icon: '',
    description: '追踪 500 年来全球一体化的关键节点，看世界如何从分散走向紧密相连。',
    durationMin: 42,
    difficulty: '入门',
    chapters: [
      {
        id: 'c1-zheng-he',
        title: '郑和与恩里克',
        subtitle: '东西方航海先驱',
        nodeIds: ['event-zhenghe', 'event-henry-navigator'],
      },
      {
        id: 'c2-new-routes',
        title: '新航路开辟',
        subtitle: '哥伦布 · 达伽马 · 麦哲伦',
        nodeIds: ['age-of-exploration', 'columbus', 'da-gama', 'magellan'],
      },
      {
        id: 'c3-colonial',
        title: '殖民体系的建立',
        subtitle: '西班牙 · 葡萄牙 · 荷兰 · 英国',
        nodeIds: ['spanish-empire', 'british-empire', 'economy-dutch-finance'],
      },
      {
        id: 'c4-triangle',
        title: '三角贸易与物种大交换',
        subtitle: '人口与物产的全球流动',
        nodeIds: ['econ-columbian-exchange'],
      },
      {
        id: 'c5-industrial-global',
        title: '工业时代的全球扩张',
        subtitle: '自由贸易与炮舰外交',
        nodeIds: ['opium-war', 'first-industrial-revolution', 'great-depression'],
      },
      {
        id: 'c6-20th',
        title: '20 世纪全球化',
        subtitle: '布雷顿森林 · WTO · 互联网',
        nodeIds: ['econ-bretton-woods', 'internet', 'wto', 'covid'],
      },
    ],
  },

  // ============ 8. 经济与贸易史 ============
  {
    id: 'economy-trade',
    title: '经济与贸易史',
    subtitle: '从丝绸之路到全球资本',
    accentColor: '#f39c12',
    icon: '',
    description: '串联关键经济制度与贸易体系的演变，看财富如何生产、分配与流动。',
    durationMin: 44,
    difficulty: '进阶',
    chapters: [
      {
        id: 'c1-silk-road',
        title: '丝绸之路',
        subtitle: '古代世界的贸易动脉',
        nodeIds: ['zhang-qian', 'china-zhangqian', 'arab-empire', 'mongol-empire'],
      },
      {
        id: 'c2-money',
        title: '货币与钱庄',
        subtitle: '从铸币到纸币',
        nodeIds: ['economy-lydian-coinage', 'event-jiaozi'],
      },
      {
        id: 'c3-mercantilism',
        title: '重商主义与商业革命',
        subtitle: '民族国家的财富竞赛',
        nodeIds: ['spanish-empire', 'economy-dutch-finance'],
      },
      {
        id: 'c4-price',
        title: '价格革命与商业革命',
        subtitle: '美洲白银改变欧洲',
        nodeIds: ['columbus', 'spanish-empire'],
      },
      {
        id: 'c5-industrial-capital',
        title: '工业资本主义',
        subtitle: '工厂制度与自由市场',
        nodeIds: ['thinker-adam-smith', 'industrial-revolution', 'first-industrial-revolution'],
      },
      {
        id: 'c6-gold-standard',
        title: '金本位与大萧条',
        subtitle: '古典金本位的兴衰',
        nodeIds: ['roosevelt', 'great-depression'],
      },
      {
        id: 'c7-bretton-woods',
        title: '布雷顿森林体系',
        subtitle: '战后经济秩序',
        nodeIds: ['econ-bretton-woods', 'wto'],
      },
      {
        id: 'c8-contemporary',
        title: '当代全球经济',
        subtitle: '全球化与逆全球化',
        nodeIds: ['soviet-collapse', 'covid', 'ai-revolution'],
      },
    ],
  },

  // ============ 9. 宗教与神话 ============
  {
    id: 'religion-myth',
    title: '宗教与神话',
    subtitle: '信仰如何塑造文明',
    accentColor: '#9b59b6',
    icon: '',
    description: '梳理世界主要宗教与神话体系的起源、发展与相互影响，理解人类精神世界的深层结构。',
    durationMin: 40,
    difficulty: '入门',
    chapters: [
      {
        id: 'c1-primitive',
        title: '原始信仰与神话',
        subtitle: '万物有灵与创世神话',
        nodeIds: [
          'myth-pangu',
          'myth-nuwa',
          'myth-greek',
          'myth-egyptian',
          'myth-indian',
          'myth-shanhaijing',
          'myth-norse',
        ],
      },
      {
        id: 'c2-greco-roman',
        title: '希腊罗马多神教',
        subtitle: '奥林匹斯众神',
        nodeIds: ['myth-greek', 'trojan-war', 'greek-city-states', 'roman-empire'],
      },
      {
        id: 'c3-buddhism',
        title: '佛教',
        subtitle: '从印度到东亚',
        nodeIds: ['person-sakyamuni', 'maurya-empire', 'gupta-empire', 'xuanzang'],
      },
      {
        id: 'c4-christianity',
        title: '基督教',
        subtitle: '从受迫害到国教',
        nodeIds: ['rome-empire', 'jesus', 'edict-of-milan', 'great-schism'],
      },
      {
        id: 'c5-islam',
        title: '伊斯兰教',
        subtitle: '沙漠中的天启',
        nodeIds: ['islam', 'arab-empire', 'abbasid', 'ottoman-empire', 'mughal-empire'],
      },
      {
        id: 'c6-east-asia',
        title: '东亚信仰体系',
        subtitle: '儒释道与民间信仰',
        nodeIds: ['laozi', 'confucius', 'myth-daojiao', 'wang-yangming'],
      },
      {
        id: 'c7-secular',
        title: '宗教改革与世俗化',
        subtitle: '信仰的私人化',
        nodeIds: ['protestant-reformation', 'reformation', 'enlightenment'],
      },
    ],
  },

  // ============ 10. 伟大人物群像 ============
  {
    id: 'great-figures',
    title: '伟大人物群像',
    subtitle: '六类历史人物的代表',
    accentColor: '#e67e22',
    icon: '',
    description: '从思想家到艺术家，从开国帝王到科学巨匠，通过 40+ 位关键人物串起人类文明的关键节点。',
    durationMin: 55,
    difficulty: '入门',
    chapters: [
      {
        id: 'c1-thinkers',
        title: '思想家',
        subtitle: '改变观念的人',
        nodeIds: [
          'laozi',
          'confucius',
          'plato',
          'aristotle',
          'wang-yangming',
          'person-locke',
          'person-rousseau',
        ],
      },
      {
        id: 'c2-emperors',
        title: '政治家与帝王',
        subtitle: '塑造国家的人',
        nodeIds: [
          'china-qin-shihuang',
          'china-han-wudi',
          'person-augustus',
          'person-taizong',
          'person-charlemagne',
          'person-chengjisihan',
          'person-zhu-yuanzhang',
          'elizabeth-i',
          'peter-great',
          'person-kangxi',
        ],
      },
      {
        id: 'c3-generals',
        title: '军事统帅',
        subtitle: '赢得战争的人',
        nodeIds: [
          'person-alexander',
          'alexander',
          'china-weiqing-huoqubing',
          'person-julius-caesar',
          'yue-fei',
          'person-napoleon',
          'napoleon',
        ],
      },
      {
        id: 'c4-scientists',
        title: '科学家与发明家',
        subtitle: '探索自然的人',
        nodeIds: [
          'copernicus',
          'galileo',
          'newton',
          'darwin',
          'scientist-tesla',
          'einstein',
          'second-industrial-revolution',
          'wright-brothers',
          'gagarin',
        ],
      },
      {
        id: 'c5-explorers',
        title: '探险家',
        subtitle: '拓展世界的人',
        nodeIds: [
          'zhang-qian',
          'china-zhangqian',
          'xuanzang',
          'event-zhenghe',
          'columbus',
          'da-gama',
          'magellan',
        ],
      },
      {
        id: 'c6-artists',
        title: '文艺巨匠',
        subtitle: '创造美的人',
        nodeIds: [
          'person-libai',
          'person-dufu',
          'thinker-dante',
          'da-vinci',
          'michelangelo',
          'shakespeare',
        ],
      },
    ],
  },
];

// 校验并导出最终路径
export const LEARNING_PATHS: ILearningPath[] = rawPaths.map((p) => ({
  ...p,
  color: p.accentColor,
  estimatedHours: Math.max(1, Math.round(p.durationMin / 15)),
  chapters: p.chapters.map((ch) => ({
    ...ch,
    nodeIds: ch.nodeIds,
  })),
}));

/** 辅助：根据 id 查路径 */
export function findPathById(id: string): ILearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id);
}

/** 辅助：统计路径总节点数 */
export function getPathTotalNodes(path: ILearningPath): number {
  return path.chapters.reduce((sum, ch) => sum + ch.nodeIds.length, 0);
}

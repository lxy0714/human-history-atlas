// EXPORTS: ACHIEVEMENTS, type Achievement, type AchievementUnlocked
// 学习成就系统数据
// 成就徽章：解锁条件 + 描述 + 图标

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji 图标
  category: 'reading' | 'path' | 'quiz' | 'streak' | 'explore' | 'collection';
  // 判定条件类型
  conditionType:
    | 'first-read'          // 打开第一个节点详情
    | 'mastered-count'      // 掌握 N 个节点
    | 'read-count'          // 已读 N 个节点
    | 'read-all'            // 通读全部节点
    | 'path-complete-count' // 完成 N 条学习路径
    | 'first-quiz'          // 完成一次测验
    | 'quiz-perfect'        // 测验满分
    | 'short-answer-count'  // 完成 N 道简答题
    | 'streak-days'         // 连续打卡 N 天
    | 'hub-view'            // 查看枢纽节点
    | 'favorite-count';     // 收藏 N 个节点
  conditionValue: number;    // 条件数值（次数/数量/天数等）
}

export interface AchievementUnlocked {
  unlockedAt: string; // ISO 日期字符串
}

export const ACHIEVEMENTS: Achievement[] = [
  // 阅读探索类
  {
    id: 'ach-first-read',
    title: '初心',
    description: '打开第一个历史节点详情',
    icon: '',
    category: 'reading',
    conditionType: 'first-read',
    conditionValue: 1,
  },
  {
    id: 'ach-mastered-10',
    title: '小有所成',
    description: '掌握 10 个历史节点',
    icon: '',
    category: 'reading',
    conditionType: 'mastered-count',
    conditionValue: 10,
  },
  {
    id: 'ach-mastered-100',
    title: '博闻强识',
    description: '掌握 100 个历史节点',
    icon: '',
    category: 'reading',
    conditionType: 'mastered-count',
    conditionValue: 100,
  },
  {
    id: 'ach-read-300',
    title: '学海无涯',
    description: '已读 300 个历史节点',
    icon: '',
    category: 'reading',
    conditionType: 'read-count',
    conditionValue: 300,
  },
  {
    id: 'ach-read-all',
    title: '通读古今',
    description: '阅读全部历史节点',
    icon: '',
    category: 'reading',
    conditionType: 'read-all',
    conditionValue: 1,
  },
  {
    id: 'ach-hub-view',
    title: '历史枢纽',
    description: '点击查看 Top 枢纽节点',
    icon: '',
    category: 'explore',
    conditionType: 'hub-view',
    conditionValue: 1,
  },

  // 学习路径类
  {
    id: 'ach-path-first',
    title: '初窥门径',
    description: '完成第一条学习路径',
    icon: '',
    category: 'path',
    conditionType: 'path-complete-count',
    conditionValue: 1,
  },
  {
    id: 'ach-path-5',
    title: '学有所成',
    description: '完成 5 条学习路径',
    icon: '',
    category: 'path',
    conditionType: 'path-complete-count',
    conditionValue: 5,
  },

  // 测验类
  {
    id: 'ach-quiz-first',
    title: '小试牛刀',
    description: '完成一次历史测验',
    icon: '',
    category: 'quiz',
    conditionType: 'first-quiz',
    conditionValue: 1,
  },
  {
    id: 'ach-quiz-perfect',
    title: '才高八斗',
    description: '测验满分（一组选择题）',
    icon: '',
    category: 'quiz',
    conditionType: 'quiz-perfect',
    conditionValue: 1,
  },
  {
    id: 'ach-short-answer-10',
    title: '思而不学则殆',
    description: '完成 10 道简答题',
    icon: '',
    category: 'quiz',
    conditionType: 'short-answer-count',
    conditionValue: 10,
  },

  // 打卡类
  {
    id: 'ach-streak-7',
    title: '每日精进',
    description: '连续打卡 7 天',
    icon: '',
    category: 'streak',
    conditionType: 'streak-days',
    conditionValue: 7,
  },
  {
    id: 'ach-streak-30',
    title: '持之以恒',
    description: '连续打卡 30 天',
    icon: '⭐',
    category: 'streak',
    conditionType: 'streak-days',
    conditionValue: 30,
  },

  // 收藏类
  {
    id: 'ach-favorite-10',
    title: '收藏家',
    description: '收藏 10 个历史节点',
    icon: '',
    category: 'collection',
    conditionType: 'favorite-count',
    conditionValue: 10,
  },
];

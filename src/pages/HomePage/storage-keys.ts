// —— 本地存储 key 注册表（所有 scopedStorage/safeStorage/sessionStorage 业务 key 在此集中定义） ——
// 注意：key 字符串值不能改，改了老用户数据就丢了。只改引用方式。

export const StorageKeys = {
  /** 详情面板竖排阅读模式 */
  DETAIL_VERTICAL_MODE: 'detail-vertical-mode',
  /** 选择题错题本 key（与 quiz-short-answer 中的 WRONG_KEY 保持同值） */
  QUIZ_WRONG_QUESTIONS: 'history-quiz-wrong-questions',
  /** 简答题错题本 key（与 quiz-short-answer 中的 WRONG_KEY 保持同值） */
  SHORT_ANSWER_WRONG_QUESTIONS: 'history-short-answer-wrong-questions',
  /** 选择题最高分 */
  QUIZ_HIGH_SCORE: 'history-quiz-high-score',
  /** 选择题当前连续正确 */
  QUIZ_CURRENT_STREAK: 'history-quiz-current-streak',
  /** 选择题最高连续正确 */
  QUIZ_BEST_STREAK: 'history-quiz-best-streak',
  /** 成就数据 */
  ACHIEVEMENTS: 'history-achievements-v1',
  /** 探索过的节点 */
  EXPLORED_NODES: 'history-explored-nodes',
  /** 收藏节点 */
  FAVORITE_NODES: 'history-favorite-nodes',
  /** 视图模式（timeline/map/list） */
  VIEW_MODE: 'history-view-mode',
  /** 缩放级别（时间线） */
  TIMELINE_ZOOM: 'history-timeline-zoom',
  /** 已解锁专题 */
  UNLOCKED_SPECIALS: 'history-unlocked-specials',
} as const;

export type StorageKey = typeof StorageKeys[keyof typeof StorageKeys];

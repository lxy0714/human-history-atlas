// —— 自定义事件名常量（dispatch / addEventListener 统一引用） ——

export const AppEvents = {
  /** 打开历史投影仪 */
  OPEN_PROJECTOR: 'open-projector',
  /** 聚焦搜索框 */
  FOCUS_SEARCH: 'focus-search',
  /** 导航到指定专题 */
  NAVIGATE_SPECIAL_TOPIC: 'navigate-special-topic',
  /** 文明图谱筛选变更（派发/监听双方用） */
  ATLAS_FILTER: 'atlas-filter',
  /** 主题切换（派发方在应用外层，这里只做监听端常量） */
  THEME_CHANGE: 'themechange',
} as const;

export type AppEventName = typeof AppEvents[keyof typeof AppEvents];

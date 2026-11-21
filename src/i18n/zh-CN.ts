// EXPORTS: zhCN, t
// 界面文案语言包（仅 UI 文案，不含历史数据内容）
// 多语言预留：后续新增语言文件即可，如 en-US.ts

export const zhCN = {
  // 通用
  common: {
    loading: '加载中...',
    error: '出错了',
    back: '返回',
    close: '关闭',
    search: '搜索',
    clear: '清除',
    filter: '筛选',
    all: '全部',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    more: '更多',
    copy: '复制',
    copied: '已复制',
  },

  // 导航
  nav: {
    timeline: '时间轴',
    map: '卫星地图',
    list: '列表视图',
    specialHall: '专题馆',
    searchPlaceholder: '搜索历史节点...',
    randomExplore: '随机探索',
    settings: '设置',
  },

  // 时代
  era: {
    ancient: '上古',
    classical: '古典',
    medieval: '中世纪',
    exploration: '大航海',
    industrial: '工业革命',
    modern: '近现代',
    contemporary: '当代',
  },

  // 文明
  civilization: {
    china: '中国',
    europe: '欧洲',
    middleEast: '中东',
    southAsia: '南亚',
    eastAsia: '东亚其他',
    america: '美洲',
    africa: '非洲',
    global: '全球',
  },

  // 分类
  category: {
    politics: '政治',
    military: '军事',
    science: '科技',
    culture: '文化',
    myth: '神话',
    artifact: '文物',
  },

  // 视图
  view: {
    density: '密度',
    comfortable: '舒适',
    compact: '紧凑',
    play: '播放',
    pause: '暂停',
    speed: '速度',
    favorites: '收藏',
    about: '关于',
  },

  // 详情面板
  detail: {
    summary: '概要',
    description: '详细介绍',
    relatedNodes: '关联节点',
    tags: '专题标签',
    timeScale: '时间标尺',
    addFavorite: '收藏',
    removeFavorite: '取消收藏',
    disputed: '学界争议',
    important: '重要节点',
    person: '人物',
    myth: '神话',
    dynasty: '朝代',
    event: '事件',
    artifact: '文物',
    prevNode: '上一个节点',
    nextNode: '下一个节点',
    toc: '文章目录',
  },

  // 专题馆
  special: {
    title: '专 题 馆',
    subtitle: '选择一个专题，深入探索历史的某一面',
    back: '返回专题馆',
  },

  // 提示
  toast: {
    offlineReady: '已缓存历史数据，可离线浏览',
    copied: '已复制到剪贴板',
    addedToFavorites: '已添加到收藏',
    removedFromFavorites: '已从收藏中移除',
  },
};

export type I18nKey = string;

/**
 * 简易翻译函数
 * 支持嵌套路径：t('nav.timeline') → '时间轴'
 * 未找到时返回 key 本身
 */
export function t(key: string): string {
  const parts = key.split('.');
  let current: unknown = zhCN;
  for (const part of parts) {
    if (
      current &&
      typeof current === 'object' &&
      part in (current as Record<string, unknown>)
    ) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
}

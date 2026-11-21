// EXPORTS: ITopbarConfig, MOCK_TOPBAR_CONFIG
export interface ITopbarConfig {
  id: string
  logoText: string
  logoSubtitle: string
  searchPlaceholder: string
  viewModes: { key: 'timeline' | 'map' | 'list'; label: string; icon: string }[]
  playbackSpeeds: { label: string; value: 0.5 | 1 | 2 }[]
}

export const MOCK_TOPBAR_CONFIG: ITopbarConfig = {
  id: '1',
  logoText: '全球历史全景',
  logoSubtitle: '人类文明时间地图',
  searchPlaceholder: '搜索人物、事件、朝代、文物...',
  viewModes: [
    { key: 'timeline', label: '时间轴', icon: 'clock' },
    { key: 'map', label: '地图', icon: 'map' },
    { key: 'list', label: '百科', icon: 'book-open' },
  ],
  playbackSpeeds: [
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
  ],
}
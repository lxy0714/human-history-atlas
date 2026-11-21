// 英文正文分片映射表
// 已译的 shard 在这里登记，未译的不登记 → 自动回退中文
// EXPORTS: EN_SHARD_BODY_IMPORTS

export const EN_SHARD_BODY_IMPORTS: Record<string, () => Promise<{ BODY_MAP: Record<string, string> }>> = {
  'prehistoric-others': () => import('./bodies/en/shards/prehistoric-others'),
  'ancient-others': () => import('./bodies/en/shards/ancient-others'),
};

// 当前已译 shard 列表（用于进度统计）
export const TRANSLATED_EN_SHARDS: string[] = Object.keys(EN_SHARD_BODY_IMPORTS);

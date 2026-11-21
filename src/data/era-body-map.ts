// AUTO-GENERATED FILE — 不要手动编辑
// eraId 到正文文件的映射，用于动态 import
// EXPORTS: ERA_BODY_IMPORTS

export const ERA_BODY_IMPORTS: Record<string, () => Promise<{ BODY_MAP: Record<string, string> }>> = {
  'prehistoric': () => import('./bodies/prehistoric'),
  'ancient': () => import('./bodies/ancient'),
  'classical': () => import('./bodies/classical'),
  'medieval': () => import('./bodies/medieval'),
  'earlyModern': () => import('./bodies/earlyModern'),
  'industrial': () => import('./bodies/industrial'),
  'modern': () => import('./bodies/modern'),
};

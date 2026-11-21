// EXPORTS: TIMELINE_VIEW
// TimelineView / SwimLaneView 通用常量：聚合阈值、尺寸、动画参数等

// —— 聚合簇阈值（按 zoom 档位 1-5，值越大越不聚合，9999=完全展开） ——
/** zoom 档位 1（最粗）：聚合阈值 */
export const CLUSTER_THRESHOLD_ZOOM_1 = 3;
/** zoom 档位 2：聚合阈值 */
export const CLUSTER_THRESHOLD_ZOOM_2 = 8;
/** zoom 档位 3：聚合阈值 */
export const CLUSTER_THRESHOLD_ZOOM_3 = 18;
/** zoom 档位 4：聚合阈值 */
export const CLUSTER_THRESHOLD_ZOOM_4 = 40;
/** zoom 档位 5（最细）：完全展开，不聚合 */
export const CLUSTER_THRESHOLD_ZOOM_5 = 9999;
/** 聚合比例比较阈值（决定是否归入同一簇） */
export const CLUSTER_COMPARE_THRESHOLD = 1.1;
/** 聚合比例反向阈值 */
export const CLUSTER_COMPARE_THRESHOLD_REV = 0.9;

// —— 泳道视图尺寸 ——
/** 单条泳道宽度（像素） */
export const LANE_WIDTH = 180;
/** 时代标签列宽度（像素） */
export const ERA_LABEL_WIDTH = 72;
/** 泳道头部吸顶阈值（像素） */
export const LANE_HEADER_STICKY_OFFSET = 44;
/** 左侧文明标签吸顶阈值（像素） */
export const LANE_SIDE_STICKY_OFFSET = 60;
/** 隐藏文明的泳道透明度 */
export const LANE_HIDDEN_OPACITY = 0.45;

// —— 滚动与交互 ——
/** 回到顶部按钮出现阈值（滚动距离，像素） */
export const BACK_TO_TOP_THRESHOLD = 400;
/** 触摸响应区最小尺寸（像素） */
export const TOUCH_TARGET_MIN = 40;

// —— 动画时长（毫秒） ——
/** 短动画时长 */
export const ANIM_DURATION_SHORT = 100;
/** 中动画时长 */
export const ANIM_DURATION_MEDIUM = 300;
/** 长动画时长 */
export const ANIM_DURATION_LONG = 1000;

// —— 迷你图尺寸 ——
/** 迷你图宽度（像素） */
export const MINI_CHART_WIDTH = 200;
/** 迷你图高度（像素） */
export const MINI_CHART_HEIGHT = 120;
/** 迷你图内边距（像素） */
export const MINI_CHART_PADDING = 10;

// —— 疆域透明度（EmpireLayer）——
/** 疆域多边形填充透明度（常态） */
export const EMPIRE_FILL_OPACITY = 0.22;
/** 疆域多边形描边透明度（常态） */
export const EMPIRE_STROKE_OPACITY = 0.85;
/** 疆域悬停时填充透明度 */
export const EMPIRE_HOVER_FILL_OPACITY = 0.4;
/** 疆域悬停时描边宽度（像素） */
export const EMPIRE_HOVER_STROKE_WIDTH = 2.5;

// —— 路线动画（RoutePanel）——
/** 路线播放每帧步长比例（0-1） */
export const ROUTE_ANIM_STEP = 0.008;
/** 路线标记透明度 */
export const ROUTE_MARKER_OPACITY = 0.9;
/** 路线 fitBounds 内边距（像素） */
export const ROUTE_FIT_PADDING = 50;

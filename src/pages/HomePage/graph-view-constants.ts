// EXPORTS: GRAPH_VIEW
// 图谱视图通用常量：缩放范围、动画参数、样式阈值等
// 供 RelationGraphModal / PersonEgoGraph / 未来图谱类组件复用

// —— 缩放与视图 ——
/** 图谱默认最小缩放比例 */
export const GRAPH_MIN_SCALE = 0.3;
/** 图谱默认最大缩放比例 */
export const GRAPH_MAX_SCALE = 3;
/** 滚轮单次缩放步长（乘算） */
export const GRAPH_WHEEL_ZOOM_STEP = 0.9;
/** 按钮缩放步长（乘算） */
export const GRAPH_BUTTON_ZOOM_STEP = 1.2;
/** 力导向布局重力系数（负值为向心） */
export const FORCE_GRAVITY = 0.003;
/** 力导向布局速度阻尼（0-1，越大衰减越快） */
export const FORCE_DAMPING = 0.85;
/** 力导向布局节点斥力系数 */
export const FORCE_REPULSION = 1200;
/** 力导向布局弹簧距离（像素） */
export const FORCE_LINK_DISTANCE = 140;
/** 力导向布局弹簧刚度 */
export const FORCE_SPRING_K = 0.02;

// —— 节点尺寸 ——
/** 中心节点半径（像素） */
export const NODE_CENTER_RADIUS = 36;
/** 一级节点半径（像素） */
export const NODE_LEVEL1_RADIUS = 22;
/** 一级节点分布环半径（像素） */
export const NODE_LEVEL1_RING_RADIUS = 150;
/** 一级节点最大数量 */
export const NODE_LEVEL1_MAX = 12;
/** 二级节点最大数量 */
export const NODE_LEVEL2_MAX = 20;
/** 二级节点分布环平均半径（像素） */
export const NODE_LEVEL2_RING_RADIUS = 280;
/** 二级节点分布环半径波动幅度（像素） */
export const NODE_LEVEL2_RING_JITTER = 40;

// —— 力导向布局层级参数（环形分布初始位置） ——
export const LAYOUT_LEVEL1_RADIUS = 110;
export const LAYOUT_LEVEL2_RADIUS = 200;

// —— 连线样式 ——
/** 连线主透明度 */
export const LINK_OPACITY_MAIN = 0.9;
/** 连线次透明度 */
export const LINK_OPACITY_SECONDARY = 0.5;
/** 节点填充透明度 */
export const NODE_FILL_OPACITY = 0.2;

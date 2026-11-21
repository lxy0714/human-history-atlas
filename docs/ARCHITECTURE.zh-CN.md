# 架构说明

[English](ARCHITECTURE.md) · **简体中文**

人类文明时间地图 · [返回 README](../README.zh-CN.md)

---

本文说明应用是怎么搭起来的，以及那些不显然的决策**为什么**这么定。如果只读一节，读第三节（加载）与第七节（不变量）。

## 一、系统形态

```
┌─────────────────────────────────────────────────────────┐
│  静态托管（任意）                                        │
│  index.html + assets/  —— 无服务器、无数据库             │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼────────┐                 ┌────────▼─────────┐
│  首屏          │                 │  懒加载 chunk    │
│  23 个文件     │                 │  视图 + 正文     │
│  index + 时代  │                 │  29 个时代分片   │
│  元数据        │                 │  4 个重视图      │
└───────┬────────┘                 └────────┬─────────┘
        │                                   │
        └─────────────────┬─────────────────┘
                          │
              ┌───────────▼───────────┐
              │  带类型的 TS 数据层   │
              │  history.ts（源）     │
              │  history-index.ts     │
              │  （生成）             │
              └───────────────────────┘
```

**没有后端。** 内容是 TypeScript，编译成 JS chunk，作为静态文件取用。这是影响最深远的架构选择，第二节解释它。

## 二、内容即代码

261 万字的内容库以带类型的 TypeScript 存在 `src/data/`，不在数据库里。

**换来了什么：**

- 每一处史实修正都是**可评审的 diff**。在历史项目里，编辑的可审计性比编辑便利性更值钱。
- 关联是**过类型检查的**。悬空的 `relatedNodeIds` 是编译/测试错误，不是运行时惊喜。
- 整座图谱是**静态产物**。谁都能托管、fork、归档。不用迁移、不用导出、不用 API key。
- 内容与代码同版本。任意 commit 检出都是一座完整自洽的图谱。

**代价是什么：**

- 没有编辑界面。贡献者得会 git。
- 仓库体积大（内容库占大头）。
- 加内容要重新构建。

对本项目这个交换是对的。对一个有几千名随手编辑者的 wiki 就不对。

### 三个数据层

| 层 | 文件 | 加载时机 | 内容 |
|---|---|---|---|
| **索引** | `history-index.ts`（**生成**） | 首屏 | id、标题、年份、文明、分类、时代、坐标、摘要、关联 id、`hasBody`、`shardKey` |
| **完整节点** | `history.ts` | 按需 | 以上全部加完整描述 |
| **正文** | `bodies/shards/*.ts` | 打开节点时 | 长文，按节点 id 索引 |

`history-index.ts` 文件头写明它由 `scripts/generate-body-shards.mts` **自动生成**。永远别手改。改 `history.ts` 再重新生成。

索引导出 `ERAS`、`HISTORY_NODES_INDEX`（精选子集）、`ALL_HISTORY_NODES_INDEX`（全部 763）、`CIVILIZATIONS`、`CATEGORIES`、`CIVILIZATION_COLORS`、`ERA_IDS`。

> **计数陷阱：** `HISTORY_NODES_INDEX` 与 `ALL_HISTORY_NODES_INDEX` 是同一文件里的两个数组。整文件数 `"id"` 出现次数会得到 **1005** 而不是 763——精选子集被重复计了一遍，再加 7 个时代 id。计数前务必先切到 `ALL_HISTORY_NODES_INDEX` 段。

## 三、加载策略——性能内核

### 3.1 首屏：精确 23 个文件

干净加载取 **23 个文件**（22 个 JS + 1 个 CSS）。这由测试断言，不是愿景。

四个重 chunk 被**明确禁止**进首屏：

- `MapView`
- `ListView`
- `SpecialHall`
- `empires`
- `HistoryProjector`

它们原本被预取，为用户可能永远不打开的视图付出了首屏传输的 **10.63%**。摘掉那次预取是实测收益。

### 3.2 正文分片

长文切成 **29 个时代分片**，过大的再做二级拆分。打开一个节点只取它所在的分片。

`IHistoryNodeIndex extends IHistoryNode`，多两个字段：

- `hasBody?: boolean` —— 是否有正文（当前 763 个全为 true）
- `shardKey?: string` —— 该取哪个分片

### 3.3 双层 gzip 门禁

每项预算都有 **WARN** 与 **FAIL** 两档，口径是 `gzipSync(level 9)`：

| 产物 | WARN | FAIL |
|---|---|---|
| `history-index` | 134,000 | 152,000 |
| 主 `index` | 92,000 | 104,000 |
| CSS | 54,000 | 62,000 |
| 首屏合计 | 669,000 | 760,000 |

单个分片软上限 110,000。**`medieval-china-a` 当前 109,334——余量 666 字节（0.61%）**，已标 NEAR，需要拆分。

**称重要称对：** 用 `curl -H 'Accept-Encoding: gzip'`。Node 的 `fetch` 会自动解压，`curl --compressed` 可能协商到 brotli——两者对 gzip 预算来说都是错的数。

### 3.4 门禁测不到就失败

门禁的早期版本在构建产物缺失时会静默通过。那比没有门禁更糟，因为它制造虚假信心。**现在测不到就失败。**

先 `npm run build`，再 `npm run test:gate`。

## 四、视图

同一份数据上的四个视图，全都读同一个索引、同一张关联图：

| 视图 | 组件 | chunk |
|---|---|---|
| 时间轴 | `TimelineView` | 首屏 |
| 地图 | `MapView` | 懒加载（禁入首屏） |
| 列表 | `ListView` | 懒加载（禁入） |
| 专题馆 | `SpecialHall` | 懒加载（禁入） |

另有 `SwimLaneView`、`DetailPanel`、`ComparePanel`、`HistoryProjector`。

`DetailPanel` 是共享的——从时间轴、地图或列表打开节点，得到的都是同一个面板。这是刻意的：视图是透镜，不是各自独立的应用。

## 五、国际化

```
src/i18n/
├── index.tsx        Provider、useI18n、t(key, fallback)
├── zh-CN.ts         事实源
├── en-US.ts         动态 import
├── format-year.ts   BCE/CE + 千分位
└── types.ts
```

三个设计决策：

1. **`t(key, fallback)` 永远带中文 fallback。** 键缺失时渲染中文，绝不渲染裸键名。没有任何静默失败。
2. **英文动态 import。** 纯中文会话付出 **0** 额外字节。首屏预算因此不受影响。
3. **内容翻译用 overlay，不用复制。** `EN_NODE_META`（133 节点）与 `EN_SHARD_BODY_IMPORTS`（2 分片）**只**装已译的部分。缺失条目运行时回退。

`loadNodeBodyBilingual(nodeId, lang)` 在英文不可用时返回 `isFallback: true` 的 `BilingualBodyResult`；`DetailPanel` 渲染明确提示。**那张提示是功能。**

覆盖率见[翻译进度](TRANSLATION-STATUS.zh-CN.md)。

## 六、主题与形状语言

五套主题以 CSS 自定义变量块的形式放在 `src/index.css`：`museum`（默认）、`ink`、`parchment`、`xuanzhi`、`bamboo`。通过 `next-themes` 与 `safeScopedStorage` 持久化。

**对比度是实测的，不是目测的。** 细线、焦点环、顶栏边框在每套主题下都要达到 WCAG 3:1。半透明色必须先与实际背景做 alpha 合成再算比值——拿 rgba 原值算会得到错误答案。顶栏下边框实测 **3.21**。

**2px 规则在构建期强制。** `postcss-radius-normalize.cjs` 把所有 >2px 的非圆形圆角改写成 2px。组件里写 `rounded-lg` 活不过构建。圆形值（`50%`、`999px`、`9999px`）豁免。

## 七、不变量——这些不许回归

每一条都曾是真实 bug，挖到根因后修掉。列在这里，是因为它们很容易被顺手改回去。

### 7.1 地图容器必须保留 `isolation: isolate`

**症状：** 历史放映机的每个控件，包括退出按钮，都点不动。

**根因：** 地图容器是 `z-index: auto`，它**不建立层叠上下文**。于是 Leaflet 的 map-pane（`z-index: 400`）逃出容器，画在放映机控制条（`z-index: 10`）之上。

**修法：** 容器加 `isolation: isolate`，建立一个能关住 Leaflet z-index 的层叠上下文。

抬高控制条 z-index 只是补丁不是修复——下一个 Leaflet 图层还会逃出来。

### 7.2 放映机弹层必须保留 `createPortal` 到 `document.body`

**症状：** 放映机打开后 **2–4 秒**内点不动。

**根因：** 祖先 `motion.div` 写了 `transform`。带 transform 的祖先会成为 `position: fixed` 的包含块，于是"全屏"弹层相对该祖先而非视口定位，命中区域在动画稳定前都是错的。

**修法：** 把弹层 portal 到 `document.body`，脱离任何带 transform 的祖先。

### 7.3 放映机事件流必须保持纯派生

事件日志与年份读数是 **`currentYear` 的纯函数**。那条路径上刻意**没有 `AnimatePresence`**。

**原因：** 离场动画会在其时长内保留旧子节点。重置之后，年份游标已经跳走，旧事件却还留在屏幕上。把一切派生自单一状态值，让这类 bug 在结构上不可能发生。

### 7.4 首屏文件数与禁用 chunk

23 个文件，四个重视图不得出现。由测试断言。

**测量注意：** 视图状态是持久化的，之前开过地图的会话预取行为会不同。正确数法：先切时间轴视图，**再 reload**，然后立即数。

### 7.5 数据完整性

零孤立节点、零悬空关联引用、零自环、零重复 id。全部由测试强制。开发期找出并修掉 76 个孤立节点；测试的存在就是为了让它们回不来。

### 7.6 热区 ≥44×44，图标不变

热区是**靠 padding 扩大的，不是放大图标**。视觉密度是刻意的，只有可达面积变大了。

## 八、韧性

**分片加载自愈。** 懒加载 chunk 可能失败——典型场景是部署中途，`index.html` 指向 CDN 上已不存在的哈希。处理流程：

1. 自动重试一次。
2. 仍失败则渲染本地化说明与手动重载按钮（146×44）。
3. **绝不**进入无限刷新循环。

**错误边界。** `ViewErrorBoundary` 包裹每个视图，一个视图坏了不会拖垮整座图谱。

## 九、测试

| 套件 | 数量 | 覆盖 |
|---|---|---|
| `npm test` | **154**（16 文件） | 数据完整性、关联、i18n、组件、格式化 |
| `npm run test:gate` | **17**（4 文件） | 构建产物、首屏计数、gzip 预算 |

两套都在本仓库实测通过。零 skipped——被 skip 的测试就是没在跑的门禁。

门禁读的是**真实构建产物**，不是估算。

## 十、构建流水线

`npm run build` → `bash scripts/build.sh`：

1. `vite build` → `dist/client/`
2. `public/*` + HTML + `routes.json` → `dist/output/`
3. `assets/` → `dist/output_resource/`
4. `shared/static/`（排除代码文件）→ `dist/output_static/`
5. capabilities → `dist/output_capabilities/`
6. 删除 `dist/client/`

这个拆分反映的是平台 CDN 约定。**普通静态托管要把 `output/` 与 `output_resource/assets/` 合并成一个目录**——见[部署教程第五节](DEPLOYMENT.zh-CN.md)。

存在三种构建模式（平台默认 / standalone / 干净 Web），它们在代码分割与遥测上不同。**这比任何其他构建细节都重要**——见[部署教程第四节](DEPLOYMENT.zh-CN.md)。

---

下一篇：[数据格式](DATA-FORMAT.zh-CN.md) · [自行修改教程](CUSTOMIZATION.zh-CN.md) · [部署教程](DEPLOYMENT.zh-CN.md)
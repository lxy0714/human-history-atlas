# 自行修改教程

[English](CUSTOMIZATION.md) · **简体中文**

人类文明时间地图 · [返回 README](../README.zh-CN.md)

---

这份教程写给想**把这个项目改成自己的**的人：改内容、改外观、加语言，或者干脆换成另一个主题的时间图谱。

下面每个配方都点名了要改哪个文件、用哪条命令验证。打算动内容的，请先读[数据格式](DATA-FORMAT.zh-CN.md)。

## 一、动手前的四条铁律

1. **`src/data/history-index.ts` 是自动生成的。** 文件头就写着。永远别手改——下次重新生成就冲掉了。改 `src/data/history.ts`，然后重新生成（2.4）。
2. **每次改完内容都跑门禁。** `npm test && npm run build && npm run test:gate`。数据完整性测试会抓悬空关联、孤立节点、重复 id；体积门禁会抓体积回归。它们存在，是因为这个内容库在开发过程中恰好就在这几处翻过车。
3. **有一个分片已经贴着天花板。** `medieval-china-a` 实测 **109,334 字节 gzip**，软上限 110,000——**只剩 666 字节余量（0.61%）**。往这个分片里的节点加正文就会踩线。正确做法是拆分片，不是抬阈值（2.5）。
4. **不要为了让改动通过而放宽门禁。** 门禁红了，说明你的改动太大或形状不对。那正是门禁在干活。

## 二、改历史内容

### 2.1 改节点的标题、年份、摘要或关联

改 `src/data/history.ts`，按 `id` 找到节点。

```ts
{
  id: 'qin-unification',
  title: '秦统一六国',
  year: -221,
  yearDisplay: '前221年',
  civilization: 'china',
  categories: ['dynasty', 'event'],
  type: 'event',
  eraId: 'classical',
  location: { lat: 34.34, lng: 108.94 },
  summary: '…',
  relatedNodeIds: ['…'],
  important: true,
}
```

字段含义见[数据格式](DATA-FORMAT.zh-CN.md)。改完：

```bash
npm run build && npm test
```

### 2.2 改节点的长文正文

正文**不在** `history.ts` 里，在 `src/data/bodies/shards/` 下的分片中，按节点 id 索引。先找你的节点在哪个分片：

```bash
grep -rl "'your-node-id'" src/data/bodies/shards/
```

直接改那里的文字。正文是普通字符串（带轻量标记），所以这是最容易上手的一类贡献。

### 2.3 加一个全新节点

1. 在 `src/data/history.ts` 里加节点对象。
2. 给一个唯一的 `id`（kebab-case，纯 ASCII）。
3. `eraId` 取七个合法 id 之一，`civilization` 取十个合法 key 之一。
4. `relatedNodeIds` 至少填一条——**孤立节点会让完整性测试失败**。
5. 把正文加进对应分片。
6. 重新生成索引（2.4）并跑门禁。

有坐标就自动上地图；有 `important: true` 就自动进放映机事件流。

### 2.4 重新生成索引与分片

```bash
npx tsx scripts/generate-body-shards.mts
```

它会重写 `src/data/history-index.ts` 与分片归属。生成出来的文件要**和源码改动一起提交**——它们是入库的，不是部署时才生成的。

### 2.5 拆分过大的分片

某个分片踩了体积门禁时：

1. 建一个兄弟分片文件，比如 `medieval-china-b.ts`，导出 `BODY_MAP`。
2. 把一整块语义连贯的节点挪过去（按朝代/时期整块搬，别从一个主题中间劈开）。
3. 在加载器的分片映射里登记新分片。
4. 重新生成（2.4）并重跑门禁。

**不要抬阈值。** 那些阈值编码的是真实的首屏预算。

## 三、改外观

### 3.1 五套主题

主题令牌以 CSS 自定义变量的形式放在 `src/index.css`，一套一个块：

| Key | 名称 | 性格 |
|---|---|---|
| `museum` | 博物馆 | 深色木质展柜、暖金（默认） |
| `ink` | 墨夜 | OLED 黑金 |
| `parchment` | 羊皮纸 | 暖调陈纸 |
| `xuanzhi` | 宣纸 | 素白宣纸 |
| `bamboo` | 竹简 | 青墨绿汉简 |

调色就改对应变量块。加第六套就复制一块、给新 key、在主题切换器列表里登记。

**必须守住的约束：** 细线、焦点环、顶栏边框在**每一套主题**下都要达到 **WCAG 3:1**。颜色半透明时，必须先与实际背景做 alpha 合成再算比值——直接拿 rgba 原值算会得到错误答案。

### 3.2 字体排印

`src/index.css` 与 `src/typography.css` 定义：

```css
--font-display: 'ZCOOL XiaoWei', serif;   /* 标题 */
--font-sans:    'Noto Sans SC', sans-serif;
--font-serif:   'Noto Serif SC', serif;
```

正文 13px、标签 10px 是刻意的设计——这是一个高密度的参考型界面，不是博客。要改的话，改完重新检查移动端版式。

### 3.3 2px 形状语言

所有非圆形圆角被一个 PostCSS 插件（`postcss-radius-normalize.cjs`）强制改写成 **2px**。你在组件里写 `rounded-lg` 是活不过构建的。这是有意的：视觉身份是博物馆展签与细线，不是软圆卡片。

圆形元素（`50%`、`999px`、`9999px`）豁免。

要放宽就改插件——但要明白你改的是产品身份，不是修 bug。

### 3.4 图标与 emoji

项目用 `lucide-react`。**全站 emoji 是刻意清除过的**，别再引入。

热区扩到 ≥44×44 是靠 padding，**没有放大图标本身**。保持这个区别。

## 四、字体

字体在 `index.html` 里从 Google Fonts 加载：

```html
<link href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet" />
```

**改成自托管**（中国大陆部署、离线使用或注重隐私时推荐）：

1. 下载三个字族的 WOFF2。
2. 放进 `public/fonts/`。
3. 把 `<link>` 换成 `src/index.css` 里的本地 `@font-face`。
4. 构建时带 `MIAODA_FONTS_MIRROR_OFF=1`，免得 preset 改写你的地址。

注意 Noto Sans SC 与 Noto Serif SC 是很大的中日韩字族。要么按实际用字做子集化，要么接受几 MB 的字体负载。

许可：Noto 两个字族与站酷小薇都是开放许可，见[第三方素材声明](THIRD-PARTY-NOTICES.zh-CN.md)。

## 五、新增或补全翻译

这是本项目**最有价值的贡献**。缺什么见[翻译进度](TRANSLATION-STATUS.zh-CN.md)。

### 5.1 i18n 系统怎么运作

```
src/i18n/
├── index.tsx      # Provider + useI18n + t(key, fallback)
├── zh-CN.ts       # 中文词典（事实源）
├── en-US.ts       # 英文词典，动态 import
├── types.ts
└── format-year.ts # 双语年份格式化（BCE/CE、千分位）
```

- `t(key, fallback)` 返回译文，键不存在就返回 fallback。**没有任何静默失败**——未译的键显示中文，不会显示一个裸键名。
- 英文词典是**动态 import** 的，所以纯中文会话零额外下载。
- 语言选择通过 `safeScopedStorage` 持久化。

### 5.2 翻一条界面文案

1. 找到组件里硬编码的中文。
2. 在 `src/i18n/zh-CN.ts` 对应分组下加键。
3. 在 `src/i18n/en-US.ts` 加同名键。
4. 把字面量换成 `t('group.key', '原中文')`。

```tsx
// 改之前
<button>筛选</button>

// 改之后
<button>{t('common.filter', '筛选')}</button>
```

**永远传中文 fallback**——它是键缺失时应用还能用的保障。

### 5.3 翻节点的标题与摘要

往 `src/data/i18n/en-node-meta.ts` 加一条：

```ts
export const EN_NODE_META: Record<string, EnNodeMeta> = {
  'qin-unification': {
    titleEn: 'Qin Unifies the Six States',
    summaryEn: '…',
  },
};
```

只有已译节点出现在这里。未译节点直接不出现，运行时回退中文。**不要加空的或占位的条目。**

该文件已确立的译法约定：人名地名用通行英文译名；不增删史实信息。

### 5.4 翻节点的长文正文

1. 在 `src/data/bodies/en/shards/` 下新建或扩展分片，导出按节点 id 索引的 `BODY_MAP`。
2. 在 `src/data/en-shard-body-map.ts` 登记：

```ts
export const EN_SHARD_BODY_IMPORTS = {
  'prehistoric-others': () => import('./bodies/en/shards/prehistoric-others'),
  'ancient-others':     () => import('./bodies/en/shards/ancient-others'),
  'your-new-shard':     () => import('./bodies/en/shards/your-new-shard'),
};
```

未登记的分片自动回退中文，`DetailPanel` 会渲染明确的 **"English version not yet available"** 提示卡。**那张提示卡是功能，不要为了让覆盖率好看而删掉它。**

### 5.5 加第三种语言

1. 复制 `en-US.ts` 为比如 `ja-JP.ts` 并翻译。
2. 在 `src/i18n/index.tsx` 登记该 locale（类型、动态 import、切换器条目）。
3. 给节点元数据 overlay 加 `titleJa` / `summaryJa`，或把 overlay 泛化成按 locale 索引。
4. 为该 locale 加一份正文分片映射。

现有结构是"两语言"，但不是"只能两语言"——overlay 这个模式是可以泛化的。

### 5.6 查进度

```bash
npx tsx scripts/translation-progress.ts
```

## 六、改地图

底图是 Esri World Imagery，配置在地图视图组件里：

```
https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
```

要换底图（OpenStreetMap、历史地图叠加层、自建瓦片服务），替换这个 URL 模板并更新署名串。**署名是法律要求，不是客气**——见[第三方素材声明](THIRD-PARTY-NOTICES.zh-CN.md)。

两条用惨痛调试换来的约束：

- 地图容器必须保留 **`isolation: isolate`**。没有它，Leaflet 的 map-pane（`z-index: 400`）会逃出容器的层叠上下文，盖住放映机控制条（`z-index: 10`），导致**所有控件——包括退出按钮——都点不动**。
- 放映机弹层必须保留 **`createPortal` 到 `document.body`**。带 `transform` 的祖先会让 `position: fixed` 相对该祖先而非视口定位，此前正是它导致弹层打开后 2–4 秒内点不动。

这两条都是修过一次的回归，别改回去。

## 七、换成别的主题

想把它改造成另一座图谱（艺术史、虚构世界、公司大事记）：

1. 替换 `src/data/history.ts` 与正文分片里的内容。
2. 重新定义 `ERAS`、`CIVILIZATIONS`、`CATEGORIES`——其余一切筛选都挂在这三根轴上。
3. 更新 `index.html`：标题、描述、关键词、Open Graph、JSON-LD。
4. 换掉 `public/favicon.svg`。
5. 更新 `src/i18n/` 里的词典。
6. 如果博物馆这个隐喻不再合适，改主题名。

四个视图、放映机、关联图、性能门禁全都与主题无关。任何**有年代、有分类、有坐标**的内容库都能用。

## 八、验证你的改动

```bash
npm run lint       # 类型 + eslint
npm test           # 154 个测试：数据完整性、i18n、组件
npm run build
npm run test:gate  # 17 个门禁：首屏文件数、gzip 预算
```

然后**用浏览器真看一眼**。测试抓不到视觉回归。至少在 1280px 与 390px 两档、两套主题、两种语言下各看一遍。

如果你动了放映机：打开它、让它播、拖动、重置，确认退出按钮**用真实点击**能立刻响应。程序化 `.click()` 会绕过命中判定，在一个人类根本点不到的弹层上也能"通过"。

---

下一篇：[数据格式](DATA-FORMAT.zh-CN.md) · [开源贡献指南](CONTRIBUTING.zh-CN.md) · [翻译进度](TRANSLATION-STATUS.zh-CN.md)
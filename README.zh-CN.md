# 人类文明时间地图 · Human History Atlas

**一座博物馆式的交互历史图谱——763 个历史节点、七个时代，用时间轴、卫星地图、百科列表与专题馆四种方式读同一部人类史。**

**简体中文** · [English](README.md)

[产品介绍](docs/PRODUCT.zh-CN.md) · [部署教程](docs/DEPLOYMENT.zh-CN.md) · [自行修改教程](docs/CUSTOMIZATION.zh-CN.md) · [来源与灵感](docs/SOURCES-AND-INSPIRATION.zh-CN.md) · [更新日志](CHANGELOG.zh-CN.md) · [翻译进度](docs/TRANSLATION-STATUS.zh-CN.md)

---

> ### ⚠️ 请先看这段：界面已双语，长文尚未
>
> 中文是完整的。英文态下**四大主视图已实测零中文，全部节点标题、摘要、年份与类别标签均已翻译**；长文正文尚未，并带有明确的回退提示。没有任何内容是静默机翻或假装已译的。
>
> 范围说明：专题馆内部 27 个子应用与详情长文区尚未逐个做同样实测。
>
> | 层 | 中文 | 英文 |
> |---|---|---|
> | 四大主视图可见文案 | 100% | **零中文**（浏览器实测；仅保留品牌标 `史`） |
> | 界面词典 | 100% | **580 键，零缺失**（测试锁定） |
> | 年份显示串 | 763 节点 | **763 / 763 —— 100%**（测试锁定） |
> | 帝国名 / 首都名 | 37 / 33 | **37 / 37 · 33 / 33 —— 100%** |
> | 专题馆卡片 | 27 | **27 / 27 —— 100%** |
> | 节点标题与摘要 | 763 节点 | **763 / 763 —— 100%** |
> | 时代 / 分类 / 文明名称 | 23 | **23 / 23 —— 100%** |
> | 长文正文 | 约 810,738 字 | 15 / 763 节点；其余回退中文，**并在界面上明确标注** |
>
> 精确且可重新生成的数字与路线图见[翻译进度](docs/TRANSLATION-STATUS.zh-CN.md)。如果你切到英文后在正文里看到中文，那是文档写明的回退行为，不是 bug。

---

## 这是个什么东西

人类文明时间地图是一个**纯展示型的交互历史百科**。它不是 CMS、不是 wiki、也没有后端：所有内容都以带类型的 TypeScript 数据随工程一起发布，整体构建成静态文件，你想托在哪儿就托在哪儿。

它围绕一个想法建造：**历史更适合被看成一种形状，而不是一份清单。** 光有年份说明不了同时性——说明不了汉与罗马几乎平行地兴衰，说明不了玛雅人在筑城时欧洲正处在中世纪。所以同样这 763 个节点可以有四种读法，而节点之间的关联是一等数据，不是事后补的装饰。

### 同一批内容的四种读法

| 视图 | 拿来干什么 |
|---|---|
| **时间轴** | 按年代顺序读，一个时代一个时代地走，有可滚动的主脊与节点卡片 |
| **世界地图** | 在 Esri 卫星影像上按地理读——483 个定位标记，可自由拖拽缩放 |
| **百科列表** | 检索式阅读，按文明、分类、时代与关键词筛 |
| **专题馆** | 跨时代切割的策展展览（帝国、城市、日常生活、术语表、学习路径等） |

### 功能

- **763 个节点，全部有长文正文。** 分布：史前 10 · 古代文明 80 · 古典时代 173 · 中世纪 246 · 大航海与近代 108 · 工业时代 70 · 现代 76。
- **十个文明**，刻意把多数时间轴会跳过的那些补上：中国 270 · 欧洲 226 · 美洲 50 · 中东 47 · 非洲 46 · 东亚其他 39 · 全球 25 · 中亚 23 · 南亚 22 · 大洋洲 15。
- **2,396 组唯一关联对**——类型化关联加显式交叉引用，去重后计数。零孤立节点、零悬空引用、零自环。
- **历史放映机**——全屏播放模式，年份游标从公元前 300 万年推进到至今，在地图上累积一份重要事件日志。地图锁定跟随播放，所有控件键盘与触屏都够得着。
- **五套主题**，每套都是一种刻意设计的阅读环境，不是换个配色：博物馆（深色木质展柜）、墨夜（OLED 黑金）、羊皮纸（暖调复古）、宣纸（素白长读）、竹简（青墨绿汉简）。
- **竖排古籍版式**——面向中文内容的从右至左竖排阅读模式，仿线装书。
- **文明泳道**、测验与成就、学习路径、术语表、城市史、日常生活、帝国对比。
- **双语界面**，语言选择可持久化，内容回退如实标注（见上方提示）。
- **无障碍是量出来的，不是声称的**：五套主题的细线与顶栏边框全部达到 WCAG 3:1；移动端热区 ≥44×44；主题与语言菜单都是完整的 `role=menu` 实现，带方向键、Home/End 与分层 Escape。

### 工程上的特点

这个项目把性能与正确性当功能做，并且用测试把它们焊死：

- **数据分层加载。** 轻量索引先加载；长文正文切成 29 个时代分片按需取；还有二级分片保证单片体积有界。
- **首屏预算由测试强制。** 干净加载只取 **23 个文件**；四个最重的非首屏 chunk 被明确禁止进首屏，一旦出现测试就红。
- **双层 gzip 门禁。** 每项预算都有 WARN 与 FAIL 两档，口径是 `gzipSync(level 9)`。读不到构建产物时门禁**失败**，而不是静默跳过。
- **分片加载失败自愈。** 懒加载分片失败时（通常发生在部署中途），先自动重试一次，再给出本地化的中文说明与手动重载按钮——绝不无限刷新。
- **形状语言在构建期强制。** 一个 PostCSS 插件把所有大于 2px 的非圆形圆角改写成 2px，方角展签的美学不会悄悄跑偏。
- **154 个单测 + 17 个门禁测试**，零 skipped。

## 快速开始

```bash
git clone https://github.com/lxy0714/human-history-atlas.git
cd human-history-atlas
npm install
npm run dev
```

然后打开 dev server 打印出来的地址。

```bash
npm run build      # 静态产物
npm test           # 154 个单测
npm run test:gate  # 17 个构建产物 / 体积门禁
npm run lint       # 类型检查 + eslint
```

**环境要求：** Node.js 20 或更新（开发环境用的是 Node 22），npm 10+。

完整步骤、静态托管、子路径部署与排错见 **[部署教程](docs/DEPLOYMENT.zh-CN.md)**。

## 仓库结构

```
src/
├── data/                  # 全部内容，带类型的 TS
│   ├── history.ts             # 完整节点定义与类型
│   ├── history-index.ts       # 生成的轻量索引（首屏）
│   ├── bodies/shards/         # 29 个长文分片（懒加载）
│   ├── empires.ts, city-history.ts, daily-life.ts, glossary.ts, ...
│   └── *.test.ts              # 数据完整性测试
├── i18n/                  # zh-CN.ts、en-US.ts（英文按需加载）
├── pages/HomePage/        # 四个视图、详情面板、放映机
├── components/ui/         # shadcn/ui 基础件
├── lib/                   # 加载器、存储、主题、格式化
└── index.css              # 五套主题的变量
scripts/                   # 构建、分片生成、称重、门禁
docs/                      # 你正在读的这套双语文档
```

## 文档

每份文档都有中英两版。

| 文档 | 中文 | English |
|---|---|---|
| 产品介绍 | [PRODUCT.zh-CN.md](docs/PRODUCT.zh-CN.md) | [English](docs/PRODUCT.md) |
| 项目介绍 | [ABOUT.zh-CN.md](docs/ABOUT.zh-CN.md) | [English](docs/ABOUT.md) |
| 来源与灵感 | [SOURCES-AND-INSPIRATION.zh-CN.md](docs/SOURCES-AND-INSPIRATION.zh-CN.md) | [English](docs/SOURCES-AND-INSPIRATION.md) |
| 架构说明 | [ARCHITECTURE.zh-CN.md](docs/ARCHITECTURE.zh-CN.md) | [English](docs/ARCHITECTURE.md) |
| 数据格式 | [DATA-FORMAT.zh-CN.md](docs/DATA-FORMAT.zh-CN.md) | [English](docs/DATA-FORMAT.md) |
| 部署教程 | [DEPLOYMENT.zh-CN.md](docs/DEPLOYMENT.zh-CN.md) | [English](docs/DEPLOYMENT.md) |
| 自行修改教程 | [CUSTOMIZATION.zh-CN.md](docs/CUSTOMIZATION.zh-CN.md) | [English](docs/CUSTOMIZATION.md) |
| 开源贡献指南 | [CONTRIBUTING.zh-CN.md](docs/CONTRIBUTING.zh-CN.md) | [English](docs/CONTRIBUTING.md) |
| 翻译进度与路线图 | [TRANSLATION-STATUS.zh-CN.md](docs/TRANSLATION-STATUS.zh-CN.md) | [English](docs/TRANSLATION-STATUS.md) |
| 第三方素材声明 | [THIRD-PARTY-NOTICES.zh-CN.md](docs/THIRD-PARTY-NOTICES.zh-CN.md) | [English](docs/THIRD-PARTY-NOTICES.md) |
| 更新日志 | [CHANGELOG.zh-CN.md](CHANGELOG.zh-CN.md) | [English](CHANGELOG.md) |

## 许可

本仓库**双许可**，因为代码和文章是两种不同的作品：

- **代码** —— [MIT](LICENSE)。随便用、随便改、可商用，保留声明即可。
- **历史内容**（`src/data/` 下所有文字性内容：正文、摘要、术语、随笔）—— [CC BY-SA 4.0](LICENSE-CONTENT)。必须署名，衍生作品必须沿用同一许可。
- **第三方素材两者都不覆盖。** Esri 卫星瓦片与 Google 托管字体各自适用其条款。公开或商用部署前请先读[第三方素材声明](docs/THIRD-PARTY-NOTICES.zh-CN.md)。

## 参与贡献

欢迎贡献——尤其是**英文翻译**（当前最大的缺口）与**史实纠错**（在一个历史项目里，这比什么都重要）。

请先读[开源贡献指南](docs/CONTRIBUTING.zh-CN.md)。史实纠错请附来源：本内容库是在既有史学共识之上的 AI 辅助写作，不是任何单一参考书的转录，它可能是错的。

## 如实说明的局限

- 英文覆盖不完整，详见本文开头的表格。
- 内容库是 **AI 辅助写作**。史实遵循主流史学共识，但措辞、侧重与取舍是机器生成、只经过部分人工复核。请把它当学习辅助，不要当可引用的权威。详见[来源与灵感](docs/SOURCES-AND-INSPIRATION.zh-CN.md)。
- 卫星影像需要联网，且受 Esri 条款约束；地图无法离线使用。
- 没有后端、没有账号、没有跨设备同步。阅读位置、主题与语言只存在当前浏览器里。
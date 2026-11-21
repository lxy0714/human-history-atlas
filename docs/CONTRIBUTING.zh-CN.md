# 开源贡献指南

[English](CONTRIBUTING.md) · **简体中文**

人类文明时间地图 · [返回 README](../README.zh-CN.md)

---

欢迎贡献。这一页告诉你哪类贡献最有用、怎么做，以及什么样的 PR 会被拒。

## 一、这个项目最需要什么

按优先级：

1. **英文翻译。** 遥遥领先的最大缺口。763 个节点里 630 个没有英文元数据，748 个没有英文正文。见[翻译进度](TRANSLATION-STATUS.zh-CN.md)。
2. **史实纠错。** 在历史项目里，这件事的重要性高于一切，哪怕数量上排第二。请带来源。
3. **无障碍修复。** 已知未修缺陷列在更新日志里。移动端热区普查尚未完成。
4. **带复现步骤的 bug 报告。** 尤其是只在特定视口或特定主题下出现的。
5. **文档改进**，中英任一语言。

项目**不需要**的：换框架重写、引入新状态管理库、加数据库后端、重新设计。那些不是缺口，是选择。

## 二、动手之前

```bash
git clone https://github.com/lxy0714/human-history-atlas.git
cd human-history-atlas
npm install
npm test           # 改动任何东西之前，必须显示 154 通过
npm run build
npm run test:gate  # 必须显示 17 通过
```

如果干净检出后这几条里有任何一条失败，**那就是 bug——先提 issue**，别绕过去。已知安装问题见[部署教程](DEPLOYMENT.zh-CN.md)。

## 三、贡献类型

### 3.1 史实纠错

**这是你能做的最有价值的事。** 内容库是 AI 辅助写作，包含错误。见[来源与灵感](SOURCES-AND-INSPIRATION.zh-CN.md)。

用 **史实纠错** issue 模板，或直接开 PR。无论哪种，都必须提供：

| 必填 | 示例 |
|---|---|
| 节点 id | `qin-unification` |
| 当前文字 | 原文中出现的那一句，原样贴 |
| 更正文字 | 你的替换 |
| **来源** | 学术著作、一手文献、考古报告或机构出版物 |
| 该来源为何权威 | 一句话 |

**不算来源的：** 另一部百科、另一个 AI 的输出、无出处的博客、"众所周知"。如果学界确实存在分歧，请说明并同时引用两种立场——正确的修法可能是加上保留措辞，而不是改一个年份。

带来源的更正会被合并；不带来源的会被讨论。这个项目宁可被纠正，也不愿被辩护。

### 3.2 翻译

具体机制见[自行修改教程第五节](CUSTOMIZATION.zh-CN.md)。要点：

- **界面文案** → 在 `zh-CN.ts` 与 `en-US.ts` 都加键，然后用 `t('group.key', '中文fallback')`。**永远传 fallback。**
- **节点标题/摘要** → 往 `src/data/i18n/en-node-meta.ts` 加条目。
- **节点正文** → 加进 `src/data/bodies/en/shards/` 下的分片，然后在 `en-shard-body-map.ts` 登记。

规则：

- 人名地名用通行英文译名（Qin Shi Huang 而非 Qinshihuang；Mesopotamia 而非 Mesopotamiya）。
- **翻译时不要增删史实信息。** 翻译不是编辑。译到一半发现史实错误，请另开 issue。
- **不要整片机翻后未经复核就提交。** 这个项目已经有机器生成的内容了；它需要贡献者提供的是**复核过的**内容。如果你用机翻打底，请在 PR 里说明，并确认你逐句复核过。
- **绝不为了让覆盖率好看而加空的或占位的条目。** 缺失条目会诚实回退，假条目是撒谎。
- **不要删掉 "English version not yet available" 提示。** 那是功能。

批次大小：一个 PR 覆盖一个分片或一个时代最理想。动 200 个节点的 PR 会被要求拆分。

### 3.3 代码

- 沿用既有风格。`npm run lint` 必须过。
- **不要为了让改动通过而放宽门禁。** 体积门禁红了说明改动太大——去拆分片，别抬阈值。
- **不要先斩后奏加依赖。** 体积预算是真的。
- 行为变更要补测试或改测试。当前 154 个，不该往下掉。
- 保留两条已记录的放映机修法：地图容器 `isolation: isolate`，弹层 `createPortal` 到 `document.body`。见[自行修改教程第六节](CUSTOMIZATION.zh-CN.md)。

### 3.4 文档

每份文档都有中英对偶版。**改了一份就改两份**，或在 PR 里明确说明对偶版待补。已经漂移的文档对，比缺一份文档更糟。

两版应当**对等**，不必逐字相同。目标是地道中文与地道英文。

## 四、PR 检查清单

- [ ] `npm run lint` 通过
- [ ] `npm test` 通过，数量 ≥ 154
- [ ] `npm run build` 退出码 0
- [ ] `npm run test:gate` 通过，17 个门禁
- [ ] 改了 `history.ts` 的话，已重新生成索引（`npx tsx scripts/generate-body-shards.mts`）并把结果一起提交
- [ ] 加了节点的话：id 唯一、`eraId` 合法、`civilization` 合法、至少一条关联、有正文
- [ ] 翻译的话：无占位条目、回退提示完好、覆盖率数字已重新生成
- [ ] 改了文档的话：两个语言版本都更新了
- [ ] 已在浏览器里看过：1280px **与** 390px、两套主题、两种语言
- [ ] 动了放映机的话：打开后退出按钮用**真实点击**能立刻响应

最后一条比看起来重要。程序化 `.click()` 绕过命中判定，在一个人类根本点不到的弹层上也能"通过"。这个项目曾经恰好发布过这个 bug。

## 五、提交信息

约定式提交：

```
feat(data): add 12 Oceanic nodes for the medieval era
fix(projector): restore isolation on map container
docs(deployment): document standalone single-chunk trade-off
i18n(en): translate ancient-others shard (5 nodes)
fix(data): correct founding date of Carthage, with source
```

类型：`feat`、`fix`、`docs`、`i18n`、`test`、`refactor`、`perf`、`chore`。

史实更正请把来源写进 commit body。

## 六、评审预期

这是一个按余力维护的个人项目，没有 SLA。PR 可能会搁一阵子，那不是拒绝。

会被快速拒掉的 PR：

- 放宽门禁或删测试
- 未复核的机翻冒充人工成果
- 无来源的史实改动
- 编造数据（虚构评分、虚构计数、占位译文）
- 重新引入 emoji
- 非圆形圆角不是 2px
- 范围蔓延——一个翻译 PR 顺手重构了加载器

## 七、报 bug

用 **Bug 报告** 模板，写清：

- 你做了什么、期望什么、实际发生了什么
- 视口宽度与主题
- 语言（中 / 英）
- 浏览器与操作系统
- 控制台输出
- 干净重载后是否复现

视觉类 bug，一张截图胜过一段描述。

## 八、行为准则

对事直接，对人厚道。史学分歧是欢迎的、也是预期之中的——这个内容库覆盖了大量有争议的地带，讲道理的人本来就会读出不同结论。请用证据争论。

任何形式的骚扰、人身攻击与歧视都不被容忍。维护者可以关闭或锁定越线的讨论。

## 九、贡献的许可

提交贡献即表示你同意：

- **代码**贡献以 [MIT](../LICENSE) 许可。
- **内容与翻译**贡献以 [CC BY-SA 4.0](../LICENSE-CONTENT) 许可。

你必须有权提交你所提交的东西。**不要粘贴受版权保护的书籍、付费墙文章或另一部百科的文字。** 事实不受版权保护，别人的文字受。

---

下一篇：[翻译进度](TRANSLATION-STATUS.zh-CN.md) · [自行修改教程](CUSTOMIZATION.zh-CN.md) · [来源与灵感](SOURCES-AND-INSPIRATION.zh-CN.md)
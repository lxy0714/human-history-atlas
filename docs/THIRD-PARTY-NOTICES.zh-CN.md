# 第三方素材声明

[English](THIRD-PARTY-NOTICES.md) · **简体中文**

人类文明时间地图 · [返回 README](../README.zh-CN.md)

---

本仓库的 [MIT](../LICENSE) 与 [CC BY-SA 4.0](../LICENSE-CONTENT) 许可**只覆盖本项目自己创作的部分**。下面列出的一切都归他人所有，各自保留其条款。

**任何公开或商用部署前，请先读第一节。** 那一节最可能影响到你。

## 一、Esri World Imagery —— 卫星底图

地图视图的卫星瓦片来自：

```
https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
```

- **权利方：** Esri（美国环境系统研究所公司），影像由其数据供应商网络提供。
- **运行时拉取。** 本仓库不打包任何瓦片。地图需要联网，离线不可用。
- **不在本仓库任何许可覆盖范围内。** MIT 与 CC BY-SA 都不授予你任何使用 Esri 影像的权利。

### 你必须做的

1. **保留署名。** 地图上显示 Esri 署名串。删掉它违反条款，那不是样式选择。
2. **公开或商用部署前，自己去核对现行条款。** Esri 的底图使用条款区分开发、内部使用与公开/商用部署，并可能依用途与流量要求 ArcGIS 账号或订阅。

   权威出处：
   - Esri 使用条款 —— <https://www.esri.com/en-us/legal/terms/full-master-agreement>
   - ArcGIS Online 底图条款 —— <https://www.esri.com/en-us/arcgis/products/arcgis-online/resources>

> **本项目不授予你 Esri 权利，也无法保证你的预期用途被允许。** 维护者是在一个个人、非商业的教育项目中使用该公开瓦片端点。如果你打算做商业产品、高流量站点或离线再分发，**请先向 Esri 核实你的许可地位，或者换底图。**

### 换底图

如果 Esri 条款不适合你的用途，替换瓦片 URL 即可，见[自行修改教程第六节](CUSTOMIZATION.zh-CN.md)。条款不同的替代方案包括 OpenStreetMap 栅格瓦片（ODbL，需署名，且有瓦片使用政策）、自建瓦片服务，或你已签约的商业供应商。

**换任何底图都要保住两条约束：** 地图容器保留 `isolation: isolate`，放映机弹层保留 portal 到 `document.body`。两条都是有记录的回归修复。

## 二、网页字体

在 `index.html` 中从 Google Fonts 加载：

| 字族 | 用途 | 许可 |
|---|---|---|
| **站酷小薇**（ZCOOL XiaoWei） | 标题 | SIL 开放字体许可 1.1 |
| **Noto Sans SC** | 正文无衬线 | SIL 开放字体许可 1.1 |
| **Noto Serif SC** | 衬线 / 竖排古籍 | SIL 开放字体许可 1.1 |

- **提供方：** Google Fonts（CSS 走 `fonts.googleapis.com`，字体文件走 `fonts.gstatic.com`）。
- **OFL 1.1 允许**打包、自托管、修改与商用。要求随字体附带许可与版权声明，且修改版不得使用保留字体名。
- **隐私提示：** 从 Google Fonts 加载会把访客 IP 发给 Google。如果这对你的部署有影响（尤其是 GDPR 方面的考量），请**自托管字体**——见[自行修改教程第四节](CUSTOMIZATION.zh-CN.md)。

### 平台字体镜像

上游 Vite preset 默认把 Google Fonts 地址改写到 `https://miaoda.feishu.cn/fonts`。该镜像公网可达，从飞书 CDN 提供同样的字族。它是为访问不了 Google 的网络准备的平台便利设施。

**独立部署请带 `MIAODA_FONTS_MIRROR_OFF=1` 构建**以保留原始 Google Fonts 地址，或者自托管。见[部署教程 4.4](DEPLOYMENT.zh-CN.md)。

## 三、平台遥测 —— 开源构建中已移除

上游 preset（`@lark-apaas/coding-preset-vite-react`）在默认模式下会往构建产物 HTML 注入四个脚本：

| 注入项 | 主机 | 用途 |
|---|---|---|
| 性能 SDK | `sf3-scmcdn-cn.feishucdn.com` | 平台性能监控 |
| Slardar APM | `lf3-short.ibytedapm.com` | 字节应用监控 |
| Tea / LogAnalytics | `lf3-cdn-tos.bytescm.com` | 平台分析 |
| `viewContext` | 内联 | `window.appId` / `userId` / `tenantId` 占位符 |

**这些由 `scripts/strip-platform-telemetry.mjs` 摘除**，部署教程推荐的构建路径会执行它。摘除后，不会有任何访客数据发往上述主机。

如果你用平台默认模式构建，且**不跑**剥离脚本就把产物托出去，那你就是在把访客数据发给字节的分析端点。**别悄悄这么干**——要么摘掉，要么向你的用户披露这些遥测。

standalone 模式（`MIAODA_BUILD_TARGET=standalone`）同样不注入，代价是失去代码分割。

## 四、npm 依赖

**65 个直接依赖。** 全部已安装顶层包的许可分布，2026-11-21 从 `node_modules` 实测：

| 许可 | 包数 |
|---|---|
| MIT | 607 |
| ISC | 40 |
| Apache-2.0 | 36 |
| BSD-3-Clause | 11 |
| BSD-2-Clause | 10 |
| MPL-2.0 | 3 |
| Unlicense | 2 |
| Python-2.0 | 1 |
| CC-BY-4.0 | 1 |
| CC0-1.0 | 1 |
| 0BSD | 1 |
| **未声明 license 字段** | **4** |

**65 个直接依赖全部使用宽松许可**（MIT / ISC / BSD / Apache-2.0）。值得注意的非 MIT 情况都在传递依赖里：

| 包 | 版本 | 许可 | 说明 |
|---|---|---|---|
| `lightningcss`（含平台二进制） | 1.32.0 | **MPL-2.0** | 文件级 copyleft。由 Tailwind 在构建期使用。不会对你的应用源码施加义务，但如果你修改了 MPL 覆盖的文件，必须以 MPL 提供那些文件。 |
| `caniuse-lite` | 1.0.30001819 | **CC-BY-4.0** | 浏览器支持度数据。需署名；仅构建期。 |
| `argparse` | 2.0.1 | Python-2.0 | 构建期传递依赖。 |

### 未声明许可的包 —— 如实披露

以下四个包发布到 npm 时没有 `license` 字段。**没有许可字段不等于获得授权。** 列出来是为了让你自己判断：

| 包 | 版本 | 说明 |
|---|---|---|
| `@lark-apaas/dataloom` | 0.1.6 | 平台包 |
| `@lark-apaas/miaoda-inspector` | 1.0.25 | 平台包 |
| `@lark-apaas/observable-web` | 1.0.11 | 平台包 |
| `svg-tags` | 1.0.0 | 极小的静态标签表，传递依赖 |

三个 `@lark-apaas/*` 包由平台厂商公开发布在 `registry.npmjs.org`。本项目不主张对它们的权利，也无法把权利授予你。**如果你需要完全干净的许可链，请审计或移除这些依赖。** 应用自身源码只从 `@lark-apaas/client-toolkit-lite` 引入 `logger`，接触面很小。

### 主要运行时库

| 库 | 版本 | 许可 | 角色 |
|---|---|---|---|
| React / React DOM | 19.2 | MIT | 界面 |
| Vite | 8 | MIT | 构建 |
| TypeScript | 5.9 | Apache-2.0 | 类型 |
| Tailwind CSS | 4.2 | MIT | 样式 |
| Radix UI | 多个 | MIT | 无障碍基元 |
| Leaflet | 1.9.4 | BSD-2-Clause | 地图 |
| ECharts | 5.6 | Apache-2.0 | 图表 |
| Framer Motion | 12.38 | MIT | 动画 |
| react-router-dom | 7.13 | MIT | 路由 |
| Vitest | 5 | MIT | 测试 |
| lucide-react | 0.577 | ISC | 图标 |
| next-themes | — | MIT | 主题持久化 |
| crypto-js | — | MIT | 哈希 |

各自的版权与许可原文保留在 `node_modules/<package>/LICENSE`。完整依赖树用 `npm ls --all` 查看。

## 五、史实与素材

- **历史事实不受版权保护。** 没有人拥有秦统一的年份。
- **本项目关于这些事实的文字**以 CC BY-SA 4.0 许可——那是我们的写作，不是事件本身。
- **没有任何第三方文本被复制进这个内容库。** 它是主流共识之上的 AI 辅助写作，不是任何参考书的转录。完整如实的说明见[来源与灵感](SOURCES-AND-INSPIRATION.zh-CN.md)。

如果你贡献内容，**不要从受版权保护的书籍、付费墙文章或其他百科粘贴**。见[开源贡献指南第九节](CONTRIBUTING.zh-CN.md)。

## 六、商标

文明、朝代、历史人物、地点与事件的名称均为描述性使用。其中若含商标，归各自所有者。本项目与 Esri、Google、字节跳动或内容库中提及的任何机构均无关联、未获其背书、也未受其赞助。

## 七、重新生成这份清单

别信第四节的表——依赖会漂移。重新实测：

```bash
npm ls --all --json > deps.json
npx license-checker --summary        # 需要你自行安装
```

或直接扫 `node_modules/*/package.json` 的 `license` 字段。

**任何新增依赖的 PR 都必须更新本页。**

---

下一篇：[部署教程](DEPLOYMENT.zh-CN.md) · [来源与灵感](SOURCES-AND-INSPIRATION.zh-CN.md) · [开源贡献指南](CONTRIBUTING.zh-CN.md)
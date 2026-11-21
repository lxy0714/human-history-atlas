# 部署教程

[English](DEPLOYMENT.md) · **简体中文**

人类文明时间地图 · [返回 README](../README.zh-CN.md)

---

本教程里的每一条命令，在写下来之前都真在这个仓库上跑过。关键处附实测结果。**跑不通的地方会直说跑不通。**

## 零、环境要求

| 要求 | 版本 | 说明 |
|---|---|---|
| Node.js | **20+**（实测 22.23.4） | Vite 8 需要较新的 Node |
| npm | **10+**（实测 10.9.9） | |
| Bash | 任意 | `npm run build` 执行的是 `bash scripts/build.sh` |
| 磁盘 | 约 1.5 GB | node_modules 加构建产物 |

**Windows 用户注意：** `npm run build` 调的是 Bash 脚本。请用 **Git Bash**、**WSL**，或直接跑底层 Vite 命令（见第九节）。PowerShell 与 cmd 无法原生执行 `build.sh`。

## 一、安装

```bash
git clone https://github.com/lxy0714/human-history-atlas.git
cd human-history-atlas
npm install
```

**实测结果：** 退出码 0。

### 1.1 关于锁文件——装不上先看这段

本工程源自一个托管应用平台。它原始的 `package-lock.json` 把 **812 条包记录**钉在两个公网用不了的 registry 上：

| 原始主机 | 条数 | 问题 |
|---|---|---|
| `registry.npmmirror.com` | 766 | 镜像源，与 npmjs 元数据的 integrity 对不上 |
| `miaoda-release-npm-cache.feishu.cn` | 46 | 平台内网缓存，现在返回一张 HTML 404 页 |

拿这份锁文件安装会报 **`EINTEGRITY`**。**只改 `.npmrc` 是修不好的**——锁文件里的 `resolved` 绝对地址优先级高于配置的 registry。

**本仓库已经把锁文件修好了**：812 条 `resolved` 主机全部改写为 `https://registry.npmjs.org`，`.npmrc` 也指向同一个源。这几个主机的 tarball 路径结构完全一致，所以只换了主机名——**没有动任何版本号，也没有动任何 integrity 哈希**。

如果你哪天在原平台上重新生成了锁文件，重新套一次改写：

```bash
python3 - <<'PY'
import re, pathlib
p = pathlib.Path('package-lock.json')
s = p.read_text(encoding='utf-8')
s = re.sub(
    r'("resolved":\s*"https?://)(registry\.npmmirror\.com|miaoda-release-npm-cache\.feishu\.cn)(/)',
    r'\1registry.npmjs.org\3', s)
p.write_text(s, encoding='utf-8')
PY
```

掀桌方案（会丢失版本钉定）：`rm package-lock.json && npm install`。

## 二、开发服务器

```bash
npm run dev
```

打开它打印的地址，热更新已启用。

## 三、部署前先验证

```bash
npm test           # 单测 + 数据完整性测试
npm run test:gate  # 构建产物与体积门禁
npm run lint       # tsc + eslint
```

**本仓库实测结果：**

| 命令 | 结果 |
|---|---|
| `npm test` | **154 通过**，16 个文件，0 skipped |
| `npm run test:gate` | **17 通过**，4 个文件 |
| `npm run build` | 退出码 0 |

门禁套件读的是真实构建产物，**读不到就失败**，不会静默放行。所以要先 `npm run build` 再 `npm run test:gate`。

## 四、选构建模式（本教程最重要的一节）

上游 Vite preset 支持三种形态完全不同的产物，它们**不可互换**。

| 模式 | 命令 | 代码分割 | 平台遥测 | 适用 |
|---|---|---|---|---|
| **A. 平台默认** | `npm run build` | ✅ 107 个 JS chunk | ❌ 会注入 | 公开部署别用，见下 |
| **B. Standalone** | `MIAODA_BUILD_TARGET=standalone npm run build` | ❌ 单个 7.3 MB IIFE | ✅ 无 | `file://` 双击打开、离线 U 盘 |
| **C. 干净 Web 构建** ⭐ | 见 4.3 | ✅ 107 个 JS chunk | ✅ 无 | **公开网站托管，推荐** |

### 4.1 模式 A——平台默认（不推荐公开托管）

```bash
npm run build
```

产物的代码分割是正确的，**但会往 `index.html` 注入四个平台脚本**：

1. 外链性能 SDK，来自 `sf3-scmcdn-cn.feishucdn.com`
2. Slardar APM 引导，指向 `lf3-short.ibytedapm.com`
3. Tea / LogAnalytics 采集，指向 `lf3-cdn-tos.bytescm.com`
4. `viewContext` 块，赋值 `window.appId = "{{appId}}"` 之类

它还会把 `{{appName}}`、`{{appDescription}}`、`{{appAvatar}}` **原样留着**——平台是在服务端渲染时替换的。静态托管的话，你的浏览器标签页会真的显示 `{{appName}}`。

不走 4.3 就别把这个模式发出去。

### 4.2 模式 B——standalone

```bash
MIAODA_BUILD_TARGET=standalone npm run build
```

**实测：** 退出码 0，产物 HTML 中**不含**任何平台主机。

代价是刻意的，preset 源码里自己写着：standalone 产**单个 IIFE bundle**，这样产物能在 `file://` 下直接打开而无需服务器（ES module 在 opaque origin 下必被 CORS 拦）。实测：**一个 7,308,509 字节的 `index.js`**，没有别的 JS 资源。

也就是说**懒加载全没了**。29 个正文分片、四个视图 chunk、首屏预算，全部内联进这一个 7.3 MB 的下载里。做离线副本没问题，做网站就不对了。

### 4.3 模式 C——干净 Web 构建（推荐）

保住代码分割、去掉遥测、回填占位符、保留真 Google Fonts：

```bash
MIAODA_FONTS_MIRROR_OFF=1 npm run build
node scripts/strip-platform-telemetry.mjs
```

**实测输出：**

```
[strip-telemetry] 已回填 6 处平台占位符（appName / appDescription / appAvatar）
[strip-telemetry] 已移除 4 个平台脚本
[strip-telemetry] 7602 → 5309 字节（-2293）
[strip-telemetry] ✓ 复核通过：产物中已无平台遥测主机
```

处理之后，`index.html` 引用的外部主机只剩 `fonts.googleapis.com`、`fonts.gstatic.com`（字体）与 `schema.org`（JSON-LD 标识符，不发网络请求）。**代码分割完整保留（当前 109 个 JS chunk）。**

脚本做三件事，缺一不可：

1. 摘掉 4 个平台遥测脚本；
2. 回填 6 处 `{{appName}}` 之类的占位符；
3. **把 3 处平台字体镜像 `miaoda.feishu.cn/fonts` 改写成 Google Fonts 官方源**，并补一条 `fonts.gstatic.com` 的 preconnect。

第 3 条是后加的，因为实测发现 `MIAODA_FONTS_MIRROR_OFF=1` **并不会移除那三条 `<link>`**。在补上这段之前，脚本每次都会以 exit 2 结束并警告残留主机。

`scripts/strip-platform-telemetry.mjs` 是幂等的——跑两次安全，第二次会报"已是干净的"。它只删命中遥测特征的 `<script>` 块，JSON-LD 明确保留。

### 4.4 关于字体镜像

preset 默认把所有 `fonts.googleapis.com` / `fonts.gstatic.com` 地址改写到 `https://miaoda.feishu.cn/fonts`。这个镜像**公网确实可达**、返回真实字体文件，所以它没坏——但它是你多半不想要的平台依赖。

`MIAODA_FONTS_MIRROR_OFF=1` 本意是关掉平台的字体镜像改写。**实测它并不生效**：加与不加，产物 HTML 里都还是三条指向 `miaoda.feishu.cn/fonts` 的 `<link>`（两条 preconnect、一条 stylesheet），构建日志里也没有任何字体相关输出。

真正起作用的是 strip 脚本里的改写步骤。保留这个环境变量只是为了将来平台修好后能自然衔接，**不要依赖它**。

如果你的网络访问不了 Google Fonts，请自托管字体——见[自行修改教程第四节](CUSTOMIZATION.zh-CN.md)。去掉环境变量没有用，因为它本来就不生效。

## 五、组装可部署目录

构建把 HTML 与资源分在不同文件夹（平台 CDN 的约定）。普通静态托管必须合并：

```bash
mkdir -p site
cp -R dist/output/.          site/
cp -R dist/output_resource/assets  site/assets
```

得到的结构：

```
site/
├── index.html
├── favicon.svg
├── icons.svg
├── routes.json
└── assets/          # 107 个 JS chunk + CSS
```

**实测总量约 26 MB**（未压缩）。大头是 29 个长文分片——261 万字的正文。开了 gzip/brotli 之后实际传输量小得多；而且分片是按需取的，不是首屏就拉。

`index.html` 用绝对路径 `/assets/...` 引用资源。子路径部署见第七节。

## 六、托上去

### 6.1 任意静态托管

把 `site/` 目录传上去即可。Nginx、Apache、Caddy、S3+CloudFront、Cloudflare Pages、Netlify、Vercel、GitHub Pages，或开了静态网站的对象存储都行。

两个硬要求：

1. **未知路由回落到 `index.html`**（SPA fallback），因为应用用的是客户端路由。
2. **开 gzip 或 brotli。** 正文分片压缩率很高。

Nginx 示例：

```nginx
server {
    listen 80;
    server_name history.example.com;
    root /var/www/human-history-atlas;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

资源文件名带内容哈希，所以 `immutable` 是安全的。**唯独 `index.html` 不能 immutable 缓存**——每次部署后正是它指向新的哈希。

### 6.2 本地冒烟测试

```bash
cd site && python3 -m http.server 8901
```

然后打开 `http://127.0.0.1:8901/`。

**实测：** 应用完整渲染——时间轴、时代目录计数正确（10 / 80 / 173 / 246 / 108 / 70 / 76）、四个视图按钮、主题切换器与语言切换器都在。

`python3 -m http.server` **没有 SPA fallback**，所以深链会 404。这是测试服务器的局限，不是构建的问题。从根路径进去导航是正常的。

### 6.3 GitHub Pages

Pages 默认从子路径 `/<repo>/` 提供服务，这会让绝对的 `/assets/` 引用失效。两条路：

- 绑**自定义域名**（从根提供服务，最省事），或
- 带 base path 重新构建，见第七节。

Pages 也没有 SPA fallback；加一个内容等同 `index.html` 的 `404.html`。

### 6.4 离线 / `file://`

用**模式 B**（4.2）。按第五节合并后直接打开 `index.html`，不需要服务器。接受那个 7.3 MB 单包。

注意地图仍需联网——Esri 瓦片没有打进产物。

## 七、子路径部署

如果站点在 `https://example.com/history/` 而不是域名根：

```bash
CLIENT_BASE_PATH=/history MIAODA_FONTS_MIRROR_OFF=1 npm run build
node scripts/strip-platform-telemetry.mjs
```

`scripts/build.sh` 把 `MIAODA_APP_ID` 映射成 `CLIENT_BASE_PATH=/app/<id>`；直接设 `CLIENT_BASE_PATH` 会覆盖它。上传前先确认产出的 `index.html` 引用的是 `/history/assets/...`，并让主机的前缀处理保持一致。

## 八、静态托管下预期会出现的控制台噪音

即便摘掉了遥测，普通静态主机上控制台仍会报几条错。**这些是已知的、非致命的：**

| 报错 | 原因 | 影响 |
|---|---|---|
| `Failed to init time offset: SyntaxError: Unexpected token '<'` | 平台 toolkit 请求服务器时间接口，静态主机返回了 `index.html` | 无，回落本地时钟 |
| `Error fetching published app info` | 同上，取平台应用元信息 | 无 |
| `Log export failed: 501` | `@lark-apaas/client-toolkit-lite` 的 `logger` 发 POST 上报，静态主机拒绝 POST | 无，日志本就是尽力而为 |

带着这些报错，应用渲染与功能完全正常。这是验证过程中实际观察并确认无害的。要彻底消除得去改 toolkit 依赖本身，超出本仓库范围。

## 九、排错

| 症状 | 原因 | 处置 |
|---|---|---|
| 安装报 `EINTEGRITY` | 锁文件钉在不可达 registry | 1.1 |
| `bash: scripts/build.sh: cannot execute` | Windows 没有 Bash | Git Bash / WSL，或直接 `npx vite build` |
| 标签页显示 `{{appName}}` | 占位符没替换 | 跑 `scripts/strip-platform-telemetry.mjs` |
| 白屏，`/assets/*` 全 404 | HTML 与资源没合并 | 第五节 |
| 根路径正常、深链 404 | 没配 SPA fallback | 6.1 |
| 放子目录后全 404 | 绝对 base path | 第七节 |
| 字体回落成系统衬线 | Google Fonts 被墙 | 自托管字体（去掉环境变量无效，它本来就不生效） |
| 右下角出现「妙搭生成」水印 | 没走本仓库的 `vite.config.ts` | 该文件用 `define` 把客户端 build target 设为 `standalone`，`AppContainer` 据此不渲染水印；沿用它即可 |
| 地图瓦片空白 | 无网络或 Esri 不可达 | 地图需要联网，见[第三方素材声明](THIRD-PARTY-NOTICES.zh-CN.md) |
| `test:gate` 报找不到产物 | 还没构建 | 先 `npm run build` |
| 只有一个 7 MB 的 `index.js` | 你用了 standalone 模式 | 改用模式 C（4.3） |

## 十、上线前检查清单

- [ ] `npm install` 退出码 0
- [ ] `npm test` → 154 通过
- [ ] `npm run build` 退出码 0
- [ ] `npm run test:gate` → 17 通过
- [ ] 跑过 `strip-platform-telemetry.mjs`，且输出"✓ 复核通过"
- [ ] `index.html` 的 `<title>` 是真实文字，不是 `{{appName}}`
- [ ] `index.html` 中不含 `ibytedapm` / `bytescm` / `feishucdn` 主机
- [ ] HTML 与 `assets/` 已合并到一个目录
- [ ] SPA fallback 已配置
- [ ] gzip/brotli 已开启
- [ ] `index.html` 未被 immutable 缓存
- [ ] 已阅读[第三方素材声明](THIRD-PARTY-NOTICES.zh-CN.md)中关于 Esri 条款的部分

---

下一篇：[自行修改教程](CUSTOMIZATION.zh-CN.md) · [架构说明](ARCHITECTURE.zh-CN.md) · [开源贡献指南](CONTRIBUTING.zh-CN.md)
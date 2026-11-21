# Deployment Guide

**English** · [简体中文](DEPLOYMENT.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

Every command in this guide was executed against this repository before the guide was written. Measured results are quoted where they matter. Where something does **not** work, it says so.

## 0. Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | **20+** (verified on 22.23.4) | Vite 8 requires a modern Node |
| npm | **10+** (verified on 10.9.9) | |
| Bash | any | `npm run build` runs `bash scripts/build.sh` |
| Disk | ~1.5 GB | `node_modules` plus build output |

**Windows users:** `npm run build` invokes a Bash script. Use **Git Bash**, **WSL**, or run the underlying Vite command directly (§6.1). PowerShell and `cmd` cannot execute `build.sh` natively.

## 1. Install

```bash
git clone https://github.com/lxy0714/human-history-atlas.git
cd human-history-atlas
npm install
```

**Verified result:** exit code 0.

### 1.1 About the lockfile — read this if install fails

The project originated on a hosted app platform. Its original `package-lock.json` pinned **812 package entries** to two registries that are not usable from the public internet:

| Original host | Entries | Problem |
|---|---|---|
| `registry.npmmirror.com` | 766 | Mirror; integrity mismatches against npmjs metadata |
| `miaoda-release-npm-cache.feishu.cn` | 46 | Platform-internal cache; now returns an HTML 404 page |

Installing against that lockfile fails with **`EINTEGRITY`**. Switching `.npmrc` alone does **not** fix it, because `resolved` URLs inside the lockfile take precedence over the configured registry.

**This repository ships with the lockfile already repaired**: all 812 `resolved` hosts were rewritten to `https://registry.npmjs.org`, and `.npmrc` sets the same registry. The tarball paths are identical across these hosts, so only the hostname changed — no version, no integrity hash was altered.

If you ever regenerate the lockfile on the original platform, re-apply the rewrite:

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

Nuclear option (loses version pinning): `rm package-lock.json && npm install`.

## 2. Development server

```bash
npm run dev
```

Open the URL it prints. Hot reload is enabled.

## 3. Verify before deploying

```bash
npm test           # unit + data-integrity tests
npm run test:gate  # build-artifact and bundle-size gates
npm run lint       # tsc + eslint
```

**Verified results on this repository:**

| Command | Result |
|---|---|
| `npm test` | **154 passed**, 16 files, 0 skipped |
| `npm run test:gate` | **17 passed**, 4 files |
| `npm run build` | exit 0 |

The gate suite reads real build artefacts and **fails** if it cannot find them — it does not silently pass. Run `npm run build` before `npm run test:gate`.

## 4. Choose your build mode

This is the most important section. The upstream Vite preset supports three distinct output shapes, and they are **not** interchangeable.

| Mode | Command | Code splitting | Platform telemetry | Best for |
|---|---|---|---|---|
| **A. Platform default** | `npm run build` | ✅ 107 JS chunks | ❌ injected | Nothing, for public use — see below |
| **B. Standalone** | `MIAODA_BUILD_TARGET=standalone npm run build` | ❌ single 7.3 MB IIFE | ✅ none | `file://` double-click, offline USB stick |
| **C. Clean web build** ⭐ | see §4.3 | ✅ 107 JS chunks | ✅ none | **Public web hosting — recommended** |

### 4.1 Mode A — platform default (not recommended for public hosting)

```bash
npm run build
```

Produces correctly code-split output, **but injects four platform scripts** into `index.html`:

1. an external performance SDK from `sf3-scmcdn-cn.feishucdn.com`
2. a Slardar APM bootstrap pointing at `lf3-short.ibytedapm.com`
3. a Tea / LogAnalytics collector pointing at `lf3-cdn-tos.bytescm.com`
4. a `viewContext` block assigning `window.appId = "{{appId}}"` and friends

It also leaves `{{appName}}`, `{{appDescription}}` and `{{appAvatar}}` **unreplaced** — the platform substitutes these at serve time. Hosted statically, your browser tab literally reads `{{appName}}`.

Do not ship this mode publicly without §4.3.

### 4.2 Mode B — standalone

```bash
MIAODA_BUILD_TARGET=standalone npm run build
```

**Verified:** exit 0, and the output HTML contains **no** platform hosts.

The trade-off is deliberate and documented in the preset itself: standalone emits a **single IIFE bundle** so the result can be opened from `file://` without a server (ES modules are CORS-blocked on opaque origins). Measured: **one `index.js` of 7,308,509 bytes**, no other JS assets.

That means **all lazy loading is gone**. The 29 body shards, the four view chunks and the first-screen budget are all inlined into one 7.3 MB download. Fine for an offline copy; wrong for a website.

### 4.3 Mode C — clean web build (recommended)

Keeps code splitting, removes telemetry, restores the placeholders, and keeps real Google Fonts:

```bash
MIAODA_FONTS_MIRROR_OFF=1 npm run build
node scripts/strip-platform-telemetry.mjs
```

**Verified output:**

```
[strip-telemetry] 已回填 6 处平台占位符（appName / appDescription / appAvatar）
[strip-telemetry] 已移除 4 个平台脚本
[strip-telemetry] 7602 → 5309 字节（-2293）
[strip-telemetry] ✓ 复核通过：产物中已无平台遥测主机
```

After this, the only external hosts referenced by `index.html` are `fonts.googleapis.com`, `fonts.gstatic.com` (webfonts) and `schema.org` (a JSON-LD identifier, not a network request). **107 JS chunks are preserved.**

`scripts/strip-platform-telemetry.mjs` is idempotent — running it twice is safe and reports "already clean". It only removes `<script>` blocks matching telemetry signatures; JSON-LD is explicitly preserved.

### 4.4 About the font mirror

By default the preset rewrites every `fonts.googleapis.com` / `fonts.gstatic.com` URL to `https://miaoda.feishu.cn/fonts`. That mirror **is publicly reachable** and serves real font files, so it is not broken — but it is a platform dependency you probably do not want.

`MIAODA_FONTS_MIRROR_OFF=1` is meant to disable the platform's font-mirror rewrite. **Measured: it does not work.** With or without the flag, the built HTML still carries three `<link>` tags pointing at `miaoda.feishu.cn/fonts` (two preconnects, one stylesheet), and the build log contains no font-related output at all.

What actually fixes it is the rewrite step inside the strip script. The environment variable is kept only so the setup still works if the platform fixes it later — **do not rely on it**.

If Google Fonts is blocked on your network, self-host the fonts — see [Customization §4](CUSTOMIZATION.md). Dropping the flag will not help, since it has no effect.

## 5. Assemble the deployable directory

The build splits HTML and assets into separate folders (a platform CDN convention). For ordinary static hosting you must merge them:

```bash
mkdir -p site
cp -R dist/output/.          site/
cp -R dist/output_resource/assets  site/assets
```

Resulting layout:

```
site/
├── index.html
├── favicon.svg
├── icons.svg
├── routes.json
└── assets/          # 107 JS chunks + CSS
```

**Measured total: ~26 MB** uncompressed. This is dominated by the 29 long-form body shards — 2.61 million characters of prose. With gzip/brotli enabled on your host, actual transfer is far smaller; the shards are fetched on demand, not on first load.

`index.html` references assets as `/assets/...` (absolute). See §7 for sub-path hosting.

## 6. Host it

### 6.1 Any static host

Upload the `site/` directory. Works with Nginx, Apache, Caddy, S3+CloudFront, Cloudflare Pages, Netlify, Vercel, GitHub Pages, or an object store with static website enabled.

Two requirements:

1. **Serve `index.html` for unknown routes** (SPA fallback), because the app uses client-side routing.
2. **Enable gzip or brotli.** The content shards compress very well.

Nginx example:

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

Asset filenames are content-hashed, so `immutable` is safe. **Do not** cache `index.html` immutably — it is the file that points at the new hashes after each deploy.

### 6.2 Local smoke test

```bash
cd site && python3 -m http.server 8901
```

Then open `http://127.0.0.1:8901/`.

**Verified:** the app renders fully — timeline, era catalogue with correct counts (10 / 80 / 173 / 246 / 108 / 70 / 76), all four view buttons, theme switcher and language switcher.

`python3 -m http.server` has **no SPA fallback**, so deep links 404. That is a limitation of the test server, not of the build. Navigating from the root works.

### 6.3 GitHub Pages

GitHub Pages serves from a sub-path (`/<repo>/`) by default, which breaks the absolute `/assets/` references. Either:

- use a **custom domain** (serves from root — simplest), or
- rebuild with a base path, see §7.

Pages also has no SPA fallback; add a `404.html` that is a copy of `index.html`.

### 6.4 Offline / `file://`

Use **Mode B** (§4.2). Merge as in §5, then open `index.html` directly. No server needed. Accept the 7.3 MB single bundle.

Note the map still requires network access — Esri tiles are not bundled.

## 7. Deploying under a sub-path

If the site lives at `https://example.com/history/` rather than the domain root:

```bash
CLIENT_BASE_PATH=/history MIAODA_FONTS_MIRROR_OFF=1 npm run build
node scripts/strip-platform-telemetry.mjs
```

`scripts/build.sh` maps `MIAODA_APP_ID` to `CLIENT_BASE_PATH=/app/<id>`; setting `CLIENT_BASE_PATH` directly overrides that. Verify the emitted `index.html` references `/history/assets/...` before uploading, and configure your host to strip or preserve the prefix consistently.

## 8. Expected console noise on a static host

Even after stripping telemetry, the browser console shows a few errors on a plain static host. **These are known and non-fatal:**

| Message | Cause | Impact |
|---|---|---|
| `Failed to init time offset: SyntaxError: Unexpected token '<'` | The platform toolkit requests a server time endpoint; the static host returns `index.html` | None — falls back to local clock |
| `Error fetching published app info` | Same, for platform app metadata | None |
| `Log export failed: 501` | `logger` from `@lark-apaas/client-toolkit-lite` POSTs logs; static hosts reject POST | None — logging is best-effort |

The application renders and functions correctly with these present. They were observed and confirmed harmless during verification. Removing them entirely would mean patching the toolkit dependency, which is out of scope for this repository.

## 9. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `EINTEGRITY` during install | Lockfile pinned to unreachable registries | §1.1 |
| `bash: scripts/build.sh: cannot execute` | Windows without Bash | Git Bash / WSL, or §4 with `npx vite build` |
| Browser tab says `{{appName}}` | Placeholders not substituted | Run `scripts/strip-platform-telemetry.mjs` |
| Blank page, 404 on every `/assets/*` | HTML and assets not merged | §5 |
| Root works, deep links 404 | No SPA fallback | §6.1 |
| Everything 404 under a sub-directory | Absolute base path | §7 |
| Fonts fall back to system serif | Google Fonts blocked | Self-host the fonts (dropping the flag has no effect) |
| A platform watermark appears bottom-right | Not using this repo's `vite.config.ts` | That file uses `define` to set the client build target to `standalone`, which makes `AppContainer` skip the watermark; keep it |
| Map tiles blank | No network, or Esri unreachable | Map needs internet; see [Third-Party Notices](THIRD-PARTY-NOTICES.md) |
| `test:gate` fails with "artefacts not found" | Build not run yet | `npm run build` first |
| One 7 MB `index.js`, no other chunks | You built in standalone mode | Use Mode C (§4.3) |

## 10. Pre-launch checklist

- [ ] `npm install` exits 0
- [ ] `npm test` → 154 passed
- [ ] `npm run build` exits 0
- [ ] `npm run test:gate` → 17 passed
- [ ] Ran `strip-platform-telemetry.mjs`; it reports "✓ 复核通过"
- [ ] `index.html` `<title>` is real text, not `{{appName}}`
- [ ] No `ibytedapm` / `bytescm` / `feishucdn` hosts in `index.html`
- [ ] HTML and `assets/` merged into one directory
- [ ] SPA fallback configured
- [ ] gzip/brotli enabled
- [ ] `index.html` not cached immutably
- [ ] Read [Third-Party Notices](THIRD-PARTY-NOTICES.md) regarding Esri terms

---

Next: [Customization](CUSTOMIZATION.md) · [Architecture](ARCHITECTURE.md) · [Contributing](CONTRIBUTING.md)
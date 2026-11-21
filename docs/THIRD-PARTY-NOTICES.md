# Third-Party Notices

**English** · [简体中文](THIRD-PARTY-NOTICES.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

This repository's [MIT](../LICENSE) and [CC BY-SA 4.0](../LICENSE-CONTENT) licences cover **only what this project authored**. Everything below belongs to someone else and keeps its own terms.

**Read §1 before any public or commercial deployment.** It is the section most likely to affect you.

## 1. Esri World Imagery — satellite basemap

The map view renders satellite tiles from:

```
https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
```

- **Owner:** Esri (Environmental Systems Research Institute), with imagery contributed by a network of data providers.
- **Fetched at runtime.** No tiles are bundled in this repository. The map requires network access and does not work offline.
- **Not covered by this repository's licences.** Neither MIT nor CC BY-SA grants you any right to Esri's imagery.

### What you must do

1. **Keep the attribution.** The map displays an Esri attribution string. Removing it is a terms violation, not a styling choice.
2. **Check the current terms yourself before deploying publicly or commercially.** Esri's basemap usage terms distinguish between development, internal use, and public/commercial deployment, and may require an ArcGIS account or subscription depending on usage and volume.

   Authoritative sources:
   - Esri Terms of Use — <https://www.esri.com/en-us/legal/terms/full-master-agreement>
   - ArcGIS Online basemap terms — <https://www.esri.com/en-us/arcgis/products/arcgis-online/resources>

> **This project does not grant you Esri rights and cannot warrant that your intended use is permitted.** The maintainer uses the public tile endpoint for a personal, non-commercial educational project. If you plan a commercial product, a high-traffic site, or an offline redistribution, **verify your licence position with Esri first, or switch basemaps.**

### Switching basemaps

If Esri's terms do not fit your use, replace the tile URL. See [Customization §6](CUSTOMIZATION.md). Alternatives with different terms include OpenStreetMap raster tiles (ODbL, attribution required, tile-usage policy applies), a self-hosted tile server, or a commercial provider you have a contract with.

**Two constraints survive any basemap swap:** keep `isolation: isolate` on the map container, and keep the projector overlay portalled to `document.body`. Both are documented regression fixes.

## 2. Webfonts

Loaded in `index.html` from Google Fonts:

| Family | Use | Licence |
|---|---|---|
| **ZCOOL XiaoWei** (站酷小薇) | Display / headings | SIL Open Font License 1.1 |
| **Noto Sans SC** | Body sans | SIL Open Font License 1.1 |
| **Noto Serif SC** | Serif / vertical classical reading | SIL Open Font License 1.1 |

- **Served by:** Google Fonts (`fonts.googleapis.com` for CSS, `fonts.gstatic.com` for font files).
- **OFL 1.1 permits** bundling, self-hosting, modification and commercial use. It requires that the licence and copyright notice accompany the fonts, and that modified versions not use the reserved font names.
- **Privacy note:** loading from Google Fonts sends the visitor's IP to Google. If that matters for your deployment (GDPR considerations in particular), **self-host the fonts** — see [Customization §4](CUSTOMIZATION.md).

### The platform font mirror

The upstream Vite preset rewrites Google Fonts URLs to `https://miaoda.feishu.cn/fonts` by default. That mirror is publicly reachable and serves the same font families from a Feishu CDN. It is a platform convenience for networks where Google is unreachable.

**For an independent deployment, build with `MIAODA_FONTS_MIRROR_OFF=1`** to keep the original Google Fonts URLs, or self-host. See [Deployment §4.4](DEPLOYMENT.md).

## 3. Platform telemetry — removed for open-source builds

The upstream preset (`@lark-apaas/coding-preset-vite-react`) injects four scripts into the built HTML in its default mode:

| Injected | Host | Purpose |
|---|---|---|
| Performance SDK | `sf3-scmcdn-cn.feishucdn.com` | Platform performance monitoring |
| Slardar APM | `lf3-short.ibytedapm.com` | ByteDance application monitoring |
| Tea / LogAnalytics | `lf3-cdn-tos.bytescm.com` | Platform analytics |
| `viewContext` | inline | `window.appId` / `userId` / `tenantId` placeholders |

**These are stripped by `scripts/strip-platform-telemetry.mjs`**, which the deployment guide's recommended build path runs. After stripping, no visitor data is sent to any of these hosts.

If you build in the platform default mode and host the output **without** running the strip script, you will be sending your visitors' data to ByteDance analytics endpoints. **Do not do that silently** — either strip them, or disclose the telemetry to your users.

Standalone mode (`MIAODA_BUILD_TARGET=standalone`) also omits them, at the cost of code splitting.

## 4. npm dependencies

**65 direct dependencies.** Licence distribution across all installed top-level packages, measured from `node_modules` on 2026-11-21:

| Licence | Packages |
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
| **No licence field declared** | **4** |

**All 65 direct dependencies use permissive licences** (MIT / ISC / BSD / Apache-2.0). The notable non-MIT cases are transitive:

| Package | Version | Licence | Note |
|---|---|---|---|
| `lightningcss` (+ platform binaries) | 1.32.0 | **MPL-2.0** | File-level copyleft. Used at build time by Tailwind. Does not impose obligations on your application source, but if you modify MPL-covered files you must make those files available under MPL. |
| `caniuse-lite` | 1.0.30001819 | **CC-BY-4.0** | Browser-support data. Attribution required; build-time only. |
| `argparse` | 2.0.1 | Python-2.0 | Build-time transitive. |

### Packages with no declared licence — disclosure

These four publish to npm without a `license` field. **Absence of a licence field is not permission.** They are listed so you can make your own judgement:

| Package | Version | Note |
|---|---|---|
| `@lark-apaas/dataloom` | 0.1.6 | Platform package |
| `@lark-apaas/miaoda-inspector` | 1.0.25 | Platform package |
| `@lark-apaas/observable-web` | 1.0.11 | Platform package |
| `svg-tags` | 1.0.0 | Tiny static tag list, transitive |

The three `@lark-apaas/*` packages are published publicly on `registry.npmjs.org` by the platform vendor. This project does not claim rights over them and cannot grant them to you. **If you need a fully clean licence chain, audit or remove these dependencies.** The application's own source imports only `logger` from `@lark-apaas/client-toolkit-lite`; the surface area is small.

### Key runtime libraries

| Library | Version | Licence | Role |
|---|---|---|---|
| React / React DOM | 19.2 | MIT | UI |
| Vite | 8 | MIT | Build |
| TypeScript | 5.9 | Apache-2.0 | Types |
| Tailwind CSS | 4.2 | MIT | Styling |
| Radix UI | various | MIT | Accessible primitives |
| Leaflet | 1.9.4 | BSD-2-Clause | Map |
| ECharts | 5.6 | Apache-2.0 | Charts |
| Framer Motion | 12.38 | MIT | Animation |
| react-router-dom | 7.13 | MIT | Routing |
| Vitest | 5 | MIT | Tests |
| lucide-react | 0.577 | ISC | Icons |
| next-themes | — | MIT | Theme persistence |
| crypto-js | — | MIT | Hashing |

Each retains its own copyright and licence text in `node_modules/<package>/LICENSE`. Run `npm ls --all` for the full tree.

## 5. Historical facts and source material

- **Historical facts are not copyrightable.** Nobody owns the date of the Qin unification.
- **This project's prose about those facts** is licensed CC BY-SA 4.0 — that is our writing, not the events.
- **No third-party text was copied into this corpus.** It is AI-assisted writing over mainstream consensus, not a transcription of any reference work. See [Sources & Inspiration](SOURCES-AND-INSPIRATION.md) for the full, honest account.

If you contribute content, **do not paste from copyrighted books, paywalled articles, or other encyclopedias.** See [Contributing §9](CONTRIBUTING.md).

## 6. Trademarks

Names of civilisations, dynasties, historical figures, places and events are used descriptively. Any trademarks among them belong to their owners. This project is not affiliated with, endorsed by, or sponsored by Esri, Google, ByteDance, or any institution mentioned in the corpus.

## 7. Regenerating this inventory

Do not trust the table in §4 — dependencies drift. Re-measure:

```bash
npm ls --all --json > deps.json
npx license-checker --summary        # if you install it
```

Or scan `node_modules/*/package.json` for the `license` field directly.

**Any PR that adds a dependency must update this page.**

---

Next: [Deployment](DEPLOYMENT.md) · [Sources & Inspiration](SOURCES-AND-INSPIRATION.md) · [Contributing](CONTRIBUTING.md)
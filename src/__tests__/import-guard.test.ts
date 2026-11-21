// 源码静态扫描门禁
// 防止有人静态 import 旧 history.ts 把 3.2MB 大包重新拽回首屏
// 不依赖任何构建产物，直接扫描 src 下所有 .ts / .tsx 文件

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SRC_ROOT = join(__dirname, '..');

// 自身测试文件路径，排除扫描
const SELF_PATH = relative(SRC_ROOT, __filename).split(sep).join('/');

// 已知排除目录（懒加载 chunk / 数据模块自身，不影响首屏）
// 新增文件不会自动进入排除列表，必须显式添加（code review 关注点）
const EXCLUDED_DIR_PREFIXES = [
  // 数据模块内部引用是正常的（它们就是数据本身）
  'data/',
];

// 只扫描 ts/tsx，排除测试文件自身
function collectFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const result: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // 跳过 node_modules / ui 组件目录（不会 import history）
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      result.push(...collectFiles(full));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      const rel = relative(SRC_ROOT, full).split(sep).join('/');
      // 排除自身
      if (rel === SELF_PATH) continue;
      // 排除所有 test / spec 文件（测试里可能故意引）
      if (/\.(test|spec)\.(ts|tsx)$/.test(rel)) continue;
      // 排除 .tmp.ts / .tmp.tsx 生成脚本（不进构建产物）
      if (/\.tmp\.(ts|tsx)$/.test(rel)) continue;
      // 排除已知目录
      if (EXCLUDED_DIR_PREFIXES.some((p) => rel.startsWith(p))) continue;
      result.push(full);
    }
  }
  return result;
}

interface Violation {
  file: string;
  line: number;
  code: string;
  reason: string;
}

function scanForViolations(files: string[]): Violation[] {
  const violations: Violation[] = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const rel = relative(SRC_ROOT, file).split(sep).join('/');

    lines.forEach((rawLine, idx) => {
      const line = rawLine.trim();
      const lineNum = idx + 1;

      // 跳过注释行
      if (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) return;

      // 1. 禁止 @vite-ignore
      if (/@vite-ignore/.test(line)) {
        violations.push({
          file: rel,
          line: lineNum,
          code: line,
          reason: '禁止使用 @vite-ignore（会让动态 import 失去代码分割）',
        });
      }

      // 2. 禁止从 history 模块（非 history-index / history-constants / bodies）导入
      // 匹配 from '...history' 或 from '...history/index' 等
      const importMatch = line.match(
        /from\s+['"]([^'"]*(?:\/|\.)?history[^'"]*)['"]/,
      );
      if (importMatch) {
        const importPath = importMatch[1];
        // 允许的安全路径
        const safePatterns = [
          'history-index',
          'history-constants',
          'history-loader',
          'history-slices',
          'bodies/',
          'data/history/', // 子目录
        ];
        const isSafe = safePatterns.some((p) => importPath.includes(p));
        // 注意：data/history.ts 本体是全量数据模块，不允许
        const isExactHistoryFile = /\/history$|\/history\.ts$|data\/history$/.test(importPath)
          && !importPath.includes('history-index')
          && !importPath.includes('history-constants')
          && !importPath.includes('history-loader')
          && !importPath.includes('history-slices');
        if (!isSafe && isExactHistoryFile) {
          violations.push({
            file: rel,
            line: lineNum,
            code: line,
            reason: `禁止从全量 history 模块导入 (${importPath})，请使用 history-index / history-constants`,
          });
        }
      }

      // 3. 禁止动态 import history
      const dynamicMatch = line.match(/import\s*\(\s*['"]([^'"]*(?:\/|\.)?history[^'"]*)['"]\s*\)/);
      if (dynamicMatch) {
        const importPath = dynamicMatch[1];
        const safePatterns = [
          'history-index',
          'history-constants',
          'history-loader',
          'history-slices',
          'bodies/',
        ];
        const isSafe = safePatterns.some((p) => importPath.includes(p));
        const isExactHistoryFile = /\/history$|\/history\.ts$|data\/history$/.test(importPath)
          && !importPath.includes('history-index')
          && !importPath.includes('history-constants')
          && !importPath.includes('history-loader')
          && !importPath.includes('history-slices');
        if (!isSafe && isExactHistoryFile) {
          violations.push({
            file: rel,
            line: lineNum,
            code: line,
            reason: `禁止动态 import 全量 history 模块 (${importPath})`,
          });
        }
      }

      // 4. 禁止 ALL_HISTORY_NODES / HISTORY_NODES 标识符（全量数组标志）
      // 数据模块和已知懒加载目录已在上方排除，这里只检查首屏链路业务代码
      if (/\bALL_HISTORY_NODES\b/.test(line)) {
        violations.push({
          file: rel,
          line: lineNum,
          code: line,
          reason: '禁止引用 ALL_HISTORY_NODES（全量节点数组体积过大），请使用 HISTORY_NODES_INDEX 或按需加载',
        });
      }
      if (/\bHISTORY_NODES\b/.test(line) && !/HISTORY_NODES_INDEX/.test(line)) {
        // 只命中 HISTORY_NODES（排除 HISTORY_NODES_INDEX 这个更长的变体）
        violations.push({
          file: rel,
          line: lineNum,
          code: line,
          reason: '禁止引用 HISTORY_NODES（全量节点数组体积过大），请使用 HISTORY_NODES_INDEX 或按需加载',
        });
      }
    });
  }

  return violations;
}

// 模块级：扫描所有源码文件（多个 describe 共享）
const allFiles = collectFiles(SRC_ROOT);

describe('源码静态扫描：禁止全量 history 模块回潮', () => {
  const violations = scanForViolations(allFiles);

  it(`扫描了 ${allFiles.length} 个源码文件`, () => {
    expect(allFiles.length).toBeGreaterThan(50);
  });

  it('没有文件从 @/data/history 全量模块静态导入', () => {
    const bad = violations.filter((v) => v.reason.includes('全量 history 模块导入'));
    expect(bad, formatViolations(bad)).toHaveLength(0);
  });

  it('没有文件动态 import 全量 history 模块', () => {
    const bad = violations.filter((v) => v.reason.includes('动态 import 全量'));
    expect(bad, formatViolations(bad)).toHaveLength(0);
  });

  it('没有文件引用 ALL_HISTORY_NODES / HISTORY_NODES 全量数组', () => {
    const bad = violations.filter(
      (v) => v.reason.includes('ALL_HISTORY_NODES') || v.reason.includes('HISTORY_NODES（全量'),
    );
    expect(bad, formatViolations(bad)).toHaveLength(0);
  });

  it('没有文件使用 @vite-ignore', () => {
    const bad = violations.filter((v) => v.reason.includes('@vite-ignore'));
    expect(bad, formatViolations(bad)).toHaveLength(0);
  });
});

// ========== 专题馆过期数字静态扫描 ==========
// 防止把总数写死在文案里，数据增长后数字过期没人更新
// 改数据时记得一起更新文案（或改成 .length 动态计算）
describe('专题馆文案：禁止硬编码过期的节点/关系/术语总数', () => {
  const specialsFiles = allFiles.filter((f) =>
    f.includes(`${sep}pages${sep}HomePage${sep}specials${sep}`),
  );

  // 已知过期的硬编码数字（历史上踩过的坑）
  // 键=正则，值=说明（应该用什么动态值代替）
  const STALE_NUMBER_PATTERNS: { pattern: RegExp; reason: string }[] = [
    {
      pattern: /200\+/,
      reason: '「200+ 历史节点」已过期，应改用 ALL_HISTORY_NODES_INDEX.length 动态计算',
    },
    {
      pattern: /739 个历史节点/,
      reason: '「739 个历史节点」已过期，应改用 ALL_HISTORY_NODES_INDEX.filter(n=>n).length',
    },
    {
      pattern: /1450 条关系/,
      reason: '「1450 条关系」已过期，应改用 RELATIONS.length',
    },
    {
      pattern: /136 条历史术语/,
      reason: '「136 条历史术语」已过期，应改用 GLOSSARY_TERMS.length',
    },
    {
      pattern: /114 个节点记忆要点/,
      reason: '「114 个节点记忆要点」已过期，应从 LEARNING_PATHS 动态计算',
    },
  ];

  const staleViolations: Violation[] = [];
  for (const filePath of specialsFiles) {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const relPath = relative(SRC_ROOT, filePath).split(sep).join('/');
    for (let i = 0; i < lines.length; i++) {
      for (const { pattern, reason } of STALE_NUMBER_PATTERNS) {
        if (pattern.test(lines[i])) {
          staleViolations.push({
            file: relPath,
            line: i + 1,
            code: lines[i],
            reason,
          });
        }
      }
    }
  }

  it(`扫描了 ${specialsFiles.length} 个 specials 文件`, () => {
    expect(specialsFiles.length).toBeGreaterThan(20);
  });

  it('没有硬编码过期的总数文案', () => {
    expect(staleViolations, formatViolations(staleViolations)).toHaveLength(0);
  });
});

function formatViolations(vs: Violation[]): string {
  if (vs.length === 0) return '';
  const lines = ['', '违规清单：'];
  for (const v of vs) {
    lines.push(`  ${v.file}:${v.line}  →  ${v.reason}`);
    lines.push(`    ${v.code.trim()}`);
  }
  lines.push('');
  return lines.join('\n');
}

// 验证扫描本身能工作（暴露一个函数给打靶测试用）
export { scanForViolations, collectFiles };

// ========== 圆角形状语言扫描 ==========
// 全站非圆形元件统一 2px 方角
// 大于 2px 的圆角只允许出现在白名单（节点圆点/地图标记/头像等圆形语义元件）

// rounded-full 白名单（目录前缀级）
// 现有使用 rounded-full 的模块统一登记，新增文件/目录必须显式加入
// 圆形语义元件（节点圆点/地图标记/头像）和胶囊形（pill chip/进度条）均在此列
// 管控目标：防止无意识引入新的圆形/胶囊元件，而非强制现有全部改方角
const ROUNDED_FULL_ALLOWLIST: { filePrefix: string; reason: string }[] = [
  // 时间轴 / 泳道 / 滑块
  { filePrefix: 'pages/HomePage/TimelineView.tsx', reason: '时间轴节点圆点/滑块手柄/返回顶部按钮' },
  { filePrefix: 'pages/HomePage/SwimLaneView.tsx', reason: '泳道节点圆点/pill chip/进度线' },
  { filePrefix: 'pages/HomePage/CivilizationSwimlane.tsx', reason: '文明泳道节点圆点' },
  { filePrefix: 'pages/HomePage/TimeSlider.tsx', reason: '播放头圆点/进度手柄' },
  // 详情面板系列
  { filePrefix: 'pages/HomePage/DetailPanel.tsx', reason: '迷你时间轴点/关系图点/导航按钮' },
  { filePrefix: 'pages/HomePage/detail/', reason: '详情子模块：延伸阅读/关系图/图片导航' },
  // 地图视图系列
  { filePrefix: 'pages/HomePage/MapView.tsx', reason: '地图标记圆点' },
  { filePrefix: 'pages/HomePage/map-clusters.ts', reason: '地图聚合标记' },
  { filePrefix: 'pages/HomePage/components/Empire', reason: '帝国层/详情页：标记圆点' },
  { filePrefix: 'pages/HomePage/components/LayerControlPanel.tsx', reason: '图层面板：圆形图例' },
  { filePrefix: 'pages/HomePage/components/HistoryProjector.tsx', reason: '历史投影仪：标记点' },
  { filePrefix: 'pages/HomePage/components/ProjectorControls.tsx', reason: '投影仪控件：圆形按钮' },
  { filePrefix: 'pages/HomePage/components/RoutePanel.tsx', reason: '路线面板：节点圆点' },
  { filePrefix: 'pages/HomePage/components/RelationGraphModal.tsx', reason: '关系图：节点圆点' },
  // 侧边栏 / 顶栏 / 列表
  { filePrefix: 'pages/HomePage/Sidebar.tsx', reason: 'pill chip/状态小点' },
  { filePrefix: 'pages/HomePage/Header.tsx', reason: 'spinner/通知红点/数字气泡' },
  { filePrefix: 'pages/HomePage/ListView.tsx', reason: 'pill 分类标签' },
  { filePrefix: 'pages/HomePage/ComparePanel.tsx', reason: 'pill 标签/圆形图标按钮' },
  // 启动屏 / 首页 / 专题馆
  { filePrefix: 'pages/HomePage/LoadingScreen.tsx', reason: '启动屏：进度条/动画圆点' },
  { filePrefix: 'pages/HomePage/HomePage.tsx', reason: '装饰光斑/进度条/pill 标签' },
  { filePrefix: 'pages/HomePage/SpecialHall.tsx', reason: 'pill 标题标签' },
  // 专题馆子目录（大量使用节点圆点/pill chip）
  { filePrefix: 'pages/HomePage/specials/', reason: '专题馆各模块：节点圆点/pill chip/圆形徽章' },
  // 公共组件
  { filePrefix: 'components/ui/', reason: 'shadcn 基础组件内部使用' },
  { filePrefix: 'components/ThemeSwitcher.tsx', reason: '主题预览圆点' },
  { filePrefix: 'components/ViewErrorBoundary.tsx', reason: '警告图标圆形容器' },
  { filePrefix: 'components/ViewSkeleton.tsx', reason: '骨架屏圆形占位' },
  { filePrefix: 'pages/HomePage/components/EmptyState.tsx', reason: '空状态图标圆形容器' },
  { filePrefix: 'pages/HomePage/ChunkLoadErrorView.tsx', reason: '警告图标圆形容器' },
];

function scanRadiusViolations(files: string[]): Violation[] {
  const violations: Violation[] = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const rel = relative(SRC_ROOT, file).split(sep).join('/');

    // 跳过 UI 基础组件（shadcn 内部细节不扫，业务代码才扫）
    if (rel.startsWith('components/ui/')) continue;
    // 跳过测试文件自身
    if (/\.(test|spec)\.(ts|tsx)$/.test(rel)) continue;
    // 跳过数据文件和 tailwind 主题（token 定义不是元件）
    if (rel.startsWith('data/')) continue;
    if (rel === 'tailwind-theme.css') continue;

    lines.forEach((rawLine, idx) => {
      const line = rawLine.trim();
      const lineNum = idx + 1;

      // 跳过注释行
      if (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) return;

      // 1. 检查任意像素值圆角类（如 rounded-[8px]）：值 > 2 且非 full
      const arbitraryMatch = line.match(/rounded-\[(\d+(?:\.\d+)?)px\]/);
      if (arbitraryMatch) {
        const val = parseFloat(arbitraryMatch[1]);
        if (val > 2) {
          violations.push({
            file: rel,
            line: lineNum,
            code: line,
            reason: `硬编码圆角 ${val}px > 2px，请使用 rounded-[2px] 或确认是否为圆形语义元件`,
          });
        }
      }

      // 2. 检查裸 rounded（无后缀）：默认值 4px 不受 token 层管控，容易成为漏网之鱼
      // 匹配独立的 rounded 单词（前后没有 - 或 [），排除注释和字符串中偶然出现的
      const bareRoundedMatch = line.match(/(?<![\w-])rounded(?![\w\-\[])/);
      if (bareRoundedMatch) {
        // 确认确实是 class 名（在行内 className 中或 JSX className 属性里）
        // 宽松匹配：只要行内出现裸 rounded 且看起来像是在 class 字符串里
        violations.push({
          file: rel,
          line: lineNum,
          code: line,
          reason: '裸 rounded 类（无后缀）默认 4px，不受 radius token 管控，请用 rounded-[2px] 或 rounded-sm',
        });
      }

      // 3. 检查 rounded-full：必须在白名单
      if (/\brounded-full\b/.test(line)) {
        const inAllowlist = ROUNDED_FULL_ALLOWLIST.some((rule) =>
          rel.startsWith(rule.filePrefix),
        );
        if (!inAllowlist) {
          violations.push({
            file: rel,
            line: lineNum,
            code: line,
            reason: 'rounded-full 不在白名单内，非圆形语义元件请用 rounded-[2px]',
          });
        }
      }
    });
  }

  return violations;
}

describe('形状语言门禁：非圆形元件统一 2px 方角', () => {
  const radiusViolations = scanRadiusViolations(allFiles);

  it('业务代码中没有大于 2px 的硬编码圆角', () => {
    const bad = radiusViolations.filter((v) => v.reason.includes('硬编码圆角'));
    expect(bad, formatViolations(bad)).toHaveLength(0);
  });

  it('业务代码中没有裸 rounded 类（默认 4px 易漏改）', () => {
    const bad = radiusViolations.filter((v) => v.reason.includes('裸 rounded 类'));
    expect(bad, formatViolations(bad)).toHaveLength(0);
  });

  it('所有 rounded-full 都在白名单内（圆形语义元件）', () => {
    const bad = radiusViolations.filter((v) => v.reason.includes('rounded-full 不在白名单'));
    expect(bad, formatViolations(bad)).toHaveLength(0);
  });

  it('白名单条目数可控（防止白名单无限膨胀）', () => {
    expect(ROUNDED_FULL_ALLOWLIST.length).toBeLessThanOrEqual(35);
  });
});

// EXPORTS: PersonEgoGraph
// 人物关系专图（ego network）：以某人物为中心展开其人物关系网

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGraphPanZoom } from '../useGraphPanZoom';
import {
  ArrowLeft,
  Users,
  Search,
  X,
  Shuffle,
  User,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useDebouncedValue } from '@/utils/use-performance';
import type { HistoryState } from '../useHistoryStore';
import { RELATIONS } from '@/data/relations';
import { ALL_HISTORY_NODES_INDEX, type IHistoryNodeIndex } from '@/data/history-index';
import { useI18n } from '@/i18n';
import { smartTrim, bilingualHaystack } from '@/i18n/text';

interface PersonEgoGraphProps {
  store: HistoryState;
  onBack: () => void;
}

interface PersonNode {
  id: string;
  title: string;
  type?: string;
  yearDisplay?: string;
  eraId?: string;
}

interface PersonEdge {
  from: string;
  to: string;
  label: string;
  relationCategory: string;
}

interface EgoLayoutNode {
  id: string;
  title: string;
  yearDisplay?: string;
  x: number;
  y: number;
  edge: PersonEdge;
  fromId?: string;
}

// 快捷入口名人（8 个）
const FEATURED_PERSONS = [
  { id: 'confucius', name: '孔子', tag: '弟子门生' },
  { id: 'person-qinshihuang', name: '秦始皇', tag: '将相群臣' },
  { id: 'person-taizong', name: '唐太宗', tag: '凌烟阁臣' },
  { id: 'person-chengjisihan', name: '成吉思汗', tag: '黄金家族' },
  { id: 'person-socrates', name: '苏格拉底', tag: '哲人一脉' },
  { id: 'person-napoleon', name: '拿破仑', tag: '欧洲对手' },
  { id: 'person-washington', name: '华盛顿', tag: '建国群像' },
  { id: 'person-julius-caesar', name: '凯撒', tag: '罗马巨头' },
];

// 从关系 label 中推断关系子类
function categorizeRelation(label: string): { category: string; icon: string } {
  const l = label.toLowerCase();
  if (l.includes('师') || l.includes('门生') || l.includes('弟子') || l.includes('授业')) {
    return { category: '师承', icon: '' };
  }
  if (l.includes('君') || l.includes('臣') || l.includes('辅佐') || l.includes('相')) {
    return { category: '君臣', icon: '' };
  }
  if (l.includes('对') || l.includes('敌') || l.includes('争') || l.includes('抗') || l.includes('攻')) {
    return { category: '对手', icon: '' };
  }
  if (l.includes('父') || l.includes('母') || l.includes('子') || l.includes('女') || l.includes('兄') || l.includes('弟') || l.includes('家族') || l.includes('孙')) {
    return { category: '家族', icon: '' };
  }
  if (l.includes('夫') || l.includes('妻') || l.includes('后')) {
    return { category: '夫妻', icon: '' };
  }
  if (l.includes('友') || l.includes('同道') || l.includes('知') || l.includes('交游')) {
    return { category: '知己', icon: '' };
  }
  if (l.includes('兄') || l.includes('弟') && !l.includes('子弟')) {
    return { category: '兄弟', icon: '' };
  }
  return { category: '关联', icon: '' };
}

// 关系类别配色
const RELATION_CATEGORY_COLORS: Record<string, string> = {
  师承: '#f39c12',
  君臣: '#e74c3c',
  对手: '#9b59b6',
  家族: '#3498db',
  夫妻: '#e91e63',
  知己: '#1abc9c',
  兄弟: '#2ecc71',
  关联: '#95a5a6',
};

function getNodeById(id: string): IHistoryNodeIndex | undefined {
  return ALL_HISTORY_NODES_INDEX.find((n) => n.id === id);
}

// 获取所有 person 类型的节点
const ALL_PERSON_NODES = ALL_HISTORY_NODES_INDEX.filter(
  (n) => n.type === 'person' || n.id.startsWith('person-'),
);

export default function PersonEgoGraph({ store, onBack }: PersonEgoGraphProps) {
  const { nt, ns, ny } = useI18n();
  const [centerId, setCenterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedValue(searchQuery, 200);
  const [showSecondDegree, setShowSecondDegree] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { view, resetView, zoomBy } = useGraphPanZoom({
    minScale: 0.5,
    maxScale: 2,
    wheelStep: 0.9,
    enableDrag: false,
    enableTouch: true,
    wheelElement: containerRef as React.RefObject<HTMLElement | null>,
  });
  const zoom = view.scale;

  // 搜索结果
  const searchResults = useMemo(() => {
  
    if (!debouncedSearch.trim()) return [];
    const q = debouncedSearch.toLowerCase();
    return ALL_PERSON_NODES.filter(
      (n) =>
        bilingualHaystack(n.title, nt(n)).toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q) ||
        (ns(n) && bilingualHaystack(n.summary, ns(n)).toLowerCase().includes(q)),
    ).slice(0, 10);
  }, [debouncedSearch]);

  // 计算 ego 网络
  const egoData = useMemo(() => {
  
    if (!centerId) return null;

    // 一度关系（直接人物关系）
    const firstDegree = new Map<string, PersonEdge>();
    RELATIONS.forEach((r) => {
      if (r.type !== 'person') return;
      if (r.from === centerId) {
        firstDegree.set(r.to, {
          from: r.from,
          to: r.to,
          label: r.label,
          relationCategory: categorizeRelation(r.label).category,
        });
      } else if (r.to === centerId) {
        firstDegree.set(r.from, {
          from: r.to,
          to: r.from,
          label: r.label,
          relationCategory: categorizeRelation(r.label).category,
        });
      }
    });

    // 二度关系（朋友的朋友，person 类型）
    const secondDegree = new Map<string, PersonEdge>();
    if (showSecondDegree) {
      firstDegree.forEach((_, firstId) => {
        RELATIONS.forEach((r) => {
          if (r.type !== 'person') return;
          const otherId = r.from === firstId ? r.to : r.to === firstId ? r.from : null;
          if (!otherId || otherId === centerId || firstDegree.has(otherId)) return;
          // 只保留对方也是人物节点的
          const otherNode = getNodeById(otherId);
          if (otherNode && (otherNode.type === 'person' || otherNode.id.startsWith('person-'))) {
            if (!secondDegree.has(otherId)) {
              secondDegree.set(otherId, {
                from: firstId,
                to: otherId,
                label: r.label,
                relationCategory: categorizeRelation(r.label).category,
              });
            }
          }
        });
      });
    }

    const centerNode = getNodeById(centerId);

    return {
      center: centerNode
        ? {
            id: centerNode.id,
            title: nt(centerNode),
            type: centerNode.type,
            yearDisplay: ny(centerNode.yearDisplay),
            eraId: centerNode.eraId,
          }
        : null,
      firstDegree: Array.from(firstDegree.values()),
      secondDegree: Array.from(secondDegree.values()),
      secondDegreeIds: new Set(secondDegree.keys()),
    };
  }, [centerId, showSecondDegree]);

  // 随机一个人物
  const randomPerson = () => {
    const persons = ALL_PERSON_NODES.filter((n) => {
      const count = RELATIONS.filter(
        (r) => r.type === 'person' && (r.from === n.id || r.to === n.id),
      ).length;
      return count >= 3;
    });
    if (persons.length === 0) return;
    const p = persons[Math.floor(Math.random() * persons.length)];
    setCenterId(p.id);
  };

  const handleNodeClick = (nodeId: string) => {
    const node = getNodeById(nodeId);
    if (node) {
      store.openDetail(node);
    }
  };

  const handleSetCenter = (nodeId: string) => {
    setCenterId(nodeId);
    setSearchQuery('');
  };

  // 计算布局（简单环形布局）—— 必须在 early return 之前调用
  const layout = useMemo(() => {
    if (!egoData?.center) return { center: { x: 0, y: 0 }, first: [] as EgoLayoutNode[], second: [] as EgoLayoutNode[] };

    const cx = 300;
    const cy = 300;
    const firstRadius = 160;
    const secondRadius = 250;

    const firstNodes: EgoLayoutNode[] = [];
    (egoData?.firstDegree ?? []).forEach((e, i) => {
  
      const angle = (2 * Math.PI * i) / (egoData?.firstDegree.length ?? 1) - Math.PI / 2;
      const node = getNodeById(e.to);
      firstNodes.push({
        id: e.to,
        title: nt(node) ?? e.to,
        yearDisplay: ny(node?.yearDisplay),
        x: cx + firstRadius * Math.cos(angle),
        y: cy + firstRadius * Math.sin(angle),
        edge: e,
      });
    });

    const secondNodes: EgoLayoutNode[] = [];
    if (showSecondDegree) {
      (egoData?.secondDegree ?? []).forEach((e, i) => {
  
        const angle = (2 * Math.PI * i) / (egoData?.secondDegree.length ?? 1) - Math.PI / 2;
        const node = getNodeById(e.to);
        secondNodes.push({
          id: e.to,
          title: nt(node) ?? e.to,
          yearDisplay: ny(node?.yearDisplay),
          x: cx + secondRadius * Math.cos(angle),
          y: cy + secondRadius * Math.sin(angle),
          fromId: e.from,
          edge: e,
        });
      });
    }

    return { center: { x: cx, y: cy }, first: firstNodes, second: secondNodes };
  }, [egoData, showSecondDegree]);

  if (!centerId) {
    // 首页：快捷入口 + 搜索
    return (
      <div className="h-full overflow-y-auto px-3 py-4 md:px-5 md:py-6">
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground md:text-sm"
          >
            <ArrowLeft className="size-4" />
            返回专题馆
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <h2 className="text-xl font-bold font-display">人物关系网</h2>
          </div>
          <p className="mb-5 text-xs text-muted-foreground">
            以人物为中心，探索师承、君臣、对手、家族等关系脉络
          </p>

          {/* 搜索 */}
          <div className="relative mb-6">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索历史人物..."
              className="pl-9"
            />
            {searchResults.length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-md border border-border bg-popover p-1 shadow-lg">
                {searchResults.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleSetCenter(n.id)}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm hover:bg-accent"
                  >
                    <User className="size-4 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{nt(n)}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {ny(n.yearDisplay)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 快捷入口 */}
          <h3 className="mb-3 text-sm font-semibold font-display">名人关系网</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FEATURED_PERSONS.map((p, i) => {
              const node = getNodeById(p.id);
              if (!node) return null;
              return (
                <motion.button
                  type="button"
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => handleSetCenter(p.id)}
                  className="rounded-lg border border-border/30 bg-card/40 p-3 text-left transition-all hover:border-primary/40 hover:bg-card/80 hover:shadow-sm"
                >
                  <div className="mb-1 text-lg"></div>
                  <h4 className="text-sm font-bold font-display">{p.name}</h4>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{p.tag}</p>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline" size="sm" onClick={randomPerson}>
              <Shuffle className="mr-1 size-4" />
              随机一位
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 人物关系图视图
  const centerNode = egoData?.center;
  const firstEdges = egoData?.firstDegree ?? [];
  const secondEdges = egoData?.secondDegree ?? [];

  const firstDegreeCount = firstEdges.length;
  const secondDegreeCount = egoData?.secondDegreeIds.size ?? 0;

  return (
    <div className="flex h-full flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center gap-2 border-b border-border/40 px-3 py-2 md:px-4">
        <button
          onClick={() => setCenterId(null)}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          返回
        </button>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold font-display">
            {nt(centerNode)} 的关系网
          </div>
          <div className="truncate text-[11px] text-muted-foreground">
            {firstDegreeCount} 位直接关系
            {showSecondDegree && ` · ${secondDegreeCount} 位二度关系`}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => zoomBy(1.2)}
          className="size-8"
        >
          <ZoomIn className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => zoomBy(1 / 1.2)}
          className="size-8"
        >
          <ZoomOut className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetView}
          className="size-8"
        >
          <Maximize2 className="size-4" />
        </Button>
      </div>

      {/* 控制条 */}
      <div className="flex items-center justify-between gap-2 border-b border-border/20 px-3 py-1.5 text-[11px] md:px-4">
        <div className="flex items-center gap-3">
          {Object.entries(RELATION_CATEGORY_COLORS).map(([cat, color]) => {
            const hasCategory = firstEdges.some((e) => e.relationCategory === cat);
            if (!hasCategory) return null;
            return (
              <div key={cat} className="flex items-center gap-1">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-muted-foreground">{cat}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">二度关系</span>
          <Switch
            checked={showSecondDegree}
            onCheckedChange={setShowSecondDegree}
          />
        </div>
      </div>

      {/* SVG 图 */}
      <div ref={containerRef} className="flex-1 overflow-hidden bg-card/20">
        <svg
          ref={svgRef}
          viewBox="0 0 600 600"
          className="h-full w-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
        >
          {/* 二度关系连线 */}
          {showSecondDegree &&
            layout.second.map((sn, i) => {
              const fromNode = layout.first.find((fn) => fn.id === sn.fromId);
              if (!fromNode) return null;
              const color =
                RELATION_CATEGORY_COLORS[sn.edge.relationCategory] ?? '#95a5a6';
              return (
                <line
                  key={`se-${i}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={sn.x}
                  y2={sn.y}
                  stroke={color}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                  opacity={0.4}
                />
              );
            })}

          {/* 一度关系连线 */}
          {layout.first.map((fn, i) => {
            const color =
              RELATION_CATEGORY_COLORS[fn.edge.relationCategory] ?? '#95a5a6';
            return (
              <line
                key={`fe-${i}`}
                x1={layout.center.x}
                y1={layout.center.y}
                x2={fn.x}
                y2={fn.y}
                stroke={color}
                strokeWidth={2}
                opacity={0.6}
              />
            );
          })}

          {/* 二度节点 */}
          {showSecondDegree &&
            layout.second.map((sn, i) => (
              <g
                key={`sn-${i}`}
                transform={`translate(${sn.x}, ${sn.y})`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSetCenter(sn.id)}
              >
                <circle r={18} fill="var(--card)" stroke="var(--border)" strokeWidth={1} opacity={0.6} />
                <text
                  textAnchor="middle"
                  dy=".35em"
                  fontSize="10"
                  fill="var(--muted-foreground)"
                  opacity={0.7}
                >
                  {smartTrim(nt(sn), 4)}
                </text>
              </g>
            ))}

          {/* 一度节点 */}
          {layout.first.map((fn, i) => {
  
            const color =
              RELATION_CATEGORY_COLORS[fn.edge.relationCategory] ?? '#95a5a6';
            return (
              <g
                key={`fn-${i}`}
                transform={`translate(${fn.x}, ${fn.y})`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleNodeClick(fn.id)}
              >
                <circle r={26} fill="var(--card)" stroke={color} strokeWidth={2} />
                <text
                  textAnchor="middle"
                  dy=".35em"
                  fontSize="11"
                  fill="var(--foreground)"
                  fontWeight="600"
                >
                  {smartTrim(nt(fn), 5)}
                </text>
                <title>{fn.edge.label}</title>
              </g>
            );
          })}

          {/* 中心节点 */}
          <g
            transform={`translate(${layout.center.x}, ${layout.center.y})`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleNodeClick(centerId)}
          >
            <circle r={42} fill="var(--primary)" opacity={0.15} />
            <circle r={35} fill="var(--primary)" opacity={0.3} />
            <circle r={30} fill="var(--primary)" stroke="var(--primary-foreground)" strokeWidth={2} />
            <text
              textAnchor="middle"
              dy=".35em"
              fontSize="13"
              fill="var(--primary-foreground)"
              fontWeight="bold"
            >
              {nt(centerNode)?.slice(0, 4) ?? '中心'}
            </text>
            <title>点击查看详情</title>
          </g>
        </svg>
      </div>

      {/* 底部关系列表 */}
      <div className="max-h-48 overflow-y-auto border-t border-border/40 p-2 md:p-3">
        <div className="mb-2 text-[11px] text-muted-foreground">
          直接关系（{firstDegreeCount}）
        </div>
        <div className="grid grid-cols-2 gap-1.5 md:grid-cols-3">
          {firstEdges.map((e) => {
  
            const node = getNodeById(e.to);
            if (!node) return null;
            const color = RELATION_CATEGORY_COLORS[e.relationCategory] ?? '#95a5a6';
            return (
              <button
                key={e.to}
                onClick={() => handleNodeClick(e.to)}
                className="flex items-center gap-2 rounded-md border border-border/30 bg-card/30 px-2 py-1.5 text-left text-xs transition-colors hover:border-primary/40 hover:bg-card/60"
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate font-medium">{nt(node)}</span>
                <Badge variant="outline" className="ml-auto shrink-0 text-[9px] px-1 py-0">
                  {e.relationCategory}
                </Badge>
              </button>
            );
          })}
        </div>

        {firstDegreeCount < 3 && (
          <div className="mt-3 rounded-lg border border-border/30 bg-muted/20 p-3 text-[11px] text-muted-foreground">
            该人物的人物关系收录较少，您可以查看其因果、文化等其他关联。
          </div>
        )}
      </div>
    </div>
  );
}

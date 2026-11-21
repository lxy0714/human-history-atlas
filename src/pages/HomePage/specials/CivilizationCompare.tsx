// EXPORTS: CivilizationCompare
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, X, Sparkles, Scale, Clock, MapPin, Tag, Link2, AlertCircle, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ALL_HISTORY_NODES_INDEX,
  CIVILIZATIONS,
  ERAS,
} from '@/data/history-index';
import type { IHistoryNodeIndex, CivilizationKey, HistoryNodeType } from '@/data/history-index';
import { loadNodeBody, getBody } from '@/data/history-loader';
import { hasAssociation } from '@/data/relations';
import type { HistoryState } from '../useHistoryStore';
import { useIsMobile } from '@/hooks/use-mobile';
import CivilBadge from '@/components/ui/civil-badge';
import { useDebouncedValue } from '@/utils/use-performance';
import { renderInlineMarkdown } from '@/lib/markdown-render';

const PRESETS = [
  { id: 'han-rome', leftId: 'han-dynasty', rightId: 'roman-empire', label: '汉 vs 罗马' },
  { id: 'tang-arab', leftId: 'tang-dynasty', rightId: 'abbasid', label: '唐 vs 阿拉伯' },
  { id: 'ming-renaissance', leftId: 'ming-dynasty', rightId: 'renaissance', label: '明 vs 文艺复兴' },
];

const TYPE_FILTERS: { id: HistoryNodeType | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: '全部', icon: '' },
  { id: 'dynasty', label: '朝代', icon: '' },
  { id: 'person', label: '人物', icon: '' },
  { id: 'event', label: '事件', icon: '' },
  { id: 'myth', label: '神话', icon: '' },
  { id: 'artifact', label: '文物', icon: '' },
];

interface NodePickerProps {
  label: string;
  value: IHistoryNodeIndex | null;
  onChange: (node: IHistoryNodeIndex | null) => void;
  color: string;
  disabledId?: string | null;
}

function NodePicker({ label, value, onChange, color, disabledId }: NodePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 180);
  const [eraFilter, setEraFilter] = useState<string>('all');
  const [civFilter, setCivFilter] = useState<CivilizationKey | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<HistoryNodeType | 'all'>('all');
  const isMobile = useIsMobile();

  const civColor = value ? CIVILIZATIONS[value.civilization]?.color ?? '#999' : '#999';
  const valueEra = value ? ERAS.find((e) => e.id === value.eraId) : null;

  // 过滤后的节点
  const filteredNodes = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return ALL_HISTORY_NODES_INDEX.filter((n) => {
      if (!n) return false;
      // 搜索
      if (q) {
        const matchTitle = n.title.toLowerCase().includes(q);
        const matchYear = n.yearDisplay.includes(q);
        const matchSummary = n.summary.toLowerCase().includes(q);
        if (!matchTitle && !matchYear && !matchSummary) return false;
      }
      // 时代筛选
      if (eraFilter !== 'all' && n.eraId !== eraFilter) return false;
      // 文明筛选
      if (civFilter !== 'all' && n.civilization !== civFilter) return false;
      // 类型筛选
      const nodeType = n.type ?? 'event';
      if (typeFilter !== 'all' && nodeType !== typeFilter) return false;
      return true;
    }) as IHistoryNodeIndex[];
  }, [debouncedQuery, eraFilter, civFilter, typeFilter]);

  // 按时代分组
  const groupedByEra = useMemo(() => {
    const groups: Record<string, IHistoryNodeIndex[]> = {};
    for (const node of filteredNodes) {
      if (!groups[node.eraId]) groups[node.eraId] = [];
      groups[node.eraId].push(node);
    }
    return groups;
  }, [filteredNodes]);

  const resetFilters = () => {
    setEraFilter('all');
    setCivFilter('all');
    setTypeFilter('all');
  };

  const handleSelect = (node: IHistoryNodeIndex) => {
    if (node.id === disabledId) return;
    onChange(node);
    setOpen(false);
    setQuery('');
    resetFilters();
  };

  const handleClear = () => {
    onChange(null);
    setQuery('');
    resetFilters();
  };

  // 面板内容
  const panelContent = (
    <div className="flex h-full flex-col">
      {/* 搜索框 */}
      <div className="relative border-b border-border/30 p-3">
        <Search className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索节点名称、年份、摘要..."
          autoFocus
          className="w-full rounded-lg border border-border/40 bg-card/60 py-2 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="清除搜索"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* 筛选标签栏 */}
      <div className="space-y-2 border-b border-border/20 px-3 py-2">
        {/* 时代筛选 */}
        <div>
          <div className="mb-1 text-[10px] font-semibold text-muted-foreground/70">时代</div>
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setEraFilter('all')}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-all ${
                eraFilter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              全部
            </button>
            {ERAS.map((era) => (
              <button
                key={era.id}
                onClick={() => setEraFilter(era.id)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-all ${
                  eraFilter === era.id
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {era.name}
              </button>
            ))}
          </div>
        </div>

        {/* 文明筛选 */}
        <div>
          <div className="mb-1 text-[10px] font-semibold text-muted-foreground/70">文明</div>
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setCivFilter('all')}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-all ${
                civFilter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              全部
            </button>
            {(Object.keys(CIVILIZATIONS) as CivilizationKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setCivFilter(key)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-all ${
                  civFilter === key
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {CIVILIZATIONS[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* 类型筛选 */}
        <div>
          <div className="mb-1 text-[10px] font-semibold text-muted-foreground/70">类型</div>
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {TYPE_FILTERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-all ${
                  typeFilter === t.id
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 节点列表 */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filteredNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-2 size-6 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">未找到匹配的节点</p>
            <button
              onClick={resetFilters}
              className="mt-2 text-[11px] text-primary hover:underline"
            >
              重置筛选
            </button>
          </div>
        ) : (
          <div className="p-1">
            {ERAS.map((era) => {
              const nodes = groupedByEra[era.id];
              if (!nodes || nodes.length === 0) return null;
              return (
                <div key={era.id} className="mb-1">
                  <div
                    className="sticky top-0 z-10 px-2 py-1 text-xs font-semibold"
                    style={{ color: era.accent, backgroundColor: 'rgba(20, 16, 12, 0.85)' }}
                  >
                    {era.name} · {nodes.length}
                  </div>
                  <div className="space-y-0.5">
                    {nodes.map((node) => {
                      const nc = CIVILIZATIONS[node.civilization]?.color ?? '#888';
                      const nodeType = node.type ?? 'event';
                      const isSelected = value?.id === node.id;
                      const isDisabled = node.id === disabledId;
                      const typeInfo = TYPE_FILTERS.find((t) => t.id === nodeType);
                      return (
                        <button
                          key={node.id}
                          onClick={() => handleSelect(node)}
                          disabled={isDisabled}
                          className={`group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors md:min-h-[44px] ${
                            isDisabled
                              ? 'cursor-not-allowed opacity-30'
                              : isSelected
                              ? 'bg-primary/15'
                              : 'hover:bg-accent/50'
                          }`}
                        >
                          <span
                            className="size-2 shrink-0 rounded-full"
                            style={{
                              backgroundColor: nc,
                              boxShadow: isSelected ? `0 0 8px ${nc}90` : 'none',
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="truncate text-xs font-medium text-foreground">
                                {node.title}
                              </span>
                              <span
                                className="shrink-0 rounded-sm px-1 text-[9px]"
                                style={{
                                  backgroundColor: `${nc}20`,
                                  color: nc,
                                }}
                              >
                                {typeInfo?.icon} {typeInfo?.label}
                              </span>
                            </div>
                            <div className="truncate text-[10px] text-muted-foreground">
                              {node.yearDisplay} · {CIVILIZATIONS[node.civilization]?.name}
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="size-3.5 shrink-0 text-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 底部计数 */}
      <div className="border-t border-border/20 px-3 py-1.5 text-[10px] text-muted-foreground">
        共 {filteredNodes.length} 个节点
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold text-muted-foreground">
        {label}
      </div>

      {/* 选择按钮 */}
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border border-border/40 bg-card/60 p-2.5 text-left transition-all hover:border-primary/40 hover:bg-card/80"
        style={{ borderColor: value ? `${color}40` : undefined }}
      >
        {value ? (
          <>
            <div
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: civColor, boxShadow: `0 0 6px ${civColor}80` }}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium font-serif">{value.title}</div>
              <div className="truncate text-[10px] text-muted-foreground">
                {valueEra?.name} · {value.yearDisplay} · {CIVILIZATIONS[value.civilization]?.name}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="清除"
            >
              <X className="size-3.5" />
            </button>
          </>
        ) : (
          <>
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="flex-1 text-sm text-muted-foreground/70">点击选择节点</span>
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground/50" />
          </>
        )}
      </button>

      {/* 桌面端 Popover */}
      <AnimatePresence>
        {open && !isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-primary/20 bg-card/95 shadow-2xl"
              style={{ maxHeight: '70vh' }}
            >
              {panelContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 移动端 Bottom Sheet */}
      <AnimatePresence>
        {open && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] flex-col overflow-hidden rounded-t-2xl border-t border-primary/20 bg-card/95 shadow-2xl"
            >
              <div className="flex justify-center py-1.5">
                <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
              </div>
              {panelContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// 节点时间范围
function getNodeTimeRange(node: IHistoryNodeIndex): [number, number] {
  if (node.type === 'dynasty') {
    return [node.year, node.year + 200];
  }
  return [node.year - 20, node.year + 20];
}

function isOverlap(a: IHistoryNodeIndex, b: IHistoryNodeIndex): boolean {
  const [aStart, aEnd] = getNodeTimeRange(a);
  const [bStart, bEnd] = getNodeTimeRange(b);
  return aStart <= bEnd && bStart <= aEnd;
}

function hasRelation(a: IHistoryNodeIndex, b: IHistoryNodeIndex): boolean {
  return hasAssociation(a.id, b.id);
}

function formatTypeLabel(type?: string): string {
  switch (type) {
    case 'dynasty': return '朝代/文明';
    case 'person': return '人物';
    case 'myth': return '神话传说';
    case 'artifact': return '文物';
    default: return '历史事件';
  }
}

function NodeBodyContent({
  body,
  loading,
  error,
  summary,
}: {
  body: string | null;
  loading: boolean;
  error: string | null;
  summary: string;
}) {
  // 加载中：骨架屏
  if (loading && !body) {
    return (
      <div className="space-y-2 text-xs leading-relaxed">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-4 w-full animate-pulse rounded-sm bg-foreground/10"
            style={{ width: `${70 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    );
  }
  // 加载失败：降级显示 summary + 错误提示
  if (error && !body) {
    return (
      <div className="space-y-2 text-xs leading-relaxed text-foreground/85">
        <p>{renderInlineMarkdown(summary || '暂无简介')}</p>
        <p className="text-[11px] text-destructive/80">长文加载失败，显示摘要版本</p>
      </div>
    );
  }
  // 有正文：分段渲染
  if (body) {
    const paragraphs = body.split('\n\n').filter((p) => p.trim().length > 0);
    return (
      <div className="space-y-3 text-xs leading-relaxed text-foreground/85">
        {paragraphs.map((p, i) => (
          <p key={i}>{renderInlineMarkdown(p)}</p>
        ))}
      </div>
    );
  }
  // 兜底：summary
  return (
    <div className="space-y-2 text-xs leading-relaxed text-foreground/85">
      <p>{renderInlineMarkdown(summary || '暂无简介')}</p>
    </div>
  );
}

interface CivilizationCompareProps {
  store: HistoryState;
  initialLeftId?: string;
}

export default function CivilizationCompare({ store, initialLeftId }: CivilizationCompareProps) {
  const [leftNode, setLeftNode] = useState<IHistoryNodeIndex | null>(
    initialLeftId ? ALL_HISTORY_NODES_INDEX.find((n) => n && n.id === initialLeftId) ?? null : null,
  );
  const [rightNode, setRightNode] = useState<IHistoryNodeIndex | null>(null);
  const [mobileTab, setMobileTab] = useState<'left' | 'right'>('left');
  const [leftBody, setLeftBody] = useState<string | null>(null);
  const [leftBodyLoading, setLeftBodyLoading] = useState(false);
  const [leftBodyError, setLeftBodyError] = useState<string | null>(null);
  const [rightBody, setRightBody] = useState<string | null>(null);
  const [rightBodyLoading, setRightBodyLoading] = useState(false);
  const [rightBodyError, setRightBodyError] = useState<string | null>(null);

  const loadBodyForNode = useCallback(
    async (
      node: IHistoryNodeIndex | null,
      setBody: (b: string | null) => void,
      setLoading: (v: boolean) => void,
      setError: (e: string | null) => void,
    ) => {
      if (!node) {
        setBody(null);
        setLoading(false);
        setError(null);
        return;
      }
      // 先查同步缓存（已加载过的分片立即返回）
      const cached = getBody(node.id);
      if (cached) {
        setBody(cached);
        setLoading(false);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const body = await loadNodeBody(node.id);
        setBody(body);
      } catch (err) {
        setError(String(err));
        setBody(null);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // 左侧节点变化时加载正文
  useEffect(() => {
    loadBodyForNode(leftNode, setLeftBody, setLeftBodyLoading, setLeftBodyError);
  }, [leftNode, loadBodyForNode]);

  // 右侧节点变化时加载正文
  useEffect(() => {
    loadBodyForNode(rightNode, setRightBody, setRightBodyLoading, setRightBodyError);
  }, [rightNode, loadBodyForNode]);

  useEffect(() => {
    if (initialLeftId) {
      const node = ALL_HISTORY_NODES_INDEX.find((n) => n && n.id === initialLeftId);
      if (node) setLeftNode(node);
    }
  }, [initialLeftId]);

  const applyPreset = (preset: typeof PRESETS[number]) => {
    const l = ALL_HISTORY_NODES_INDEX.find((n) => n && n.id === preset.leftId) ?? null;
    const r = ALL_HISTORY_NODES_INDEX.find((n) => n && n.id === preset.rightId) ?? null;
    setLeftNode(l);
    setRightNode(r);
  };

  const overlap = leftNode && rightNode ? isOverlap(leftNode, rightNode) : false;
  const related = leftNode && rightNode ? hasRelation(leftNode, rightNode) : false;

  const leftCiv = leftNode ? CIVILIZATIONS[leftNode.civilization] : null;
  const rightCiv = rightNode ? CIVILIZATIONS[rightNode.civilization] : null;
  const leftColor = leftCiv?.color ?? '#c0392b';
  const rightColor = rightCiv?.color ?? '#2c3e80';

  const canCompare = leftNode && rightNode;

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* 快捷预设 */}
      <div className="rounded-xl border border-border/40 bg-card/40 p-3">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <Sparkles className="size-3 text-primary" />
          快捷对比
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary transition-all hover:bg-primary/20"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 选择器 */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <NodePicker
          label="左侧 · A"
          value={leftNode}
          onChange={setLeftNode}
          color={leftColor}
          disabledId={rightNode?.id}
        />
        <NodePicker
          label="右侧 · B"
          value={rightNode}
          onChange={setRightNode}
          color={rightColor}
          disabledId={leftNode?.id}
        />
      </div>

      {/* 对比结果 */}
      {!canCompare ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/40 bg-card/30 py-16 text-center">
          <Scale className="mb-3 size-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            请在左右两侧各选择一个历史节点开始对比
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            可以从 {ALL_HISTORY_NODES_INDEX.filter((n) => n).length} 个历史节点中任选两个进行对比
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 关系提示 */}
          {(overlap || related) && (
            <div className="flex flex-wrap gap-2">
              {overlap && (
                <CivilBadge variant="contemporary" label="同时期" size="md" />
              )}
              {related && (
                <CivilBadge variant="related" label="二者有关联" size="md" />
              )}
            </div>
          )}

          {/* 头部对比卡 */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-4">
            <div
              className="rounded-xl border border-border/40 p-4"
              style={{ backgroundColor: `${leftColor}10` }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: leftColor, boxShadow: `0 0 6px ${leftColor}80` }}
                />
                <span className="text-[11px] text-muted-foreground">A</span>
              </div>
              <h3 className="text-lg font-black font-serif" style={{ color: leftColor }}>
                {leftNode!.title}
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {leftCiv?.name} · {formatTypeLabel(leftNode!.type)}
              </p>
            </div>
            <div className="hidden items-center justify-center md:flex">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted/40">
                <Scale className="size-4 text-primary" />
              </div>
            </div>
            <div
              className="rounded-xl border border-border/40 p-4"
              style={{ backgroundColor: `${rightColor}10` }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: rightColor, boxShadow: `0 0 6px ${rightColor}80` }}
                />
                <span className="text-[11px] text-muted-foreground">B</span>
              </div>
              <h3 className="text-lg font-black font-serif" style={{ color: rightColor }}>
                {rightNode!.title}
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {rightCiv?.name} · {formatTypeLabel(rightNode!.type)}
              </p>
            </div>
          </div>

          {/* 基本信息对比表 */}
          <div className="overflow-hidden rounded-xl border border-border/40 bg-card/40">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
              <div className="border-b border-border/30 p-3 md:border-b-0 md:border-r">
                <div className="mb-1 text-[10px] font-semibold text-muted-foreground">基本信息 · A</div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    <span>{leftNode!.yearDisplay}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    <span>{leftCiv?.name}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Tag className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    <span>{formatTypeLabel(leftNode!.type)}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    <span className="line-clamp-2">{leftNode!.summary}</span>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="mb-1 text-[10px] font-semibold text-muted-foreground">基本信息 · B</div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    <span>{rightNode!.yearDisplay}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    <span>{rightCiv?.name}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Tag className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    <span>{formatTypeLabel(rightNode!.type)}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    <span className="line-clamp-2">{rightNode!.summary}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 详细介绍 - 移动端标签页 */}
          <div className="rounded-xl border border-border/40 bg-card/40 p-0 md:hidden">
            <div className="flex border-b border-border/30">
              <button
                onClick={() => setMobileTab('left')}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  mobileTab === 'left' ? 'text-foreground' : 'text-muted-foreground'
                }`}
                style={{
                  borderBottom: mobileTab === 'left' ? '2px solid' : '0',
                  borderColor: mobileTab === 'left' ? leftColor : undefined,
                }}
              >
                A · {leftNode?.title.slice(0, 8)}
                {leftNode && leftNode.title.length > 8 ? '...' : ''}
              </button>
              <button
                onClick={() => setMobileTab('right')}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  mobileTab === 'right' ? 'text-foreground' : 'text-muted-foreground'
                }`}
                style={{
                  borderBottom: mobileTab === 'right' ? '2px solid' : '0',
                  borderColor: mobileTab === 'right' ? rightColor : undefined,
                }}
              >
                B · {rightNode?.title.slice(0, 8)}
                {rightNode && rightNode.title.length > 8 ? '...' : ''}
              </button>
            </div>
            <div className="p-4">
              {mobileTab === 'left' && (
                <NodeBodyContent
                  body={leftBody}
                  loading={leftBodyLoading}
                  error={leftBodyError}
                  summary={leftNode!.summary}
                />
              )}
              {mobileTab === 'right' && (
                <NodeBodyContent
                  body={rightBody}
                  loading={rightBodyLoading}
                  error={rightBodyError}
                  summary={rightNode!.summary}
                />
              )}
            </div>
          </div>

          {/* 桌面端详细介绍左右并排 */}
          <div className="hidden grid-cols-1 gap-3 md:grid md:grid-cols-2 md:gap-4">
            <div className="rounded-xl border border-border/40 bg-card/40 p-4">
              <div className="mb-2 text-[11px] font-semibold text-muted-foreground">
                详细介绍 · A
              </div>
              <NodeBodyContent
                body={leftBody}
                loading={leftBodyLoading}
                error={leftBodyError}
                summary={leftNode!.summary}
              />
            </div>
            <div className="rounded-xl border border-border/40 bg-card/40 p-4">
              <div className="mb-2 text-[11px] font-semibold text-muted-foreground">
                详细介绍 · B
              </div>
              <NodeBodyContent
                body={rightBody}
                loading={rightBodyLoading}
                error={rightBodyError}
                summary={rightNode!.summary}
              />
            </div>
          </div>

          {/* 标签对比 */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div className="rounded-xl border border-border/40 bg-card/40 p-3">
              <div className="mb-2 text-[11px] font-semibold text-muted-foreground">
                专题标签 · A
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(leftNode!.categories ?? []).map((cat) => {
                  const catName = typeof cat === 'string' ? cat : '';
                  return (
                    <CivilBadge
                      key={catName}
                      variant="civilization"
                      color={leftColor}
                      label={catName}
                      size="sm"
                    />
                  );
                })}
              </div>
            </div>
            <div className="rounded-xl border border-border/40 bg-card/40 p-3">
              <div className="mb-2 text-[11px] font-semibold text-muted-foreground">
                专题标签 · B
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(rightNode!.categories ?? []).map((cat) => {
                  const catName = typeof cat === 'string' ? cat : '';
                  return (
                    <span
                      key={catName}
                      className="rounded-full px-2 py-0.5 text-[10px]"
                      style={{ backgroundColor: `${rightColor}15`, color: rightColor }}
                    >
                      {catName}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

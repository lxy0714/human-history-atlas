import { useState, useMemo } from 'react';
import { Search, ArrowRight, Shuffle, Zap, Route, Loader2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { findNodeById, findShortestPath, RELATION_TYPES } from '@/data/relations';
import type { RelationType } from '@/data/relations';
import { CIVILIZATIONS, ALL_HISTORY_NODES_INDEX } from '@/data/history-index';
import type { IHistoryNodeIndex } from '@/data/history-index';
import { useIsMobile } from '@/hooks/use-mobile';
import type { HistoryState } from '../useHistoryStore';
import { useDebouncedValue } from '@/utils/use-performance';

interface NodeSelectorProps {
  value: string | null;
  onChange: (id: string | null) => void;
  placeholder: string;
  excludeId?: string | null;
}

function NodeSelector({ value, onChange, placeholder, excludeId }: NodeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 180);
  const node = value ? findNodeById(value) : null;

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return ALL_HISTORY_NODES_INDEX.slice(0, 30);
    const q = debouncedQuery.toLowerCase();
    return ALL_HISTORY_NODES_INDEX.filter(
      (n) =>
        n.id !== excludeId &&
        (n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.id.toLowerCase().includes(q)),
    ).slice(0, 30);
  }, [debouncedQuery, excludeId]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        {node ? (
          <button
            onClick={() => {
              onChange(null);
              setQuery('');
              setOpen(true);
            }}
            className="flex h-9 w-full items-center gap-2 rounded-md border border-border/40 bg-card px-8 text-left text-xs hover:border-border"
          >
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: CIVILIZATIONS[node.civilization]?.color ?? '#888' }}
            />
            <span className="truncate">{node.title}</span>
            <span className="ml-auto text-[10px] text-muted-foreground">{node.yearDisplay}</span>
          </button>
        ) : (
          <Input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="h-9 bg-card pl-8 text-xs"
          />
        )}
      </div>
      {open && !node && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-md border border-border/40 bg-card shadow-xl"
          >
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">
                未找到匹配节点
              </div>
            ) : (
              filtered.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    onChange(n.id);
                    setOpen(false);
                    setQuery('');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-muted"
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: CIVILIZATIONS[n.civilization]?.color ?? '#888' }}
                  />
                  <span className="truncate">{n.title}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    {n.yearDisplay}
                  </span>
                </button>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

const EXAMPLE_QUERIES = [
  { from: 'confucius', to: 'person-socrates', label: '孔子 → 苏格拉底' },
  { from: 'person-qinshihuang', to: 'person-xi-tai-hou', label: '秦始皇 → 慈禧太后' },
  { from: 'person-newton', to: 'person-einstein', label: '牛顿 → 爱因斯坦' },
  { from: 'black-death', to: 'econ-industrial-revolution', label: '黑死病 → 工业革命' },
  { from: 'world-war-2', to: 'tang-dynasty', label: '二战 → 唐朝' },
];

interface SixDegreesProps {
  store: HistoryState;
}

export default function SixDegrees({ store }: SixDegreesProps) {
  const [fromId, setFromId] = useState<string | null>(null);
  const [toId, setToId] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<{
    path: string[];
    relations: { from: string; to: string; type: RelationType; label: string }[];
    steps: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { scrollToNode } = store;

  function handleSearch() {
    if (!fromId || !toId) return;
    setSearching(true);
    setResult(null);
    setError(null);

    // 模拟一点延迟增加探索感
    setTimeout(() => {
      const res = findShortestPath(fromId, toId, 6);
      if (!res) {
        setError('这两个节点在历史网络中距离较远，6步内未能连接。');
      } else {
        setResult(res);
      }
      setSearching(false);
    }, 400);
  }

  function handleExample(from: string, to: string) {
    setFromId(from);
    setToId(to);
    setResult(null);
    setError(null);
    setTimeout(() => {
    const res = findShortestPath(from, to, 6);
    if (!res) {
      setError('这两个节点在历史网络中距离较远，6步内未能连接。');
    } else {
      setResult(res);
    }
    }, 400);
  }

  function handleNodeClick(id: string) {
    scrollToNode(id);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/40 bg-card/30 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Route className="size-4 text-primary" />
          <h3 className="text-sm font-semibold">历史六度空间</h3>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          在历史关联网络中寻找两个节点之间的最短路径（最多6步）
        </p>

        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <NodeSelector value={fromId} onChange={setFromId} placeholder="选择起点节点..." excludeId={toId} />
            <div className="flex justify-center">
              <ArrowRight className="size-4 text-muted-foreground" />
            </div>
            <NodeSelector value={toId} onChange={setToId} placeholder="选择终点节点..." excludeId={fromId} />
          </div>

          <Button
            onClick={handleSearch}
            disabled={!fromId || !toId || searching}
            className="w-full"
          >
            {searching ? (
              <>
                <Loader2 className="mr-2 size-3.5 animate-spin" />
                正在探索历史网络...
              </>
            ) : (
              <>
                <Zap className="mr-2 size-3.5" />
                寻找关联路径
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 结果展示 */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-primary/30 bg-primary/5 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              <span className="text-sm font-semibold">
                找到路径 · 共 {result.steps} 步
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">点击节点查看详情</span>
          </div>

          <div className="space-y-2">
            {result.path.map((nodeId, idx) => {
              const node = findNodeById(nodeId);
              if (!node) return null;
              const nc = CIVILIZATIONS[node.civilization]?.color ?? '#888';
              const rel = result.relations[idx]; // idx 位置的关系是 path[idx] → path[idx+1]

              return (
                <div key={nodeId}>
                  <motion.button
                  type="button"
                    whileHover={{ x: 4 }}
                    onClick={() => handleNodeClick(nodeId)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border/40 bg-card/50 p-2.5 text-left transition-all hover:border-primary/40 hover:bg-card"
                  >
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: nc + '20', color: nc }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: nc }}
                        />
                        <span className="truncate text-sm font-medium">{node.title}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {CIVILIZATIONS[node.civilization]?.name ?? node.civilization} · {node.yearDisplay}
                      </div>
                    </div>
                    <ArrowRight className="size-3 text-muted-foreground" />
                  </motion.button>

                  {/* 关系说明 */}
                  {idx < result.relations.length && (
                    <div className="my-1 flex items-center gap-2 pl-10">
                      <div
                        className="h-px flex-1"
                        style={{ backgroundColor: RELATION_TYPES[rel.type].color + '40' }}
                      />
                      <span
                        className="shrink-0 text-[10px]"
                        style={{ color: RELATION_TYPES[rel.type].color }}
                      >
                        {RELATION_TYPES[rel.type].icon} {rel.label}
                      </span>
                      <div
                        className="h-px flex-1"
                        style={{ backgroundColor: RELATION_TYPES[rel.type].color + '40' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-warning/30 bg-warning/10 p-4 text-center"
        >
          <HelpCircle className="mx-auto mb-2 size-6 text-warning" />
          <p className="text-sm font-medium">未找到路径</p>
          <p className="mt-1 text-xs text-muted-foreground">{error}</p>
          <p className="mt-2 text-[10px] text-muted-foreground">
            试试选择同一文明或同一时代的节点
          </p>
        </motion.div>
      )}

      {/* 示例查询 */}
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Shuffle className="size-3" />
          试试这些有趣的关联：
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_QUERIES.map((ex) => (
            <Button
              key={ex.label}
              variant="outline"
              size="sm"
              onClick={() => handleExample(ex.from, ex.to)}
              className="h-7 text-[10px]"
            >
              {ex.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

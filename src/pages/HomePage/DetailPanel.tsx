import { useState, useMemo, useEffect, useRef, memo } from 'react';
import { logger } from '@lark-apaas/client-toolkit-lite';
import { useI18n } from '@/i18n';
import { X, ArrowRight, ArrowLeft, Tag, MapPin, Clock, User, Sparkles, Calendar, GripHorizontal, ChevronUp, ChevronDown, Scale, Star, Hash, Lightbulb, Network, Users, GitBranch, Globe, BookOpen, AlertTriangle, ArrowLeftRight, CheckCircle2, Languages } from 'lucide-react';
import { getCivilizationPattern } from '@/lib/civ-patterns';
import { WIKIMEDIA_IMAGES } from '@/data/wikimedia-images';
import { yearToRulerPercent, getNearbyNodes, RULER_LABELS, rulerPercentToYear, formatYear } from '@/lib/ruler';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import CivilBadge from '@/components/ui/civil-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import RelationGraphModal from './components/RelationGraphModal';
import { StorageKeys } from './storage-keys';
import { RELATION_TYPES, getNodeAssociations, findNodeById } from '@/data/relations';
import type { RelationType, AssociationItem } from '@/data/relations';
import {
  CIVILIZATIONS,
  CATEGORIES,
  ERAS,
} from '@/data/history-index';
import { LEARNING_PATHS } from '@/data/learning-paths';
import type { ILearningPath } from '@/data/learning-paths';
import type { CategoryKey, IHistoryNodeIndex } from '@/data/history-index';
import { loadNodeBody, getBody, getEraBodyLoadError, reloadEraBody, loadNodeBodyBilingual } from '@/data/history-loader';
import type { HistoryState } from './useHistoryStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { renderInlineMarkdown, cleanBlockMarkers, splitFirstCharForDropCap } from '@/lib/markdown-render';
import { Image } from '@/components/ui/image';
import DetailImage from './detail/DetailImage';
import DetailRelations from './detail/DetailRelations';
import DetailExtendedReads from './detail/DetailExtendedReads';
import DetailRelatedPaths from './detail/DetailRelatedPaths';
import { scopedStorage } from '@lark-apaas/client-toolkit-lite';
import { useLearningProgress } from './useLearningProgress';
import { useAchievements } from './useAchievements';
import { NODE_KEY_POINTS } from '@/data/key-points';

interface DetailPanelProps {
  store: HistoryState;
}

// 把字面\\n转换成真实换行（数据文件用单引号字符串存储，内含\\n两字符）
function unescapeNewlines(text: string): string {
  return text.replace(/\\n/g, '\n');
}

// 生成渐变占位图
function getEraGradient(eraId: string): string {
  const era = ERAS.find((e) => e.id === eraId);
  if (!era) return 'linear-gradient(135deg, #333, #111)';
  return `linear-gradient(135deg, ${era.accent}50, ${era.bgFrom}, ${era.bgTo})`;
}

export default memo(function DetailPanel({ store }: DetailPanelProps) {
  const { t, ln, nt, ns, lang, ny } = useI18n();
  const { selectedNode, detailTrigger, closeDetail, scrollToNode, openCompare, toggleFavorite, isFavorite, prevNode: storePrev, nextNode: storeNext } = store;
  const isMobile = useIsMobile();
  const progress = useLearningProgress();
  const achievements = useAchievements();
  const keyPoints = selectedNode ? NODE_KEY_POINTS[selectedNode.id] : undefined;
  const [keyPointsOpen, setKeyPointsOpen] = useState(true);

  // ========== 正文懒加载（按 era 分片，支持双语 + 回退） ==========
  const [bodyText, setBodyText] = useState<string | null>(null);
  const [bodyLoading, setBodyLoading] = useState(false);
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [bodyIsFallback, setBodyIsFallback] = useState(false);
  const [bodyLang, setBodyLang] = useState<'zh-CN' | 'en-US'>('zh-CN');

  // selectedNode 变化时触发正文加载
  // - 自动恢复的节点（detailTrigger==='auto'）：延后到 requestIdleCallback，不抢首屏带宽
  // - 用户主动点击的节点：立即加载
  useEffect(() => {
  
    if (!selectedNode) {
      setBodyText(null);
      setBodyLoading(false);
      setBodyError(null);
      return;
    }

    // 先检查缓存
    const cached = getBody(selectedNode.id);
    if (cached) {
      setBodyText(cached);
      setBodyLoading(false);
      setBodyError(null);
      return;
    }

    const nodeId = selectedNode.id;
    const isAuto = detailTrigger === 'auto';
    let cancelled = false;
    let idleId: number | null = null;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    const targetLang = lang;

    const doLoad = () => {
      if (cancelled) return;
      setBodyLoading(true);
      setBodyError(null);
      setBodyText(null);
      setBodyIsFallback(false);
      loadNodeBodyBilingual(nodeId, targetLang)
        .then((result) => {
  
          if (cancelled) return;
          if (result.text) {
            setBodyText(result.text);
            setBodyLang(result.lang);
            setBodyIsFallback(result.isFallback);
            setBodyError(null);
          } else {
            setBodyError(t('detail.noBody', '该节点暂无正文'));
            setBodyIsFallback(false);
          }
        })
        .catch((err) => {
  
          if (cancelled) return;
          const msg = err instanceof Error ? err.message : String(err);
          setBodyError(msg || t('detail.bodyLoadFailed', '正文加载失败'));
          logger.error('正文加载失败:', String(err));
        })
        .finally(() => {
          if (!cancelled) setBodyLoading(false);
        });
    };

    if (isAuto) {
      // 自动恢复：延后到首屏空闲再加载
      const ric = (window as any).requestIdleCallback;
      if (typeof ric === 'function') {
        idleId = ric(() => doLoad(), { timeout: 2000 });
      } else {
        timerId = setTimeout(doLoad, 1200);
      }
    } else {
      // 用户主动点击：立即加载
      doLoad();
    }

    return () => {
      cancelled = true;
      if (idleId != null) {
        const cancel = (window as any).cancelIdleCallback;
        if (typeof cancel === 'function') cancel(idleId);
      }
      if (timerId != null) clearTimeout(timerId);
    };
  }, [selectedNode?.id, detailTrigger]);

  const retryBody = () => {
  
    if (!selectedNode) return;
    setBodyLoading(true);
    setBodyError(null);
    setBodyIsFallback(false);
    loadNodeBodyBilingual(selectedNode.id, lang)
      .then((result) => {
  
        if (result.text) {
          setBodyText(result.text);
          setBodyLang(result.lang);
          setBodyIsFallback(result.isFallback);
          setBodyError(null);
        } else {
          setBodyError(t('detail.noBody', '该节点暂无正文'));
        }
      })
      .catch((err) => {
  
        const msg = err instanceof Error ? err.message : String(err);
        setBodyError(msg || t('detail.bodyLoadFailed', '正文加载失败'));
        logger.error('正文重试加载失败:', String(err));
      })
      .finally(() => {
        setBodyLoading(false);
      });
  };

  // 打开节点即标记为已读，并触发成就检查
  useEffect(() => {
    if (selectedNode) {
      progress.markRead(selectedNode.id);
      achievements.onNodeRead(selectedNode.id, store.allNodes.length);
    }
  }, [selectedNode?.id, progress, achievements]);

  // 监听已掌握数量变化，触发成就
  useEffect(() => {
    achievements.onNodeMastered(progress.masteredIds.length);
  }, [progress.masteredIds.length, achievements]);

  // 监听收藏数量变化，触发成就
  useEffect(() => {
    achievements.onFavoriteChange(store.favoriteIds.length);
  }, [store.favoriteIds.length, achievements]);

  const era = selectedNode ? ERAS.find((e) => e.id === selectedNode.eraId) : null;
  const civColor = selectedNode
    ? CIVILIZATIONS[selectedNode.civilization]?.color ?? '#999'
    : '#999';
  const civPatterns = selectedNode
    ? getCivilizationPattern(selectedNode.civilization, civColor)
    : { top: '', bottom: '' };
  const wikimediaUrl = selectedNode ? WIKIMEDIA_IMAGES[selectedNode.id] : undefined;
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 时间标尺数据
  const nearbyNodes = useMemo(
    () =>
      selectedNode
        ? getNearbyNodes(selectedNode.id, store.allNodes)
        : { before: [], after: [] },
    [selectedNode?.id],
  );
  const rulerPercent = useMemo(
    () => (selectedNode ? yearToRulerPercent(selectedNode.year) : 50),
    [selectedNode?.year],
  );
  const [rulerHoverPercent, setRulerHoverPercent] = useState<number | null>(null);
  const rulerHoverYear = rulerHoverPercent !== null ? rulerPercentToYear(rulerHoverPercent) : null;
  const civName = selectedNode
    ? ln(CIVILIZATIONS[selectedNode.civilization], selectedNode.civilization)
    : '';

  // 正文段落
  const paragraphs = useMemo(() => {
    if (!bodyText) return [] as string[];
    const desc = cleanBlockMarkers(unescapeNewlines(bodyText));
    return desc.split(/\n\s*\n/).filter(Boolean);
  }, [bodyText]);

   // 竖排阅读模式偏好
  const [isVertical, setIsVertical] = useState<boolean>(() => {
    try {
      const saved = scopedStorage.getItem(StorageKeys.DETAIL_VERTICAL_MODE);
      return saved === '1';
    } catch {
      return false;
    }
  });

  const toggleVertical = () => {
    setIsVertical((v) => {
      const next = !v;
      try {
        scopedStorage.setItem(StorageKeys.DETAIL_VERTICAL_MODE, next ? '1' : '0');
      } catch {
        // ignore
      }
      return next;
    });
  };
   const scrollAreaRef = useRef<HTMLDivElement>(null);
  // 竖排模式真正的横向滚动容器（.vertical-scroll-content）
  const verticalScrollerRef = useRef<HTMLDivElement>(null);

  // 延伸阅读推荐（6 个 + 推荐理由标签）
  const extendedReads = useMemo(() => {
    if (!selectedNode) return [] as Array<{ node: IHistoryNodeIndex; reason: string; reasonIcon: string }>;
    const result: Array<{ node: IHistoryNodeIndex; reason: string; reasonIcon: string }> = [];
    const added = new Set<string>();
    added.add(selectedNode.id);

    const assoc = getNodeAssociations(selectedNode.id);

    // reason 映射表（typed 按类型，related 统一为"相关"）
    const getReason = (item: AssociationItem): { reason: string; reasonIcon: string } => {
  
      if (item.source === 'typed' && item.type === 'causal') {
        const isCause = item.direction === 'from' ? false : true; // direction='to' 表示对方是 from（因），我方是 to（果）
        return isCause
          ? { reason: t('detail.reasonCause', '前因铺垫'), reasonIcon: '' }
          : { reason: t('detail.reasonEffect', '后续影响'), reasonIcon: '' };
      }
      if (item.source === 'typed' && item.type === 'parallel') return { reason: t('detail.reasonParallel', '同期对照'), reasonIcon: '' };
      if (item.source === 'typed' && item.type === 'culture') return { reason: t('detail.reasonCulture', '文化传承'), reasonIcon: '' };
      if (item.source === 'typed' && item.type === 'person') return { reason: t('detail.reasonPerson', '关键人物'), reasonIcon: '' };
      if (item.source === 'typed' && item.type === 'geographic') return { reason: t('detail.reasonGeographic', '地理关联'), reasonIcon: '' };
      if (item.source === 'typed' && item.type === 'temporal') return { reason: t('detail.reasonTemporal', '时间脉络'), reasonIcon: '' };
      return { reason: t('detail.reasonRelated', '相关延伸'), reasonIcon: '' };
    };

    // 1~6：按优先级从统一关联里取（typed 在前，related 在后），最多 4 个正式关系
    const typedCausal = assoc.typed.filter((a) => a.type === 'causal');
    const typedParallel = assoc.typed.filter((a) => a.type === 'parallel');
    const typedCulture = assoc.typed.filter((a) => a.type === 'culture');
    const typedPerson = assoc.typed.filter((a) => a.type === 'person');
    const typedOthers = assoc.typed.filter((a) => a.type !== 'causal' && a.type !== 'parallel' && a.type !== 'culture' && a.type !== 'person');

    const priorityList = [...typedCausal, ...typedParallel, ...typedCulture, ...typedPerson, ...typedOthers, ...assoc.related];

    for (const item of priorityList) {
      if (result.length >= 4) break;
      if (added.has(item.targetId)) continue;
      const n = findNodeById(item.targetId);
      if (!n) continue;
      const { reason, reasonIcon } = getReason(item);
      result.push({ node: n, reason, reasonIcon });
      added.add(item.targetId);
    }

    // 5~6：同文明同时代补充（确定性排序：重要性优先，再按年份，再按标题）
    if (result.length < 6) {
      const sameEraCiv = store.allNodes.filter(
        (n): n is IHistoryNodeIndex =>
          !!n &&
          !added.has(n.id) &&
          n.civilization === selectedNode.civilization &&
          n.eraId === selectedNode.eraId &&
          n.id !== selectedNode.id,
      )
        .sort((a, b) => {
  
          // 重要节点优先
          if ((b.important ? 1 : 0) !== (a.important ? 1 : 0)) {
            return (b.important ? 1 : 0) - (a.important ? 1 : 0);
          }
          // 按年份升序（从早到晚）
          if (a.year !== b.year) return a.year - b.year;
          // 同年份按标题字典序
          return a.title.localeCompare(nt(b), 'zh-CN');
        })
        .slice(0, 6 - result.length);
      sameEraCiv.forEach((n) => {
  
        result.push({ node: n, reason: t('detail.reasonSameEra', '同代文明'), reasonIcon: '' });
        added.add(n.id);
      });
    }

    return result;
  }, [selectedNode]);

  // 该节点所属的学习路径
  const relatedPaths = useMemo(() => {
    if (!selectedNode) return [] as ILearningPath[];
    const nodeId = selectedNode.id;
    return LEARNING_PATHS.filter((p) =>
      p.chapters.some((ch) => ch.nodeIds.includes(nodeId)),
    );
  }, [selectedNode]);

  // 推荐节点（兼容旧变量名，保留给其他使用处）
  const recommendedNodes = useMemo(() => extendedReads.map((e) => e.node), [extendedReads]);

  // 按类型分组的关联节点（用于详情面板分组展示）
  // 六类正式关系 + 一组"相关延伸"（来自 relatedNodeIds 但无正式关系的）
  const groupedRelations = useMemo(() => {
    if (!selectedNode) return {} as Record<RelationType | 'related', Array<{ node: IHistoryNodeIndex; label: string }>>;
    const assoc = getNodeAssociations(selectedNode.id);
    const result = {} as Record<RelationType | 'related', Array<{ node: IHistoryNodeIndex; label: string }>>;

    // 六类正式关系
    (Object.keys(RELATION_TYPES) as RelationType[]).forEach((type) => {
      result[type] = assoc.typed
        .filter((a) => a.type === type)
        .map((a) => {
          const n = findNodeById(a.targetId);
          return n ? { node: n, label: a.label ?? RELATION_TYPES[type].label } : null;
        })
        .filter((item): item is { node: IHistoryNodeIndex; label: string } => !!item);
    });

    // 相关延伸（relatedNodeIds 来源）
    result.related = assoc.related
      .map((a) => {
  
        const n = findNodeById(a.targetId);
        return n ? { node: n, label: t('detail.reasonRelated', '相关延伸') } : null;
      })
      .filter((item): item is { node: IHistoryNodeIndex; label: string } => !!item);

    return result;
  }, [selectedNode]);

  const hasAnyRelation = useMemo(() => {
    if (!selectedNode) return false;
    return Object.values(groupedRelations).some((arr) => arr.length > 0);
  }, [groupedRelations, selectedNode]);

  // 关联图谱模态框
  const [graphOpen, setGraphOpen] = useState(false);

  const typeLabel = (type: string) => {
  
    switch (type) {
      case 'person': return t('detail.typePerson', '人物');
      case 'dynasty': return t('detail.typeDynasty', '朝代');
      case 'artifact': return t('detail.typeArtifact', '文物');
      case 'myth': return t('detail.typeMyth', '神话');
      default: return t('detail.typeEvent', '事件');
    }
  };

  // 上下节点导航优先使用 store 中的（全量节点），没有时回退到本地计算
  const { prevNode, nextNode } = useMemo(() => {
    if (storePrev || storeNext) return { prevNode: storePrev, nextNode: storeNext };
    if (!selectedNode) return { prevNode: null, nextNode: null };
    const idx = store.baseNodes.findIndex((n) => n && n.id === selectedNode.id);
    return {
      prevNode: idx > 0 ? store.baseNodes[idx - 1] : null,
      nextNode: idx < store.baseNodes.length - 1 ? store.baseNodes[idx + 1] ?? null : null,
    };
  }, [selectedNode, storePrev, storeNext]);

  const goPrev = () => {
    if (prevNode) scrollToNode(prevNode.id);
  };
  const goNext = () => {
    if (nextNode) scrollToNode(nextNode.id);
  };

  // 切换节点时重置图片加载状态
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [selectedNode?.id]);

  // 竖排初始滚动：ResizeObserver 监听容器/内容尺寸变化，面板展开时 clientWidth 从 0 → 最终值，
  // 回调一定会触发 → 立即把 scrollLeft 设到最右端（文章开头）。
  // 直接滚到 scrollWidth，浏览器自动 clamp 到最大值，避免手算 padding / scrollbar 导致差几十像素。
  // 双 requestAnimationFrame：第一帧布局完成，第二帧再滚，保证读到最终尺寸。
  useEffect(() => {
    if (!isVertical) return;
    const el = verticalScrollerRef.current;
    if (!el) return;

    const snapRight = (source: string) => {
      if (el.scrollWidth <= el.clientWidth + 1) return;

      // 双 rAF：第一帧等布局稳定，第二帧执行滚动
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!verticalScrollerRef.current) return;
          const el2 = verticalScrollerRef.current;
          // 直接设成 scrollWidth，浏览器会自动 clamp 到最大可用值
          el2.scrollTo({ left: el2.scrollWidth, behavior: 'auto' });
          logger.info('[vertical-scroll] 贴右', {
            source,
            scrollLeft: el2.scrollLeft,
            scrollWidth: el2.scrollWidth,
            clientWidth: el2.clientWidth,
            maxScroll: el2.scrollWidth - el2.clientWidth,
            diff: el2.scrollWidth - el2.clientWidth - el2.scrollLeft,
          });
        });
      });
    };

    // 1. 立即试一次
    snapRight('immediate');

    // 2. ResizeObserver 监听容器和内容层尺寸变化
    const ro = new ResizeObserver(() => snapRight('resize'));
    ro.observe(el);
    const reader = el.querySelector('.vertical-reader');
    if (reader) ro.observe(reader);

    // 3. 字体加载完成后再补一次（字体加载会改变列宽）
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => snapRight('fonts-ready'));
    }

    // 4. 400ms 超时兜底（等图片/异步内容撑开）
    const t = window.setTimeout(() => snapRight('timeout-400'), 400);

    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [isVertical, selectedNode?.id]);

  // 详情面板 Esc 关闭（无障碍）
  useEffect(() => {
    if (!selectedNode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetail();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedNode, closeDetail]);

  // 共用的内容组件（node 一定有值，由调用方守卫）
  const DetailContent = ({ node }: { node: IHistoryNodeIndex }) => (
    <div className="flex h-full w-full min-w-0">
      {/* 桌面端左侧：微型时间标尺（纵向） */}
      {!isMobile && (
        <div
          className="relative flex w-10 shrink-0 flex-col items-center py-4"
          onMouseLeave={() => setRulerHoverPercent(null)}
        >
          {/* 标尺纵线 */}
          <div
            className="absolute top-4 bottom-4 w-px"
            style={{
              background: `linear-gradient(to bottom, transparent, ${civColor}40 15%, ${civColor}40 85%, transparent)`,
            }}
          />
          {/* 刻度 */}
          {RULER_LABELS.map((label) => {
            const p = yearToRulerPercent(label.year);
            return (
              <div
                key={label.year}
                className="absolute w-full text-center"
                style={{ top: `calc(${p}% + 16px - 6px)` }}
              >
                <div
                  className="mx-auto h-px w-2"
                  style={{ backgroundColor: `${civColor}40` }}
                />
              </div>
            );
          })}
          {/* 前后关联节点 */}
          {[...nearbyNodes.before, ...nearbyNodes.after].map((node) => {
  
            const p = yearToRulerPercent(node.year);
            const nCivColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
            return (
              <button
                key={node.id}
                onClick={() => scrollToNode(node.id)}
                className="absolute z-10 size-2 rounded-full border-2 border-card transition-transform hover:scale-150"
                style={{
                  top: `calc(${p}% + 16px - 4px)`,
                  backgroundColor: nCivColor,
                }}
                title={`${ny(node.yearDisplay)}  ${nt(node)}`}
              />
            );
          })}
          {/* 当前节点标记 */}
          <div
            className="absolute z-20 flex -translate-x-1/2 flex-col items-center"
            style={{ left: '50%', top: `calc(${rulerPercent}% + 16px - 8px)` }}
          >
            <div
              className="size-4 rounded-full border-2 border-card"
              style={{
                backgroundColor: civColor,
                boxShadow: `0 0 8px ${civColor}80`,
              }}
            />
          </div>

          {/* 悬停指示线 + 年份提示 */}
          {rulerHoverPercent !== null && (
            <>
              <div
                className="absolute left-1/2 z-30 w-6 -translate-x-1/2 border-t border-dashed border-foreground/60"
                style={{ top: `calc(${rulerHoverPercent}% + 16px)` }}
              />
              <div
                className="absolute z-30 whitespace-nowrap rounded-sm px-1.5 py-0.5 text-[10px] font-medium tabular-nums"
                style={{
                  top: `calc(${rulerHoverPercent}% + 16px - 9px)`,
                  left: '100%',
                  marginLeft: '4px',
                  backgroundColor: 'var(--foreground)',
                  color: 'var(--background)',
                }}
              >
                {rulerHoverYear !== null ? formatYear(rulerHoverYear) : ''}
              </div>
            </>
          )}
          {/* 鼠标跟踪透明层 */}
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const p = ((e.clientY - rect.top - 16) / (rect.height - 32)) * 100;
              setRulerHoverPercent(Math.max(0, Math.min(100, p)));
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const p = ((e.clientY - rect.top - 16) / (rect.height - 32)) * 100;
              const year = rulerPercentToYear(Math.max(0, Math.min(100, p)));
              // 找到最近的节点并跳转
              const sorted = [...store.baseNodes].sort((a, b) => a.year - b.year);
              let nearest = sorted[0];
              let minDist = Math.abs(sorted[0].year - year);
              for (const n of sorted) {
                const d = Math.abs(n.year - year);
                if (d < minDist) {
                  minDist = d;
                  nearest = n;
                }
              }
              scrollToNode(nearest.id);
            }}
          />
        </div>
      )}

      {/* 主内容滚动区 */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
       {/* 头部图片区 */}
       <div
         className="relative w-full shrink-0 overflow-hidden"
         style={{
           background: wikimediaUrl && !imageError
             ? `url(${wikimediaUrl}) center/cover`
             : getEraGradient(node.eraId),
           height: isMobile ? '120px' : '260px',
         }}
       >
          {/* 真实图片遮罩（保证文字可读） */}
          {wikimediaUrl && !imageError && imageLoaded && (
           <>
             <div className="absolute inset-0 bg-black/40" />
             <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent" />
           </>
         )}

         {/* 装饰纹理 */}
         {(!wikimediaUrl || imageError) && (
           <div
             className="absolute inset-0 opacity-15"
             style={{
               backgroundImage: `radial-gradient(circle at 20% 30%, ${civColor} 1.5px, transparent 1.5px), radial-gradient(circle at 70% 60%, ${civColor} 1px, transparent 1px)`,
               backgroundSize: '30px 30px, 40px 40px',
             }}
           />
         )}

         {/* 文明装饰纹样 - 顶部 */}
         <div
           className="absolute left-0 right-0 top-0 h-4 opacity-60"
           style={{
             backgroundImage: civPatterns.top,
             backgroundRepeat: 'repeat-x',
             backgroundSize: 'auto 100%',
           }}
         />
         {/* 文明装饰纹样 - 底部 */}
         <div
           className="absolute bottom-0 left-0 right-0 h-4 opacity-60"
           style={{
             backgroundImage: civPatterns.bottom,
             backgroundRepeat: 'repeat-x',
             backgroundSize: 'auto 100%',
           }}
         />

          {/* 真实图片错误兜底触发（预加载 + 淡入） */}
          {wikimediaUrl && !imageError && (
            <>
              <Image
                src={wikimediaUrl}
                alt={nt(selectedNode)}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: imageLoaded ? 1 : 0 }}
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton-shimmer" />
              )}
            </>
          )}

         {/* 底部渐变遮罩（无真实图时） */}
         {(!wikimediaUrl || imageError) && (
           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
         )}

          {/* 图片来源标注 */}
          {wikimediaUrl && !imageError && imageLoaded && (
           <div className="absolute bottom-2 right-3 text-[10px] text-white/70">
             {t('detail.imageSource', '图片来源：Wikimedia Commons')}
           </div>
         )}

          {/* 桌面端右上角关闭按钮 */}
          {!isMobile && (
            <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
               {/* 收藏按钮 */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => selectedNode && progress.toggleMastered(selectedNode.id)}
                    className="h-10 w-10 rounded-[2px] border border-white/20 bg-foreground/20 text-foreground hover:bg-foreground/30"
                   aria-label={progress.isMastered(selectedNode?.id ?? '') ? t('detail.unmarkMastered', '取消已掌握') : t('detail.markMastered', '标记已掌握')}
                   title={progress.isMastered(selectedNode?.id ?? '') ? t('detail.unmarkMastered', '取消已掌握') : t('detail.markMastered', '标记已掌握')}
                 >
                   <CheckCircle2
                     className="size-4"
                     fill={progress.isMastered(selectedNode?.id ?? '') ? 'var(--success)' : 'none'}
                     style={{
                       color: progress.isMastered(selectedNode?.id ?? '') ? 'var(--success)' : undefined,
                     }}
                   />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => selectedNode && toggleFavorite(selectedNode.id)}
                    className="h-10 w-10 rounded-[2px] border border-white/20 bg-foreground/20 text-foreground hover:bg-foreground/30"
                   aria-label={isFavorite(selectedNode?.id ?? '') ? t('detail.unfavorite', '取消收藏') : t('detail.favorite', '收藏')}
                   title={isFavorite(selectedNode?.id ?? '') ? t('detail.unfavorite', '取消收藏') : t('detail.favorite', '收藏')}
                >
                  <Star
                    className="size-4"
                    fill={isFavorite(selectedNode?.id ?? '') ? 'var(--primary)' : 'none'}
                    style={{
                      color: isFavorite(selectedNode?.id ?? '') ? 'var(--primary)' : undefined,
                    }}
                  />
               </Button>
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleVertical}
                  className="h-10 w-10 rounded-[2px] border border-white/20 bg-foreground/20 text-foreground hover:bg-foreground/30"
                  aria-label={isVertical ? t('detail.switchHorizontal', '切换横排') : t('detail.switchVertical', '切换竖排')}
                  title={isVertical ? t('detail.horizontalRead', '横排阅读') : t('detail.verticalRead', '竖排阅读')}
                >
                  <BookOpen className="size-4" />
                </Button>
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={closeDetail}
                   className="h-10 w-10 rounded-[2px] border border-white/20 bg-foreground/20 text-foreground hover:bg-foreground/30"
                aria-label={t('detail.close', '关闭')}
              >
                <X className="size-4" />
              </Button>
            </div>
          )}

         {/* 上下节点导航（桌面端） */}
         {!isMobile && (
           <div className="absolute left-3 top-3 z-10 flex gap-1">
             <Button
               variant="ghost"
               size="icon"
               onClick={goPrev}
               disabled={!prevNode}
                className="h-10 w-10 rounded-[2px] border border-white/20 bg-black/30 text-white hover:bg-black/50 hover:text-white disabled:opacity-30"
                aria-label={t('detail.prevNode', '上一个节点')}
               title={nt(prevNode)}
             >
               <ArrowLeft className="size-4" />
             </Button>
             <Button
               variant="ghost"
               size="icon"
               onClick={goNext}
               disabled={!nextNode}
                className="h-10 w-10 rounded-[2px] border border-white/20 bg-black/30 text-white hover:bg-black/50 hover:text-white disabled:opacity-30"
               aria-label={t('detail.nextNode', '下一个节点')}
               title={nt(nextNode)}
             >
               <ArrowRight className="size-4" />
             </Button>
           </div>
         )}

           {/* 标题 + 收藏（移动端） */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <CivilBadge
              variant="civilization"
              civilization={node.civilization}
              size="md"
            />
            {era && (
              <CivilBadge variant="era" color={era.accent} label={ln(era)} size="md" />
            )}
            {node.important && (
              <CivilBadge variant="important" label={t('detail.important', '重要节点')} size="md" />
            )}
            {node.type === 'person' && (
              <CivilBadge variant="type" type="person" size="md" />
            )}
            {node.type === 'myth' && (
              <CivilBadge variant="myth" size="md" />
            )}
            {node.type === 'dynasty' && (
              <CivilBadge variant="type" type="dynasty" label={t('detail.typeDynasty', '朝代')} size="md" />
            )}
            {(!node.type || node.type === 'event') && (
              <CivilBadge variant="type" type="event" label={t('detail.typeEvent', '事件')} size="md" />
            )}
            {progress.isMastered(node.id) && (
              <Badge variant="default" className="bg-success/80 text-xs rounded-[2px]">
                {t('detail.mastered', '✓ 已掌握')}
              </Badge>
            )}
            {progress.isRead(node.id) && !progress.isMastered(node.id) && (
              <Badge variant="secondary" className="text-xs rounded-[2px]">
                {t('detail.read', '◐ 已读')}
              </Badge>
            )}
          </div>
          <h2
             className="flex-1 text-xl font-black leading-tight text-white drop-shadow-lg md:text-2xl font-display"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            {nt(node)}
          </h2>
          {/* 移动端收藏按钮 */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => selectedNode && toggleFavorite(selectedNode.id)}
              className="h-11 w-11 shrink-0 rounded-[2px] border border-white/20 bg-foreground/20 text-foreground hover:bg-foreground/30"
              aria-label={isFavorite(selectedNode?.id ?? '') ? t('detail.unfavorite', '取消收藏') : t('detail.favorite', '收藏')}
            >
              <Star
                className="size-5"
                     fill={isFavorite(selectedNode?.id ?? '') ? 'var(--primary)' : 'none'}
                   style={{
                     color: isFavorite(selectedNode?.id ?? '') ? 'var(--primary)' : undefined,
                }}
              />
            </Button>
          )}
        </div>
      </div>

      {/* 元信息 */}
      <div
        className="grid grid-cols-2 gap-2 border-b bg-card/80 p-3 md:p-4"
        style={{ borderColor: `${civColor}15` }}
      >
        <div className="flex items-center gap-2">
          <Clock className="size-4 shrink-0" style={{ color: civColor }} />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground">{t('detail.timeLabel', '时间')}</p>
             <p className="truncate text-sm font-medium text-foreground tabular-nums font-display">
              {ny(node.yearDisplay)}
            </p>
          </div>
        </div>
        {node.location && (
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" style={{ color: civColor }} />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground">{t('detail.locationLabel', '地点 / 文明')}</p>
              <p className="truncate text-sm font-medium text-foreground">
                {civName}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 正文滚动区 */}
      <ScrollArea
        ref={scrollAreaRef}
        className={`min-h-0 flex-1 w-full min-w-0 ${isVertical ? 'scrollbar-thin vertical-scrollarea' : ''}`}
        type={isVertical ? 'always' : 'auto'}
      >
        <div
          className={`w-full min-w-0 break-words overflow-wrap-anywhere ${
            isVertical
              ? 'p-2 md:p-4 vertical-scroll-content'
              : 'p-4 md:p-6'
          }`}
          ref={verticalScrollerRef}
        >
          {/* 摘要 */}
          <p
            className="mb-5 rounded-r-lg border-l-4 py-2 pl-4 text-sm italic leading-relaxed"
            style={{
              borderColor: civColor,
              backgroundColor: `${civColor}08`,
              color: civColor,
            }}
          >
            {ns(node)}
          </p>

          {/* 核心记忆点 */}
          {keyPoints && keyPoints.length > 0 && (
            <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <button
                onClick={() => setKeyPointsOpen((o) => !o)}
                className="flex w-full items-center justify-between text-left"
              >
                <h4 className="flex items-center gap-2 text-sm font-bold font-display text-primary">
                  <Lightbulb className="size-4" />
                  {t('detail.keyPoints', '核心记忆点')}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({keyPoints.length} {t('detail.keyPointsCount', '条')})
                  </span>
                </h4>
                <ChevronUp
                  className={`size-4 text-muted-foreground transition-transform ${
                    keyPointsOpen ? '' : 'rotate-180'
                  }`}
                />
              </button>
              {keyPointsOpen && (
                <ul className="mt-2.5 space-y-1.5 pl-5">
                  {keyPoints.map((kp, i) => (
                    <li
                      key={i}
                      className="list-disc text-xs leading-relaxed text-foreground/90 marker:text-primary"
                    >
                      {kp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* 详细介绍 */}
            <div
              className={`min-w-0 w-full mx-auto ${
                isVertical
                  ? 'vertical-reader max-w-none'
                  : 'space-y-4 max-w-[720px] drop-cap-first'
              }`}
            >
              {/* 英文回退标注 */}
              {bodyIsFallback && !bodyLoading && paragraphs.length > 0 && (
                <Alert className="mb-4 border-primary/30 bg-primary/5 text-foreground" style={{ borderRadius: 0 }}>
                  <Languages className="size-4 text-primary" />
                  <AlertTitle className="text-xs font-semibold text-primary">
                    {t('detail.fallbackTitle', 'English version not yet available')}
                  </AlertTitle>
                  <AlertDescription className="text-xs leading-relaxed text-foreground/75">
                    {t('detail.fallbackDesc', 'This article is currently only available in Chinese. English translation is in progress — thank you for your patience.')}
                  </AlertDescription>
                </Alert>
              )}
              {bodyLoading && paragraphs.length === 0 && (
                <div className="py-8 space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-muted rounded-sm animate-pulse" style={{ width: `${85 + Math.random() * 15}%` }} />
                  ))}
                  <div className="text-center text-sm text-muted-foreground pt-2">{t('detail.bodyLoading', '正在载入正文…')}</div>
                </div>
              )}
              {bodyError && (
                <div className="py-8 text-center space-y-3">
                  <AlertTriangle className="w-8 h-8 mx-auto text-warning" />
                  <p className="text-sm text-muted-foreground">{bodyError}</p>
                  <Button size="sm" variant="secondary" onClick={retryBody}>{t('detail.retry', '点击重试')}</Button>
                </div>
              )}
              {!bodyLoading && !bodyError && paragraphs.map((para, i) =>
                isVertical ? (
                  <div
                    key={`para-${i}`}
                    id={`para-${i}`}
                    className="vertical-para"
                    style={{
                      color: 'var(--foreground)',
                    }}
                  >
                    {i === 0 && para.length > 0 ? (
                      (() => {
                        const { first, rest } = splitFirstCharForDropCap(para);
                        return (
                          <>
                            <span
                              className="drop-cap-vertical"
                              style={{ color: civColor }}
                            >
                              {first}
                            </span>
                            {renderInlineMarkdown(rest)}
                          </>
                        );
                      })()
                    ) : (
                      renderInlineMarkdown(para)
                    )}
                  </div>
                ) : (
                  <p
                    key={`para-${i}`}
                    id={`para-${i}`}
                    className="text-[15px] leading-8 text-foreground/85 break-words md:text-sm md:leading-relaxed"
                  >
                    {renderInlineMarkdown(para)}
                  </p>
                ),
              )}
              {!bodyLoading && !bodyError && paragraphs.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">{t('detail.noBody', '暂无可读正文')}</div>
              )}
            </div>

          {/* 学术争议提示 */}
          {node.disputed && (
            <Alert className="border-warning/30 bg-warning/10 text-foreground">
              <AlertTriangle className="size-4 text-warning" />
              <AlertTitle className="text-xs font-semibold text-warning">
                {t('detail.disputedTitle', '学界争议')}
              </AlertTitle>
              <AlertDescription className="text-xs leading-relaxed text-foreground/80">
                {node.disputed}
              </AlertDescription>
            </Alert>
          )}

          {/* 神话传说提示 */}
          {node.type === 'myth' && !node.disputed && (
            <Alert className="text-foreground" style={{ borderColor: 'color-mix(in srgb, #9b59b6 30%, transparent)', backgroundColor: 'color-mix(in srgb, #9b59b6 10%, transparent)' }}>
              <Sparkles className="size-4" style={{ color: '#b87ed9' }} />
              <AlertTitle className="text-xs font-semibold" style={{ color: '#c49ae0' }}>
                {t('detail.mythTitle', '神话传说')}
              </AlertTitle>
              <AlertDescription className="text-xs leading-relaxed text-foreground/80">
                {t('detail.mythDisclaimer', '本条目所述为神话传说内容，非历史记载。神话是各文明对宇宙起源、人类起源与自然现象的想象与解释。')}
              </AlertDescription>
            </Alert>
          )}

          <Separator className="my-6" style={{ backgroundColor: `${civColor}20` }} />

          {/* 标签 */}
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-1.5">
              <Tag className="size-3.5" style={{ color: civColor }} />
              <span className="text-xs font-semibold text-foreground/80 font-serif">
                {t('detail.topicTags', '专题标签')}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(node.categories ?? [])
                .filter((c): c is CategoryKey => typeof c === 'string' && c in CATEGORIES)
                .map((cat) => {
                  const catInfo = CATEGORIES[cat];
                  if (!catInfo) return null;
                  return (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="text-xs rounded-[2px]"
                      style={{
                        backgroundColor: 'transparent',
                        color: civColor,
                        borderColor: `${civColor}55`,
                      }}
                    >
                      {catInfo.icon} {catInfo.name}
                    </Badge>
                  );
                })}
            </div>
          </div>

          {/* 关联节点（按类型分组） */}
          <DetailRelations
            hasAnyRelation={hasAnyRelation}
            civColor={civColor}
            groupedRelations={groupedRelations}
            onScrollToNode={scrollToNode}
            onOpenGraph={() => setGraphOpen(true)}
          />

          {/* 延伸阅读（精选推荐 + 理由标签） */}
          <DetailExtendedReads
            extendedReads={extendedReads}
            civColor={civColor}
            onScrollToNode={scrollToNode}
          />

          {/* 所属学习路径 */}
          <DetailRelatedPaths
            relatedPaths={relatedPaths}
            civColor={civColor}
          />

          {/* 底部留白 */}
          <div className="h-6" />
        </div>
      </ScrollArea>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {selectedNode && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60"
            onClick={closeDetail}
          />

           {isMobile ? (
             // 移动端：底部抽屉
             <motion.div
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 30, stiffness: 320 }}
               role="dialog"
               aria-modal="true"
               aria-label={t('detail.nodeDetail', '节点详情')}
               className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] flex-col overflow-hidden rounded-t-2xl border-t border-border/50 bg-card shadow-2xl"
             >
               {/* 拖拽指示条 + 上下节点导航 + 关闭 */}
               <div className="relative shrink-0 border-b border-border/30">
                 <div className="flex justify-center py-2">
                   <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
                 </div>
                 {/* 移动端横向时间标尺 */}
                 <div className="relative mx-4 mb-2 h-6">
                   <div
                     className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                     style={{
                       background: `linear-gradient(to right, transparent, ${civColor}40 15%, ${civColor}40 85%, transparent)`,
                     }}
                   />
                   {/* 前后关联节点 */}
                   {[...nearbyNodes.before, ...nearbyNodes.after].map((node) => {
  
                     const p = yearToRulerPercent(node.year);
                     const nCivColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
                     return (
                       <button
                         key={node.id}
                         onClick={() => scrollToNode(node.id)}
                         className="absolute top-1/2 z-10 size-2 -translate-y-1/2 rounded-full border-2 border-card transition-transform hover:scale-150"
                         style={{
                           left: `${p}%`,
                           backgroundColor: nCivColor,
                         }}
                         title={`${ny(node.yearDisplay)}  ${nt(node)}`}
                       />
                     );
                   })}
                   {/* 当前节点标记 */}
                   <div
                     className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                     style={{ left: `${rulerPercent}%` }}
                   >
                     <div
                       className="size-3.5 rounded-full border-2 border-card"
                       style={{
                         backgroundColor: civColor,
                         boxShadow: `0 0 8px ${civColor}80`,
                       }}
                     />
                   </div>
                   {/* 当前节点年份 */}
                   <div
                     className="absolute -top-0.5 z-20 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium tabular-nums"
                     style={{
                       left: `${rulerPercent}%`,
                       transform: 'translate(-50%, -100%)',
                       color: civColor,
                     }}
                   >
                     {ny(selectedNode?.yearDisplay)}
                   </div>
                  </div>
                 {/* 上下节点导航（移动端） */}
                 <div className="absolute left-2 top-1.5 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goPrev}
                    disabled={!prevNode}
                    className="h-11 w-11 text-muted-foreground hover:text-foreground disabled:opacity-30"
                     aria-label={t('detail.prevNode', '上一个节点')}
                  >
                    <ChevronUp className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goNext}
                    disabled={!nextNode}
                    className="h-11 w-11 text-muted-foreground hover:text-foreground disabled:opacity-30"
                     aria-label={t('detail.nextNode', '下一个节点')}
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeDetail}
                   className="absolute right-2 top-1.5 h-11 w-11 text-muted-foreground hover:text-foreground"
                   aria-label={t('detail.close', '关闭')}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <DetailContent node={selectedNode} />
            </motion.div>
          ) : (
             // 桌面端：右侧滑出面板
             <motion.div
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 30, stiffness: 300 }}
               role="dialog"
               aria-modal="true"
               aria-label={t('detail.nodeDetail', '节点详情')}
               className="fixed right-0 top-0 z-50 flex h-screen h-[100dvh] w-full max-w-md flex-col border-l border-border/50 bg-card shadow-2xl sm:max-w-lg"
             >
              <DetailContent node={selectedNode} />
            </motion.div>
          )}
        </>
      )}

      {/* 关联图谱模态框 */}
      {selectedNode && (
        <RelationGraphModal
          centerNodeId={selectedNode.id}
          open={graphOpen}
          onClose={() => setGraphOpen(false)}
          onNodeClick={(id) => {
            scrollToNode(id);
            setGraphOpen(false);
          }}
        />
      )}
    </AnimatePresence>
  );
}, (prev, next) => {
  const skipKeys = ['playProgress', 'isPlaying', 'playEraCardVisible', 'playSpeed', 'randomPulse'];
  for (const key of Object.keys(prev.store) as Array<keyof typeof prev.store>) {
    if (skipKeys.includes(key as string)) continue;
    if (prev.store[key] !== next.store[key]) return false;
  }
  return true;
});

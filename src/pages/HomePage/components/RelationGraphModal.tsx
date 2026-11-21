import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  RELATIONS,
  RELATION_TYPES,
  getNodeAssociations,
  findNodeById,
} from '@/data/relations';
import type { RelationType, IHistoryRelation, AssociationItem } from '@/data/relations';
import { CIVILIZATIONS } from '@/data/history-constants';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';
import { useGraphPanZoom } from '../useGraphPanZoom';
import {
  GRAPH_MIN_SCALE,
  GRAPH_MAX_SCALE,
  GRAPH_BUTTON_ZOOM_STEP,
  FORCE_REPULSION,
  FORCE_LINK_DISTANCE,
  FORCE_SPRING_K,
  FORCE_GRAVITY,
  FORCE_DAMPING,
  LAYOUT_LEVEL1_RADIUS,
  LAYOUT_LEVEL2_RADIUS,
} from '../graph-view-constants';

interface RelationGraphModalProps {
  centerNodeId: string;
  open: boolean;
  onClose: () => void;
  onNodeClick: (nodeId: string) => void;
}

interface GraphNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  level: number; // 0=center, 1=first layer, 2=second layer
  radius: number;
  title: string;
  color: string;
}

interface GraphLink {
  source: string;
  target: string;
  /** 正式关系类型 或 'related'（轻量相关） */
  type: RelationType | 'related';
  label: string;
}

export default function RelationGraphModal({
  centerNodeId,
  open,
  onClose,
  onNodeClick,
}: RelationGraphModalProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [currentCenter, setCurrentCenter] = useState(centerNodeId);
  const [hoveredLink, setHoveredLink] = useState<IHistoryRelation | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Set<RelationType | 'related'>>(
    new Set([...(Object.keys(RELATION_TYPES) as RelationType[]), 'related']),
  );

  // 视图变换（通用手势 hook 管理缩放/平移/触摸）
  const {
    view,
    setView,
    resetView: panZoomReset,
    zoomBy,
    isDragging,
    handleMouseDown: onPanMouseDown,
    handleMouseMove: onPanMouseMove,
    handleMouseUp: onPanMouseUp,
    handleTouchStart: onPanTouchStart,
    handleTouchMove: onPanTouchMove,
    handleTouchEnd: onPanTouchEnd,
  } = useGraphPanZoom({
    minScale: GRAPH_MIN_SCALE,
    maxScale: GRAPH_MAX_SCALE,
    wheelElement: containerRef as React.RefObject<HTMLElement | null>,
    enabled: open,
  });

  // 节点拖动（业务级，保留在组件内）
  const draggedNodeRef = useRef<string | null>(null);
  const nodeDragStartRef = useRef({ x: 0, y: 0 });

  // 节点和连线数据
  const { nodes, links } = useMemo(() => {
    const nodeMap = new Map<string, GraphNode>();
    const linkList: GraphLink[] = [];

    const centerNodeData = findNodeById(currentCenter);
    if (!centerNodeData) return { nodes: [], links: [] };

    const civColor = CIVILIZATIONS[centerNodeData.civilization]?.color ?? '#d4a843';

    // 中心节点
    nodeMap.set(currentCenter, {
      id: currentCenter,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      level: 0,
      radius: 36,
      title: centerNodeData.title,
      color: '#f1c40f', // 金色高亮
    });

    // 一级关联节点（统一来源：typed + related）
    const assoc = getNodeAssociations(currentCenter);
    const firstLayerIds = new Set<string>();

    for (const item of assoc.all) {
      if (nodeMap.has(item.targetId)) continue;
      if (firstLayerIds.size >= 14) break; // 一级最多14个
      firstLayerIds.add(item.targetId);

      const n = findNodeById(item.targetId);
      if (!n) continue;

      const nc = CIVILIZATIONS[n.civilization]?.color ?? '#999';
      // 环形初始布局
      const angle = (firstLayerIds.size / 14) * Math.PI * 2 - Math.PI / 2;
      const r = 150;
      nodeMap.set(item.targetId, {
        id: item.targetId,
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        vx: 0,
        vy: 0,
        level: 1,
        radius: 22,
        title: n.title,
        color: nc,
      });

      linkList.push({
        source: currentCenter,
        target: item.targetId,
        type: item.type ?? 'related',
        label: item.label ?? '相关延伸',
      });
    }

    // 二级关联（仅正式关系，避免 related 膨胀；每个一级节点最多2个）
    let secondCount = 0;
    const maxSecond = 20;
    for (const firstId of firstLayerIds) {
      const firstAssoc = getNodeAssociations(firstId);
      let added = 0;
      // 只取 typed 的正式关系做二级扩展
      for (const item of firstAssoc.typed) {
        if (added >= 2 || secondCount >= maxSecond) break;
        const otherId = item.targetId;
        if (nodeMap.has(otherId)) continue;
        const n = findNodeById(otherId);
        if (!n) continue;

          const nc = CIVILIZATIONS[n.civilization]?.color ?? '#999';
          const firstNode = nodeMap.get(firstId)!;
          const angle = Math.atan2(firstNode.y, firstNode.x) + (Math.random() - 0.5) * 0.8;
          const r = 280 + Math.random() * 40;

          nodeMap.set(otherId, {
            id: otherId,
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
            vx: 0,
            vy: 0,
            level: 2,
            radius: 16,
            title: n.title,
            color: nc,
          });

          linkList.push({
            source: firstId,
            target: otherId,
            type: item.type ?? 'related',
            label: item.label ?? '',
          });
          added++;
          secondCount++;
      }
    }

    return {
      nodes: Array.from(nodeMap.values()),
      links: linkList,
    };
  }, [currentCenter]);

  // 力导向模拟
  const animRef = useRef<number | null>(null);
  const nodesRef = useRef<GraphNode[]>([]);

  useEffect(() => {
    if (!open) return;
    nodesRef.current = nodes.map((n) => ({ ...n }));
  }, [nodes, open]);

  useEffect(() => {
    if (!open) return;

    const reducedMotion = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    const nodeArr = nodesRef.current;
    const width = containerRef.current?.clientWidth ?? 800;
    const height = containerRef.current?.clientHeight ?? 600;

    // 减少动画偏好下：直接给节点分配静态位置，不播放力导向动画
    if (reducedMotion) {
      const centerX = 0;
      const centerY = 0;
      const level1Radius = LAYOUT_LEVEL1_RADIUS;
      const level2Radius = LAYOUT_LEVEL2_RADIUS;
      let l1Idx = 0;
      let l2Idx = 0;
      const l1Count = nodeArr.filter((n) => n.level === 1).length || 1;
      const l2Count = nodeArr.filter((n) => n.level === 2).length || 1;
      for (const n of nodeArr) {
        if (n.level === 0) {
          n.x = centerX;
          n.y = centerY;
        } else if (n.level === 1) {
          const angle = (l1Idx / l1Count) * Math.PI * 2 - Math.PI / 2;
          n.x = centerX + Math.cos(angle) * level1Radius;
          n.y = centerY + Math.sin(angle) * level1Radius;
          l1Idx++;
        } else {
          const angle = (l2Idx / l2Count) * Math.PI * 2 - Math.PI / 3;
          n.x = centerX + Math.cos(angle) * level2Radius;
          n.y = centerY + Math.sin(angle) * level2Radius;
          l2Idx++;
        }
        n.vx = 0;
        n.vy = 0;
      }
      setTick((t) => t + 1);
      return;
    }

    function tick() {
      const nodeMap = new Map(nodeArr.map((n) => [n.id, n]));

      // 1. 斥力（所有节点之间）
      for (let i = 0; i < nodeArr.length; i++) {
        for (let j = i + 1; j < nodeArr.length; j++) {
          const a = nodeArr[i];
          const b = nodeArr[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
          const repulsion = FORCE_REPULSION / (dist * dist);
          const fx = (dx / dist) * repulsion;
          const fy = (dy / dist) * repulsion;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }

      // 2. 弹簧力（连线两端）
      const linkDistance = FORCE_LINK_DISTANCE;
      const springK = FORCE_SPRING_K;
      for (const link of links) {
        const a = nodeMap.get(link.source);
        const b = nodeMap.get(link.target);
        if (!a || !b) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
        const diff = dist - linkDistance;
        const fx = (dx / dist) * diff * springK;
        const fy = (dy / dist) * diff * springK;
        a.vx -= fx;
        a.vy -= fy;
        b.vx += fx;
        b.vy += fy;
      }

      // 3. 中心节点引力（较弱，让整体围绕中心）
      const centerNode = nodeArr.find((n) => n.level === 0);
      if (centerNode) {
        for (const n of nodeArr) {
          if (n.level === 0) continue;
          const dx = -n.x;
          const dy = -n.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
          const gravity = FORCE_GRAVITY * dist;
          n.vx += (dx / dist) * gravity;
          n.vy += (dy / dist) * gravity;
        }
      }

      // 4. 中心节点固定
      if (centerNode && !draggedNodeRef.current) {
        centerNode.x = 0;
        centerNode.y = 0;
        centerNode.vx = 0;
        centerNode.vy = 0;
      }

      // 5. 阻尼 + 位置更新
      const damping = FORCE_DAMPING;
      for (const n of nodeArr) {
        n.vx *= damping;
        n.vy *= damping;
        n.x += n.vx;
        n.y += n.vy;
      }

      // 强制重新渲染
      setTick((t) => t + 1);
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [open, links.length]);

  const [, setTick] = useState(0);

  // 重置视图（平移缩放 + 节点位置不重置，节点拖动是持久状态）
  const resetView = useCallback(() => {
    panZoomReset();
  }, [panZoomReset]);

  // 画布平移：命中节点元素时不触发平移（让位给节点拖动）
  function onMouseDown(e: React.MouseEvent) {
    const target = e.target as SVGElement;
    if (target.closest('circle') || target.closest('text')) return;
    onPanMouseDown(e);
  }

  function onMouseMove(e: React.MouseEvent) {
    onPanMouseMove(e);
  }

  function onMouseUp() {
    onPanMouseUp();
    draggedNodeRef.current = null;
  }

  // 节点拖动（独立于画布平移，使用 nodeDragStartRef 追踪相对位移）
  function onNodeMouseDown(e: React.MouseEvent, nodeId: string) {
    e.stopPropagation();
    draggedNodeRef.current = nodeId;
    nodeDragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  function onNodeMouseMove(e: React.MouseEvent) {
    const id = draggedNodeRef.current;
    if (!id) return;
    const node = nodesRef.current.find((n) => n.id === id);
    if (!node) return;

    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2 - view.x) / view.scale;
    const y = (e.clientY - rect.top - rect.height / 2 - view.y) / view.scale;
    node.x = x;
    node.y = y;
    node.vx = 0;
    node.vy = 0;
  }

  // 切换中心节点
  function handleNodeDoubleClick(nodeId: string) {
    if (nodeId === currentCenter) return;
    setCurrentCenter(nodeId);
    resetView();
  }

  function handleNodeClick(nodeId: string) {
    onNodeClick(nodeId);
    onClose();
  }

  // 移动端触摸（hook 管理平移/缩放）
  function onTouchStart(e: React.TouchEvent) {
    onPanTouchStart(e);
  }

  function onTouchMove(e: React.TouchEvent) {
    onPanTouchMove(e);
  }

  function onTouchEnd() {
    onPanTouchEnd();
  }

  const displayNodes = nodesRef.current;
  const nodeMap = new Map(displayNodes.map((n) => [n.id, n]));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative flex h-full w-full flex-col bg-background md:h-[92vh] md:w-[92vw] md:max-w-6xl md:rounded-xl md:border md:border-border/40 md:shadow-2xl">
         {/* 顶部 */}
         <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-4 py-3 md:px-6">
           <div className="flex items-center gap-3">
             <Maximize2 className="size-4 text-primary" />
             <div>
               <h2 className="text-sm font-semibold md:text-base">
                 关联图谱 · {findNodeById(currentCenter)?.title}
               </h2>
               <p className="text-[10px] text-muted-foreground md:text-xs">
                 双击节点切换中心 · 拖拽节点 · 滚轮缩放 · 空白拖动平移
               </p>
             </div>
           </div>
           <div className="flex items-center gap-1">
             <Button size="icon" variant="ghost" onClick={() => zoomBy(GRAPH_BUTTON_ZOOM_STEP)}>
                <ZoomIn className="size-4" />
             </Button>
             <Button size="icon" variant="ghost" onClick={() => zoomBy(1 / GRAPH_BUTTON_ZOOM_STEP)}>
               <ZoomOut className="size-4" />
             </Button>
             <Button size="icon" variant="ghost" onClick={resetView}>
               <Move className="size-4" />
             </Button>
             <Button size="icon" variant="ghost" onClick={onClose}>
               <X className="size-4" />
             </Button>
           </div>
         </div>

         {/* 类型筛选 */}
         <div className="shrink-0 border-b border-border/40 px-3 py-2 md:px-4">
           <div className="flex flex-wrap items-center gap-1.5">
             {(Object.entries(RELATION_TYPES) as [RelationType, typeof RELATION_TYPES[RelationType]][]).map(
               ([key, val]) => {
                 const isActive = selectedTypes.has(key);
                 return (
                   <button
                     key={key}
                     onClick={() => {
                       setSelectedTypes((prev) => {
                         const next = new Set(prev);
                         if (next.has(key)) {
                           if (next.size === 1) return next; // 至少保留一种
                           next.delete(key);
                         } else {
                           next.add(key);
                         }
                         return next;
                       });
                     }}
                     className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] transition-all md:text-xs ${
                       isActive
                         ? 'border-transparent text-background'
                         : 'border-border/40 bg-transparent text-muted-foreground hover:border-border hover:text-foreground'
                     }`}
                     style={{
                       backgroundColor: isActive ? val.color : undefined,
                     }}
                   >
                     <span className="text-sm">{val.icon}</span>
                     <span className="font-medium">{val.label}</span>
                   </button>
                 );
               },
             )}
           </div>
         </div>

        {/* 图谱区域 */}
        <div
          ref={containerRef}
          className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseMove={(e) => {
            onMouseMove(e);
            onNodeMouseMove(e);
          }}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <svg
            ref={svgRef}
            className="h-full w-full"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <defs>
              {/* 箭头标记 */}
               {(Object.keys(RELATION_TYPES) as RelationType[]).map((t) => (
                 <marker
                   key={t}
                   id={`arrow-${t}`}
                   viewBox="0 0 10 10"
                   refX="9"
                   refY="5"
                   markerWidth="6"
                   markerHeight="6"
                   orient="auto-start-reverse"
                 >
                   <path d="M 0 0 L 10 5 L 0 10 z" fill={RELATION_TYPES[t].color} />
                 </marker>
               ))}
              {/* 发光滤镜 */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g
              transform={`translate(${view.x + (containerRef.current?.clientWidth ?? 800) / 2}, ${view.y + (containerRef.current?.clientHeight ?? 600) / 2}) scale(${view.scale})`}
            >
               {/* 连线（按选中类型过滤） */}
               {links.filter((l) => selectedTypes.has(l.type)).map((link, i) => {
                const source = nodeMap.get(link.source);
                const target = nodeMap.get(link.target);
                if (!source || !target) return null;
                const color = link.type === 'related'
                  ? 'var(--muted-foreground)'
                  : RELATION_TYPES[link.type].color;
                const isHovered = hoveredLink &&
                  ((hoveredLink.from === link.source && hoveredLink.to === link.target) ||
                    (hoveredLink.from === link.target && hoveredLink.to === link.source));

                return (
                  <g key={`link-${i}`}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={color}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      strokeOpacity={isHovered ? 0.9 : 0.5}
                      markerEnd={link.type === 'causal' ? `url(#arrow-${link.type})` : undefined}
                      onMouseEnter={() => {
                        if (link.type === 'related') {
                          setHoveredLink({
                            from: link.source,
                            to: link.target,
                            type: 'parallel',
                            label: '相关延伸',
                          });
                          return;
                        }
                        const rel = RELATIONS.find(
                          (r) =>
                            (r.from === link.source && r.to === link.target) ||
                            (r.from === link.target && r.to === link.source),
                        );
                        if (rel) setHoveredLink(rel);
                      }}
                      onMouseLeave={() => setHoveredLink(null)}
                      style={{ cursor: 'pointer' }}
                    />
                  </g>
                );
              })}

              {/* 节点 */}
              {displayNodes.map((node) => {
                const isCenter = node.level === 0;
                const isHovered = hoveredNodeId === node.id;
                const fontSize = isCenter ? 11 : node.level === 1 ? 9 : 7;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseDown={(e) => onNodeMouseDown(e, node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(node.id);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleNodeDoubleClick(node.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* 发光圈（中心节点） */}
                    {isCenter && (
                      <circle
                        r={node.radius + 6}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="2"
                        opacity="0.4"
                        filter="url(#glow)"
                      />
                    )}
                    {/* 主圆 */}
                    <circle
                      r={node.radius}
                      fill={node.color}
                      fillOpacity={0.2}
                      stroke={node.color}
                      strokeWidth={isCenter ? 2.5 : 1.5}
                      filter={isHovered ? 'url(#glow)' : undefined}
                    />
                    {/* 文字 */}
                    <text
                      y={node.radius + 14}
                      textAnchor="middle"
                      fill={isCenter ? '#f1c40f' : 'var(--foreground)'}
                      fontSize={fontSize}
                      fontWeight={isCenter ? 700 : 500}
                      style={{ pointerEvents: 'none' }}
                    >
                      {node.title.length > 6 ? node.title.slice(0, 5) + '…' : node.title}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* 悬停连线标签 */}
          {hoveredLink && (
            <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 rounded-md border border-border bg-card px-3 py-1.5 text-xs">
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: RELATION_TYPES[hoveredLink.type].color }}
              />
              <span className="font-medium">{RELATION_TYPES[hoveredLink.type].label}：</span>
              <span className="text-foreground/80">{hoveredLink.label}</span>
            </div>
          )}
        </div>

         {/* 底部图例 */}
         <div className="shrink-0 border-t border-border/40 px-4 py-2.5 md:px-6">
           <div className="mb-1 text-center text-[10px] text-muted-foreground md:text-xs">
             点击图例可筛选 · 当前显示 {selectedTypes.size - (selectedTypes.has('related') ? 1 : 0)} / {Object.keys(RELATION_TYPES).length} 类关系
           </div>
           <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
             {(Object.entries(RELATION_TYPES) as [RelationType, typeof RELATION_TYPES[RelationType]][]).map(
               ([key, val]) => {
                 const isActive = selectedTypes.has(key);
                 return (
                   <button
                     key={key}
                     onClick={() => {
                       setSelectedTypes((prev) => {
                         const next = new Set(prev);
                         if (next.has(key)) {
                           if (next.size === 1) return next;
                           next.delete(key);
                         } else {
                           next.add(key);
                         }
                         return next;
                       });
                     }}
                     className={`flex items-center gap-1.5 text-[10px] transition-opacity md:text-xs ${
                       isActive ? 'opacity-100' : 'opacity-30 hover:opacity-60'
                     }`}
                   >
                     <div className="h-0.5 w-5" style={{ backgroundColor: val.color }} />
                     <span className="text-muted-foreground">
                       {val.icon} {val.label}
                     </span>
                   </button>
                 );
               },
             )}
           </div>
         </div>
      </div>
    </div>
  );
}

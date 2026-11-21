// EXPORTS: RelationshipGraph
import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTooltip } from '../use-tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RELATIONSHIP_GRAPHS, type IRelationshipNode } from '@/data/specials';
import type { HistoryState } from '../useHistoryStore';

interface RelationshipGraphProps {
  store: HistoryState;
}

export default function RelationshipGraph({ store }: RelationshipGraphProps) {
  const [activeGraph, setActiveGraph] = useState(RELATIONSHIP_GRAPHS[0].id);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { hovered: hoveredNode, style: tooltipStyle, handleMouseMove: handleNodeMouseMove, handleMouseLeave: handleNodeMouseLeave } = useTooltip<IRelationshipNode>(containerRef, { tooltipWidth: 200 });
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  const graph = RELATIONSHIP_GRAPHS.find((g) => g.id === activeGraph) ?? RELATIONSHIP_GRAPHS[0];
  const nodes = graph.nodes;

  // 构建连线
  const edges = useMemo(() => {
    const result: { from: IRelationshipNode; to: IRelationshipNode; key: string }[] = [];
    const seen = new Set<string>();
    nodes.forEach((node) => {
      node.relatedTo?.forEach((targetId) => {
        const target = nodes.find((n) => n.id === targetId);
        if (!target) return;
        const key = [node.id, targetId].sort().join('--');
        if (seen.has(key)) return;
        seen.add(key);
        result.push({ from: node, to: target, key });
      });
    });
    return result;
  }, [nodes]);

  // 滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1.1 : 0.9;
    setViewBox((prev) => {
      const newW = Math.max(30, Math.min(300, prev.w * delta));
      const newH = Math.max(30, Math.min(300, prev.h * delta));
      // 以鼠标位置为中心缩放
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return { x: prev.x, y: prev.y, w: newW, h: newH };
      const mouseX = ((e.clientX - rect.left) / rect.width) * prev.w + prev.x;
      const mouseY = ((e.clientY - rect.top) / rect.height) * prev.h + prev.y;
      const newX = mouseX - ((e.clientX - rect.left) / rect.width) * newW;
      const newY = mouseY - ((e.clientY - rect.top) / rect.height) * newH;
      return { x: newX, y: newY, w: newW, h: newH };
    });
  };

  // 拖拽平移
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'circle') return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, vx: viewBox.x, vy: viewBox.y };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = ((e.clientX - dragStart.current.x) / rect.width) * viewBox.w;
      const dy = ((e.clientY - dragStart.current.y) / rect.height) * viewBox.h;
      setViewBox((prev) => ({
        ...prev,
        x: dragStart.current.vx - dx,
        y: dragStart.current.vy - dy,
      }));
    };
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging, viewBox.w, viewBox.h]);

  // 触摸支持
  const touchStart = useRef<{ x: number; y: number; vx: number; vy: number; dist: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        vx: viewBox.x,
        vy: viewBox.y,
        dist: 0,
      };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStart.current = {
        x: 0,
        y: 0,
        vx: viewBox.w,
        vy: viewBox.w,
        dist: Math.sqrt(dx * dx + dy * dy),
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && touchStart.current) {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = ((e.touches[0].clientX - touchStart.current.x) / rect.width) * viewBox.w;
      const dy = ((e.touches[0].clientY - touchStart.current.y) / rect.height) * viewBox.h;
      setViewBox((prev) => ({
        ...prev,
        x: touchStart.current!.vx - dx,
        y: touchStart.current!.vy - dy,
      }));
    } else if (e.touches.length === 2 && touchStart.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ratio = touchStart.current.dist / dist;
      const newW = Math.max(30, Math.min(300, touchStart.current.vx * ratio));
      setViewBox((prev) => ({ ...prev, w: newW, h: newW }));
    }
  };


  const handleNodeClick = (node: IRelationshipNode) => {
    if (node.historyNodeId) {
      store.scrollToNode(node.historyNodeId);
    }
  };

  // 重置视图
  const resetView = () => setViewBox({ x: 0, y: 0, w: 100, h: 100 });
  const zoomIn = () => setViewBox((p) => ({ ...p, w: p.w * 0.85, h: p.h * 0.85 }));
  const zoomOut = () => setViewBox((p) => ({ ...p, w: p.w * 1.2, h: p.h * 1.2 }));

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue={activeGraph}
        onValueChange={setActiveGraph}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          {RELATIONSHIP_GRAPHS.map((g) => (
            <TabsTrigger key={g.id} value={g.id} className="text-xs md:text-sm">
              {g.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* 图谱容器 */}
      <div
        ref={containerRef}
        className={`relative h-[60vh] min-h-[400px] overflow-hidden rounded-xl border border-border/40 bg-card/30 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <svg
          ref={svgRef}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          className="size-full"
          onMouseDown={handleMouseDown}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 背景装饰：网格点 */}
          <defs>
            <pattern id="graphGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="0.15" fill="currentColor" opacity="0.2" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            x={viewBox.x - 10}
            y={viewBox.y - 10}
            width={viewBox.w + 20}
            height={viewBox.h + 20}
            fill="url(#graphGrid)"
            className="text-muted-foreground"
          />

          {/* 连线 */}
          <g className="edges">
            {edges.map(({ from, to, key }) => {
              // 贝塞尔曲线控制点
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2 - 3;
              return (
                <path
                  key={key}
                  d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.2"
                  className="text-border/60"
                  opacity="0.7"
                />
              );
            })}
          </g>

          {/* 节点 */}
          <g className="nodes">
            {nodes.map((node, i) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                style={{ cursor: node.historyNodeId ? 'pointer' : 'default' }}
                onMouseMove={(e) => handleNodeMouseMove(e, node)}
                onMouseLeave={handleNodeMouseLeave}
                onClick={() => handleNodeClick(node)}
              >
                {/* 光晕 */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="2.5"
                  fill={node.color}
                  opacity="0.25"
                  filter="url(#glow)"
                />
                {/* 主圆 */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="1.8"
                  fill={node.color}
                  stroke="currentColor"
                  strokeWidth="0.15"
                  className="text-background"
                />
                {/* 首字 */}
                <text
                  x={node.x}
                  y={node.y + 0.5}
                  textAnchor="middle"
                  fontSize="1.4"
                  fontWeight="bold"
                  fill="white"
                  style={{ fontFamily: 'serif' }}
                >
                  {node.name.charAt(0)}
                </text>
                {/* 名称标签 */}
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  fontSize="1.1"
                  fill="currentColor"
                  className="text-foreground"
                  style={{ fontFamily: 'serif' }}
                >
                  {node.name}
                </text>
              </motion.g>
            ))}
          </g>
        </svg>

        {/* Tooltip */}
        {hoveredNode && (
          <div
            className="pointer-events-none absolute z-30 max-w-[200px] rounded-lg border border-border/40 bg-card/95 p-2 text-xs shadow-lg"
            style={{
              left: tooltipStyle.left,
              top: tooltipStyle.top,
            }}
          >
            <div className="mb-0.5 flex items-center gap-1.5">
              <span
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: hoveredNode.color }}
              />
              <span className="font-bold font-serif">{hoveredNode.name}</span>
            </div>
            {hoveredNode.title && (
              <div className="mb-1 text-[10px] text-muted-foreground">
                {hoveredNode.title}
              </div>
            )}
            {hoveredNode.summary && (
              <p className="text-[11px] leading-relaxed text-foreground/80">
                {hoveredNode.summary}
              </p>
            )}
            {hoveredNode.historyNodeId && (
              <div className="mt-1 text-[10px] text-primary">点击查看详情 →</div>
            )}
          </div>
        )}

        {/* 缩放控制 */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1 rounded-lg border border-border/40 bg-card/80 p-1">
          <button
            onClick={zoomIn}
            className="flex size-7 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            aria-label="放大"
          >
            +
          </button>
          <button
            onClick={resetView}
            className="flex size-7 items-center justify-center rounded-sm text-[10px] text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            aria-label="重置"
          >
            重置
          </button>
          <button
            onClick={zoomOut}
            className="flex size-7 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            aria-label="缩小"
          >
            −
          </button>
        </div>

        {/* 图例说明 */}
        <div className="absolute bottom-3 left-3 rounded-lg border border-border/40 bg-card/80 p-2 text-[10px]">
          <div className="mb-1 font-semibold text-foreground/80">操作提示</div>
          <div className="space-y-0.5 text-muted-foreground">
            <div>• 拖拽平移 / 滚轮缩放</div>
            <div>• 悬停查看详情</div>
            <div>• 点击节点跳转历史</div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {graph.description}
      </p>
    </div>
  );
}

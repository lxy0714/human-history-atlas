// EXPORTS: FashionTimeline
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FASHION_TIMELINE, type IFashionItem } from '@/data/specials';

// 服饰 SVG 示意图
function FashionIcon({ item }: { item: IFashionItem }) {
  const color = item.color;
  // 简化的服饰轮廓 SVG
  switch (item.shape) {
    case 'robe':
      return (
        <svg viewBox="0 0 60 80" className="size-full">
          {/* 宽袍大袖 */}
          <path
            d="M30 5 L15 20 L8 70 L20 75 L30 70 L40 75 L52 70 L45 20 Z"
            fill={color}
            opacity="0.85"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground/20"
          />
          <path
            d="M30 5 L30 70"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground/20"
            fill="none"
          />
          {/* 领口 */}
          <path
            d="M25 15 L30 20 L35 15"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-foreground/40"
            fill="none"
          />
        </svg>
      );
    case 'dress':
      return (
        <svg viewBox="0 0 60 80" className="size-full">
          {/* 襦裙 */}
          <path
            d="M30 8 L18 25 L10 70 L50 70 L42 25 Z"
            fill={color}
            opacity="0.85"
          />
          {/* 上襦 */}
          <path
            d="M30 8 L20 28 L40 28 Z"
            fill={color}
            opacity="0.6"
          />
          {/* 披帛 */}
          <path
            d="M15 30 Q30 40 45 30"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-primary/60"
          />
          <circle cx="30" cy="18" r="2" fill={color} opacity="0.5" />
        </svg>
      );
    case 'tunic':
      return (
        <svg viewBox="0 0 60 80" className="size-full">
          {/* 褙子 */}
          <path
            d="M30 10 L18 25 L15 70 L28 72 L32 72 L45 70 L42 25 Z"
            fill={color}
            opacity="0.7"
          />
          <path
            d="M30 10 L30 72"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-foreground/30"
            fill="none"
          />
          {/* 抹胸 */}
          <rect x="22" y="28" width="16" height="12" fill={color} opacity="0.9" rx="1" />
        </svg>
      );
    case 'suit':
      return (
        <svg viewBox="0 0 60 80" className="size-full">
          {/* 西装 */}
          <path
            d="M30 10 L18 18 L15 70 L28 72 L32 72 L45 70 L42 18 Z"
            fill={color}
            opacity="0.9"
          />
          {/* 翻领 */}
          <path d="M30 10 L22 25 L30 30 Z" fill="currentColor" className="text-foreground/20" />
          <path d="M30 10 L38 25 L30 30 Z" fill="currentColor" className="text-foreground/20" />
          {/* 纽扣 */}
          <circle cx="30" cy="40" r="1" fill="currentColor" className="text-foreground/40" />
          <circle cx="30" cy="50" r="1" fill="currentColor" className="text-foreground/40" />
          <circle cx="30" cy="60" r="1" fill="currentColor" className="text-foreground/40" />
        </svg>
      );
    case 'gown':
      return (
        <svg viewBox="0 0 60 80" className="size-full">
          {/* 长裙 */}
          <path
            d="M30 12 L20 25 L5 72 L55 72 L40 25 Z"
            fill={color}
            opacity="0.85"
          />
          {/* 自然褶皱 */}
          <path d="M20 30 L15 70" stroke="currentColor" strokeWidth="0.3" className="text-foreground/20" fill="none" />
          <path d="M30 25 L30 72" stroke="currentColor" strokeWidth="0.3" className="text-foreground/20" fill="none" />
          <path d="M40 30 L45 70" stroke="currentColor" strokeWidth="0.3" className="text-foreground/20" fill="none" />
        </svg>
      );
    case 'uniform':
      return (
        <svg viewBox="0 0 60 80" className="size-full">
          {/* 中山装/旗袍合体 */}
          <path
            d="M30 8 L18 18 L15 70 L30 72 L45 70 L42 18 Z"
            fill={color}
            opacity="0.9"
          />
          <path
            d="M30 8 L30 72"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-foreground/30"
            fill="none"
          />
          {/* 立领 */}
          <rect x="26" y="8" width="8" height="6" fill={color} stroke="currentColor" strokeWidth="0.3" className="text-foreground/30" />
          {/* 盘扣 */}
          <circle cx="30" cy="25" r="1.2" fill="currentColor" className="text-primary/60" />
          <circle cx="30" cy="40" r="1.2" fill="currentColor" className="text-primary/60" />
          <circle cx="30" cy="55" r="1.2" fill="currentColor" className="text-primary/60" />
        </svg>
      );
    default:
      return null;
  }
}

export default function FashionTimeline() {
  const [region, setRegion] = useState<'china' | 'west'>('china');
  const items = FASHION_TIMELINE.filter((i) => i.region === region);

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue={region}
        onValueChange={(v) => setRegion(v as 'china' | 'west')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="china" className="text-xs md:text-sm">
            中国服饰
          </TabsTrigger>
          <TabsTrigger value="west" className="text-xs md:text-sm">
            西方服饰
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 横向时间线 */}
      <div className="relative">
        {/* 时间轴线 */}
        <div className="absolute top-[88px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex shrink-0 flex-col items-center snap-center"
              style={{ width: '160px' }}
            >
              {/* 时代标签 */}
              <div
                className="mb-2 rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{
                  backgroundColor: `${item.color}20`,
                  color: item.color,
                  border: `1px solid ${item.color}30`,
                }}
              >
                {item.era}
              </div>

              {/* 节点圆点 */}
              <div
                className="relative mb-2 size-3 rounded-full"
                style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}80` }}
              />

              {/* 卡片 */}
              <div className="w-full overflow-hidden rounded-lg border border-border/40 bg-card/60 text-center transition-all hover:border-border hover:bg-card/90">
                {/* 服饰示意图 */}
                <div
                  className="flex aspect-square w-full items-center justify-center p-4"
                  style={{ backgroundColor: `${item.color}08` }}
                >
                  <div className="size-20">
                    <FashionIcon item={item} />
                  </div>
                </div>

                {/* 文字信息 */}
                <div className="p-3">
                  <h4 className="mb-1 text-sm font-bold font-serif">{item.name}</h4>
                  <p className="mb-2 text-[11px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {item.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="rounded-full px-1.5 py-0.5 text-[9px]"
                        style={{
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 左右滚动提示 */}
        <div className="mt-2 text-center text-[11px] text-muted-foreground">
          ← 左右滑动查看更多 →
        </div>
      </div>
    </div>
  );
}

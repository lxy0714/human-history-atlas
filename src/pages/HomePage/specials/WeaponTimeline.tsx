// EXPORTS: WeaponTimeline
import { motion } from 'framer-motion';
import { WEAPON_TIMELINE } from '@/data/specials';

// 武器 SVG 图标
function WeaponIcon({ icon, color }: { icon: string; color: string }) {
  // 用 emoji + 装饰圈呈现武器
  return (
    <div
      className="relative flex size-16 items-center justify-center rounded-full md:size-20"
      style={{
        background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
      }}
    >
      <span className="text-3xl md:text-4xl drop-shadow-lg">{icon}</span>
    </div>
  );
}

export default function WeaponTimeline() {
  return (
    <div className="space-y-4">
      <p className="text-center text-xs text-muted-foreground">
        从打制石器到信息化战争，武器技术的演变推动着历史进程
      </p>

      {/* 横向时间线 */}
      <div className="relative">
        {/* 时间轴线（装饰） */}
        <div className="absolute top-[100px] left-0 right-0 h-0.5 bg-gradient-to-r from-amber-900/50 via-gray-500/50 to-blue-900/50" />

        <div className="flex gap-5 overflow-x-auto pb-4 pt-2 snap-x">
          {WEAPON_TIMELINE.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex shrink-0 flex-col items-center snap-center"
              style={{ width: '180px' }}
            >
              {/* 时代 */}
              <div
                className="mb-1 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide"
                style={{
                  backgroundColor: `${item.color}20`,
                  color: item.color,
                  border: `1px solid ${item.color}40`,
                }}
              >
                {item.era}
              </div>
              <div className="mb-2 text-[10px] text-muted-foreground">
                {item.eraYear}
              </div>

              {/* 武器图标 */}
              <div className="relative mb-2">
                <WeaponIcon icon={item.icon} color={item.color} />
                {/* 节点圆点 */}
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 size-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 10px ${item.color}`,
                  }}
                />
              </div>

              {/* 卡片 */}
              <div className="mt-2 w-full overflow-hidden rounded-lg border border-border/40 bg-card/60 transition-all hover:border-border hover:bg-card/90">
                <div className="border-b border-border/30 p-3 text-center" style={{ borderColor: `${item.color}20` }}>
                  <h4 className="text-sm font-bold font-serif" style={{ color: item.color }}>
                    {item.name}
                  </h4>
                </div>
                <div className="p-3">
                  <p className="mb-2 text-[11px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {item.weapons.map((w) => (
                      <span
                        key={w}
                        className="rounded-sm bg-muted/60 px-1.5 py-0.5 text-[10px] text-foreground/70"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-2 text-center text-[11px] text-muted-foreground">
          ← 左右滑动，一部战争技术史 →
        </div>
      </div>
    </div>
  );
}

import { useAtlasStats, formatYear } from './atlas-stats';
import {
  BarChart3,
  Users,
  CalendarDays,
  Crown,
  Palette,
  Sparkles,
  Globe2,
  GitBranch,
  Clock,
} from 'lucide-react';

interface StatsOverviewProps {
  onBack?: () => void;
}

export default function StatsOverview({ onBack: _onBack }: StatsOverviewProps) {
  const stats = useAtlasStats();

  const cards = [
    { label: '节点总数', value: stats.total.toLocaleString(), icon: BarChart3, tone: 'text-primary' },
    { label: '人物', value: stats.byType.person.toLocaleString(), icon: Users },
    { label: '事件', value: stats.byType.event.toLocaleString(), icon: CalendarDays },
    { label: '王朝', value: stats.byType.dynasty.toLocaleString(), icon: Crown },
    { label: '文物', value: stats.byType.artifact.toLocaleString(), icon: Palette },
    { label: '神话', value: stats.byType.myth.toLocaleString(), icon: Sparkles },
    { label: '文明数', value: stats.civCount.toLocaleString(), icon: Globe2 },
    { label: '关系总数', value: stats.relationTotal.toLocaleString(), icon: GitBranch },
    { label: '时间跨度', value: `${formatYear(stats.timeSpan.min)} — ${formatYear(stats.timeSpan.max)}`, icon: Clock, wide: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const wideCls = card.wide ? 'md:col-span-4' : '';
        return (
          <div
            key={idx}
            className={`rounded-xl border border-border/40 bg-card/60 p-3 shadow-sm transition-all hover:border-primary/30 hover:bg-card md:p-4 ${wideCls}`}
          >
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Icon className={`size-4 ${card.tone ?? ''}`} />
              <span className="text-xs md:text-sm">{card.label}</span>
            </div>
            <div
              className={`font-display tabular-nums tracking-tight text-foreground ${
                card.wide ? 'text-lg md:text-2xl' : 'text-xl font-bold md:text-3xl'
              }`}
            >
              {card.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

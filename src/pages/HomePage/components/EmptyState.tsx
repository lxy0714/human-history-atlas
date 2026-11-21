// EXPORTS: EmptyState
import { SearchX, MapPin, BookX, Archive } from 'lucide-react';
import { useI18n } from '@/i18n';

interface EmptyStateProps {
  type?: 'search' | 'node' | 'list' | 'hall';
  title?: string;
  description?: string;
}

export default function EmptyState({
  type = 'search',
  title,
  description,
}: EmptyStateProps) {
  const { t, nt } = useI18n();

  const PRESETS: Record<string, { icon: typeof SearchX; title: string; desc: string }> = {
    search: {
      icon: SearchX,
      title: t('empty.searchTitle', '此处如未发掘的遗址'),
      desc: t('empty.searchDesc', '暂无匹配记录，试试其他关键词或筛选条件'),
    },
    node: {
      icon: Archive,
      title: t('empty.nodeTitle', '时间在此留白'),
      desc: t('empty.nodeDesc', '当前筛选条件下暂无节点，换个时代或文明试试'),
    },
    list: {
      icon: BookX,
      title: t('empty.listTitle', '史册暂未载此篇'),
      desc: t('empty.listDesc', '没有找到对应的百科条目，调整筛选条件再试'),
    },
    hall: {
      icon: MapPin,
      title: t('empty.hallTitle', '阁中尚空'),
      desc: t('empty.hallDesc', '暂无内容，去发掘更多有趣的专题吧'),
    },
  };

  const preset = PRESETS[type] ?? PRESETS.search;
  const Icon = preset.icon;
  const displayTitle = title ?? nt(preset);
  const displayDesc = description ?? preset.desc;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
          color: 'var(--primary)',
        }}
      >
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <p
        className="mb-1 text-base font-semibold"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--foreground)',
        }}
      >
        {displayTitle}
      </p>
      <p className="text-xs text-muted-foreground">{displayDesc}</p>
    </div>
  );
}

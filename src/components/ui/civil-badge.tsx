// EXPORTS: CivilBadge
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { CIVILIZATIONS, CATEGORIES } from '@/data/history-index';
import type { CivilizationKey, CategoryKey } from '@/data/history-index';
import { getCivilizationName, getCategoryName } from '@/data/i18n/content-i18n';
import { useI18n } from '@/i18n';
import { Badge } from './badge';

export type CivilBadgeVariant =
  | 'civilization' // 文明徽章（文明色描边+淡底）
  | 'type' // 类型徽章（person/event/dynasty/artifact/myth/culture）
  | 'category' // 分类标签
  | 'important' // 重要（金边金底）
  | 'disputed' // 争议（琥珀）
  | 'myth' // 神话（紫）
  | 'contemporary' // 同期对照（青）
  | 'related' // 有关联（琥珀）
  | 'era'; // 时代标签

export type CivilBadgeSize = 'sm' | 'md';

interface CivilBadgeProps {
  variant?: CivilBadgeVariant;
  size?: CivilBadgeSize;
  civilization?: CivilizationKey;
  category?: CategoryKey;
  type?: string;
  label?: string;
  color?: string;
  className?: string;
}

export default memo(function CivilBadge({
  variant = 'civilization',
  size = 'sm',
  civilization,
  category,
  type,
  label,
  color,
  className,
}: CivilBadgeProps) {
  const { t, lang } = useI18n();
  let displayLabel = label ?? '';
  let displayColor = color ?? '';

  const TYPE_META: Record<string, { name: string }> = {
    person: { name: t('badge.typePerson', '人物') },
    event: { name: t('badge.typeEvent', '事件') },
    war: { name: t('badge.typeWar', '战争') },
    dynasty: { name: t('badge.typeDynasty', '朝代') },
    civilization: { name: t('badge.typeCivilization', '文明') },
    artifact: { name: t('badge.typeArtifact', '文物') },
    building: { name: t('badge.typeBuilding', '建筑') },
    landmark: { name: t('badge.typeLandmark', '地标') },
    myth: { name: t('badge.typeMyth', '神话') },
    culture: { name: t('badge.typeCulture', '文化') },
  };

  switch (variant) {
    case 'civilization': {
      if (civilization && CIVILIZATIONS[civilization]) {
        displayLabel = displayLabel || getCivilizationName(civilization, lang);
        displayColor = displayColor || CIVILIZATIONS[civilization].color;
      }
      break;
    }
    case 'type': {
      const meta = type ? TYPE_META[type] : null;
      displayLabel = displayLabel || (meta?.name ?? type ?? '');
      break;
    }
    case 'category': {
      if (category && CATEGORIES[category]) {
        displayLabel = displayLabel || getCategoryName(category, lang);
        displayColor = displayColor || 'var(--primary)';
      }
      break;
    }
    case 'important':
      displayLabel = displayLabel || t('badge.important', '重要');
      break;
    case 'disputed':
      displayLabel = displayLabel || t('badge.disputed', '学界争议');
      break;
    case 'myth':
      displayLabel = displayLabel || t('badge.myth', '神话传说');
      break;
    case 'contemporary':
      displayLabel = displayLabel || t('badge.contemporary', '同时期');
      break;
    case 'related':
      displayLabel = displayLabel || t('badge.related', '有关联');
      break;
    case 'era':
    default:
      break;
  }

  const sizeClass = size === 'md' ? 'text-[11px] px-2 h-5' : 'text-[11px] px-2 h-5';

  // 变体样式：方角细线标签，无底色
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'civilization':
      case 'category':
      case 'era':
        return {
          backgroundColor: 'transparent',
          color: `${displayColor}cc`,
          borderColor: `${displayColor}55`,
        };
      case 'important':
        return {
          backgroundColor: 'transparent',
          color: 'var(--primary)',
          borderColor: 'color-mix(in srgb, var(--primary) 45%, transparent)',
        };
      case 'disputed':
      case 'related':
        return {
          backgroundColor: 'transparent',
          color: 'var(--warning)',
          borderColor: 'color-mix(in srgb, var(--warning) 40%, transparent)',
        };
      case 'myth':
        return {
          backgroundColor: 'transparent',
          color: '#b87ed9',
          borderColor: 'rgba(155, 89, 182, 0.4)',
        };
      case 'contemporary':
        return {
          backgroundColor: 'transparent',
          color: 'var(--success)',
          borderColor: 'color-mix(in srgb, var(--success) 40%, transparent)',
        };
      case 'type':
      default:
        return {
          backgroundColor: 'transparent',
          color: `${displayColor}cc`,
          borderColor: `${displayColor}40`,
        };
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        sizeClass,
        'shrink-0 rounded-[2px] align-middle font-medium',
        'border border-solid transition-colors',
        'flex items-center justify-center',
        className,
      )}
      style={getVariantStyle()}
    >
      {displayLabel}
    </Badge>
  );
});

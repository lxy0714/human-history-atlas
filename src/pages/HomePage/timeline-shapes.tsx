// —— 时间轴节点形状（按类型渲染不同几何图形） ——
// 纯展示组件，不依赖任何外部 state。

interface NodeShapeProps {
  type: string;
  color: string;
  important?: boolean;
}

/**
 * 按节点类型渲染不同形状的时间轴标记。
 * 所有形状绝对定位在时间轴左侧，尺寸随 important 变化。
 */
import { Star } from 'lucide-react';

export function NodeShape({ type, color, important = false }: NodeShapeProps) {
  const baseSize = important ? 10 : 8;
  const border = `2px solid var(--background)`;
  const commonStyle: React.CSSProperties = {
    backgroundColor: color,
    border,
  };
  const positionClass = 'absolute -left-[26px] top-4 md:-left-[34px]';
  const mlImportant = important ? -3 : 0;

  switch (type) {
    case 'person':
      return (
        <div
          className={positionClass}
          style={{
            ...commonStyle,
            width: baseSize,
            height: baseSize,
            marginLeft: mlImportant,
            transform: 'rotate(45deg)',
            marginTop: important ? -2 : 0,
          }}
        />
      );
    case 'dynasty':
    case 'civilization':
      return (
        <div
          className={positionClass}
          style={{
            ...commonStyle,
            width: baseSize,
            height: baseSize,
            marginLeft: mlImportant,
            borderRadius: 2,
          }}
        />
      );
    case 'artifact':
    case 'building':
    case 'landmark':
      return (
        <div
          className={positionClass}
          style={{
            width: 0,
            height: 0,
            marginLeft: mlImportant,
            borderLeft: `${baseSize / 2}px solid transparent`,
            borderRight: `${baseSize / 2}px solid transparent`,
            borderBottom: `${baseSize}px solid ${color}`,
          }}
        />
      );
    case 'myth':
      return (
        <div
          className={`${positionClass} flex items-center justify-center`}
          style={{
            width: baseSize,
            height: baseSize,
            marginLeft: mlImportant,
            color,
          }}
        >
          <Star className="size-3 fill-current" />
        </div>
      );
    case 'event':
    case 'war':
    default:
      return (
        <div
          className={positionClass}
          style={{
            ...commonStyle,
            width: baseSize,
            height: baseSize,
            marginLeft: mlImportant,
            borderRadius: '50%',
          }}
        />
      );
  }
}

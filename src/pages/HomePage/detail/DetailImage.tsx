// —— 详情面板：头部图片区 ——
// 纯展示：根据是否有 Wikimedia 图显示真实图或渐变色底纹。
// 图片加载状态由父组件管理，此处仅接收并展示。

import { CheckCircle2, Star, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import type { IHistoryNodeIndex } from '@/data/history-index';
import { useI18n } from '@/i18n';

interface DetailImageProps {
  node: IHistoryNodeIndex;
  wikimediaUrl: string | null;
  imageError: boolean;
  imageLoaded: boolean;
  civColor: string;
  civPatterns: { top: string; bottom: string };
  eraGradient: string;
  isMobile: boolean;
  isFavorite: boolean;
  isMastered: boolean;
  onImageError: () => void;
  onImageLoad: () => void;
  onToggleMastered: () => void;
  onToggleFavorite: () => void;
  onToggleVertical: () => void;
  onClose: () => void;
}

export default function DetailImage({
  node,
  wikimediaUrl,
  imageError,
  imageLoaded,
  civColor,
  civPatterns,
  eraGradient,
  isMobile,
  isFavorite,
  isMastered,
  onImageError,
  onImageLoad,
  onToggleFavorite,
  onToggleMastered,
  onToggleVertical,
  onClose,
}: DetailImageProps) {
  const { nt } = useI18n();
  return (
    <div
      className="relative w-full shrink-0 overflow-hidden"
      style={{
        background: wikimediaUrl && !imageError
          ? `url(${wikimediaUrl}) center/cover`
          : eraGradient,
        height: isMobile ? '220px' : '260px',
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
            alt={nt(node)}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onError={onImageError}
            onLoad={onImageLoad}
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
          图片来源：Wikimedia Commons
        </div>
      )}

      {/* 桌面端右上角关闭按钮 */}
      {!isMobile && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
          {/* 收藏按钮 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMastered}
            className="h-10 w-10 rounded-full bg-foreground/20 text-foreground hover:bg-foreground/30"
            aria-label="标记已掌握"
            title={isMastered ? '取消已掌握' : '标记已掌握'}
          >
            <CheckCircle2
              className="size-4"
              fill={isMastered ? 'var(--success)' : 'none'}
              style={{ color: isMastered ? 'var(--success)' : undefined }}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className="h-10 w-10 rounded-full bg-foreground/20 text-foreground hover:bg-foreground/30"
            aria-label="收藏"
            title={isFavorite ? '取消收藏' : '收藏'}
          >
            <Star
              className="size-4"
              fill={isFavorite ? 'var(--primary)' : 'none'}
              style={{ color: isFavorite ? 'var(--primary)' : undefined }}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleVertical}
            className="h-10 w-10 rounded-full bg-foreground/20 text-foreground hover:bg-foreground/30"
            aria-label="切换排版"
            title="切换横竖排"
          >
            <BookOpen className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-foreground/20 text-foreground hover:bg-foreground/30"
            aria-label="关闭详情"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// 统一的 Suspense fallback 骨架屏 - 历史主题风格
import { memo } from 'react';

interface ViewSkeletonProps {
  title?: string;
  height?: string;
}

function ViewSkeleton({ title = '加载中...', height = 'h-full' }: ViewSkeletonProps) {
  return (
    <div className={`flex ${height} flex-col items-center justify-center gap-4 text-muted-foreground`}>
      <div className="relative size-10">
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/30" />
        <div className="absolute inset-1 animate-pulse rounded-full bg-primary/20" />
        <div className="absolute inset-2.5 rounded-full bg-primary/40" />
      </div>
      <p className="text-sm font-serif tracking-widest text-muted-foreground/80">
        {title}
      </p>
    </div>
  );
}

export default memo(ViewSkeleton);

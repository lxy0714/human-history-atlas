// —— 详情面板：所属学习路径区 ——

import { BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/i18n';

export interface RelatedPathItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

interface DetailRelatedPathsProps {
  relatedPaths: RelatedPathItem[];
  civColor: string;
}

export default function DetailRelatedPaths({
  relatedPaths,
  civColor,
}: DetailRelatedPathsProps) {
  const { nt } = useI18n();
  if (relatedPaths.length === 0) return null;

  return (
    <>
      <Separator className="my-5" style={{ backgroundColor: `${civColor}20` }} />
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground/80 font-serif">
          <BookOpen className="size-3.5 text-info" />
          所属学习路径
        </p>
        <div className="space-y-2">
          {relatedPaths.slice(0, 2).map((path) => (
            <div
              key={path.id}
              className="flex w-full items-center gap-3 rounded-lg border border-border/40 bg-card/40 p-2.5"
            >
              <span className="text-xl">{path.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold font-serif">
                  {nt(path)}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {path.subtitle}
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">
                史学堂中查看
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

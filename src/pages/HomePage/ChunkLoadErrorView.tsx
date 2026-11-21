import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';

interface ChunkLoadErrorViewProps {
  error: Error;
  onRetry: () => void;
}

export default function ChunkLoadErrorView({ error, onRetry }: ChunkLoadErrorViewProps) {
  const { t } = useI18n();
  return (
    <div className="flex min-h-[320px] items-center justify-center p-6">
      <div className="w-full max-w-md border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
          <AlertTriangle className="size-6 text-warning" />
        </div>
        <h2 className="text-h2 font-semibold text-foreground mb-2">
          {t('nt(chunk)', '页面资源加载失败')}
        </h2>
        <p className="text-body text-muted-foreground mb-6">
          {t('chunk.descLine1', 'The app is being updated and some resources are temporarily unavailable. This is normal and usually resolves in a few seconds.')}
          <br />
          {t('chunk.descLine2', 'Click the button below to reload and continue browsing.')}
        </p>
        <Button
          variant="default"
          onClick={onRetry}
          className="h-11 px-6 text-base min-h-[44px] min-w-[44px]"
        >
          <RefreshCw className="mr-2 size-4" />
          {t('chunk.reload', '重新加载')}
        </Button>
        <p className="text-note text-muted-foreground/60 mt-4">
          {t('chunk.footer', 'If retrying multiple times still fails, please try again later or clear your browser cache.')}
        </p>
        <p className="text-note text-muted-foreground/40 mt-2 truncate">
          {error.message}
        </p>
      </div>
    </div>
  );
}

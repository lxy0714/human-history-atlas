// 子视图级错误边界：单个视图/模块崩溃时只影响局部，不整页白屏
import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';

interface ViewErrorBoundaryProps {
  /** 错误卡标题 */
  title?: string;
  /** 错误卡描述，可选 */
  description?: string;
  /** 重试按钮文案 */
  retryLabel?: string;
  /** 返回首页按钮文案 */
  goHomeLabel?: string;
  children: React.ReactNode;
  /** 返回首页回调（如 navigate('/')） */
  onGoHome?: () => void;
  /** 重试回调（如重新加载模块） */
  onRetry?: () => void;
  /** 错误捕获回调（用于分片自愈等特殊处理），返回 true 表示已自定义处理，不展示默认错误 UI */
  onError?: (error: Error) => boolean | void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  handled: boolean; // onError 返回 true 时设为 true，不展示默认错误 UI
}

class ViewErrorBoundary extends React.Component<
  ViewErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ViewErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, handled: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, handled: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // 记录到全局错误上报（如可用）
    if (typeof window !== 'undefined') {
      try {
        const evt = new CustomEvent('app:error-boundary', {
          detail: { error: error.message, info: info.componentStack },
        });
        window.dispatchEvent(evt);
      } catch {
        /* ignore */
      }
    }
    // 调用 onError 回调，返回 true 表示已自定义处理
    if (this.props.onError) {
      const handled = this.props.onError(error);
      if (handled) {
        this.setState({ handled: true });
      }
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onGoHome) {
      this.props.onGoHome();
    }
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    // onError 已自定义处理（如自动 reload 中），不渲染默认 UI
    if (this.state.handled) {
      return null;
    }

    const {
      title,
      description,
      retryLabel,
      goHomeLabel,
    } = this.props;
    const finalTitle = title ?? '这里的史料暂时散佚了';
    const finalDesc = description ?? '加载过程中出了点小问题，试试重新加载这部分内容。';
    const finalRetry = retryLabel ?? '重新加载';
    const finalGoHome = goHomeLabel ?? '返回首页';

    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="flex max-w-sm flex-col items-center gap-4 rounded-xl border border-border/50 bg-card p-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-warning/15 text-warning">
            <AlertTriangle className="size-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground font-serif">
              {finalTitle}
            </h3>
            <p className="text-sm text-muted-foreground">{finalDesc}</p>
            {this.state.error && (
              <p className="text-[11px] text-muted-foreground/70 font-mono break-all">
                {this.state.error.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={this.handleRetry}
              className="gap-1.5"
            >
              <RotateCcw className="size-3.5" />
              {finalRetry}
            </Button>
            {this.props.onGoHome && (
              <Button
                variant="outline"
                size="sm"
                onClick={this.handleGoHome}
                className="gap-1.5"
              >
                <Home className="size-3.5" />
                {finalGoHome}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export { ViewErrorBoundary };

/** i18n-aware 默认导出：用当前语言的默认文案兜底 */
export default function ViewErrorBoundaryI18n(props: Omit<ViewErrorBoundaryProps, 'title' | 'description' | 'retryLabel' | 'goHomeLabel'> & Partial<Pick<ViewErrorBoundaryProps, 'title' | 'description' | 'retryLabel' | 'goHomeLabel'>>) {
  const { t } = useI18n();
  return (
    <ViewErrorBoundary
      title={props.title ?? t('nt(errorBoundary)', '这里的史料暂时散佚了')}
      description={props.description ?? t('errorBoundary.desc', '加载过程中出了点小问题，试试重新加载这部分内容。')}
      retryLabel={props.retryLabel ?? t('errorBoundary.retry', '重新加载')}
      goHomeLabel={props.goHomeLabel ?? t('errorBoundary.goHome', '返回首页')}
      onGoHome={props.onGoHome}
      onRetry={props.onRetry}
      onError={props.onError}
    >
      {props.children}
    </ViewErrorBoundary>
  );
}

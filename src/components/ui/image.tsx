'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

type ImageFormat = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff';

type NativeImgProps = React.ComponentPropsWithoutRef<'img'>;

export interface ImageProps extends NativeImgProps {
  quality?: number;
  format?: ImageFormat;
  breakpoints?: Array<number>;
  /** 失败时是否显示占位图标，默认 true */
  showFallback?: boolean;
}

const DEFAULT_QUALITY = 80;
const DEFAULT_RESOLUTIONS: number[] = [
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  3840,
];

const SRC_ALLOWLIST = [
  '/runtime/api/v1/storage/object/',
  '/aily/api/v1/feisuda/attachments/',
  '/aily/api/v1/files/static/',
];

function getClosestResolution(target: number): number {
  return DEFAULT_RESOLUTIONS.reduce((prev, curr) => {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
}

function applyParamsToUrl(
  src: string,
  params: Record<string, string | number | undefined>,
): string {
  const search = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => {
      return `${k},${v}`;
    })
    .join('/');
  if (!search) return src;

  const [pathAndQuery = '', hash] = src.split('#');
  const [base, query] = pathAndQuery.split('?');
  const urlParams = new URLSearchParams(query);
  urlParams.set('x-tos-process', `image/${search}`);

  return `${base}?${urlParams.toString()}${hash ? '#' + hash : ''}`;
}

let webpSupport: boolean | null = null;

function supportWebp(): boolean {
  if (typeof document === 'undefined') return false;
  if (webpSupport !== null) return webpSupport;
  try {
    const elem = document.createElement('canvas');
    const ctx = elem.getContext('2d');
    if (!ctx) return false;
    webpSupport = ctx.canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    return webpSupport;
  } catch {
    return false;
  }
}

function isTargetSrc(src: string): boolean {
  if (typeof src !== 'string') return false;
  return SRC_ALLOWLIST.some((p) => src.startsWith(p));
}

function buildSrcSet(
  src: string,
  breakpoints: number[],
  format: ImageFormat | undefined,
  quality: number,
  width: number | undefined,
  sizes: string | undefined,
): string | undefined {
  const targetWidth = width ?? 1024;
  const widths = breakpoints.filter((w) => w <= targetWidth * 2.5);
  if (widths.length === 0) return undefined;
  if (widths.length < 2 && !sizes) {
    return undefined;
  }
  const fmt = format;
  return widths
    .map(
      (w) =>
        `${applyParamsToUrl(src, { resize: `w_${w}`, quality: `Q_${quality}`, format: fmt })} ${w}w`,
    )
    .join(', ');
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      width,
      height,
      quality = DEFAULT_QUALITY,
      format,
      sizes,
      srcSet: userSrcSet,
      breakpoints = DEFAULT_RESOLUTIONS,
      className,
      loading = 'lazy',
      decoding = 'async',
      showFallback = true,
      onError,
      alt,
      ...rest
    },
    ref,
  ) => {
    const [hasError, setHasError] = React.useState(false);

    // src 变化时重置错误状态
    React.useEffect(() => {
      setHasError(false);
    }, [src]);

    const handleError = React.useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setHasError(true);
        onError?.(e);
      },
      [onError],
    );

    const defaultFormat = React.useMemo(
      () => (supportWebp() ? 'webp' : undefined),
      [],
    );

    // 加载失败：显示占位
    if (hasError && showFallback) {
      return (
        <div
          className={cn(
            'flex items-center justify-center bg-muted/30 text-muted-foreground/60',
            className,
          )}
          style={{
            width: typeof width === 'number' ? width : undefined,
            height: typeof height === 'number' ? height : undefined,
          }}
          aria-label={alt ?? '图片加载失败'}
          role="img"
        >
          <ImageOff className="size-6 opacity-60" />
        </div>
      );
    }

    // 当 src 不在白名单时，直接渲染原生 img，保留所有原生属性
    if (typeof src !== 'string' || !isTargetSrc(src)) {
      return (
        <img
          {...rest}
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          srcSet={userSrcSet}
          className={cn(
            'bg-linear-to-b from-gray-50/20 to-gray-200/20',
            className,
          )}
          loading={loading}
          decoding={decoding}
          onError={handleError}
        />
      );
    }

    // 只有当 width 是数字类型时才进行 srcSet 优化
    const numericWidth = typeof width === 'number' ? width : undefined;

    // 用户传入的 srcSet 优先，否则生成优化的 srcSet
    const srcSet =
      userSrcSet ??
      buildSrcSet(
        src,
        breakpoints,
        format ?? (defaultFormat as ImageFormat),
        quality,
        numericWidth,
        sizes,
      );

    const baseSrc = applyParamsToUrl(src, {
      resize: numericWidth ? `w_${numericWidth}` : undefined,
      quality: `Q_${quality}`,
      format: format ?? defaultFormat,
    });

    return (
      <img
        {...rest}
        ref={ref}
        src={baseSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={srcSet}
        className={cn(
          'bg-linear-to-b from-gray-50/20 to-gray-200/20',
          className,
        )}
        loading={loading}
        decoding={decoding}
        onError={handleError}
      />
    );
  },
);

Image.displayName = 'Image';

export default Image;

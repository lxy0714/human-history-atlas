// EXPORTS: LoadingScreen
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n';

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * 卷轴展开启动页
 * - 首次加载：完整卷轴动画 1.5~2s + 淡出
 * - 加载慢：卷轴下方显示细微进度提示
 * - 全部走 CSS 变量，5 套主题自动适配
 */
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { t } = useI18n();
  
  const [showProgress, setShowProgress] = useState(false);

  // 超过 1.8s 还在加载，显示"正在展开历史画卷"提示
  useEffect(() => {
  
    const t = setTimeout(() => setShowProgress(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center, hsl(28 22% 14%) 0%, var(--background) 70%)',
      }}
    >
      {/* 噪点纹理 */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] noise-overlay" />

      {/* 卷轴容器 */}
      <div className="relative flex w-full max-w-md flex-col items-center px-8">
        {/* 上卷轴杆 */}
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex h-5 w-full items-center justify-center"
        >
          <div
            className="h-5 w-full rounded-full"
            style={{
              background:
                'linear-gradient(to bottom, hsl(40 35% 55%), hsl(40 45% 40%), hsl(40 50% 30%))',
              boxShadow: '0 2px 8px hsl(40 50% 20% / 0.6)',
            }}
          />
          {/* 轴头 */}
          <div
            className="absolute -left-2 top-1/2 h-7 w-4 -translate-y-1/2 rounded-sm"
            style={{
              background:
                'linear-gradient(to right, hsl(40 50% 28%), hsl(40 45% 45%), hsl(40 50% 28%))',
            }}
          />
          <div
            className="absolute -right-2 top-1/2 h-7 w-4 -translate-y-1/2 rounded-sm"
            style={{
              background:
                'linear-gradient(to right, hsl(40 50% 28%), hsl(40 45% 45%), hsl(40 50% 28%))',
            }}
          />
        </motion.div>

        {/* 卷轴纸面（从上往下展开） */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0.6 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="relative z-10 w-full overflow-hidden"
        >
          <div
            className="flex min-h-[220px] flex-col items-center justify-center px-6 py-8"
            style={{
              background:
                'linear-gradient(to bottom, hsl(40 30% 88%), hsl(42 35% 82%) 50%, hsl(40 30% 78%))',
              boxShadow: 'inset 0 8px 16px -8px hsl(40 40% 30% / 0.3), inset 0 -8px 16px -8px hsl(40 40% 30% / 0.3)',
            }}
          >
            {/* 纸纹 */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, hsl(40 30% 50% / 0.15) 23px, hsl(40 30% 50% / 0.15) 24px)',
              }}
            />

            {/* 标题 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
              className="relative z-10 text-center"
            >
              <div
                className="text-3xl font-bold tracking-[0.08em] md:text-4xl"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'hsl(28 35% 20%)',
                  letterSpacing: '0.08em',
                }}
              >
                {t('nt(loading)', '全球历史全景')}
              </div>
              <div
                className="mt-3 text-sm tracking-[0.3em] md:text-base"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'hsl(28 30% 35%)',
                }}
              >
                {t('loading.subtitle', '从人类起源到今天')}
              </div>

              {/* 装饰线 */}
              <div className="mx-auto mt-5 flex items-center gap-3">
                <span
                  className="h-px w-10"
                  style={{ backgroundColor: 'hsl(40 45% 55%)' }}
                />
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  style={{ color: 'hsl(40 45% 55%)' }}
                  fill="currentColor"
                >
                  <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" opacity="0.8" />
                </svg>
                <span
                  className="h-px w-10"
                  style={{ backgroundColor: 'hsl(40 45% 55%)' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 下卷轴杆 */}
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex h-5 w-full items-center justify-center"
        >
          <div
            className="h-5 w-full rounded-full"
            style={{
              background:
                'linear-gradient(to top, hsl(40 35% 55%), hsl(40 45% 40%), hsl(40 50% 30%))',
              boxShadow: '0 -2px 8px hsl(40 50% 20% / 0.6)',
            }}
          />
          <div
            className="absolute -left-2 top-1/2 h-7 w-4 -translate-y-1/2 rounded-sm"
            style={{
              background:
                'linear-gradient(to right, hsl(40 50% 28%), hsl(40 45% 45%), hsl(40 50% 28%))',
            }}
          />
          <div
            className="absolute -right-2 top-1/2 h-7 w-4 -translate-y-1/2 rounded-sm"
            style={{
              background:
                'linear-gradient(to right, hsl(40 50% 28%), hsl(40 45% 45%), hsl(40 50% 28%))',
            }}
          />
        </motion.div>

        {/* 加载提示文字（慢网时显示） */}
        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex items-center gap-2 text-xs"
              style={{ color: 'hsl(40 40% 65%)' }}
            >
              <span className="inline-flex gap-1">
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: 'hsl(40 45% 61%)' }}
                />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: 'hsl(40 45% 61%)' }}
                />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: 'hsl(40 45% 61%)' }}
                />
              </span>
              <span style={{ fontFamily: 'var(--font-display)' }}>
                {t('loading.hint', '正在展开历史画卷…')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

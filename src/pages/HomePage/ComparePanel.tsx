// EXPORTS: ComparePanel
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, ArrowRight, Sparkles } from 'lucide-react';
import { COMPARISON_DATA, type IComparisonPair } from '@/data/specials';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';

interface ComparePanelProps {
  open: boolean;
  onClose: () => void;
  pair?: IComparisonPair;
}

const COMPARE_FIELD_KEYS = [
  'timeRange', 'capital', 'territory', 'population', 'politics',
  'economy', 'military', 'culture', 'technology', 'influence',
] as const;

export default function ComparePanel({ open, onClose, pair }: ComparePanelProps) {
  const { t } = useI18n();
  const [activePair, setActivePair] = useState<IComparisonPair>(
    pair ?? COMPARISON_DATA[0],
  );

  const currentPair = pair ?? activePair;

  const fieldLabels: Record<typeof COMPARE_FIELD_KEYS[number], string> = {
    timeRange: t('compare.timeRange', '时间范围'),
    capital: t('compare.capital', '都城/中心'),
    territory: t('compare.territory', '疆域面积'),
    population: t('compare.population', '人口'),
    politics: t('compare.politics', '政治制度'),
    economy: t('compare.economy', '经济水平'),
    military: t('compare.military', '军事力量'),
    culture: t('compare.culture', '文化成就'),
    technology: t('compare.technology', '科技水平'),
    influence: t('compare.influence', '历史影响'),
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background/60"
            onClick={onClose}
          />

          {/* 面板 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full flex-col border-l border-border/40 bg-card/95 md:w-[700px] lg:w-[800px]"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <Scale className="size-4 text-primary" />
                <span className="font-bold font-serif">{t('compare.title', '双文明对比')}</span>
              </div>
              <button
                onClick={onClose}
                className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* 快捷对比选择 */}
            <div className="border-b border-border/30 px-4 py-2">
              <div className="mb-2 text-[10px] text-muted-foreground">{t('compare.quickSelect', '快捷对比')}</div>
              <div className="flex flex-wrap gap-1.5">
                {COMPARISON_DATA.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePair(p)}
                    className={`rounded-full px-2.5 py-1 text-[11px] transition-colors ${
                      currentPair.id === p.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {p.nameA} vs {p.nameB}
                  </button>
                ))}
              </div>
            </div>

            {/* 对比内容 */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* 顶部标题区 */}
              <div className="mb-5 grid grid-cols-3 gap-3 text-center">
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${currentPair.colorA}15` }}
                >
                  <div
                    className="text-lg font-black font-serif"
                    style={{ color: currentPair.colorA }}
                  >
                    {currentPair.nameA}
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    {currentPair.civilizationA}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted/50">
                    <Sparkles className="size-4 text-primary" />
                  </div>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${currentPair.colorB}15` }}
                >
                  <div
                    className="text-lg font-black font-serif"
                    style={{ color: currentPair.colorB }}
                  >
                    {currentPair.nameB}
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    {currentPair.civilizationB}
                  </div>
                </div>
              </div>

              {/* 对比字段 */}
              <div className="space-y-3">
                {COMPARE_FIELD_KEYS.map((key) => {
                  const valA =
                    currentPair[key as keyof typeof currentPair.a] ??
                    currentPair.a[key as keyof typeof currentPair.a];
                  const valB =
                    currentPair[key as keyof typeof currentPair.b] ??
                    currentPair.b[key as keyof typeof currentPair.b];
                  return (
                    <div
                      key={key}
                      className="overflow-hidden rounded-lg border border-border/30"
                    >
                      <div className="flex items-center gap-1.5 border-b border-border/20 bg-muted/30 px-3 py-1.5 text-xs font-semibold">
                        <span>{key === 'influence' ? '⭐' : ''}</span>
                        <span>{fieldLabels[key]}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-px bg-border/20">
                        <div className="bg-card/60 p-3 text-xs leading-relaxed">
                          {valA ?? '—'}
                        </div>
                        <div className="bg-card/60 p-3 text-xs leading-relaxed">
                          {valB ?? '—'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 对比小结 */}
              <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="size-3.5" />
                  {t('compare.summary', '对比小结')}
                </div>
                <p className="text-xs leading-relaxed text-foreground/80">
                  {currentPair.summary}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

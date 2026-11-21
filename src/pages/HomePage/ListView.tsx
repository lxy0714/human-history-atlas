// EXPORTS: ListView
import { memo } from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CivilBadge from '@/components/ui/civil-badge';
import { ERAS, CIVILIZATIONS, CATEGORIES } from '@/data/history-constants';
import type { CategoryKey, CivilizationKey } from '@/data/history-index';
import type { HistoryState } from './useHistoryStore';
import EmptyState from './components/EmptyState';
import { useI18n } from '@/i18n';
import { getEraName } from '@/data/i18n/content-i18n';

interface ListViewProps {
  store: HistoryState;
}

export default memo(function ListView({ store }: ListViewProps) {
  const { t, ln, nt, ns } = useI18n();
  const { filteredNodes, openDetail, currentEra } = store;

  // 按时代分组
  const nodesByEra = ERAS.map((era) => ({
    era,
    nodes: filteredNodes.filter((n) => n && n.eraId === era.id).sort((a, b) => a.year - b.year),
  })).filter((g) => g.nodes.length > 0);

  return (
    <ScrollArea className="h-[calc(100vh-14rem)] pr-2">
      <div className="space-y-8 pb-36 md:pb-24">
        {nodesByEra.map(({ era, nodes }, eraIdx) => (
          <motion.div
            key={era.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: eraIdx * 0.1 }}
          >
            {/* 时代标题区（装饰性） */}
            <div className="mb-5 flex items-center gap-4">
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to right, transparent, ${era.accent}40)`,
                }}
              />
              <div className="flex flex-col items-center">
                <div
                  className="rounded-full px-4 py-1 text-xs tracking-[0.3em] uppercase"
                  style={{
                    color: era.accent,
                    backgroundColor: `${era.accent}10`,
                    border: `1px solid ${era.accent}30`,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {ln(era)}
                </div>
                <h2
                  className="mt-2 text-2xl font-bold tracking-wide"
                  style={{ color: era.accent, fontFamily: 'var(--font-display)' }}
                >
                  {ln(era)}
                </h2>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {era.description}
                </p>
              </div>
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to left, transparent, ${era.accent}40)`,
                }}
              />
            </div>

            {/* 节点卡片网格 */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {nodes.map((node, i) => {
  
                const civInfo = CIVILIZATIONS[node.civilization] ?? { name: node.civilization, color: '#888' };
                const civColor = civInfo.color;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    <Card
                      onClick={() => openDetail(node)}
                      className="group relative h-full cursor-pointer overflow-hidden border-border/40 bg-card/40 transition-all hover:border-primary/30 hover:bg-card/80 hover:shadow-lg [content-visibility:auto] [contain-intrinsic-size:auto_180px]"
                    >
                      {/* 左侧文明色条 */}
                      <div
                        className="absolute left-0 top-0 h-full w-[3px]"
                        style={{
                          background: `linear-gradient(to bottom, ${civColor}, ${civColor}60)`,
                          boxShadow: `0 0 8px ${civColor}40`,
                        }}
                      />

                      <CardHeader className="p-4 pb-2 pl-5">
                        <div className="flex items-center justify-between gap-2">
                          <CivilBadge
                            variant="civilization"
                            civilization={node.civilization as CivilizationKey}
                            size="sm"
                          />
                          <span
                            className="text-[11px] font-medium tabular-nums"
                            style={{ color: civColor }}
                          >
                            {node.yearDisplay}
                          </span>
                        </div>
                        <CardTitle className="mt-2 text-base font-semibold leading-snug group-hover:text-primary font-serif">
                          {nt(node)}
                        </CardTitle>
                        <CardDescription className="mt-1 line-clamp-2 text-[13px] leading-6 md:text-xs md:leading-relaxed">
                          {ns(node)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 pl-5">
                        <div className="flex flex-wrap gap-1">
                          {(node.categories ?? [])
                            .filter((c): c is CategoryKey => typeof c === 'string' && c in CATEGORIES)
                             .slice(0, 3)
                             .map((cat) => (
                               <CivilBadge
                                 key={cat}
                                 variant="category"
                                 category={cat}
                                 label={`${CATEGORIES[cat]?.icon ?? '◆'} ${ln(CATEGORIES[cat], cat)}`}
                                 size="sm"
                               />
                             ))}
                          {node.important && (
                            <Badge
                              variant="secondary"
                              className="h-4 px-1.5 text-[10px]"
                              style={{
                                backgroundColor: `${currentEra.accent}15`,
                                color: currentEra.accent,
                              }}
                            >
                              重要
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {nodesByEra.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <EmptyState
              type="list"
          description={t('empty.noResultsDesc', '尝试调整文明或专题筛选条件')}
            />
          </div>
        )}
      </div>
    </ScrollArea>
  );
});

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Check, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EMPIRE_DATA, type EmpireRecord } from '@/data/empire-comparison';

interface EmpireComparisonProps {
  onBack?: () => void;
}

type TabType = 'area' | 'population' | 'duration';

const TAB_CONFIG: Record<TabType, { label: string; unit: string; key: keyof EmpireRecord; suffix: string }> = {
  area: { label: '疆域面积', unit: '万平方公里', key: 'area', suffix: ' 万km²' },
  population: { label: '人口峰值', unit: '万人', key: 'population', suffix: ' 万人' },
  duration: { label: '存续时长', unit: '年', key: 'duration', suffix: ' 年' },
};

export default function EmpireComparison({ onBack }: EmpireComparisonProps) {
  const [tab, setTab] = useState<TabType>('area');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const config = TAB_CONFIG[tab];
  const sorted = useMemo(() => {
    return [...EMPIRE_DATA].sort(
      (a, b) => (b[config.key] as number) - (a[config.key] as number),
    );
  }, [tab, config.key]);

  const maxVal = sorted[0]?.[config.key] as number;

  function toggle(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  const selectedCount = selectedIds.size;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Globe className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              帝国疆域比较
            </h2>
            <p className="text-sm text-muted-foreground">
              横向对比历史上各大帝国的疆域、人口与存续时间
            </p>
          </div>
        </div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabType)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="area">疆域面积</TabsTrigger>
          <TabsTrigger value="population">人口峰值</TabsTrigger>
          <TabsTrigger value="duration">存续时长</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <Card className="p-4 md:p-6">
            {selectedCount > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-accent/40 border border-border/60 text-sm flex items-center justify-between">
                <span>
                  已选中 <span className="font-semibold text-primary">{selectedCount}</span> 个帝国进行对比
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs h-7"
                >
                  清除全部
                </Button>
              </div>
            )}

            <div className="space-y-2">
              {sorted.map((empire, idx) => {
                const value = empire[config.key] as number;
                const percent = (value / maxVal) * 100;
                const isSelected = selectedIds.has(empire.id);

                return (
                  <motion.div
                    key={empire.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    onClick={() => toggle(empire.id)}
                    className={`group cursor-pointer p-3 rounded-lg border transition-all hover:border-primary/50 ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                        : 'border-border/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`size-5 shrink-0 rounded-sm border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border group-hover:border-primary/50'
                        }`}
                      >
                        {isSelected && <Check className="size-3" />}
                      </div>
                      <div
                        className="size-3 rounded-full shrink-0"
                        style={{ backgroundColor: empire.color }}
                      />
                      <span className="font-medium flex-1">{empire.name}</span>
                      <span className="text-sm font-semibold tabular-nums">
                        {value.toLocaleString()}
                        {config.suffix}
                      </span>
                    </div>
                    <div className="ml-8 h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.03 }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: isSelected ? empire.color : `${empire.color}cc`,
                          opacity: isSelected ? 1 : 0.7,
                        }}
                      />
                    </div>
                    <div className="ml-8 mt-1.5 text-xs text-muted-foreground flex items-center justify-between">
                      <span>{empire.era}</span>
                      <span>{empire.region}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
              <p>
                点击帝国条目可勾选，被选中的帝国会高亮显示，方便横向对比。面积、人口数据来自学界估算，不同来源可能有差异。
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

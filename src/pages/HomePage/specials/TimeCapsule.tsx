// EXPORTS: TimeCapsule
import { useState, useMemo, useEffect, useRef } from 'react';
import { useI18n } from '@/i18n';
import { motion } from 'framer-motion';
import { Clock, Globe, ChevronRight } from 'lucide-react';
import { HISTORY_NODES_INDEX, CIVILIZATIONS, ERAS, type IHistoryNodeIndex } from '@/data/history-index';
import type { HistoryState } from '../useHistoryStore';
import { formatYear } from '../utils';
import { yearsAgo, getNodeTimeRange } from '../utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimeCapsuleProps {
  store: HistoryState;
}

const MIN_YEAR = -3000;
const MAX_YEAR = 2026;

// 非线性映射：史前占25%（-3000到-500），历史期占75%（-500到2026）
function sliderToYear(val: number): number {
  // val 0-100
  if (val <= 25) {
    const ratio = val / 25;
    return Math.round(MIN_YEAR + ratio * (-500 - MIN_YEAR));
  }
  const ratio = (val - 25) / 75;
  return Math.round(-500 + ratio * (MAX_YEAR - -500));
}

function yearToSlider(year: number): number {
  if (year <= -500) {
    const ratio = (year - MIN_YEAR) / (-500 - MIN_YEAR);
    return ratio * 25;
  }
  const ratio = (year - -500) / (MAX_YEAR - -500);
  return 25 + ratio * 75;
}

export default function TimeCapsule({ store }: TimeCapsuleProps) {
  const { ln, nt } = useI18n();
  const [year, setYear] = useState(1000);
  const [sliderVal, setSliderVal] = useState(() => yearToSlider(1000));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSliderVal(val);
    setYear(sliderToYear(val));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= MIN_YEAR && val <= MAX_YEAR) {
      setYear(val);
      setSliderVal(yearToSlider(val));
    }
  };

  // 筛选该年份"在世/存在"的节点
  const nodesInYear = useMemo(() => {
    return HISTORY_NODES_INDEX.filter((n): n is IHistoryNodeIndex => {
      if (!n) return false;
      const [start, end] = getNodeTimeRange(n);
      return year >= start && year <= end;
    }).sort((a, b) => a.year - b.year);
  }, [year]);

  // 按文明分组
  const byCiv = useMemo(() => {
    const map: Record<string, IHistoryNodeIndex[]> = {};
    nodesInYear.forEach((n) => {
      if (!map[n.civilization]) map[n.civilization] = [];
      map[n.civilization].push(n);
    });
    return map;
  }, [nodesInYear]);

  // 找出所属时代
  const era = useMemo(() => {
    return ERAS.find((e) => year >= e.startYear && year < e.endYear) ?? ERAS[0];
  }, [year]);

  const yearDisplay = formatYear(year, { compact: false });

  return (
    <div className="mx-auto max-w-4xl px-2 py-4 md:px-4 md:py-6">
      {/* 年份大数字 */}
      <motion.div
        key={year}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 text-center"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <Clock className="size-5" style={{ color: era.accent }} />
          <span className="text-xs tracking-widest text-muted-foreground">时 间 胶 囊</span>
        </div>
        <div
          className="mb-2 font-serif text-5xl font-black tracking-tight md:text-7xl"
          style={{ color: era.accent, textShadow: `0 0 30px ${era.accent}40` }}
        >
          {year < 0 ? `前 ${Math.abs(year)}` : year}
        </div>
        <p className="text-sm text-muted-foreground">
          {yearDisplay} · {yearsAgo(year)} · {ln(era)}
        </p>
      </motion.div>

      {/* 滑块 + 输入 */}
      <div className="mb-8 rounded-xl border border-border/40 bg-card/50 p-4 md:p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs text-muted-foreground">前3000</span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={sliderVal}
            onChange={handleSlider}
            className="flex-1 accent-primary"
            style={{ accentColor: era.accent }}
          />
          <span className="text-xs text-muted-foreground">2026</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const y = year - 100;
              if (y >= MIN_YEAR) {
                setYear(y);
                setSliderVal(yearToSlider(y));
              }
            }}
            className="text-xs"
          >
            -100年
          </Button>
          <div className="flex items-center gap-1">
            <input
              ref={inputRef}
              type="number"
              value={year}
              onChange={handleInput}
              min={MIN_YEAR}
              max={MAX_YEAR}
              className="w-28 rounded-md border border-input bg-background px-3 py-1.5 text-center text-sm font-bold font-serif focus:border-primary focus:outline-none"
              style={{ color: era.accent }}
            />
            <span className="text-xs text-muted-foreground">年</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const y = year + 100;
              if (y <= MAX_YEAR) {
                setYear(y);
                setSliderVal(yearToSlider(y));
              }
            }}
            className="text-xs"
          >
            +100年
          </Button>
        </div>
      </div>

      {/* 全球概况 */}
      <motion.div
        key={year}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Globe className="size-4" style={{ color: era.accent }} />
          <h2 className="text-base font-bold font-serif">全球概况</h2>
          <Badge variant="outline" className="text-[10px]">
            {nodesInYear.length} 个节点
          </Badge>
        </div>

        {nodesInYear.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/50 bg-card/30 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              这个时期的记录较少，试试移动滑块到其他年份
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(byCiv).map(([civKey, nodes]) => {
              const civ = CIVILIZATIONS[civKey as keyof typeof CIVILIZATIONS];
              const civColor = civ?.color ?? '#888';
              return (
                <div
                  key={civKey}
                  className="rounded-xl border border-border/40 bg-card/40 overflow-hidden"
                >
                  <div
                    className="flex items-center gap-2 border-b px-4 py-2"
                    style={{
                      borderColor: `${civColor}20`,
                      backgroundColor: `${civColor}08`,
                    }}
                  >
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: civColor }}
                    />
                    <span className="text-sm font-bold font-serif" style={{ color: civColor }}>
                      {civ?.name ?? civKey}
                    </span>
                    <Badge variant="outline" className="ml-auto text-[10px]">
                      {nodes.length} 项
                    </Badge>
                  </div>
                  <ScrollArea className="max-h-64">
                    <div className="divide-y divide-border/30">
                      {nodes.map((n) => {
  
                        const [s, e] = getNodeTimeRange(n);
                        const sStr = formatYear(s);
                        const eStr = formatYear(e);
                        return (
                          <button
                            key={n.id}
                            onClick={() => store.scrollToNode(n.id)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/30"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium font-serif">{nt(n)}</p>
                              <p className="text-[11px] text-muted-foreground">
                                {sStr} ~ {eStr} · {n.type === 'person' ? '人物' : n.type === 'dynasty' ? '朝代' : n.type === 'artifact' ? '文物' : '事件'}
                              </p>
                            </div>
                            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

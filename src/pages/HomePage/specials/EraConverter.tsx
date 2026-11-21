// EXPORTS: EraConverter
import { useState, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CivilBadge from '@/components/ui/civil-badge';
import { motion } from 'framer-motion';
import { formatYear } from '../utils';
import {
  getGanZhi,
  getShengXiao,
  getChineseEra,
  getIslamicYear,
  getBuddhistYear,
  getRomanAUC,
  SHENG_XIAO,
  TIAN_GAN,
  DI_ZHI,
} from '@/data/specials';

const CALENDAR_SYSTEMS = [
  { key: 'gregorian', label: '公元纪年', icon: '' },
  { key: 'ganzhi', label: '干支纪年', icon: '' },
  { key: 'chinese', label: '中国朝代年号', icon: '' },
  { key: 'islamic', label: '伊斯兰历', icon: '' },
  { key: 'buddhist', label: '佛历', icon: '' },
  { key: 'roman', label: '罗马建城纪年', icon: '' },
];

export default function EraConverter() {
  const [year, setYear] = useState(2025);
  const [inputValue, setInputValue] = useState('2025');

  const handleYearChange = (val: string) => {
    setInputValue(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= -3000 && n <= 3000) {
      setYear(n);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value, 10);
    setYear(n);
    setInputValue(String(n));
  };

  const results = useMemo(() => {
    return [
      {
        key: 'gregorian',
        label: '公元纪年',
        icon: '',
        value: formatYear(year, { compact: false }),
        description: '格里高利历，国际通用纪年法',
        color: '#3498db',
      },
      {
        key: 'ganzhi',
        label: '干支纪年',
        icon: '',
        value: `${getGanZhi(year)}年`,
        description: `十二生肖：${getShengXiao(year)}年 · 60年一循环`,
        color: '#9b59b6',
      },
      {
        key: 'chinese',
        label: '中国朝代年号',
        icon: '',
        value: getChineseEra(year),
        description: '以朝代+帝号/年号表示',
        color: '#d4a843',
      },
      {
        key: 'islamic',
        label: '伊斯兰历（希吉来历）',
        icon: '',
        value: getIslamicYear(year),
        description: '从公元622年穆罕默德迁麦地那开始，纯阴历',
        color: '#e67e22',
      },
      {
        key: 'buddhist',
        label: '佛历',
        icon: '',
        value: getBuddhistYear(year),
        description: '从公元前544年佛陀涅槃开始计算',
        color: '#f39c12',
      },
      {
        key: 'roman',
        label: '罗马建城纪年',
        icon: '',
        value: getRomanAUC(year),
        description: '从传说中公元前753年罗慕路斯建城开始',
        color: '#c0392b',
      },
    ];
  }, [year]);

  // 属相环展示
  const zodiacIndex = ((year - 4) % 12 + 12) % 12;

  return (
    <div className="mx-auto max-w-xl space-y-5">
      {/* 标题 */}
      <div className="text-center">
        <h3 className="text-lg font-bold font-serif">纪年对照表</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          输入公元年份，查看各纪年体系对照
        </p>
      </div>

      {/* 年份输入 */}
      <div className="space-y-3 rounded-xl border border-border/40 bg-card/50 p-4">
        <div className="flex items-center gap-3">
          <label className="shrink-0 text-sm font-medium">公元年份</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => handleYearChange(e.target.value)}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-bold font-serif focus:outline-none focus:ring-2 focus:ring-primary"
            min={-3000}
            max={3000}
          />
          <span className="shrink-0 text-xs text-muted-foreground">年</span>
        </div>

        {/* 滑块 */}
        <div className="space-y-1">
          <input
            type="range"
            min={-2000}
            max={2100}
            value={year}
            onChange={handleSliderChange}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[9px] text-muted-foreground">
            <span>前2000</span>
            <span>0</span>
            <span>2025</span>
            <span>2100</span>
          </div>
        </div>

        {/* 快捷年份 */}
        <div className="flex flex-wrap gap-1.5">
          {[
            [-221, '秦统一'],
            [0, '公元元年'],
            [618, '唐建立'],
            [1206, '蒙古建国'],
            [1492, '哥伦布'],
            [1949, '新中国'],
            [2025, '今年'],
          ].map(([y, label]) => (
            <button
              key={String(y)}
              onClick={() => {
                setYear(Number(y));
                setInputValue(String(y));
              }}
              className={`rounded-full px-2 py-1 text-[10px] transition-colors ${
                year === y
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 十二生肖圆环 */}
      <div className="mx-auto">
        <div className="flex items-center justify-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
          <div
            className="flex size-12 items-center justify-center rounded-full text-2xl"
            style={{
              backgroundColor: '#d4a84320',
              border: '2px solid #d4a84360',
            }}
          >
            {['', '', '', '', '', '', '', '', '', '', '', ''][zodiacIndex]}
          </div>
          <div>
            <div className="text-xs text-muted-foreground">生肖</div>
            <div className="text-lg font-bold font-serif" style={{ color: '#d4a843' }}>
              {SHENG_XIAO[zodiacIndex]}年
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-muted-foreground">干支</div>
            <div className="text-lg font-bold font-serif" style={{ color: '#9b59b6' }}>
              {getGanZhi(year)}
            </div>
          </div>
        </div>
      </div>

      {/* 各纪年结果卡片 */}
      <div className="space-y-2">
        {results.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/40 p-3 transition-all hover:bg-card/70"
          >
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-xl"
              style={{ backgroundColor: `${item.color}15` }}
            >
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground/80">
                  {item.label}
                </span>
              </div>
              <div
                className="truncate text-sm font-bold font-serif"
                style={{ color: item.color }}
              >
                {item.value}
              </div>
              <div className="text-[10px] text-muted-foreground">{item.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 干支环说明 */}
      <div className="rounded-lg border border-border/30 bg-card/30 p-3">
        <div className="mb-2 text-xs font-semibold">天干 · 地支</div>
        <div className="mb-2 flex flex-wrap gap-1.5">
           {TIAN_GAN.map((g) => (
             <CivilBadge key={g} variant="myth" label={g} size="sm" />
           ))}
         </div>
         <div className="flex flex-wrap gap-1.5">
           {DI_ZHI.map((z, i) => (
             <CivilBadge
               key={z}
               variant="era"
               color="var(--primary)"
               label={`${z}·${SHENG_XIAO[i]}`}
               size="sm"
               className={i === zodiacIndex ? '' : 'opacity-70'}
             />
           ))}
         </div>
      </div>
    </div>
  );
}

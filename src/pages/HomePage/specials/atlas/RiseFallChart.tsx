import { useMemo, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import '@/utils/echarts-setup';
import type { EChartsOption } from 'echarts';
import {
  getCivilizationRiseFallData,
  formatYear,
  TIME_BUCKETS,
} from './atlas-stats';
import { CIVILIZATIONS, type CivilizationKey } from '@/data/history-index';
import { useThemeColors, getCivilizationColors } from './theme-colors';

interface RiseFallChartProps {
  onYearClick?: (year: number) => void;
  onJumpToMap?: (year: number) => void;
}

// 重大转折事件（竖线标记）
const TURNING_POINTS = [
  { year: -221, name: '秦统一中国' },
  { year: 476, name: '西罗马灭亡' },
  { year: 755, name: '安史之乱' },
  { year: 1453, name: '拜占庭陷落' },
  { year: 1492, name: '大航海时代' },
  { year: 1776, name: '美国独立' },
  { year: 1789, name: '法国大革命' },
  { year: 1840, name: '鸦片战争' },
  { year: 1914, name: '一战爆发' },
  { year: 1945, name: '二战结束' },
  { year: 1991, name: '冷战结束' },
];

export default function RiseFallChart({ onYearClick, onJumpToMap }: RiseFallChartProps) {
  const colors = useThemeColors();
  const civColors = useMemo(() => getCivilizationColors(), []);
  const [mode, setMode] = useState<'dynasties' | 'density'>('dynasties');
  const chartRef = useRef<ReactECharts | null>(null);

  const { xAxis, seriesData } = useMemo(() => getCivilizationRiseFallData(mode), [mode]);

  // 系列配置：按文明
  const civKeys = Object.keys(CIVILIZATIONS) as CivilizationKey[];

  const option: EChartsOption = useMemo(() => {
    const series = civKeys.map((key) => ({
      name: CIVILIZATIONS[key].name,
      type: 'line',
      smooth: true,
      showSymbol: false,
      stack: undefined,
      lineStyle: { width: 2 },
      areaStyle: { opacity: 0.15 },
      emphasis: { focus: 'series' as const },
      data: seriesData[key].map((v, i) => [xAxis[i], v]),
      itemStyle: { color: civColors[key] },
    }));

    // 找到最近 bucket 的索引（用于 markLine）
    const findBucketIdx = (year: number) => {
      let best = 0;
      let minDist = Infinity;
      for (let i = 0; i < xAxis.length; i++) {
        const d = Math.abs(xAxis[i] - year);
        if (d < minDist) {
          minDist = d;
          best = i;
        }
      }
      return best;
    };

    // markLine：重大转折
    const markLineData = TURNING_POINTS.map((tp) => {
      const idx = findBucketIdx(tp.year);
      const sum = civKeys.reduce((acc, k) => acc + seriesData[k][idx], 0);
      return {
        name: tp.name,
        xAxis: tp.year,
        label: {
          formatter: tp.name,
          position: 'end' as const,
          fontSize: 10,
          padding: [2, 4],
        },
        lineStyle: {
          type: 'dashed' as const,
          width: 1,
          opacity: 0.6,
        },
        yAxis: sum * 0.05, // 固定顶部
      };
    });

    // x轴标签：只显示一部分（关键节点）
    const xLabels = xAxis.map((y) => {
      // 仅显示代表点
      const keyPoints = [-3000000, -30000, -5000, -3000, -1000, -500, 0, 500, 1000, 1500, 1700, 1800, 1900, 2000];
      if (keyPoints.some((k) => Math.abs(y - k) < 10)) {
        return formatYear(y);
      }
      return '';
    });

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: colors.tooltipBg,
        borderColor: colors.border,
        textStyle: { color: colors.tooltipText, fontSize: 12 },
        formatter: (params: unknown) => {
          const arr = Array.isArray(params) ? params : [params];
          const list = arr as Array<{ marker: string; seriesName: string; value: number | number[]; axisValue: number }>;
          if (list.length === 0) return '';
          const yearVal = list[0].axisValue as number;
          let html = `<div style="font-weight:600;margin-bottom:4px;">${formatYear(yearVal)}</div>`;
          const sorted = [...list].sort((a, b) => (b.value as number) - (a.value as number));
          for (const p of sorted) {
            const val = Math.round((p.value as number) * 10) / 10;
            if (val <= 0) continue;
            html += `<div style="display:flex;justify-content:space-between;gap:16px;">
              <span>${p.marker}${p.seriesName}</span>
              <span style="font-variant-numeric:tabular-nums;font-weight:600;">${val}</span>
            </div>`;
          }
          return html;
        },
      },
      legend: {
        type: 'scroll',
        bottom: 0,
        textStyle: { color: colors.textSecondary, fontSize: 11 },
        itemWidth: 14,
        itemHeight: 8,
      },
      grid: {
        left: '3%',
        right: '4%',
        top: 30,
        bottom: '18%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: xLabels,
        boundaryGap: false,
        axisLine: { lineStyle: { color: colors.axisLine } },
        axisLabel: {
          color: colors.textSecondary,
          fontSize: 10,
          rotate: 30,
        },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        name: mode === 'dynasties' ? '存续政权数' : '节点密度',
        nameTextStyle: { color: colors.textSecondary, fontSize: 11 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: colors.splitLine, type: 'dashed' } },
        axisLabel: { color: colors.textSecondary, fontSize: 10 },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 40,
          end: 100,
        },
        {
          type: 'slider',
          bottom: 40,
          height: 18,
          start: 40,
          end: 100,
          borderColor: 'transparent',
          backgroundColor: colors.muted,
          fillerColor: colors.primary + '30',
          handleStyle: { color: colors.primary },
          textStyle: { color: colors.textSecondary, fontSize: 10 },
        },
      ],
      series: series.map((s) => ({
        ...s,
        markLine: s.name === CIVILIZATIONS[civKeys[0]].name
          ? {
              symbol: 'none',
              silent: false,
              label: { color: colors.foreground },
              lineStyle: { color: colors.textSecondary },
              data: markLineData,
            }
          : undefined,
      })),
    } as EChartsOption;
  }, [xAxis, seriesData, civKeys, colors, civColors, mode]);

  // 点击跳转
  const handleChartClick = (params: { dataIndex?: number; componentType?: string }) => {
    if (params.componentType === 'markLine') return;
    if (typeof params.dataIndex === 'number') {
      const year = xAxis[params.dataIndex];
      onYearClick?.(year);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold font-display md:text-lg">文明兴衰曲线</h3>
          <p className="text-xs text-muted-foreground">
            拖动下方滑块浏览不同时期，悬停查看各文明数值，点击可联动至当年地图
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border/40 bg-muted/40 p-0.5">
          <button
            onClick={() => setMode('dynasties')}
            className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
              mode === 'dynasties'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            存续政权数
          </button>
          <button
            onClick={() => setMode('density')}
            className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
              mode === 'density'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            节点事件密度
          </button>
        </div>
      </div>
      <div className="h-[380px] w-full md:h-[440px]">
        <ReactECharts
          ref={(el) => {
            chartRef.current = el;
          }}
          option={option}
          notMerge
          lazyUpdate
          style={{ height: '100%', width: '100%' }}
          onEvents={{
            click: handleChartClick,
          }}
        />
      </div>
      {onJumpToMap && (
        <div className="text-right">
          <button
            onClick={() => onJumpToMap(TIME_BUCKETS[Math.floor(TIME_BUCKETS.length * 0.7)])}
            className="text-xs text-primary hover:underline"
          >
            在地图上查看当年疆域 →
          </button>
        </div>
      )}
    </div>
  );
}

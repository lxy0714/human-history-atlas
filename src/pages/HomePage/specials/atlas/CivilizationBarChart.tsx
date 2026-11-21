import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import '@/utils/echarts-setup';
import type { EChartsOption } from 'echarts';
import { CIVILIZATIONS, type CivilizationKey } from '@/data/history-index';
import { useAtlasStats } from './atlas-stats';
import { useThemeColors, getCivilizationColors } from './theme-colors';

interface CivilizationBarChartProps {
  onCivilizationClick?: (civ: CivilizationKey) => void;
}

export default function CivilizationBarChart({ onCivilizationClick }: CivilizationBarChartProps) {
  const colors = useThemeColors();
  const civColors = useMemo(() => getCivilizationColors(), []);
  const stats = useAtlasStats();

  const option: EChartsOption = useMemo(() => {
    // 按数量从多到少排列
    const entries = (Object.keys(CIVILIZATIONS) as CivilizationKey[])
      .map((k) => ({ key: k, name: CIVILIZATIONS[k].name, value: stats.byCiv[k] ?? 0 }))
      .sort((a, b) => a.value - b.value); // 从下往上，最下面是最少的

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: colors.tooltipBg,
        borderColor: colors.border,
        textStyle: { color: colors.tooltipText, fontSize: 12 },
        formatter: (params: unknown) => {
          const arr = Array.isArray(params) ? params : [params];
          const p = arr[0] as { name: string; value: number };
          return `<div style="font-weight:600;">${p.name}</div>节点数：<b>${p.value}</b>`;
        },
      },
      grid: {
        left: '3%',
        right: '8%',
        top: 10,
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: colors.splitLine, type: 'dashed' } },
        axisLabel: { color: colors.textSecondary, fontSize: 10 },
      },
      yAxis: {
        type: 'category',
        data: entries.map((e) => e.name),
        axisLine: { lineStyle: { color: colors.axisLine } },
        axisTick: { show: false },
        axisLabel: { color: colors.textSecondary, fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          data: entries.map((e) => ({
            value: e.value,
            itemStyle: {
              borderRadius: [0, 4, 4, 0],
              color: civColors[e.key],
            },
          })),
          barWidth: '60%',
          label: {
            show: true,
            position: 'right',
            fontSize: 10,
            formatter: (p: { value: number }) => String(p.value),
          },
        },
      ],
    } as EChartsOption;
  }, [stats, colors, civColors]);

  const handleClick = (params: { name?: string }) => {
    if (!params.name) return;
    const entry = Object.entries(CIVILIZATIONS).find(([, v]) => v.name === params.name);
    if (entry) onCivilizationClick?.(entry[0] as CivilizationKey);
  };

  return (
    <div>
      <h3 className="mb-2 text-base font-bold font-display md:text-lg">文明分布</h3>
      <p className="mb-2 text-xs text-muted-foreground">
        十大文明的节点数量排行，点击条形图筛选对应文明
      </p>
      <div className="h-[360px] w-full">
        <ReactECharts
          option={option}
          notMerge
          style={{ height: '100%', width: '100%' }}
          onEvents={{ click: handleClick }}
        />
      </div>
    </div>
  );
}

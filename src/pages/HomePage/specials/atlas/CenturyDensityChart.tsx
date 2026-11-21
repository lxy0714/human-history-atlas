import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import '@/utils/echarts-setup';
import type { EChartsOption } from 'echarts';
import { getCenturyDensity, formatYear } from './atlas-stats';
import { useThemeColors } from './theme-colors';

export default function CenturyDensityChart() {
  const colors = useThemeColors();

  const data = useMemo(() => getCenturyDensity(), []);

  const option: EChartsOption = useMemo(() => {
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
        right: '4%',
        top: 20,
        bottom: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.map((d) => d.label),
        axisLine: { lineStyle: { color: colors.axisLine } },
        axisLabel: {
          color: colors.textSecondary,
          fontSize: 10,
          rotate: 35,
          interval: 0,
        },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        name: '节点数',
        nameTextStyle: { color: colors.textSecondary, fontSize: 11 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: colors.splitLine, type: 'dashed' } },
        axisLabel: { color: colors.textSecondary, fontSize: 10 },
      },
      series: [
        {
          type: 'bar',
          data: data.map((d) => d.count),
          barWidth: '65%',
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: colors.primary },
                { offset: 1, color: colors.primary + '40' },
              ],
            },
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 9,
            formatter: (p: { value: number }) => String(p.value),
          },
        },
      ],
    } as EChartsOption;
  }, [colors]);

  return (
    <div>
      <h3 className="mb-2 text-base font-bold font-display md:text-lg">历史加速度</h3>
      <p className="mb-2 text-xs text-muted-foreground">
        古代每 500 年 / 近现代每 100 年的节点密度，越靠近现代越密集
      </p>
      <div className="h-[280px] w-full">
        <ReactECharts
          option={option}
          notMerge
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import '@/utils/echarts-setup';
import type { EChartsOption } from 'echarts';
import { getRelationTypeStats } from './atlas-stats';
import { useThemeColors } from './theme-colors';

export default function RelationTypeChart() {
  const colors = useThemeColors();
  const stats = useMemo(() => getRelationTypeStats(), []);

  const option: EChartsOption = useMemo(() => {
    const sorted = [...stats].sort((a, b) => b.count - a.count);
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
          return `<div style="font-weight:600;">${p.name}</div>关系数：<b>${p.value}</b>`;
        },
      },
      grid: {
        left: '3%',
        right: '12%',
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
        data: sorted.map((s) => s.label),
        axisLine: { lineStyle: { color: colors.axisLine } },
        axisTick: { show: false },
        axisLabel: { color: colors.textSecondary, fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          data: sorted.map((s) => ({
            value: s.count,
            itemStyle: {
              borderRadius: [0, 4, 4, 0],
              color: s.color,
            },
          })),
          barWidth: '55%',
          label: {
            show: true,
            position: 'right',
            fontSize: 10,
            formatter: (p: { value: number }) => String(p.value),
          },
        },
      ],
    } as EChartsOption;
  }, [stats, colors]);

  return (
    <div>
      <h3 className="mb-2 text-base font-bold font-display md:text-lg">关系类型分布</h3>
      <p className="mb-2 text-xs text-muted-foreground">
        人物 / 因果 / 时间 / 地理 / 文化 / 对照 六类关系数量
      </p>
      <div className="h-[260px] w-full">
        <ReactECharts
          option={option}
          notMerge
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
}

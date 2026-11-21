import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import '@/utils/echarts-setup';
import type { EChartsOption } from 'echarts';
import { ERAS } from '@/data/history-index';
import { useAtlasStats } from './atlas-stats';
import { useThemeColors } from './theme-colors';

interface EraDistributionChartProps {
  onEraClick?: (eraId: string) => void;
}

export default function EraDistributionChart({ onEraClick }: EraDistributionChartProps) {
  const colors = useThemeColors();
  const stats = useAtlasStats();

  const option: EChartsOption = useMemo(() => {
    const eraData = ERAS.map((e) => ({
      name: e.name,
      value: stats.byEra[e.id] ?? 0,
      eraId: e.id,
    }));

    // 每个时代一个渐变色（从主色到辅色）
    const baseHue = 40;
    const barColors = eraData.map((_, i) => {
      const lightness = 70 - i * 4;
      return `hsl(${baseHue + i * 8}, 55%, ${lightness}%)`;
    });

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
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: eraData.map((e) => e.name),
        axisLine: { lineStyle: { color: colors.axisLine } },
        axisLabel: {
          color: colors.textSecondary,
          fontSize: 11,
          interval: 0,
          rotate: 20,
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
          data: eraData.map((d, i) => ({
            value: d.value,
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
              color: barColors[i],
            },
          })),
          barWidth: '50%',
          label: {
            show: true,
            position: 'top',
            fontSize: 10,
            formatter: (p: { value: number }) => String(p.value),
          },
        },
      ],
    } as EChartsOption;
  }, [stats, colors]);

  const handleClick = (params: { dataIndex?: number }) => {
    if (typeof params.dataIndex === 'number') {
      const era = ERAS[params.dataIndex];
      if (era) onEraClick?.(era.id);
    }
  };

  return (
    <div>
      <h3 className="mb-2 text-base font-bold font-display md:text-lg">时代分布</h3>
      <p className="mb-2 text-xs text-muted-foreground">
        七个历史时代的节点数量对比，点击柱子可筛选查看该时代的节点
      </p>
      <div className="h-[280px] w-full">
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

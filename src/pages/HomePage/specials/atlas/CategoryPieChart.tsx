import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import '@/utils/echarts-setup';
import type { EChartsOption } from 'echarts';
import { useAtlasStats } from './atlas-stats';
import { useThemeColors } from './theme-colors';

interface CategoryPieChartProps {
  onCategoryClick?: (type: string) => void;
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  person: { label: '人物', color: '#e74c3c' },
  event: { label: '事件', color: '#3498db' },
  dynasty: { label: '王朝', color: '#f1c40f' },
  artifact: { label: '文物', color: '#9b59b6' },
  myth: { label: '神话', color: '#e67e22' },
  culture: { label: '文化', color: '#27ae60' },
};

export default function CategoryPieChart({ onCategoryClick }: CategoryPieChartProps) {
  const colors = useThemeColors();
  const stats = useAtlasStats();

  const option: EChartsOption = useMemo(() => {
    const data = (Object.keys(TYPE_LABELS) as string[]).map((k) => ({
      name: TYPE_LABELS[k].label,
      value: (stats.byType as Record<string, number>)[k] ?? 0,
      itemStyle: { color: TYPE_LABELS[k].color },
      rawType: k,
    }));

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: colors.tooltipBg,
        borderColor: colors.border,
        textStyle: { color: colors.tooltipText, fontSize: 12 },
        formatter: (p: unknown) => {
          const item = p as { name: string; value: number; percent: number };
          return `<div style="font-weight:600;">${item.name}</div>数量：<b>${item.value}</b><br/>占比：${item.percent?.toFixed(1)}%`;
        },
      },
      legend: {
        type: 'scroll',
        bottom: 0,
        textStyle: { color: colors.textSecondary, fontSize: 11 },
      },
      title: {
        text: `${stats.total}`,
        subtext: '节点总数',
        left: 'center',
        top: '38%',
        textStyle: {
          color: colors.foreground,
          fontSize: 28,
          fontWeight: 700,
          fontFamily: 'ZCOOL XiaoWei, serif',
        },
        subtextStyle: {
          color: colors.textSecondary,
          fontSize: 12,
        },
      },
      series: [
        {
          name: '类型结构',
          type: 'pie',
          radius: ['55%', '75%'],
          center: ['50%', '42%'],
          avoidLabelOverlap: true,
          label: { show: false },
          emphasis: {
            label: { show: false },
            scale: true,
            scaleSize: 6,
          },
          labelLine: { show: false },
          data,
        },
      ],
    } as EChartsOption;
  }, [stats, colors]);

  const handleClick = (params: { name?: string }) => {
    if (!params.name) return;
    const entry = Object.entries(TYPE_LABELS).find(([, v]) => v.label === params.name);
    if (entry) onCategoryClick?.(entry[0]);
  };

  return (
    <div>
      <h3 className="mb-2 text-base font-bold font-display md:text-lg">类型结构</h3>
      <p className="mb-2 text-xs text-muted-foreground">
        人物 / 事件 / 王朝 / 文物 / 神话 六类节点占比，点击扇区筛选
      </p>
      <div className="h-[320px] w-full">
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

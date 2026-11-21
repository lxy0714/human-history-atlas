import { useCallback, useEffect, useRef, useState } from 'react';
import StatsOverview from './atlas/StatsOverview';
import RiseFallChart from './atlas/RiseFallChart';
import EraDistributionChart from './atlas/EraDistributionChart';
import CategoryPieChart from './atlas/CategoryPieChart';
import CivilizationBarChart from './atlas/CivilizationBarChart';
import CenturyDensityChart from './atlas/CenturyDensityChart';
import RelationTypeChart from './atlas/RelationTypeChart';
import TopHubNodes from './atlas/TopHubNodes';
import { AppEvents } from '../app-events';
import {
  BarChart3,
  Info,
  ArrowLeft,
} from 'lucide-react';
import type { HistoryState } from '../useHistoryStore';
import { ALL_HISTORY_NODES_INDEX, ERAS, type CivilizationKey } from '@/data/history-index';
import { RELATION_STATS } from '@/data/relations';
import { formatYear } from './atlas/atlas-stats';

interface CivilizationAtlasProps {
  store: HistoryState;
  onBack?: () => void;
}

export default function CivilizationAtlas({ store, onBack }: CivilizationAtlasProps) {
  const [showGuide, setShowGuide] = useState(true);
  const hasJumped = useRef(false);

  const handleEraClick = useCallback(
    (eraId: string) => {
      const era = ERAS.find((e) => e.id === eraId);
      if (!era) return;
      store.setCurrentEraById(eraId);
      store.setTimeRange([era.startYear, era.endYear]);
      // 切到时间轴视图
      store.setViewMode('timeline');
      // 通知外层关掉专题馆
      requestJumpBack();
    },
    [store],
  );

  const handleCategoryClick = useCallback(
    (type: string) => {
      // 类型筛选：映射到 categories 或 type
      // 这里简化：用 custom event 让列表筛选
      store.clearFilters();
      store.setViewMode('timeline');
      // 发事件通知筛选
      window.dispatchEvent(
        new CustomEvent(AppEvents.ATLAS_FILTER, {
          detail: { filter: 'type', value: type },
        }),
      );
      requestJumpBack();
    },
    [store],
  );

  const handleCivClick = useCallback(
    (civ: CivilizationKey) => {
      store.clearFilters();
      store.toggleCivilization(civ);
      store.setViewMode('timeline');
      requestJumpBack();
    },
    [store],
  );

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      const node = ALL_HISTORY_NODES_INDEX.find((n) => n.id === nodeId);
      if (node) {
        store.openDetail(node);
        store.setViewMode('timeline');
        store.scrollToNode(nodeId);
        requestJumpBack();
      }
    },
    [store],
  );

  const handleYearClick = useCallback(
    (year: number) => {
      store.setCurrentEraByYear(year);
      store.setTimeRange([year - 50, year + 50]);
    },
    [store],
  );

  const handleJumpToMap = useCallback(
    (year: number) => {
      store.setCurrentEraByYear(year);
      store.setTimeRange([year - 100, year + 100]);
      store.setViewMode('map');
      requestJumpBack();
    },
    [store],
  );

  const requestJumpBack = () => {
    hasJumped.current = true;
    // 延时一点让用户看到反馈再关闭专题馆
    setTimeout(() => {
      onBack?.();
    }, 300);
  };

  // 清理
  useEffect(() => {
    return () => {
      hasJumped.current = false;
    };
  }, []);

  return (
    <div className="space-y-5">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <BarChart3 className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-display md:text-xl">文明图鉴 · 数据可视化</h2>
            <p className="text-xs text-muted-foreground">
              基于 {ALL_HISTORY_NODES_INDEX.filter((n) => n).length.toLocaleString()} 个历史节点与 {RELATION_STATS.totalPairs.toLocaleString()} 条关联，一图看懂人类文明的节奏
            </p>
            <p className="mt-0.5 text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {RELATION_STATS.typedPairs.toLocaleString()} 条类型关联 · {(RELATION_STATS.totalPairs - RELATION_STATS.typedPairs).toLocaleString()} 条相关
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowGuide((v) => !v)}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Info className="size-3.5" />
          如何看懂
        </button>
      </div>

      {/* 使用说明 */}
      {showGuide && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-foreground/80 md:text-sm">
          <p className="mb-2 font-semibold text-primary">如何阅读这张图鉴</p>
          <ul className="space-y-1 pl-4">
            <li>· <b>文明兴衰曲线</b>：横向对比 10 大文明在各时期的活跃程度，虚线标记重大转折点</li>
            <li>· <b>时代分布 / 类型结构 / 文明分布</b>：从三个维度观察节点构成</li>
            <li>· <b>历史加速度</b>：直观感受越靠近现代，历史事件越密集的"加速"现象</li>
            <li>· <b>枢纽节点 Top15</b>：关系网中度数最高的节点，是历史的"十字路口"</li>
            <li>· 所有图表可点击：联动筛选结果，跳转到时间轴 / 地图 / 详情</li>
          </ul>
        </div>
      )}

      {/* 总览数字卡 */}
      <StatsOverview />

      {/* 核心图：文明兴衰曲线 */}
      <div className="rounded-xl border border-border/40 bg-card/40 p-3 md:p-5">
        <RiseFallChart onYearClick={handleYearClick} onJumpToMap={handleJumpToMap} />
      </div>

      {/* 时代分布 + 类型环形 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border/40 bg-card/40 p-3 md:p-5">
          <EraDistributionChart onEraClick={handleEraClick} />
        </div>
        <div className="rounded-xl border border-border/40 bg-card/40 p-3 md:p-5">
          <CategoryPieChart onCategoryClick={handleCategoryClick} />
        </div>
      </div>

      {/* 文明分布条形 */}
      <div className="rounded-xl border border-border/40 bg-card/40 p-3 md:p-5">
        <CivilizationBarChart onCivilizationClick={handleCivClick} />
      </div>

      {/* 世纪密度 + 关系类型 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border/40 bg-card/40 p-3 md:p-5">
          <CenturyDensityChart />
        </div>
        <div className="rounded-xl border border-border/40 bg-card/40 p-3 md:p-5">
          <RelationTypeChart />
        </div>
      </div>

      {/* 枢纽节点排行 */}
      <div className="rounded-xl border border-border/40 bg-card/40 p-3 md:p-5">
        <TopHubNodes onNodeClick={handleNodeClick} />
      </div>

      {/* 底部说明 */}
      <div className="rounded-xl border border-border/30 bg-card/30 p-4 text-[11px] leading-relaxed text-muted-foreground md:text-xs">
        <p className="mb-1 font-semibold text-foreground/70">统计口径说明</p>
        <p>· 节点总数 = {formatYear(-3000000)} 至 {formatYear(2026)} 的全部历史节点</p>
        <p>· 文明兴衰"存续政权数"基于王朝/帝国节点的存续时间估算（非学术精确，仅供趋势参考）</p>
        <p>· "节点事件密度"为所有类型节点按年份的核密度估计，体现历史事件的时间分布</p>
        <p>· 度数 = 该节点在关系网络中涉及的关系数量（入度+出度），代表节点的枢纽程度</p>
      </div>
    </div>
  );
}

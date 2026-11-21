import { useState, useMemo } from 'react';
import { useI18n } from '@/i18n';
import { ArrowLeft, MapPin, Clock, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ALL_HISTORY_NODES_INDEX, CIVILIZATIONS, type IHistoryNodeIndex } from '@/data/history-index';
import { findNodeById } from '@/data/relations';
import { useIsMobile } from '@/hooks/use-mobile';
import { stripInlineMarkers } from '@/lib/markdown-render';
import type { HistoryState } from '../useHistoryStore';

interface CityData {
  id: string;
  name: string;
  ancientName: string;
  civilization: string;
  description: string;
  // 用于匹配的坐标和半径（度）
  lat: number;
  lng: number;
  radius: number; // km
  // 标题关键词匹配（用于没有 lat/lng 的王朝/帝国类节点）
  keywordTitle?: string[];
}

const CITIES: CityData[] = [
  {
    id: 'changan',
    name: '长安（西安）',
    ancientName: '长安',
    civilization: 'china',
    description: '十三朝古都，周秦汉唐都城，丝绸之路东方起点，唐长安百万人口为当时世界第一城',
    lat: 34.26,
    lng: 108.95,
    radius: 60,
  },
  {
    id: 'luoyang',
    name: '洛阳',
    ancientName: '洛阳',
    civilization: 'china',
    description: '九朝古都，河洛文明中心，龙门石窟，隋唐大运河中枢',
    lat: 34.62,
    lng: 112.45,
    radius: 50,
  },
  {
    id: 'kaifeng',
    name: '开封',
    ancientName: '汴京',
    civilization: 'china',
    description: '北宋汴京，《清明上河图》中的世界最繁华商业都市',
    lat: 34.79,
    lng: 114.35,
    radius: 50,
  },
  {
    id: 'beijing',
    name: '北京',
    ancientName: '燕京/大都/北京',
    civilization: 'china',
    description: '元大都、明清北京、新中国首都，紫禁城所在地，近800年政治中心',
    lat: 39.90,
    lng: 116.40,
    radius: 60,
  },
  {
    id: 'nanjing',
    name: '南京',
    ancientName: '金陵/建康/应天',
    civilization: 'china',
    description: '六朝古都、明初都城、太平天国天京、民国首都',
    lat: 32.06,
    lng: 118.79,
    radius: 50,
  },
  {
    id: 'rome',
    name: '罗马',
    ancientName: 'Roma',
    civilization: 'europe',
    description: '"永恒之城"，罗马帝国首都，天主教中心，条条大路通罗马',
    lat: 41.90,
    lng: 12.50,
    radius: 30,
  },
  {
    id: 'constantinople',
    name: '君士坦丁堡（伊斯坦布尔）',
    ancientName: '拜占庭/君士坦丁堡',
    civilization: 'europe',
    description: '拜占庭帝国千年首都，1453后为奥斯曼首都，地跨欧亚',
    lat: 41.01,
    lng: 28.98,
    radius: 20,
  },
  {
    id: 'baghdad',
    name: '巴格达',
    ancientName: 'Madinat al-Salam',
    civilization: 'middleEast',
    description: '阿拔斯哈里发首都，智慧宫所在，8-10世纪世界学术中心',
    lat: 33.31,
    lng: 44.36,
    radius: 30,
  },
  {
    id: 'paris',
    name: '巴黎',
    ancientName: 'Lutetia / Paris',
    civilization: 'europe',
    description: '法兰克/法兰西首都，启蒙运动与法国大革命中心，艺术文化之都',
    lat: 48.86,
    lng: 2.35,
    radius: 20,
  },
  {
    id: 'london',
    name: '伦敦',
    ancientName: 'Londinium',
    civilization: 'europe',
    description: '工业革命中心，大英帝国首都，现代金融与议会民主发源地之一',
    lat: 51.51,
    lng: -0.13,
    radius: 30,
  },
];

// 计算两点之间的距离（km），Haversine 公式
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function getCityNodes(
  city: CityData,
  nt: (n: IHistoryNodeIndex) => string,
): IHistoryNodeIndex[] {
  const result: IHistoryNodeIndex[] = [];
  const seen = new Set<string>();

  for (const n of ALL_HISTORY_NODES_INDEX) {
    if (seen.has(n.id)) continue;

    // 1. 坐标匹配
    if (n.location?.lat !== undefined && n.location?.lng !== undefined) {
      const dist = haversine(city.lat, city.lng, n.location.lat, n.location.lng);
      if (dist <= city.radius) {
        result.push(n);
        seen.add(n.id);
        continue;
      }
    }

    // 2. 标题关键词匹配（针对王朝/帝国类大节点，用城市名作为都城关联）
    // 中英双匹配：关键词表是中文，英文态下也必须能命中
    const title: string = `${n.title} ${nt(n)}`;
    if (city.keywordTitle?.some((kw) => title.includes(kw))) {
      result.push(n);
      seen.add(n.id);
      continue;
    }
  }

  // 按 year 排序
  return result.sort((a, b) => a.year - b.year);
}

interface CityMemoryProps {
  store: HistoryState;
  onBack: () => void;
}

export default function CityMemory({ store, onBack }: CityMemoryProps) {
  const { ln, nt, ns } = useI18n();
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { scrollToNode } = store;

  const city = useMemo(() => CITIES.find((c) => c.id === activeCity) ?? null, [activeCity]);
  const cityNodes = useMemo(() => (city ? getCityNodes(city, nt) : []), [city, nt]);

  function handleNodeClick(nodeId: string) {
    scrollToNode(nodeId);
  }

  if (!activeCity) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-1 size-3" />
            返回
          </Button>
          <div>
            <h2 className="text-lg font-bold font-serif">城市记忆</h2>
            <p className="text-xs text-muted-foreground">10 座历史名城的历代变迁</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {CITIES.map((c, i) => {
            const nc = CIVILIZATIONS[c.civilization]?.color ?? '#888';
            const count = getCityNodes(c, nt).length;
            return (
              <motion.button
                  type="button"
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCity(c.id)}
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 text-left transition-all hover:border-border hover:bg-card"
              >
                <div
                  className="absolute right-0 top-0 h-20 w-20 -translate-y-6 translate-x-6 rounded-full opacity-10 blur-xl"
                  style={{ backgroundColor: nc }}
                />
                <div className="mb-2 flex items-center gap-2">
                  <Building2 className="size-5" style={{ color: nc }} />
                  <h3 className="text-sm font-semibold">{c.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{c.description}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px]">
                    {count} 个节点
                  </Badge>
                </div>
                <ArrowLeft
                  className="absolute bottom-3 right-3 size-3 rotate-180 text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setActiveCity(null)}>
          <ArrowLeft className="mr-1 size-3" />
          返回
        </Button>
        <div>
          <h2 className="text-lg font-bold font-serif">{city?.name}</h2>
          <p className="text-xs text-muted-foreground">{city?.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/30 px-3 py-2 text-[11px] text-muted-foreground">
        <MapPin className="size-3.5 text-primary" />
        <span>
          共 {cityNodes.length} 个历史节点 · 按时间线排列 · 点击查看详情
        </span>
      </div>

      <ScrollArea className="w-full">
        <div className="relative ml-3 space-y-3 border-l-2 border-border/40 py-2 pr-2">
          {cityNodes.map((node, idx) => {
  
            const nc = CIVILIZATIONS[node.civilization]?.color ?? '#888';
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                className="relative"
              >
                {/* 时间点 */}
                <div
                  className="absolute -left-[22px] top-3 size-2.5 rounded-full border-2 border-background"
                  style={{ backgroundColor: nc }}
                />
                <motion.button
                  type="button"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNodeClick(node.id)}
                  className="w-full rounded-lg border border-border/40 bg-card/50 p-3 text-left transition-all hover:border-primary/40 hover:bg-card"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
                        {node.yearDisplay}
                      </span>
                      <span
                        className="size-1 rounded-full"
                        style={{ backgroundColor: nc }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {ln(CIVILIZATIONS[node.civilization], node.civilization)}
                      </span>
                    </div>
                      <Badge variant="outline" className="h-5 px-1.5 text-[9px]">
                          {node.type === 'event'
                            ? '事件'
                            : node.type === 'person'
                              ? '人物'
                              : node.type === 'dynasty'
                                ? '王朝'
                                : node.type === 'artifact'
                                  ? '文物'
                                  : node.type === 'myth'
                                    ? '神话'
                                    : node.type}
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm font-medium">{nt(node)}</div>
                  <div className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">
                    {ns(node) || stripInlineMarkers(node.description || '').slice(0, 60) || '查看详情'}
                  </div>
                </motion.button>
              </motion.div>
            );
          })}

          {cityNodes.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              暂无该城市相关节点
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

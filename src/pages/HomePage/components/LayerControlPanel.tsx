// EXPORTS: LayerControlPanel
import { useState } from 'react';
import { useI18n } from '@/i18n';
import { Layers, X, MapPin, Route, Crown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ERAS, CIVILIZATIONS } from '@/data/history-index';
import { EMPIRES } from '@/data/empires';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayerControlPanelProps {
  showNodes: boolean;
  showEmpires: boolean;
  showRoutes: boolean;
  showCivColors: boolean;
  empireMode: 'concurrent' | 'peak' | 'off';
  selectedPeakEmpireId: string;
  onToggleNodes: () => void;
  onToggleEmpires: () => void;
  onToggleRoutes: () => void;
  onToggleCivColors: () => void;
  onEmpireModeChange: (mode: 'concurrent' | 'peak' | 'off') => void;
  onSelectPeakEmpire: (id: string) => void;
  onEraJump: (eraIndex: number) => void;
}

export default function LayerControlPanel({
  showNodes,
  showEmpires,
  showRoutes,
  showCivColors,
  empireMode,
  selectedPeakEmpireId,
  onToggleNodes,
  onToggleEmpires,
  onToggleRoutes,
  onToggleCivColors,
  onEmpireModeChange,
  onSelectPeakEmpire,
  onEraJump,
}: LayerControlPanelProps) {
  const { ln } = useI18n();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const selectedEmpire = EMPIRES.find((e) => e.id === selectedPeakEmpireId);

  const PanelContent = (
    <div className="space-y-3 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-serif">图层控制</span>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setOpen(false)}
          >
            <X className="size-3" />
          </Button>
        )}
      </div>

      <Separator />

      {/* 图层开关 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-muted-foreground" />
            <span className="text-xs">历史节点标记</span>
          </div>
          <Switch checked={showNodes} onCheckedChange={onToggleNodes} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="size-3.5 text-muted-foreground" />
            <span className="text-xs">帝国疆域图层</span>
          </div>
          <Switch checked={showEmpires} onCheckedChange={onToggleEmpires} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Route className="size-3.5 text-muted-foreground" />
            <span className="text-xs">历史路线动画</span>
          </div>
          <Switch checked={showRoutes} onCheckedChange={onToggleRoutes} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="size-3.5 text-muted-foreground" />
            <span className="text-xs">文明色彩标识</span>
          </div>
          <Switch checked={showCivColors} onCheckedChange={onToggleCivColors} />
        </div>
      </div>

      <Separator />

      {/* 疆域显示模式 */}
      <div className="space-y-2">
        <span className="text-xs font-semibold">疆域显示模式</span>
        <Tabs
          value={empireMode}
          onValueChange={(v) => onEmpireModeChange(v as 'concurrent' | 'peak' | 'off')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="concurrent" className="text-[11px]">
              并立年份
            </TabsTrigger>
            <TabsTrigger value="peak" className="text-[11px]">
              极盛叠加
            </TabsTrigger>
            <TabsTrigger value="off" className="text-[11px]">
              关闭
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {empireMode === 'peak' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="mt-1 w-full justify-between text-xs"
              >
                <span className="truncate">{selectedEmpire?.name ?? '选择帝国'}</span>
                <span className="text-muted-foreground">▾</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-72 w-56 overflow-y-auto">
              {EMPIRES.map((e) => (
                <DropdownMenuItem
                  key={e.id}
                  onClick={() => onSelectPeakEmpire(e.id)}
                  className="text-xs"
                >
                  <span
                    className="mr-2 size-2 rounded-full"
                    style={{
                      backgroundColor:
                        CIVILIZATIONS[e.civilization as keyof typeof CIVILIZATIONS]
                          ?.color ?? '#888',
                    }}
                  />
                  {e.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Separator />

      {/* 时代快进 */}
      <div className="space-y-2">
        <span className="text-xs font-semibold">时代快进</span>
        <div className="grid grid-cols-2 gap-1">
          {ERAS.map((era, idx) => (
            <Button
              key={era.id}
              variant="secondary"
              size="sm"
              onClick={() => onEraJump(idx)}
              className="h-7 text-[10px]"
              style={{
                borderColor: `${era.accent}30`,
                color: era.accent,
              }}
            >
              {ln(era)}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* 文明图例 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">文明色</span>
          <Badge variant="outline" className="text-[10px]">
            {Object.keys(CIVILIZATIONS).length} 种
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {Object.entries(CIVILIZATIONS).map(([key, civ]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full border border-background"
                style={{
                  backgroundColor: civ.color,
                  boxShadow: `0 0 3px ${civ.color}80`,
                }}
              />
              <span className="text-[10px] text-foreground/70">{civ.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 移动端用折叠按钮 + 展开面板
  if (isMobile) {
    return (
      <>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setOpen(true)}
          className="absolute left-3 top-16 z-[1000] h-11 gap-1.5 shadow-lg"
        >
          <Layers className="size-4 md:size-4" />
          <span className="text-sm md:text-xs">图层</span>
        </Button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute left-3 top-16 z-[1000] w-64 overflow-hidden rounded-lg border border-border/40 bg-card shadow-2xl"
            >
              {PanelContent}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // 桌面端：固定在右侧
  return (
    <div className="absolute right-3 top-16 z-[1000] w-56 overflow-hidden rounded-lg border border-border/40 bg-card shadow-lg">
      {PanelContent}
    </div>
  );
}

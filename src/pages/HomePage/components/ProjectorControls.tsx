// —— 历史放映机：底部播放控制条 ——
// 包含进度条、播放/暂停、上一/下一时代跳转、速度选择、时代跳转点。

import { Play, Pause, SkipBack, SkipForward, RotateCcw, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ERAS } from '@/data/history-index';
import { SPEED_OPTIONS, formatYear, progressToYear } from './projector-utils';

interface ProjectorControlsProps {
  progress: number;
  currentEraId: string;
  isPlaying: boolean;
  speed: number;
  onProgressChange: (value: number[]) => void;
  onReset: () => void;
  onJumpToEra: (index: number) => void;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function ProjectorControls({
  progress,
  currentEraId,
  isPlaying,
  speed,
  onProgressChange,
  onReset,
  onJumpToEra,
  onTogglePlay,
  onSpeedChange,
}: ProjectorControlsProps) {
  const currentEraIndex = ERAS.findIndex((e) => e.id === currentEraId);

  return (
    <div className="rounded-t-xl border-t border-border bg-card px-3 py-3 md:px-6">
      {/* 进度条 */}
      <div className="mb-3 flex items-center gap-3">
        <span className="w-16 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
          {formatYear(progressToYear(progress))}
        </span>
        <div className="min-w-0 flex-1">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={onProgressChange}
            className="w-full"
          />
        </div>
        <span className="w-16 shrink-0 text-xs tabular-nums text-muted-foreground">
          {formatYear(2026)}
        </span>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            className="h-11 w-11"
            aria-label="重置"
            title="重置"
          >
            <RotateCcw className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const idx = Math.max(0, currentEraIndex - 1);
              onJumpToEra(idx);
            }}
            className="h-11 w-11"
            aria-label="上一时代"
            title="上一时代"
          >
            <SkipBack className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            onClick={onTogglePlay}
            className="h-11 w-11 rounded-full"
            aria-label={isPlaying ? '暂停' : '播放'}
          >
            {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const idx = Math.min(ERAS.length - 1, currentEraIndex + 1);
              onJumpToEra(idx);
            }}
            className="h-11 w-11"
            aria-label="下一时代"
            title="下一时代"
          >
            <SkipForward className="size-4" />
          </Button>
          <Select value={String(speed)} onValueChange={(v) => onSpeedChange(parseFloat(v))}>
            <SelectTrigger className="!h-11 w-16 text-xs">
              <Gauge className="mr-1 size-3" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SPEED_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={String(s.value)} className="text-xs">
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 时代跳转点 */}
      <div className="mt-2 flex justify-between">
        {ERAS.map((era, i) => (
          <button
            key={era.id}
            onClick={() => onJumpToEra(i)}
            className={`flex flex-col items-center gap-1 text-[10px] transition-colors ${
              era.id === currentEraId
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title={`跳转到${era.name}`}
          >
            <span
              className={`size-2 rounded-full ${
                era.id === currentEraId ? '' : 'opacity-50'
              }`}
              style={{ backgroundColor: era.accent }}
            />
            <span className="hidden md:inline">{era.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

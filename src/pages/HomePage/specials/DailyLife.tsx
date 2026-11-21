import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Clock, Utensils, Shirt, Briefcase, Users, Heart, Landmark, Music, BookOpen, AlertTriangle, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DAILY_LIFE_SCENARIOS } from '@/data/daily-life';

interface DailyLifeProps {
  onBack?: () => void;
}

const eras = Array.from(new Set(DAILY_LIFE_SCENARIOS.map((s) => s.era)));

function InfoBlock({
  icon: Icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="flex gap-3 p-4 rounded-lg bg-card/50 border border-border/50"
    >
      <div className="shrink-0 size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground mb-1">{label}</div>
        <div className="text-sm leading-relaxed">{value}</div>
      </div>
    </motion.div>
  );
}

export default function DailyLife({ onBack }: DailyLifeProps) {
  const [selectedEra, setSelectedEra] = useState<string>(eras[0]);
  const [selectedId, setSelectedId] = useState<string | null>(
    DAILY_LIFE_SCENARIOS.find((s) => s.era === eras[0])?.id ?? null,
  );

  const eraScenarios = useMemo(
    () => DAILY_LIFE_SCENARIOS.filter((s) => s.era === selectedEra),
    [selectedEra],
  );

  const current = useMemo(
    () => DAILY_LIFE_SCENARIOS.find((s) => s.id === selectedId) ?? eraScenarios[0],
    [selectedId, eraScenarios],
  );

  function handleEraChange(val: string) {
    setSelectedEra(val);
    const first = DAILY_LIFE_SCENARIOS.find((s) => s.era === val);
    if (first) setSelectedId(first.id);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Home className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              文明日常生活
            </h2>
            <p className="text-sm text-muted-foreground">穿越时空，体验不同时代人们的一天</p>
          </div>
        </div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">选择时代</label>
          <Select value={selectedEra} onValueChange={handleEraChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {eras.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs text-muted-foreground mb-1.5 block">选择身份</label>
          <div className="flex gap-2 flex-wrap">
            {eraScenarios.map((s) => (
              <Button
                key={s.id}
                variant={selectedId === s.id ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setSelectedId(s.id)}
                className="text-xs"
              >
                {s.civilization} · {s.identity}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-5"
        >
          <Card
            className="p-6 md:p-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${current.color}15, transparent 60%)`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 opacity-10"
              style={{ backgroundColor: current.color }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className="px-2.5 py-1 rounded-md text-xs font-semibold text-white"
                  style={{ backgroundColor: current.color }}
                >
                  {current.era}
                </span>
                <span className="text-sm text-muted-foreground">
                  {current.civilization} · {current.eraYear}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                如果你是一个{current.identity}……
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {current.background}
              </p>
            </div>
          </Card>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InfoBlock icon={Shirt} label="穿着打扮" value={current.clothing} delay={0.05} />
            <InfoBlock icon={Utensils} label="饮食" value={current.food} delay={0.1} />
            <InfoBlock icon={Home} label="居住" value={current.housing} delay={0.15} />
            <InfoBlock icon={Briefcase} label="工作" value={current.work} delay={0.2} />
            <InfoBlock icon={Users} label="社会地位" value={current.socialStatus} delay={0.25} />
            <InfoBlock icon={Heart} label="平均寿命" value={current.lifeExpectancy} delay={0.3} />
            <InfoBlock icon={Landmark} label="赋税" value={current.tax} delay={0.35} />
            <InfoBlock icon={Music} label="娱乐" value={current.entertainment} delay={0.4} />
            <InfoBlock icon={BookOpen} label="教育" value={current.education} delay={0.45} />
          </div>

          {/* Risks */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.5 }}
            className="p-5 rounded-lg border border-warning/30 bg-warning/5"
          >
            <div className="flex items-center gap-2 font-semibold text-warning dark:text-warning mb-2">
              <AlertTriangle className="size-5" />
              命运风险
            </div>
            <p className="text-sm leading-relaxed">{current.risks}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

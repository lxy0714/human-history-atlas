import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ChevronRight, MapPin, Users, Calendar, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CITY_HISTORIES } from '@/data/city-history';

interface CityRiseFallProps {
  onBack?: () => void;
}

export default function CityRiseFall({ onBack }: CityRiseFallProps) {
  const [cityId, setCityId] = useState<string>(CITY_HISTORIES[0].id);

  const city = useMemo(
    () => CITY_HISTORIES.find((c) => c.id === cityId) ?? CITY_HISTORIES[0],
    [cityId],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Building2 className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              城市兴衰史
            </h2>
            <p className="text-sm text-muted-foreground">
              一座城，一部史——看千年名城的起落沉浮
            </p>
          </div>
        </div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      {/* City selector */}
      <div className="w-full md:max-w-sm">
        <label className="text-xs text-muted-foreground mb-1.5 block">选择城市</label>
        <Select value={cityId} onValueChange={setCityId}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CITY_HISTORIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {city && (
        <motion.div
          key={city.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-5"
        >
          {/* City header */}
          <Card
            className="p-6 md:p-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${city.color}15, transparent 65%)`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full -mr-40 -mt-40 opacity-10"
              style={{ backgroundColor: city.color }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: city.color }}
                />
                <span className="text-sm text-muted-foreground">{city.region}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">{city.name}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {city.summary}
              </p>
            </div>
          </Card>

          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute left-[15px] top-2 bottom-2 w-0.5"
              style={{
                background: `linear-gradient(to bottom, ${city.color}, ${city.color}30)`,
              }}
            />

            <div className="space-y-5">
              {city.periods.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="relative pl-12"
                >
                  <div
                    className="absolute left-0 top-1.5 size-[30px] rounded-full flex items-center justify-center border-2 bg-background"
                    style={{ borderColor: city.color }}
                  >
                    <div
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: city.color }}
                    />
                  </div>

                  <Card className="p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-serif text-lg font-semibold">{p.period}</h4>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${city.color}20`,
                          color: city.color,
                        }}
                      >
                        {p.year}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="size-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">人口：</span>
                        <span className="font-medium">{p.population}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="size-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">地位：</span>
                        <span className="font-medium">{p.status}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border/50">
                      <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        标志性事件
                      </div>
                      <ul className="space-y-1.5">
                        {p.events.map((e, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="size-4 text-primary shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

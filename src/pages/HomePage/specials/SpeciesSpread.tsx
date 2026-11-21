import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight, ArrowLeft, Globe, Skull, Wheat, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SpeciesSpreadProps {
  onBack?: () => void;
}

interface SpeciesItem {
  name: string;
  icon: string;
  impact: string;
  category: string;
}

const FROM_AMERICA: SpeciesItem[] = [
  { name: '玉米', icon: '', impact: '传入中国后支撑了明清人口爆炸，成为第三世界主粮之一', category: '粮食' },
  { name: '马铃薯（土豆）', icon: '', impact: '支撑普鲁士和爱尔兰人口增长；1845年晚疫病导致爱尔兰大饥荒，百万人死亡', category: '粮食' },
  { name: '甘薯（红薯）', icon: '', impact: '明清时期传入中国，在贫瘠山地也能种植，缓解饥荒', category: '粮食' },
  { name: '番茄', icon: '', impact: '改变了整个意大利菜和地中海菜系，16世纪传入欧洲', category: '蔬菜' },
  { name: '辣椒', icon: '', impact: '彻底改变川菜、湘菜、泰国菜、印度菜，明代末年传入中国', category: '香辛料' },
  { name: '花生', icon: '', impact: '优质油料和蛋白来源，在非洲和亚洲广泛种植', category: '油料' },
  { name: '可可 / 巧克力', icon: '', impact: '阿兹特克贵族饮品，传入欧洲后成为全球流行的甜食', category: '饮品' },
  { name: '香草', icon: '', impact: '世界第二贵的香料（仅次于藏红花），原产墨西哥', category: '香辛料' },
  { name: '烟草', icon: '', impact: '从美洲传遍世界，成为全球公共卫生问题，同时也是重要经济作物', category: '嗜好品' },
  { name: '橡胶', icon: '', impact: '工业革命的命脉——没有橡胶就没有轮胎、没有电线绝缘、没有现代工业', category: '工业原料' },
  { name: '火鸡', icon: '', impact: '北美原产的大型家禽，现在是欧美感恩节的传统食物', category: '畜禽' },
  { name: '奎宁', icon: '', impact: '从金鸡纳树皮提取，治疗疟疾的特效药，使欧洲人殖民非洲成为可能', category: '药物' },
];

const TO_AMERICA: SpeciesItem[] = [
  { name: '小麦', icon: '', impact: '旧大陆最重要的粮食作物，传入美洲后成为北美主粮', category: '粮食' },
  { name: '水稻', icon: '', impact: '亚洲传入，在美国南部和拉美广泛种植', category: '粮食' },
  { name: '甘蔗', icon: '', impact: '热带种植园经济的核心，催生了大西洋奴隶贸易，约1200万非洲人被贩运', category: '经济作物' },
  { name: '葡萄', icon: '', impact: '西班牙传教士带入美洲，加州和智利现在是重要葡萄酒产区', category: '水果' },
  { name: '橄榄', icon: '', impact: '地中海饮食的标志，传入南美后智利、阿根廷、秘鲁都有种植', category: '油料' },
  { name: '马', icon: '', impact: '彻底改变了大平原印第安人的生活方式——从步行狩猎变为骑猎野牛', category: '畜禽' },
  { name: '牛', icon: '', impact: '南美潘帕斯草原发展起大规模牧牛业，阿根廷成为世界牛肉出口大国', category: '畜禽' },
  { name: '猪', icon: '', impact: '在美洲迅速繁衍，成为重要的肉食来源', category: '畜禽' },
  { name: '羊', icon: '', impact: '绵羊和山羊的引入，使羊毛产业在南美和北美发展起来', category: '畜禽' },
  { name: '鸡', icon: '', impact: '现在美国是世界第二大鸡肉生产国', category: '畜禽' },
  { name: '蜜蜂', icon: '', impact: '欧洲蜜蜂传入美洲，对农业授粉至关重要，被称为"人类最驯养的昆虫"', category: '昆虫' },
];

const TIMELINE_EVENTS = [
  { year: '1492', event: '哥伦布首次抵达美洲，哥伦布大交换开始', side: 'start' },
  { year: '16世纪中期', event: '玉米经西班牙人、葡萄牙人传入中国（1531年有记载）', side: 'right' },
  { year: '1580年代', event: '马铃薯传入西班牙，后逐渐传遍欧洲', side: 'left' },
  { year: '17世纪', event: '辣椒传入中国湖南、四川等地，逐渐形成地方菜系特色', side: 'right' },
  { year: '18世纪', event: '马铃薯成为普鲁士主食，支撑腓特烈大帝时期人口翻倍', side: 'left' },
  { year: '1845-1849', event: '爱尔兰马铃薯晚疫病大饥荒，百万人死亡、百万人移民美国', side: 'left' },
  { year: '19世纪', event: '橡胶工业兴起，亚马逊橡胶繁荣，后种子被走私到东南亚', side: 'right' },
  { year: '20世纪', event: '全球农业贸易体系建立，物种交换常态化', side: 'start' },
];

export default function SpeciesSpread({ onBack }: SpeciesSpreadProps) {
  const [activeTab, setActiveTab] = useState<'america' | 'eurasia' | 'disease' | 'timeline'>(
    'america',
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Leaf className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              作物与物种传播
            </h2>
            <p className="text-sm text-muted-foreground">
              哥伦布大交换——改变世界的物种双向流动
            </p>
          </div>
        </div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      {/* Visual overview */}
      <Card className="p-6 md:p-8 bg-gradient-to-br from-amber-500/10 via-transparent to-green-500/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center p-4 rounded-lg bg-card/80 border border-border/60">
            <Globe className="size-10 mx-auto mb-2 text-warning" />
            <h3 className="font-serif text-lg font-bold mb-1">旧大陆</h3>
            <p className="text-xs text-muted-foreground mb-2">欧亚非 · 1492年前</p>
            <p className="text-sm leading-relaxed">
              小麦、水稻、马、牛、羊、猪、鸡、蜜蜂……
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-primary">
              <ArrowRight className="size-5" />
              <span className="text-sm font-medium">从美洲传出</span>
            </div>
            <div className="text-2xl"></div>
            <div className="h-px w-full bg-border/50 my-2" />
            <div className="text-2xl"></div>
            <div className="flex items-center gap-2 text-secondary-foreground">
              <ArrowLeft className="size-5" />
              <span className="text-sm font-medium">传入美洲</span>
            </div>
          </div>

          <div className="text-center p-4 rounded-lg bg-card/80 border border-border/60">
            <Globe className="size-10 mx-auto mb-2 text-green-600" />
            <h3 className="font-serif text-lg font-bold mb-1">新大陆</h3>
            <p className="text-xs text-muted-foreground mb-2">美洲 · 1492年前</p>
            <p className="text-sm leading-relaxed">
              玉米、土豆、番茄、辣椒、可可、烟草、橡胶……
            </p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeTab === 'america' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('america')}
        >
           从美洲传出
        </Button>
        <Button
          variant={activeTab === 'eurasia' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('eurasia')}
        >
           传入美洲
        </Button>
        <Button
          variant={activeTab === 'disease' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('disease')}
        >
          疾病与奴隶贸易
        </Button>
        <Button
          variant={activeTab === 'timeline' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('timeline')}
        >
           时间线
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'america' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {FROM_AMERICA.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
            >
              <Card className="p-4 h-full hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.impact}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'eurasia' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {TO_AMERICA.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
            >
              <Card className="p-4 h-full hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.impact}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'disease' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <Card className="p-6 border-red-500/30 bg-red-500/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                <Skull className="size-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">最惨痛的交换：疾病与人口崩溃</h3>
                <p className="text-sm text-muted-foreground">
                  旧大陆的病菌几乎毁灭了整个美洲原住民文明
                </p>
              </div>
            </div>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-red-600 dark:text-red-400">天花、麻疹、流感、百日咳、猩红热、伤寒、鼠疫……</strong>
                这些旧大陆疾病随着欧洲人的到来席卷美洲。美洲原住民在数万年的独立演化中对这些疾病没有免疫力。
              </p>
              <p>
                据估计，<strong>约90%的美洲原住民死于旧大陆传染病</strong>，总数可能高达
                <strong>5000万至1亿人</strong>。阿兹特克、印加等帝国在西班牙征服前人口已经因传染病大幅减少。
              </p>
              <p>
                人口骤降导致大量土地荒芜，反过来又吸引了更多欧洲移民。历史学家称之为"人口殖民"先于"土地殖民"。
              </p>
            </div>
          </Card>

          <Card className="p-6 border-warning/30 bg-warning/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-full bg-warning/20 text-warning flex items-center justify-center">
                <Globe className="size-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">大西洋奴隶贸易</h3>
                <p className="text-sm text-muted-foreground">
                  因美洲劳动力短缺而兴起的人口贩卖
                </p>
              </div>
            </div>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                由于原住民大量死亡，美洲种植园和矿山严重缺乏劳动力。欧洲殖民者于是从非洲大量贩运黑奴到美洲。
              </p>
              <p>
                据估计，16-19世纪期间，约有 <strong>1200万非洲人</strong> 被强行贩运到大西洋彼岸，
                其中约 <strong>150-200万人</strong> 死于途中（"中段航程"）。
              </p>
              <p>
                奴隶贸易深刻改变了美洲的人口结构和种族格局，也为工业革命积累了原始资本，其影响延续至今。
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'timeline' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="font-serif text-lg font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              物种传播大事记
            </h3>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
              <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border md:hidden" />

              <div className="space-y-5">
                {TIMELINE_EVENTS.map((ev, idx) => {
                  const isLeft = ev.side === 'left';
                  const isRight = ev.side === 'right';
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                      className={`relative md:grid md:grid-cols-2 md:gap-8 md:items-center ${
                        isRight ? 'md:[&>*:first-child]:order-2' : ''
                      }`}
                    >
                      <div className="pl-10 md:pl-0 md:text-right">
                        {ev.side !== 'right' ? (
                          <Card className="p-3 inline-block">
                            <div className="text-xs font-semibold text-primary mb-1">
                              {ev.year}
                            </div>
                            <p className="text-sm leading-relaxed">{ev.event}</p>
                          </Card>
                        ) : (
                          <div />
                        )}
                      </div>
                      <div className="hidden md:flex justify-center">
                        <div className="size-4 rounded-full bg-primary ring-4 ring-primary/20" />
                      </div>
                      <div className="pl-10 md:pl-0 md:hidden absolute top-0 left-0 w-full">
                        {isRight && (
                          <Card className="p-3 inline-block">
                            <div className="text-xs font-semibold text-primary mb-1">
                              {ev.year}
                            </div>
                            <p className="text-sm leading-relaxed">{ev.event}</p>
                          </Card>
                        )}
                      </div>
                      <div className="hidden md:block">
                        {isRight && (
                          <Card className="p-3 inline-block">
                            <div className="text-xs font-semibold text-primary mb-1">
                              {ev.year}
                            </div>
                            <p className="text-sm leading-relaxed">{ev.event}</p>
                          </Card>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

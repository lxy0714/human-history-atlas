import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Footprints, Train, Car, Plane, Rocket, Zap, Clock, Smartphone, CircleDot } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface CommTransportProps {
  onBack?: () => void;
}

interface SpeedItem {
  name: string;
  era: string;
  speed: number; // 单位取决于 category
  unit: string;
  displayValue: string;
  description: string;
  icon: React.ElementType;
  color: string;
  year: string;
}

const INFO_SPEED: SpeedItem[] = [
  {
    name: '步行驿使',
    era: '古代',
    speed: 50,
    unit: 'km/天',
    displayValue: '约20天',
    description: '古代步行送信，每天约走50公里，1000公里需要20天左右。中国古代驿站靠步行和人力接力传递文书。',
    icon: Footprints,
    color: '#8b7355',
    year: '古代',
  },
  {
    name: '罗马帝国驿道',
    era: '古罗马',
    speed: 100,
    unit: 'km/天',
    displayValue: '约8-10天',
    description: '罗马帝国 cursus publicus 公共驿道系统，马车换马每天行进约80-125公里，是古代最发达的邮驿系统之一。',
    icon: Train,
    color: '#b87333',
    year: '前1世纪',
  },
  {
    name: '蒙古急递铺',
    era: '蒙古帝国',
    speed: 200,
    unit: 'km/天',
    displayValue: '约4-5天',
    description: '蒙古帝国的 yam（站赤）急递铺系统，骑马接力日夜兼程，紧急公文每天可达200-300公里。',
    icon: CircleDot,
    color: '#e67e22',
    year: '13世纪',
  },
  {
    name: '信鸽',
    era: '古代至近代',
    speed: 480,
    unit: 'km/天',
    displayValue: '约2天',
    description: '信鸽飞行速度约60-80km/h，一天可飞数百公里。从古埃及、古罗马到一战二战都被广泛用于军事通信。',
    icon: Radio,
    color: '#3498db',
    year: '自古已有',
  },
  {
    name: '电报',
    era: '19世纪',
    speed: 50000,
    unit: 'km/秒',
    displayValue: '几分钟',
    description: '1844年莫尔斯发出第一封电报"上帝创造了何等奇迹"，电信号以接近光速沿导线传播，通信第一次突破地理限制。',
    icon: Zap,
    color: '#f1c40f',
    year: '1844',
  },
  {
    name: '电话',
    era: '19世纪末',
    speed: 299792,
    unit: 'km/秒',
    displayValue: '实时',
    description: '1876年贝尔发明电话，声音转化为电信号通过铜线实时传输，人类第一次实现远程实时语音对话。',
    icon: Smartphone,
    color: '#e74c3c',
    year: '1876',
  },
  {
    name: '无线电',
    era: '19世纪末',
    speed: 299792,
    unit: 'km/秒',
    displayValue: '实时',
    description: '1895年马可尼发明无线电报，电磁波以光速传播，不再需要导线连接。1901年首次跨大西洋无线电通信成功。',
    icon: Radio,
    color: '#9b59b6',
    year: '1895',
  },
  {
    name: '互联网/光纤',
    era: '当代',
    speed: 200000,
    unit: 'km/秒',
    displayValue: '毫秒级',
    description: '光纤中光信号以约20万公里/秒传播（比真空光速慢约30%），互联网让1000公里的延迟不到10毫秒。',
    icon: Rocket,
    color: '#2ecc71',
    year: '1983至今',
  },
];

const TRANSPORT_SPEED: SpeedItem[] = [
  {
    name: '步行',
    era: '人类天然能力',
    speed: 5,
    unit: 'km/h',
    displayValue: '5 km/h',
    description: '人类正常步行速度约每小时5公里。长途行走每天可走30-50公里。',
    icon: Footprints,
    color: '#8b7355',
    year: '史前',
  },
  {
    name: '骑马',
    era: '古代',
    speed: 40,
    unit: 'km/h',
    displayValue: '40 km/h',
    description: '马的奔跑速度可达每小时40公里左右，驿站换马每天能行进上百公里。彻底改变了古代交通速度。',
    icon: CircleDot,
    color: '#e67e22',
    year: '约前3500',
  },
  {
    name: '蒸汽火车',
    era: '工业革命',
    speed: 50,
    unit: 'km/h',
    displayValue: '50 km/h',
    description: '1825年斯蒂芬森"旅行者号"蒸汽机车商业运营。19世纪中后期特快列车时速可达100公里以上。',
    icon: Train,
    color: '#7f8c8d',
    year: '1825',
  },
  {
    name: '汽车',
    era: '20世纪',
    speed: 100,
    unit: 'km/h',
    displayValue: '100 km/h',
    description: '1886年奔驰发明第一辆汽车。高速公路普及后，现代高速公路时速通常可达100-120公里。',
    icon: Car,
    color: '#e74c3c',
    year: '1886',
  },
  {
    name: '螺旋桨飞机',
    era: '20世纪上半叶',
    speed: 300,
    unit: 'km/h',
    displayValue: '300 km/h',
    description: '1903年莱特兄弟首飞仅12秒、36米。到二战时期，螺旋桨战斗机时速已超过600公里。',
    icon: Plane,
    color: '#3498db',
    year: '1903',
  },
  {
    name: '喷气客机',
    era: '20世纪下半叶',
    speed: 900,
    unit: 'km/h',
    displayValue: '900 km/h',
    description: '1958年波音707投入商业运营，喷气式客机巡航速度约900km/h，使洲际旅行从"周"变成"小时"。',
    icon: Plane,
    color: '#9b59b6',
    year: '1958',
  },
  {
    name: '协和客机',
    era: '1976-2003',
    speed: 2180,
    unit: 'km/h',
    displayValue: '2180 km/h (2马赫)',
    description: '英法联合研制的超音速客机，巡航速度2马赫（约2180km/h）。纽约到伦敦仅需3.5小时，比普通客机快一半以上。',
    icon: Rocket,
    color: '#e67e22',
    year: '1976-2003',
  },
  {
    name: '国际空间站',
    era: '当代',
    speed: 28000,
    unit: 'km/h',
    displayValue: '28000 km/h',
    description: 'ISS 在距地约400公里的轨道上以约7.8km/s的速度运行，约每90分钟绕地球一圈，每天能看16次日出。',
    icon: Rocket,
    color: '#2ecc71',
    year: '1998至今',
  },
];

function SpeedBars({ items, isLog }: { items: SpeedItem[]; isLog?: boolean }) {
  const maxSpeed = items[items.length - 1].speed;
  const minSpeed = items[0].speed;

  function getWidth(speed: number) {
    if (isLog) {
      // 对数尺度
      const logMin = Math.log10(minSpeed);
      const logMax = Math.log10(maxSpeed);
      const logVal = Math.log10(speed);
      return ((logVal - logMin) / (logMax - logMin)) * 100;
    }
    return (speed / maxSpeed) * 100;
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-1.5">
              <div
                className="size-8 rounded-md flex items-center justify-center shrink-0 text-white"
                style={{ backgroundColor: item.color }}
              >
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium text-sm truncate">{item.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                    {item.displayValue}
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-11 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getWidth(item.speed)}%` }}
                transition={{ duration: 0.8, delay: idx * 0.06 }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
            <div className="ml-11 mt-1 text-xs text-muted-foreground flex items-center justify-between">
              <span>{item.era}</span>
              <span>{item.year}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function InfoDetail({ items }: { items: SpeedItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="p-4 rounded-lg border border-border/50 bg-card/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="size-9 rounded-md flex items-center justify-center text-white"
                style={{ backgroundColor: item.color }}
              >
                <Icon className="size-4.5" />
              </div>
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.era} · {item.year}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function CommTransport({ onBack }: CommTransportProps) {
  const [tab, setTab] = useState<'info' | 'transport'>('info');

  const items = tab === 'info' ? INFO_SPEED : TRANSPORT_SPEED;
  const isLog = tab === 'info';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Radio className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              通信与交通史
            </h2>
            <p className="text-sm text-muted-foreground">
              从步行驿使到光纤互联网——人类信息与移动速度的飞跃
            </p>
          </div>
        </div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as 'info' | 'transport')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info"> 信息传播速度</TabsTrigger>
          <TabsTrigger value="transport"> 交通速度演进</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-4">
          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold">
                {tab === 'info' ? '一条1000公里的信息需要走多久？' : '人类移动速度的极限在哪里？'}
              </h3>
              <span className="text-xs text-muted-foreground">
                {isLog ? '对数尺度' : '线性尺度'}
              </span>
            </div>
            <SpeedBars items={items} isLog={isLog} />
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="font-serif text-lg font-semibold mb-1">详细说明</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {tab === 'info'
                ? '从20天到毫秒，信息传播速度在过去200年里提升了百万倍，这是人类文明加速发展的根本原因之一。'
                : '从每小时5公里到每小时28000公里，人类用六千年把自身移动速度提升了五千多倍。'}
            </p>
            <InfoDetail items={items} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skull, Heart, Stethoscope, Droplets, Pill, Syringe, AlertTriangle, Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PlagueHistoryProps {
  onBack?: () => void;
}

interface PlagueRecord {
  name: string;
  year: string;
  deaths: number; // 死亡人数（万）
  deathsDisplay: string;
  place: string;
  cause: string;
  color: string;
  description: string;
  impact: string;
}

const PLAGUES: PlagueRecord[] = [
  {
    name: '查士丁尼大瘟疫',
    year: '541-542',
    deaths: 2500,
    deathsDisplay: '约2500万',
    place: '拜占庭帝国 / 地中海',
    cause: '鼠疫（耶尔森氏菌）',
    color: '#8e44ad',
    description: '第一次鼠疫大流行。起源于埃及，经贸易路线传到君士坦丁堡。据记载，高峰期君士坦丁堡每天死亡5000-10000人。',
    impact: '东罗马帝国人口减少约1/3，查士丁尼大帝收复失地的努力化为泡影，地中海贸易受到毁灭性打击，欧洲进入黑暗时代的诱因之一。',
  },
  {
    name: '黑死病',
    year: '1347-1351',
    deaths: 7500,
    deathsDisplay: '约7500万-2亿',
    place: '欧洲 / 亚洲 / 北非',
    cause: '鼠疫（耶尔森氏菌）',
    color: '#2c3e50',
    description: '第二次鼠疫大流行。经丝绸之路和商船从亚洲传入欧洲，短短4年间使欧洲人口减少30-60%。',
    impact: '深刻改变了欧洲的社会结构——劳动力短缺使农奴地位上升、封建制动摇；人们对教会权威产生怀疑；催生了医学和公共卫生的萌芽（隔离检疫制度）。',
  },
  {
    name: '美洲传染病浩劫',
    year: '1492-1600',
    deaths: 5000,
    deathsDisplay: '约5000万-1亿',
    place: '美洲大陆',
    cause: '天花、麻疹、流感等多种旧大陆疾病',
    color: '#c0392b',
    description: '哥伦布大交换中最惨痛的后果。美洲原住民对旧大陆的传染病没有任何免疫力，90%以上的人口死于疾病。',
    impact: '阿兹特克和印加帝国在西班牙征服前已经因传染病人口锐减。人口崩溃导致土地荒芜，为欧洲殖民者提供了广阔空间，也催生了黑奴贸易。',
  },
  {
    name: '明末大瘟疫',
    year: '1633-1644',
    deaths: 1000,
    deathsDisplay: '约1000万',
    place: '中国华北',
    cause: '鼠疫（可能为肺鼠疫）',
    color: '#d35400',
    description: '明朝末年华北地区鼠疫大流行。"街坊间小儿为之绝影，有棺、无棺，九门计数已二十余万"（《崇祯实录》）。',
    impact: '华北人口大减，明朝军事和经济崩溃。1644年李自成攻入北京时，北京守军已因瘟疫大量减员。被认为是明朝灭亡的重要因素之一。',
  },
  {
    name: '伦敦大瘟疫',
    year: '1665-1666',
    deaths: 100,
    deathsDisplay: '约10万',
    place: '英国伦敦',
    cause: '鼠疫',
    color: '#e74c3c',
    description: '第二次鼠疫大流行的尾声。伦敦约1/6人口死亡。家家户户门口用粉笔画十字标记有瘟疫，病人家门被钉死。',
    impact: '牛顿因瘟疫避居乡间，期间发明了微积分、光学和万有引力——这一年被称为他的"奇迹年"。1666年伦敦大火后城市重建，卫生条件大大改善。',
  },
  {
    name: '第三次鼠疫大流行',
    year: '1855-1960',
    deaths: 1500,
    deathsDisplay: '约1500万+',
    place: '全球（起源云南）',
    cause: '鼠疫',
    color: '#d4ac0d',
    description: '起源于中国云南，传至香港、印度后蔓延到全球六大洲的77个港口。1894年法国医生耶尔森在香港发现鼠疫杆菌。',
    impact: '人类首次确认了鼠疫的病原体（耶尔森氏菌）和传播途径（跳蚤），推动了现代流行病学的建立。印度死亡人数最多（约1000万）。',
  },
  {
    name: '1918年大流感',
    year: '1918-1920',
    deaths: 5000,
    deathsDisplay: '约5000万-1亿',
    place: '全球',
    cause: '甲型H1N1流感病毒',
    color: '#e67e22',
    description: '又称"西班牙流感"。感染了全球约1/3人口（约5亿人），死亡人数可能超过第一次世界大战。特殊之处是大量健康年轻人死亡。',
    impact: '加速了一战的结束（各国军队都受重创）。公共卫生体系大大加强，口罩广泛使用。推动了病毒学和免疫学的发展。',
  },
  {
    name: '艾滋病大流行',
    year: '1981至今',
    deaths: 4000,
    deathsDisplay: '约4000万+',
    place: '全球（重灾区撒哈拉以南非洲）',
    cause: 'HIV病毒',
    color: '#c0392b',
    description: '1981年美国首次报告艾滋病病例。90年代是高峰期，曾是"世纪绝症"。非洲南部国家感染率高达20-30%。',
    impact: '深刻改变了全球公共卫生格局。抗逆转录病毒药物（"鸡尾酒疗法"）使艾滋病从绝症变为慢性病。促进了性教育、安全套推广和全球卫生合作机制。',
  },
  {
    name: 'COVID-19 新冠疫情',
    year: '2019至今',
    deaths: 700,
    deathsDisplay: '约700万+（官方统计）',
    place: '全球',
    cause: 'SARS-CoV-2 新冠病毒',
    color: '#27ae60',
    description: '2019年底武汉首次报告，2020年3月WHO宣布全球大流行。传播力极强、变异毒株层出不穷。疫苗研发速度创纪录。',
    impact: '全球经济深度衰退，供应链断裂。远程办公、线上教育成为常态。mRNA疫苗技术一战成名，可能开启生物医药新时代。深刻改变了人们的生活方式。',
  },
];

const PUBLIC_HEALTH_PROGRESS = [
  { era: '古代', item: '隔离思想', desc: '《圣经》中已有麻风病隔离的记载；中国古代对瘟疫也有隔离措施。' },
  { era: '14世纪', item: '隔离检疫制度', desc: '威尼斯首创"40天检疫"（quarantine来自意大利语quaranta giorni=40天），来自疫区的船只需在港外锚泊40天。' },
  { era: '18世纪末', item: '牛痘接种', desc: '詹纳发明牛痘接种预防天花（1796年），是人类第一个疫苗，开启了免疫学时代。' },
  { era: '19世纪', item: '细菌学说', desc: '巴斯德、科赫建立细菌致病学说，确立了"病菌导致疾病"的科学理论，卫生革命开始。' },
  { era: '19世纪', item: '公共卫生体系', desc: '查德威克《劳动人口卫生状况报告》（1842）推动英国公共卫生改革，下水道、自来水、城市规划改善。' },
  { era: '19世纪末', item: '发现病原体', desc: '陆续发现结核（1882）、霍乱弧菌（1883）、鼠疫杆菌（1894）等，传染病不再神秘。' },
  { era: '20世纪', item: '抗生素', desc: '1928年弗莱明发现青霉素，1940年代量产，细菌性疾病死亡率大幅下降。' },
  { era: '20世纪', item: '疫苗黄金时代', desc: '脊灰疫苗、麻疹疫苗、乙肝疫苗等陆续出现，多种烈性传染病被控制甚至消灭（天花1980年宣布消灭）。' },
  { era: '21世纪', item: 'mRNA疫苗', desc: '新冠mRNA疫苗研发速度创纪录，这种技术未来可能用于癌症、艾滋病等多种疾病。' },
];

export default function PlagueHistory({ onBack }: PlagueHistoryProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'comparison' | 'progress'>(
    'timeline',
  );

  const maxDeaths = Math.max(...PLAGUES.map((p) => p.deaths));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center">
            <Skull className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              瘟疫史
            </h2>
            <p className="text-sm text-muted-foreground">
              疾病如何塑造人类历史——以及我们如何反击
            </p>
          </div>
        </div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeTab === 'timeline' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('timeline')}
        >
           瘟疫时间线
        </Button>
        <Button
          variant={activeTab === 'comparison' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('comparison')}
        >
           死亡人数对比
        </Button>
        <Button
          variant={activeTab === 'progress' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('progress')}
        >
           公共卫生进步
        </Button>
      </div>

      {/* Timeline */}
      {activeTab === 'timeline' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {PLAGUES.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <Card className="p-5 hover:shadow-md transition-shadow overflow-hidden relative">
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: p.color }}
                />
                <div className="pl-3">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h3 className="font-serif text-lg font-bold">{p.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {p.year}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">死亡：</span>
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        {p.deathsDisplay}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">病因：</span>
                      <span className="font-medium">{p.cause}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">区域：</span>
                      <span className="font-medium">{p.place}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {p.description}
                  </p>

                  <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <div className="text-xs font-semibold text-warning dark:text-warning mb-1 flex items-center gap-1.5">
                      <Heart className="size-3.5" />
                      历史影响
                    </div>
                    <p className="text-sm leading-relaxed">{p.impact}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Comparison */}
      {activeTab === 'comparison' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-5 md:p-6">
            <h3 className="font-serif text-lg font-semibold mb-4">大瘟疫死亡人数对比</h3>
            <p className="text-sm text-muted-foreground mb-6">
              数字越大代表死亡人数越多。注：历史死亡数字为学界估算，不同来源可能有很大差异。
            </p>

            <div className="space-y-3">
              {[...PLAGUES]
                .sort((a, b) => b.deaths - a.deaths)
                .map((p, idx) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-4 text-xs text-muted-foreground tabular-nums">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-sm flex-1 truncate">{p.name}</span>
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400 tabular-nums shrink-0">
                        {p.deathsDisplay}
                      </span>
                    </div>
                    <div className="ml-6 h-6 rounded-md bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(p.deaths / maxDeaths) * 100}%` }}
                        transition={{ duration: 0.9, delay: idx * 0.08 }}
                        className="h-full rounded-md flex items-center justify-end pr-2"
                        style={{ backgroundColor: p.color }}
                      />
                    </div>
                    <div className="ml-6 text-xs text-muted-foreground mt-0.5">
                      {p.year}
                    </div>
                  </motion.div>
                ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Progress */}
      {activeTab === 'progress' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-5 md:p-6">
            <h3 className="font-serif text-lg font-semibold mb-2 flex items-center gap-2">
              <Pill className="size-5 text-green-500" />
              公共卫生的进步
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              从"神罚"到"细菌学说"再到"基因疗法"——人类一步步学会理解和对抗疾病
            </p>

            <div className="relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-red-500/40 via-amber-500/40 to-green-500/40" />

              <div className="space-y-5">
                {PUBLIC_HEALTH_PROGRESS.map((item, idx) => (
                  <motion.div
                    key={item.item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.06 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-0 top-1 size-10 rounded-full bg-card border-2 border-green-500/40 flex items-center justify-center">
                      {idx < 2 ? (
                        <Droplets className="size-4 text-red-500" />
                      ) : idx < 5 ? (
                        <Stethoscope className="size-4 text-warning" />
                      ) : idx < 7 ? (
                        <Pill className="size-4 text-green-500" />
                      ) : (
                        <Syringe className="size-4 text-green-500" />
                      )}
                    </div>
                    <div className="p-3 rounded-lg bg-card/60 border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-primary">{item.era}</span>
                        <span className="font-medium">{item.item}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <p className="text-sm leading-relaxed">
                <span className="font-semibold text-green-600 dark:text-green-400">好消息是：</span>
                人类的预期寿命从1900年的约31岁增长到了今天的约73岁，增长了一倍多。
                绝大多数历史上的致命传染病都已被控制。然而，新的挑战（新冠、抗生素耐药性、未来可能的新病毒）
                仍在考验着人类的智慧与合作。
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

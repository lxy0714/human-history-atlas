import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Scale, Bookmark, Filter, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LegalHistoryProps {
  onBack?: () => void;
}

interface LawMilestone {
  id: string;
  name: string;
  year: string;
  yearNum: number; // 用于排序
  region: 'china' | 'western' | 'international';
  regionLabel: string;
  color: string;
  description: string;
  significance: string;
}

const MILESTONES: LawMilestone[] = [
  {
    id: 'hammurabi',
    name: '汉谟拉比法典',
    year: '约前1754年',
    yearNum: -1754,
    region: 'western',
    regionLabel: '两河流域',
    color: '#d4ac0d',
    description:
      '古巴比伦国王汉谟拉比颁布，刻在黑色玄武岩石柱上，共282条。包括诉讼、财产、婚姻家庭、损害赔偿等各方面。',
    significance:
      '人类历史上最早的比较完整的成文法典之一。"以眼还眼、以牙还牙"的同态复仇原则，对后世法律影响深远。',
  },
  {
    id: 'twelve-tables',
    name: '十二铜表法',
    year: '前450年',
    yearNum: -450,
    region: 'western',
    regionLabel: '古罗马',
    color: '#b87333',
    description:
      '罗马共和国时期，贵族和平民斗争的产物，将法律刻在12块铜表上公之于众。内容包括传唤、审判、债务、家庭、继承等。',
    significance:
      '罗马法的起点，打破了贵族对法律知识的垄断。成文法的公开使法律不再是祭司阶层的秘密，是法治精神的重要源头。',
  },
  {
    id: 'tang-code',
    name: '唐律疏议',
    year: '653年',
    yearNum: 653,
    region: 'china',
    regionLabel: '中国唐朝',
    color: '#c0392b',
    description:
      '唐高宗时期，长孙无忌等编撰《永徽律》并逐条疏议（官方解释），共12篇502条。以"德礼为政教之本，刑罚为政教之用"为指导思想。',
    significance:
      '中国古代法律的最高成就，"礼法合一"的典范。影响了整个东亚法律体系，日本、朝鲜、越南的古代法律都以唐律为蓝本。',
  },
  {
    id: 'justinian',
    name: '查士丁尼法典',
    year: '529-534年',
    yearNum: 534,
    region: 'western',
    regionLabel: '拜占庭',
    color: '#3498db',
    description:
      '拜占庭皇帝查士丁尼一世下令编纂，由《法典》《学说汇纂》《法学阶梯》《新律》四部分组成，统称《国法大全》。',
    significance:
      '罗马法的集大成者。11世纪在意大利重新被发现后，催生了罗马法复兴，是后世大陆法系（民法法系）的源头。',
  },
  {
    id: 'song-xingtong',
    name: '宋刑统',
    year: '963年',
    yearNum: 963,
    region: 'china',
    regionLabel: '中国宋朝',
    color: '#e67e22',
    description:
      '宋朝第一部法典，窦仪等编撰。篇目结构基本沿袭唐律，但增加了"敕""令""格""式"等法律形式的内容。',
    significance:
      '中国历史上第一部刊版印行的法典，标志着法律传播方式从手写进入印刷时代。基本确立了"律敕并行"的宋代法律体系。',
  },
  {
    id: 'magna-carta',
    name: '英国大宪章',
    year: '1215年',
    yearNum: 1215,
    region: 'western',
    regionLabel: '英国',
    color: '#27ae60',
    description:
      '英格兰贵族在兰尼米德草地强迫约翰王签署的文件，共63条。核心内容是国王也要遵守法律，未经合法审判不得逮捕自由人。',
    significance:
      '宪政之祖，"王在法下"原则的起点。限制王权、保障权利、法律至上的思想深刻影响了后世，美国宪法和世界人权宣言都可追溯至此。',
  },
  {
    id: 'ming-code',
    name: '大明律',
    year: '1397年',
    yearNum: 1397,
    region: 'china',
    regionLabel: '中国明朝',
    color: '#d4a843',
    description:
      '朱元璋主持制定，历经30年修订完成。以"名例律+六部分篇"的新体例取代了沿用千年的"十二篇"结构。',
    significance:
      '中国古代法典体例的重大变革，以六部为纲的法典结构为清律所继承。"重典治吏"思想突出，对贪官污吏惩罚极重。',
  },
  {
    id: 'bill-of-rights',
    name: '权利法案',
    year: '1689年',
    yearNum: 1689,
    region: 'western',
    regionLabel: '英国',
    color: '#2980b9',
    description:
      '光荣革命后，英国议会通过的限制王权、保障公民权利的法案。确立了议会主权、君主立宪、言论自由、定期选举等原则。',
    significance:
      '英国君主立宪制正式确立的标志，议会权力高于王权。为世界各国的宪政体制提供了最早的蓝本之一。',
  },
  {
    id: 'us-constitution',
    name: '独立宣言 + 美国宪法',
    year: '1776年 / 1787年',
    yearNum: 1776,
    region: 'western',
    regionLabel: '美国',
    color: '#e74c3c',
    description:
      '1776年《独立宣言》宣告"人人生而平等"；1787年宪法是世界第一部成文宪法，确立三权分立、联邦制、违宪审查等制度。',
    significance:
      '成文宪法的开山之作，三权分立理论的首次大规模实践。对全世界的宪政实践产生了深远影响，被许多国家所效仿。',
  },
  {
    id: 'declaration-rights',
    name: '人权宣言',
    year: '1789年',
    yearNum: 1789,
    region: 'western',
    regionLabel: '法国',
    color: '#9b59b6',
    description:
      '法国大革命时期制宪议会通过的纲领性文件，共17条。第一条即"人生而自由，权利平等"，确立了自由、财产、安全、反抗压迫等人权。',
    significance:
      '"自由、平等、博爱"口号的来源，是法国大革命最重要的遗产。人权理念自此传遍世界，成为现代政治文明的核心价值。',
  },
  {
    id: 'napoleonic-code',
    name: '拿破仑法典',
    year: '1804年',
    yearNum: 1804,
    region: 'western',
    regionLabel: '法国',
    color: '#2c3e50',
    description:
      '拿破仑主持制定的《法国民法典》，共3编2281条。确立了私有财产神圣不可侵犯、契约自由、过错责任等基本原则。',
    significance:
      '大陆法系的支柱，世界上影响最大的民法典之一。至今仍在法国适用。全球约150多个国家的民法直接或间接以它为蓝本。',
  },
  {
    id: 'qing-code',
    name: '大清律例',
    year: '1740年',
    yearNum: 1740,
    region: 'china',
    regionLabel: '中国清朝',
    color: '#8e44ad',
    description:
      '乾隆年间最终定型，基本沿用明律体例，但增加了大量条例（"例"）。律例并行，以例破律现象突出。',
    significance:
      '中国最后一部传统法典，是中华法系的最终形态。清末修律（1902-1911）时被现代法律取代，标志着中华法系的解体。',
  },
  {
    id: 'german-civil-code',
    name: '德国民法典',
    year: '1900年',
    yearNum: 1900,
    region: 'western',
    regionLabel: '德国',
    color: '#d35400',
    description:
      '历经20余年起草，1900年生效。采用潘德克顿体系五编制（总则、债法、物法、亲属、继承），概念精密、体系严谨。',
    significance:
      '大陆法系第二部里程碑式的民法典，以体系化、概念化、抽象化著称。对20世纪各国（包括中国）民法典影响巨大。',
  },
  {
    id: 'roc-provisional',
    name: '中华民国临时约法',
    year: '1912年',
    yearNum: 1912,
    region: 'china',
    regionLabel: '中国',
    color: '#16a085',
    description:
      '辛亥革命后南京临时政府颁布，共7章56条。确立了主权在民、三权分立、自由平等、责任内阁等原则。',
    significance:
      '中国历史上第一部资产阶级共和国宪法性文件，是中国宪政运动的重要里程碑。虽然很快被袁世凯撕毁，但民主共和理念已经深入人心。',
  },
  {
    id: 'world-human-rights',
    name: '世界人权宣言',
    year: '1948年',
    yearNum: 1948,
    region: 'international',
    regionLabel: '联合国',
    color: '#2ecc71',
    description:
      '联合国大会通过，埃莉诺·罗斯福主持制定，共30条。系统阐述了人人应当享有的公民、政治、经济、社会和文化权利。',
    significance:
      '人类历史上第一次系统地、全球性地确认了人权标准。虽不具法律约束力，但它是国际人权法的基石，深刻影响了世界各国的宪法和法律。',
  },
  {
    id: 'china-civil-code',
    name: '中华人民共和国民法典',
    year: '2020年',
    yearNum: 2020,
    region: 'china',
    regionLabel: '中国',
    color: '#c0392b',
    description:
      '2020年全国人大通过，2021年实施，共7编1260条。包括总则、物权、合同、人格权、婚姻家庭、继承、侵权责任。',
    significance:
      '新中国第一部以"法典"命名的法律，被称为"社会生活的百科全书"。人格权独立成编是其最大亮点，也是世界民事立法的首创。',
  },
];

const FILTERS = [
  { value: 'all', label: '全部' },
  { value: 'china', label: '中国法系' },
  { value: 'western', label: '西方法系' },
  { value: 'international', label: '国际/世界' },
];

export default function LegalHistory({ onBack }: LegalHistoryProps) {
  const [filter, setFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    const list =
      filter === 'all' ? MILESTONES : MILESTONES.filter((m) => m.region === filter);
    return [...list].sort((a, b) => a.yearNum - b.yearNum);
  }, [filter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Scale className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              法律史时间线
            </h2>
            <p className="text-sm text-muted-foreground">
              从汉谟拉比到民法典——人类规则之治的演进
            </p>
          </div>
        </div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="size-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">筛选：</span>
        {FILTERS.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setFilter(f.value)}
            className="text-xs h-7"
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#c0392b]" />
          <span className="text-muted-foreground">中国法系</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#3498db]" />
          <span className="text-muted-foreground">西方法系</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#2ecc71]" />
          <span className="text-muted-foreground">国际/世界</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-border" />

        <div className="space-y-5">
          {filtered.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative pl-14"
            >
              {/* Dot */}
              <div
                className="absolute left-0 top-3 size-[46px] rounded-full bg-background border-2 flex items-center justify-center"
                style={{ borderColor: m.color }}
              >
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
              </div>

              <Card className="p-5 hover:shadow-md transition-shadow overflow-hidden">
                <div
                  className="absolute left-12 top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: m.color }}
                />

                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-serif text-lg font-bold">{m.name}</h3>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: m.color,
                          color: m.color,
                        }}
                      >
                        {m.regionLabel}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Bookmark className="size-3.5" />
                      {m.year}
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                  {m.description}
                </p>

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                    <Scale className="size-3.5" />
                    历史意义
                  </div>
                  <p className="text-sm leading-relaxed">{m.significance}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <Card className="p-5 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
        <h3 className="font-serif text-lg font-semibold mb-3">两条脉络，殊途同归</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#c0392b]" />
              中华法系
            </div>
            <p className="text-muted-foreground leading-relaxed">
              以儒家伦理为核心，"德主刑辅""礼法合一"。刑法发达，民法相对薄弱。重视家族伦理和等级秩序。
              影响了日本、朝鲜、越南等东亚国家，形成了与西方法系平行的另一套法律传统。
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-semibold flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#3498db]" />
              西方法系
            </div>
            <p className="text-muted-foreground leading-relaxed">
              起源于古希腊和古罗马，经中世纪教会法、近代自然法、启蒙运动发展至今。重视个人权利、契约精神、程序正义。
              分为大陆法系（成文法）和普通法系（判例法）两大分支，是当今世界最主流的法律传统。
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
          20世纪以来，两大法系出现融合趋势。而人权、法治、平等这些价值，越来越成为全人类的共同追求。
          从汉谟拉比的石柱到今天的数字法典，人类始终在寻找更公平、更合理的规则之治。
        </p>
      </Card>
    </div>
  );
}

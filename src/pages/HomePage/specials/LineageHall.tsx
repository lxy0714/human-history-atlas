import { useState, useMemo } from 'react';
import { ArrowLeft, Users, Crown, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { findNodeById } from '@/data/relations';
import { CIVILIZATIONS } from '@/data/history-index';
import { useIsMobile } from '@/hooks/use-mobile';
import type { HistoryState } from '../useHistoryStore';

interface LineageNode {
  id: string;
  relation: string; // 与上一个节点的关系（连线标注）
}

interface LineageData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  nodes: LineageNode[];
}

const LINEAGE_DATA: Record<string, LineageData[]> = {
  philosophy: [
    {
      id: 'confucian',
      title: '儒家道统',
      description: '孔子→曾子→子思→孟子→董仲舒→朱熹→王阳明',
      icon: '',
      color: '#c0392b',
      nodes: [
        { id: 'confucius', relation: '创始人' },
        { id: 'person-mencius', relation: '战国亚圣' },
        { id: 'wang-yangming', relation: '心学集大成' },
      ],
    },
    {
      id: 'greek',
      title: '希腊哲学传承',
      description: '苏格拉底→柏拉图→亚里士多德→亚历山大大帝',
      icon: '',
      color: '#2c3e80',
      nodes: [
        { id: 'person-socrates', relation: '创始人' },
        { id: 'person-plato', relation: '学生' },
        { id: 'person-aristotle', relation: '学生' },
        { id: 'person-alexander', relation: '学生/帝王' },
      ],
    },
    {
      id: 'daoism',
      title: '道家传承',
      description: '老子→庄子→魏晋玄学',
      icon: '',
      color: '#16a085',
      nodes: [
        { id: 'laozi', relation: '创始人' },
        { id: 'person-zhuangzi', relation: '战国传承' },
      ],
    },
  ],
  dynasty: [
    {
      id: 'tang-royal',
      title: '唐皇室世系',
      description: '李渊→李世民→李治→武则天→李隆基',
      icon: '',
      color: '#d4a843',
      nodes: [
        { id: 'tang-dynasty', relation: '李渊建唐' },
        { id: 'person-taizong', relation: '贞观之治' },
        { id: 'person-wuzetian', relation: '女皇时代' },
        { id: 'event-kaiyuan', relation: '开元盛世' },
      ],
    },
    {
      id: 'qing-royal',
      title: '清帝世系（盛清）',
      description: '努尔哈赤→皇太极→顺治→康熙→雍正→乾隆',
      icon: '',
      color: '#e74c3c',
      nodes: [
        { id: 'person-chengjisihan', relation: '蒙古起源' },
        { id: 'qing-dynasty', relation: '清军入关' },
        { id: 'person-kangxi', relation: '康熙大帝' },
        { id: 'event-kangqian', relation: '康乾盛世' },
      ],
    },
    {
      id: 'han-royal',
      title: '汉朝传承',
      description: '刘邦→文景之治→汉武盛世→东汉',
      icon: '',
      color: '#c0392b',
      nodes: [
        { id: 'china-liu-bang', relation: '汉高祖建汉' },
        { id: 'china-wenjing', relation: '文景之治' },
        { id: 'person-hanwudi', relation: '汉武盛世' },
        { id: 'eastern-han', relation: '光武中兴' },
      ],
    },
    {
      id: 'ming-royal',
      title: '明朝传承',
      description: '朱元璋→朱棣→仁宣之治',
      icon: '',
      color: '#e67e22',
      nodes: [
        { id: 'person-zhu-yuanzhang', relation: '明太祖' },
        { id: 'ming-dynasty', relation: '明朝' },
        { id: 'event-zhenghe', relation: '永乐下西洋' },
      ],
    },
  ],
  religion: [
    {
      id: 'zen',
      title: '禅宗传承',
      description: '达摩→慧可→僧璨→道信→弘忍→慧能',
      icon: '',
      color: '#f39c12',
      nodes: [
        { id: 'idea-buddhism-spread', relation: '佛教传入' },
        { id: 'person-xuanzang', relation: '玄奘取经' },
        { id: 'tang-dynasty', relation: '唐代禅兴盛' },
      ],
    },
    {
      id: 'christian',
      title: '基督教传承',
      description: '耶稣→保罗→君士坦丁→东西分裂→宗教改革',
      icon: '',
      color: '#3498db',
      nodes: [
        { id: 'jesus', relation: '创立' },
        { id: 'idea-christianity', relation: '早期传播' },
        { id: 'edict-of-milan', relation: '合法化' },
        { id: 'great-schism', relation: '东西分裂' },
        { id: 'protestant-reformation', relation: '宗教改革' },
      ],
    },
    {
      id: 'islamic',
      title: '伊斯兰哈里发世系',
      description: '穆罕默德→四大哈里发→倭马亚→阿拔斯',
      icon: '',
      color: '#27ae60',
      nodes: [
        { id: 'idea-islam', relation: '穆罕默德创教' },
        { id: 'arab-empire', relation: '阿拉伯帝国' },
        { id: 'abbasid', relation: '阿拔斯王朝' },
        { id: 'ottoman-empire', relation: '奥斯曼帝国' },
      ],
    },
  ],
};

interface LineageHallProps {
  store: HistoryState;
}

export default function LineageHall({ store }: LineageHallProps) {
  const [activeTab, setActiveTab] = useState('philosophy');
  const isMobile = useIsMobile();
  const { scrollToNode } = store;

  const categories = [
    { id: 'philosophy', label: '思想师承', icon: '' },
    { id: 'dynasty', label: '帝王世系', icon: '' },
    { id: 'religion', label: '宗教传承', icon: '' },
  ];

  function handleNodeClick(nodeId: string) {
    scrollToNode(nodeId);
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="text-xs">
              <span className="mr-1">{c.icon}</span>
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {(Object.entries(LINEAGE_DATA) as [string, LineageData[]][]).map(
          ([catId, chains]) => (
            <TabsContent key={catId} value={catId} className="mt-4 space-y-5">
              {chains.map((chain, chainIdx) => (
                <div
                  key={chain.id}
                  className="rounded-xl border border-border/40 bg-card/30 p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xl">{chain.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold">{chain.title}</h3>
                      <p className="text-[11px] text-muted-foreground">
                        {chain.description}
                      </p>
                    </div>
                  </div>

                  {/* 链式图 */}
                  <div className="flex items-start justify-center gap-2 py-2">
                    {chain.nodes.map((node, idx) => {
                      const nd = findNodeById(node.id);
                      if (!nd) return null;
                      const nc = CIVILIZATIONS[nd.civilization]?.color ?? '#888';
                      const isLast = idx === chain.nodes.length - 1;

                      return (
                        <div key={node.id} className="flex items-start gap-2">
                          <div className="flex flex-col items-center">
                            <motion.button
                  type="button"
                              whileHover={{ y: -2, scale: 1.02 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleNodeClick(node.id)}
                              className="group relative flex flex-col items-center"
                            >
                              {/* 头像/首字圆 */}
                              <div
                                className="flex size-12 items-center justify-center rounded-full border-2 font-bold text-white shadow-md transition-all group-hover:shadow-lg"
                                style={{
                                  backgroundColor: nc + '30',
                                  borderColor: nc,
                                  color: nc,
                                }}
                              >
                                <span className="text-sm">
                                  {nd.title.slice(0, 2)}
                                </span>
                              </div>
                              {/* 名称 */}
                              <div className="mt-1.5 max-w-[80px] text-center text-[10px] font-medium text-foreground">
                                {nd.title.length > 6 ? nd.title.slice(0, 5) + '…' : nd.title}
                              </div>
                              <div className="text-[9px] text-muted-foreground">
                                {nd.yearDisplay}
                              </div>
                            </motion.button>

                            {/* 连线 */}
                            {!isLast && (
                              <div className="mt-2 flex flex-col items-center">
                                <div
                                  className="h-6 w-px"
                                  style={{ backgroundColor: chain.color + '60' }}
                                />
                                <span
                                  className="max-w-[50px] text-center text-[9px]"
                                  style={{ color: chain.color }}
                                >
                                  {node.relation}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </TabsContent>
          ),
        )}
      </Tabs>
    </div>
  );
}

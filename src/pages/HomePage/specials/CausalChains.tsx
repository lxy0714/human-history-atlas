import { useState, useMemo } from 'react';
import { useI18n } from '@/i18n';
import { ArrowRight, ArrowLeft, Link, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { findNodeById } from '@/data/relations';
import { CIVILIZATIONS } from '@/data/history-index';
import { useIsMobile } from '@/hooks/use-mobile';
import type { HistoryState } from '../useHistoryStore';

interface ChainNode {
  id: string;
  label: string; // 因果关系简述
}

interface ChainData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  nodes: ChainNode[];
}

const CAUSAL_CHAINS: ChainData[] = [
  {
    id: 'china-modern',
    title: '中国近代化之路',
    description: '从鸦片战争到新中国成立，百年屈辱与探索',
    icon: '',
    color: '#c0392b',
    nodes: [
      { id: 'event-opium-war', label: '打开国门' },
      { id: 'event-opium-war', label: '民族危机' },
      { id: 'war-sino-japanese', label: '甲午战败' },
      { id: 'xinhai-revolution', label: '推翻帝制' },
      { id: 'xinhai-revolution', label: '建立共和' },
      { id: 'dynasty-republic', label: '民国时代' },
      { id: 'world-war-2', label: '抗日战争' },
      { id: 'prc-founding', label: '新中国成立' },
    ],
  },
  {
    id: 'europe-transition',
    title: '欧洲近代转型',
    description: '从黑死病到工业革命，欧洲如何崛起',
    icon: '',
    color: '#2c3e80',
    nodes: [
      { id: 'black-death', label: '动摇封建' },
      { id: 'renaissance', label: '人文觉醒' },
      { id: 'protestant-reformation', label: '宗教改革' },
      { id: 'sci-scientific-revolution', label: '科学革命' },
      { id: 'enlightenment', label: '启蒙运动' },
      { id: 'econ-industrial-revolution', label: '工业革命' },
    ],
  },
  {
    id: 'globalization',
    title: '大航海与全球化',
    description: '新航路开辟，世界连为一体',
    icon: '',
    color: '#0984e3',
    nodes: [
      { id: 'age-of-exploration', label: '新航路开辟' },
      { id: 'columbus', label: '发现美洲' },
      { id: 'econ-columbian-exchange', label: '物种大交换' },
      { id: 'spanish-empire', label: '殖民帝国' },
      { id: 'econ-industrial-revolution', label: '工业革命' },
    ],
  },
  {
    id: 'world-wars',
    title: '世界大战链条',
    description: '从帝国主义到冷战，两次世界大战的因果',
    icon: '',
    color: '#c0392b',
    nodes: [
      { id: 'econ-industrial-revolution', label: '工业革命' },
      { id: 'british-empire', label: '帝国主义' },
      { id: 'world-war-1', label: '第一次世界大战' },
      { id: 'great-depression', label: '大萧条' },
      { id: 'world-war-2', label: '第二次世界大战' },
      { id: 'cold-war', label: '冷战格局' },
    ],
  },
  {
    id: 'tang-decline',
    title: '唐衰与五代乱局',
    description: '安史之乱如何让唐朝走向灭亡',
    icon: '',
    color: '#d4a843',
    nodes: [
      { id: 'an-shi-rebellion', label: '由盛转衰' },
      { id: 'an-shi-rebellion', label: '八年战乱' },
      { id: 'dynasty-wudaishi', label: '藩镇割据' },
      { id: 'dynasty-wudaishi', label: '五代十国' },
      { id: 'song-dynasty', label: '宋初集权' },
    ],
  },
  {
    id: 'rome-rise-fall',
    title: '罗马兴衰',
    description: '从共和国到帝国，从鼎盛到灭亡',
    icon: '',
    color: '#8e44ad',
    nodes: [
      { id: 'roman-republic', label: '共和国扩张' },
      { id: 'rome-conquest-greece', label: '征服希腊' },
      { id: 'person-julius-caesar', label: '内战独裁' },
      { id: 'roman-empire', label: '帝国建立' },
      { id: 'rome-split', label: '三世纪危机' },
      { id: 'western-rome-fall', label: '西罗马灭亡' },
      { id: 'byzantine-empire', label: '拜占庭延续' },
    ],
  },
  {
    id: 'buddhism-spread',
    title: '佛教传播',
    description: '从印度到东亚，跨越千年的信仰之旅',
    icon: '',
    color: '#e67e22',
    nodes: [
      { id: 'idea-buddhism-spread', label: '佛教诞生' },
      { id: 'maurya-empire', label: '阿育王传播' },
      { id: 'econ-silk-road', label: '沿丝路东传' },
      { id: 'person-xuanzang', label: '玄奘取经' },
      { id: 'tang-dynasty', label: '唐代兴盛' },
      { id: 'nara-period', label: '传入日本' },
    ],
  },
  {
    id: 'axial-age',
    title: '轴心时代思想突破',
    description: '公元前8-2世纪，东西方精神文明同时觉醒，奠定人类思想根基',
    icon: '',
    color: '#6c5ce7',
    nodes: [
      { id: 'confucius', label: '儒家开创' },
      { id: 'laozi', label: '道家开创' },
      { id: 'person-sakyamuni', label: '佛教诞生' },
      { id: 'person-socrates', label: '希腊哲学' },
      { id: 'person-plato', label: '理念论' },
      { id: 'person-aristotle', label: '集大成者' },
      { id: 'enlightenment', label: '后世思想源' },
    ],
  },
  {
    id: 'four-inventions-west',
    title: '四大发明西传链',
    description: '造纸印刷火药指南针如何改变欧洲历史进程',
    icon: '',
    color: '#e67e22',
    nodes: [
      { id: 'event-paper-talas', label: '怛罗斯传阿拉伯' },
      { id: 'event-baghdad-paper', label: '巴格达造纸' },
      { id: 'event-european-paper', label: '传入欧洲' },
      { id: 'printing-westward', label: '印刷术西传' },
      { id: 'renaissance', label: '文艺复兴' },
      { id: 'protestant-reformation', label: '宗教改革' },
      { id: 'event-gunpowder-westward', label: '火药瓦解封建' },
      { id: 'age-of-exploration', label: '大航海时代' },
    ],
  },
  {
    id: 'roman-law',
    title: '罗马法传承链',
    description: '从十二铜表到现代民法典，西方法治文明的主脉',
    icon: '',
    color: '#d4ac0d',
    nodes: [
      { id: 'roman-republic', label: '罗马共和国' },
      { id: 'rome-justinian-reconquest', label: '查士丁尼法典' },
      { id: 'renaissance', label: '注释法学复兴' },
      { id: 'napoleon', label: '拿破仑法典' },
      { id: 'econ-industrial-revolution', label: '现代法治' },
    ],
  },
  {
    id: 'capitalism-rise',
    title: '资本主义兴起链',
    description: '从新航路到工业革命，资本主义如何诞生并征服世界',
    icon: '',
    color: '#00b894',
    nodes: [
      { id: 'age-of-exploration', label: '新航路开辟' },
      { id: 'price-revolution', label: '价格革命' },
      { id: 'econ-silk-road', label: '商业革命' },
      { id: 'enlightenment', label: '启蒙思想' },
      { id: 'econ-industrial-revolution', label: '工业革命' },
      { id: 'british-empire', label: '全球扩张' },
    ],
  },
  {
    id: 'russia-expansion',
    title: '俄罗斯崛起链',
    description: '从基辅罗斯到苏联帝国，欧亚大陆的北方巨人',
    icon: '',
    color: '#2c3e80',
    nodes: [
      { id: 'europe-kievan-rus', label: '基辅罗斯' },
      { id: 'mongol-conquests', label: '蒙古征服' },
      { id: 'europe-moscow-rise', label: '莫斯科崛起' },
      { id: 'golden-horde', label: '摆脱金帐' },
      { id: 'russian-empire', label: '沙皇俄国' },
      { id: 'peter-the-great-reform', label: '彼得大帝西化' },
      { id: 'soviet-collapse', label: '苏联兴衰' },
    ],
  },
  {
    id: 'china-ethnic-merge',
    title: '中华民族融合链',
    description: '五胡入华到康乾盛世，多元一体的形成之路',
    icon: '',
    color: '#c0392b',
    nodes: [
      { id: 'five-hu', label: '五胡乱华' },
      { id: 'event-filial-piety', label: '孝文帝汉化' },
      { id: 'sui-dynasty', label: '隋唐大一统' },
      { id: 'dynasty-liao', label: '辽夏金并立' },
      { id: 'yuan-dynasty', label: '元朝大融合' },
      { id: 'qing-dynasty', label: '清朝多元一体' },
    ],
  },
  {
    id: 'scientific-revolution',
    title: '科学革命链',
    description: '从哥白尼到爱因斯坦，人类宇宙观的五次跃迁',
    icon: '',
    color: '#0984e3',
    nodes: [
      { id: 'copernicus', label: '日心说革命' },
      { id: 'galileo', label: '实验科学' },
      { id: 'scientist-kepler', label: '行星定律' },
      { id: 'newton', label: '经典力学' },
      { id: 'scientist-faraday', label: '电磁理论' },
      { id: 'einstein', label: '相对论' },
    ],
  },
  {
    id: 'decolonization',
    title: '殖民独立浪潮链',
    description: '从拉丁美洲到非洲，殖民体系的崩溃与第三世界崛起',
    icon: '',
    color: '#e17055',
    nodes: [
      { id: 'haitian-revolution', label: '海地革命' },
      { id: 'latin-american-independence', label: '拉美独立' },
      { id: 'india-independence', label: '印度独立' },
      { id: 'africa-independence-year', label: '非洲独立年' },
      { id: 'event-decolonization-wave', label: '非殖民化浪潮' },
    ],
  },
  {
    id: 'cold-war-rise-fall',
    title: '冷战兴衰链',
    description: '从二战盟友到苏联解体，半个世纪的两极对峙',
    icon: '',
    color: '#e74c3c',
    nodes: [
      { id: 'world-war-2', label: '二战同盟' },
      { id: 'econ-marshall-plan', label: '杜鲁门主义' },
      { id: 'cold-war', label: '两极格局' },
      { id: 'cuban-missile-crisis', label: '古巴导弹危机' },
      { id: 'vietnam-war-detail', label: '越南战争' },
      { id: 'soviet-collapse', label: '苏联解体' },
    ],
  },
];

interface CausalChainsProps {
  store: HistoryState;
}

export default function CausalChains({ store }: CausalChainsProps) {
  const { ln, nt } = useI18n();
  const [activeChain, setActiveChain] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { scrollToNode } = store;

  const chain = useMemo(
    () => CAUSAL_CHAINS.find((c) => c.id === activeChain) ?? null,
    [activeChain],
  );

  function handleNodeClick(nodeId: string) {
    scrollToNode(nodeId);
  }

  if (!activeChain) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {CAUSAL_CHAINS.map((c, i) => (
            <motion.button
                  type="button"
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveChain(c.id)}
              className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 text-left transition-all hover:border-border hover:bg-card"
            >
              <div
                className="absolute right-0 top-0 h-20 w-20 -translate-y-6 translate-x-6 rounded-full opacity-10 blur-xl"
                style={{ backgroundColor: c.color }}
              />
              <div className="mb-2 text-2xl">{c.icon}</div>
              <h3 className="mb-1 text-sm font-semibold">{nt(c)}</h3>
              <p className="text-xs text-muted-foreground">{c.description}</p>
              <div className="mt-3 flex items-center gap-1">
                {c.nodes.slice(0, 5).map((n, idx) => {
                  const nd = findNodeById(n.id);
                  return (
                    <div key={n.id} className="flex items-center gap-1">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      {idx < c.nodes.length - 1 && idx < 4 && (
                        <div className="h-px w-3 bg-border" />
                      )}
                    </div>
                  );
                })}
                {c.nodes.length > 5 && (
                  <span className="ml-1 text-[10px] text-muted-foreground">
                    +{c.nodes.length - 5}
                  </span>
                )}
              </div>
              <ArrowRight className="absolute bottom-3 right-3 size-3 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setActiveChain(null)}>
          <ArrowLeft className="mr-1 size-3" />
          返回
        </Button>
        <div>
          <h2 className="text-lg font-bold font-serif">{nt(chain)}</h2>
          <p className="text-xs text-muted-foreground">{chain?.description}</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex min-w-max items-center gap-2 px-2 pb-4">
          {chain?.nodes.map((node, idx) => {
  
            const nd = findNodeById(node.id);
            if (!nd) return null;
            const nc = CIVILIZATIONS[nd.civilization]?.color ?? '#888';
            return (
              <div key={node.id} className="flex items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNodeClick(node.id)}
                  className="group relative w-28 shrink-0 rounded-lg border border-border/40 bg-card/50 p-3 text-left transition-all hover:border-primary/40 hover:bg-card"
                >
                  <div
                    className="absolute left-0 top-0 h-full w-0.5 rounded-l-lg"
                    style={{ backgroundColor: chain.color }}
                  />
                  <div className="mb-1 text-[9px] text-muted-foreground">
                    {nd.yearDisplay}
                  </div>
                  <div className="line-clamp-2 text-xs font-medium text-foreground">
                    {nt(nd)}
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <span
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: nc }}
                    />
                    <span className="truncate text-[9px] text-muted-foreground">
                      {ln(CIVILIZATIONS[nd.civilization], nd.civilization)}
                    </span>
                  </div>
                </motion.button>

                {idx < (chain?.nodes.length ?? 0) - 1 && (
                  <div className="flex shrink-0 flex-col items-center">
                    <ArrowRight className="size-3 text-primary/60" />
                    <span
                      className="mt-1 max-w-[60px] text-center text-[9px]"
                      style={{ color: chain.color }}
                    >
                      {node.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/30 px-3 py-2 text-[11px] text-muted-foreground">
        <History className="size-3.5 text-primary" />
        <span>点击节点可查看详情，共 {chain?.nodes.length} 个关键节点</span>
      </div>
    </div>
  );
}

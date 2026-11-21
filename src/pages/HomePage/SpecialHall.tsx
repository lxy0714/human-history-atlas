// EXPORTS: SpecialHall
import { useState, useEffect, memo } from 'react';
import { AppEvents } from './app-events';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Shirt,
  Swords,
  CalendarDays,
  Lightbulb,
  Quote,
  Trophy,
  Calculator,
  Scale,
  ArrowLeft,
  Star,
  Clock,
  Cpu,
  GitBranch,
  Network,
  HelpCircle,
  Home,
  Globe2,
  Building2,
  Radio,
  Sprout,
  Skull,
  BookOpen,
  GraduationCap,
  BarChart3,
} from 'lucide-react';
import type { HistoryState } from './useHistoryStore';
import { useLearningProgress } from './useLearningProgress';
import { useAchievements } from './useAchievements';
import { useI18n } from '@/i18n';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ViewSkeleton from '@/components/ViewSkeleton';
import {
  LazyCivilizationAtlas,
  LazyFullRelationGraph,
  LazyRelationshipGraph,
  LazyPersonEgoGraph,
  LazyCausalChains,
  LazyCityMemory,
  LazyCivilizationCompare,
  LazyEmpireComparison,
  LazyHistoryQuiz,
  LazyLearningHall,
  LazyLineageHall,
  LazySixDegrees,
  LazyCityRiseFall,
  LazySpeciesSpread,
  LazyCommTransport,
  LazyPlagueHistory,
  LazyLegalHistory,
  LazyInventionsTimeline,
  LazyDailyLife,
  LazyFavoritesList,
  LazyTimeCapsule,
  LazyFashionTimeline,
  LazyWeaponTimeline,
  LazyTodayInHistory,
  LazyFunFacts,
  LazyQuotes,
  LazyRankings,
  LazyEraConverter,
} from './lazyModules';
import { Suspense } from 'react';

export const SPECIAL_TOPICS = [
  {
    id: 'favorites',
    title: '我的收藏',
    description: '你收藏的历史节点',
    icon: Star,
    color: '#f1c40f',
    featured: true,
  },
  {
    id: 'timecapsule',
    title: '时间胶囊',
    description: '任意年份的全球历史快照',
    icon: Clock,
    color: '#9b59b6',
    featured: true,
  },
  {
    id: 'inventions',
    title: '科技发明',
    description: '从火的使用到AI大模型，20项改变人类的发明',
    icon: Cpu,
    color: '#1abc9c',
    featured: true,
  },
  {
    id: 'relationship',
    title: '关系图谱',
    description: '763 节点全量关系网络，六大类关系交织',
    icon: Network,
    color: '#d4a843',
  },
  {
    id: 'fashion',
    title: '服饰演变',
    description: '中西服饰穿越千年的时尚变迁',
    icon: Shirt,
    color: '#e84393',
  },
  {
    id: 'weapon',
    title: '武器演变',
    description: '从石器到核武器的战争技术史',
    icon: Swords,
    color: '#c0392b',
  },
  {
    id: 'onthisday',
    title: '历史上的今天',
    description: '130+精确日期事件，任选一天回看历史',
    icon: CalendarDays,
    color: '#0984e3',
    featured: true,
  },
  {
    id: 'funfacts',
    title: '冷知识卡片墙',
    description: '30+ 颠覆认知的历史冷知识',
    icon: Lightbulb,
    color: '#fdcb6e',
  },
  {
    id: 'quotes',
    title: '名言典故库',
    description: '千古名言与成语典故',
    icon: Quote,
    color: '#6c5ce7',
  },
  {
    id: 'rankings',
    title: '历史排行榜',
    description: '疆域、人口、国祚可视化排名',
    icon: Trophy,
    color: '#00b894',
  },
  {
    id: 'converter',
    title: '纪年对照表',
    description: '公元/干支/年号/伊斯兰历/佛历换算',
    icon: Calculator,
    color: '#e17055',
  },
  {
    id: 'compare',
    title: '文明对比',
    description: '任意两个历史节点的横向对比',
    icon: Scale,
    color: '#00cec9',
  },
  {
    id: 'causal-chains',
    title: '历史因果链',
    description: '16条预设因果链，看清历史的蝴蝶效应',
    icon: GitBranch,
    color: '#e17055',
    featured: true,
  },
  {
    id: 'lineage-hall',
    title: '师承与世系',
    description: '思想师承、帝王世系、宗教传承谱系图',
    icon: Users,
    color: '#d4a843',
    featured: true,
  },
  {
    id: 'six-degrees',
    title: '历史六度空间',
    description: '任意两个节点最短路径查询，BFS在历史网络中探索',
    icon: Network,
    color: '#6c5ce7',
    featured: true,
  },
  {
    id: 'quiz',
    title: '历史测验',
    description: '161道选择题，错题本+分模式练习',
    icon: HelpCircle,
    color: '#f39c12',
    featured: true,
  },
  {
    id: 'daily-life',
    title: '文明日常',
    description: '穿越到不同时代，体验古人的一天',
    icon: Home,
    color: '#e67e22',
  },
  {
    id: 'empires',
    title: '帝国疆域',
    description: '20+大帝国面积、人口、国祚可视化对比',
    icon: Globe2,
    color: '#2980b9',
  },
  {
    id: 'city-history',
    title: '城市兴衰',
    description: '10座历史名城的前世今生',
    icon: Building2,
    color: '#8e44ad',
  },
  {
    id: 'comm-transport',
    title: '通信交通史',
    description: '从驿马到互联网，信息与速度的飞跃',
    icon: Radio,
    color: '#16a085',
  },
  {
    id: 'species-spread',
    title: '物种传播',
    description: '哥伦布大交换如何改变世界',
    icon: Sprout,
    color: '#27ae60',
  },
  {
    id: 'plague',
    title: '瘟疫史',
    description: '疾病如何塑造人类文明进程',
    icon: Skull,
    color: '#c0392b',
  },
  {
    id: 'legal',
    title: '法律史',
    description: '从汉谟拉比到民法典，法治文明的脚步',
    icon: Scale,
    color: '#d4ac0d',
  },
  {
    id: 'city-memory',
    title: '城市记忆',
    description: '10座历史名城的历代变迁与节点聚合',
    icon: Building2,
    color: '#00cec9',
    featured: true,
  },
  {
    id: 'person-ego',
    title: '人物关系网',
    description: '以人物为中心探索师承、君臣、对手等关系',
    icon: Users,
    color: '#d4a843',
    featured: true,
  },
  {
    id: 'learning-hall',
    title: '史学堂',
    description: '10条学习路径 + 术语词典 + 学习进度追踪',
    icon: GraduationCap,
    color: '#d4a843',
    featured: true,
  },
  {
    id: 'civilization-atlas',
    title: '文明图鉴',
    description: '数据可视化仪表盘：文明兴衰曲线、时代类型统计、枢纽节点',
    icon: BarChart3,
    color: '#1890ff',
    featured: true,
  },
];

const TOPICS = SPECIAL_TOPICS;

interface SpecialHallProps {
  store: HistoryState;
}

export default memo(function SpecialHall({ store }: SpecialHallProps) {
  const { t, nt } = useI18n();
  const progress = useLearningProgress();
  const achievements = useAchievements();
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // 监听外部跳转事件（从详情面板发起对比等）
  useEffect(() => {
    function handleNavigate(e: Event) {
      const ce = e as CustomEvent<{ topicId: string }>;
      if (ce.detail?.topicId) {
        setActiveTopic(ce.detail.topicId);
      }
    }
    window.addEventListener(AppEvents.NAVIGATE_SPECIAL_TOPIC, handleNavigate);
    return () => window.removeEventListener(AppEvents.NAVIGATE_SPECIAL_TOPIC, handleNavigate);
  }, []);

  const activeInfo = TOPICS.find((t) => t.id === activeTopic);

  // 收藏数量
  const favoriteCount = store.favoriteIds.length;

  return (
    <div className="h-full overflow-y-auto pb-44 md:pb-24" style={{ scrollPaddingBottom: 'calc(56px + env(safe-area-inset-bottom))' }}>
      <AnimatePresence mode="wait">
        {!activeTopic ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-5xl px-2 py-4 md:px-4 md:py-8"
          >
            {/* 标题 */}
            <div className="mb-6 text-center md:mb-10">
             <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs tracking-[0.2em] text-primary font-display">
                 {t('special.hallTitle', '专 题 典 藏')}
               </div>
               <h1 className="text-2xl font-bold tracking-wide md:text-4xl font-display">
                 {t('special.hallSubtitle', '专 题 馆')}
               </h1>
              <p className="mt-2 text-xs text-muted-foreground md:text-sm">
                {t('special.hallDesc', '选择一个专题，深入探索历史的某一面')}
              </p>
            </div>

            {/* 卡片网格 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {TOPICS.map((topic, i) => {
  
                  const Icon = topic.icon;
                  const isFav = topic.id === 'favorites';
                  const isEmpty = isFav && favoriteCount === 0;
                  return (
                    <motion.button
                  type="button"
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      onClick={() => {
                        if (isEmpty) return;
                        setActiveTopic(topic.id);
                      }}
                       className={`group relative overflow-hidden rounded-[2px] border p-[20px] text-left transition-colors ${isEmpty
                         ? 'cursor-not-allowed border-foreground/10 bg-card/10 opacity-50'
                         : 'border-foreground/10 bg-card/40 hover:border-[#D4A843]/45'
                       }`}
                    >
                    {/* 展签序号 */}
                    <span
                      className="absolute right-3 top-3 text-[10px] font-mono tabular-nums text-foreground/35"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon
                      className="mb-4 size-5"
                      style={{ color: '#D4A843' }}
                    />
                    <h3 className="mb-2 text-[16px] font-bold font-display leading-snug">
                      {nt(topic)}
                    </h3>
                    <p className="line-clamp-2 text-[12px] leading-[1.6] text-foreground/60">
                      {isFav
                        ? favoriteCount > 0
                          ? `${t('special.favoriteCount', '已收藏')} ${favoriteCount} ${t('special.favoriteNodes', '个节点')}`
                          : t('special.noFavorites', '暂无收藏，去详情面板添加吧')
                        : topic.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
            {!activeTopic && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 rounded-xl border border-border/30 bg-card/40 p-5 md:p-6"
              >
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen className="size-4 text-primary" />
                  <h3 className="text-sm font-semibold font-serif">{t('special.references', '参考与来源')}</h3>
                </div>
                <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
                  {t('special.referencesNote', '本应用为历史知识普及作品。编写过程中参考了以下主要资料：')}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-foreground/75 md:grid-cols-3">
                  <span>· {t('special.ref1', '《全球通史》（斯塔夫里阿诺斯）')}</span>
                  <span>· {t('special.ref2', '《史记》（司马迁）')}</span>
                  <span>· {t('special.ref3', '《资治通鉴》（司马光）')}</span>
                  <span>· {t('special.ref4', '剑桥中国史 / 剑桥世界史')}</span>
                  <span>· {t('special.ref5', '各文明正史记载')}</span>
                  <span>· {t('special.ref6', '维基百科（多语言版）')}</span>
                  <span>· {t('special.ref7', 'UNESCO 世界遗产名录')}</span>
                  <span>· {t('special.ref8', 'Britannica 大英百科')}</span>
                  <span>· {t('special.ref9', '主要考古发现公开报告')}</span>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/80">
                  {t('special.disclaimer', '说明：部分年代采用史学界通行说法，不同史料与研究文献可能存在差异。节点内容为普及性介绍，学术研究请以专业文献为准。欢迎考证与补充。')}
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {/* 顶部返回栏 */}
            <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/40 bg-background/80 px-3 py-2 md:px-5 md:py-3">
              <button
                onClick={() => setActiveTopic(null)}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:text-sm"
              >
                <ArrowLeft className="size-4" />
                {t('special.backToList', '返回专题馆')}
              </button>
              {activeInfo && (
                <div className="flex items-center gap-2">
                  <activeInfo.icon
                    className="size-4 md:size-5"
                    style={{ color: activeInfo.color }}
                  />
                  <h2 className="text-sm font-bold font-serif md:text-lg">
                    {nt(activeInfo)}
                  </h2>
                </div>
              )}
            </div>

            {/* 内容区 */}
            <div className="px-2 py-4 md:px-5 md:py-6">
              <Suspense fallback={<ViewSkeleton title={t('special.loading', '加载专题中...')} height="min-h-[320px]" />}>
                {activeTopic === 'favorites' && (
                  <LazyFavoritesList store={store} onBack={() => setActiveTopic(null)} />
                )}
                {activeTopic === 'timecapsule' && <LazyTimeCapsule store={store} />}
                {activeTopic === 'inventions' && <LazyInventionsTimeline store={store} />}
                {activeTopic === 'relationship' && (
                  <div className="space-y-4">
                    <Tabs defaultValue="full" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="full">{t('special.fullNetwork', '全量关系网')}</TabsTrigger>
                        <TabsTrigger value="people">{t('special.peopleSubgraph', '人物关系子图')}</TabsTrigger>
                      </TabsList>
                      <Suspense fallback={<ViewSkeleton title={t('special.loadingGraph', '加载图谱...')} height="min-h-[300px]" />}>
                        <TabsContent value="full" className="mt-4">
                          <LazyFullRelationGraph onOpenDetail={store.openDetail} />
                        </TabsContent>
                        <TabsContent value="people" className="mt-4">
                          <LazyRelationshipGraph store={store} />
                        </TabsContent>
                      </Suspense>
                    </Tabs>
                  </div>
                )}
                {activeTopic === 'fashion' && <LazyFashionTimeline />}
                {activeTopic === 'weapon' && <LazyWeaponTimeline />}
                {activeTopic === 'onthisday' && (
                  <LazyTodayInHistory store={store} onBack={() => setActiveTopic(null)} />
                )}
                {activeTopic === 'funfacts' && <LazyFunFacts />}
                {activeTopic === 'quotes' && <LazyQuotes />}
                {activeTopic === 'rankings' && <LazyRankings />}
                {activeTopic === 'converter' && <LazyEraConverter />}
                {activeTopic === 'compare' && (
                  <LazyCivilizationCompare
                    store={store}
                    initialLeftId={store.specialCompareLeftId ?? undefined}
                  />
                )}
                {activeTopic === 'causal-chains' && <LazyCausalChains store={store} />}
                {activeTopic === 'lineage-hall' && <LazyLineageHall store={store} />}
                {activeTopic === 'six-degrees' && <LazySixDegrees store={store} />}
                {activeTopic === 'quiz' && (
                  <LazyHistoryQuiz
                    onBack={() => setActiveTopic(null)}
                    onQuizComplete={(score, total) => achievements.onQuizComplete(score, total)}
                    onShortAnswerDone={achievements.onShortAnswerDone}
                  />
                )}
                {activeTopic === 'daily-life' && <LazyDailyLife onBack={() => setActiveTopic(null)} />}
                {activeTopic === 'empires' && <LazyEmpireComparison onBack={() => setActiveTopic(null)} />}
                {activeTopic === 'city-history' && <LazyCityRiseFall onBack={() => setActiveTopic(null)} />}
                {activeTopic === 'comm-transport' && <LazyCommTransport onBack={() => setActiveTopic(null)} />}
                {activeTopic === 'species-spread' && <LazySpeciesSpread onBack={() => setActiveTopic(null)} />}
                {activeTopic === 'plague' && <LazyPlagueHistory onBack={() => setActiveTopic(null)} />}
                {activeTopic === 'legal' && <LazyLegalHistory onBack={() => setActiveTopic(null)} />}
                {activeTopic === 'city-memory' && (
                  <LazyCityMemory store={store} onBack={() => setActiveTopic(null)} />
                )}
                {activeTopic === 'person-ego' && (
                  <LazyPersonEgoGraph store={store} onBack={() => setActiveTopic(null)} />
                )}
                {activeTopic === 'learning-hall' && (
                  <LazyLearningHall
                    store={store}
                    progress={progress}
                    achievements={achievements}
                    onBack={() => setActiveTopic(null)}
                  />
                )}
                {activeTopic === 'civilization-atlas' && (
                  <LazyCivilizationAtlas store={store} onBack={() => setActiveTopic(null)} />
                )}
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

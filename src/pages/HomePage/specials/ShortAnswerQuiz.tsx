// EXPORTS: ShortAnswerQuiz
// 简答题测验组件
// 关键词匹配判定 + 自评兜底 + 错题本 + 支持按分类/时代/错题模式

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  History,
  Lightbulb,
  Send,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { SHORT_ANSWER_QUESTIONS, type ShortAnswerQuestion } from '@/data/quiz-short-answer';
import { ERAS } from '@/data/history-index';
import { safeScopedStorage } from '@/lib/safeScopedStorage';

interface ShortAnswerQuizProps {
  onBack?: () => void;
  onShortAnswerDone?: () => void; // 每完成一道简答题触发
  onQuizComplete?: (score: number, total: number) => void;
}

const WRONG_KEY = 'history-short-answer-wrong';
const HIGH_SCORE_KEY = 'history-sa-highscore';
const QUESTIONS_PER_ROUND = 10;

type GameState = 'select' | 'playing' | 'result';
type QuizMode = 'random' | 'category' | 'wrong';
type AnswerResult = 'correct' | 'wrong' | 'self-correct' | 'self-wrong' | null;

const CATEGORIES = [
  { value: 'all', label: '全部题目' },
  { value: 'china', label: '中国历史' },
  { value: 'world', label: '世界历史' },
  { value: 'tech', label: '科技文明' },
] as const;

const ERA_RANGES = ERAS.map((e) => ({ id: e.id, label: e.name, minYear: e.startYear, maxYear: e.endYear }));

// ========== 工具函数 ==========

// 标准化字符串：忽略大小写、空格、全角半角
function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[（）【】「」『』《》〈〉“”‘’—…·]/g, '')
    .replace(/[。，、；：！？]/g, '')
    .replace(/[.,;:!?\-_()\[\]{}"'`]/g, '')
    .replace(/０/g, '0').replace(/１/g, '1').replace(/２/g, '2')
    .replace(/３/g, '3').replace(/４/g, '4').replace(/５/g, '5')
    .replace(/６/g, '6').replace(/７/g, '7').replace(/８/g, '8').replace(/９/g, '9');
}

// 关键词匹配：命中任一关键词即判对
function checkAnswer(answer: string, keywords: string[]): boolean {
  const norm = normalize(answer);
  if (!norm) return false;
  return keywords.some((kw) => norm.includes(normalize(kw)));
}

// 错题本
function getWrongIds(): string[] {
  try {
    const raw = safeScopedStorage.getItem(WRONG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveWrongIds(ids: string[]) {
  try {
    safeScopedStorage.setItem(WRONG_KEY, JSON.stringify(ids));
  } catch { /* ignore */ }
}
function addWrong(id: string) {
  const cur = getWrongIds();
  if (!cur.includes(id)) saveWrongIds([...cur, id]);
}
function removeWrong(id: string) {
  const cur = getWrongIds();
  saveWrongIds(cur.filter((x) => x !== id));
}

function getHighScore(cat: string): number {
  try {
    const raw = safeScopedStorage.getItem(`${HIGH_SCORE_KEY}-${cat}`);
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch { return 0; }
}
function setHighScore(cat: string, score: number) {
  try {
    const cur = getHighScore(cat);
    if (score > cur) safeScopedStorage.setItem(`${HIGH_SCORE_KEY}-${cat}`, String(score));
  } catch { /* ignore */ }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ShortAnswerQuiz({ onBack, onShortAnswerDone, onQuizComplete }: ShortAnswerQuizProps) {
  const [gameState, setGameState] = useState<GameState>('select');
  const [mode, setMode] = useState<QuizMode>('random');
  const [category, setCategory] = useState<string>('all');
  const [eraFilter, setEraFilter] = useState<string>('all');
  const [questions, setQuestions] = useState<ShortAnswerQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [answered, setAnswered] = useState(false);
  const [answerResult, setAnswerResult] = useState<AnswerResult>(null);
  const [wrongList, setWrongList] = useState<string[]>(() => getWrongIds());
  const [highScore, setHighScoreState] = useState(0);
  const [showWrongReview, setShowWrongReview] = useState(false);

  const currentQuestion = questions[currentIdx];
  const progress = questions.length > 0 ? ((currentIdx + 1) / questions.length) * 100 : 0;

  // 根据模式/分类/时代筛选题目
  const questionPool = useMemo(() => {
    let pool = [...SHORT_ANSWER_QUESTIONS];
    if (mode === 'wrong') {
      pool = pool.filter((q) => wrongList.includes(q.id));
    } else {
      if (category !== 'all') {
        pool = pool.filter((q) => q.category === category);
      }
      if (eraFilter !== 'all') {
        const era = ERA_RANGES.find((e) => e.id === eraFilter);
        if (era) {
          pool = pool.filter((q) => {
            // 简单用节点 year 过滤，没有 year 的全部保留
            if (q.eraId) return q.eraId === eraFilter;
            return true;
          });
        }
      }
    }
    return pool;
  }, [mode, category, eraFilter, wrongList]);

  const wrongQuestions = useMemo(
    () => SHORT_ANSWER_QUESTIONS.filter((q) => wrongList.includes(q.id)),
    [wrongList],
  );

  // 进入时更新最高分
  useEffect(() => {
    setHighScoreState(getHighScore(mode === 'wrong' ? 'wrong' : category));
  }, [mode, category]);

  // 开始测验
  function startQuiz() {
    const pool = shuffle(questionPool).slice(0, QUESTIONS_PER_ROUND);
    setQuestions(pool);
    setCurrentIdx(0);
    setScore(0);
    setInputValue('');
    setAnswered(false);
    setAnswerResult(null);
    setGameState('playing');
  }

  function startWrongOnly() {
    setMode('wrong');
    setTimeout(() => startQuiz(), 0);
  }

  // 提交答案
  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (answered || !currentQuestion) return;

    const correct = checkAnswer(inputValue, currentQuestion.acceptableKeywords);
    setAnswered(true);
    setAnswerResult(correct ? 'correct' : 'wrong');

    if (correct) {
      setScore((s) => s + 1);
      // 答对了，如果之前在错题本里，移除
      if (wrongList.includes(currentQuestion.id)) {
        removeWrong(currentQuestion.id);
        setWrongList((prev) => prev.filter((id) => id !== currentQuestion.id));
      }
    } else {
      // 答错了，加入错题本
      addWrong(currentQuestion.id);
      setWrongList((prev) => (prev.includes(currentQuestion.id) ? prev : [...prev, currentQuestion.id]));
    }

    if (onShortAnswerDone) onShortAnswerDone();
  }

  // 自评：我自己觉得答对了
  function handleSelfCorrect() {
    if (!currentQuestion || answerResult !== 'wrong') return;
    setAnswerResult('self-correct');
    setScore((s) => s + 1);
    // 自评对了 → 从错题本移除
    if (wrongList.includes(currentQuestion.id)) {
      removeWrong(currentQuestion.id);
      setWrongList((prev) => prev.filter((id) => id !== currentQuestion.id));
    }
  }

  // 自评：我自己觉得答错了（确认错题）
  function handleSelfWrong() {
    if (!currentQuestion || answerResult !== 'correct') return;
    setAnswerResult('self-wrong');
    setScore((s) => Math.max(0, s - 1));
    addWrong(currentQuestion.id);
    setWrongList((prev) => (prev.includes(currentQuestion.id) ? prev : [...prev, currentQuestion.id]));
  }

  // 下一题
  function nextQuestion() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setInputValue('');
      setAnswered(false);
      setAnswerResult(null);
    } else {
      // 结束
      const finalScore = score;
      const total = questions.length;
      const cat = mode === 'wrong' ? 'wrong' : category;
      setHighScore(cat, finalScore * 10);
      setHighScoreState(getHighScore(cat));
      if (onQuizComplete) onQuizComplete(finalScore, total);
      setGameState('result');
    }
  }

  function restart() {
    setGameState('select');
    setQuestions([]);
    setCurrentIdx(0);
    setScore(0);
    setInputValue('');
    setAnswered(false);
    setAnswerResult(null);
    setShowWrongReview(false);
  }

  const grade = getGradeLabel(score, questions.length);

  return (
    <div className="mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        {gameState === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Card className="p-5">
              <h2 className="mb-1 font-serif text-xl font-bold md:text-2xl">
                 简答题测验
              </h2>
              <p className="text-xs text-muted-foreground">
                关键词自动判定 + 自我评分兜底，巩固记忆更有效
              </p>
            </Card>

            {/* 模式选择 */}
            <Card className="p-5">
              <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold">
                <Sparkles className="size-5 text-primary" />
                选择模式
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setMode('random')}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    mode === 'random'
                      ? 'border-primary/60 bg-primary/10'
                      : 'border-border/50 hover:border-border'
                  }`}
                >
                  <Sparkles className="size-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">混合随机</div>
                    <div className="text-xs text-muted-foreground">
                      从全部简答题随机抽取
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setMode('category')}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    mode === 'category'
                      ? 'border-primary/60 bg-primary/10'
                      : 'border-border/50 hover:border-border'
                  }`}
                >
                  <BookOpen className="size-5 text-info" />
                  <div>
                    <div className="text-sm font-semibold">按分类出题</div>
                    <div className="text-xs text-muted-foreground">
                      选择主题 / 时代定向练习
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setMode('wrong')}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    mode === 'wrong'
                      ? 'border-primary/60 bg-primary/10'
                      : 'border-border/50 hover:border-border'
                  }`}
                >
                  <History className="size-5 text-destructive" />
                  <div>
                    <div className="text-sm font-semibold">只做错题</div>
                    <div className="text-xs text-muted-foreground">
                      错题本 {wrongList.length} 道，巩固薄弱
                    </div>
                  </div>
                </button>
              </div>
            </Card>

            {/* 筛选条件 */}
            <Card className="p-5">
              <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold">
                <Lightbulb className="size-5 text-warning" />
                筛选条件
              </h3>
              <div className="space-y-3">
                {mode === 'category' && (
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">主题分类</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {mode !== 'wrong' && (
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">
                      时代筛选（可选）
                    </label>
                    <Select value={eraFilter} onValueChange={setEraFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部时代</SelectItem>
                        {ERA_RANGES.map((e) => (
                          <SelectItem key={e.id} value={e.id}>
                            {e.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2 text-sm">
                  <Trophy className="size-4 text-warning" />
                  <span className="text-muted-foreground">最高分：</span>
                  <span className="font-semibold text-warning">{highScore} 分</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  当前题库：{questionPool.length} 道题
                </div>
              </div>
            </Card>

            {/* 错题本快览 */}
            {wrongList.length > 0 && (
              <Card className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-serif text-base font-semibold">
                    <History className="size-4 text-destructive" />
                    错题本（{wrongList.length}）
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={startWrongOnly}>
                      重做错题
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm('确定清空错题本？')) {
                          saveWrongIds([]);
                          setWrongList([]);
                        }
                      }}
                    >
                      清空
                    </Button>
                  </div>
                </div>
                <div className="max-h-40 space-y-1 overflow-y-auto">
                  {wrongQuestions.slice(0, 8).map((q) => (
                    <div
                      key={q.id}
                      className="flex items-start gap-2 rounded-md p-2 text-xs hover:bg-accent/40"
                    >
                      <Badge variant="outline" className="shrink-0 text-[10px] px-1.5 py-0">
                        {CATEGORIES.find((c) => c.value === q.category)?.label ?? q.category}
                      </Badge>
                      <span className="line-clamp-1 flex-1">{q.question}</span>
                      <button
                        onClick={() => {
                          removeWrong(q.id);
                          setWrongList((prev) => prev.filter((id) => id !== q.id));
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <XCircle className="size-3.5" />
                      </button>
                    </div>
                  ))}
                  {wrongQuestions.length > 8 && (
                    <div className="text-center text-[11px] text-muted-foreground">
                      还有 {wrongQuestions.length - 8} 道错题...
                    </div>
                  )}
                </div>
              </Card>
            )}

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={startQuiz}
                disabled={questionPool.length === 0}
                className="w-full md:w-auto md:px-12"
              >
                <Sparkles className="mr-2 size-4" />
                开始答题（{Math.min(QUESTIONS_PER_ROUND, questionPool.length)} 题）
              </Button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* 进度 */}
            <Card className="p-4 md:p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    第 {currentIdx + 1}/{questions.length} 题
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    简答题
                  </Badge>
                  {mode === 'wrong' && (
                    <Badge variant="destructive" className="text-xs">错题重练</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <Trophy className="size-4 text-warning" />
                  <span className="text-warning">{score * 10}</span>
                  <span className="text-muted-foreground">分</span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </Card>

            {/* 问题 + 输入 */}
            <Card className="p-6 md:p-8">
              <h3 className="mb-6 font-serif text-lg font-semibold leading-relaxed md:text-xl">
                {currentQuestion.question}
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="请输入答案..."
                    disabled={answered}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={answered || !inputValue.trim()}>
                    <Send className="mr-2 size-4" />
                    提交
                  </Button>
                </div>
              </form>

              {/* 判定结果 */}
              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`mt-5 rounded-lg border-l-4 p-4 ${
                        answerResult === 'correct' || answerResult === 'self-correct'
                          ? 'border-green-500 bg-green-500/5'
                          : 'border-red-500 bg-red-500/5'
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2 font-semibold">
                        {answerResult === 'correct' || answerResult === 'self-correct' ? (
                          <>
                            <CheckCircle2 className="size-5 text-green-500" />
                            <span className="text-green-600 dark:text-green-400">
                              {answerResult === 'self-correct' ? '自评正确' : '回答正确！'}
                            </span>
                            {wrongList.includes(currentQuestion.id) && answerResult === 'correct' && (
                              <Badge variant="outline" className="ml-2 text-[10px]">
                                已从错题本移除
                              </Badge>
                            )}
                          </>
                        ) : (
                          <>
                            <XCircle className="size-5 text-red-500" />
                            <span className="text-red-600 dark:text-red-400">
                              {answerResult === 'self-wrong' ? '自评错误' : '判定为错'}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="mb-2 text-sm font-semibold">参考答案：</div>
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {currentQuestion.referenceAnswer}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {currentQuestion.explanation}
                      </p>

                      {/* 自评兜底 */}
                      {answerResult === 'wrong' && (
                        <div className="mt-3 flex items-center gap-2 border-t border-border/40 pt-3">
                          <HelpCircle className="size-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">判定不准？自己评分：</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={handleSelfCorrect}
                          >
                            我答对了
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs"
                            onClick={() => { /* 维持错判，不做什么 */ }}
                          >
                            我答错了
                          </Button>
                        </div>
                      )}
                      {answerResult === 'correct' && (
                        <div className="mt-3 flex items-center gap-2 border-t border-border/40 pt-3">
                          <HelpCircle className="size-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">其实答错了？</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-destructive"
                            onClick={handleSelfWrong}
                          >
                            改为错题
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex justify-end">
                      <Button onClick={nextQuestion}>
                        {currentIdx < questions.length - 1 ? '下一题' : '查看总分'}
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}

        {gameState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 text-center md:p-10">
              <div className="mb-4 text-6xl">{grade.icon}</div>
              <h3 className="mb-2 font-serif text-2xl font-bold md:text-3xl">
                得分：<span className="text-primary">{score * 10}</span> 分
              </h3>
              <p className={`mb-6 text-lg font-semibold ${grade.color}`}>
                评级：{grade.label}
              </p>

              <div className="mx-auto mb-6 max-w-xs space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">答对题数</span>
                  <span className="font-semibold">{score} / {questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">正确率</span>
                  <span className="font-semibold">
                    {questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">历史最高分</span>
                  <span className="font-semibold text-warning">
                    {Math.max(highScore, score * 10)} 分
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">错题本总数</span>
                  <span className="font-semibold text-destructive">{wrongList.length} 道</span>
                </div>
              </div>

              {wrongList.length > 0 && (
                <div className="mb-6">
                  <Button variant="outline" size="sm" onClick={() => setShowWrongReview((s) => !s)}>
                    {showWrongReview ? '收起' : '查看'}错题回顾
                  </Button>
                  {showWrongReview && (
                    <div className="mt-4 max-h-60 space-y-2 overflow-y-auto text-left">
                      {wrongQuestions.slice(0, 10).map((q) => (
                        <div key={q.id} className="rounded-md border border-border/40 bg-muted/20 p-3">
                          <div className="text-xs font-semibold">{q.question}</div>
                          <div className="mt-1 text-[11px] text-muted-foreground">
                            参考答案：{q.referenceAnswer.split('\n')[0].slice(0, 50)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3">
                <Button onClick={startQuiz} variant="secondary">
                  <RotateCcw className="mr-2 size-4" />
                  再练一组
                </Button>
                {wrongList.length > 0 && (
                  <Button onClick={startWrongOnly} variant="destructive">
                    <History className="mr-2 size-4" />
                    只练错题
                  </Button>
                )}
                <Button onClick={restart}>换个分类</Button>
                {onBack && (
                  <Button variant="outline" onClick={onBack}>返回</Button>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getGradeLabel(score: number, total: number): { label: string; color: string; icon: string } {
  if (total === 0) return { label: '初学', color: 'text-muted-foreground', icon: '' };
  const pct = score / total;
  if (pct >= 1) return { label: '史学大师', color: 'text-primary', icon: '' };
  if (pct >= 0.9) return { label: '通才', color: 'text-info', icon: '' };
  if (pct >= 0.7) return { label: '博闻', color: 'text-info', icon: '' };
  if (pct >= 0.4) return { label: '入门', color: 'text-green-500', icon: '' };
  return { label: '初学', color: 'text-muted-foreground', icon: '' };
}

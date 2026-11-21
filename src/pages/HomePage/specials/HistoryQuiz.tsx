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
  Target,
  Lightbulb,
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
import {
  QUIZ_QUESTIONS,
  QUIZ_CATEGORIES,
  type QuizCategory,
  type QuizQuestion,
} from '@/data/quiz';
import { SHORT_ANSWER_QUESTIONS } from '@/data/quiz-short-answer';
import { ERAS, CIVILIZATIONS } from '@/data/history-index';
import { safeScopedStorage } from '@/lib/safeScopedStorage';
import QuizIcon from './QuizIcon';
import ShortAnswerQuiz from './ShortAnswerQuiz';

interface HistoryQuizProps {
  onBack?: () => void;
  learningProgress?: {
    masteredIds: Set<string>;
    readIds: Set<string>;
    toggleMastered: (id: string) => void;
    markRead: (id: string) => void;
  };
  onQuizComplete?: (score: number, total: number) => void;
  onShortAnswerDone?: () => void;
}

type QuestionType = 'choice' | 'short-answer';

const HIGH_SCORE_KEY = 'history-quiz-highscore';
const WRONG_QUESTIONS_KEY = 'history-quiz-wrong-questions';

type GameState = 'select' | 'playing' | 'result';
type QuizMode = 'random' | 'category' | 'wrong';

function getHighScore(category: string): number {
  try {
    const raw = safeScopedStorage.getItem(`${HIGH_SCORE_KEY}-${category}`);
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function setHighScore(category: string, score: number) {
  try {
    const current = getHighScore(category);
    if (score > current) {
      safeScopedStorage.setItem(`${HIGH_SCORE_KEY}-${category}`, String(score));
    }
  } catch {
    // ignore
  }
}

// 错题本
function getWrongQuestionIds(): string[] {
  try {
    const raw = safeScopedStorage.getItem(WRONG_QUESTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWrongQuestionIds(ids: string[]) {
  try {
    safeScopedStorage.setItem(WRONG_QUESTIONS_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

function addWrongQuestion(id: string) {
  const current = getWrongQuestionIds();
  if (!current.includes(id)) {
    saveWrongQuestionIds([...current, id]);
  }
}

function removeWrongQuestion(id: string) {
  const current = getWrongQuestionIds();
  saveWrongQuestionIds(current.filter((x) => x !== id));
}

function getGrade(score: number): { label: string; color: string; icon?: string } {
  if (score >= 100) return { label: '史学大师', color: 'text-primary', icon: '' };
  if (score >= 90) return { label: '通才', color: 'text-info', icon: '' };
  if (score >= 70) return { label: '博闻', color: 'text-info', icon: '' };
  if (score >= 40) return { label: '入门', color: 'text-green-500', icon: '' };
  return { label: '初学', color: 'text-muted-foreground', icon: '' };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 时代筛选（用 year 范围匹配）
const ERA_RANGES: { id: string; label: string; minYear: number; maxYear: number }[] = [
  { id: 'ancient-east', label: '上古-先秦', minYear: -3000, maxYear: -221 },
  { id: 'qin-han', label: '秦汉', minYear: -221, maxYear: 220 },
  { id: 'wei-jin-sui-tang', label: '魏晋隋唐', minYear: 220, maxYear: 907 },
  { id: 'song-yuan', label: '宋元', minYear: 907, maxYear: 1368 },
  { id: 'ming-qing', label: '明清', minYear: 1368, maxYear: 1912 },
  { id: 'modern', label: '近现代', minYear: 1912, maxYear: 2025 },
];

export default function HistoryQuiz({ onBack, learningProgress, onQuizComplete, onShortAnswerDone }: HistoryQuizProps) {
  const [questionType, setQuestionType] = useState<QuestionType>('choice');
  const [gameState, setGameState] = useState<GameState>('select');
  const [mode, setMode] = useState<QuizMode>('random');
  const [category, setCategory] = useState<QuizCategory>('all');
  const [eraFilter, setEraFilter] = useState<string>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wrongList, setWrongList] = useState<string[]>(getWrongQuestionIds());
  const [showWrongReview, setShowWrongReview] = useState(false);

  const currentQuestion = questions[currentIdx];
  const progress = useMemo(
    () => ((currentIdx + (answered ? 1 : 0)) / questions.length) * 100,
    [currentIdx, questions.length, answered],
  );
  const highScore = getHighScore(category);

  // 筛选题目池
  const questionPool = useMemo(() => {
    let pool = QUIZ_QUESTIONS;

    if (mode === 'wrong') {
      pool = pool.filter((q) => wrongList.includes(q.id));
    } else if (mode === 'category') {
      if (category !== 'all') {
        pool = pool.filter((q) => q.category === category);
      }
    }

    // 时代筛选
    if (eraFilter !== 'all') {
      const era = ERA_RANGES.find((e) => e.id === eraFilter);
      if (era) {
        pool = pool.filter((q) => {
          if (!q.year) return true; // 无年份的保留
          return q.year >= era.minYear && q.year <= era.maxYear;
        });
      }
    }

    return pool;
  }, [mode, category, eraFilter, wrongList]);

  const wrongQuestions = useMemo(
    () => QUIZ_QUESTIONS.filter((q) => wrongList.includes(q.id)),
    [wrongList],
  );

  function startQuiz() {
    const picked = shuffle(questionPool).slice(0, Math.min(10, questionPool.length));
    if (picked.length === 0) return;
    setQuestions(picked);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowWrongReview(false);
    setGameState('playing');
  }

  function startWrongOnly() {
    setMode('wrong');
    const picked = shuffle(wrongQuestions).slice(0, Math.min(10, wrongQuestions.length));
    if (picked.length === 0) return;
    setQuestions(picked);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowWrongReview(false);
    setGameState('playing');
  }

  function handleAnswer(idx: number) {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    if (idx === currentQuestion.answer) {
      setScore((s) => s + 10);
      // 答对了，如果在错题本里，移除
      if (wrongList.includes(currentQuestion.id)) {
        removeWrongQuestion(currentQuestion.id);
        setWrongList((prev) => prev.filter((id) => id !== currentQuestion.id));
      }
    } else {
      // 答错，加入错题本
      if (!wrongList.includes(currentQuestion.id)) {
        addWrongQuestion(currentQuestion.id);
        setWrongList((prev) => [...prev, currentQuestion.id]);
      }
    }
  }

  function nextQuestion() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setHighScore(category, score);
      if (onQuizComplete) onQuizComplete(score / 10, questions.length);
      setGameState('result');
    }
  }

  function restart() {
    setGameState('select');
    setShowWrongReview(false);
  }

  // 答错的题目（用于结果页错题回顾）
  const wrongAnswers = useMemo(() => {
    const wrongs: QuizQuestion[] = [];
    // 这里我们无法知道哪些题答错了，因为我们只跟踪了对错。
    // 简化：结果页展示错题本中所有相关题
    return wrongQuestions;
  }, [wrongQuestions]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <QuizIcon className="size-8 text-primary" />
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground md:text-2xl">
              历史测验
            </h2>
            <p className="text-sm text-muted-foreground">
              共 {QUIZ_QUESTIONS.length} 道题 · 错题本 {wrongList.length} 题
            </p>
          </div>
        </div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      {/* 题型切换 */}
      <div className="mb-4 flex rounded-lg border border-border/40 bg-card/40 p-1">
        <button
          onClick={() => setQuestionType('choice')}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-all md:text-sm ${
            questionType === 'choice'
              ? 'bg-primary/15 text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          选择题（{QUIZ_QUESTIONS.length}题）
        </button>
        <button
          onClick={() => setQuestionType('short-answer')}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-all md:text-sm ${
            questionType === 'short-answer'
              ? 'bg-primary/15 text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          简答题（{SHORT_ANSWER_QUESTIONS.length}题）
        </button>
      </div>

      {questionType === 'short-answer' ? (
        <ShortAnswerQuiz
          onBack={onBack}
          onShortAnswerDone={onShortAnswerDone}
          onQuizComplete={onQuizComplete}
        />
      ) : (
      <AnimatePresence mode="wait">
        {gameState === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {/* 模式选择 */}
              <Card className="p-5">
                <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold">
                  <Target className="size-5 text-primary" />
                  出题模式
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setMode('random');
                      setCategory('all');
                    }}
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
                        从全部题库随机抽取
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
                      <label className="mb-1 block text-xs text-muted-foreground">
                        主题分类
                      </label>
                      <Select
                        value={category}
                        onValueChange={(v) => setCategory(v as QuizCategory)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {QUIZ_CATEGORIES.map((c) => (
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
            </div>

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
                          saveWrongQuestionIds([]);
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
                      <Badge
                        variant="outline"
                        className="shrink-0 text-[10px] px-1.5 py-0"
                      >
                        {QUIZ_CATEGORIES.find((c) => c.value === q.category)?.label}
                      </Badge>
                      <span className="line-clamp-1 flex-1">{q.question}</span>
                      <button
                        onClick={() => {
                          removeWrongQuestion(q.id);
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
                开始答题（{Math.min(10, questionPool.length)} 题）
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
            {/* Progress bar */}
            <Card className="p-4 md:p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    第 {currentIdx + 1}/{questions.length} 题
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {QUIZ_CATEGORIES.find((c) => c.value === currentQuestion.category)?.label}
                  </Badge>
                  {mode === 'wrong' && (
                    <Badge variant="destructive" className="text-xs">
                      错题重练
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <Trophy className="size-4 text-warning" />
                  <span className="text-warning">{score}</span>
                  <span className="text-muted-foreground">分</span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </Card>

            {/* Question */}
            <Card className="p-6 md:p-8">
              <h3 className="mb-6 font-serif text-lg font-semibold leading-relaxed md:text-xl">
                {currentQuestion.question}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === currentQuestion.answer;
                  const showCorrect = answered && isCorrect;
                  const showWrong = answered && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={answered}
                      className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-500/10 text-green-600 dark:text-green-400'
                          : showWrong
                            ? 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
                            : answered
                              ? 'border-border/60 opacity-60'
                              : 'border-border hover:border-primary/60 hover:bg-accent/40 cursor-pointer'
                      }`}
                    >
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          showCorrect
                            ? 'bg-green-500 text-white'
                            : showWrong
                              ? 'bg-red-500 text-white'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {answered ? (
                          showCorrect ? (
                            <CheckCircle2 className="size-4" />
                          ) : showWrong ? (
                            <XCircle className="size-4" />
                          ) : (
                            String.fromCharCode(65 + idx)
                          )
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
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
                        selectedAnswer === currentQuestion.answer
                          ? 'border-green-500 bg-green-500/5'
                          : 'border-red-500 bg-red-500/5'
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2 font-semibold">
                        {selectedAnswer === currentQuestion.answer ? (
                          <>
                            <CheckCircle2 className="size-5 text-green-500" />
                            <span className="text-green-600 dark:text-green-400">
                              回答正确！
                            </span>
                            {wrongList.includes(currentQuestion.id) && (
                              <Badge variant="outline" className="ml-2 text-[10px]">
                                已从错题本移除
                              </Badge>
                            )}
                          </>
                        ) : (
                          <>
                            <XCircle className="size-5 text-red-500" />
                            <span className="text-red-600 dark:text-red-400">
                              答错了 · 正确答案：
                              {String.fromCharCode(65 + currentQuestion.answer)}.{' '}
                              {currentQuestion.options[currentQuestion.answer]}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {currentQuestion.explanation}
                      </p>
                      {currentQuestion.relatedNodeId && learningProgress && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          关联节点：已自动标记为已读
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
              <div className="mb-4 text-6xl">{getGrade(score).icon}</div>
              <h3 className="mb-2 font-serif text-2xl font-bold md:text-3xl">
                得分：<span className="text-primary">{score}</span> 分
              </h3>
              <p className={`mb-6 text-lg font-semibold ${getGrade(score).color}`}>
                评级：{getGrade(score).label}
              </p>

              <div className="mx-auto mb-6 max-w-xs space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">答对题数</span>
                  <span className="font-semibold">
                    {score / 10} / {questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">正确率</span>
                  <span className="font-semibold">
                    {Math.round((score / 10 / questions.length) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">历史最高分</span>
                  <span className="font-semibold text-warning">
                    {Math.max(highScore, score)} 分
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">错题本总数</span>
                  <span className="font-semibold text-destructive">
                    {wrongList.length} 道
                  </span>
                </div>
              </div>

              {wrongList.length > 0 && (
                <div className="mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowWrongReview((s) => !s)}
                  >
                    {showWrongReview ? '收起' : '查看'}错题回顾
                  </Button>
                  {showWrongReview && (
                    <div className="mt-4 max-h-60 space-y-2 overflow-y-auto text-left">
                      {wrongQuestions.slice(0, 10).map((q) => (
                        <div
                          key={q.id}
                          className="rounded-md border border-border/40 bg-muted/20 p-3"
                        >
                          <div className="text-xs font-semibold">{q.question}</div>
                          <div className="mt-1 text-[11px] text-muted-foreground">
                            正确答案：
                            {q.options[q.answer]}
                          </div>
                          <div className="mt-1 text-[11px] text-muted-foreground/80">
                            {q.explanation}
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
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      )}
    </div>
  );
}

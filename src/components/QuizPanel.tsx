import { useState, useRef } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { SpeechBubble } from "@/components/SpeechBubble";
import { StarRow } from "@/components/StarRow";
import { Lightbulb, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { getQuiz } from "@/data/quizzes";
import type { GameId } from "@/data/topics";
import { useProgress } from "@/hooks/useProgress";
import Link from "next/link";
import confetti from "canvas-confetti";

interface QuizPanelProps {
  gameId: GameId;
  bgColor?: string;
}

function starsForScore(score: number, total: number): number {
  const ratio = score / total;
  if (ratio >= 0.95) return 3;
  if (ratio >= 0.6) return 2;
  if (ratio >= 0.2) return 1;
  return 0;
}

export function QuizPanel({ gameId, bgColor }: QuizPanelProps) {
  const { t, lang } = useLang();
  const { setGameStars, getGameStars } = useProgress();
  const questions = getQuiz(gameId, lang);

  const [collapsed, setCollapsed] = useState(false);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [earned, setEarned] = useState<number>(0);

  // New Quiz Engine States
  const [answerStates, setAnswerStates] = useState<("idle" | "correct" | "wrong")[]>([]);
  const [tryAgainVisible, setTryAgainVisible] = useState(false);
  const [hintOpen, setHintOpen] = useState(true);

  // Refs for tracking without re-rendering
  const hasAnsweredCurrentRef = useRef(false);
  const firstAttemptResults = useRef<boolean[]>([]);
  const correctAnswerRef = useRef<number | null>(null);

  const q = questions[index];
  const total = questions.length;

  function handleAnswer(i: number) {
    // Prevent clicking if locked or already wrong
    if (correctAnswerRef.current !== null || answerStates[i] === "wrong") return;

    const isCorrect = i === q.correctIndex;

    // Track first attempt for scoring
    if (!hasAnsweredCurrentRef.current) {
      hasAnsweredCurrentRef.current = true;
      firstAttemptResults.current.push(isCorrect);
    }

    if (!isCorrect) {
      // Handle Wrong Answer
      setAnswerStates((prev) => {
        const next = [...prev];
        next[i] = "wrong";
        return next;
      });
      setTryAgainVisible(true);

      // Reset the shake state after animation so it can be clicked again if needed
      // but keep it greyed out or just remove the animation class
      setTimeout(() => {
        setAnswerStates((prev) => {
          const next = [...prev];
          // Keep it wrong to show it's disabled, the animate-shake class
          // runs once when it becomes 'wrong'
          return next;
        });
      }, 500);
    } else {
      // Handle Correct Answer
      setAnswerStates((prev) => {
        const next = [...prev];
        next[i] = "correct";
        return next;
      });
      setTryAgainVisible(false);
      correctAnswerRef.current = i;

      // Confetti logic
      const btn = document.getElementById(`quiz-opt-${i}`);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { x, y },
          colors: ["#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B"],
          disableForReducedMotion: true,
          zIndex: 1000,
        });
      }

      // Hold delay before advancing
      setTimeout(() => {
        if (index + 1 >= total) {
          const finalScore = firstAttemptResults.current.filter(Boolean).length;
          const stars = starsForScore(finalScore, total);
          setEarned(stars);
          setGameStars(gameId, stars);
          setDone(true);
        } else {
          // Advance to next question
          setIndex(index + 1);
          setAnswerStates([]);
          // hint visibility intentionally preserved across questions
          setTryAgainVisible(false);
          hasAnsweredCurrentRef.current = false;
          correctAnswerRef.current = null;
        }
      }, 800); // 800ms hold to see confetti
    }
  }

  if (collapsed) {
    return (
      <aside
        className="rounded-3xl bg-lilac-soft p-3 shadow-card"
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        <button
          onClick={() => setCollapsed(false)}
          className="flex w-full items-center justify-between text-left text-lg font-extrabold text-navy"
          aria-label="Expand quiz"
        >
          <span>{t.quiz}</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-card">
            <Plus size={18} />
          </span>
        </button>
      </aside>
    );
  }

  if (done) {
    const previousBest = getGameStars(gameId);
    return (
      <aside
        className="flex h-full flex-col rounded-3xl bg-lilac-soft p-6 shadow-card"
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        <h2 className="text-3xl font-extrabold text-navy">{t.quizCompleteTitle}</h2>
        <p className="mt-2 text-base font-bold text-navy/70">{t.quizCompleteSub(earned)}</p>
        <div className="mt-6 flex items-center justify-center">
          <StarRow filled={Math.max(previousBest, earned)} size={48} />
        </div>
        <div className="mt-auto pt-6">
          <Link
            href="/topic/states-of-matter"
            className="btn-pop block rounded-full bg-primary px-6 py-3 text-center font-extrabold text-primary-foreground"
          >
            {t.backToTopicBtn}
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="relative flex h-full flex-col rounded-3xl bg-lilac-soft p-5 shadow-card"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-navy">{t.quiz}</h2>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm font-extrabold text-navy/80">
              {t.questionOf(index + 1, total)}
            </span>
            <div className="flex items-center gap-1">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i < index
                      ? "bg-primary w-2 opacity-60"
                      : i === index
                        ? "bg-primary w-5"
                        : "bg-lilac/50 w-2 opacity-40",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-card text-navy"
          aria-label="Collapse quiz"
        >
          <Minus size={18} />
        </button>
      </div>

      {/* Question */}
      <h3 className="mt-5 text-xl font-extrabold leading-snug text-navy">{q.question}</h3>

      {/* Options */}
      <ul className="mt-4 space-y-3">
        {q.options.map((opt, i) => {
          const state = answerStates[i] ?? "idle";
          const isLocked = correctAnswerRef.current !== null;

          return (
            <li key={i}>
              <button
                id={`quiz-opt-${i}`}
                onClick={() => handleAnswer(i)}
                disabled={isLocked || state === "wrong"}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start text-base font-bold transition-all",
                  state === "idle" && "bg-card text-navy hover:bg-card/80",
                  state === "correct" && "bg-success/20 ring-2 ring-success text-navy",
                  state === "wrong" &&
                    "bg-slate-200 text-slate-500 animate-shake ring-2 ring-slate-300",
                  isLocked && state !== "correct" && "opacity-50 pointer-events-none",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-extrabold",
                    state === "idle" && "bg-lilac-soft text-primary",
                    state === "correct" && "bg-success text-success-foreground",
                    state === "wrong" && "bg-slate-300 text-slate-500",
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="leading-snug">{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Try Again Feedback */}
      {tryAgainVisible && (
        <p className="mt-3 text-center font-bold text-slate-500 animate-in fade-in slide-in-from-top-1">
          Not quite — try again!
        </p>
      )}

      {/* Hint */}
      <div className="mt-5 flex items-end gap-3">
        <button
          onClick={() => setHintOpen((v) => !v)}
          className="btn-pop inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-extrabold text-navy"
        >
          <Lightbulb size={16} />
          {hintOpen ? "Hide hint" : "Show hint"}
        </button>
        {hintOpen && (
          <div className="flex-1 animate-in slide-in-from-bottom-2 fade-in duration-300">
            <SpeechBubble variant="white" className="max-w-[220px]">
              {q.hint}
            </SpeechBubble>
          </div>
        )}
      </div>

      {/* Stars */}
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-sm font-extrabold text-navy/80">{t.starsYouCanEarn}</span>
        <StarRow filled={0} outlineOnly size={28} />
      </div>
    </aside>
  );
}

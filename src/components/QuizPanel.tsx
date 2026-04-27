import { useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { CharacterSlot } from "@/components/CharacterSlot";
import { SpeechBubble } from "@/components/SpeechBubble";
import { StarRow } from "@/components/StarRow";
import { Lightbulb, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { getQuiz } from "@/data/quizzes";
import type { GameId } from "@/data/topics";
import { useProgress } from "@/hooks/useProgress";
import { Link } from "@tanstack/react-router";

interface QuizPanelProps {
  gameId: GameId;
}

function starsForScore(score: number, total: number): number {
  const ratio = score / total;
  if (ratio >= 0.95) return 3;
  if (ratio >= 0.6) return 2;
  if (ratio >= 0.2) return 1;
  return 0;
}

export function QuizPanel({ gameId }: QuizPanelProps) {
  const { t, lang } = useLang();
  const { setGameStars, getGameStars } = useProgress();
  const questions = getQuiz(gameId, lang);

  const [collapsed, setCollapsed] = useState(false);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [earned, setEarned] = useState<number>(0);

  const q = questions[index];
  const total = questions.length;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === q.correctIndex;
    const newScore = score + (correct ? 1 : 0);
    if (correct) setScore(newScore);
    window.setTimeout(() => {
      if (index + 1 >= total) {
        const stars = starsForScore(newScore, total);
        setEarned(stars);
        setGameStars(gameId, stars);
        setDone(true);
      } else {
        setIndex(index + 1);
        setPicked(null);
        setHintOpen(false);
      }
    }, 900);
  }

  if (collapsed) {
    return (
      <aside className="rounded-3xl bg-lilac-soft p-3 shadow-card">
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
      <aside className="flex h-full flex-col rounded-3xl bg-lilac-soft p-6 shadow-card">
        <h2 className="text-3xl font-extrabold text-navy">{t.quizCompleteTitle}</h2>
        <p className="mt-2 text-base font-bold text-navy/70">{t.quizCompleteSub(earned)}</p>
        <div className="mt-6 flex items-center justify-center">
          <StarRow filled={Math.max(previousBest, earned)} size={48} />
        </div>
        <div className="mt-auto pt-6">
          <Link
            to="/topic/$topicId"
            params={{ topicId: "states-of-matter" }}
            className="btn-pop block rounded-full bg-primary px-6 py-3 text-center font-extrabold text-primary-foreground"
          >
            {t.backToTopicBtn}
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className="relative flex h-full flex-col rounded-3xl bg-lilac-soft p-5 shadow-card">
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
                    "h-2 w-4 rounded-full",
                    i < index ? "bg-primary" : i === index ? "bg-primary" : "bg-lilac/50",
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
      <h3 className="mt-5 text-xl font-extrabold leading-snug text-navy">
        {q.question}
      </h3>

      {/* Options */}
      <ul className="mt-4 space-y-3">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.correctIndex;
          const reveal = picked !== null;
          return (
            <li key={i}>
              <button
                onClick={() => pick(i)}
                disabled={picked !== null}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-3 text-start text-base font-bold text-navy transition-colors",
                  reveal && isCorrect && "bg-success/20 ring-2 ring-success",
                  reveal && isPicked && !isCorrect && "bg-destructive/15 ring-2 ring-destructive",
                  !reveal && "hover:bg-card/80",
                )}
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lilac-soft font-extrabold text-primary">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="leading-snug">{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Hint */}
      <div className="relative mt-5 flex items-end gap-3">
        <button
          onClick={() => setHintOpen((v) => !v)}
          className="btn-pop inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-extrabold text-navy"
        >
          <Lightbulb size={16} />
          {t.getHint}
        </button>
        {hintOpen && (
          <SpeechBubble variant="white" className="max-w-[220px] flex-1">
            {q.hint}
          </SpeechBubble>
        )}
        <CharacterSlot id="hint-cat" blobClass="bg-transparent" className="ms-auto h-20 w-20">
          <span className="text-5xl">🙈</span>
        </CharacterSlot>
      </div>

      {/* Stars */}
      <div className="mt-5 flex items-center justify-between border-t border-lilac/30 pt-4">
        <span className="text-sm font-extrabold text-navy/80">{t.starsYouCanEarn}</span>
        <StarRow filled={0} outlineOnly size={28} />
      </div>
    </aside>
  );
}

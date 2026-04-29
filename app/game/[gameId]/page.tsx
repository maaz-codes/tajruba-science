"use client";

import { use, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FlaskConical, Home, Atom, Layers, Package } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SoundToggle } from "@/components/SoundToggle";
import { StarsCounter } from "@/components/StarsCounter";
import { QuizPanel } from "@/components/QuizPanel";
import { useProgress } from "@/hooks/useProgress";
import { TOPICS, GAME_SUB_TOPICS, type GameId } from "@/data/topics";

const VALID_GAMES = TOPICS["states-of-matter"].games.map((g) => g.id);

export default function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId: rawGameId } = use(params);
  const gameId = rawGameId as GameId;

  if (!VALID_GAMES.includes(gameId)) {
    notFound();
  }

  const { t } = useLang();
  const { getTopicStars, getTopicMaxStars } = useProgress();
  const earned = getTopicStars("states-of-matter");
  const max = getTopicMaxStars("states-of-matter");

  const meta = t.games[gameId];

  return (
    <main className="min-h-screen bg-background px-3 pt-12 pb-4 md:px-12">
      {/* Top bar */}
      <header className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="btn-pop inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Home"
          >
            <Home size={20} />
          </Link>
          <Link
            href="/topic/states-of-matter"
            className="inline-flex items-center gap-2 text-lg font-extrabold text-navy"
          >
            <ArrowLeft className="rtl-flip" />
            {t.backToTopic}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <SoundToggle variant="pill" />
          <LanguageSwitcher />
          <StarsCounter current={earned} total={max} />
        </div>
      </header>

      <div className="mx-auto mt-4 grid max-w-[1400px] grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        {/* Game panel */}
        <section className="relative overflow-hidden rounded-3xl bg-sun-soft/60 p-5 shadow-card">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sun text-navy shadow-card">
              <FlaskConical size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-navy md:text-3xl">{meta.title}</h1>
              <p className="text-sm font-bold text-navy/70">{meta.subtitle}</p>
            </div>
          </div>

          {/* Phaser game mount point — plug the Phaser scene for this gameId here */}
          <PhaserGameContainer gameId={gameId} />
        </section>

        {/* Quiz panel */}
        <QuizPanel gameId={gameId} bgColor={QUIZ_BG[gameId]} />
      </div>

      {/* Sub-topics covered */}
      <div className="mx-auto mt-4 max-w-[1400px]">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-widest text-navy/50">Sub-topics covered</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {([<Atom size={20} />, <Layers size={20} />, <Package size={20} />] as const).map((icon, i) => ({
              icon, text: GAME_SUB_TOPICS[gameId][i],
            })).map(({ icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-lilac/40 bg-card px-4 py-3 shadow-sm">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
              </span>
              <p className="text-sm font-bold leading-snug text-navy/80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const QUIZ_BG: Record<GameId, string | undefined> = {
  "make-your-own-matter": undefined,  // keeps default lilac-soft
  "water-the-plant":  "#CEECDF",
  "wadi-crossing":    "#FEE6BE",
  "mosque-systems":   "#53D4C1",
};

const GAME_PREVIEWS: Record<GameId, string | null> = {
  "make-your-own-matter": "/game-1-ref.png",
  "water-the-plant": "/game-2-ref.png",
  "wadi-crossing": "/game-3-ref.png",
  "mosque-systems": "/game-4-ref.png",
};

const COMING_SOON_GAMES = new Set<GameId>(["water-the-plant", "wadi-crossing", "mosque-systems"]);

/**
 * Container where each game's Phaser scene will be mounted.
 * Shows a preview image if one exists, otherwise a "coming soon" placeholder.
 * Once the Phaser scene for a game is ready, mount it into the div via the ref.
 */
function PhaserGameContainer({ gameId }: { gameId: GameId }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);   // 0–100
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (gameId !== "make-your-own-matter" || !containerRef.current) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    import("@/games/make-your-own-matter").then(({ mount, unmount }) => {
      if (cancelled || !containerRef.current) return;
      mount(containerRef.current, (pct) => {
        setProgress(pct);
        if (pct >= 100) setTimeout(() => setReady(true), 200);
      });
      cleanup = unmount;
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [gameId]);

  // Non-playable games fall back to preview image with a "coming soon" overlay
  if (COMING_SOON_GAMES.has(gameId)) {
    const preview = GAME_PREVIEWS[gameId];
    return (
      <div className="relative mt-4 min-h-[420px] w-full overflow-hidden rounded-2xl bg-card/70">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Game preview"
              width={1280}
              height={720}
              loading="lazy"
              className="h-full w-full object-cover blur-[2px] scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-extrabold uppercase tracking-widest text-white backdrop-blur-sm">
                Coming Soon
              </span>
              <p className="mt-2 text-xs font-bold text-white/60">This game is currently in development</p>
            </div>
          </>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center">
            <p className="text-sm font-bold text-navy/50">Game coming soon</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative mt-4 min-h-[420px] w-full overflow-hidden rounded-2xl bg-card/70">
      {/* Loading skeleton — hidden once game is ready */}
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-lilac-soft/60 rounded-2xl z-10">
          <div className="flex flex-col items-center gap-3 w-48">
            {/* Spinner */}
            <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm font-extrabold text-navy/70">Loading game…</p>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-primary/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs font-bold text-navy/40">{progress}%</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        id={`phaser-game-${gameId}`}
        className="w-full h-full"
      />
    </div>
  );
}

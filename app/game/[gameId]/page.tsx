"use client";

import { use, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FlaskConical, Home } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SoundToggle } from "@/components/SoundToggle";
import { StarsCounter } from "@/components/StarsCounter";
import { QuizPanel } from "@/components/QuizPanel";
import { useProgress } from "@/hooks/useProgress";
import { TOPICS, type GameId } from "@/data/topics";

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
        <QuizPanel gameId={gameId} />
      </div>
    </main>
  );
}

// Map each gameId to its preview image path (in /public). Set to null when none exists.
const GAME_PREVIEWS: Record<GameId, string | null> = {
  "make-your-own-matter": "/game-1-ref.png",
  "water-the-plant": null,
  "wadi-crossing": null,
  "mosque-systems": null,
};

/**
 * Container where each game's Phaser scene will be mounted.
 * Shows a preview image if one exists, otherwise a "coming soon" placeholder.
 * Once the Phaser scene for a game is ready, mount it into the div via the ref.
 */
function PhaserGameContainer({ gameId }: { gameId: GameId }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const preview = GAME_PREVIEWS[gameId];

  return (
    <div
      ref={containerRef}
      id={`phaser-game-${gameId}`}
      className="mt-4 min-h-[420px] w-full overflow-hidden rounded-2xl bg-card/70"
    >
      {preview ? (
        // Preview image — replace with Phaser canvas once the scene is wired up
        <img
          src={preview}
          alt="Game preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex min-h-[420px] items-center justify-center">
          <p className="text-sm font-bold text-navy/50">Game coming soon</p>
        </div>
      )}
    </div>
  );
}

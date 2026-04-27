"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FlaskConical, Home } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SoundToggle } from "@/components/SoundToggle";
import { CharacterSlot } from "@/components/CharacterSlot";
import { StarsCounter } from "@/components/StarsCounter";
import { QuizPanel } from "@/components/QuizPanel";
import { useProgress } from "@/hooks/useProgress";
import { TOPICS, type GameId } from "@/data/topics";
import { cn } from "@/lib/utils";

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

  // Only the first game has the full sim mock; others get a friendly placeholder.
  const isMatter = gameId === "make-your-own-matter";

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
        {/* Simulation panel */}
        <section className="relative overflow-hidden rounded-3xl bg-sun-soft/60 p-5 shadow-card">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sun text-navy shadow-card">
                <FlaskConical size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-navy md:text-3xl">{meta.title}</h1>
                <p className="text-sm font-bold text-navy/70">{meta.subtitle}</p>
              </div>
            </div>
            {isMatter && (
              <div className="rounded-2xl bg-pink-soft px-4 py-2 text-center">
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-navy/70">
                  {t.particlesAdded}
                </div>
                <div className="text-lg font-extrabold text-navy">12 / 50</div>
              </div>
            )}
          </div>

          {isMatter ? <MatterSimMock /> : <ComingSoonGame />}
        </section>

        {/* Quiz panel */}
        <QuizPanel gameId={gameId} />
      </div>
    </main>
  );
}

function MatterSimMock() {
  const { t } = useLang();
  const [temp, setTemp] = useState(20);

  return (
    <div className="mt-4 grid grid-cols-[180px_1fr_120px] gap-4">
      {/* Left: choose particles */}
      <div className="rounded-2xl bg-card/80 p-3">
        <h3 className="text-center text-sm font-extrabold text-navy">{t.chooseParticles}</h3>
        <div className="mt-3 space-y-3">
          <ParticleCard color="bg-sky-soft" name={t.gas} desc={t.gasShort} emoji="💨" textColor="text-sky" id="gas-particle" />
          <ParticleCard color="bg-mint-soft" name={t.liquid} desc={t.liquidShort} emoji="💧" textColor="text-teal" id="liquid-particle" />
          <ParticleCard color="bg-lilac-soft" name={t.solid} desc={t.solidShort} emoji="🟪" textColor="text-primary" id="solid-particle" />
        </div>
        <p className="mt-3 flex items-start gap-1 text-[11px] font-bold leading-snug text-navy/60">
          <span>👆</span>
          {t.dragHint}
        </p>
      </div>

      {/* Center: jar */}
      <div className="relative flex flex-col items-center justify-end rounded-2xl bg-cream-soft p-4">
        <span className="absolute left-6 top-4 text-2xl opacity-70">☁️</span>
        <span className="absolute right-8 top-8 text-xl opacity-70">☁️</span>
        {/* Shelf */}
        <div className="absolute right-4 top-4 flex items-end gap-1">
          <span className="text-2xl">🪴</span>
          <span className="text-2xl">⚗️</span>
        </div>
        {/* Jar */}
        <div className="relative flex h-64 w-56 flex-col items-center">
          <div className="h-full w-full rounded-b-[40%] rounded-t-[28%] border-4 border-sky/60 bg-card/40 shadow-inner" />
          {/* platform */}
          <div className="-mt-2 h-4 w-64 rounded-full bg-teal shadow-card" />
        </div>
        {/* Floor */}
        <div className="mt-2 h-6 w-full rounded-md bg-[repeating-linear-gradient(45deg,oklch(0.92_0.04_80),oklch(0.92_0.04_80)_10px,oklch(0.88_0.04_80)_10px,oklch(0.88_0.04_80)_20px)]" />
      </div>

      {/* Right: thermometer */}
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-extrabold text-navy">{t.temperature}</h3>
        <span className="mt-2 text-xs font-extrabold text-sky">{t.cool}</span>
        <div className="relative mt-1 flex h-56 w-8 items-end justify-center rounded-full bg-cream-soft ring-2 ring-border">
          <div
            className="w-full rounded-full bg-gradient-to-t from-coral via-sun to-sky"
            style={{ height: `${temp + 30}%`, maxHeight: "100%" }}
          />
          <input
            type="range"
            min={0}
            max={50}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
            aria-label={t.temperature}
          />
          <div
            className="pointer-events-none absolute -translate-y-1/2 rounded-full bg-sky px-2 py-1 text-xs font-extrabold text-navy ring-2 ring-card shadow-card"
            style={{ bottom: `${temp + 25}%`, left: "50%", transform: "translateX(-50%)" }}
          >
            {temp}°C
          </div>
        </div>
        <span className="mt-1 text-xs font-extrabold text-coral">{t.hot}</span>
      </div>

      {/* Legend */}
      <div className="col-span-3 mt-2 flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-card/70 px-4 py-3">
        <LegendItem emoji="🟪" label={t.solid} desc={t.solidLegend} color="text-primary" />
        <LegendItem emoji="💧" label={t.liquid} desc={t.liquidLegend} color="text-teal" />
        <LegendItem emoji="💨" label={t.gas} desc={t.gasLegend} color="text-sky" />
      </div>
    </div>
  );
}

function ParticleCard({
  color,
  name,
  desc,
  emoji,
  textColor,
  id,
}: {
  color: string;
  name: string;
  desc: string;
  emoji: string;
  textColor: string;
  id: string;
}) {
  return (
    <div className={cn("flex cursor-grab items-center gap-2 rounded-xl p-2 transition-transform hover:-translate-y-0.5", color)}>
      <CharacterSlot id={id} blobClass="bg-transparent" className="h-10 w-10">
        <span className="text-2xl">{emoji}</span>
      </CharacterSlot>
      <div>
        <div className={cn("text-sm font-extrabold", textColor)}>{name}</div>
        <div className="text-[10px] font-bold leading-tight text-navy/70">{desc}</div>
      </div>
    </div>
  );
}

function LegendItem({ emoji, label, desc, color }: { emoji: string; label: string; desc: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl">{emoji}</span>
      <div>
        <div className={cn("text-sm font-extrabold", color)}>{label}</div>
        <div className="text-[10px] font-bold text-navy/70">{desc}</div>
      </div>
    </div>
  );
}

function ComingSoonGame() {
  const { t } = useLang();
  return (
    <div className="mt-6 flex min-h-[360px] flex-col items-center justify-center rounded-2xl bg-card/70 p-8 text-center">
      <span className="text-6xl">🚧</span>
      <p className="mt-4 max-w-md text-base font-bold text-navy/80">{t.comingSoonBody}</p>
      <Link
        href="/topic/states-of-matter"
        className="btn-pop mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground"
      >
        <ArrowLeft size={18} className="rtl-flip" /> {t.backToTopicBtn}
      </Link>
    </div>
  );
}

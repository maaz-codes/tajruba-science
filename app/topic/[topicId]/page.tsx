"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SoundToggle } from "@/components/SoundToggle";
import { CharacterSlot } from "@/components/CharacterSlot";
import { SpeechBubble } from "@/components/SpeechBubble";
import { StarRow } from "@/components/StarRow";
import { StarsCounter } from "@/components/StarsCounter";
import { useProgress } from "@/hooks/useProgress";
import { TOPICS, type TopicId } from "@/data/topics";
import { cn } from "@/lib/utils";

export default function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId: rawTopicId } = use(params);
  const topicId = rawTopicId as TopicId;
  
  if (!(topicId in TOPICS)) {
    notFound();
  }

  const { t } = useLang();
  const topic = TOPICS[topicId];
  const { getGameStars, getTopicStars, getTopicMaxStars, getNextGame } = useProgress();
  const earned = getTopicStars(topicId);
  const max = getTopicMaxStars(topicId);
  const nextId = getNextGame(topicId);

  const gameMeta = (id: keyof typeof t.games) => t.games[id];

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-8">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          href="/"
          className="btn-pop inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-extrabold text-navy"
        >
          <ArrowLeft size={18} className="rtl-flip" />
          <span>{t.allTopics}</span>
        </Link>
        <div className="flex items-center gap-3">
          <SoundToggle variant="switch" />
          <LanguageSwitcher />
        </div>
      </header>

      {/* Title row */}
      <section className="mx-auto mt-6 max-w-6xl text-center">
        <div className="relative flex items-start justify-center">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-navy md:text-6xl">
              {t.statesOfMatterTitle}
            </h1>
            <p className="mt-2 text-base font-bold text-navy/70 md:text-lg">
              {t.statesOfMatterIntro1}
              <br />
              {t.statesOfMatterIntro2}
            </p>
          </div>
          <div className="absolute end-2 top-2">
            <StarsCounter current={earned} total={max} />
          </div>
        </div>
      </section>

      {/* Concept characters */}
      <section className="mx-auto mt-8 flex max-w-6xl items-end justify-center gap-6 md:gap-12">
        <ConceptChar id="solid-cube" blob="bg-transparent" emoji="🧊" label={t.solid} />
        <ConceptChar id="liquid-droplet" blob="bg-transparent" emoji="💧" label={t.liquid} />
        <ConceptChar id="gas-cloud" blob="bg-transparent" emoji="☁️" label={t.gas} />
        <div className="hidden items-end gap-2 md:flex">
          <SpeechBubble variant="yellow" tail="right" className="mb-6 max-w-[180px]">
            {t.letsExploreMatter}
          </SpeechBubble>
          <CharacterSlot id="cat-explorer" blobClass="bg-transparent" className="h-40 w-40 [&_img]:scale-[2]" float>
            <span className="text-5xl">🐱</span>
          </CharacterSlot>
        </div>
      </section>

      {/* Game cards row with dashed connector */}
      <section className="relative mx-auto mt-8 max-w-7xl px-2">
        <div className="dashed-connector pointer-events-none absolute left-0 right-0 top-[160px] hidden h-1 md:block" aria-hidden />
        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topic.games.map((g) => {
            const meta = gameMeta(g.id);
            const stars = getGameStars(g.id);
            const isNext = g.id === nextId;
            return (
              <Link
                key={g.id}
                href={`/game/${g.id}`}
                className={cn(
                  "group relative block rounded-3xl bg-card p-4 shadow-card transition-transform hover:-translate-y-1",
                  isNext && "ring-4 ring-primary/70",
                )}
              >
                {/* Number badge */}
                <span className="absolute -top-3 start-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sun text-base font-extrabold text-navy shadow-card">
                  {g.number}
                </span>
                {/* Start here badge */}
                {isNext && (
                  <span className="absolute -top-3 end-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-extrabold text-primary-foreground shadow-card">
                    <Star size={12} className="fill-current" />
                    {t.startHere}
                  </span>
                )}

                <div className={cn("flex h-36 items-center justify-center rounded-2xl overflow-hidden", g.bgClass)}>
                  <CharacterSlot id={g.characterSlot} blobClass="bg-transparent" className="h-full w-full !rounded-2xl">
                    <span className="text-6xl">{cardEmoji(g.id)}</span>
                  </CharacterSlot>
                </div>

                <h3 className="mt-3 text-lg font-extrabold text-navy">{meta.title}</h3>
                <p className="mt-1 text-xs font-bold leading-snug text-navy/70">{meta.desc}</p>
                <StarRow filled={stars} className="mt-3" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer line */}
      <p className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-3 pb-8 text-center text-base font-extrabold text-navy">
        <span className="text-pink">〰</span>
        {t.playInOrder}
        <span className="text-pink">〰</span>
      </p>
    </main>
  );
}

function ConceptChar({
  id,
  blob,
  emoji,
  label,
}: {
  id: string;
  blob: string;
  emoji: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <CharacterSlot id={id} blobClass={blob} className="h-28 w-28 [&_img]:scale-125" float>
        <span className="text-6xl">{emoji}</span>
      </CharacterSlot>
      <span className="mt-2 text-lg font-extrabold text-navy">{label}</span>
    </div>
  );
}

function cardEmoji(id: string): string {
  switch (id) {
    case "make-your-own-matter":
      return "🐼";
    case "water-the-plant":
      return "🪴";
    case "wadi-crossing":
      return "🌵";
    case "mosque-systems":
      return "🕌";
    default:
      return "✨";
  }
}

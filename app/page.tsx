"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SoundToggle } from "@/components/SoundToggle";
import { Wordmark } from "@/components/Wordmark";
import { CharacterSlot } from "@/components/CharacterSlot";
import { StarRow } from "@/components/StarRow";
import { useProgress } from "@/hooks/useProgress";
import { TOPICS } from "@/data/topics";

export default function Landing() {
  const { t } = useLang();
  const { getTopicStars, getTopicMaxStars } = useProgress();

  const statesStars = getTopicStars("states-of-matter");
  const statesMax = getTopicMaxStars("states-of-matter");

  return (
    <main className="min-h-screen bg-background px-4 pt-12 pb-16 md:px-12">
      {/* Top bar */}
      <header className="relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-6">
        <SoundToggle variant="icon" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Wordmark />
        </div>
        <LanguageSwitcher compact />
      </header>

      {/* Hero */}
      <section className="relative mx-auto mt-12 flex max-w-7xl items-center justify-center lg:mt-20">
        {/* Left mascot */}
        <div className="absolute left-0 top-6 hidden md:block">
          <CharacterSlot
            id="panda-scientist"
            blobClass="bg-transparent"
            className="h-80 w-80"
            float
            label="Panda"
          />
        </div>
        {/* Right mascot */}
        <div className="absolute right-0 top-10 hidden md:block">
          <CharacterSlot
            id="magnifier-bird"
            blobClass="bg-transparent"
            className="h-80 w-80"
            float
            label="Bird"
          >
            <span className="text-5xl">🦉</span>
            <span className="-mt-1 text-2xl">🔍</span>
          </CharacterSlot>
        </div>

        <div className="z-10 flex max-w-3xl flex-col items-center text-center">
          <h2 className="whitespace-pre-line text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
            {t.heroTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base font-bold text-navy/70 md:text-lg">
            {t.heroSubtitle}
          </p>
          <Link
            href="/topic/states-of-matter"
            className="btn-pop mt-8 inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-lg font-extrabold text-primary-foreground"
          >
            {t.letsGo}
          </Link>
        </div>
      </section>

      {/* Topic cards */}
      <section className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 lg:mt-24">
        {/* Active: States of Matter */}
        <Link
          href="/topic/states-of-matter"
          className="group relative block overflow-hidden rounded-3xl bg-card ring-4 ring-sky shadow-card transition-transform hover:-translate-y-1"
        >
          <div className="relative flex h-44 items-end justify-center bg-white p-4">
            <CharacterSlot
              id="topic-states-cover"
              blobClass="bg-transparent"
              className="absolute inset-0 m-4 !rounded-xl overflow-hidden"
              label="States of Matter"
            >
              <div className="flex items-end gap-2 text-5xl">
                <span>🧒</span>
                <span>🧊</span>
                <span>💧</span>
                <span>☁️</span>
              </div>
            </CharacterSlot>
            <span className="absolute -end-3 bottom-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card rtl-flip">
              <ChevronRight />
            </span>
          </div>
          <div className="px-5 py-4">
            <h3 className="text-xl font-extrabold text-navy">{t.statesOfMatterTitle}</h3>
            <StarRow filled={Math.min(3, Math.round((statesStars / statesMax) * 3))} className="mt-2" />
          </div>
        </Link>

        {/* Coming soon #1 */}
        <ComingSoonCard
          id="topic-coming-soon"
          blob="bg-pink-soft"
          icon="🚧"
          label={t.comingSoon}
        />
        {/* Coming soon #2 */}
        <ComingSoonCard
          id="topic-coming-flag"
          blob="bg-mint-soft"
          icon="🚩"
          label={t.comingSoon}
        />
      </section>

    </main>
  );
}

function ComingSoonCard({ id, blob, icon, label }: { id: string; blob: string; icon: string; label: string }) {
  return (
    <div className="block overflow-hidden rounded-3xl bg-card/60 opacity-80 shadow-card">
      <div className="relative flex h-44 items-center justify-center bg-white p-4">
        <CharacterSlot id={id} blobClass="bg-transparent" className="absolute inset-0 m-4 !rounded-xl overflow-hidden">
          <span className="text-6xl">{icon}</span>
        </CharacterSlot>
      </div>
      <div className="px-5 py-4">
        <h3 className="text-xl font-extrabold text-navy">{label}</h3>
        <StarRow filled={0} outlineOnly className="mt-2" />
      </div>
    </div>
  );
}

// ensure TOPICS import is used
void TOPICS;

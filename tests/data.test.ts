import { describe, it, expect } from "vitest";
import { TOPICS, GAME_SUB_TOPICS } from "@/data/topics";
import type { GameId } from "@/data/topics";
import { getQuiz } from "@/data/quizzes";
import { STRINGS } from "@/i18n/strings";
import { CHARACTER_IMAGES } from "@/assets/characters";

const GAME_IDS: GameId[] = TOPICS["states-of-matter"].games.map((g) => g.id);

// ─── Topic structure ───────────────────────────────────────────────────────────

describe("TOPICS structure", () => {
  it("has exactly 4 games", () => {
    expect(TOPICS["states-of-matter"].games).toHaveLength(4);
  });

  it("game numbers are 1–4 with no duplicates", () => {
    const numbers = TOPICS["states-of-matter"].games.map((g) => g.number);
    expect(numbers.sort()).toEqual([1, 2, 3, 4]);
  });

  it("game IDs are unique", () => {
    const ids = TOPICS["states-of-matter"].games.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every game has a non-empty characterSlot and bgClass", () => {
    for (const game of TOPICS["states-of-matter"].games) {
      expect(game.characterSlot.length).toBeGreaterThan(0);
      expect(game.bgClass.length).toBeGreaterThan(0);
    }
  });

  it("every characterSlot referenced in topics exists in CHARACTER_IMAGES", () => {
    for (const game of TOPICS["states-of-matter"].games) {
      expect(CHARACTER_IMAGES).toHaveProperty(game.characterSlot);
    }
  });
});

// ─── Sub-topics ────────────────────────────────────────────────────────────────

describe("GAME_SUB_TOPICS", () => {
  it("has an entry for every gameId", () => {
    for (const id of GAME_IDS) {
      expect(GAME_SUB_TOPICS).toHaveProperty(id);
    }
  });

  it("each game has exactly 3 sub-topics", () => {
    for (const id of GAME_IDS) {
      expect(GAME_SUB_TOPICS[id]).toHaveLength(3);
    }
  });

  it("no sub-topic string is empty", () => {
    for (const id of GAME_IDS) {
      for (const text of GAME_SUB_TOPICS[id]) {
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

// ─── Quiz data ─────────────────────────────────────────────────────────────────

describe.each(["en", "ar"] as const)("quiz (%s)", (lang) => {
  it("every game has exactly 5 questions", () => {
    for (const id of GAME_IDS) {
      expect(getQuiz(id, lang)).toHaveLength(5);
    }
  });

  it("every question has exactly 4 options", () => {
    for (const id of GAME_IDS) {
      for (const q of getQuiz(id, lang)) {
        expect(q.options).toHaveLength(4);
      }
    }
  });

  it("correctIndex is in range [0, 3]", () => {
    for (const id of GAME_IDS) {
      for (const q of getQuiz(id, lang)) {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThanOrEqual(3);
      }
    }
  });

  it("no question, option, or hint string is empty", () => {
    for (const id of GAME_IDS) {
      for (const q of getQuiz(id, lang)) {
        expect(q.question.trim().length).toBeGreaterThan(0);
        expect(q.hint.trim().length).toBeGreaterThan(0);
        for (const opt of q.options) {
          expect(opt.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe("quiz EN vs AR alignment", () => {
  it("EN and AR have the same correctIndex for every question", () => {
    for (const id of GAME_IDS) {
      const en = getQuiz(id, "en");
      const ar = getQuiz(id, "ar");
      en.forEach((q, i) => {
        expect(ar[i].correctIndex).toBe(q.correctIndex);
      });
    }
  });

  it("EN and AR have the same number of options per question", () => {
    for (const id of GAME_IDS) {
      const en = getQuiz(id, "en");
      const ar = getQuiz(id, "ar");
      en.forEach((q, i) => {
        expect(ar[i].options).toHaveLength(q.options.length);
      });
    }
  });
});

// ─── i18n strings ──────────────────────────────────────────────────────────────

describe("i18n strings", () => {
  const enKeys = Object.keys(STRINGS.en).sort();
  const arKeys = Object.keys(STRINGS.ar).sort();

  it("EN and AR have the same top-level keys", () => {
    expect(arKeys).toEqual(enKeys);
  });

  it("EN and AR both have entries for every gameId under games", () => {
    for (const id of GAME_IDS) {
      expect(STRINGS.en.games).toHaveProperty(id);
      expect(STRINGS.ar.games).toHaveProperty(id);
    }
  });

  it("every game entry has title, desc, and subtitle in both languages", () => {
    for (const id of GAME_IDS) {
      for (const lang of ["en", "ar"] as const) {
        const entry = STRINGS[lang].games[id];
        expect(entry.title.trim().length).toBeGreaterThan(0);
        expect(entry.desc.trim().length).toBeGreaterThan(0);
        expect(entry.subtitle.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

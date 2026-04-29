import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { starsForScore } from "@/lib/quizUtils";
import { useProgress } from "@/hooks/useProgress";

// ─── starsForScore ─────────────────────────────────────────────────────────────

describe("starsForScore", () => {
  it("returns 0 when score is 0", () => {
    expect(starsForScore(0, 5)).toBe(0);
  });

  it("returns 1 at exactly the 0.2 threshold (1/5)", () => {
    expect(starsForScore(1, 5)).toBe(1);
  });

  it("returns 1 below the 0.6 threshold (2/5 = 0.4)", () => {
    expect(starsForScore(2, 5)).toBe(1);
  });

  it("returns 2 at exactly the 0.6 threshold (3/5)", () => {
    expect(starsForScore(3, 5)).toBe(2);
  });

  it("returns 2 below the 0.95 threshold (4/5 = 0.8)", () => {
    expect(starsForScore(4, 5)).toBe(2);
  });

  it("returns 3 at exactly the 0.95 threshold (5/5 = 1.0)", () => {
    expect(starsForScore(5, 5)).toBe(3);
  });

  it("returns 3 when all 5 answered correctly on first try", () => {
    expect(starsForScore(5, 5)).toBe(3);
  });

  it("never returns more than 3", () => {
    expect(starsForScore(10, 5)).toBeLessThanOrEqual(3);
  });
});

// ─── useProgress ──────────────────────────────────────────────────────────────

describe("useProgress", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window, "dispatchEvent").mockImplementation(() => true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with 0 stars for any game", () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.getGameStars("make-your-own-matter")).toBe(0);
  });

  it("setGameStars persists and getGameStars reads it back", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.setGameStars("make-your-own-matter", 2);
    });
    expect(result.current.getGameStars("make-your-own-matter")).toBe(2);
  });

  it("setGameStars never reduces an already-earned score", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.setGameStars("make-your-own-matter", 3);
    });
    act(() => {
      result.current.setGameStars("make-your-own-matter", 1);
    });
    expect(result.current.getGameStars("make-your-own-matter")).toBe(3);
  });

  it("setGameStars upgrades when new score is higher", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.setGameStars("make-your-own-matter", 1);
    });
    act(() => {
      result.current.setGameStars("make-your-own-matter", 3);
    });
    expect(result.current.getGameStars("make-your-own-matter")).toBe(3);
  });

  it("getTopicStars sums stars across all games in the topic", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.setGameStars("make-your-own-matter", 2);
      result.current.setGameStars("mosque-systems", 3);
    });
    expect(result.current.getTopicStars("states-of-matter")).toBe(5);
  });

  it("getTopicMaxStars returns 12 for states-of-matter (4 games × 3 stars)", () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.getTopicMaxStars("states-of-matter")).toBe(12);
  });

  it("getNextGame returns the first uncompleted game", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.setGameStars("make-your-own-matter", 2);
    });
    // first game completed → next should be game 2
    const next = result.current.getNextGame("states-of-matter");
    expect(next).not.toBe("make-your-own-matter");
  });

  it("getNextGame falls back to game 1 when all are completed", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.setGameStars("make-your-own-matter", 3);
      result.current.setGameStars("mosque-systems", 3);
      result.current.setGameStars("water-the-plant", 3);
      result.current.setGameStars("wadi-crossing", 3);
    });
    expect(result.current.getNextGame("states-of-matter")).toBe(
      "make-your-own-matter",
    );
  });

  it("persists stars to localStorage", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.setGameStars("wadi-crossing", 2);
    });
    const stored = JSON.parse(localStorage.getItem("tajruba.progress")!);
    expect(stored.games["wadi-crossing"].stars).toBe(2);
  });
});

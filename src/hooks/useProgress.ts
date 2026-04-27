import { useCallback, useEffect, useState } from "react";
import type { GameId, TopicId } from "@/data/topics";
import { TOPICS } from "@/data/topics";

interface ProgressState {
  games: Partial<Record<GameId, { stars: number; completed: boolean }>>;
}

const STORAGE_KEY = "tajruba.progress";
const EVENT = "tajruba:progress-changed";

function read(): ProgressState {
  if (typeof window === "undefined") return { games: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { games: {} };
    const parsed = JSON.parse(raw);
    return { games: parsed.games ?? {} };
  } catch {
    return { games: {} };
  }
}

function write(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>({ games: {} });

  useEffect(() => {
    setState(read());
    const handler = () => setState(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setGameStars = useCallback((gameId: GameId, stars: number) => {
    const current = read();
    const prev = current.games[gameId];
    // Only upgrade — never reduce earned stars
    const newStars = Math.max(prev?.stars ?? 0, stars);
    const next: ProgressState = {
      games: {
        ...current.games,
        [gameId]: { stars: newStars, completed: true },
      },
    };
    write(next);
    setState(next);
  }, []);

  const getGameStars = useCallback(
    (gameId: GameId) => state.games[gameId]?.stars ?? 0,
    [state],
  );

  const getTopicStars = useCallback(
    (topicId: TopicId) => {
      const topic = TOPICS[topicId];
      if (!topic) return 0;
      return topic.games.reduce((sum, g) => sum + (state.games[g.id]?.stars ?? 0), 0);
    },
    [state],
  );

  const getTopicMaxStars = useCallback((topicId: TopicId) => {
    const topic = TOPICS[topicId];
    return topic ? topic.games.length * 3 : 0;
  }, []);

  const getNextGame = useCallback(
    (topicId: TopicId): GameId => {
      const topic = TOPICS[topicId];
      const next = topic.games.find((g) => !state.games[g.id]?.completed);
      return (next ?? topic.games[0]).id;
    },
    [state],
  );

  return { setGameStars, getGameStars, getTopicStars, getTopicMaxStars, getNextGame };
}

const SOUND_KEY = "tajruba.sound";
export function useSound() {
  const [on, setOnState] = useState(true);
  useEffect(() => {
    try {
      const v = localStorage.getItem(SOUND_KEY);
      if (v === "off") setOnState(false);
    } catch {
      // ignore
    }
  }, []);
  const setOn = useCallback((v: boolean) => {
    setOnState(v);
    try {
      localStorage.setItem(SOUND_KEY, v ? "on" : "off");
    } catch {
      // ignore
    }
  }, []);
  return { on, setOn };
}

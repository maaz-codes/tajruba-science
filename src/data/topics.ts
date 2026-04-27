export type GameId =
  | "make-your-own-matter"
  | "water-the-plant"
  | "wadi-crossing"
  | "mosque-systems";

export type TopicId = "states-of-matter";

export interface GameDef {
  id: GameId;
  number: number;
  characterSlot: string;
  bgClass: string;
}

export interface TopicDef {
  id: TopicId;
  games: GameDef[];
}

export const TOPICS: Record<TopicId, TopicDef> = {
  "states-of-matter": {
    id: "states-of-matter",
    games: [
      {
        id: "make-your-own-matter",
        number: 1,
        characterSlot: "panda-with-tray",
        bgClass: "bg-pink-soft",
      },
      {
        id: "water-the-plant",
        number: 2,
        characterSlot: "droplet-and-plant",
        bgClass: "bg-sun-soft",
      },
      {
        id: "wadi-crossing",
        number: 3,
        characterSlot: "explorer-running",
        bgClass: "bg-sky-soft",
      },
      {
        id: "mosque-systems",
        number: 4,
        characterSlot: "owl-with-mosque",
        bgClass: "bg-mint-soft",
      },
    ],
  },
};

export const ALL_TOPICS: { id: TopicId | "soon-1" | "soon-2"; comingSoon?: boolean }[] = [
  { id: "states-of-matter" },
  { id: "soon-1", comingSoon: true },
  { id: "soon-2", comingSoon: true },
];

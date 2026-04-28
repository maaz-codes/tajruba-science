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

export const GAME_SUB_TOPICS: Record<GameId, [string, string, string]> = {
  "make-your-own-matter": [
    "Matter is made of tiny particles.",
    "Solids, liquids, and gases differ in how their particles are arranged and spaced.",
    "Everyday objects and substances can be grouped as solid, liquid, or gas.",
  ],
  "water-the-plant": [
    "Water can exist as a solid, liquid, or gas.",
    "Plants absorb water in its liquid state through their roots.",
    "Heat and cold can change water from one state to another.",
  ],
  "wadi-crossing": [
    "Matter changes state when energy is added or removed.",
    "Each state of matter has different properties that affect movement.",
    "Understanding states of matter helps us solve real-world problems.",
  ],
  "mosque-systems": [
    "Buildings use materials in different states of matter.",
    "Air, water, and solid structures each play a role in architecture.",
    "The properties of matter determine how it is used in construction.",
  ],
};

export const ALL_TOPICS: { id: TopicId | "soon-1" | "soon-2"; comingSoon?: boolean }[] = [
  { id: "states-of-matter" },
  { id: "soon-1", comingSoon: true },
  { id: "soon-2", comingSoon: true },
];

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
        characterSlot: "camel-with-flask",
        bgClass: "bg-pink-soft",
      },
      {
        id: "mosque-systems",
        number: 2,
        characterSlot: "owl-with-mosque",
        bgClass: "bg-mint-soft",
      },
      {
        id: "water-the-plant",
        number: 3,
        characterSlot: "droplet-and-plant",
        bgClass: "bg-sun-soft",
      },
      {
        id: "wadi-crossing",
        number: 4,
        characterSlot: "explorer-running",
        bgClass: "bg-sky-soft",
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
    "Heating liquid water turns it into water vapor, which rises upward.",
    "Water changes state when temperature changes.",
    "Cooling water vapor causes condensation and helps form clouds.",
  ],
  "wadi-crossing": [
    "Matter can change state between solid, liquid, and gas.",
    "Different states of matter help in different situations.",
    "Liquids flow and fit into any space they move through.",
  ],
  "mosque-systems": [
    "Solids keep their shape and are more stable in a structure.",
    "Liquids can flow and take the shape of their container.",
    "Different states of matter react differently to forces.",
  ],
};

export const ALL_TOPICS: { id: TopicId | "soon-1" | "soon-2"; comingSoon?: boolean }[] = [
  { id: "states-of-matter" },
  { id: "soon-1", comingSoon: true },
  { id: "soon-2", comingSoon: true },
];

// All game logic data in one place — easy to read and swap.

import { KEYS } from "../config";

// ── State ranges ─────────────────────────────────────────────────────────────
export type MatterState = "empty" | "gas" | "liquid" | "solid";

export function stateForCount(count: number): MatterState {
  if (count === 0) return "empty";
  if (count <= 4) return "gas";
  if (count <= 8) return "liquid";
  return "solid";
}

// ── Cube formation layouts (centered, relative to cube center 0,0) ───────────
// Each entry is [dx, dy] offsets from center. Unit = 1 "slot" = 40px.
type Formation = Array<[number, number]>;

const S = 80; // slot size in px

export const FORMATIONS: Formation[] = [
  [], // 0
  [[0, 0]], // 1
  [
    [-0.5, 0],
    [0.5, 0],
  ], // 2
  [
    [0, -0.6],
    [-0.6, 0.4],
    [0.6, 0.4],
  ], // 3
  [
    [-0.5, -0.5],
    [0.5, -0.5],
    [-0.5, 0.5],
    [0.5, 0.5],
  ], // 4
  [
    [0, -0.8],
    [-0.8, 0],
    [0.8, 0],
    [-0.4, 0.8],
    [0.4, 0.8],
  ], // 5
  [
    [-0.6, -0.6],
    [0.6, -0.6],
    [-1, 0],
    [0, 0],
    [1, 0],
    [0, 0.8],
  ], // 6 (adjusted below)
  [
    [-0.6, -0.8],
    [0.6, -0.8],
    [-1, 0],
    [0, 0],
    [1, 0],
    [-0.6, 0.8],
    [0.6, 0.8],
  ], // 7
  [
    [-0.7, -0.7],
    [0, -0.9],
    [0.7, -0.7],
    [-0.9, 0],
    [0, 0],
    [0.9, 0],
    [-0.7, 0.7],
    [0.7, 0.7],
  ], // 8
  [
    [-0.7, -0.7],
    [0, -0.9],
    [0.7, -0.7],
    [-0.9, 0],
    [0, 0],
    [0.9, 0],
    [-0.7, 0.7],
    [0, 0.9],
    [0.7, 0.7],
  ], // 9
  [
    [-0.7, -0.7],
    [0, -0.9],
    [0.7, -0.7],
    [-0.9, 0],
    [-0.3, 0],
    [0.3, 0],
    [0.9, 0],
    [-0.7, 0.7],
    [0, 0.9],
    [0.7, 0.7],
  ], // 10
  [
    [-0.8, -0.8],
    [-0.4, -0.8],
    [0.4, -0.8],
    [0.8, -0.8],
    [-1, 0],
    [-0.4, 0],
    [0, 0],
    [0.4, 0],
    [1, 0],
    [-0.8, 0.8],
    [0.8, 0.8],
  ], // 11
  [
    [-0.8, -0.8],
    [-0.3, -0.8],
    [0.3, -0.8],
    [0.8, -0.8],
    [-1, 0],
    [-0.4, 0],
    [0, 0],
    [0.4, 0],
    [1, 0],
    [-0.8, 0.8],
    [0, 0.8],
    [0.8, 0.8],
  ], // 12
];

// Scale slot size by state (denser = smaller gaps)
export function slotScale(state: MatterState): number {
  if (state === "solid") return 0.5;
  if (state === "liquid") return 0.75;
  return 1.0;
}

export { S };

// ── Slider items ─────────────────────────────────────────────────────────────
export type SliderItem = "earth" | "tree" | "industry";
export const SLIDER_ITEMS: SliderItem[] = ["earth", "tree", "industry"];

export const SLIDER_ICONS: Record<SliderItem, string> = {
  earth: KEYS.SLIDER_EARTH,
  tree: KEYS.SLIDER_TREE,
  industry: KEYS.SLIDER_INDUSTRY,
};

// ── Combination mapping ───────────────────────────────────────────────────────
export const COMBINATIONS: Record<
  SliderItem,
  Record<Exclude<MatterState, "empty">, { key: string; label: string }>
> = {
  earth: {
    solid: { key: KEYS.OUT_STONE, label: "Stone" },
    liquid: { key: KEYS.OUT_OCEAN, label: "Ocean" },
    gas: { key: KEYS.OUT_CLOUD, label: "Cloud" },
  },
  tree: {
    solid: { key: KEYS.OUT_WOOD, label: "Wood" },
    liquid: { key: KEYS.OUT_SAP, label: "Tree Sap" },
    gas: { key: KEYS.OUT_OXYGEN, label: "Oxygen" },
  },
  industry: {
    solid: { key: KEYS.OUT_IRON, label: "Iron" },
    liquid: { key: KEYS.OUT_CHEMICALS, label: "Chemicals" },
    gas: { key: KEYS.OUT_SMOKE, label: "Smoke" },
  },
};

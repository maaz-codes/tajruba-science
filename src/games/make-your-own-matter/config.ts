// Layout constants and asset keys for Make Your Own Matter.
// Change values here to restyle without touching scene logic.

export const GAME_W = 1280;
export const GAME_H = 720;

// Asset texture keys — swap these to brand art later
export const KEYS = {
  PARTICLE: "particle",
  PARTICLE_TRAY: "particle_tray",
  BADGE_GAS: "badge_gas",
  BADGE_LIQUID: "badge_liquid",
  BADGE_SOLID: "badge_solid",
  SLIDER_EARTH: "slider_earth",
  SLIDER_TREE: "slider_tree",
  SLIDER_INDUSTRY: "slider_industry",
  // Output textures (9 combos)
  OUT_STONE: "out_stone",
  OUT_OCEAN: "out_ocean",
  OUT_CLOUD: "out_cloud",
  OUT_WOOD: "out_wood",
  OUT_SAP: "out_sap",
  OUT_OXYGEN: "out_oxygen",
  OUT_IRON: "out_iron",
  OUT_CHEMICALS: "out_chemicals",
  OUT_SMOKE: "out_smoke",
  OUT_NEUTRAL: "out_neutral",
  // Sounds
  SFX_START: "sfx_start",
  SFX_POP: "sfx_pop",
  SFX_TICK: "sfx_tick",
  SFX_CHIME: "sfx_chime",
} as const;

// Panel sizing
export const CUBE = { x: 160, y: 360, w: 220, h: 220 };
export const CHARACTER = { x: 430, y: 360, w: 220, h: 220 };
export const SLIDER = { x: 710, y: 360, w: 100, h: 220 };
export const OUTPUT = { x: 920, y: 360, w: 220, h: 220 };
export const TRAY = { x: 640, y: 650, w: 760, h: 70 };

// Particle visuals
export const PARTICLE_RADIUS = 20;
export const PARTICLE_COLOR = 0x5b9cf6;
export const PARTICLE_TRAY_SPACING = 54;

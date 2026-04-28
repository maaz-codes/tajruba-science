import Phaser from "phaser";
import {
  GAME_W, GAME_H,
  KEYS,
  CUBE, CHARACTER, SLIDER, OUTPUT, TRAY,
  OP_PLUS, OP_EQUAL,
  PARTICLE_RADIUS,
  FONT, COLOR,
} from "../config";
import { playSynth } from "../sounds";
import {
  MatterState,
  stateForCount,
  FORMATIONS,
  SliderItem,
  SLIDER_ITEMS,
  COMBINATIONS,
  slotScale,
  S,
} from "../data/gameData";

// ── Helpers ───────────────────────────────────────────────────────────────────
// Scale image to fit within maxW×maxH while preserving aspect ratio.
function fitInBox(img: Phaser.GameObjects.Image, maxW: number, maxH: number) {
  const scale = Math.min(maxW / img.width, maxH / img.height);
  img.setScale(scale);
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  sprite: Phaser.GameObjects.Image;
  inCube: boolean;
  trayIndex: number; // -1 when in cube
}

// ── Constants ─────────────────────────────────────────────────────────────────
const BADGE_STATES: MatterState[] = ["gas", "liquid", "solid"];
const SLIDER_ITEM_SIZE = 60;
const SLIDER_GAP = 10;

export class GameScene extends Phaser.Scene {
  // ── State ──────────────────────────────────────────────────────────────────
  private particles: Particle[] = [];
  private cubeCount = 0;
  private currentState: MatterState = "empty";
  private discovered: Record<string, boolean> = { gas: false, liquid: false, solid: false };
  private sliderIndex = 0; // 0=earth 1=tree 2=industry
  private muted = false;

  // ── Display objects ────────────────────────────────────────────────────────
  private stateLabelText!: Phaser.GameObjects.Text;
  private helperBubbleText!: Phaser.GameObjects.Text;
  private badgeImages: Phaser.GameObjects.Image[] = [];
  private badgeGlows: Phaser.GameObjects.Graphics[] = [];
  private badgePositions: { x: number; y: number }[] = [];
  private outputImage!: Phaser.GameObjects.Image;
  private outputLabel!: Phaser.GameObjects.Text;
  private muteBtn!: Phaser.GameObjects.Text;
  private stateImage!: Phaser.GameObjects.Image;
  private cubeHintText!: Phaser.GameObjects.Text;

  // Slider display
  private sliderItemImages: Phaser.GameObjects.Image[] = [];
  private sliderHighlight!: Phaser.GameObjects.Graphics;
  private sliderDragStartY = -1;
  private sliderDragActive = false;

  // (character is now image-only, no dot/eye animation)

  // Drag
  private dragParticle: Particle | null = null;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  constructor() {
    super({ key: "GameScene" });
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  create() {
    this.cameras.main.fadeIn(300, 255, 255, 255);

    this.drawBackground();
    this.drawPanels();
    this.buildTopBar();
    this.buildBadges();
    this.buildMuteButton();
    this.buildHelperBubble();
    this.buildCharacter();
    this.buildCubeHint();
    this.buildSlider();
    this.buildOutputBox();
    this.buildTray();
    this.spawnParticles();
    this.setupDrag();

    this.updateState();
  }

  update(_time: number, _delta: number) {
    // reserved for future per-frame updates
  }

  // ── Background ─────────────────────────────────────────────────────────────
  private drawBackground() {
    this.add.image(GAME_W / 2, GAME_H / 2, KEYS.BG)
      .setDisplaySize(GAME_W, GAME_H)
      .setDepth(-10);
  }

  // ── Panels ────────────────────────────────────────────────────────────────
  private drawPanels() {
    const g = this.add.graphics();

    const panels = [CUBE, CHARACTER, OUTPUT];
    for (const p of panels) {
      g.fillStyle(0xffffff, 0.85);
      g.fillRoundedRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, 20);
      g.lineStyle(2, 0xc7d2fe, 0.8);
      g.strokeRoundedRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, 20);
    }

    // Slider track
    g.fillStyle(0xffffff, 0.85);
    g.fillRoundedRect(SLIDER.x - SLIDER.w / 2, SLIDER.y - SLIDER.h / 2, SLIDER.w, SLIDER.h, 16);
    g.lineStyle(2, 0xc7d2fe, 0.8);
    g.strokeRoundedRect(SLIDER.x - SLIDER.w / 2, SLIDER.y - SLIDER.h / 2, SLIDER.w, SLIDER.h, 16);

    // Operator labels — + between character and slider, = between slider and output
    const ops = [
      { x: OP_PLUS,  y: CHARACTER.y, t: "+" },
      { x: OP_EQUAL, y: OUTPUT.y,    t: "=" },
    ];
    for (const op of ops) {
      this.add.text(op.x, op.y, op.t, {
        fontFamily: FONT, fontSize: "40px", fontStyle: "bold",
        color: COLOR.PRIMARY,
      }).setOrigin(0.5);
    }

    // Tray rectangle hidden — bg image has its own tray visual
  }

  // ── Top bar ────────────────────────────────────────────────────────────────
  private buildTopBar() {
    this.add.text(GAME_W / 2, 72, "Explore Matter with Particles!", {
      fontFamily: FONT, fontSize: "40px", fontStyle: "bold",
      color: COLOR.NAVY,
    }).setOrigin(0.5);

    this.add.text(GAME_W / 2, 76, "", {
      fontFamily: FONT, fontSize: "28px", fontStyle: "normal",
      color: COLOR.TEXT_MUTED,
    }).setOrigin(0.5);
  }

  // ── Discovery badges ───────────────────────────────────────────────────────
  private buildBadges() {
    const badgeKeys = [KEYS.BADGE_GAS, KEYS.BADGE_LIQUID, KEYS.BADGE_SOLID];
    const labels = ["Gas", "Liquid", "Solid"];
    const glowColors = [0x86efac, 0x67e8f9, 0xc4b5fd]; // green / cyan / violet per state
    const startX = GAME_W - 260;

    for (let i = 0; i < 3; i++) {
      const x = startX + i * 88;
      const y = 72;

      // Glow circle behind badge — hidden until discovered
      const glow = this.add.graphics().setAlpha(0).setDepth(0);
      glow.fillStyle(glowColors[i], 0.35);
      glow.fillCircle(x, y - 8, 42);
      this.badgeGlows.push(glow);
      this.badgePositions.push({ x, y: y - 8 });

      const img = this.add.image(x, y - 8, badgeKeys[i])
        .setAlpha(0.4).setDepth(1);
      fitInBox(img, 70, 70);

      this.add.text(x, y + 20, labels[i], {
        fontFamily: FONT, fontSize: "12px", fontStyle: "bold",
        color: COLOR.PRIMARY,
      }).setOrigin(0.5).setAlpha(0.4);

      this.badgeImages.push(img);
    }
  }

  // ── Mute button — circular, matches site's rounded-full icon buttons ─────────
  private buildMuteButton() {
    const cx = 72, cy = 72, r = 32;

    const circle = this.add.graphics();
    this.drawMuteCircle(circle, cx, cy, r, false);

    this.muteBtn = this.add.text(cx, cy + 1, "♪", {
      fontFamily: FONT, fontSize: "24px", fontStyle: "bold",
      color: COLOR.WHITE,
    }).setOrigin(0.5);

    const zone = this.add.zone(cx, cy, r * 2, r * 2).setInteractive({ cursor: "pointer" });
    zone.on("pointerdown", () => {
      this.muted = !this.muted;
      this.sound.setMute(this.muted);
      this.drawMuteCircle(circle, cx, cy, r, this.muted);
      this.muteBtn.setText(this.muted ? "✕" : "♪");
    });
  }

  private drawMuteCircle(g: Phaser.GameObjects.Graphics, cx: number, cy: number, r: number, muted: boolean) {
    g.clear();
    // Shadow
    g.fillStyle(0x000000, 0.15);
    g.fillCircle(cx, cy + 4, r);
    // Main circle
    g.fillStyle(muted ? 0x94a3b8 : 0x4f46e5, 1);
    g.fillCircle(cx, cy, r);
  }

  // ── Helper bubble ──────────────────────────────────────────────────────────
  private buildHelperBubble() {
    const bx = 413, by = 530;

    // Bubble background hidden — bg image has its own thought bubble
    this.helperBubbleText = this.add.text(bx, by, "Drag particles to make matter!", {
      fontFamily: FONT, fontSize: "16px", fontStyle: "bold",
      color: COLOR.NAVY,
      align: "left",
    }).setOrigin(0.5, 0.5);

  }

  // ── Matter character ───────────────────────────────────────────────────────
  private buildCharacter() {
    const cx = CHARACTER.x, cy = CHARACTER.y;

    // State image fills the character panel — fades in/out on state change
    this.stateImage = this.add.image(cx, cy, KEYS.STATE_GAS)
      .setAlpha(0); // hidden until a state is active
    fitInBox(this.stateImage, CHARACTER.w - 24, CHARACTER.h - 24);

    // State label below image
    this.stateLabelText = this.add.text(cx, cy + CHARACTER.h / 2 - 18, "", {
      fontFamily: FONT, fontSize: "16px", fontStyle: "bold",
      color: COLOR.PRIMARY,
    }).setOrigin(0.5);
  }

  // ── Cube hint ──────────────────────────────────────────────────────────────
  private buildCubeHint() {
    this.cubeHintText = this.add.text(CUBE.x, CUBE.y, "Drop\nparticles\nhere", {
      fontFamily: FONT, fontSize: "16px", fontStyle: "bold",
      color: COLOR.PRIMARY, align: "center", lineSpacing: 4,
    }).setOrigin(0.5).setAlpha(0.6);
  }

  // ── Slider ─────────────────────────────────────────────────────────────────
  // Simple 3-item vertical list. Drag up/down to cycle selection.
  private buildSlider() {
    const sx = SLIDER.x;
    const totalH = SLIDER_ITEMS.length * (SLIDER_ITEM_SIZE + SLIDER_GAP) - SLIDER_GAP;
    const startY = SLIDER.y - totalH / 2 + SLIDER_ITEM_SIZE / 2;

    const ICON_KEYS = [KEYS.SLIDER_EARTH, KEYS.SLIDER_TREE, KEYS.SLIDER_INDUSTRY];

    for (let i = 0; i < SLIDER_ITEMS.length; i++) {
      const iy = startY + i * (SLIDER_ITEM_SIZE + SLIDER_GAP);
      const img = this.add.image(sx, iy, ICON_KEYS[i]);
      fitInBox(img, SLIDER_ITEM_SIZE, SLIDER_ITEM_SIZE);
      img.setInteractive({ cursor: "pointer" });

      // Click to select
      img.on("pointerup", (_ptr: Phaser.Input.Pointer) => {
        // Only treat as click if not dragging
        if (!this.sliderDragActive) {
          this.selectSliderItem(i);
        }
      });

      // Start drag from this image
      img.on("pointerdown", (ptr: Phaser.Input.Pointer) => {
        this.sliderDragStartY = ptr.y;
        this.sliderDragActive = false; // becomes true once movement threshold is crossed
      });

      this.sliderItemImages.push(img);
    }

    // "toggle these" label above slider panel
    this.add.text(sx, SLIDER.y - SLIDER.h / 2 - 14, "toggle these", {
      fontFamily: FONT, fontSize: "20px", fontStyle: "bold",
      color: COLOR.TEXT_MUTED,
    }).setOrigin(0.5, 1);

    // Selection highlight drawn behind items
    this.sliderHighlight = this.add.graphics().setDepth(-1);
    this.refreshSliderHighlight();

    // Scene-level move/up to handle drag that starts on any image
    this.input.on("pointermove", (ptr: Phaser.Input.Pointer) => {
      if (!ptr.isDown || this.sliderDragStartY === -1) return;
      const dy = ptr.y - this.sliderDragStartY;
      const threshold = (SLIDER_ITEM_SIZE + SLIDER_GAP) * 0.45;
      if (Math.abs(dy) >= threshold) {
        this.sliderDragActive = true;
        const delta = dy > 0 ? 1 : -1;
        const next = Phaser.Math.Clamp(this.sliderIndex + delta, 0, SLIDER_ITEMS.length - 1);
        if (next !== this.sliderIndex) {
          this.selectSliderItem(next);
        }
        this.sliderDragStartY = ptr.y;
      }
    });

    this.input.on("pointerup", () => {
      this.sliderDragStartY = -1;
      // Reset drag flag after a tick so pointerup on image fires as click when no drag happened
      this.time.delayedCall(10, () => { this.sliderDragActive = false; });
    });
  }

  private selectSliderItem(index: number) {
    if (this.sliderIndex === index) return;
    this.sliderIndex = index;
    this.refreshSliderHighlight();
    playSynth("tick", this.muted);
    this.updateOutput();
  }

  private refreshSliderHighlight() {
    const totalH = SLIDER_ITEMS.length * (SLIDER_ITEM_SIZE + SLIDER_GAP) - SLIDER_GAP;
    const startY = SLIDER.y - totalH / 2 + SLIDER_ITEM_SIZE / 2;
    const iy = startY + this.sliderIndex * (SLIDER_ITEM_SIZE + SLIDER_GAP);
    const half = SLIDER_ITEM_SIZE / 2 + 4;

    this.sliderHighlight.clear();
    this.sliderHighlight.fillStyle(0x6366f1, 0.1);
    this.sliderHighlight.fillRoundedRect(SLIDER.x - half, iy - half, half * 2, half * 2, 12);
    this.sliderHighlight.lineStyle(2, 0x6366f1, 0.9);
    this.sliderHighlight.strokeRoundedRect(SLIDER.x - half, iy - half, half * 2, half * 2, 12);

    // Dim non-selected items
    this.sliderItemImages.forEach((img, i) => {
      img.setAlpha(i === this.sliderIndex ? 1 : 0.35);
    });
  }

  // ── Output box ─────────────────────────────────────────────────────────────
  private buildOutputBox() {
    const ox = OUTPUT.x, oy = OUTPUT.y;

    this.outputImage = this.add.image(ox, oy - 20, KEYS.OUT_NEUTRAL);
    fitInBox(this.outputImage, OUTPUT.w - 24, OUTPUT.h - 50);

    this.outputLabel = this.add.text(ox, oy + 60, "", {
      fontFamily: FONT, fontSize: "17px", fontStyle: "bold",
      color: COLOR.NAVY,
    }).setOrigin(0.5);
  }

  // ── Tray ──────────────────────────────────────────────────────────────────
  private buildTray() {
    // Draw 12 empty slot circles
    const g = this.add.graphics();
    for (let i = 0; i < 12; i++) {
      const tx = this.traySlotX(i);
      g.lineStyle(2, 0xc7d2fe, 0.5);
      g.strokeCircle(tx, TRAY.y, PARTICLE_RADIUS + 2);
    }
  }

  private traySlotX(index: number): number {
    // 12 slots centered in tray; spacing fits within tray width with padding
    const usableWidth = TRAY.w - 80;
    const spacing = usableWidth / 11;
    return TRAY.x - usableWidth / 2 + index * spacing;
  }

  // ── Particles ─────────────────────────────────────────────────────────────
  private spawnParticles() {
    for (let i = 0; i < 12; i++) {
      const sprite = this.add.image(this.traySlotX(i), TRAY.y, KEYS.PARTICLE);
      sprite.setDisplaySize((PARTICLE_RADIUS + 4) * 2, (PARTICLE_RADIUS + 4) * 2);
      sprite.setInteractive({ draggable: true, cursor: "grab" });
      this.particles.push({ sprite, inCube: false, trayIndex: i });
    }
  }

  // ── Drag logic ────────────────────────────────────────────────────────────
  private setupDrag() {
    this.input.on("dragstart", (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.Image) => {
      const p = this.particles.find((p) => p.sprite === obj);
      if (!p) return;
      this.dragParticle = p;
      obj.setDepth(10);
      this.input.setDefaultCursor("grabbing");
    });

    this.input.on("drag", (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.Image, dx: number, dy: number) => {
      obj.x = dx;
      obj.y = dy;
    });

    this.input.on("dragend", (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.Image) => {
      const p = this.dragParticle;
      this.dragParticle = null;
      if (!p) return;
      obj.setDepth(0);
      this.input.setDefaultCursor("default");

      const inCubeNow = this.isInsideCube(obj.x, obj.y);
      const wasInCube = p.inCube;

      if (inCubeNow && !wasInCube) {
        p.inCube = true;
        p.trayIndex = -1;
        this.cubeCount++;
        playSynth("pop", this.muted);
        this.rearrangeCube();
        // Fade out cube hint on first drop
        if (this.cubeCount === 1 && this.cubeHintText.alpha > 0) {
          this.tweens.add({ targets: this.cubeHintText, alpha: 0, duration: 300 });
        }
      } else if (!inCubeNow && wasInCube) {
        p.inCube = false;
        this.cubeCount--;
        this.returnParticleToTray(p);
        playSynth("pop", this.muted);
        this.rearrangeCube();
      } else if (!inCubeNow && !wasInCube) {
        // Snapped back to tray slot
        this.tweens.add({ targets: obj, x: this.traySlotX(p.trayIndex), y: TRAY.y, duration: 200, ease: "Back.easeOut" });
      } else {
        // Still in cube — re-snap in place
        this.rearrangeCube();
      }

      this.updateState();
    });
  }

  private isInsideCube(x: number, y: number): boolean {
    return (
      x >= CUBE.x - CUBE.w / 2 &&
      x <= CUBE.x + CUBE.w / 2 &&
      y >= CUBE.y - CUBE.h / 2 &&
      y <= CUBE.y + CUBE.h / 2
    );
  }

  private returnParticleToTray(p: Particle) {
    // Find the first free tray slot
    const occupied = new Set(this.particles.filter((x) => !x.inCube).map((x) => x.trayIndex));
    for (let i = 0; i < 12; i++) {
      if (!occupied.has(i)) {
        p.trayIndex = i;
        break;
      }
    }
    this.tweens.add({
      targets: p.sprite,
      x: this.traySlotX(p.trayIndex),
      y: TRAY.y,
      duration: 220,
      ease: "Back.easeOut",
    });
  }

  // ── Cube arrangement ───────────────────────────────────────────────────────
  private rearrangeCube() {
    const cubeParticles = this.particles.filter((p) => p.inCube);
    const count = cubeParticles.length;
    const layout = FORMATIONS[count] ?? [];
    const scale = slotScale(stateForCount(count));

    for (let i = 0; i < cubeParticles.length; i++) {
      const [dx, dy] = layout[i] ?? [0, 0];
      this.tweens.add({
        targets: cubeParticles[i].sprite,
        x: CUBE.x + dx * S * scale,
        y: CUBE.y + dy * S * scale,
        duration: 250,
        ease: "Back.easeOut",
      });
    }
  }

  // ── State + feedback ───────────────────────────────────────────────────────
  private updateState() {
    const newState = stateForCount(this.cubeCount);

    if (newState !== this.currentState) {
      this.currentState = newState;
      this.onStateChange(newState);
    }

    this.updateOutput();
    this.updateHelperBubble();
  }

  private onStateChange(state: MatterState) {
    const labels: Record<MatterState, string> = {
      empty: "",
      gas: "Gas",
      liquid: "Liquid",
      solid: "Solid",
    };
    this.stateLabelText.setText(labels[state]);

    // Swap state image
    const stateKeys: Record<MatterState, string | null> = {
      empty: null,
      gas: KEYS.STATE_GAS,
      liquid: KEYS.STATE_LIQUID,
      solid: KEYS.STATE_SOLID,
    };
    const key = stateKeys[state];
    if (key) {
      this.stateImage.setTexture(key);
      fitInBox(this.stateImage, CHARACTER.w - 24, CHARACTER.h - 24);
      this.stateImage.setAlpha(0);
      this.tweens.add({ targets: this.stateImage, alpha: 1, duration: 250, ease: "Quad.easeIn" });
    } else {
      this.tweens.add({ targets: this.stateImage, alpha: 0, duration: 150 });
    }

    // Pop animation on label
    this.tweens.add({
      targets: this.stateLabelText,
      scaleX: 1.4,
      scaleY: 1.4,
      duration: 120,
      yoyo: true,
      ease: "Back.easeOut",
    });

    // Sparkle burst
    if (state !== "empty") {
      this.spawnSparkles(CHARACTER.x, CHARACTER.y);
    }

    // First discovery
    if (state !== "empty" && !this.discovered[state]) {
      this.discovered[state] = true;
      this.lightBadge(state);
      playSynth("chime", this.muted);
    }
  }

  private lightBadge(state: MatterState) {
    const idx = BADGE_STATES.indexOf(state);
    if (idx === -1) return;
    const badge = this.badgeImages[idx];
    const glow = this.badgeGlows[idx];
    const { x, y } = this.badgePositions[idx];
    const baseScale = badge.scaleX;

    // 1. Fade in glow behind badge
    this.tweens.add({ targets: glow, alpha: 1, duration: 400, ease: "Quad.easeOut" });

    // 2. Spring pop — scale up then spring back past 1.0 and settle
    badge.setAlpha(1);
    this.tweens.add({
      targets: badge,
      scaleX: baseScale * 1.5,
      scaleY: baseScale * 1.5,
      duration: 180,
      ease: "Back.easeOut",
      onComplete: () => {
        this.tweens.add({
          targets: badge,
          scaleX: baseScale,
          scaleY: baseScale,
          duration: 400,
          ease: "Back.easeOut",
        });
      },
    });

    // 3. Ring burst — expanding circle outline that fades out
    const ring = this.add.graphics().setDepth(5);
    const ringColor = [0x86efac, 0x67e8f9, 0xc4b5fd][idx];
    let radius = 38;
    const ringTween = { value: 0 };
    this.tweens.add({
      targets: ringTween,
      value: 1,
      duration: 600,
      ease: "Quad.easeOut",
      onUpdate: () => {
        const r = 38 + ringTween.value * 36;
        const alpha = 1 - ringTween.value;
        ring.clear();
        ring.lineStyle(3, ringColor, alpha);
        ring.strokeCircle(x, y, r);
      },
      onComplete: () => ring.destroy(),
    });

    // 4. Sparkle orbit around badge
    const sparkColors = [0xfde047, 0xffffff, 0xfcd34d];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const dist = Phaser.Math.Between(44, 68);
      const color = sparkColors[i % sparkColors.length];
      const dot = this.add.arc(x, y, 4, 0, 360, false, color).setDepth(20);
      this.tweens.add({
        targets: dot,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 550,
        ease: "Quad.easeOut",
        onComplete: () => dot.destroy(),
      });
    }
  }

  private spawnSparkles(x: number, y: number) {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const dist = Phaser.Math.Between(30, 60);
      const dot = this.add.arc(x, y, 4, 0, 360, false, 0xfde047);
      dot.setDepth(20);
      this.tweens.add({
        targets: dot,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 500,
        ease: "Quad.easeOut",
        onComplete: () => dot.destroy(),
      });
    }
  }

  // ── Output ────────────────────────────────────────────────────────────────
  private updateOutput() {
    const state = this.currentState;
    const slider = SLIDER_ITEMS[this.sliderIndex];

    let textureKey: string = KEYS.OUT_NEUTRAL;
    let label = "";

    if (state !== "empty") {
      const combo = COMBINATIONS[slider][state as Exclude<MatterState, "empty">];
      textureKey = combo.key;
      label = combo.label;
    }

    this.outputImage.setTexture(textureKey);
    fitInBox(this.outputImage, OUTPUT.w - 24, OUTPUT.h - 50);
    // Chemicals asset has a smaller native size so fitInBox over-scales it
    if (textureKey === KEYS.OUT_CHEMICALS) {
      this.outputImage.setScale(this.outputImage.scaleX * 0.72);
    }
    this.outputLabel.setText(label);

    // Bounce pop — relative to the display scale just set
    const baseScale = this.outputImage.scaleX;
    this.tweens.add({
      targets: [this.outputImage, this.outputLabel],
      scaleX: baseScale * 1.15,
      scaleY: baseScale * 1.15,
      duration: 100,
      yoyo: true,
      ease: "Back.easeOut",
    });
  }

  // ── Helper bubble ─────────────────────────────────────────────────────────
  private updateHelperBubble() {
    // Keep the intro prompt until the first particle is actually moved
    if (this.cubeCount === 0 && Object.values(this.discovered).every(v => !v)) return;

    const order: MatterState[] = ["gas", "liquid", "solid"];
    const next = order.find((s) => !this.discovered[s]);
    if (next) {
      const map: Record<string, string> = { gas: "Make gas", liquid: "Drag more to make liquid", solid: "Drag more to make solid" };
      this.helperBubbleText.setText(map[next]);
    } else {
      this.helperBubbleText.setText("Try different combinations!");
    }
  }


}

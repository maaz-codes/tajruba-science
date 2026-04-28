import Phaser from "phaser";
import {
  GAME_W, GAME_H,
  KEYS,
  CUBE, CHARACTER, SLIDER, OUTPUT, TRAY,
  OP_PLUS, OP_EQUAL,
  PARTICLE_RADIUS,
  PARTICLE_COLOR,
  PARTICLE_TRAY_SPACING,
} from "../config";
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

// ── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  sprite: Phaser.GameObjects.Image;
  inCube: boolean;
  trayIndex: number; // -1 when in cube
}

// ── Constants ─────────────────────────────────────────────────────────────────
const BADGE_STATES: MatterState[] = ["gas", "liquid", "solid"];
const SLIDER_CELL_H = 80;
const SLIDER_VISIBLE = 3;

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
  private outputImage!: Phaser.GameObjects.Image;
  private outputLabel!: Phaser.GameObjects.Text;
  private muteBtn!: Phaser.GameObjects.Text;

  // Slider display
  private sliderCells: Phaser.GameObjects.Image[] = [];
  private sliderContainer!: Phaser.GameObjects.Container;
  private sliderDragStart = 0;
  private sliderOffsetY = 0;
  private sliderBaseY = 0;

  // Character animation
  private charDots: Phaser.GameObjects.Arc[] = [];
  private charEyes: Phaser.GameObjects.Arc[] = [];
  private blinkTimer = 0;

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
    this.buildSlider();
    this.buildOutputBox();
    this.buildTray();
    this.spawnParticles();
    this.setupDrag();

    this.updateState();
  }

  update(_time: number, delta: number) {
    this.animateCharacter(delta);
    this.animateSliderInertia();
  }

  // ── Background ─────────────────────────────────────────────────────────────
  private drawBackground() {
    const bg = this.add.graphics();
    bg.fillStyle(0xeef2ff, 1);
    bg.fillRect(0, 0, GAME_W, GAME_H);

    // Subtle grid dots
    bg.fillStyle(0xc7d2fe, 0.4);
    for (let x = 40; x < GAME_W; x += 60) {
      for (let y = 40; y < GAME_H; y += 60) {
        bg.fillCircle(x, y, 2);
      }
    }
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
        fontSize: "40px",
        fontStyle: "bold",
        color: "#6366f1",
      }).setOrigin(0.5);
    }

    // Tray
    g.fillStyle(0xffffff, 0.9);
    g.fillRoundedRect(TRAY.x - TRAY.w / 2, TRAY.y - TRAY.h / 2, TRAY.w, TRAY.h, 35);
    g.lineStyle(2, 0xc7d2fe, 0.6);
    g.strokeRoundedRect(TRAY.x - TRAY.w / 2, TRAY.y - TRAY.h / 2, TRAY.w, TRAY.h, 35);
  }

  // ── Top bar ────────────────────────────────────────────────────────────────
  private buildTopBar() {
    this.add.text(GAME_W / 2, 42, "Explore Matter with Particles!", {
      fontSize: "28px",
      fontStyle: "bold",
      color: "#312e81",
    }).setOrigin(0.5);

    this.add.text(GAME_W / 2, 76, "Arrange the particles to match the state of matter.", {
      fontSize: "16px",
      color: "#6366f1",
    }).setOrigin(0.5);
  }

  // ── Discovery badges ───────────────────────────────────────────────────────
  private buildBadges() {
    const labels = ["Gas", "Liquid", "Solid"];
    const colors = [0x80deea, 0x5b9cf6, 0x8b6c4f];
    const startX = GAME_W - 260;

    for (let i = 0; i < 3; i++) {
      const x = startX + i * 88;
      const y = 55;

      const g = this.add.graphics();
      g.fillStyle(colors[i], 0.15);
      g.fillRoundedRect(x - 36, y - 36, 72, 72, 14);
      g.lineStyle(2, colors[i], 0.3);
      g.strokeRoundedRect(x - 36, y - 36, 72, 72, 14);

      // Icon placeholder
      const icon = this.add.graphics();
      icon.fillStyle(colors[i], 0.4);
      for (let d = 0; d < 3 + i * 2; d++) {
        const px = Phaser.Math.Between(-18, 18);
        const py = Phaser.Math.Between(-14, 8);
        icon.fillCircle(x + px, y - 8 + py, 5 - i);
      }

      this.add.text(x, y + 22, labels[i], {
        fontSize: "12px",
        fontStyle: "bold",
        color: "#" + colors[i].toString(16).padStart(6, "0"),
      }).setOrigin(0.5).setAlpha(0.5);

      this.badgeImages.push(icon as unknown as Phaser.GameObjects.Image);
    }
  }

  // ── Mute button ────────────────────────────────────────────────────────────
  private buildMuteButton() {
    this.muteBtn = this.add.text(36, 36, "🔊", {
      fontSize: "26px",
    }).setOrigin(0.5).setInteractive({ cursor: "pointer" });

    this.muteBtn.on("pointerdown", () => {
      this.muted = !this.muted;
      this.sound.setMute(this.muted);
      this.muteBtn.setText(this.muted ? "🔇" : "🔊");
    });
  }

  // ── Helper bubble ──────────────────────────────────────────────────────────
  private buildHelperBubble() {
    const bx = 140, by = 560;

    const bg = this.add.graphics();
    bg.fillStyle(0xfef9c3, 1);
    bg.fillRoundedRect(bx - 70, by - 22, 140, 44, 22);
    bg.lineStyle(2, 0xfde047, 1);
    bg.strokeRoundedRect(bx - 70, by - 22, 140, 44, 22);

    this.helperBubbleText = this.add.text(bx, by, "Make gas", {
      fontSize: "15px",
      fontStyle: "bold",
      color: "#854d0e",
    }).setOrigin(0.5);

    // Small character alongside bubble
    this.add.text(bx - 100, by + 10, "🦉", { fontSize: "36px" }).setOrigin(0.5);
  }

  // ── Matter character ───────────────────────────────────────────────────────
  private buildCharacter() {
    const cx = CHARACTER.x, cy = CHARACTER.y;

    // Neutral face
    const face = this.add.graphics();
    face.fillStyle(0xdbeafe, 1);
    face.fillRoundedRect(cx - 60, cy - 70, 120, 100, 20);

    // Eyes (we'll blink these)
    const eyeL = this.add.arc(cx - 20, cy - 30, 8, 0, 360, false, 0x1e3a5f);
    const eyeR = this.add.arc(cx + 20, cy - 30, 8, 0, 360, false, 0x1e3a5f);
    this.charEyes.push(eyeL, eyeR);

    // Smile
    const smile = this.add.graphics();
    smile.lineStyle(3, 0x1e3a5f, 1);
    smile.beginPath();
    smile.arc(cx, cy - 10, 18, 0, Math.PI, false);
    smile.strokePath();

    // Particle body (dots below face — animated later)
    this.buildCharDots();

    // State label inside character box
    this.stateLabelText = this.add.text(cx, cy + 75, "", {
      fontSize: "16px",
      fontStyle: "bold",
      color: "#6366f1",
    }).setOrigin(0.5);
  }

  private buildCharDots() {
    const cx = CHARACTER.x, cy = CHARACTER.y;
    for (let i = 0; i < 12; i++) {
      const dot = this.add.arc(cx, cy + 30, 5, 0, 360, false, PARTICLE_COLOR, 0.3);
      this.charDots.push(dot);
    }
  }

  // ── Slider ─────────────────────────────────────────────────────────────────
  private buildSlider() {
    const sx = SLIDER.x, sy = SLIDER.y;

    this.sliderContainer = this.add.container(sx, sy);
    this.sliderBaseY = sy;

    // Build cells — 3 items × 2 for seamless looping wrap
    const ICON_KEYS = [KEYS.SLIDER_EARTH, KEYS.SLIDER_TREE, KEYS.SLIDER_INDUSTRY];
    for (let i = 0; i < SLIDER_ITEMS.length * 2; i++) {
      const itemIdx = i % SLIDER_ITEMS.length;
      const img = this.add.image(0, (i - 1) * SLIDER_CELL_H, ICON_KEYS[itemIdx]);
      img.setDisplaySize(56, 56);
      this.sliderContainer.add(img);
      this.sliderCells.push(img);
    }

    // Selection highlight
    const hl = this.add.graphics();
    hl.lineStyle(3, 0x6366f1, 1);
    hl.strokeRoundedRect(sx - 38, sy - 36, 76, 72, 12);
    hl.fillStyle(0x6366f1, 0.08);
    hl.fillRoundedRect(sx - 38, sy - 36, 76, 72, 12);

    // Touch/drag on slider
    const sliderZone = this.add.zone(sx, sy, SLIDER.w, SLIDER.h).setInteractive();
    sliderZone.on("pointerdown", (ptr: Phaser.Input.Pointer) => {
      this.sliderDragStart = ptr.y;
      this.sliderOffsetY = this.sliderContainer.y - this.sliderBaseY;
    });
    sliderZone.on("pointermove", (ptr: Phaser.Input.Pointer) => {
      if (!ptr.isDown) return;
      const dy = ptr.y - this.sliderDragStart;
      this.sliderContainer.y = this.sliderBaseY + this.sliderOffsetY + dy;
      this.updateSliderIndex();
    });
    sliderZone.on("pointerup", () => {
      this.snapSlider();
    });
  }

  private updateSliderIndex() {
    const offset = this.sliderContainer.y - this.sliderBaseY;
    const raw = Math.round(-offset / SLIDER_CELL_H);
    const idx = ((raw % SLIDER_ITEMS.length) + SLIDER_ITEMS.length) % SLIDER_ITEMS.length;
    if (idx !== this.sliderIndex) {
      this.sliderIndex = idx;
      this.playSfx(KEYS.SFX_TICK);
      this.updateOutput();
    }
  }

  private snapSlider() {
    const offset = this.sliderContainer.y - this.sliderBaseY;
    const snapped = -Math.round(-offset / SLIDER_CELL_H) * SLIDER_CELL_H;
    this.tweens.add({
      targets: this.sliderContainer,
      y: this.sliderBaseY + snapped,
      duration: 150,
      ease: "Back.easeOut",
    });
    this.updateSliderIndex();
  }

  private animateSliderInertia() {
    // Keep slider within wrapping bounds
    const total = SLIDER_ITEMS.length * SLIDER_CELL_H;
    const offset = this.sliderContainer.y - this.sliderBaseY;
    if (offset > SLIDER_CELL_H) {
      this.sliderContainer.y -= total;
    } else if (offset < -(total - SLIDER_CELL_H)) {
      this.sliderContainer.y += total;
    }
  }

  // ── Output box ─────────────────────────────────────────────────────────────
  private buildOutputBox() {
    const ox = OUTPUT.x, oy = OUTPUT.y;

    this.outputImage = this.add.image(ox, oy - 20, KEYS.OUT_NEUTRAL);
    this.outputImage.setDisplaySize(110, 110);

    this.outputLabel = this.add.text(ox, oy + 60, "", {
      fontSize: "17px",
      fontStyle: "bold",
      color: "#312e81",
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
      sprite.setInteractive({ draggable: true });
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

      const inCubeNow = this.isInsideCube(obj.x, obj.y);
      const wasInCube = p.inCube;

      if (inCubeNow && !wasInCube) {
        p.inCube = true;
        p.trayIndex = -1;
        this.cubeCount++;
        this.playSfx(KEYS.SFX_POP);
        this.rearrangeCube();
      } else if (!inCubeNow && wasInCube) {
        p.inCube = false;
        this.cubeCount--;
        this.returnParticleToTray(p);
        this.playSfx(KEYS.SFX_POP);
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
      this.playSfx(KEYS.SFX_CHIME);
    }
  }

  private lightBadge(state: MatterState) {
    const idx = BADGE_STATES.indexOf(state);
    if (idx === -1) return;
    const badge = this.badgeImages[idx];
    this.tweens.add({
      targets: badge,
      alpha: 1,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 300,
      yoyo: true,
      ease: "Back.easeOut",
      onComplete: () => badge.setAlpha(1),
    });
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
    this.outputLabel.setText(label);

    // Bounce pop
    this.tweens.add({
      targets: [this.outputImage, this.outputLabel],
      scaleX: 1.15,
      scaleY: 1.15,
      duration: 100,
      yoyo: true,
      ease: "Back.easeOut",
    });
  }

  // ── Helper bubble ─────────────────────────────────────────────────────────
  private updateHelperBubble() {
    const order: MatterState[] = ["gas", "liquid", "solid"];
    const next = order.find((s) => !this.discovered[s]);
    if (next) {
      const map: Record<string, string> = { gas: "Make gas", liquid: "Make liquid", solid: "Make solid" };
      this.helperBubbleText.setText(map[next]);
    } else {
      this.helperBubbleText.setText("Try different combinations");
    }
  }

  // ── Character animation ───────────────────────────────────────────────────
  private animateCharacter(delta: number) {
    const state = this.currentState;
    const t = this.time.now / 1000;

    // Dot behavior per state
    const configs: Record<MatterState, { count: number; spread: number; speed: number; alpha: number }> = {
      empty: { count: 0, spread: 0, speed: 0, alpha: 0 },
      gas: { count: 5, spread: 55, speed: 1.8, alpha: 0.45 },
      liquid: { count: 9, spread: 35, speed: 0.6, alpha: 0.75 },
      solid: { count: 12, spread: 18, speed: 0.1, alpha: 1 },
    };
    const cfg = configs[state];

    this.charDots.forEach((dot, i) => {
      const visible = i < cfg.count;
      dot.setVisible(visible);
      if (!visible) return;

      const baseAngle = (i / cfg.count) * Math.PI * 2;
      const wobble = cfg.speed * Math.sin(t * 2 + i * 0.8);
      const r = cfg.spread * (0.7 + 0.3 * Math.sin(t * 1.2 + i));
      dot.x = CHARACTER.x + Math.cos(baseAngle + wobble) * r;
      dot.y = CHARACTER.y + 30 + Math.sin(baseAngle + wobble) * r * 0.5;
      dot.setAlpha(cfg.alpha);
    });

    // Blink
    this.blinkTimer += delta;
    const eyeOpen = (this.blinkTimer % 3500) > 200;
    this.charEyes.forEach((e) => e.setAlpha(eyeOpen ? 1 : 0));
    if (this.blinkTimer > 3500) this.blinkTimer = 0;
  }

  // ── Audio ─────────────────────────────────────────────────────────────────
  private playSfx(key: string) {
    if (!this.muted && this.cache.audio.has(key)) {
      this.sound.play(key);
    }
  }
}

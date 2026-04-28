import Phaser from "phaser";
import { KEYS, PARTICLE_RADIUS, PARTICLE_COLOR } from "../config";

// Generates all placeholder textures procedurally, then hands off to StartScene.
// Swap out individual generateTexture calls here when brand assets are ready.
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  create() {
    this.makeParticle();
    this.makeSliderIcons();
    this.makeOutputPanels();
    this.makeBadges();
    this.scene.start("StartScene");
  }

  private makeParticle() {
    const g = this.add.graphics();
    // Soft glow outer circle
    g.fillStyle(0x93c5fd, 0.35);
    g.fillCircle(PARTICLE_RADIUS + 4, PARTICLE_RADIUS + 4, PARTICLE_RADIUS + 4);
    // Main circle
    g.fillStyle(PARTICLE_COLOR, 1);
    g.fillCircle(PARTICLE_RADIUS + 4, PARTICLE_RADIUS + 4, PARTICLE_RADIUS);
    // Highlight
    g.fillStyle(0xffffff, 0.4);
    g.fillCircle(PARTICLE_RADIUS, PARTICLE_RADIUS, 6);
    g.generateTexture(KEYS.PARTICLE, (PARTICLE_RADIUS + 4) * 2, (PARTICLE_RADIUS + 4) * 2);
    g.destroy();
  }

  private makeSliderIcons() {
    const items: Array<{ key: string; color: number; emoji: string }> = [
      { key: KEYS.SLIDER_EARTH, color: 0x8b6c4f, emoji: "🌍" },
      { key: KEYS.SLIDER_TREE,  color: 0x4caf50, emoji: "🌳" },
      { key: KEYS.SLIDER_INDUSTRY, color: 0x9e9e9e, emoji: "🏭" },
    ];
    for (const item of items) {
      // Draw background via Graphics, then overlay emoji via RenderTexture
      const size = 64;
      const rt = this.add.renderTexture(0, 0, size, size).setVisible(false);
      const g = this.add.graphics().setVisible(false);
      g.fillStyle(item.color, 1);
      g.fillRoundedRect(0, 0, size, size, 12);
      rt.draw(g, 0, 0);

      const t = this.add.text(size / 2, size / 2, item.emoji, {
        fontSize: "32px",
      }).setOrigin(0.5).setVisible(false);
      rt.draw(t, 0, 0);
      rt.saveTexture(item.key);

      g.destroy();
      t.destroy();
      rt.destroy();
    }
  }

  private makeOutputPanels() {
    const outputs: Array<{ key: string; color: number; label: string }> = [
      { key: KEYS.OUT_STONE, color: 0x9e9e9e, label: "🪨" },
      { key: KEYS.OUT_OCEAN, color: 0x0288d1, label: "🌊" },
      { key: KEYS.OUT_CLOUD, color: 0xb0bec5, label: "☁" },
      { key: KEYS.OUT_WOOD, color: 0x795548, label: "🪵" },
      { key: KEYS.OUT_SAP, color: 0xf9a825, label: "💧" },
      { key: KEYS.OUT_OXYGEN, color: 0x80deea, label: "O₂" },
      { key: KEYS.OUT_IRON, color: 0x78909c, label: "⚙" },
      { key: KEYS.OUT_CHEMICALS, color: 0xab47bc, label: "⚗" },
      { key: KEYS.OUT_SMOKE, color: 0x757575, label: "💨" },
      { key: KEYS.OUT_NEUTRAL, color: 0xe0e0e0, label: "?" },
    ];
    for (const o of outputs) {
      const size = 120;
      const g = this.add.graphics();
      g.fillStyle(o.color, 0.2);
      g.fillRoundedRect(0, 0, size, size, 16);
      g.lineStyle(2, o.color, 0.6);
      g.strokeRoundedRect(0, 0, size, size, 16);
      g.generateTexture(o.key, size, size);
      g.destroy();
    }
  }

  private makeBadges() {
    const badges: Array<{ key: string; color: number }> = [
      { key: KEYS.BADGE_GAS, color: 0x80deea },
      { key: KEYS.BADGE_LIQUID, color: 0x5b9cf6 },
      { key: KEYS.BADGE_SOLID, color: 0x8b6c4f },
    ];
    for (const b of badges) {
      const g = this.add.graphics();
      g.fillStyle(b.color, 0.3);
      g.fillRoundedRect(0, 0, 72, 72, 14);
      g.lineStyle(2, b.color, 0.5);
      g.strokeRoundedRect(0, 0, 72, 72, 14);
      g.generateTexture(b.key, 72, 72);
      g.destroy();
    }
  }
}

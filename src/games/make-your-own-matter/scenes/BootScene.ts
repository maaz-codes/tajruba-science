import Phaser from "phaser";
import { KEYS, ASSET_PATH, IMAGE_ASSETS, PARTICLE_RADIUS, PARTICLE_COLOR } from "../config";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    // Load all brand image assets
    for (const asset of IMAGE_ASSETS) {
      this.load.image(asset.key, ASSET_PATH + asset.file);
    }
  }

  create() {
    // Particle stays procedural until a brand asset is provided
    this.makeParticle();
    // Neutral output placeholder (no brand asset needed)
    this.makeNeutralOutput();
    this.scene.start("StartScene");
  }

  private makeParticle() {
    const r = PARTICLE_RADIUS;
    const g = this.add.graphics();
    g.fillStyle(0x93c5fd, 0.35);
    g.fillCircle(r + 4, r + 4, r + 4);
    g.fillStyle(PARTICLE_COLOR, 1);
    g.fillCircle(r + 4, r + 4, r);
    g.fillStyle(0xffffff, 0.4);
    g.fillCircle(r, r, 6);
    g.generateTexture(KEYS.PARTICLE, (r + 4) * 2, (r + 4) * 2);
    g.destroy();
  }

  private makeNeutralOutput() {
    const size = 120;
    const g = this.add.graphics();
    g.fillStyle(0xe0e0e0, 0.2);
    g.fillRoundedRect(0, 0, size, size, 16);
    g.lineStyle(2, 0xe0e0e0, 0.6);
    g.strokeRoundedRect(0, 0, size, size, 16);
    g.generateTexture(KEYS.OUT_NEUTRAL, size, size);
    g.destroy();
  }
}

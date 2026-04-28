import Phaser from "phaser";
import { GAME_W, GAME_H } from "../config";

// Placeholder GameScene — full implementation added in sections 2–6.
export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.cameras.main.fadeIn(300, 0, 0, 0);

    const bg = this.add.graphics();
    bg.fillStyle(0xf0f4ff, 1);
    bg.fillRect(0, 0, GAME_W, GAME_H);

    this.add.text(GAME_W / 2, GAME_H / 2, "Game coming soon…", {
      fontSize: "28px",
      color: "#6366f1",
    }).setOrigin(0.5);
  }
}

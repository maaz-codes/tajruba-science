import Phaser from "phaser";
import { GAME_W, GAME_H } from "../config";
import { playSynth } from "../sounds";

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    // Background overlay
    const bg = this.add.graphics();
    bg.fillStyle(0x6366f1, 1);
    bg.fillRect(0, 0, GAME_W, GAME_H);

    // Title
    this.add.text(GAME_W / 2, GAME_H / 2 - 80, "Make Your Own Matter", {
      fontSize: "42px",
      fontStyle: "bold",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(GAME_W / 2, GAME_H / 2 - 28, "Drag particles and discover the states of matter!", {
      fontSize: "20px",
      color: "#e0e7ff",
    }).setOrigin(0.5);

    // Start button
    const btnBg = this.add.graphics();
    btnBg.fillStyle(0xffffff, 1);
    btnBg.fillRoundedRect(GAME_W / 2 - 110, GAME_H / 2 + 20, 220, 60, 30);

    const btnLabel = this.add.text(GAME_W / 2, GAME_H / 2 + 50, "Start Experiment", {
      fontSize: "22px",
      fontStyle: "bold",
      color: "#4f46e5",
    }).setOrigin(0.5);

    // Hit area
    const btn = this.add.zone(GAME_W / 2, GAME_H / 2 + 50, 220, 60)
      .setInteractive({ cursor: "pointer" });

    btn.on("pointerover", () => {
      btnBg.clear();
      btnBg.fillStyle(0xeef2ff, 1);
      btnBg.fillRoundedRect(GAME_W / 2 - 110, GAME_H / 2 + 20, 220, 60, 30);
    });
    btn.on("pointerout", () => {
      btnBg.clear();
      btnBg.fillStyle(0xffffff, 1);
      btnBg.fillRoundedRect(GAME_W / 2 - 110, GAME_H / 2 + 20, 220, 60, 30);
    });
    btn.on("pointerdown", () => {
      playSynth("start", false);
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.start("GameScene");
      });
    });
  }
}

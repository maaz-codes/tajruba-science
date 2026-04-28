import Phaser from "phaser";
import { GAME_W, GAME_H, KEYS, FONT, COLOR } from "../config";
import { playSynth } from "../sounds";

const BTN_W = 360;
const BTN_H = 87;
const BTN_R = 44; // fully circular ends (= BTN_H / 2)
const BTN_SHADOW = 6;

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    // Solid background
    this.add.graphics().fillStyle(0x9177ec, 1).fillRect(0, 0, GAME_W, GAME_H);

    // Title
    this.add.text(GAME_W / 2, GAME_H / 2 - 72, "Make Your Own Matter", {
      fontFamily: FONT, fontSize: "54px", fontStyle: "bold",
      color: "#ffffff",
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(GAME_W / 2, GAME_H / 2 - 16, "Discover the states of matter by dragging particles.", {
      fontFamily: FONT, fontSize: "24px", fontStyle: "normal",
      color: "#ffffff",
    }).setOrigin(0.5);

    // btn-pop style button
    const bx = GAME_W / 2, by = GAME_H / 2 + 100;
    const btnGfx = this.add.graphics();
    this.drawBtn(btnGfx, bx, by, false);

    const btnLabel = this.add.text(bx, by, "Start Experiment", {
      fontFamily: FONT, fontSize: "30px", fontStyle: "bold",
      color: "#6b48c8",
    }).setOrigin(0.5);

    const zone = this.add.zone(bx, by + BTN_SHADOW / 2, BTN_W, BTN_H + BTN_SHADOW)
      .setInteractive({ cursor: "pointer" });

    zone.on("pointerover",  () => { this.drawBtn(btnGfx, bx, by, false, true); });
    zone.on("pointerout",   () => { this.drawBtn(btnGfx, bx, by, false); });
    zone.on("pointerdown",  () => {
      this.drawBtn(btnGfx, bx, by, true);
      btnLabel.setY(by + 2);
    });
    zone.on("pointerup", () => {
      playSynth("start", false);
      this.drawBtn(btnGfx, bx, by, false);
      btnLabel.setY(by);
      this.cameras.main.fadeOut(280, 255, 255, 255);
      this.cameras.main.once("camerafadeoutcomplete", () => this.scene.start("GameScene"));
    });
  }

  // Draws the btn-pop rounded-rect button
  private drawBtn(
    g: Phaser.GameObjects.Graphics,
    cx: number, cy: number,
    pressed: boolean,
    hover = false,
  ) {
    g.clear();
    const x = cx - BTN_W / 2;
    const y = cy - BTN_H / 2;
    const shadow = pressed ? 1 : BTN_SHADOW;
    const lift = pressed ? 0 : (hover ? -1 : 0);

    // Shadow layer
    g.fillStyle(0xb8a0e0, 1);
    g.fillRoundedRect(x, y + shadow + lift, BTN_W, BTN_H, BTN_R);

    // Main button face
    g.fillStyle(hover ? 0xddd0f5 : 0xece4f7, 1);
    g.fillRoundedRect(x, y + lift, BTN_W, BTN_H, BTN_R);
  }
}

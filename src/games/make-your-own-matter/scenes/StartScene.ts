import Phaser from "phaser";
import { GAME_W, GAME_H, KEYS, FONT, COLOR } from "../config";
import { playSynth } from "../sounds";

const BTN_W = 240;
const BTN_H = 58;
const BTN_R = 16; // border-radius matching site's rounded-2xl
const BTN_SHADOW = 5; // chunky bottom shadow depth (btn-pop style)

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    // Use game background image if available, else fallback colour
    if (this.textures.exists(KEYS.BG)) {
      this.add.image(GAME_W / 2, GAME_H / 2, KEYS.BG).setDisplaySize(GAME_W, GAME_H);
    } else {
      this.add.graphics().fillStyle(0xeef2ff, 1).fillRect(0, 0, GAME_W, GAME_H);
    }

    // Semi-transparent overlay so text pops
    const overlay = this.add.graphics();
    overlay.fillStyle(0xffffff, 0.55);
    overlay.fillRoundedRect(GAME_W / 2 - 280, GAME_H / 2 - 110, 560, 220, 24);

    // Title
    this.add.text(GAME_W / 2, GAME_H / 2 - 58, "Make Your Own Matter", {
      fontFamily: FONT, fontSize: "36px", fontStyle: "bold",
      color: COLOR.NAVY,
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(GAME_W / 2, GAME_H / 2 - 16, "Discover the states of matter by dragging particles.", {
      fontFamily: FONT, fontSize: "16px", fontStyle: "normal",
      color: COLOR.TEXT_MUTED,
    }).setOrigin(0.5);

    // btn-pop style button
    const bx = GAME_W / 2, by = GAME_H / 2 + 48;
    const btnGfx = this.add.graphics();
    this.drawBtn(btnGfx, bx, by, false);

    const btnLabel = this.add.text(bx, by, "Start Experiment", {
      fontFamily: FONT, fontSize: "20px", fontStyle: "bold",
      color: COLOR.WHITE,
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

    // Shadow layer (darker shade of primary)
    g.fillStyle(0x312e81, 1);
    g.fillRoundedRect(x, y + shadow + lift, BTN_W, BTN_H, BTN_R);

    // Main button face
    g.fillStyle(hover ? 0x4338ca : 0x4f46e5, 1);
    g.fillRoundedRect(x, y + lift, BTN_W, BTN_H, BTN_R);
  }
}

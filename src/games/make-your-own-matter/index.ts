import type Phaser from "phaser";
import { GAME_W, GAME_H } from "./config";

let gameInstance: Phaser.Game | null = null;

export async function mount(
  container: HTMLElement,
  onProgress?: (pct: number) => void,
): Promise<void> {
  if (gameInstance) return;

  // Dynamic import keeps Phaser off the server (it needs window/document).
  const PhaserModule = await import("phaser");
  const PhaserLib = PhaserModule.default;

  const { BootScene } = await import("./scenes/BootScene");
  const { StartScene } = await import("./scenes/StartScene");
  const { GameScene } = await import("./scenes/GameScene");

  gameInstance = new PhaserLib.Game({
    type: PhaserLib.AUTO,
    width: GAME_W,
    height: GAME_H,
    backgroundColor: "#f0f4ff",
    parent: container,
    scale: {
      mode: PhaserLib.Scale.FIT,
      autoCenter: PhaserLib.Scale.CENTER_BOTH,
    },
    physics: { default: "arcade", arcade: { debug: false } },
    scene: [BootScene, StartScene, GameScene],
    audio: { disableWebAudio: false },
    callbacks: {
      postBoot: (game) => {
        if (!onProgress) return;
        const scene = game.scene.getScene("BootScene") as any;
        if (!scene?.load) return;
        scene.load.on("progress", (value: number) => onProgress(Math.round(value * 100)));
        scene.load.on("complete", () => onProgress(100));
      },
    },
  });
}

export function unmount(): void {
  if (gameInstance) {
    gameInstance.destroy(true);
    gameInstance = null;
  }
}

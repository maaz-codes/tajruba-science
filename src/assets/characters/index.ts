import catExplorer from "./cat-explorer.png";
import dropletAndPlant from "./droplet-and-plant.png";
import explorerRunning from "./explorer-running.png";
import gasCloud from "./gas-cloud.png";
import liquidDroplet from "./liquid-droplet.png";
import magnifierBird from "./magnifier-bird.png";
import owlWithMosque from "./owl-with-mosque.png";
import pandaScientist from "./panda-scientist.png";
import pandaWithTray from "./panda-with-tray.png";
import solidCube from "./solid-cube.png";
import topicComingFlag from "./topic-coming-flag.png";
import topicComingSoon from "./topic-coming-soon.png";
import topicStatesCover from "./topic-states-cover.png";

const toSrc = (img: any) => (typeof img === "string" ? img : img?.src || "");

export const CHARACTER_IMAGES: Record<string, string> = {
  "cat-explorer": toSrc(catExplorer),
  "droplet-and-plant": toSrc(dropletAndPlant),
  "explorer-running": toSrc(explorerRunning),
  "gas-cloud": toSrc(gasCloud),
  "liquid-droplet": toSrc(liquidDroplet),
  "magnifier-bird": toSrc(magnifierBird),
  "owl-with-mosque": toSrc(owlWithMosque),
  "panda-scientist": toSrc(pandaScientist),
  "panda-with-tray": toSrc(pandaWithTray),
  "solid-cube": toSrc(solidCube),
  "topic-coming-flag": toSrc(topicComingFlag),
  "topic-coming-soon": toSrc(topicComingSoon),
  "topic-states-cover": toSrc(topicStatesCover),
};

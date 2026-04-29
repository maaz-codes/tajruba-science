import catExplorer from "./cat-explorer.png";
import dropletAndPlant from "./droplet-and-plant.png";
import explorerRunning from "./explorer-running.png";
import gasCloud from "./gas-cloud.png";
import liquidDroplet from "./liquid-droplet.png";
import falconOryx from "./falcon-oryx.png";
import owlWithMosque from "./owl-with-mosque.png";
import camelHero from "./camel-hero.png";
import camelWithFlask from "./camel-with-flask.png";
import solidCube from "./solid-cube.png";
import topicComingFlag from "./topic-coming-flag.png";
import topicComingSoon from "./topic-coming-soon.png";
import topicStatesCover from "./topic-states-cover.png";

const toSrc = (img: unknown) =>
  typeof img === "string" ? img : (img as { src?: string })?.src || "";

export const CHARACTER_IMAGES: Record<string, string> = {
  "cat-explorer": toSrc(catExplorer),
  "droplet-and-plant": toSrc(dropletAndPlant),
  "explorer-running": toSrc(explorerRunning),
  "gas-cloud": toSrc(gasCloud),
  "liquid-droplet": toSrc(liquidDroplet),
  "falcon-oryx": toSrc(falconOryx),
  "owl-with-mosque": toSrc(owlWithMosque),
  "camel-hero": toSrc(camelHero),
  "camel-with-flask": toSrc(camelWithFlask),
  "solid-cube": toSrc(solidCube),
  "topic-coming-flag": toSrc(topicComingFlag),
  "topic-coming-soon": toSrc(topicComingSoon),
  "topic-states-cover": toSrc(topicStatesCover),
};

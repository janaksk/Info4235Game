import LoadingScene from "./scenes/loadingScene.js";
import MenuScene from "./scenes/menuScene.js";
import RegisterForm from "./scenes/RegisterForm.js";

import Level1Scene from "./scenes/Level1Scene.js";
import Level2Scene from "./scenes/Level2Scene.js";
import Level3Scene from "./scenes/Level3Scene.js";
import Level4Scene from "./scenes/Level4Scene.js";
import Level5Scene from "./scenes/Level5Scene.js";

import Phaser from "phaser";


//import Level5Scene from './scenes/Level5Scene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  audio: {
    disableWebAudio: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game",
  },
  dom: {
    createContainer: true,
  },
  //scene: [ LoadingScene, MenuScene, Level1Scene, Level2Scene, Level3Scene, Level4Scene]
  scene: [LoadingScene, MenuScene],
};

const game = new Phaser.Game(config);

// For Debug (to test specific level, change the value below)
//game.scene.start('Level5Scene');
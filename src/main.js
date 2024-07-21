import Phaser, { Scene } from 'phaser';
import LoadingScene from './scenes/loadingScene.js';
import MenuScene from './scenes/menuScene.js';
import LoginScene from './scenes/LoginScene.js';
import Level1Scene from './scenes/Level1Scene.js';
import Level2Scene from './scenes/Level2Scene.js';
import Level3Scene from './scenes/Level3Scene.js';
import Level4Scene from './scenes/Level4Scene.js';
import Level5Scene from './scenes/Level5Scene.js';
import { auth } from './firebase/firebaseConfig.js'
import { onAuthStateChanged } from 'firebase/auth';
import LeaderboardScene from './scenes/LeaderboardScene.js';


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,

    },
  },
  audio: {
    disableWebAudio: false,
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game',
  },
  dom: {
    createContainer: true,
  },
  scene: [LoginScene,MenuScene,Level1Scene, LeaderboardScene, Level2Scene, Level3Scene, Level4Scene, Level5Scene],


};



// Create the game instance
const game = new Phaser.Game(config);

// Log out the user when the window is closed
window.addEventListener('beforeunload', () => {
  signOut(auth).then(() => {
    console.log('User signed out.');
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
});

// Log out the user when the window is refreshed
window.addEventListener('unload', () => {
  signOut(auth).then(() => {
    console.log('User signed out.');
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
});
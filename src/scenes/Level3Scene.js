import BaseLevelScene from './BaseLevelScene.js';
import { playSoundEffect } from '../utils/commonFunctions.js';

class Level3Scene extends BaseLevelScene {
  constructor() {
    super('Level3Scene');
  }

  preload() {
    // Background Assets
    this.load.image('sky', 'assets/backgrounds/tree.png');
    this.load.atlas('tiles', 'assets/platformer.png', 'assets/platformer.json');

   

    // Entity Assets
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    // SFX Assets
    this.load.audio('starCollected', 'assets/sfx/star_collected.mp3');
    this.load.audio('jumpSound', 'assets/sfx/jump.mp3');
    this.load.audio('waterSplash', 'assets/sfx/water_splash.mp3');
  }

  createPlatforms() {
    // Water
    
    this.water = this.physics.add.staticGroup();

    // Water Tiles
    for (let i = 0; i < 6; i++) {
      this.water.create(i * 128, 552, 'tiles', '17');
    }

    // Ground
    this.ground = this.physics.add.staticGroup();
    this.ground.create(64, 536, 'tiles', '6');
    this.ground.create(64, 536 - 128, 'tiles', '6');
    this.ground.create(64, 536 - 256, 'tiles', '6');
    this.ground.create(64, 536 - 384, 'tiles', '3');
    this.ground.create(736, 536, 'tiles', '1');

    // Platforms
    this.platforms.create(330, 400, 'tiles', 'platform1');
    this.platforms.create(630, 280, 'tiles', 'platform1');

    // Collisions
   this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.water, this.handleWaterCollision, null, this);
  }

  handleWaterCollision(player, water) {
    player.setPosition(64, 64);
    player.setVelocity(0, 0);  // Reset velocity to prevent the player from moving immediately
    playSoundEffect(this, 'waterSplash', { volume: this.volSFX });
  }

  createStars() {
    const starPositions = [
      { x: 200, y: 250 }, { x: 200, y: 320 }, { x: 350, y: 120 },
      { x: 400, y: 300 }, { x: 500, y: 110 }, { x: 500, y: 450 },
      { x: 650, y: 400 }, { x: 650, y: 480 }, { x: 750, y: 450 },
      { x: 550, y: 400 }
    ];

    starPositions.forEach(pos => {
      this.stars.create(pos.x, pos.y, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();
    });
  }

  createPlayer() {
    super.createPlayer(64, 64); // Override with specific coordinates for Level 3
  }
}

export default Level3Scene;

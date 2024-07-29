import BaseLevelScene from './BaseLevelScene.js';

class Level1Scene extends BaseLevelScene {
  constructor() {
    super('Level1Scene');
  }

  init(data) {
    super.init({...data, includeMidground: true, nextScene: 'Level2Scene',});
  }

  createPlatforms() {
    this.sound.stopAll();
    this.sound.add('track1');
    this.sound.play('track1');
    this.platforms.create(200, 553, "ground");
    this.platforms.create(600, 553, "ground");
    this.platforms.create(200, 585, "ground");
    this.platforms.create(600, 585, "ground");

    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
  }

  createStars() {
    const starPositions = [
      { x: 100, y: 100 },
      { x: 200, y: 150 },
      { x: 300, y: 200 },
      { x: 400, y: 300 },
      { x: 400, y: 350 },
      { x: 500, y: 500 },
      { x: 650, y: 500 },
      { x: 650, y: 300 },
      { x: 650, y: 100 },
      { x: 700, y: 150 },
    ];

    starPositions.forEach((pos) => {
      this.stars
        .create(pos.x, pos.y, "star")
        .setOrigin(0.5, 0.5)
        .setScale(1)
        .refreshBody();
    });
  }

  createPlayer() {
    super.createPlayer(100, 500);  // Override with specific coordinates for Level 2
  }
}

export default Level1Scene;

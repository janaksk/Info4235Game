import BaseLevelScene from './BaseLevelScene.js';

class Level2Scene extends BaseLevelScene {
  constructor() {
    super('Level2Scene');
  }

  init(data) {
    super.init({...data, includeMidground: true, nextScene: 'Level3Scene',});
  }

  

  createPlatforms() {
    // Floor
    
    this.platforms.create(200, 553, 'ground');
    this.platforms.create(600, 553, 'ground');
    this.platforms.create(200, 585, 'ground');
    this.platforms.create(600, 585, 'ground');

    // Platforms
    this.platforms.create(530, 440, 'ground');
    this.platforms.create(790, 170, 'ground');

    // Walls
    this.platforms.create(520, 120, 'wall');
    this.platforms.create(237, 465, 'wall');
    this.platforms.create(130, 575, 'wall');
    this.platforms.create(18, 430, 'wall');
  }

  createStars() {
    const starPositions = [
      { x: 100, y: 100 }, { x: 200, y: 150 }, { x: 300, y: 200 },
      { x: 400, y: 300 }, { x: 400, y: 350 }, { x: 500, y: 500 },
      { x: 650, y: 500 }, { x: 650, y: 300 }, { x: 650, y: 100 },
      { x: 700, y: 150 }
    ];

    starPositions.forEach(pos => {
      this.stars.create(pos.x, pos.y, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();
    });
  }

  createPlayer() {
    super.createPlayer(700, 100);  // Override with specific coordinates for Level 2
  }

}

export default Level2Scene;

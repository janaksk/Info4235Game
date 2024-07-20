import BaseLevelScene from './BaseLevelScene.js';

class Level4Scene extends BaseLevelScene {
  constructor() {
    super('Level4Scene');
  }

  preload() {
    super.preload();
    // Specific assets for Level 4
    this.load.image('rocket', 'assets/rocket.png');  // Ensure the path is correct
  }

  init(data) {
    super.init({ ...data, includeMidground: true, rocketSpeed: 200, nextScene: 'Level5Scene' });
  }

  createPlatforms() {
    // Floor
    this.platforms.create(200, 553, 'ground');
    this.platforms.create(600, 553, 'ground');
    this.platforms.create(200, 585, 'ground');
    this.platforms.create(600, 585, 'ground');

    // Walls
    this.platforms.create(300, 600, 'wall');
    this.platforms.create(400, 600, 'wall');
    this.platforms.create(500, 600, 'wall');
    this.platforms.create(700, 650, 'wall');

    // Platforms
    this.platforms.create(0, 400, 'ground');
    this.platforms.create(400, 300, 'ground');
    this.platforms.create(100, 200, 'ground');
    this.platforms.create(800, 140, 'ground');
  }

  createStars() {
    const starPositions = [
      { x: 50, y: 350  }, { x: 150, y: 100 }, { x: 350, y: 500 },
      { x: 400, y: 350 }, { x: 450, y: 500 }, { x: 500, y: 250 },
      { x: 700, y: 400 }, { x: 700, y: 250 }, { x: 750, y: 50 },
      { x: 760, y: 500 }
    ];

    starPositions.forEach(pos => {
      this.stars.create(pos.x, pos.y, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();
    });
  }

  createPlayer() {
    super.createPlayer(100, 450); // Specific coordinates for Level 4
  }

  create() {
    // Call create method from BaseLevelScene
    super.create();

    // Create rockets
    this.rockets = this.physics.add.group({ immovable: true, allowGravity: false });

    this.rocket1 = this.rockets.create(800, 350, 'rocket').setScale(0.5);
    this.rocket1.setVelocityX(-200);

    this.rocket2 = this.rockets.create(0, 250, 'rocket').setScale(0.5);
    this.rocket2.flipX = true;
    this.rocket2.setVelocityX(200);

    this.physics.add.collider(this.player, this.rockets, this.hitRocket, null, this);
   

  }

  update() {
    super.update();

    // If rockets go out of bounds set them back to original position
    if (this.rocket1.x < 0) {
      this.rocket1.setPosition(800, 350);
    }
    if (this.rocket2.x > 800) {
      this.rocket2.setPosition(0, 250);
    }
  }

  hitRocket(player, rocket) {
    this.player.setPosition(100, 450);
  }
}

export default Level4Scene;

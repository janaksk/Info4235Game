import BaseLevelScene from './BaseLevelScene.js';

class Level5Scene extends BaseLevelScene {
  constructor() {
    super('Level5Scene');
  }

  preload() {
    super.preload();
    // Specific assets for Level 5
    this.load.image('rocket', 'assets/rocket.png');
  }

  init(data) {
    super.init({ ...data, includeMidground: true, nextScene: 'Level6Scene', playerStartX: 100, playerStartY: 450 });
  }

  createPlatforms() {
    // Floor
    this.platforms.create(150, 553, 'ground');
    this.platforms.create(750, 553, 'ground');
    this.platforms.create(150, 585, 'ground');
    this.platforms.create(750, 585, 'ground');

    // Walls
    this.platforms.create(610, 590, 'wall');
    this.platforms.create(450, 740, 'wall');

    // Platforms
    this.platforms.create(0, 375, 'ground');
    this.platforms.create(500, 375, 'ground');
    this.platforms.create(300, 200, 'ground');
    this.platforms.create(750, 110, 'ground');

    // Pit Bottom
    this.pit = this.physics.add.staticGroup();
    this.pit.create(450, 600, 'ground');
  }

  createStars() {
    const starPositions = [
      { x: 100, y: 250 }, { x: 200, y: 100 }, { x: 570, y: 500 },
      { x: 400, y: 250 }, { x: 450, y: 500 }, { x: 600, y: 250 },
      { x: 400, y: 100 }, { x: 750, y: 150 }, { x: 590, y: 30 },
      { x: 675, y: 420 }
    ];

    starPositions.forEach(pos => {
      this.stars.create(pos.x, pos.y, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();
    });
  }

  createPlayer() {
    super.createPlayer(100, 450); // Specific coordinates for Level 5
  }

  create() {
    super.create();

    // Rocket variables
    this.rocketSpeed = 200;
    this.rocketSteps = [0, 0, 0, 0, 0];

    // Create rocket group physics
    this.rockets = this.physics.add.group({ immovable: true, allowGravity: false });

    // Create rockets
    const rocketPositions = [
      { x: 490, y: 165 },
      { x: 770, y: 75 },
      { x: 305, y: 340 },
      { x: 190, y: 340 },
      { x: 780, y: 520 }
    ];

    rocketPositions.forEach((pos, index) => {
      const rocket = this.rockets.create(pos.x, pos.y, 'rocket').setScale(0.5);
      rocket.setVelocityX(index % 2 === 0 ? -this.rocketSpeed : this.rocketSpeed);
      if (index % 2 === 1) {
        rocket.flipX = true;
      }
    });

    this.physics.add.collider(this.rockets, this.platforms);
    this.physics.add.overlap(this.player, this.rockets, this.hitRocket, null, this);
    this.physics.add.overlap(this.player, this.pit, this.pitFall, null, this);

    // Add warning text
    this.warningText = this.add.text(400, 300, 'Rocket speed changing soon!', {
      fontSize: '32px',
      fill: '#ff0000',
      align: 'center'
    }).setOrigin(0.5, 0.5).setVisible(false);

    // Show warning text 2 seconds before speed change
    this.time.addEvent({
      delay: 10000,  // Speed change every 10 seconds
      callback: this.showWarningText,
      callbackScope: this,
      loop: true,
      startAt: 2000  // Start 8 seconds after the previous change to show warning for 2 seconds
    });

    // Change rocket speeds every 10 seconds and hide warning text
    this.time.addEvent({
      delay: 10000,
      callback: this.changeRocketSpeeds,
      callbackScope: this,
      loop: true
    });
  }

  update() {
    super.update();

    const rocketDirections = [
      [-1, 1, false, true],
      [-1, 1, false, true],
      [1, -1, true, false],
      [-1, 1, false, true],
      [-1, 1, false, true]
    ];

    this.rockets.getChildren().forEach((rocket, index) => {
      this.rocketSteps[index]++;
      if (this.rocketSteps[index] < 320) {
        rocket.setVelocityX(this.rocketSpeed * rocketDirections[index][0]);
      } else if (this.rocketSteps[index] >= 320 && this.rocketSteps[index] < 640) {
        rocket.setVelocityX(this.rocketSpeed * rocketDirections[index][1]);
        rocket.flipX = rocketDirections[index][3];
      } else if (this.rocketSteps[index] == 640) {
        this.rocketSteps[index] = 0;
        rocket.flipX = rocketDirections[index][2];
        rocket.setVelocityX(this.rocketSpeed * rocketDirections[index][0]);
      }
    });
  }

  showWarningText() {
    this.warningText.setVisible(true);
  }

  changeRocketSpeeds() {
    this.rocketSpeed = Phaser.Math.Between(50, 300);
    this.rockets.getChildren().forEach(rocket => {
      rocket.setVelocityX(rocket.body.velocity.x > 0 ? this.rocketSpeed : -this.rocketSpeed);
    });

    // Hide warning text after speed change
    this.warningText.setVisible(false);
  }

  hitRocket(player, rocket) {
    this.player.setPosition(100, 450);
  }

  pitFall(pit, player) {
    this.player.setPosition(100, 450);
  }
}

export default Level5Scene;

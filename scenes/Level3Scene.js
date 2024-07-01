import { createPlayer, handlePlayerMovement } from '../utils/commonFunctions.js';

class Level3Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level3Scene' });
    }

    scoreText;
    score = 0;
    cursors;
    platforms;
    stars;
    player;

    preload() {
        // Background Assets
        this.load.image('sky', 'assets/backgrounds/sky2.png');
        this.load.image('midground', 'assets/backgrounds/midground.png');

        // Environment Assets
        this.load.image('ground', 'assets/level1to5/platform.png');
        this.load.image('wall', 'assets/level1to5/verticalplat.png');

        // Entity Assets
        this.load.image('star', 'assets/star.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(400, 300, 'sky');
        //this.add.image(400, 300, 'midground');
        this.platforms = this.physics.add.staticGroup();
        
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

        this.player = createPlayer(this, 700, 100);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.stars = this.physics.add.staticGroup();

        const starPositions = [
            { x: 100, y: 100 }, { x: 200, y: 150 }, { x: 300, y: 200 },
            { x: 400, y: 300 }, { x: 400, y: 350 }, { x: 500, y: 500 },
            { x: 650, y: 500 }, { x: 650, y: 300 }, { x: 650, y: 100 },
            { x: 700, y: 150 }
        ];

        starPositions.forEach(pos => {
            this.stars.create(pos.x, pos.y, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();
        });

        this.scoreText = this.add.text(16, 16, 'Score: 0/10', { fontSize: '32px', fill: '#000' });
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }

    update() {
        handlePlayerMovement(this.cursors, this.player);
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score} /10`);

        if (this.score === 10) {
            this.scene.start('Level4Scene');
        }
    }
}

export default Level3Scene;
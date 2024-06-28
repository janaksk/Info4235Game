import { createPlayer, handlePlayerMovement } from '../utils/commonFunctions.js';

class Level2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2Scene' });
    }

    scoreText;
    score = 0;
    cursors;
    platforms;
    stars;
    player;

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground2', 'assets/platform2.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(0, 600, 'ground2');
        this.platforms.create(400, 600, 'ground2');
        this.platforms.create(600, 600, 'ground2');

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
            this.scene.start('Level3Scene');
        }
    }
}

export default Level2Scene;

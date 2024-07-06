import { createPlayer, handlePlayerMovement } from '../utils/commonFunctions.js';

class Level4Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level4Scene' });
    }

    scoreText;
    score = 0;
    cursors;
    platforms;
    stars;
    player;
    bombs;
    rockets;
    
    preload() {
        // Background Assets
        this.load.image('sky', 'assets/backgrounds/sky.png');
        this.load.image('midground', 'assets/backgrounds/midground.png');

        // Environment Assets
        this.load.image('ground', 'assets/level1to5/platform.png');
        this.load.image('wall', 'assets/level1to5/verticalplat.png');

        // Entity Assets
        this.load.image('star', 'assets/star.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('rocket', 'assets/rocket.png');
    }

    create() {
        // Putting Foreground and midground
        this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'midground');
        this.platforms = this.physics.add.staticGroup();
        
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
        this.platforms.create(800, 100, 'ground');

        this.player = createPlayer(this, 100, 450);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.stars = this.physics.add.staticGroup();
        
        const starPositions = [
            { x: 50, y: 350  }, { x: 150, y: 100 }, { x: 350, y: 500 },
            { x: 400, y: 350 }, { x: 450, y: 500 }, { x: 500, y: 250 },
            { x: 700, y: 400 }, { x: 750, y: 50 }, { x: 760, y: 170 },
            { x: 760, y: 500 }
        ];

        starPositions.forEach(pos => {
            this.stars.create(pos.x, pos.y, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();
        });

        this.scoreText = this.add.text(16, 16, 'Score: 0/10', { fontSize: '32px', fill: '#000' });
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // Rockets
        // Image source for rocket https://opengameart.org/content/some-random-space-stuff
        this.rockets = this.physics.add.group({immovable: true, allowGravity: false});
        
        this.rocket1 = this.rockets.create(800, 350, 'rocket').setScale(0.5);
        this.rocket1.setVelocityX(-300);

        this.rocket2 = this.rockets.create(0, 250, 'rocket').setScale(0.5);
        this.rocket2.flipX = true;
        this.rocket2.setVelocityX(300);

        this.physics.add.overlap(this.player, this.rockets, this.hitRocket, null, this);

        // bombs
        // this.bombs = this.physics.add.group();

        // this.bomb = this.bombs.create(16, 16, 'bomb');
        // this.bomb.setBounce(1);
        // this.bomb.setCollideWorldBounds(true);
        // this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        // this.physics.add.collider(this.bombs, this.platforms);
        // this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        handlePlayerMovement(this.cursors, this.player);
        // If rockets go out of bounds set them back to original position
        if (this.rocket1.x < 0) {
            this.rocket1.setPosition(800, 350);
        }
        if (this.rocket2.x > 800) {
            this.rocket2.setPosition(0, 250);
        }
    }

    // hitBomb (player, bomb) {
    //     this.player.setPosition(100, 450);
    // }

    hitRocket (player, rocket){
        this.player.setPosition(100, 450);
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score} /10`);
        if (this.score === 10) {
            this.scene.start('Level5Scene');
        }
    }
}

export default Level4Scene;

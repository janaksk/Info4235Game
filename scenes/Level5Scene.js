import { createPlayer, handlePlayerMovement, playSoundEffect } from '../utils/commonFunctions.js';

class Level5Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level5Scene' });
    }

    scoreText;
    score = 0;
    cursors;
    platforms;
    stars;
    player;
    pit;

    //Enemy variables
    enemyDudes;
    enemyDudeSpeed = 200;
    enemyDudeSpeed2 = 200;
    enemyDudeSpeed3 = 200;
    enemyDudeSpeed4 = 200;
    enemyDudeSpeed5 = 200;
    enemyDudeSteps = 0;
    enemyDudeSteps2 = 0;
    enemyDudeSteps3 = 0;
    enemyDudeSteps4 = 0;
    enemyDudeSteps5 = 0;

    // Sound settings will replace these values
    volMusic = 1;
    volSFX = .5;

    init () {
        // Camera Fade in
        this.cameras.main.fadeIn(800);
    }
    
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
        this.load.image('rocket', 'assets/rocket.png');

        // SFX Assets
        this.load.audio('starCollected', 'assets/sfx/star_collected.mp3');
        this.load.audio('jumpSound', 'assets/sfx/jump.mp3');

    }

    create() {
        // Putting Foreground and midground
        this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'midground');
        this.platforms = this.physics.add.staticGroup();
        
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

        //Pit Bottom
        this.pit = this.physics.add.staticGroup();
        this.pit.create(450, 600, 'ground');
        

        this.player = createPlayer(this, 100, 450);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.stars = this.physics.add.staticGroup();
        
        const starPositions = [
            { x: 100, y: 250 }, { x: 200, y: 100 }, { x: 570, y: 500 },
            { x: 400, y: 250 }, { x: 450, y: 500 }, { x: 600, y: 250 },
            { x: 400, y: 100 }, { x: 750, y: 150 }, { x: 590, y: 30 },
            { x: 675, y: 420 }
        ];

        starPositions.forEach(pos => {
            this.stars.create(pos.x, pos.y, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();
        });

        this.scoreText = this.add.text(16, 16, 'Score: 0/10', { fontSize: '32px', fill: '#000' });
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.physics.add.overlap(this.player, this.pit,this.pitFall, null, this);

        //Enemy Step Debug Counters
        //this.enemyDudeStepsText = this.add.text(16, 48, 'Enemy 1 Steps', { fontSize: '32px', fill: '#000' });
        //this.enemyDudeStepsText2 = this.add.text(16, 48, 'Enemy 2 Steps', { fontSize: '32px', fill: '#000' });
        //this.enemyDudeStepsText3 = this.add.text(16, 48, 'Enemy 3 Steps', { fontSize: '32px', fill: '#000' });
        //this.enemyDudeStepsText4 = this.add.text(16, 48, 'Enemy 4 Steps', { fontSize: '32px', fill: '#000' });
        //this.enemyDudeStepsText5 = this.add.text(16, 48, 'Enemy 5 Steps', { fontSize: '32px', fill: '#000' });

        //Create enemy group physics
        this.enemyDudes = this.physics.add.group({immovable: true, allowGravity: false});
        
        //Create and set velocity of enemy 1
        this.enemyDude1 = this.enemyDudes.create(490, 165, 'rocket').setScale(0.5);
        this.enemyDude1.setVelocityX(-this.enemyDudeSpeed);

        //Create and set velocity of enemy 2
        this.enemyDude2 = this.enemyDudes.create(770, 75, 'rocket').setScale(0.5);
        this.enemyDude2.setVelocityX(-this.enemyDudeSpeed2);

        //Create and set velocity of enemy 3
        this.enemyDude3 = this.enemyDudes.create(305, 340, 'rocket').setScale(0.5);
        this.enemyDude3.setVelocityX(-this.enemyDudeSpeed3);
        this.enemyDude3.flipX = true;

        //Create and set velocity of enemy 4
        this.enemyDude4 = this.enemyDudes.create(190, 340, 'rocket').setScale(0.5);
        this.enemyDude4.setVelocityX(-this.enemyDudeSpeed4);

        //Create and set velocity of enemy 5
        this.enemyDude5 = this.enemyDudes.create(780, 520, 'rocket').setScale(0.5);
        this.enemyDude5.setVelocityX(-this.enemyDudeSpeed5);

        this.physics.add.collider(this.enemyDudes, this.platforms);

        //Create collision between player and enemies
        this.physics.add.overlap(this.player, this.enemyDudes, this.hitEnemy, null, this);

        //Create collision between player and bottom of pit
        this.physics.add.overlap(this.player, this.pit, this.pitFall, null, this);
        
    }

    update() {
        handlePlayerMovement(this.cursors, this.player);

         // Example: Directly play jump sound
         if (this.cursors.up.isDown && this.player.body.touching.down) {
            playSoundEffect(this, 'jumpSound', { volume: this.volSFX });
        } 

        //Debug Enemy Step Counters
        //this.enemyDudeStepsText.setText(`Enemy 1 Steps: ${this.enemyDudeSteps}`);
        //this.enemyDudeStepsText2.setText(`Enemy 2 Steps: ${this.enemyDudeSteps2}`);
        //this.enemyDudeStepsText3.setText(`Enemy 3 Steps: ${this.enemyDudeSteps3}`);
        //this.enemyDudeStepsText4.setText(`Enemy 4 Steps: ${this.enemyDudeSteps4}`);
        //this.enemyDudeStepsText5.setText(`Enemy 5 Steps: ${this.enemyDudeSteps5}`);
        
        //Control movement of enemy 1
        this.enemyDudeSteps++;
        if (this.enemyDudeSteps < 320) {
            this.enemyDude1.setVelocityX(-this.enemyDudeSpeed);
        }
        else if (this.enemyDudeSteps >= 320 && this.enemyDudeSteps < 640) {
            this.enemyDude1.setVelocityX(this.enemyDudeSpeed);
            this.enemyDude1.flipX = true;
        }
        else if (this.enemyDudeSteps == 640){
            this.enemyDudeSteps = 0;
            this.enemyDude1.flipX = false;
            this.enemyDude1.setVelocityX(-this.enemyDudeSpeed);
        }

        //Control movement of enemy 2
        this.enemyDudeSteps2++;
        if (this.enemyDudeSteps2 < 170) {
            this.enemyDude2.setVelocityX(-this.enemyDudeSpeed2);
        }
        else if (this.enemyDudeSteps2 >= 170 && this.enemyDudeSteps2 < 340) {
            this.enemyDude2.setVelocityX(this.enemyDudeSpeed2);
            this.enemyDude2.flipX = true;
        }
        else if (this.enemyDudeSteps2 == 340){
            this.enemyDudeSteps2 = 0;
            this.enemyDude2.flipX = false;
            this.enemyDude2.setVelocityX(-this.enemyDudeSpeed2);
        }

        //Control movement of enemy 3
        this.enemyDudeSteps3++;
        if (this.enemyDudeSteps3 < 320) {
            this.enemyDude3.setVelocityX(this.enemyDudeSpeed3);
        }
        else if (this.enemyDudeSteps3 >= 320 && this.enemyDudeSteps3 < 640) {
            this.enemyDude3.setVelocityX(-this.enemyDudeSpeed3);
            this.enemyDude3.flipX = false;
        }
        else if (this.enemyDudeSteps3 == 640){
            this.enemyDudeSteps3 = 0;
            this.enemyDude3.flipX = true;
            this.enemyDude3.setVelocityX(this.enemyDudeSpeed3);
        }

        //Control movement of enemy 4
        this.enemyDudeSteps4++;
        if (this.enemyDudeSteps4 < 150) {
            this.enemyDude4.setVelocityX(-this.enemyDudeSpeed4);
        }
        else if (this.enemyDudeSteps4 >= 150 && this.enemyDudeSteps4 < 300) {
            this.enemyDude4.setVelocityX(this.enemyDudeSpeed4);
            this.enemyDude4.flipX = true;
        }
        else if (this.enemyDudeSteps4 == 300){
            this.enemyDudeSteps4 = 0;
            this.enemyDude4.flipX = false;
            this.enemyDude4.setVelocityX(-this.enemyDudeSpeed4);
        }

        //Control movement of enemy 5
        this.enemyDudeSteps5++;
        if (this.enemyDudeSteps5 < 110) {
            this.enemyDude5.setVelocityX(-this.enemyDudeSpeed5);
        }
        else if (this.enemyDudeSteps5 >= 110 && this.enemyDudeSteps5 < 220) {
            this.enemyDude5.setVelocityX(this.enemyDudeSpeed5);
            this.enemyDude5.flipX = true;
        }
        else if (this.enemyDudeSteps5 == 220){
            this.enemyDudeSteps5 = 0;
            this.enemyDude5.flipX = false;
            this.enemyDude5.setVelocityX(-this.enemyDudeSpeed2);
        }
    }

    //Reset player to start of level if collided with enemy
    hitEnemy (player, enemyDudes){
        this.player.setPosition(100, 450);
    }

    //Reset player to start of level if fallen down pit
    pitFall (pit, player){
        this.player.setPosition(100, 450);
    }

    collectStar(player, star) {
        // Play the star collection SFX using the external function
        playSoundEffect(this, 'starCollected', { volume: this.volSFX });

        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score} /10`);

        if (this.score === 10) {
            // Fade Out Camera
            this.cameras.main.fadeOut(800);

            // Start next level after camera has faded
            this.time.delayedCall(800, function() {
                this.scene.start('Level6Scene');
            }, [], this);
        }
    }
}

export default Level5Scene;

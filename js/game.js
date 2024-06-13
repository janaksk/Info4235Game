class DebugMenu extends Phaser.Scene{

    // Gunna add like a quick and sloppy menu where you can quick select a level (for testing, will be disabled in final game)







}

/* ----------------------------------------------------------------------- LEVEL 1 ------------------------------------------------------------------------*/
/* --------------------------------------------------------------------------------------------------------------------------------------------------------*/  
class Level1Scene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'Level1Scene' });
    }

    scoreText;
    score = 0;
    cursors;
    platforms;
    stars;
    player;

    preload ()
    {
        /* PRELOAD ASSETS */

        // ENVIRONMENT SPRITES HERE:
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');

        // INTERACTABLES HERE:
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');

        // SPRITESHEETS HERE: 
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create ()
    {
        /* --------- LEVEL BACKGROUND  --------- */
        this.add.image(400, 300, 'sky');

        /* --------- LEVEL 1 DATA --------- */
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');


        /* --------- PLAYER DATA --------- */

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        /* --------- END OF PLAYER --------- */

        // CURSOR KEYS
        this.cursors = this.input.keyboard.createCursorKeys();

        /* --------- LEVEL 1 STARS PLACEMENT  --------- */
        // Create a static group for stars
        this.stars = this.physics.add.staticGroup();

        // Add each star individually with specific positions
        this.stars.create(100, 100, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 1
        this.stars.create(200, 150, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 2
        this.stars.create(300, 200, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 3
        this.stars.create(400, 300, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 4
        this.stars.create(400, 350, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 5
        this.stars.create(500, 500, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 6
        this.stars.create(650, 500, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 7
        this.stars.create(650, 300, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 8
        this.stars.create(650, 100, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 9
        this.stars.create(700, 150, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 10

        /* --------- END OF STARS --------- */


        /* --------- USER INTERFACE  --------- */
        this.scoreText = this.add.text(16, 16, 'Score: 0/10', { fontSize: '32px', fill: '#000' });
        

        /* --------- GLOBAL PHYSICS  --------- */
        this.physics.add.collider(this.player, this.platforms);
        //this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        
    }

    update ()
    {
        /* ------ PLAYER MOVEMENT DATA ----- */
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    
    collectStar (player, star)
    {
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score} /10`);

        // Check if all stars are collected
        if (this.score === 10) {
            this.scene.start('Level2Scene');
        }
    }
}

/* ----------------------------------------------------------------------- LEVEL 2 ------------------------------------------------------------------------*/
/* --------------------------------------------------------------------------------------------------------------------------------------------------------*/  
class Level2Scene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'Level2Scene' });
    }
    scoreText;
    score = 0;
    cursors;
    platforms;
    stars;
    player;

    preload ()
    {
        /* PRELOAD ASSETS */

        // ENVIRONMENT SPRITES HERE:
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground2', 'assets/platform2.png');

        // INTERACTABLES HERE:
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');

        // SPRITESHEETS HERE: 
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create ()
    {
        /* --------- LEVEL BACKGROUND  --------- */
        this.add.image(400, 300, 'sky');

        /* --------- LEVEL 2 DATA --------- */
        this.platforms = this.physics.add.staticGroup();

        //FLOOR
        this.platforms.create(0, 600, 'ground2');
        this.platforms.create(400, 600, 'ground2');
        this.platforms.create(600, 600, 'ground2');


        /* --------- PLAYER DATA --------- */

        this.player = this.physics.add.sprite(700, 100, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        /* --------- END OF PLAYER --------- */

        // CURSOR KEYS
        this.cursors = this.input.keyboard.createCursorKeys();

        /* --------- LEVEL 1 STARS PLACEMENT  --------- */
        // Create a static group for stars
        this.stars = this.physics.add.staticGroup();

        // Add each star individually with specific positions
        /*
        this.stars.create(100, 100, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 1
        this.stars.create(200, 150, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 2
        this.stars.create(300, 200, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 3
        this.stars.create(400, 300, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 4
        this.stars.create(400, 350, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 5
        this.stars.create(500, 500, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 6
        this.stars.create(650, 500, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 7
        this.stars.create(650, 300, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 8
        this.stars.create(650, 100, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 9
        this.stars.create(700, 150, 'star').setOrigin(0.5, 0.5).setScale(1).refreshBody();  // position 10
        */
        /* --------- END OF STARS --------- */


        /* --------- USER INTERFACE  --------- */
        this.scoreText = this.add.text(16, 16, 'Score: 0/10', { fontSize: '32px', fill: '#000' });
        

        /* --------- GLOBAL PHYSICS  --------- */
        this.physics.add.collider(this.player, this.platforms);
        //this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        
    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    
    collectStar (player, star)
    {
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score} /10`);

        // Check if all stars are collected
        if (this.score === 10) {
            this.scene.start('Level3Scene');
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Level1Scene, Level2Scene ]
};

const game = new Phaser.Game(config);
class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        // Load assets needed for the loading screen
        this.load.image('logo', 'assets/logo.png');
        
        // Load other game assets
        this.load.image('sky', 'assets/backgrounds/sky.png');
        this.load.image('midground', 'assets/backgrounds/midground.png');
        this.load.image('ground', 'assets/level1to5/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('starCollected', 'assets/sfx/star_collected.mp3');
        this.load.audio('jumpSound', 'assets/sfx/jump.mp3');
        this.load.audio('track2', 'assets/music/Track2.mp3');

        // Create a loading animation
        let loadingText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 'Loading...', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5);

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
        });

        this.load.on('filecomplete', (file) => {
            console.log(`Loaded: ${file.key}`);
        });
    }

    create() {
        // Adding Phaser built-in animation (logo spin)
        let logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'logo');
        this.tweens.add({
            targets: logo,
            angle: 360,
            duration: 3000,
            repeat: -1,
            ease: 'Linear'
        });

        // Wait for 5-10 seconds before transitioning to the menu
        this.time.delayedCall(5000, () => {
            this.scene.start('MenuScene');
        });
    }
}

export default LoadingScene;

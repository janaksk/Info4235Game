class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        // Load assets needed for the loading screen
        this.load.image('logo', 'assets/logo.png');

        // Load other game assets
        this.load.image('menuBackground', 'assets/backgrounds/sky.png');

        // Create loading text
        this.loadingText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 'Loading...', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5);

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

        // Wait for 5 seconds (the duration of the fake loading) before transitioning to the menu
        this.time.delayedCall(4000, () => {
            this.scene.start('MenuScene');
        });
    }
}

export default LoadingScene;

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.add.image(400, 300, 'sky');

        let title = this.add.text(400, 150, 'Patman', {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5);

        let playButton = this.add.text(400, 250, 'Play', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5).setInteractive();

        let continueButton = this.add.text(400, 300, 'Continue', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5).setInteractive();

        let levelsButton = this.add.text(400, 350, 'Levels', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5).setInteractive();

        let quitButton = this.add.text(400, 400, 'Quit', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5).setInteractive();

        // display a selection indicator

        playButton.on('pointerdown', () => {
            // Logic to start the game
            console.log('Play button clicked');
            this.scene.start('Level1Scene');
        }   );

        //add keyboard controls to the menu buttons to allow for keyboard navigation


        continueButton.on('pointerdown', () => {
            // Logic to continue the game
            console.log('Continue button clicked');
        });

        levelsButton.on('pointerdown', () => {
            // Logic to show level selection
            console.log('Levels button clicked');
        });

        quitButton.on('pointerdown', () => {
            // Logic to quit the game
            console.log('Quit button clicked');
        });
    }
}

export default MenuScene;

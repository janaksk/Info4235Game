import {
  createPlayer,
  handlePlayerMovement,
  playSoundEffect,
} from "../utils/commonFunctions.js";
//import { auth } from "../firebase/firebaseConfig.js";
import { saveCompletionTime, setLastClearedLevel } from "../firebase/firebaseUtil.js";
import { formatTime } from "../utils/formatTime.js";


class BaseLevelScene extends Phaser.Scene {
  constructor(key) {
    super({ key });
  }

  init(data) {
    this.cameras.main.fadeIn(800);
    this.user = data.user;
    this.level = data.level;
    this.nextScene = data.nextScene || "MainMenuScene";
    this.includeMidground = data.includeMidground || false;
  }

  preload() {
    // Common assets
    this.load.image("sky", "assets/backgrounds/sky.png");
    this.load.image("midground", "assets/backgrounds/midground.png");
    this.load.image("rocket", "assets/rocket.png");
    this.load.image("ground", "assets/level1to5/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("wall", "assets/level1to5/verticalplat.png");
    this.load.audio("starCollected", "assets/sfx/star_collected.mp3");
    this.load.audio("jumpSound", "assets/sfx/jump.mp3");
    // Background Assets
    this.load.image("sky", "assets/backgrounds/tree.png");
    this.load.atlas("tiles", "assets/platformer.png", "assets/platformer.json");
    // SFX Assets
    this.load.audio('track1', 'assets/music/Track1.mp3')
    this.load.audio("waterSplash", "assets/sfx/water_splash.mp3");
  }

  create() {

    const backgroundMusic = this.sound.add('track1', { volume: this.volMusic, loop: true });
backgroundMusic.play();

    this.add.image(400, 300, "sky");
    if (this.includeMidground) {
      this.add.image(400, 300, "midground");
    }
    this.platforms = this.physics.add.staticGroup();
    this.stars = this.physics.add.staticGroup();
    this.createPlayer();
    this.createPlatforms();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createStars();

    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0/10", {
      fontSize: "32px",
      fill: "#000",
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    this.timerText = this.add.text(500, 16, `Time: 00:00:00`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.timeElapsed = 0;
    this.time.addEvent({
      delay: 10,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    handlePlayerMovement(this.cursors, this.player);
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      playSoundEffect(this, "jumpSound", { volume: this.volSFX });
    }
  }

  createPlatforms() {
    // To be overridden by specific level scenes
  }

  createStars() {
    // To be overridden by specific level scenes
  }

  createPlayer(x, y) {
    this.player = createPlayer(this, x, y);
  }

  updateTimer() {
    this.timeElapsed += 10;
    this.timerText.setText(`Time: ${formatTime(this.timeElapsed)}`);
  }

  async collectStar(player, star) {
    playSoundEffect(this, "starCollected", { volume: this.volSFX });
    star.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score} /10`);

    if (this.score === 1) {
      if (!this.user) {
        if(this.nextScene === "Level6Scene"){
          this.cameras.main.fadeOut(800);
          this.scene.start("LoginScene");
        }
        else{
          this.cameras.main.fadeOut(800);
          this.scene.start(this.nextScene);
        }
      }
      else{
        const completionTime = this.timeElapsed;
      await saveCompletionTime(this.level, this.user.uid, completionTime);
      await setLastClearedLevel(this.user.uid, ((this.nextScene).split("Level")[1]).split("Scene")[0]);  
      

      this.cameras.main.fadeOut(800);
      this.time.delayedCall(
        800,
        () =>
          this.scene.start("LeaderboardScene", {
            level: this.level,
            nextScene: this.nextScene,
            user: this.user,
          }),
        [],
        this
      );
      }
    }
  }
}

export default BaseLevelScene;

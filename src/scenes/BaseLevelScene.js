import {
    createPlayer,
    handlePlayerMovement,
    playSoundEffect,
  } from "../utils/commonFunctions.js";
  
  import { auth, db } from "../firebase/firebaseConfig.js";
  import { ref, push } from "firebase/database";
  
  class BaseLevelScene extends Phaser.Scene {
    constructor(key) {
      super({ key });
    }
  
    init(data) {
      this.cameras.main.fadeIn(800);
      this.userId = auth.currentUser ? auth.currentUser.uid : null;
      this.level = data.level || 'UnknownLevel';
      this.nextScene = data.nextScene || 'MainMenuScene';
    }
  
    preload() {
      // Common assets
      this.load.image("sky", "assets/backgrounds/sky.png");
      this.load.image("midground", "assets/backgrounds/midground.png");
      this.load.image("ground", "assets/level1to5/platform.png");
      this.load.image("star", "assets/star.png");
      this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
      });
      this.load.image('wall', 'assets/level1to5/verticalplat.png');
      this.load.audio("starCollected", "assets/sfx/star_collected.mp3");
      this.load.audio("jumpSound", "assets/sfx/jump.mp3");
          // Background Assets
    this.load.image('sky', 'assets/backgrounds/tree.png');
    this.load.atlas('tiles', 'assets/platformer.png', 'assets/platformer.json');
    // SFX Assets

    this.load.audio('waterSplash', 'assets/sfx/water_splash.mp3');
    }
    
    create() {
      this.add.image(400, 300, "sky");
      this.add.image(400, 300, "midground");
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
      let totalMilliseconds = this.timeElapsed;
      let minutes = Math.floor(totalMilliseconds / 60000);
      totalMilliseconds %= 60000;
      let seconds = Math.floor(totalMilliseconds / 1000);
      let milliseconds = totalMilliseconds % 1000;
  
      let formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
      this.timerText.setText(`Time: ${formattedTime}`);
    }
  
    async collectStar(player, star) {
      playSoundEffect(this, "starCollected", { volume: this.volSFX });
      star.disableBody(true, true);
      this.score += 1;
      this.scoreText.setText(`Score: ${this.score} /10`);
  
      if (this.score === 10) {
        const completionTime = this.timeElapsed;
        const userId = this.userId;
        await this.saveCompletionTime(this.level, userId, completionTime);
  
        this.cameras.main.fadeOut(800);
        this.time.delayedCall(
          800,
          () => this.scene.start("LeaderboardScene", { level: this.level }),
          [],
          this
        );
      }
    }
  
    async saveCompletionTime(level, userId, time) {
      try {
        const leaderboardRef = ref(db, `leaderboard/${level}`);
        await push(leaderboardRef, {
          userId: userId,
          time: time
        });
        console.log("Completion time saved to Realtime Database");
      } catch (e) {
        console.error("Error saving completion time: ", e);
      }
    }
  }
  
  export default BaseLevelScene;
  
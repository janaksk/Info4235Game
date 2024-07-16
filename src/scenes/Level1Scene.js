import {
  createPlayer,
  handlePlayerMovement,
  playSoundEffect,
} from "../utils/commonFunctions.js";

import { auth, db } from "../firebase/firebaseConfig.js";
import {  ref, push } from "firebase/database";

class Level1Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level1Scene" });
  }

  scoreText;
  score = 0;
  cursors;
  platforms;
  stars;
  player;
  //timer variables
  timerText;
  timeElapsed = 0;
  usernameText;

  // Sound settings will replace these values
  volMusic = 1;
  volSFX = 0.5;

  init(data) {
    // Camera Fade in
    this.cameras.main.fadeIn(800);
    this.userId = auth.currentUser ? auth.currentUser.uid : null;
  }

  preload() {
    // Background Assets
    this.load.image("sky", "assets/backgrounds/sky.png");
    this.load.image("midground", "assets/backgrounds/midground.png");

    // Environment Assets
    this.load.image("ground", "assets/level1to5/platform.png");

    // Entity Assets
    this.load.image("star", "assets/star.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    // SFX Assets
    this.load.audio("starCollected", "assets/sfx/star_collected.mp3");
    this.load.audio("jumpSound", "assets/sfx/jump.mp3");
  }

  create() {
    // Putting Foreground and midground
    this.add.image(400, 300, "sky");
    this.add.image(400, 300, "midground");
    this.platforms = this.physics.add.staticGroup();

    // Floor
    this.platforms.create(200, 553, "ground");
    this.platforms.create(600, 553, "ground");
    this.platforms.create(200, 585, "ground");
    this.platforms.create(600, 585, "ground");

    // Platforms
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    this.player = createPlayer(this, 100, 450);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.stars = this.physics.add.staticGroup();

    const starPositions = [
      { x: 100, y: 100 },
      { x: 200, y: 150 },
      { x: 300, y: 200 },
      { x: 400, y: 300 },
      { x: 400, y: 350 },
      { x: 500, y: 500 },
      { x: 650, y: 500 },
      { x: 650, y: 300 },
      { x: 650, y: 100 },
      { x: 700, y: 150 },
    ];

    starPositions.forEach((pos) => {
      this.stars
        .create(pos.x, pos.y, "star")
        .setOrigin(0.5, 0.5)
        .setScale(1)
        .refreshBody();
    });

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

    // Timer
    this.timerText = this.add.text(500, 16, `Time: 00:00:00`, {
      fontSize: "32px",
      fill: "#000",
    }); // Add timer text
    this.time.addEvent({
      delay: 10,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    handlePlayerMovement(this.cursors, this.player);

    // Example: Directly play jump sound
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      playSoundEffect(this, "jumpSound", { volume: this.volSFX });
    }
  }

  updateTimer() {
    this.timeElapsed += 10; // Increment by 10 milliseconds

    let totalMilliseconds = this.timeElapsed;
    let minutes = Math.floor(totalMilliseconds / 60000);
    totalMilliseconds %= 60000;
    let seconds = Math.floor(totalMilliseconds / 1000);
    let milliseconds = totalMilliseconds % 1000;

    let formattedTime = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
    this.timerText.setText(`Time: ${formattedTime}`);
}

async collectStar(player, star) {
  // Play the star collection SFX using the external function
  playSoundEffect(this, "starCollected", { volume: this.volSFX });

  star.disableBody(true, true);
  this.score += 1;
  this.scoreText.setText(`Score: ${this.score} /10`);

  if (this.score === 10) {
    // Save the completion time to Firebase Realtime Database
    const completionTime = this.timeElapsed;
    const userId = this.userId; // Use the username as the user ID
    await this.saveCompletionTime("Level1", userId, completionTime);

    // Fade Out Camera
    this.cameras.main.fadeOut(800);

    // Start next level after camera has faded
    this.time.delayedCall(
      800,
      function () {
        this.scene.start("LeaderboardScene");
      },
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

export default Level1Scene;

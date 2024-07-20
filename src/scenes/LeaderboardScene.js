import {
  ref,
  query,
  orderByChild,
  limitToFirst,
  get,
  orderByValue,
  equalTo,
} from "firebase/database";
import { auth, db } from "../firebase/firebaseConfig.js";
import { getUserNames } from "../firebase/auth.js";
import { formatTime } from "../utils/formatTime.js";

class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: "LeaderboardScene" });
  }

  init(data) {
    this.cameras.main.fadeIn(800);
    this.level = data.level;
    this.nextScene = data.nextScene || "MenuScene";
    console.log(`insiie init ${this.level}, ${this.nextScene}`);
  }

  async create() {
    this.add
      .text(400, 50, "Leaderboard", { fontSize: "32px", fill: "#789" })
      .setOrigin(0.5);

    const leaderboard = await this.getLeaderboard(this.level);
    const playerRank = await this.getPlayerRank(this.level, auth.currentUser.uid);

    let yPosition = 100;
    leaderboard.forEach((entry, index) => {
      this.add
        .text(
          400,
          yPosition,
          `${index + 1}. ${entry.username}: ${formatTime(entry.time)}`,
          { fontSize: "24px", fill: "#789" }
        )
        .setOrigin(0.5);
      yPosition += 30;
    });

    // Display current player's rank if they are not in the top 10
    if (playerRank > 10) {
      this.add
        .text(400, yPosition + 30, `Your Rank: ${playerRank}`, {
          fontSize: "24px",
          fill: "#000",
        })
        .setOrigin(0.5);
    }

    this.time.delayedCall(
      8000,
      () => this.scene.start(this.nextScene, { level: this.nextScene.split("Scene")[0] }),
      [],
      this
    );
   
  }

  async getLeaderboard(level) {
    const leaderboardRef = ref(db, `leaderboard/${level}`);
    const q = query(leaderboardRef, orderByChild("time"), limitToFirst(10));
    const snapshot = await get(q);
    const leaderboard = [];
    const userIds = new Set();

    snapshot.forEach((childSnapshot) => {
      const entry = childSnapshot.val();
      leaderboard.push(entry);
      userIds.add(entry.userId);
    });

    console.log(userIds);
    const usersNames = await getUserNames(userIds);
  

    leaderboard.forEach((entry) => {
      entry.username = usersNames[entry.userId] || "Unknown User";
    });

    return leaderboard;
  }

  

  async getPlayerRank(level, userId) {
    const leaderboardRef = ref(db, `leaderboard/${level}`);
    const q = query(leaderboardRef, orderByChild("time"));
    const snapshot = await get(q);
    let rank = 0;
    let playerRank = null;

    snapshot.forEach((childSnapshot) => {
      rank += 1;
      if (childSnapshot.val().userId === userId) {
        playerRank = rank;
      }
    });

    return playerRank;
  }

}

export default LeaderboardScene;

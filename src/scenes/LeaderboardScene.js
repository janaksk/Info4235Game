import {
  ref,
  query,
  orderByChild,
  limitToFirst,
  get,
} from "firebase/database";
import { db } from "../firebase/firebaseConfig.js";
import { getUserNames } from "../firebase/auth.js";
import { formatTime } from "../utils/formatTime.js";
import { calculateTotalCompletionTime } from "../firebase/leaderBoardUtil.js";

class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: "LeaderboardScene" });
  }

  init(data) {
    this.cameras.main.fadeIn(800);
    this.user = data.user;
    this.level = data.level;
    this.nextScene = data.nextScene || "MenuScene";
  
  }

  async create() {
    this.add
      .text(400, 50, "Leaderboard", { fontSize: "32px", fill: "#789" })
      .setOrigin(0.5);

    const leaderboard = await this.getLeaderboard(this.level);
    const playerRank = await this.getPlayerRank(this.level, this.user.uid);

    if (this.level === "Level5") {
      calculateTotalCompletionTime(this.user.uid);
    }

    let yPosition = 100;
    leaderboard.forEach((entry, index) => {
      this.add
        .text(
          400,
          yPosition,
          `${index + 1}. ${entry.userId}: ${formatTime(entry.time)}`,
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
      2000,
      () => this.scene.start(this.nextScene, { level: this.nextScene.split("Scene")[0], user: this.user }),
      [],
      this
    );
   
  }

  async getLeaderboard(level) {
    const leaderboardRef = ref(db, `leaderboard/${level}`);
    const q = query(leaderboardRef, orderByChild("time"), limitToFirst(10));
    const snapshot = await get(q);
    const leaderboard = [];
    const userIds = new Set();//set is a collection of unique values

    snapshot.forEach((childSnapshot) => {
      const entry = childSnapshot.val();
      leaderboard.push({
        userId: childSnapshot.key,
        time: entry.time,
      })
      userIds.add(childSnapshot.key);
    }
    );

;

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

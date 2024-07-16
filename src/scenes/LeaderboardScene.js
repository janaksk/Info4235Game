import {  ref, query, orderByChild, limitToFirst, get, orderByValue, equalTo } from "firebase/database";
import { auth, db } from "../firebase/firebaseConfig.js";



class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: "LeaderboardScene" });
  }

  async create() {
    this.add.text(400, 50, "Leaderboard", { fontSize: "32px", fill: "#789" }).setOrigin(0.5);

    const level = "Level1"; // Change this to the appropriate level key
    const leaderboard = await this.getLeaderboard(level);
    const playerRank = await this.getPlayerRank(level, auth.currentUser.uid);

    let yPosition = 100;
    leaderboard.forEach((entry, index) => {
      this.add.text(400, yPosition, `${index + 1}. ${entry.userId}: ${this.formatTime(entry.time)}`, { fontSize: "24px", fill: "#789" }).setOrigin(0.5);
      yPosition += 30;
    });

    // Display current player's rank if they are not in the top 10
    if (playerRank > 10) {
      this.add.text(400, yPosition + 30, `Your Rank: ${playerRank}`, { fontSize: "24px", fill: "#000" }).setOrigin(0.5);
    }
  }

  async getLeaderboard(level) {
    const leaderboardRef = ref(db, `leaderboard/${level}`);
    const q = query(leaderboardRef, orderByChild("time"), limitToFirst(10));
    const snapshot = await get(q);
    const leaderboard = [];
    snapshot.forEach((childSnapshot) => {
      leaderboard.push(childSnapshot.val());
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

  formatTime(milliseconds) {
    let totalMilliseconds = milliseconds;
    let minutes = Math.floor(totalMilliseconds / 60000);
    totalMilliseconds %= 60000;
    let seconds = Math.floor(totalMilliseconds / 1000);
    let remainingMilliseconds = totalMilliseconds % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(remainingMilliseconds).padStart(3, '0')}`;
  }
}

export default LeaderboardScene;

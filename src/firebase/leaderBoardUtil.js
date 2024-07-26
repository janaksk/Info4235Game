import { ref, get, set, update } from "firebase/database";
import { db } from "./firebaseConfig.js";

export async function calculateCompletionTime(userId) {
  const totalTimes = 0;
  try {
    for (let i = 1; i < 6; i++) {
      const userRef = ref(db, `leaderboard/Level${i}/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const entry = snapshot.val();
        time += entry.time;
        console.log(`Level ${i} completion time: ${entry.time}`);
      } else {
        console.log(`No data available for level ${i}`);
      }
    }

    if (totalTimes > 0) {
      console.log(`Total completion time: ${totalTimes}`);
      saveTotalCompletionTime(userId, totalTimes);
    } else {
      console.log("No completion time data available");
      return null;
    }
  } catch (e) {
    console.error("Error calculating completion time: ", e);
  }
}

async function saveTotalCompletionTime(userId, time) {
    try {
      const userRef = ref(db, `users/${userId}`);
      await update(userRef, {
        totalTime: time,
      });
      console.log("Total completion time saved to Realtime Database");
    }
    catch (e) {
      console.error("Error saving total completion time: ", e);
    }
    }

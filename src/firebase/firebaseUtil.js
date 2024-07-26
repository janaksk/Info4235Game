import { auth, db } from "../firebase/firebaseConfig.js";
import {
  ref,
  push,
  query,
  get,
  orderByChild,
  equalTo,
    set,
    update,
} from "firebase/database";

export async function saveCompletionTime(level, userId, time) {
  const prevBestTime = await checkPrevTiming(level, userId);
  if (prevBestTime > time || prevBestTime === null) {
    try {
      const userTimingRef = ref(db, `leaderboard/${level}/${userId}`);
      await update(userTimingRef, {
        userId: userId,
        time: time,
      });
      console.log("Completion time saved to Realtime Database");
    } catch (e) {
      console.error("Error saving completion time: ", e);
    }
  } else {
    console.log("Completion time not saved to Realtime Database");
  }
}

async function checkPrevTiming(level, userId) {
  console.log("Checking previous timing");
  console.log(`level: ${level} userId: ${userId}`);

  try {
    const userTimingRef = ref(db, `leaderboard/${level}/${userId}`);
    const snapshot = await get(userTimingRef);
    if (snapshot.exists()) {
      const entry = snapshot.val();
      console.log(`Previous timing found: ${entry.time}`);
      return entry.time;
    } else {
      console.log("No previous timing found.");
      return null;
    }
  } catch (e) {
    console.error("Error checking previous timing: ", e);
    return null;
  }
}

export async function getLastClearedLevel(userId) {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const user = snapshot.val();
      return user.lastClearedLevel;
    } else {
      console.log("No data available for user:", userId);
      return 0; // Default to level 0 if no data is available
    }
  } catch (e) {
    console.error("Error getting last cleared level: ", e);
    return 0; // Default to level 0 on error
  }
}

export async function setLastClearedLevel(userId, level) {
  try {
    const userRef = ref(db, `users/${userId}`);
    await update(userRef, {
      lastClearedLevel: level,
    });
    console.log("Last cleared level saved to Firestore");
  } catch (e) {
    console.error("Error saving last cleared level: ", e);
  }
}

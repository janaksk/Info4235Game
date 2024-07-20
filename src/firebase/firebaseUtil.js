import { auth, db } from "../firebase/firebaseConfig.js";
import {
  ref,
  push,
  query,
  get,
  orderByChild,
  equalTo,
    set,
} from "firebase/database";

export async function saveCompletionTime(level, userId, time) {
  const prevBestTime = await checkPrevTiming(level, userId);
  if (prevBestTime > time || prevBestTime === null) {
    try {
      const userTimingRef = ref(db, `leaderboard/${level}/${userId}`);
      await set(userTimingRef, {
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

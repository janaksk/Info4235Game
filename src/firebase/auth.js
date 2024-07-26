import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set, query, get } from "firebase/database";

const signUp = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user.email);

    await set(ref(db, "users/" + user.uid), {
      username: username,
      email: email,
      lastClearedLevel: 1,
      totalTime: 0,
    });

    console.log("User data saved to Firestore");
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

export async function logOut() {
  try {
    await auth.signOut();
    console.log("Logged out");
  } catch (error) {
    throw error;
  }
}

export async function getUserNames(userIds) {
  const userNames = {};
console.log(`userIds: ${userIds}`);
  for (const userId of userIds) {
    const userRef = ref(db, `users/${userId}`);
    const userQuery = query(userRef);
    const snapshot = await get(userQuery);

    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      userNames[userId] = user;
    });
  }
  console.log(userNames);
  return userNames;
}


export { signUp, login };

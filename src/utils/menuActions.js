import { logOut } from "../firebase/auth";
import {getLastClearedLevel} from "../firebase/firebaseUtil.js";

export async function onContinue(uid, scene) {
  try {
    console.log("Continue clicked");
    const lastClearedLevel = await getLastClearedLevel(uid);
    console.log(parseInt(lastClearedLevel)+1);
    scene.scene.start(`Level${lastClearedLevel}Scene`, { level: `Level${parseInt(lastClearedLevel) + 1}`, user: scene.user });
  } catch (error) {
    console.error("Error continuing game:", error);
  }
}
  
  export function gameLeaderBoard() {
    console.log("Settings clicked");
    // Add your logic here
  }
  
  
   export async function onLogout() {
    console.log("Logout clicked");
    // Add your logic here
    logOut().then(()=>
    {
      console.log("Logged out");
      this.scene.scene.start('LoginScene');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });

  }
  
  export function onRegister(scene, x, y) {
    new RegisterForm(scene, x, y, (username) => {
      console.log(`Registered as: ${username}`);
      // Add additional logic after registration if needed
    });
  }
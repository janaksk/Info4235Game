import LoginForm from "../scenes/RegisterForm.js";

export function onContinue() {
    console.log("Continue clicked");
    // Add your logic here
  }
  
  export function onNewGame() {
    console.log("New Game clicked");
    // Add your logic here
  }
  
  export function onLevel() {
    console.log("Level clicked");
    // Add your logic here
  }
  
  export function onSettings() {
    console.log("Settings clicked");
    // Add your logic here
  }
  
  export function onQuit() {
    console.log("Quit clicked");
    // Add your logic here
  }
  
  export function onLogout() {
    console.log("Logout clicked");
    // Add your logic here
  }
  
  export function onRegister(scene, x, y) {
    new RegisterForm(scene, x, y, (username) => {
      console.log(`Registered as: ${username}`);
      // Add additional logic after registration if needed
    });
  }
import MenuOption from "../utils/menuOption.js";
import Phaser from "phaser";
import {
  onContinue,
  gameLeaderBoard,
  onLogout,
} from "../utils/menuActions.js";
import { addKeyboardInput } from "../utils/keyboardInput.js";
import { auth } from "../firebase/firebaseConfig.js";
import { getLoggedUserName } from "../firebase/auth.js";

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
    this.menuOptions = [];
    this.selectedOptionIndex = 0;


  }

  init(data) {
    console.log(data.user.uid);
    this.user = data.user;
  }

  preload() {
    this.load.image("menuBackground", "assets/backgrounds/sky.png");
  }



  create() {

    this.add
      .text(
        400,
        100,
        `Main Menu - Welcome ${this.user.email}`,
        { fontSize: "32px", fill: "#fff" }
      )
      .setOrigin(0.5);

    // Create menu options
    this.menuOptions.push(
      new MenuOption(this, 400, 200, "Continue", this.handleContinue.bind(this))  );
    this.menuOptions.push(
      new MenuOption(this, 400, 250, "New Game", () => {
        this.scene.start("Level1Scene", { level: "Level1", user: this.user });
      })
    );
 
    this.menuOptions.push(
      new MenuOption(this, 400, 350, "Leaderboard", gameLeaderBoard)
    );

    this.menuOptions.push(new MenuOption(this, 400, 450, "Logout", onLogout));

    this.updateMenuSelection();

    // Add keyboard input
    addKeyboardInput(
      this,
      this.menuOptions,
      this.updateMenuSelection.bind(this),
      () => {
        this.menuOptions[this.selectedOptionIndex].option.emit("pointerdown");
      }
    );
  }

  async handleContinue() {
    if (this.user) {
      await onContinue(this.user.uid, this);
    } else {
      console.log("No authenticated user found");
     
    }
  }

  updateMenuSelection() {
    this.menuOptions.forEach((option, index) => {
      option.setSelected(index === this.selectedOptionIndex);
    });
  }
}

export default MenuScene;

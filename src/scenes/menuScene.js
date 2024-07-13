import MenuOption from "../utils/menuOption.js";
import Phaser from "phaser";
import {
  onContinue,
  onNewGame,
  onLevel,
  onSettings,
  onQuit,
  onLogout,
  onRegister,
} from "../utils/menuActions.js";
import { addKeyboardInput } from "../utils/keyboardInput.js";
import RegisterForm from "./RegisterForm.js";

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
    this.menuOptions = [];
    this.selectedOptionIndex = 0;
  }

  preload() {
    this.load.image("menuBackground", "assets/backgrounds/sky.png");
    RegisterForm.preload(this);
   
  }

  create() {

    this.showRegisterForm();

    this.add
      .text(400, 100, "Main Menu", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);

    // Create menu options
    this.menuOptions.push(
      new MenuOption(this, 400, 200, "Continue", onContinue)
    );
    this.menuOptions.push(
      new MenuOption(this, 400, 250, "New Game", onNewGame)
    );
    this.menuOptions.push(new MenuOption(this, 400, 300, "Level", onLevel));
    this.menuOptions.push(
      new MenuOption(this, 400, 350, "Settings", onSettings)
    );
    this.menuOptions.push(new MenuOption(this, 400, 400, "Quit", onQuit));
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

  showRegisterForm() {
    const form = new RegisterForm(this, this.cameras.main.width/2, this.cameras.main.height/2);
}


  updateMenuSelection() {
    this.menuOptions.forEach((option, index) => {
      option.setSelected(index === this.selectedOptionIndex);
    });
  }
}

export default MenuScene;

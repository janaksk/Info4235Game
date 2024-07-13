import MenuOption from "../utils/menuOption.js";
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
//import RegisterForm from "./RegisterForm.js";

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
    this.menuOptions = [];
    this.selectedOptionIndex = 0;
  }

  preload() {
    this.load.image("menuBackground", "assets/backgrounds/sky.png");
    this.load.html("registerForm", "assets/html/registerForm.html");
  }

  create() {
    this.add.image(400, 300, "menuBackground");

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

    this.add
      .text(400, 500, "Register", { fontSize: "24px", fill: "#fff" })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.showRegisterForm());

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
    const form = this.add
      .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
      .createFromCache("registerForm");
    if (form) {
      form.setVisible(true).setOrigin(0.5);
      form.setScale(1); // Ensure the form is scaled correctly

      

      form.node.style.width = "300px";
      form.node.style.height = "auto";
      form.node.style.backgroundColor = "white"; // Ensure the background color is set to make it visible
      form.node.style.border = "1px solid #ccc";
      form.node.style.padding = "20px";
      form.node.style.zIndex = "1000";

      console.log("Form loaded and displayed", form);
    } else {
      console.log("Form failed to load");
    }
  }

  updateMenuSelection() {
    this.menuOptions.forEach((option, index) => {
      option.setSelected(index === this.selectedOptionIndex);
    });
  }
}

export default MenuScene;

import Phaser from "phaser";
import RegisterForm from "./RegisterForm";

class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoginScene" });
  }

  preload() {
    RegisterForm.preload(this);
  }

  create() {
    this.sound.stopAll();
    this.showRegisterForm();
  }

  showRegisterForm() {
    const form = new RegisterForm(this, this.cameras.main.width/2, this.cameras.main.height/2);
}
}

export default LoginScene;
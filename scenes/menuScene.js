class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {
    this.load.image("menuBackground", "assets/backgrounds/sky.png");
  }

  create() {
    this.add.image(400, 300, "menuBackground");

    this.add
      .text(400, 100, "Main Menu", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);

    //create a form to input the username
    this.add.text(300, 200, "Username:", { fontSize: "24px", fill: "#fff" });
    let usernameInput = this.add.dom(450, 200, "text", {
      type: "text",
      name: "username",
    });
  }
}

export default MenuScene;

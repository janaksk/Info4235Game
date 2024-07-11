export default class MenuOption {
    constructor(scene, x, y, text, callback) {
      this.scene = scene;
      this.option = scene.add.text(x, y, text, { fontSize: "24px", fill: "#fff" })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', callback)
        .on('pointerover', () => this.option.setStyle({ fill: "#ff0" }))
        .on('pointerout', () => this.option.setStyle({ fill: "#fff" }));
    }
  
    setSelected(selected) {
      this.option.setStyle({ fill: selected ? "#ff0" : "#fff" });
    }
  }
  
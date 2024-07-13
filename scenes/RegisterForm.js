export default class RegisterForm {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the registration form
    this.formElement = scene.add.dom(x, y).createFromCache('registerForm');
    this.formElement.addListener('click');

    this.formElement.on('click', (event) => {
      if (event.target.name === 'registerButton') {
        const inputText = this.formElement.getChildByName('username').value;
        console.log(`Username entered: ${inputText}`);
      }
    });
  }

  static preload(scene) {
    scene.load.html('registerForm', 'assets/html/registerForm.html');
  }
}

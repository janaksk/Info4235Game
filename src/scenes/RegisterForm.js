import {signUp, login} from "../firebase/auth.js";

export default class RegisterForm {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the registration form
    this.formElement = scene.add.dom(x, y).createFromCache('registerForm');
    this.formElement.addListener('click');

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.formElement.on('click', (event) => {
      if (event.target.name === 'loginButton') {
        this.handleLogin();
      } else if (event.target.name === 'guestButton') {
        this.handleGuest();
      } else if (event.target.name === 'signupButton') {
        this.showRegisterSection();
      } else if (event.target.name === 'registerButton') {
        this.handleRegister();
      }
    });
  }

  handleLogin() {
    const username = this.formElement.getChildByName('username').value;
    const password = this.formElement.getChildByName('password').value;
    console.log(`Logging in as: ${username}`);
    login(username, password);
    // Add login logic here
    this.formElement.setVisible(false);
  }

  handleGuest() {
    console.log('Continuing as guest');
    this.formElement.setVisible(false);
  }

  showRegisterSection() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
  }

  handleRegister() {
    const regUsername = this.formElement.getChildByName('reg_username').value;
    const email = this.formElement.getChildByName('email').value;
    const password = this.formElement.getChildByName('passwordReg').value;
    const confirmPassword = this.formElement.getChildByName('confirmPassword').value;

    if (password === confirmPassword) {
      signUp(email, password);
      console.log(import.meta.env.VITE_FIREBASE_API_KEY);
      console.log(`Registering as: ${regUsername} with email: ${email}`);
      // Add registration logic here
      console.log(`Log value of environment variable: ${import.meta.env.VITE_FIREBASE_API_KEY}`);
      this.formElement.setVisible(false);
    } else {
      console.log('Passwords do not match');
    }
  }

  static preload(scene) {
    scene.load.html('registerForm', 'assets/html/registerForm.html');
  }
}

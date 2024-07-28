import { signUp, login } from "../firebase/auth.js";

import { validateEmail, validatePassword } from "../utils/dataValidation.js";

export default class RegisterForm {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the registration form
    this.formElement = scene.add.dom(x, y).createFromCache("registerForm");
    this.formElement.addListener("click");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.formElement.on("click", (event) => {
      if (event.target.name === "loginButton") {
        this.handleLogin();
      } else if (event.target.name === "guestButton") {
        this.handleGuest();
      } else if (event.target.name === "signupButton") {
        this.showRegisterSection();
      } else if (event.target.name === "registerButton") {
        this.handleRegister();
      }
    });
  }

  sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  async handleLogin() {
    const username = this.sanitizeInput(
      this.formElement.getChildByName("username").value
    );
    const password = this.sanitizeInput(
      this.formElement.getChildByName("password").value
    );

    if (!username || !password) {
      document.getElementById("loginError").innerText =
        "Please fill in both fields.";
      return;
    }

    console.log(`Logging in as: ${username}`);
    login(username, password)
      .then((user) => {
        console.log("Logged in successfully");
        this.scene.scene.start("MenuScene", { user: user });
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        document.getElementById("loginError").innerText =
          "Incorrect username or password.";
      });
  }

  handleGuest() {
    console.log("Continuing as guest");
    this.scene.scene.start("Level1Scene", { user: null });
    this.formElement.setVisible(false);
  }

  showRegisterSection() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
  }

  async handleRegister() {
    const regUsername = this.sanitizeInput(
      this.formElement.getChildByName("reg_username").value
    );
    const email = this.sanitizeInput(
      this.formElement.getChildByName("email").value
    );
    const password = this.sanitizeInput(
      this.formElement.getChildByName("passwordReg").value
    );
    const confirmPassword = this.sanitizeInput(
      this.formElement.getChildByName("confirmPassword").value
    );

    if (!regUsername || !email || !password || !confirmPassword) {
      document.getElementById("registerError").innerText =
        "Please fill in all fields.";
      return;
    }

    if (!validateEmail(email)) {
      document.getElementById("registerError").innerText =
        "Invalid email address.";
      return;
    }

    if (!validatePassword(password)) {
      document.getElementById("registerError").innerText =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
      return;
    }

    if (password === confirmPassword) {
      signUp(email, password, regUsername)
        .then((user) => {
          console.log("Registered successfully");
          document.getElementById("registerError").innerText =
            "Registered successfully, you will be redirected to the login page.";

          setTimeout(() => {
            this.scene.scene.start("LoginScene");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error registering:", error);
          document.getElementById("registerError").innerText =
            "Error registering. Email already in use.";
        });
    } else {
      document.getElementById("registerError").innerText =
        "Passwords do not match.";
    }
  }

  static preload(scene) {
    scene.load.html("registerForm", "assets/html/registerForm.html");
  }
}

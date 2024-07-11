class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginScene' });
    }

    preload() {
        this.load.image('menuBackground', 'assets/backgrounds/sky.png');
    }

    create() {
        this.add.image(400, 300, 'menuBackground');
        this.add.text(400, 100, 'Login', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.add.text(300, 200, 'Username:', { fontSize: '24px', fill: '#fff' });
        
        //create a text input field for the username with red border

        let usernameInput = this.add.dom(450, 200, 'text', { type: 'text', name: 'username' });

        this.add.text(300, 250, 'Password:', { fontSize: '24px', fill: '#fff' });
        let passwordInput = this.add.dom(450, 250, 'input', { type: 'password', name: 'password' });

        let loginButton = this.add.text(400, 300, 'Login', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5).setInteractive();

        loginButton.on('pointerdown', () => {
            let username = usernameInput.getChildByName('username').value;
            let password = passwordInput.getChildByName('password').value;

            if (this.validateUser(username, password)) {
                localStorage.setItem('loggedInUser', username);
                this.scene.start('MenuScene');
            } else {
                alert('Invalid username or password');
            }
        });

        let registerButton = this.add.text(400, 350, 'Register', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5).setInteractive();

        registerButton.on('pointerdown', () => {
            let username = usernameInput.getChildByName('username').value;
            let password = passwordInput.getChildByName('password').value;

            this.registerUser(username, password);
        });
    }

    validateUser(username, password) {
        let user = JSON.parse(localStorage.getItem(username));
        return user && user.password === password;
    }

    registerUser(username, password) {
        if (localStorage.getItem(username)) {
            alert('Username already exists');
            return;
        }
        let user = { username: username, password: password, level: 1 };
        localStorage.setItem(username, JSON.stringify(user));
        alert('User registered successfully');
    }
}

export default LoginScene;

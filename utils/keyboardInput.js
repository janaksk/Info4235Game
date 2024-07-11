export function addKeyboardInput(scene, menuOptions, updateMenuSelection) {
    scene.input.keyboard.on('keydown-UP', () => navigateUp(scene, menuOptions, updateMenuSelection), scene);
    scene.input.keyboard.on('keydown-DOWN', () => navigateDown(scene, menuOptions, updateMenuSelection), scene);
    scene.input.keyboard.on('keydown-ENTER', () => selectOption(menuOptions), scene);
  }
  
  function navigateUp(scene, menuOptions, updateMenuSelection) {
    scene.selectedOptionIndex = Phaser.Math.Wrap(scene.selectedOptionIndex - 1, 0, menuOptions.length);
    updateMenuSelection();
  }
  
  function navigateDown(scene, menuOptions, updateMenuSelection) {
    scene.selectedOptionIndex = Phaser.Math.Wrap(scene.selectedOptionIndex + 1, 0, menuOptions.length);
    updateMenuSelection();
  }
  
  function selectOption(menuOptions) {
    menuOptions[menuOptions.scene.selectedOptionIndex].option.emit('pointerdown');
  }
  
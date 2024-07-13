export function addKeyboardInput(scene, menuOptions, updateMenuSelection, callback) {
    scene.input.keyboard.on('keydown-UP', () => navigateUp(scene, menuOptions, updateMenuSelection), scene);
    scene.input.keyboard.on('keydown-DOWN', () => navigateDown(scene, menuOptions, updateMenuSelection), scene);
    scene.input.keyboard.on('keydown-ENTER', callback, scene);
  }
  
  function navigateUp(scene, menuOptions, updateMenuSelection) {
    scene.selectedOptionIndex = Phaser.Math.Wrap(scene.selectedOptionIndex - 1, 0, menuOptions.length);
    updateMenuSelection();
  }
  
  function navigateDown(scene, menuOptions, updateMenuSelection) {
    scene.selectedOptionIndex = Phaser.Math.Wrap(scene.selectedOptionIndex + 1, 0, menuOptions.length);
    updateMenuSelection();
  }



<<<<<<< Updated upstream
import mainmenu from "./scenes/mainmenu";
import protoCombat from "./scenes/combatScene"; 
=======
import mainmenu from "./scenes/MainMenu.js";
import combatScene from "./scenes/combatScene.js";
>>>>>>> Stashed changes

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    parent: "juego",
    scale:
    {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        width: 800,
        height: 600,
    },
    
    pixelArt: false,
    backgroundColor: '#FFFFFF',
<<<<<<< Updated upstream
    scene: [MainMenu, ProtoCombat], // El juego contiene una escena de la clase Village, que extiende de Phaser.Scene
=======
    scene: [mainmenu, combatScene], // El juego contiene una escena de la clase Village, que extiende de Phaser.Scene
>>>>>>> Stashed changes
};

new Phaser.Game(config);
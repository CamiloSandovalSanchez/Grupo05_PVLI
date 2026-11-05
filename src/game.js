
import mainmenu from "./scenes/mainmenu.js";
import combatScene from "./scenes/combatscene.js";
import creditScene from "./scenes/creditscene.js";

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
    scene: [mainmenu, combatScene, creditScene], // El juego contiene una escena de la clase Village, que extiende de Phaser.Scene
};

new Phaser.Game(config);
import MainMenu from './scenes/mainmenu.js';
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    parent: "juego",
    scale:
    {
        width:  800,
        height: 600,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: false,
    backgroundColor: '#FFFFFF',
    scene: [MainMenu], // El juego contiene una escena de la clase Village, que extiende de Phaser.Scene
};

new Phaser.Game(config);
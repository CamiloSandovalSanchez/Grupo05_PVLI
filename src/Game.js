/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    parent: "juego",
    width:  800,
    height: 600,
    pixelArt: false,
	scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [], // El juego contiene una escena de la clase Village, que extiende de Phaser.Scene
};

new Phaser.Game(config);
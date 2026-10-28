export default class SpriteContainer extends Phaser.GameObjects.Container
{
    // Variables de la clase:
    #sprite;

    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y);
        scene.add.existing(this);

        // Crear el sprite
        this.#sprite = scene.add.sprite(0, 0, texture, frame);
        this.#sprite.setDisplaySize(200,200);

        // Añadirlo a nuestro contenedor
        this.add(this.#sprite);
    }

    flipX(bool)
    {
        this.#sprite.flipX = bool;
    }
}
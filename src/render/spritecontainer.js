export default class SpriteContainer extends Phaser.GameObjects.Container
{
    // Variables de la clase:
    #sprite;

    constructor(scene, x, y, scale, texture, frame)
    {
        super(scene, 0, 0);
        scene.add.existing(this);
        this.setScale(scale);
        const sceneW = this.scene.sys.game.config.width;
        const sceneH = this.scene.sys.game.config.height;
        this.x = x*sceneW;
        this.y = y*sceneH;

        // Crear el sprite
        this.#sprite = scene.add.sprite(0, 0, texture, frame);
        this.#sprite.setDisplaySize(200*scale,200*scale);

        // Añadirlo a nuestro contenedor
        this.add(this.#sprite);
    }

    flipX(bool)
    {
        this.#sprite.flipX = bool;
    }

    deathAnimation()
    {
        this.#sprite.setTint(0xffff0000); // tinta el sprite de rojo
    }

    hurtAnimation(counter)
    {
        if (counter == 0) this.#sprite.clearTint(0xffff0000); // tinta el sprite de rojo
        else this.#sprite.setTint(0xffff0000); // tinta el sprite de rojo
    }
    
    // Actualiza el texto.
    shapeScale(x, y)
    {
        //this.setDisplaySize(20, 20);
        this.setDisplaySize(this.displayWidth*x, this.displayHeight*y);
    }
}
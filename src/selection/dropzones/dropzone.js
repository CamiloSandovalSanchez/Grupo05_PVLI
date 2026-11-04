import DraggableSprite from "../draggablesprites/draggablesprite.js";

export default class DropZone extends Phaser.GameObjects.Container
{
    // Variables de la clase
    #dropzoneSprite;
    #dropzone;

    constructor(scene, x, y, dropzoneTexture, dropzoneFrame)
    {
        super(scene, x, y);
        this.scene.add.existing(this);

        // Creación de las texturas del objeto y añadirlas al container.
        this.#dropzoneSprite = this.scene.add.image(0, 0, dropzoneTexture, dropzoneFrame);
        this.add(this.#dropzoneSprite);

        // Creación de la drop zone.
        this.#dropzone = scene.add.zone(0, 0, this.#dropzoneSprite.width, this.#dropzoneSprite.height).setRectangleDropZone(this.#dropzoneSprite.width, this.#dropzoneSprite.height);
        this.add(this.#dropzone);
        this.scene.input.on('drop', (pointer, gameObject, dropZone) =>
        {
            if (dropZone === this.#dropzone)
            {
                if (gameObject instanceof DraggableSprite) 
                {
                    gameObject.setPosition(this.#dropzoneSprite.x + this.x, this.#dropzoneSprite.y + this.y);
                    this.whenDropped(gameObject.readInfo())
                }
            }
        }                  );

    }

    // Método abstracto para lidiar con el objeto de información una vez se suelte un DraggableSprite sobre la zona.
    // Las clases hijas deberán rellenarlo. Se 
    whenDropped(infoObject)
    {
        console.error("Se ha llamado al whenDropped de una DropZone no implementado.")
    }
}
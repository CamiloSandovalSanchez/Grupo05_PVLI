export default class DraggableSprite extends Phaser.GameObjects.Sprite
{
    // Variables de la clase:
    #ghostImage = null; // Imagen fantasma que se dejará atras al recoger el sprite
    #eventTarget = new EventTarget();

    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.setDisplaySize(200,200);

        this.setInteractive({useHandCursor: true});
        scene.input.setDraggable(this);

        // Al cogerse
        this.on('dragstart', (pointer) =>
        {
            this.#ghostImage = this.scene.add.image(this.x, this.y, this.texture.key, this.frame.name);
            this.#ghostImage.setAlpha(0.3);
            this.#ghostImage.setDisplaySize(this.displayWidth, this.displayHeight);
        }      );

        // Al moverse
        this.on('drag', (pointer, dragX, dragY) => 
        {
            this.setPosition(dragX, dragY);
        }      );

        // Al soltarse de forma global; dropped devuelve booleano que indica si se solto en una zona. Si fuese solo this.on devolveria coordenadas.
        this.scene.input.on('dragend', (pointer, gameObject, dropped) => 
        {
            if (gameObject === this)
            {
                // Reinicio de la posición del sprite
                if (!dropped) // si se solto en cualquier parte y no en una zona
                {
                    this.setPosition(this.#ghostImage.x, this.#ghostImage.y); // devolverla a su posición original
                }
                else // se solto en una nueva zona
                {
                    this.#eventTarget.dispatchEvent(new CustomEvent("onDropZoneLand", {detail: this}))
                }

                // Se borra la imagen fantasma
                if (this.#ghostImage) // si es distinta de null
                {
                    this.#ghostImage.destroy();
                    this.#ghostImage = null;
                }
            }
            
        }                  );
    }

    // Método abstracto para leer información del sprite arrastrado al soltarlo.
    // Las clases hijas lo rellenarán.
    // [!] Una de las cosas que hay que enviar será el propio objeto, con la ID de {object: }
    readInfo()
    {
        console.error("Se ha preguntado el readInfo() no implementado de un DraggableSprite");
    }

    // Evento que se lanza cuando el DraggableSprite se suelta sobre una nueva DropZone.
    // Recibe un callback con parámetro de entrada event.detail (un objeto clase DraggableSprite).
    onDropZoneLand(callback)
    {
        this.#eventTarget.addEventListener("onDropZoneLand", (event) => {callback(event.detail)});
    }

    
}
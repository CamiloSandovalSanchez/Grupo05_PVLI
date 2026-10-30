// Sprite con un parámetro que permite decidir que tan recortado está.
// Permite usar sprites de "relleno" de barras o burbujas, cortando como si fuera un líquido.
export default class FillSprite extends Phaser.GameObjects.Sprite
{  
    // Lo más parecido a un enum que hay en javascript: Object.freeze evita que cambien.
    // Determina el modo de fill del sprite.
    static types = Object.freeze({
        LEFT: 0, // El sprite empieza a dibujarse desde la izquierda
        RIGHT: 1, // El sprite empieza a dibujarse desde la derecha
        UP: 2, // El sprite empieza a dibujarse desde arriba
        DOWN: 3 // El sprite empieza a dibujarse desde abajo
    });

    // Variables de la clase:
    #fillAmount; // número entre 0 y 1 que indica cuando del sprite se esta mostrando 
    #fillType; // objeto FillSprite.types que indica cómo se realiza el fill del sprite.

    // Constructora de la clase
    constructor(type, scene, x, y, texture, frame, fillAmount = 1)
    {
        super(scene, x, y, texture, frame);

        if (Object.values(FillSprite.types).includes(type))
        {
            this.#fillType = type;

            this.setFillAmount(fillAmount);

            scene.add.existing(this);
        }
        else throw new TypeError("Se intenta crear un FillSprite con el parámetro type sin ser un FillSprite.types");
    }

    // Establecer el porcentaje de sprite que se muestra
    setFillAmount(amount)
    {
        amount = Phaser.Math.Clamp(amount, 0, 1);

        switch(this.#fillType)
        {
            case (FillSprite.types.LEFT): // nota: realWidth y realHeight usan los pixeles de la textura: setCrop usa estos valores. Luego si se escalara funcionaria bien de todas formas.
                this.setCrop(0, 0, this.frame.realWidth*amount, this.frame.realHeight);
                // setCrop recibe 4 parámetros; donde empezar el recorte (primeros 2) y el ancho de cada uno, con el ancho de x yendo hacia la derecha y el ancho de y yendo hacia la izquierda.
                break;
            case (FillSprite.types.RIGHT):
                this.setCrop(this.frame.realWidth*(1-amount), 0,  this.frame.realWidth*amount, this.frame.realHeight);
                break;
            case (FillSprite.types.UP):
                this.setCrop(0, 0,  this.frame.realWidth, this.frame.realHeight*amount);
                break;
                case (FillSprite.types.DOWN):
                this.setCrop(0, this.frame.realHeight*(1-amount), this.frame.realWidth, this.frame.realHeight*amount);
                break;
        }

        this.#fillAmount = amount;
    }
}
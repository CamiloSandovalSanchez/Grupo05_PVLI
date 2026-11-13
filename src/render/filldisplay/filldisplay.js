import FillSprite from "../fillsprite.js";
import FitText from "../fittext.js";

// Objeto visual para representar elementos que tengan 3 componentes básicos: un sprite de tipo fill, un background y un texto centrado sobre
export default class FillDisplay extends Phaser.GameObjects.Container
{
    // Variables de la clase:
    _backgroundSprite;
    #fillSprite;
    _text;

    constructor(scene, x, y, scale, textureBackground, frameBackground, textureFillSprite, frameFillSprite, typeFillSprite, initialText)
    {
        super(scene, x, y);
        this.setScale(scale);
        scene.add.existing(this);

        this._backgroundSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, textureBackground, frameBackground);
        this.add(this._backgroundSprite);

        this.#fillSprite = new FillSprite(typeFillSprite, scene, 0, 0, textureFillSprite, frameFillSprite);
        this.add(this.#fillSprite);

        if (initialText != null){
            this._text = new FitText(scene, 0, 0, initialText, {color: '#ffffff',  fontFamily: 'Georgia', stroke: '#000000'}, this.#fillSprite.width, this.#fillSprite.height);
            this._text.setOrigin(0.5,0.5);
            this.add(this._text);
        }
        else this._text = null;
    }

    // Método que llamar a la que se va a destruir el objeto.
    // Sirve para destruir el listener del FitText del evento 'resize'
    destroy(fromScene)
    {
        if (this._text != null) this._text.destroy();
        super.destroy(fromScene);
    }

    // Actualiza el FillSprite.
    updateFillSprite(amount)
    {
        this.#fillSprite.setFillAmount(amount);
    }

    // Actualiza el texto.
    updateFitText(text)
    {
        this._text.setText(text);
    }

    // Delega al método de la clase madre (spriteContainer) del mismo nombre
    shapeSize(w, h)
    {
        this.setDisplaySize(1000, 1000);
    }
    
}
import FillSprite from "./fillsprite.js";
import FitText from "./fittext.js";

// Clase que permite 
export default class HealthBar extends Phaser.GameObjects.Container
{
    // Variables de la clase:
    #backgroundSprite;
    #fillSprite;
    #text;

    constructor(scene, x, y, textureBackground, frameBackground, textureFillSprite, frameFillSprite, currentHealth, maxHealth)
    {
        super(scene, x, y);
        scene.add.existing(this);

        this.#backgroundSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, textureBackground, frameBackground);
        this.add(this.#backgroundSprite);

        this.#fillSprite = new FillSprite(FillSprite.types.LEFT, scene, 0, 0, textureFillSprite, frameFillSprite);
        this.add(this.#fillSprite);

        this.#text = new FitText(scene, 0, 0, currentHealth + " / " + maxHealth, {color: '#ffffff',  fontFamily: 'Arial', stroke: '#000000'}, this.#fillSprite.width, this.#fillSprite.height);
        this.#text.setOrigin(0.5,0.5);
        this.add(this.#text);

        this.updateBar(currentHealth, maxHealth);
    }

    updateBar(currentHealth, maxHealth)
    {
        this.#fillSprite.setFillAmount(currentHealth/maxHealth);
        this.#text.setText(currentHealth + " / " + maxHealth);
    }
}
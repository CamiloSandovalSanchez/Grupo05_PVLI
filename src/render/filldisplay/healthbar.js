import FillSprite from "../fillsprite.js";
import FillDisplay from "./filldisplay.js";

// Objeto que representa una barra de vida.
export default class HealthBar extends FillDisplay
{
    constructor(scene, x, y, textureBackground, frameBackground, textureFillSprite, frameFillSprite, currentHealth, maxHealth)
    {
        super(scene, x, y, 0.5, textureBackground, frameBackground, textureFillSprite, frameFillSprite, FillSprite.types.LEFT, currentHealth + " / " + maxHealth);
        this.updateBar(currentHealth, maxHealth);
    }

    updateBar(currentHealth, maxHealth)
    {
        this.updateFillSprite(currentHealth/maxHealth);
        this.updateFitText(currentHealth + " / " + maxHealth);
    }
}
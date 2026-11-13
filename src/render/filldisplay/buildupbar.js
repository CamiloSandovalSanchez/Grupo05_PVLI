import FillSprite from "../fillsprite.js";
import FillDisplay from "./filldisplay.js";

// Objeto que representa una barra de buildup de ataque.
export default class BuildupBar extends FillDisplay
{
    // Variables de la clase:
    constructor(scene, x, y, textureBackground, frameBackground, textureFillSprite, frameFillSprite, currentBuildup, maxBuildup)
    {
        super(scene, x, y, 0.8, textureBackground, frameBackground, textureFillSprite, frameFillSprite, FillSprite.types.LEFT, null);
    }

    updateBar(currentBuildup, maxBuildup)
    {
        this.updateFillSprite(currentBuildup/maxBuildup);
        //this.updateFitText((currentBuildup/1000).toFixed(2) + " s");
    }
}
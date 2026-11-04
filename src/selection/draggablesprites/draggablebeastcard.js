import DraggableSprite from "./draggablesprite.js";
import Element from "../../utility/element.js"

export default class DraggableBeastCard extends DraggableSprite
{
    // Variables de la clase:
    #element;
    #beastID;

    constructor(scene, x, y, texture, frame, element, beastID)
    {
        super(scene, x, y, texture, frame);

        if (Element.CheckForElement(element) instanceof Element) this.#element = element;
        else throw new TypeError("Se ha llamado a la constructora de DraggableBeastCard con el parámetro \"element\" incorrecto.");

        this.#beastID = beastID;
    }

    readInfo()
    {
        return {object: this, element: this.#element, beastID: this.#beastID}
    }
}
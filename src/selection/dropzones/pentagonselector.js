import DropZone from "./dropzone.js";
import DraggableBeastCard from "../draggablesprites/draggablebeastcard.js";
import Pentagon from "../../combat/pentagon.js";
import BeastManager from "../../managers/beastmanager.js";

export default class PentagonSelector extends DropZone 
{
    // Variables de la clase:
    #pentagon;
    #targetPosition;

    setTargetPosition(targetPosition)
    {
        if (targetPosition >= 1 && targetPosition <= 5) this.#targetPosition = targetPosition;
        else console.error("Se ha intentado establecer la posición de un PentagonSelector siendo incorrecta");
    }

    constructor(scene, x, y, dropzoneTexture, dropzoneFrame, pentagon, targetPosition)
    {
        super(scene, x, y, dropzoneTexture, dropzoneFrame);
        
        if (pentagon instanceof Pentagon) this.#pentagon = pentagon;
        else throw new TypeError("Se ha introducido en la constructora de PentagonSelector el parámetro \"pentagon\" sin ser instancia de Pentagon");

        this.setTargetPosition(targetPosition);
    }

    whenDropped(infoObject)
    {
        if (infoObject.object instanceof DraggableBeastCard) // carta de bestia
        {
            if (BeastManager.instance) this.#pentagon.setBeast(BeastManager.instance.spawnBeast(infoObject.element, infoObject.beastID), this.#targetPosition - 1);
            else console.error("No hay instancia de BeastManager!");
        }
        // else if (infoObject.object instanceof DraggableEquipmentCard) // carta de equipamiento
    }
}
import DropZone from "./dropzone.js";
import Element from "../../utility/element.js";
import SpriteContainer from "../../render/spritecontainer.js";
import DraggableSprite from "../draggablesprites/draggablesprite.js";
import DraggableBeastCard from "../draggablesprites/draggablebeastcard.js";

export default class Inventory extends DropZone
{
    // Variables de la clase:
    #viewableHeight; // Altura del inventario que se podrá ver.
    #spaceBetweenObjects; // Distancia horizontal entre un objeto y otro en las filas

    #rows = new Array(7);

    // Constructora de la clase: elementsSpriteSheet contiene los 7 iconos de los elementos en el orden que aparecen en Element.js
    constructor(scene, x, y, inventoryBackgroundTexture, inventoryBackgroundFrame, elementsSpriteSheet, viewableHeight, spaceBetweenObjects)
    {
        super(scene, x, y, inventoryBackgroundTexture, inventoryBackgroundFrame);

        if (viewableHeight < 0 || viewableHeight > this.getHeight()) throw new TypeError("Constructora de Inventory viewableHeight es imposible");
        else this.#viewableHeight = viewableHeight;

        this.#spaceBetweenObjects = spaceBetweenObjects

        // Creación de las filas de los elementos.
        // Se interpreta la fila de los elementos por el mismo en el que aparecen en Elements.types:
        // 0 -> electric
        // 1 -> water
        // 2 -> fire
        // 3 -> air
        // 4 -> earth
        // 5 -> life
        // 6 -> death
        // Se presume elementsSpriteSheet ordenada de esta forma.
        elementsSpriteSheet = scene.textures.get(elementsSpriteSheet);
        let frame = elementsSpriteSheet.get(0);
        for(let i = 0; i < this.#rows.length; i++)
        {
            this.#rows[i] = new SpriteContainer(scene, 
                                                -this.getWidth()/2 + frame.width/2, 
                                                -this.getHeight()/2 + frame.height*(1/2 + 2*i),
                                                elementsSpriteSheet,
                                                i);
            this.add(this.#rows[i]);
        }
    }
    
    whenDropped(infoObject)
    {
        this.addObject(Element.CheckForElement(infoObject.element).getType(), infoObject.object)
    }

    addObject(element, object)
    {
        if (object instanceof DraggableSprite)
        {
            object.onDropZoneLand(this.deleteObject); // hace que se ejecute el registro de onDropZoneLand al final de las llamadas de eventos.
            // Es necesario ya que whenDropped se ejecuta en el evento "drop" de phaser, escuchado por dropzone.js, que va antes que el "dragend", escuchado por draggablesprite.js, haciendo que se añada y borre de inmediato.
            // La solución es esta, consiguiendose registrar sin que se ejecute deleteObject hasta que caiga en una nueva zona.
            object.setPosition(this.#rows[element].list[this.#rows[element].length - 1].x + this.#spaceBetweenObjects + object.displayWidth/2, 0);
            this.#rows[element].add(object);
        }
    }


    deleteObject(object)
    {
        console.log("TENGO QUE BORRRA OH DEAM");
    }
}
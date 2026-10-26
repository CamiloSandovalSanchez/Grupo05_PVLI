import HasHealth from "../health/hashealth.js";
import AttackHandler from "../attack/attackhandler.js";
import Pentagon from "./pentagon.js"

import Sprite from "../render/sprite.js"

// Clase 
export default class Beast
{
    // Variables de la clase:
    #lifeObject; // Referencia al objeto de tipo HasHealth que contiene la bestia.
    #attackObject; // Referencia al objetico de tipo AttackHandler que contiene la bestia.
    #pentagon; // Referencia al pentágono que contiene la bestia.
    #rivalPentagon; // Referencia al pentágono rival.
    #position = 1; // Número entero que contiene la posición actual de la bestia. Ha de ser >= 1 y <= 5; Se inicializa adecuadamente al entrar en un pentágono.

    #sprite; // Sprite de la bestia

    constructor(lifeObject, attackObject, sprite)
    {
        if (lifeObject instanceof HasHealth) this.#lifeObject = lifeObject;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"lifeObject\" sin ser instancia de HasHealth");

        if (attackObject instanceof AttackHandler) this.#attackObject = attackObject;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"attackObject\" sin ser una instancia de AttackHandler");

        if (sprite instanceof Sprite) this.#sprite = sprite;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"sprite\" sin ser instancia de Sprite");
    }

    setPentagon(pentagon)
    {
        if (pentagon instanceof Pentagon) 
        {
            this.#pentagon = pentagon;
            this.#attackObject.setPentagon(pentagon);
        }
        else throw new TypeError("Se ha intentado asignar a una Beast el parámetro \"pentagon\" sin ser una instancia de Pentagon");
    }

    setRivalPentagon(rivalPentagon)
    {
        if (rivalPentagon instanceof Pentagon) 
        {
            this.#rivalPentagon = rivalPentagon;
            this.#attackObject.setRivalPentagon(rivalPentagon);
        }
        else throw new TypeError("Se ha intentado asignar a una Beast  el parámetro \"rivalPentagon\" sin ser una instancia de Pentagon");
    }

    // Método para leer la posición actual de la bestia
    getPosition()
    {
        return this.#position;
    }

    // Método para establecer la posición de la bestia.
    setPosition(newPosition)
    {
        if (typeof newPosition === "number" && newPosition >= 1 && newPosition <= 5) 
        {
            this.#position = newPosition;
            this.#attackObject.updatePosition(newPosition);

            // Render:
            let angle = Phaser.Math.DegToRad(-90 + 18 - 72*(newPosition-1));
            this.#sprite.x = this.#pentagon.getSpriteX() + 100*Math.cos(angle);
            this.#sprite.y = this.#pentagon.getSpriteY() + 100*Math.sin(angle);

            // TODO: Llamar al evento OnChangePosition;
        }
        else console.error("Se ha intentado cambiar la posición de una bestia a una inválida.");
    }

    // Método para actualizar la bestia
    update(dt)
    {
        this.#attackObject.updateBuildup(dt);
    }

    // Método para recibir desde el pentágono un ataque y procesarlo.
    recieveHit(attack)
    {
        if (!(attack instanceof AttackInfo)) console.error("Se ha mandado al método recieveHit() de una Beast un parámetro que no es un AttackInfo. Se ignorará el ataque.");
        else this.#lifeObject.hit(attack);
    }

    // Método para recibir desde el pentágono una curación y procesarla.
    recieveHeal(healPoints)
    {
        this.#lifeObject.heal(healPoints);
    }

    // Método para leer si la bestia a muerto.
    isDead()
    {
        return this.#lifeObject.isDead();
    }

    // TODO: Recibir el evento de muerte de HasHealth y acabarlo

    // TODO: Llevar toda la lógica de dibujado en Phaser...
}
import HasHealth from "../health/hashealth.js";
import AttackHandler from "../attack/attackhandler.js";
import AttackInfo from "../utility/attackinfo.js";
import Pentagon from "./pentagon.js"
import DeathInfo from "../utility/deathinfo.js";

import Sprite from "../render/sprite.js"

// Clase que servirá como intermediaria para crear una bestia.
// Contiene referencia a las clases básicas HasHealth y AttackHandler, llamando a sus métodos según corresponda.
export default class Beast
{
    // Variables de la clase:
    #lifeObject; // Referencia al objeto de tipo HasHealth que contiene la bestia.
    #attackObject; // Referencia al objetico de tipo AttackHandler que contiene la bestia.
    #pentagon = null; // Referencia al pentágono que contiene la bestia.
    #rivalPentagon = null; // Referencia al pentágono rival.
    #position = 1; // Número entero que contiene la posición actual de la bestia. Ha de ser >= 1 y <= 5; Se inicializa adecuadamente al entrar en un pentágono.

    #sprite; // Sprite de la bestia

    constructor(lifeObject, attackObject, sprite)
    {
        // Inicialización de las variables, comprobando su tipo.
        if (lifeObject instanceof HasHealth) this.#lifeObject = lifeObject;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"lifeObject\" sin ser instancia de HasHealth");

        if (attackObject instanceof AttackHandler) this.#attackObject = attackObject;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"attackObject\" sin ser una instancia de AttackHandler");

        if (sprite instanceof Sprite) this.#sprite = sprite;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"sprite\" sin ser instancia de Sprite");

        // Suscripción al evento "death" del lifeObject.
        lifeObject.addEventListener("death", (event) => {this.onDeath(event)});
        // Suscripción al evento "attack" del attackObject.
        attackObject.addEventListener("attack",(event) => this.onAttack(event));
    }

    setPentagon(pentagon)
    {
        if (pentagon instanceof Pentagon) 
        {
            this.#pentagon = pentagon;
        }
        else throw new TypeError("Se ha intentado asignar a una Beast el parámetro \"pentagon\" sin ser una instancia de Pentagon");
    }

    setRivalPentagon(rivalPentagon)
    {
        if (rivalPentagon instanceof Pentagon) 
        {
            this.#rivalPentagon = rivalPentagon;
        }
        else throw new TypeError("Se ha intentado asignar a una Beast  el parámetro \"rivalPentagon\" sin ser una instancia de Pentagon");
    }

    // Método para leer la posición actual de la bestia
    getPosition()
    {
        return this.#position;
    }

    // Método para establecer la posición de la bestia.
    setPosition(newPosition, isInPlayerPentagon)
    {
        if (typeof newPosition === "number" && newPosition >= 1 && newPosition <= 5) 
        {
            if (typeof isInPlayerPentagon === "boolean")
            {
                this.#position = newPosition;
                this.#attackObject.updatePosition(newPosition);

                // Render:
                let angle = Phaser.Math.DegToRad(-90 + 18 - 72*(newPosition-1));
                

                if (isInPlayerPentagon) 
                {
                    this.#sprite.flipX = false;
                    this.#sprite.x = this.#pentagon.getSpriteX() + 100*Math.cos(angle);
                }
                else
                {
                    this.#sprite.flipX = true;
                    this.#sprite.x = this.#pentagon.getSpriteX() - 100*Math.cos(angle);
                }
                this.#sprite.y = this.#pentagon.getSpriteY() + 100*Math.sin(angle);
                // TODO: Llamar al evento OnChangePosition;
            }
            else console.error("Se ha intentado cambiar la posición de una bestia introduciendo el parámetro isInPlayerPentagon no booleano")
            
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
        this.#lifeObject.hit(attack);
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

    // Método que se envia como callback para escuchar la muerte del lifeObject
    onDeath(event)
    {
        let deathInfo = event.detail;
        if (deathInfo instanceof DeathInfo)
        {
            deathInfo.setBeastPosition(this.#position);
            deathInfo.setIsOnPlayerTeam(this.#pentagon.isPlayerPentagon());
            deathInfo.setIsLeader(false); // somos bestia

            // TODO: Lanzar evento global mediante Phaser con la muerte
        }
        else console.error("Una Beast no ha recibido un objeto DeathInfo en la escucha onDeath. No se podrá lanzar el evento");

        // TODO: Procesar la muerte de la bestia
    }

    // Método que se envia como callback para escuchar el ataque del attackObject
    onAttack(event)
    {
        let attackInfo = event.detail;
        if (attackInfo instanceof AttackInfo)
        {
            if (this.#rivalPentagon !== null) this.#rivalPentagon.attackPosition(attackInfo);
            else console.error("Una Beast ha intentado atacar antes de recibir el setRivalPentagon(). No podrá atacar.");
        }
        else console.error("Una Beast no ha recibido un objeto AttackInfo en la escucha onAttack. No podrá acabar de atacar");
    }

    // TODO: Llevar toda la lógica de dibujado en Phaser...
}
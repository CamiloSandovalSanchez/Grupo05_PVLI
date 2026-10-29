import HasHealth from "../health/hashealth.js";
import AttackHandler from "../attack/attackhandler.js";
import Pentagon from "./pentagon.js"
import AttackInfo from "../attack/attackhandler.js";

// Clase que servirá como intermediaria para crear un lider de equipo.
// Contiene referencia a las clases básicas HasHealth y AttackHandler, llamando a sus métodos según corresponda.
export default class TeamLeader
{
    // Variables de la clase:
    #lifeObject; // Referencia al objeto de tipo HasHealth que contiene el lider.
    #attackObject; // Referencia al objetico de tipo AttackHandler que contiene el lider.
    #pentagon = null; // Referencia al pentágono al que pertenece el lider.
    #rivalPentagon = null; // Referencia al pentágono rival.
    #isPlayer; // Booleano que determina si somos el lider del jugador o el del enemigo.

    constructor(isPlayer, lifeObject, attackObject)
    {
        // Comprobación de tipos e inicialización de las variables
        if (typeof isPlayer === "boolean") this.#isPlayer = isPlayer;
        else throw new TypeError("Se ha intentado crear un TeamLeader con el parámetro \"isPlayer\" no booleano");

        if (lifeObject instanceof HasHealth) this.#lifeObject = lifeObject;
        else throw new TypeError("Se ha intentado crear un TeamLeader con el parámetro \"lifeObject\" sin ser instancia de HasHealth");

        if (attackObject instanceof AttackHandler) this.#attackObject = attackObject;
        else throw new TypeError("Se ha intentado crear un TeamLeader con el parámetro \"attackObject\" sin ser una instancia de AttackHandler");

        // Suscripción al evento "death" del lifeObject.
        lifeObject.addEventListener("death", (event) => {this.onDeath(event)});
        // Suscripción al evento "attack" del attackObject.
        attackObject.addEventListener("attack",(event) => this.onAttack(event));
    }

    setPentagon(pentagon)
    {
        if (pentagon instanceof Pentagon) this.#pentagon = pentagon;
        else throw new TypeError("Se ha intentado asignar a un TeamLeader con el parámetro \"pentagon\" sin ser una instancia de Pentagon");
    }

    setRivalPentagon(rivalPentagon)
    {
        if (rivalPentagon instanceof Pentagon) this.#rivalPentagon = rivalPentagon;
        else throw new TypeError("Se ha intentado crear un TeamLeader con el parámetro \"rivalPentagon\" sin ser una instancia de Pentagon");
    }

    // Método para actualizar al lider de equipo
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

    getIsPlayer()
    {
        return this.#isPlayer;
    }

    // Método que se envia como callback para escuchar la muerte del lifeObject
        onDeath(event)
        {
            // TODO: Procesar la muerte del lider. Es posible que se quiera recibir el DeathInfo del evento y mandarlo de forma global. (?
        }
    
        // Método que se envia como callback para escuchar el ataque del attackObject.
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
    
    // TODO: Método para escuchar la muerte del lifeObject e informar de la victoria de un equipo
}
import HasHealth from "../health/hashealth.js";
import AttackHandler from "../attack/attackhandler.js";
import Pentagon from "./pentagon.js"

export default class TeamLeader
{
    // Variables de la clase:
    #lifeObject; // Referencia al objeto de tipo HasHealth que contiene el lider.
    #attackObject; // Referencia al objetico de tipo AttackHandler que contiene el lider.
    #pentagon; // Referencia al pentágono al que pertenece el lider.
    #rivalPentagon; // Referencia al pentágono rival.
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
        if (!(attack instanceof AttackInfo)) console.error("Se ha mandado al método recieveHit() de una Beast un parámetro que no es un AttackInfo. Se ignorará el ataque.");
        else this.#lifeObject.hit(attack);
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
    // TODO: Método para escuchar la muerte del lifeObject e informar de la victoria de un equipo
}
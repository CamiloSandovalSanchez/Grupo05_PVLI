import AttackInfo from "../utility/attackinfo.js";
import Pentagon from "../combat/pentagon.js";

// Clase padre de una variedad de objetos usados para realizar ataques
// Servirá para implementar diferentes mecánicas relacionadas con la parte de la "ataques" y que la clase mediadora Beast sepa utilizarlas.
// Extiende "EventTarget", una clase por defecto en JavaScript que permite incluir eventos.
export default class AttackHandler extends EventTarget
{
    // Variables de la clase:
    _attackInfo; // Objeto básico AttackInfo con el ataque a realizar (aún sin setAttackTarget()).
    #attackCooldown; // float que contiene cada cuanto se ataca.
    #attackBuildup = 0; // float que contiene cuanto tiempo lleva pudiendo atacar la bestia (al llegar a su cooldown ataca).
    #canAttack; // booleano que indica si el objeto actualmente puede atacar o no.

    constructor(attack, attackCooldown)
    {
        super(); // llamar a la constructora de EventTarget

        if (attack instanceof AttackInfo) this._attackInfo = attack;
        else throw new TypeError("Se ha intentado crear un AttackHandler con el parámetro \"attack\" sin ser una instancia de AttackInfo");

        if (typeof attackCooldown === "number" && attackCooldown > 0) this.#attackCooldown = attackCooldown;
        else throw new TypeError("Se ha intentado crear un AttackHandler con el parámetro \"attackCooldown\" invalido");
    }

    // Actualiza la posición del objeto en el pentágono.
    updatePosition(newPosition)
    {
        this._attackInfo.setAttackOrigin(newPosition);
        this.#canAttack = this._canAttack();
    }

    // Actualiza el buildup de ataque del objeto. Asume que dt es un número.
    updateBuildup(dt)
    {
        if (this.#canAttack)
        {
            this.#attackBuildup += dt;
            if (this.#attackBuildup >= this.#attackCooldown)
            {
                this.resetBuildup();
                this._attack(); // crear el ataque
            } 
        }
    }

    // Método para reiniciar el buildup del ataque.
    resetBuildup()
    {
        this.#attackBuildup = 0;
    }

    // Método para añadir buildup al ataque.
    addBuildup(extraBuildup)
    {
        if (typeof extraBuildup === "number")
        {
            this.#attackBuildup -= extraBuildup; 
            // POR AHORA LO QUITO: SE PERMITE QUE EL BUILD-UP AUMENTE MÁS ALLÁ DEL COOLDOWN DE LA BESTIA; PUEDE SER NEGATIVO. if (this.#attackBuildup < 0 ) this.#attackBuildup = 0;
        }
    }

    // Método para lanzar el evento con el AttackInfo de la bestia.
    doAttack(attack)
    {
        if (attack instanceof AttackInfo) this.dispatchEvent(new CustomEvent("attack", {detail: attack}));
        else console.error("Se ha llamado a doAttack con un objeto que no era un AttackInfo. Se ignorará el ataque");
    }

    // Método para atacar (Crea el AttackInfo y se lo envia a doAttack).
    // Esencialmente abstracto; ha de ser rellenado por una clase hija.
    // Importante establecer this._attackInfo.setAttackTarget()
    _attack()
    {
        // console.log("Atacando!");
        console.error("_attack no implementado");
    }

    // Método que devuelve un booleano indicando si la bestia puede atacar, en función de su #currentPosition.
    // Esencialmente abstracto; ha de ser rellenado por una clase hija.
    _canAttack()
    {
        // console.log("Preguntan si puede atacar");
        console.error("_canAttack no implementado");
        return false;
    }
}
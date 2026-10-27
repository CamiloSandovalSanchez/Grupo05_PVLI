import AttackInfo from "../utility/attackinfo.js";
import Pentagon from "../combat/pentagon.js";

export default class AttackHandler
{
    // Variables de la clase:
    _attackInfo; // Objeto AttackInfo con el ataque a realizar.
    #attackCooldown; // float que contiene cada cuanto se ataca.
    #attackBuildup = 0; // float que contiene cuanto tiempo lleva pudiendo atacar la bestia (al llegar a su cooldown ataca).
    #canAttack; // booleano que indica si el objeto actualmente puede atacar o no.
    _pentagon = null; // Objeto Pentagon al que pertenece el objeto con este AttackHandler.
    _rivalPentagon = null; // Objeto Pentagon del rival.

    constructor(attack, attackCooldown)
    {
        if (attack instanceof AttackInfo) this._attackInfo = attack;
        else throw new TypeError("Se ha intentado crear un AttackHandler con el parámetro \"attack\" sin ser una instancia de AttackInfo");

        if (typeof attackCooldown === "number" && attackCooldown > 0) this.#attackCooldown = attackCooldown;
        else throw new TypeError("Se ha intentado crear un AttackHandler con el parámetro \"attackCooldown\" invalido");
    }

    setPentagon(pentagon)
    {
        if (pentagon instanceof Pentagon) this._pentagon = pentagon;
        else throw  new TypeError("Se ha intentado asignar un AttackHandler con el parámetro \"pentagon\" sin ser una instancia de Pentagon");
    }

    setRivalPentagon(rivalPentagon)
    {
        if (rivalPentagon instanceof Pentagon) this._rivalPentagon = rivalPentagon;
        else throw new TypeError("Se ha intentado asignar un AttackHandler con el parámetro \"rivalPentagon\" sin ser una instancia de Pentagon");
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
                this._attack();
            } 
        }
    }

    // Método para reiniciar el buildup de la bestia.
    resetBuildup()
    {
        this.#attackBuildup = 0;
    }

    // Método para atacar.
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
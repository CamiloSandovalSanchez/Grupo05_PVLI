import Element from '../utility/element.js'
import AttackInfo from '../utility/attackinfo.js'
import DeathInfo from '../utility/deathinfo.js'

export default class HasHealth
{
    // Variables de la clase:
    #maxLifePoints; // vida máxima del objeto; no se curará más allá de este límite.
    #currentLifePoints; // vida actual del objeto
    #defense; // defensa del objeto
    #element; // tipo elemental del objeto

    // Constructora de la clase
    constructor(healthPoints, defense, element)
    {
        // Veríficación de los tipos de parámetros y su asignación.
        if (typeof healthPoints === "number" && healthPoints > 0)
        {
            this.#maxLifePoints = healthPoints;
            this.#currentLifePoints = healthPoints;
        }
        else throw new TypeError("Se ha intentado crear un objeto HasHealth con el parámetro \"healthPoints\" sin ser un número válido");

        if (typeof defense === 'number' && defense >= 0) this.#defense = defense;
        else throw new TypeError("Se ha intentado crear un objeto HasHealth con el parámetro \"defense\" sin ser un número válido");

        try
        {
            this.#element = Element.CheckForElement(element);
        }
        catch
        {
            throw new TypeError("Se ha intentado crear un objeto HasHealth con el parámetro \"element\" sin ser un elemento");
        }
    }

    // Método encargado de realizar el daño al objeto con vida según el tipo de ataque.
    // Asume que attack es un AttackInfo (delega la tarea al objeto que actua como intermediario; Beast o TeamLeader son ejemplos)
    hit(attack)
    {
        // Cálculo de la modificación elemental del daño
        let dealtDamage = attack.getDamage;
        if ((attack.getElement().isStrongAgainst(this.#element))) dealtDamage = Math.round(dealtDamage * AttackInfo.ELEMENT_STRENGHT_MULTIPLIER);
        else if ((attack.getElement().isWeakAgainst(this.#element))) dealtDamage = Math.round(dealtDamage * AttackInfo.ELEMENT_WEAKNESS_MULTIPLIER);

        // Aplicación del daño
        switch(attack.getAttackType())
        {
            case (AttackInfo.attackTypes.NORMAL):
                if (attack.getElement().isStrongAgainst(this.#element)) this.#currentLifePoints -= dealtDamage - this.#defense;
                else
                break;
            case (AttackInfo.attackTypes.PIERCING):
                this.#currentLifePoints -= dealtDamage;
                break;
            case (AttackInfo.attackTypes.DEATH_TOUCH):
                this.#currentLifePoints = 0;
                break;
        }
        if (this.#currentLifePoints <= 0) this.death();
    }

    // Método para curar el objeto con vida.
    // healPoints ha de ser un número.
    heal(healPoints)
    {
        if (typeof healPoints === "number" )
        {
            if (healPoints > 0)
            {
                this.#currentLifePoints += healPoints;
                if (this.#currentLifePoints > this.#maxLifePoints) this.#currentLifePoints = this.#maxLifePoints;
            }
            else console.error("Se ha mandado al método heal() de un HasHealth una curación negativa. Se ignorará la curación");
        }
        else console.error("Se ha mandado al método heal() de un HasHealth un parámetro que no es un número. Se ignorará la curación.")
    }

    // Método de muerte del objeto con vida.
    death()
    {
        let deathInfo = new DeathInfo();
        deathInfo.setElement(this.#element);

        // TODO: Llamar al evento OnDeath();
    }

    isDead()
    {
        return (this.#currentLifePoints <= 0);
    }
}
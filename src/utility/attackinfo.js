import Element from './element.js'

// Contiene información sobre un ataque; será un contenedor de toda la información vital para llevar el sistema de ataques.
// No se relaciona en nada con los cooldown de ataque de las bestias, su forma de atacar ni sus build-ups
export default class AttackInfo
{
    // Lo más parecido a un enum que hay en javascript: Object.freeze evita que cambien.
    // Define los tipos de ataque, accesibles con AttackInfo.attackTypes.
    static attackTypes = Object.freeze({
        NORMAL: 0,
        PIERCING: 1, // ignora la defensa
        DIRECT: 2, // ignora bestías; ataca directamente al líder
        DEATH_TOUCH: 3, // elimina de inmediato a las criaturas
    });

    static ELEMENT_STRENGHT_MULTIPLIER = 1.5;
    static ELEMENT_WEAKNESS_MULTIPLIER = 0.75;

    // Variables de la clase:
    /* -- Identificación de mecánicas adicionales -- */
    #canHurtLeader; // booleano que indica si el ataque es capaz de hacer daño a líderes de equipo.
    #addBuildupSlow; // float que indica cuanto build-up de ataque se añade a la bestia atacada. Si es negativo no hace nada.
    #type; // AttackInfo.attackTypes que indica el tipo del ataque.
    #element; // referencia al objeto de tipo element que indica el tipo elemental del ataque.

    /* -- Atributos del ataque -- */
    #damage; // float que indica la cantidad de daño que conlleva el ataque. Será >= 0. Podrá ser INF si se usa DEATH_TOUCH.
    #attackOrigin; // entero que indica la posición de la bestía atacante en su pentágono. Será >= 1 y <=5.
    #attackTarget; // entero que indica a atacar. Será >= 1 y <=5.

    // Constructora de la clase.
    constructor(damage, type, element, canHurtLeader = true, addBuildupSlow = -1)
    {
        // Asignación de parámetros de entrada, asegurandose de que los tipos sean correctos.
        if(Object.values(AttackInfo.attackTypes).includes(type)) this.#type = type;
        else throw new TypeError("Se ha intentado construir un AttackInfo con el parámetro de entrada \"type\" sin ser un AttackInfo.attackTypes.");

        if (type === AttackInfo.attackTypes.DEATH_TOUCH) this.#damage = Infinity; // se forzará el daño infinito si el ataque es DeathTouch.
        else if (typeof damage === "number" && damage >= 0) this.#damage = damage;
        else throw new TypeError("Se ha intentado construir un AttackInfo con el parámetro de entrada \"damage\" incorrecto.");

        try 
        {
            this.#element = Element.CheckForElement(element);
        }
        catch
        {
            throw new TypeError("Se ha intentado construir un AttackInfo con el parámetro de entrada \"element\" sin ser un elemento.");
        }

        if (typeof canHurtLeader === "boolean") this.#canHurtLeader = canHurtLeader;
        else throw new TypeError("Se ha intentado construir un AttackInfo con el parámetro de entrada \"canHurtLeader\" no booleano.");

        if (typeof addBuildupSlow === "number") this.#addBuildupSlow = addBuildupSlow;
        else throw new TypeError("Se ha intentado construir un AttackInfo con el parámetro de entrada \"addBuildupSlow\" que no es número.");
    }

    /* -- Getters -- */
    // Devuelve del daño del ataque
    getDamage()
    {
        return this.#damage;
    }

    // Devuelve el tipo del ataque.
    getAttackType()
    {
        return this.#type;
    }

    // Devuelve el elemento del ataque.
    getElement()
    {
        return this.#element;
    }

    // Devuelve la posición a atacar.
    getAttackTarget()
    {
        return this.#attackTarget;
    }

    // Devuelve la posición de origen del ataque.
    getAttackOrigin()
    {
        return this.#attackOrigin;
    }

    // Devuelve si el ataque puede dañar a lideres de equipo.
    getCanHurtLeader()
    {
        return this.#canHurtLeader;
    }

    // Devuelve si el ataque puede añadir tiempo al buildup de la bestia dañada.
    // Un número negativo indica que no añade buildup.
    getAddBuildupSlow()
    {
        return this.#addBuildupSlow;
    }

    /* -- Setters -- */
    // Método para establecer el #attackTarget.
    setAttackTarget(attackTarget)
    {
        if (Number.isInteger(attackTarget) && attackTarget >= 1 && attackTarget <= 5) this.#attackTarget = attackTarget;
        else throw new TypeError("Se ha intentado construir un AttackInfo con el parámetro de entrada \"attackTarget\" incorrecto.");
    }

    // Metodo para establecer el #attackOrigin.
    setAttackOrigin(attackOrigin)
    {
        if (Number.isInteger(attackOrigin) && attackOrigin >= 1 && attackOrigin <= 5) this.#attackOrigin = attackOrigin;
        else throw new TypeError("Se ha intentado construir un AttackInfo con el parámetro de entrada \"attackOrigin\" incorrecto.");
    }
}
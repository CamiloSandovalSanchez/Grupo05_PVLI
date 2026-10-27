import Beast from "./beast.js"
import TeamLeader from "./teamleader.js"
import AttackInfo from "../utility/attackinfo.js"

import Sprite from "../render/sprite.js"

export default class Pentagon
{
    static DEFAULT_ROTATIONCOOLDOWN = 5;

    // Variables de la clase:
    #beasts = new Array(5); // las 5 bestias del pentágono, siguiendo la siguiente formación:
    //        1
    //   5   
    //           2
    //   4
    //        3
    // (1, 2, 3 en el frente, de arriba a abajo, y 4, 5 en las traseras, de abajo a arriba)
    // En todo momento se usaran los indices indicados por este esquema; no se usará la convención de 0 a 4.
    #tPassedSinceRotation = 0; // variable float para almacenar cuanto tiempo ha pasado desde la última rotación
    #rotationCooldown; // variable float que indica el cooldown entre rotaciones
    #leader = null; // referencia al objeto lider del pentágono
    #rivalPentagon; // referencia al pentágono rival. No incluido en la constructora; usar el método SetRivalPentagon().

    #sprite; // sprite del pentágono

    // Método para establecer el pentágono rival fuera de la constructora, evitando bucles infinitos de inicialización.
    setRivalPentagon(rivalPentagon)
    {
        if (rivalPentagon instanceof Pentagon) 
        {
            this.#rivalPentagon = rivalPentagon;
            for(let i = 0; i < this.#beasts.length; ++i) 
            {
                if (this.#beasts[i] != null) this.#beasts[i].setRivalPentagon(rivalPentagon);
            }
            if (this.#leader != null) this.#leader.setRivalPentagon(rivalPentagon);
        }
        else throw new TypeError("SetRivalPentagon llamado en un Pentagon con un parámetro que no era instancia de Pentagon");
    }

    // Constructora de la clase.
    constructor(beast1, beast2, beast3, beast4, beast5, leader, sprite, rotationCooldown = Pentagon.DEFAULT_ROTATIONCOOLDOWN)
    {
        // Asegurarse del tipo de las variables y asignación.
        if (leader instanceof TeamLeader) // obligatoriamente antes que las beast y sprite
        {
            this.#leader = leader;
            this.#leader.setPentagon(this);
        }
        else throw new TypeError("Constructora de Pentagon llamada con parámetro leader sin ser instancia de TeamLeader");

        if (sprite instanceof Sprite) 
        {
            this.#sprite = sprite; // obligatoriamente antes que las beast
            if (!this.isPlayerPentagon()) this.#sprite.flipX = true;
        }
        else throw new TypeError("Constructora de Pentagon llamada con parámetro sprite sin ser instancia de Sprite");

        if (beast1 instanceof Beast && beast2 instanceof Beast && beast3 instanceof Beast && beast4 instanceof Beast && beast5 instanceof Beast)
        {
            this.#beasts[0] = beast1;
            this.#beasts[1] = beast2;
            this.#beasts[2] = beast3;
            this.#beasts[3] = beast4;
            this.#beasts[4] = beast5;

            //  Introducimos a las bestias al pentágono adecuadamente.
            for (let i = 0; i < this.#beasts.length; ++i) 
            {
                this.#beasts[i].setPentagon(this);
                this.#beasts[i].setPosition(i+1, this.isPlayerPentagon());
            }
        }
        else throw new TypeError("Constructora de Pentagon llamada con parámetros de bestia que no eran instancia de Beast");

        if (typeof rotationCooldown === "number") this.#rotationCooldown = Pentagon.DEFAULT_ROTATIONCOOLDOWN;
        else throw new TypeError("Constructora de Pentagon llamada con parámetro rotationCooldwon no número");
    }

    // Método para acceder al valor de x del sprite del pentágono.
    getSpriteX()
    {
        return this.#sprite.x;
    }

    // Método para acceder al valor de y del sprite del pentágono.
    getSpriteY()
    {
        return this.#sprite.y;
    }

    // Método para intentar rotar el pentágono. Puede fallar, devolviendo un booleano que indica su éxito.
    tryToRotate(clockwise)
    {
        if (this.#tPassedSinceRotation >= this.#rotationCooldown) 
        {
            this.forceRotate(clockwise);
            return true;
        }
        else return false;
    }

    // Método para rotar el pentágono a la fuerza. No falla.
    forceRotate(clockwise)
    {
        this.#tPassedSinceRotation = 0;
        if (clockwise) this.#beasts.unshift(this.#beasts.pop());  // si beasts = [A, B, C, D, E], lo cambia a [E, A, B, C, D]
        else this.#beasts.push(this.#beasts.shift());  // si beasts = [A, B, C, D, E], lo cambia a [B, C, D, E, A]

        for(let i = 0; i < this.#beasts.length; ++i) this.#beasts[i].setPosition(i + 1, this.isPlayerPentagon());

        // TODO: Lanzar evento de rotación
    }

    // Actualiza el pentágono.
    update(dt)
    {
        this.#tPassedSinceRotation += dt;
        for(let i = 0; i < this.#beasts.length; ++i) this.#beasts[i].update(dt);

        // TODO: Actualizar representación gráfica del cooldown de rotacion
    }

    // Método para mandar un ataque a las bestias de este pentágono.
    attackPosition(attack)
    {
        if (attack instanceof AttackInfo) 
        {
            if(this.#beasts[attack.getAttackTarget() - 1].isDead() || attack.getAttackType() === AttackInfo.attackTypes.DIRECT)
                this.#leader.recieveHit(attack);
            else this.#beasts[attack.getAttackTarget() - 1].recieveHit(attack);
        }
        else console.error("Se esta intentando atacar en un Pentagon con un objeto que no es un AttackInfo. Se ignorará el ataque");
    }

    // Método para curar a las bestias de este pentágono.
    healPosition(healPoints, position)
    {
        if (position >= 1 && position <= 5) 
        {
            if (!this.#beasts[position - 1].isDead()) this.#beasts[position - 1].recieveHeal(healPoints);
        }
        else console.error("Se esta intentado curar en un Pentagono con una posición inválida. Se ignorará");
    }

    // Devuelve si este se trata del pentágono del jugador.
    isPlayerPentagon()
    {
        return this.#leader.getIsPlayer();
    }
}
import Beast from "./beast.js"
import TeamLeader from "./teamleader.js"
import AttackInfo from "../utility/attackinfo.js"

import SpriteContainer from "../render/spritecontainer.js"

// Clase encargada de representar un pentágono del juego.
// Se encarga de recibir y repartir todas las interacciones del juego.
// A su vez se encarga de llevar toda la lógica de las rotaciones del juego.
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
    #rivalPentagon = null; // referencia al pentágono rival. No incluido en la constructora; usar el método SetRivalPentagon().

    #sprite; // sprite del pentágono

    // Método para establecer el pentágono rival fuera de la constructora, evitando bucles infinitos de inicialización.
    setRivalPentagon(rivalPentagon)
    {
        if (rivalPentagon instanceof Pentagon) 
        {
            this.#rivalPentagon = rivalPentagon;
            for(let i = 0; i < this.#beasts.length; ++i) 
            {
                if (this.#beasts[i] !== null) this.#beasts[i].setRivalPentagon(rivalPentagon);
            }
            if (this.#leader !== null) this.#leader.setRivalPentagon(rivalPentagon);
        }
        else throw new TypeError("SetRivalPentagon llamado en un Pentagon con un parámetro que no era instancia de Pentagon");
    }

    // Método para establecer a un lider en el pentágono.
    setLeader(leader)
    {
        if (leader instanceof TeamLeader)
        {
            this.#leader = leader;
            this.#leader.setPentagon(this);
            if (this.#rivalPentagon !== null) this.#leader.setRivalPentagon(this.#rivalPentagon);
        }
        else console.error("Se ha intentado establecer en Pentagon el parámetro leader sin ser instancia de TeamLeader")
    }

    // Método para establecer a una bestia en el pentágono.
    setBeast(beast, index)
    {
        if (beast instanceof Beast || beast === null)
        {
            this.#beasts[index] = beast;
            this.#beasts[index].setPentagon(this);
            this.#beasts[index].setPosition(index + 1, this.isPlayerPentagon());
            if (this.#rivalPentagon !== null) this.#beasts[index].setRivalPentagon(this.#rivalPentagon);
        }
        else console.error("Se ha intentado establecer en Pentagon un parámetro de bestia que no era válida");
    }

    // Constructora de la clase.
    constructor(beast1, beast2, beast3, beast4, beast5, leader, sprite, rotationCooldown = Pentagon.DEFAULT_ROTATIONCOOLDOWN)
    {
        // Asegurarse del tipo de las variables y asignación.
        this.setLeader(leader)// obligatoriamente antes que las beast y sprite

        if (sprite instanceof SpriteContainer) 
        {
            this.#sprite = sprite; // obligatoriamente antes que las beast
            if (!this.isPlayerPentagon()) this.#sprite.flipX(true);
        }
        else throw new TypeError("Constructora de Pentagon llamada con parámetro sprite sin ser instancia de Sprite");

        //  Introducimos a las bestias al pentágono adecuadamente.
        this.setBeast(beast1, 0);
        this.setBeast(beast2, 1);
        this.setBeast(beast3, 2);
        this.setBeast(beast4, 3);
        this.setBeast(beast5, 4);
        
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

        for(let i = 0; i < this.#beasts.length; ++i) if (this.#beasts[i] !== null) this.#beasts[i].setPosition(i + 1, this.isPlayerPentagon());

        // TODO: Lanzar evento de rotación
    }

    // Actualiza el pentágono.
    update(dt)
    {
        this.#tPassedSinceRotation += dt;
        for(let i = 0; i < this.#beasts.length; ++i) if (this.#beasts[i] !== null) this.#beasts[i].update(dt);

        // TODO: Actualizar representación gráfica del cooldown de rotacion
    }

    // Método para mandar un ataque a las bestias de este pentágono.
    attackPosition(attack)
    {
        if (attack instanceof AttackInfo) 
        {
            if (this.#beasts[attack.getAttackTarget() - 1] === null || // si no hay bestia
             this.#beasts[attack.getAttackTarget() - 1].isDead() || // o si el objetivo ha muerto
              attack.getAttackType() === AttackInfo.attackTypes.DIRECT) // o si el tipo de ataque es directo
                this.#leader.recieveHit(attack); // atacar al lider
            else this.#beasts[attack.getAttackTarget() - 1].recieveHit(attack); // atacar a la bestia
        }
        else console.error("Se esta intentando atacar en un Pentagon con un objeto que no es un AttackInfo. Se ignorará el ataque");
    }

    // Método para curar a las bestias de este pentágono.
    healPosition(healPoints, position)
    {
        if (position >= 1 && position <= 5) 
        {
            if (this.#beasts[position - 1] !== null && // si hay bestia
                !this.#beasts[position - 1].isDead()) // y no ha muerto
                 this.#beasts[position - 1].recieveHeal(healPoints); // curar
        }
        else console.error("Se esta intentado curar en un Pentagono con una posición inválida. Se ignorará");
    }

    // Devuelve si este se trata del pentágono del jugador.
    isPlayerPentagon()
    {
        return this.#leader.getIsPlayer();
    }
}
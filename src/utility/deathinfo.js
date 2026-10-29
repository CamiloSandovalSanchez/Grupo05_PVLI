
import Element from './element.js';

// Objeto con toda la información vital sobre la muerte de un objeto con vida.
export default class DeathInfo
{
    // Variables de la clase:
    #isOnPlayerTeam; // es un booleano que determina si la muerte del objeto con vida estaba del lado del jugador o del enemigo.
    #isLeader; // es un booleano que determina si la muerte del objeto ha sido de un lider de equipo.
    #element; // guarda la referencia a un objeto de tipo Element.
    #beastPosition; // es un número entero que indica la posición en el pentágono en la que ha muerto la bestia. Podrá ser null si se tiene isLeader.

    // Constructora de la clase.
    constructor()
    {
        // Vacia inicialmente; se tendrá que completar con setters.
    }

    /* -- Métodos getter -- */
    // Método que devuelve el booleano indicando si la muerte fue de un objeto con vida del lado del jugador.
    getIsOnPlayerTeam()
    {
        return this.#isOnPlayerTeam;
    }

    // Método que devuelve un booleano indicando si la muerte fue de un objeto lider.
    getIsLeader()
    {
        return this.#isLeader;
    }

    // Método que devuelve la referencia al objeto con la información del elemento del objeto muerto.
    getElement()
    {
        return this.#element;
    }

    // Método que devuelve:
    // la posición de la bestia muerta en el pentágono
    // null si la bestia era un lider
    getBeastPosition()
    {
        return this.#beastPosition;
    }

    /* -- Métodos setter -- */ // Necesarios ya que los DeathInfos en primera instancia se crean incompletos.4
    // Establece #isOnPlayerTeam solo si el parámetro de entrada es booleano.
    setIsOnPlayerTeam(isOnPlayerTeam)
    {
        if (typeof isOnPlayerTeam === "boolean") this.#isOnPlayerTeam = isOnPlayerTeam;
        else throw new TypeError("Se ha intentado establecer un objeto DeathInfo con el parámetro de entrada \"isOnPlayerTeam\" sin ser booleano");
    }

    // Establece #isLeader solo si el parámetro de entrada es booleano.
    setIsLeader(isLeader)
    {
        if (typeof isLeader === "boolean") this.#isLeader = isLeader;
        else throw new TypeError("Se ha intentado establecer un objeto DeathInfo con el parámetro de entrada \"isLeader\" sin ser booleano");
    }

    // Establece #element solo si el parámetro es instancia de Element.
    setElement(element)
    {
        try
        {
            this.#element = Element.CheckForElement(element);
        }
        catch
        {
            throw new TypeError("Se ha intentado establecer un objeto DeathInfo introduciendo el parámetro de entrada \"element\" sin ser objeto tipo Element");
        }
    }

    // Establece #beastPosition solo si esta es un número entero valido.
    setBeastPosition(beastPosition)
    {
        if ((Number.isInteger(beastPosition) && (beastPosition >= 1 && beastPosition <= 5)) || (beastPosition === null && isLeader) ) this.#beastPosition = beastPosition;
        else throw new TypeError("Se ha intentado establecer un objeto DeathInfo introduciendo el parámetro de entrada \"beastPosition\" sin ser un número valido");
    }
}
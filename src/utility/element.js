// Objeto sencillo para almacenar elementos y utilizar interacciones elementales.
export default class Element
{
    // Lo más parecido a un enum que hay en javascript: Object.freeze evita que cambien.
    // Define los tipos elementales, accesibles con Element.types.
    static types = Object.freeze({
        ELECTRIC: 0,
        WATER: 1,
        FIRE: 2,
        AIR: 3,
        EARTH: 4,

        LIFE: 5,
        DEATH: 6
        // los primeros 5 (del 0 al 4) se colocan de forma que, de forma cíclica, son fuertes contra el siguiente y débiles contra el anterior
    });

    // Revisa si un parámetro cualquiera sirve para crear un elemento (por ser referencia a Element o por ser un Element.types)
    // Si lo es devuelve la referencia. 
    static CheckForElement(element)
    {
        if (!(element instanceof Element)) // ¿no es una instancia de elemento?
        {
            if (Object.values(Element.types).includes(element)) // tendrá que ser un Element.types
            {
                return new Element(element);
            }
            else throw new TypeError("El parámetro introducido no es un elemento.")
        }
        else // instancia de elemento
            return element;
    }

    //  --- Variables de la clase: ---
    #element; // almacena el tipo de elemento

    // Constructora de la clase. 
    // Recibe un Element.type o un objeto de tipo elemento para guardarlo. Otros parámetros lanzarán excepción.
    constructor(element)
    {
        // Asignación de parámetros de entrada, asegurandose de que sus tipos sean correctos.
        if (!Object.values(Element.types).includes(element)) // si Element.types no incluye el parámetro introducido...
            if (element instanceof Element) this.#element = element.getType(); // si es un elemento todavía podemos construir
            else // invalido
                throw new TypeError("Fallo en la constructora de Element en element.js: se ha intentado crear un objeto con un parámetro que no era un Element.types");
        else this.#element = element;
    }

    // Método para leer el objeto Element.type de este objeto.
    getType()
    {
        return this.#element;
    }

    // Método que devuelve un booleano indicando si este elemento es fuerte contra otro.
    isStrongAgainst(otherElement) 
    {
        if (!Object.values(Element.types).includes(otherElement)) // si Element.types no incluye el parámetro introducido, lanza excepción
        { 
            if (otherElement instanceof Element) return (this.#element < 5 && (this.#element + 1)%5 === otherElement.getType());
            else 
            {
                console.error("En element.js, se ha llamado a isStrongAgainst con un parámetro que no era un Element.types. Devolverá falso.");
                return false;
            }
        }
        else return (this.#element < 5 && (this.#element + 1)%5 === otherElement);
    }

    // Método que devuelve un booleano indicando si este elemento es débil contra otro.
    isWeakAgainst(otherElement)
    {
        if (!Object.values(Element.types).includes(otherElement)) // si Element.types no incluye el parámetro introducido, lanza excepción
        { 
            if (otherElement instanceof Element) return (this.#element < 5 && (this.#element + 4)%5 === otherElement.getType());
            else
            {
                console.error("En element.js, se ha llamado a isWeakAgainst con un parámetro que no era un Element.types. Devolverá falso.");
                return false;
            }
        }
        else return (this.#element < 5 && (this.#element + 4)%5 === otherElement);
    }
}
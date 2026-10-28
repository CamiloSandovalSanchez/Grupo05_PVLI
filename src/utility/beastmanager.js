import Beast from '../combat/beast.js'
import Pentagon from '../combat/pentagon.js' // Se importa para crear la bestia directament en la posición dnd se la quiere
import HasHealth from "../health/hashealth.js"; // Como el constructor de bestia llevan el hasHealth y el attackHandler y desde aquí se construyen
import AttackHandler from "../attack/attackhandler.js"; // He decidido importrlas para poder usarlas directamente en su creación (a no ser que no haga falta)

export default class beastManager{
    // Variables
    #tag; // Identificador de la bestia para crearla
    #posInPentagon; // Identificador de posición en la que queremos crear dicha bestia
    // Variables de beast para construir a las bestias desde aquí
    #lifeObject; // Declarar la vida de la bestia
    #attackObject; // Declarar su ataque
    #sprite; // Declarar su textura

    // Las exceciones ya son controladas a la hora de tratar de crear una bestia asi que no son necesarias en este manager
    constructor(scene, tag, posInPentagon){

    }
    /* LEER PLS 
    No sé si esto va aquí o no, por eso lo comento. Yo creo que sí, ya que así se nos facilita mucho la creación y carga de escenas.
    Y como el profesor nos dijo que como el juego era pequeño que no pasaba nada si estaba todo cargado desde el inicio pues cargarlo
    desde aquí me parece la manera más sencilla de tener todos los 'prefabs' listos para su uso. 
    Quizás el create sí que no va aquí, pero el preload lo más seguro es que sí. Qué opinan?
    // Carga de los sprites necesarios
    preLoad(){

    }

    create(){

    }*/

    // Métodos de creación de bestias
    
    loadSmokePuff(){

    }

    loadAquaBlob(){

    }
}
import SceneManager from "./scenemanager.js";
import Pentagon from "../combat/pentagon.js";

export default class GameManager{

   // Variables de la clase:
    static instance;
    #scene;
    #battleOn;
    #playerPentagon;
    #enemyPentagon;

    constructor(Scene, AllyPentagon, EnemyPentagon)
    {
        if (GameManager.instance){ return GameManager.instance; }
        
        // Todo el código del constructor aquí
        if (Scene instanceof Phaser.Scene) this.#scene = Scene;
        else console.error("Constructora de BeastManager llamada con parámetro scene inválido. Funcionará mal");

        // Introducimos los pentágonos rival y de jugador para poder palicar las condiciones de fin de batalla
        this.#playerPentagon = AllyPentagon;
        this.#enemyPentagon = EnemyPentagon;

        GameManager.instance = this;
    }

    creatureHasDied(){
        if(this.#playerPentagon instanceof Pentagon){
            if(this.#playerPentagon.emptyPentagon()){
                this.victory();
            }
        }

        if(this.#enemyPentagon instanceof Pentagon){
            if(this.#playerPentagon.emptyPentagon()){
                this.defeat();
            }
        }
    }

    update(dt){

        
    }

    victory(){
        // Meter la win screen
    }

    defeat(){
        // Meter la lose screen
    } 
}
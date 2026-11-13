import SceneManager from "./scenemanager.js";
import Pentagon from "../combat/pentagon.js";

export default class GameManager{

   // Variables de la clase:
    static instance;
    #scene;
    #battleOn;

    constructor(Scene)
    {
        if (GameManager.instance){ return GameManager.instance; }
        
        // Todo el código del constructor aquí
        this.#battleOn = true;
        if (Scene instanceof Phaser.Scene) this.#scene = Scene;
        else console.error("Constructora de BeastManager llamada con parámetro scene inválido. Funcionará mal");
        
        GameManager.instance = this;
    }

    emptiedPentagon(player){
        this.#battleOn = false;
        if (!player) this.#victory();
        else this.#defeat();
    }

    update(dt){

        
    }

    #victory(){
        console.log("Has ganado");
        // Meter la win screen
    }

    #defeat(){
        console.log("Has perdiiido");
        // Meter la lose screen
    }
    
    getBattleOn(){
        return this.#battleOn;
    }
}
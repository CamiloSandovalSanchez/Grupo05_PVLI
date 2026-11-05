
export default class SceneManager{

    // Variables de la clase
    static instance;
    #scene;

    // Clase con propósito de cargar las diferentes escenas del juego
    constructor(Scene)
    {
        if (SceneManager.instance){ return SceneManager.instance; }
        
        // Todo el código del constructor aquí
        if (Scene instanceof Phaser.Scene) this.#scene = Scene;
        else console.error("Constructora de BeastManager llamada con parámetro scene inválido. Funcionará mal");

        SceneManager.instance = this;
    }

    loadMainMenu(){
        
    }
}

export default class sceneManager{
    static instance;

    // Clase con propósito de cargar las diferentes escenas del juego
    constructor(scene){
        if (sceneManager.instance){ return sceneManager.instance; }
        // Todo el código del constructor aquí


        sceneManager.instance = this;
    }

    loadMainMenu(){
        
    }
}
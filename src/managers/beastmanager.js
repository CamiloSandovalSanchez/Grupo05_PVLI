import Beast from '../combat/beast.js'
import HasHealth from "../health/hashealth.js";
import Element from '../utility/element.js';
import DeafultAttack from '../attack/defaultAttackHandler.js';
import AttackInfo from '../utility/attackinfo.js';
import SpriteContainer from '../render/spritecontainer.js';
import HealthBar from '../render/filldisplay/healthbar.js';
import BuildupBar from '../render/filldisplay/buildupbar.js';

export default class beastManager{
    static instance;
    
    #tag = " ";
    #type = " ";
    
    // Las exceciones ya son controladas a la hora de tratar de crear una bestia asi que no son necesarias en este manager
    constructor(Scene){
        if (beastManager.instance){ return beastManager.instance; }
        // Todo el código del constructor aquí
        this.scene = Scene;
        beastManager.instance = this;
    }

    //Métodos de identificación de bestia
    // Uso de return para devolver la instancia a la bestia y así mantener todas sus funciones
    spawnBeast(type, tag){
        switch (type){
            case "wind": return this.searchWind(tag);
            case "fire": return this.searchFire(tag);
            case "water": return this.searchWater(tag);
            case "ground": return this.searchGround(tag);
            case "electric": return this.searchElectric(tag);
            case "life": return this.searchLife(tag);
            case "death": return this.searchDeath(tag);
            default: console.log("elemento de bestia no encontrado");
        }
    }

    searchWind(tag){
        switch(tag){
            case "smokepuff": return this.loadSmokePuff();
            default: console.log("no se ha encontrado a la bestia de viento");
        }
    }

    searchFire(tag){
        switch(tag){
            default: console.log("no se ha encontrado a la bestia de fuego");
        }
    }
    searchWater(tag){
        switch(tag){
            case "aquablob": return this.loadAquaBlob();
            default: console.log("no se ha encontrado a la bestia de agua");
        }
    }
    searchGround(tag){
        switch(tag){
            default: console.log("no se ha encontrado a la bestia de tierra");
        }
    }
    searchElectric(tag){
        switch(tag){
            default: console.log("no se ha encontrado a la bestia de eléctrico");
        }
    }
    searchLife(tag){
        switch(tag){
            default: console.log("no se ha encontrado a la bestia de vida");
        }
    }
    searchDeath(tag){
        switch(tag){
            default: console.log("no se ha encontrado a la bestia de muerte");
        }
    }

    // Métodos de creación de bestias
    
    loadSmokePuff(){
        let elementAir = new Element(Element.types.AIR);
        return new Beast(
                    new HasHealth(100, 5, elementAir),
                    new DeafultAttack(new AttackInfo(30, AttackInfo.attackTypes.NORMAL, elementAir), 5000),
                    new SpriteContainer(this.scene, 0, 0, 'puff', 0),
                    new HealthBar(this.scene, 0, -50, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.scene, 0, -100, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }

    loadAquaBlob(){

    }
}
import Beast from '../combat/beast.js'
import HasHealth from "../health/hashealth.js";
import Element from '../utility/element.js';
import DeafultAttack from '../attack/defaultattackhandler.js';
import AttackInfo from '../utility/attackinfo.js';
import SpriteContainer from '../render/spritecontainer.js';
import HealthBar from '../render/filldisplay/healthbar.js';
import BuildupBar from '../render/filldisplay/buildupbar.js';
import TeamLeader from '../combat/teamleader.js';

export default class EntityManager
{
    // Variables de la clase:
    static instance;
    #scene;

    // Se guardan los tags de las bestias aquí
    static tags = Object.freeze({

        // AIRE
        SmokePuff: 0,
        // FUEGO

        // AGUA
        AquaBlob: 1,
        // TIERRA

        // ELECTRICO

        // VIDA

        // MUERTE

        // LIDERES
        Janitor: 2,
        Enemy: 3
    });
    
    // Las exceciones ya son controladas a la hora de tratar de crear una bestia asi que no son necesarias en este manager
    constructor(Scene)
    {
        if (EntityManager.instance){ return EntityManager.instance; }
        
        // Todo el código del constructor aquí
        if (Scene instanceof Phaser.Scene) this.#scene = Scene;
        else console.error("Constructora de BeastManager llamada con parámetro scene inválido. Funcionará mal");

        EntityManager.instance = this;
    }

    spawnLeader(tag){
        switch(tag){
            case (EntityManager.tags.Janitor): return this.#loadJanitor();
            case (EntityManager.tags.Enemy): return this.#loadEenemy();
        }
    }

    // Métodos de identificación de bestia
    // Uso de return para devolver la instancia a la bestia y así mantener todas sus funciones
    spawnBeast(element, tag)
    {
        element = Element.CheckForElement(element);
        if (element instanceof Element)
        {
            switch (element.getType())
            {
                case (Element.types.AIR): 
                    return this.#searchAir(tag);
                case (Element.types.FIRE): 
                    return this.#searchFire(tag);
                case (Element.types.WATER): 
                    return this.#searchWater(tag);
                case (Element.types.EARTH): 
                    return this.#searchEarth(tag);
                case (Element.types.ELECTRIC): 
                    return this.#searchElectric(tag);
                case (Element.types.LIFE): 
                    return this.#searchLife(tag);
                case (Element.types.DEATH): 
                    return this.#searchDeath(tag);
            }
        }
        else console.error("Se ha introducido en spawnBeast del BeastManager el parámetro elemento mal.")
    }

    #searchAir(tag)
    {
        switch(tag)
        {
            case (EntityManager.tags.SmokePuff): 
                return this.#loadSmokePuff();
            default: 
                console.error("no se ha encontrado a la bestia de viento");
        }
    }

    #searchFire(tag)
    {
        switch(tag)
        {
            default: console.error("no se ha encontrado a la bestia de fuego");
        }
    }
    #searchWater(tag){
        switch(tag){
            case (EntityManager.tags.AquaBlob): 
                return this.#loadAquaBlob();
            default: 
                console.error("no se ha encontrado a la bestia de agua");
        }
    }
    #searchEarth(tag){
        switch(tag)
        {
            default: 
                console.error("no se ha encontrado a la bestia de tierra");
        }
    }
    #searchElectric(tag){
        switch(tag)
        {
            default: 
                console.error("no se ha encontrado a la bestia de eléctrico");
        }
    }
    #searchLife(tag)
    {
        switch(tag)
        {
            default: 
                console.error("no se ha encontrado a la bestia de vida");
        }
    }
    #searchDeath(tag)
    {
        switch(tag)
        {
            default: 
                console.error("no se ha encontrado a la bestia de muerte");
        }
    }


    /* ------------------------------------------- */
    /* ----- Métodos de creación de líderes ------ */
    /* ------------------------------------------- */

    #loadJanitor(){
        let elementLeader = new Element(Element.types.NEUTRAL);
        return new TeamLeader(
            true,
            new HasHealth(50, 0, elementLeader),
            new DeafultAttack(new AttackInfo(0, AttackInfo.attackTypes.NORMAL, elementLeader), 5000),
            new SpriteContainer(this.#scene, 0, 0, 0.75, 'janitor', 0),
            new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100)
        );
    }

    #loadEenemy(){
        let elementLeader = new Element(Element.types.NEUTRAL);
        return new TeamLeader(
            false,
            new HasHealth(50, 0, elementLeader),
            new DeafultAttack(new AttackInfo(0, AttackInfo.attackTypes.NORMAL, elementLeader), 5000),
            new SpriteContainer(this.#scene, 0, 0, 0.75, 'janitor', 0),
            new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100)
        );
    }

    /* ------------------------------------------- */
    /* ----- Métodos de creación de bestias ------ */
    /* ------------------------------------------- */
    
    #loadSmokePuff(){
        let elementAir = new Element(Element.types.AIR);
        return new Beast(
                    new HasHealth(100, 5, elementAir),
                    new DeafultAttack(new AttackInfo(30, AttackInfo.attackTypes.NORMAL, elementAir), 5000),
                    new SpriteContainer(this.#scene, 0, 0, 1, 'puff', 0),
                    new HealthBar(this.#scene, 0, -50, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 50, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }

    #loadAquaBlob(){
        let elementWater = new Element(Element.types.WATER);
        return new Beast(
                    new HasHealth(100, 5, elementWater),
                    new DeafultAttack(new AttackInfo(30, AttackInfo.attackTypes.NORMAL, elementWater), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 1, 'aquablob', 0),
                    new HealthBar(this.#scene, 0, -50, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 50, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
}
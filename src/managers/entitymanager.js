import Beast from '../combat/beast.js'
import HasHealth from "../health/hashealth.js";
import Element from '../utility/element.js';
import DeafultAttack from '../attack/defaultattackhandler.js';
import MultiAttack from '../attack/multiattackhandler.js';
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
        Hada: 1,
        Torbellino: 2,
        
        
        // FUEGO
        LavaSlime: 3,
        Apolo: 4,
        Cerbero: 5, 


        // AGUA
        AquaBlob: 6,
        Sirena: 7,
        BarcoPirata: 8,
        
        
        // TIERRA
        Golem: 9,
        Atlas: 10,
        Hecatonquiros: 11,
        
        
        // ELECTRICO
        LightningSpirit: 12,
        
        
        // VIDA

        // MUERTE

        // LIDERES
        Janitor: 13,
        Enemy: 14
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
            case (EntityManager.tags.Hada): 
                return this.#loadHada();
            default: 
                console.error("no se ha encontrado a la bestia de viento");
        }
    }

    #searchFire(tag)
    {
        switch(tag)
        {
            case (EntityManager.tags.LavaSlime): 
                return this.#loadLavaSlime();
            case (EntityManager.tags.Apolo): 
                return this.#loadApolo();
            case (EntityManager.tags.Cerbero): 
                return this.#loadCerbero();
            default: console.error("no se ha encontrado a la bestia de fuego");
        }
    }
    #searchWater(tag){
        switch(tag){
            case (EntityManager.tags.AquaBlob): 
                return this.#loadAquaBlob();
            case (EntityManager.tags.Sirena): 
                return this.#loadSirena();
            case (EntityManager.tags.BarcoPirata): 
                return this.#loadBarcoPirata();
            default: 
                console.error("no se ha encontrado a la bestia de agua");
        }
    }
    #searchEarth(tag){
        switch(tag)
        {
            case (EntityManager.tags.Golem): 
                return this.#loadGolem();
            case (EntityManager.tags.Atlas): 
                return this.#loadAtlas();
            case (EntityManager.tags.Hecatonquiros): 
                return this.#loadHecatonquiros();
            default: 
                console.error("no se ha encontrado a la bestia de tierra");
        }
    }
    #searchElectric(tag){
        switch(tag)
        {
            case (EntityManager.tags.LightningSpirit): 
                return this.#loadLightningSpirit();
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
                    new SpriteContainer(this.#scene, 0, 0, 0.65, 'puff', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }

    #loadAquaBlob(){
        let elementWater = new Element(Element.types.WATER);
        return new Beast(
                    new HasHealth(100, 5, elementWater),
                    new DeafultAttack(new AttackInfo(30, AttackInfo.attackTypes.NORMAL, elementWater), 5000),
                    new SpriteContainer(this.#scene, 0, 0, 0.65, 'aquablob', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadGolem(){
        let elementEarth = new Element(Element.types.EARTH);
        return new Beast(
                    new HasHealth(70, 5, elementEarth),
                    new DeafultAttack(new AttackInfo(10, AttackInfo.attackTypes.NORMAL, elementEarth), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.65, 'golem', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadLightningSpirit(){
        let elementElectric = new Element(Element.types.ELECTRIC);
        return new Beast(
                    new HasHealth(100, 5, elementElectric),
                    new DeafultAttack(new AttackInfo(30, AttackInfo.attackTypes.NORMAL, elementElectric), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.65, 'lightspirit', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadLavaSlime(){
        let elementFire = new Element(Element.types.FIRE);
        return new Beast(
                    new HasHealth(50, 0, elementFire),//(HP, def)
                    new DeafultAttack(new AttackInfo(20, AttackInfo.attackTypes.NORMAL, elementFire), 1000),//(att)
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'lavaslime', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadCerbero(){
        let elementFire = new Element(Element.types.FIRE);
        return new Beast(
                    new HasHealth(120, 0, elementFire),//(HP, def)
                    new MultiAttack(new AttackInfo(20, AttackInfo.attackTypes.NORMAL, elementFire), 5000),//(att)
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'cerbero', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadHada(){
        let elementAir = new Element(Element.types.AIR);
        return new Beast(
                    new HasHealth(50, 10, elementAir),
                    new DeafultAttack(new AttackInfo(5, AttackInfo.attackTypes.NORMAL, elementAir), 5000),
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'hada', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadAtlas(){
        let elementEarth = new Element(Element.types.EARTH);
        return new Beast(
                    new HasHealth(230, 0, elementEarth),
                    new DeafultAttack(new AttackInfo(0, AttackInfo.attackTypes.NORMAL, elementEarth), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'atlas', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadHecatonquiros(){
        let elementEarth = new Element(Element.types.EARTH);
        return new Beast(
                    new HasHealth(100, 0, elementEarth),
                    new DeafultAttack(new AttackInfo(0, AttackInfo.attackTypes.NORMAL, elementEarth), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'hecaton', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadSirena(){
        let elementWater = new Element(Element.types.WATER);
        return new Beast(
                    new HasHealth(45, 5, elementWater),
                    new DeafultAttack(new AttackInfo(10, AttackInfo.attackTypes.NORMAL, elementWater), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'sirena', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadApolo(){
        let elementFire = new Element(Element.types.FIRE);
        return new Beast(
                    new HasHealth(45, 5, elementFire),
                    new DeafultAttack(new AttackInfo(10, AttackInfo.attackTypes.NORMAL, elementFire), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'apolo', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadBarcoPirata(){
        let elementWater = new Element(Element.types.WATER);
        return new Beast(
                    new HasHealth(45, 5, elementWater),
                    new DeafultAttack(new AttackInfo(10, AttackInfo.attackTypes.NORMAL, elementWater), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.5, 'barco', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
}
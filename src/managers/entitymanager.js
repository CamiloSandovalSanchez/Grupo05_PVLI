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

        //ELECTRICO: 0
        LightningSpirit: [1,"ELECTRIC"],
        
        //AGUA: 1
        AquaBlob: [2,"WATER"],
        Sirena: [3,"WATER"],
        BarcoPirata: [4,"WATER"],
        
        //AIRE: 2,
        SmokePuff:[5,"AIR"],
        Hada: [6,"AIR"],
        Torbellino: [7,"AIR"],
        
        
        //FUEGO: 3,
        LavaSlime: [8,"FIRE"],
        Apolo: [9,"FIRE"],
        Cerbero: [10,"FIRE"], 

        
        //TIERRA: 4,
        Golem: [11,"EARTH"],
        Atlas: [12,"EARTH"],
        Hecatonquiros: [13,"EARTH"],
        Medusa: [14,"EARTH"],
        
        //VIDA: 5,

        //MUERTE: 6,

        //LIDERES: 7,
        Janitor: 15,
        
        T1Enemy1: 16,
        T1Enemy2: 17,
        T1Enemy3: 18,
        T1Enemy4: 19,
        T1Enemy5: 20,
        T1Enemy6: 21,
        
        T2Enemy1: 22,
        T2Enemy2: 23,
        T2Enemy3: 24,
        T2Enemy4: 25,
        
        T3Enemy1: 26,
        T3Enemy2: 27,
        T3Enemy3: 28,
        T3Enemy4: 29,
        T3Enemy5: 30,
    });
    
    // Las exceciones ya son controladas a la hora de tratar de crear una bestia asi que no son necesarias en este manager
    constructor(scene)
    {
        if (EntityManager.instance){ return EntityManager.instance; }
        
        // Todo el código del constructor aquí
        //console.log(scene);
        if (scene instanceof Phaser.Scene) this.#scene = scene;
        else console.error("Constructora de BeastManager llamada con parámetro scene inválido. Funcionará mal");

        EntityManager.instance = this;
    }

    spawnLeader(tag){
        switch(tag){
            case (EntityManager.tags.Janitor): return this.#loadJanitor();
            
            case (EntityManager.tags.T1Enemy1): return this.#loadEenemy();
            case (EntityManager.tags.T1Enemy2): return this.#loadEenemy();
            case (EntityManager.tags.T1Enemy3): return this.#loadEenemy();
            case (EntityManager.tags.T1Enemy4): return this.#loadEenemy();
            case (EntityManager.tags.T1Enemy5): return this.#loadEenemy();
            case (EntityManager.tags.T1Enemy6): return this.#loadEenemy();
            
            case (EntityManager.tags.T2Enemy1): return this.#loadEenemy();
            case (EntityManager.tags.T2Enemy2): return this.#loadEenemy();
            case (EntityManager.tags.T2Enemy3): return this.#loadEenemy();
            case (EntityManager.tags.T2Enemy4): return this.#loadEenemy();

            case (EntityManager.tags.T3Enemy1): return this.#loadEenemy();
            case (EntityManager.tags.T3Enemy2): return this.#loadEenemy();
            case (EntityManager.tags.T3Enemy3): return this.#loadEenemy();
            case (EntityManager.tags.T3Enemy4): return this.#loadEenemy();
            case (EntityManager.tags.T3Enemy5): return this.#loadEenemy();
            default: this.#loadEenemy();//PROVISIONAL
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
                    return this.#searchAir(tag[0]);
                case (Element.types.FIRE): 
                    return this.#searchFire(tag[0]);
                case (Element.types.WATER): 
                    return this.#searchWater(tag[0]);
                case (Element.types.EARTH): 
                    return this.#searchEarth(tag[0]);
                case (Element.types.ELECTRIC): 
                    return this.#searchElectric(tag[0]);
                case (Element.types.LIFE): 
                    return this.#searchLife(tag[0]);
                case (Element.types.DEATH): 
                    return this.#searchDeath(tag[0]);
            }
        }
        else console.error("Se ha introducido en spawnBeast del BeastManager el parámetro elemento mal.")
    }

    #searchAir(tag)
    {
        switch(tag)
        {
            case (EntityManager.tags.SmokePuff[0]): 
                return this.#loadSmokePuff();
            case (EntityManager.tags.Hada[0]): 
                return this.#loadHada();
            case (EntityManager.tags.Torbellino[0]): 
                return this.#loadTorbellino();
            default: 
                console.error("no se ha encontrado a la bestia de viento");
        }
    }

    #searchFire(tag)
    {
        switch(tag)
        {
            case (EntityManager.tags.LavaSlime[0]): 
                return this.#loadLavaSlime();
            case (EntityManager.tags.Apolo[0]): 
                return this.#loadApolo();
            case (EntityManager.tags.Cerbero[0]): 
                return this.#loadCerbero();
            default: console.error("no se ha encontrado a la bestia de fuego");
        }
    }
    #searchWater(tag){
        switch(tag){
            case (EntityManager.tags.AquaBlob[0]): 
                return this.#loadAquaBlob();
            case (EntityManager.tags.Sirena[0]): 
                return this.#loadSirena();
            case (EntityManager.tags.BarcoPirata[0]): 
                return this.#loadBarcoPirata();
            default: 
                console.error("no se ha encontrado a la bestia de agua");
        }
    }
    #searchEarth(tag){
        switch(tag)
        {
            case (EntityManager.tags.Golem[0]): 
                return this.#loadGolem();
            case (EntityManager.tags.Atlas[0]): 
                return this.#loadAtlas();
            case (EntityManager.tags.Hecatonquiros[0]): 
                return this.#loadHecatonquiros();
            case (EntityManager.tags.Medusa[0]): 
                return this.#loadMedusa();
            default: 
                console.error("no se ha encontrado a la bestia de tierra");
        }
    }
    #searchElectric(tag){
        switch(tag)
        {
            case (EntityManager.tags.LightningSpirit[0]): 
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
            new SpriteContainer(this.#scene, -0.2, 0, 0.8, 'janitorSheet', 0),
            new HealthBar(this.#scene, -15, 100, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100)
        );
    }

    #loadEenemy(){
        let elementLeader = new Element(Element.types.NEUTRAL);
        return new TeamLeader(
            false,
            new HasHealth(50, 0, elementLeader),
            new DeafultAttack(new AttackInfo(0, AttackInfo.attackTypes.NORMAL, elementLeader), 5000),
            new SpriteContainer(this.#scene, 0.2, 0, 0.8, 'janitor', 0),
            new HealthBar(this.#scene, 15, 100, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100)
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
                    new DeafultAttack(new AttackInfo(10, AttackInfo.attackTypes.NORMAL, elementEarth), 5000),
                    new SpriteContainer(this.#scene, 0, 0, 0.65, 'golem', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadLightningSpirit(){
        let elementElectric = new Element(Element.types.ELECTRIC);
        return new Beast(
                    new HasHealth(100, 5, elementElectric),
                    new DeafultAttack(new AttackInfo(30, AttackInfo.attackTypes.NORMAL, elementElectric), 5000),
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
    #loadTorbellino(){
        let elementAir = new Element(Element.types.AIR);
        return new Beast(
                    new HasHealth(50, 10, elementAir),
                    new DeafultAttack(new AttackInfo(5, AttackInfo.attackTypes.NORMAL, elementAir), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'torbellino', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadAtlas(){
        let elementEarth = new Element(Element.types.EARTH);
        return new Beast(
                    new HasHealth(230, 0, elementEarth),
                    new DeafultAttack(new AttackInfo(0, AttackInfo.attackTypes.NORMAL, elementEarth), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.8, 'atlas', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadMedusa(){
        let elementEarth = new Element(Element.types.EARTH);
        return new Beast(
                    new HasHealth(230, 0, elementEarth),
                    new DeafultAttack(new AttackInfo(0, AttackInfo.attackTypes.NORMAL, elementEarth), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.8, 'medusa', 0),
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
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 45, 45),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadApolo(){
        let elementFire = new Element(Element.types.FIRE);
        return new Beast(
                    new HasHealth(45, 5, elementFire),
                    new DeafultAttack(new AttackInfo(10, AttackInfo.attackTypes.NORMAL, elementFire), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.7, 'apolo', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 45, 45),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadBarcoPirata(){
        let elementWater = new Element(Element.types.WATER);
        return new Beast(
                    new HasHealth(45, 5, elementWater),
                    new DeafultAttack(new AttackInfo(10, AttackInfo.attackTypes.NORMAL, elementWater), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.75, 'barco', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }
    #loadCerbero(){
        let elementFire = new Element(Element.types.FIRE);
        return new Beast(
                    new HasHealth(45, 5, elementFire),
                    new DeafultAttack(new AttackInfo(10, AttackInfo.attackTypes.NORMAL, elementFire), 1000),
                    new SpriteContainer(this.#scene, 0, 0, 0.75, 'cerbero', 0),
                    new HealthBar(this.#scene, 0, -75, 'healthbarBG', 0, 'healthbarFILL', 0, 100, 100),
                    new BuildupBar(this.#scene, 0, 75, 'buildupbarBG', 0, 'buildupbarFILL', 0, 0, 5));
    }

    beastTagfromString(string){
        return EntityManager.tags[string];
    }
}
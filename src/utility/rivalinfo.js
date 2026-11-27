import Beast from "../combat/beast.js";
import Pentagon from "../combat/pentagon.js";
import EntityManager from "../managers/entitymanager.js";
import Element from "./element.js";

export default class RivalInfo
{
    #tier

    constructor(scene, tier, leader, bst1, bst2, bst3, bst4, bst5){
        
        this.#tier = tier;
        this.sceneForBuild = scene;
        this.beastList = [];
        this.names = [leader, bst1, bst2, bst3, bst4, bst5];
            
    }
    buildRivalConfig(){
        this.EntityManager = new EntityManager(this.sceneForBuild);
        
        this.beastList[0] = this.EntityManager.spawnBeast(
            new Element(Element.types[EntityManager.tags[this.names[1]][1]]), 
            EntityManager.tags[this.names[1]]);
    
        this.beastList[1] = this.EntityManager.spawnBeast(
            new Element(Element.types[EntityManager.tags[this.names[2]][1]]), 
            EntityManager.tags[this.names[2]]);
            
        this.beastList[2] = this.EntityManager.spawnBeast(
            new Element(Element.types[EntityManager.tags[this.names[3]][1]]), 
            EntityManager.tags[this.names[3]]);
    
        this.beastList[3] = this.EntityManager.spawnBeast(
            new Element(Element.types[EntityManager.tags[this.names[4]][1]]), 
            EntityManager.tags[this.names[4]]);
    
        this.beastList[4] = this.EntityManager.spawnBeast(
            new Element(Element.types[EntityManager.tags[this.names[5]][1]]), 
            EntityManager.tags[this.names[5]]);
            
        this.leader = this.EntityManager.spawnLeader(EntityManager.tags[this.names[0]]);

        console.log(this.beastList);
    }
    
    getTier(){
        return this.#tier;
    }
    getLeader(){
        return this.leader;
    }
    getLeaderName(){
        return this.names[0];
    }
    getBeastName(n = 1){
        return this.names[n];
    }
    getBeast(n){
        return this.beastList[n];
    }
    changeSceneForBuild(scene){
        this.sceneForBuild = scene;
    }
    
}
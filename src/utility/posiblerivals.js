import Beast from "../combat/beast.js";
import Pentagon from "../combat/pentagon.js";
import EntityManager from "../managers/entitymanager.js";
import Element from "./element.js";
import RivalInfo from "./rivalinfo.js";

export default class PosibleRivals
{
    

    constructor(scene){
        //console.log("posibles rivales constructor");
        
        this.RivalsArray = [ 
            //[rival, disponible]
            this.Tier1Rivals = [RivalInfo, Boolean], 
            this.Tier2Rivals = [RivalInfo, Boolean], 
            this.Tier3Rivals = [RivalInfo, Boolean]
        ];

        this.Tier1Rivals[0] = [new RivalInfo(scene, 1, "Janitor", "Apolo", "BarcoPirata", "LavaSlime", "Atlas", "Sirena"), true];
        this.Tier1Rivals[1] = [new RivalInfo(scene, 1, "T1Enemy1", "Cerbero", "Cerbero", "LavaSlime", "Medusa", "LavaSlime"), true];
        this.Tier1Rivals[2] = [new RivalInfo(scene, 1, "T1Enemy2", "AquaBlob", "BarcoPirata", "Torbellino", "SmokePuff", "Sirena"), true];
        this.Tier1Rivals[3] = [new RivalInfo(scene, 1, "T1Enemy3", "Apolo", "BarcoPirata", "LavaSlime", "Atlas", "Sirena"), true];
        this.Tier1Rivals[4] = [new RivalInfo(scene, 1, "T1Enemy4", "Apolo", "BarcoPirata", "LavaSlime", "Atlas", "Sirena"), true];
        this.Tier1Rivals[5] = [new RivalInfo(scene, 1, "T1Enemy5", "Apolo", "BarcoPirata", "LavaSlime", "Atlas", "Sirena"), true];
        this.Tier1Rivals[6] = [new RivalInfo(scene, 1, "T1Enemy6", "Apolo", "BarcoPirata", "LavaSlime", "Atlas", "Sirena"), true];

        
        this.Tier2Rivals[0] = [new RivalInfo(scene, 2, "T2Enemy1", "Atlas", "Atlas", "LightningSpirit", "Atlas", "Golem"), true];
        this.Tier2Rivals[1] = [new RivalInfo(scene, 2, "T2Enemy2", "Atlas", "Atlas", "LightningSpirit", "Atlas", "Golem"), true];
        this.Tier2Rivals[2] = [new RivalInfo(scene, 2, "T2Enemy3", "Atlas", "Atlas", "LightningSpirit", "Atlas", "Golem"), true];
        this.Tier2Rivals[3] = [new RivalInfo(scene, 2, "T2Enemy4", "Atlas", "Atlas", "LightningSpirit", "Atlas", "Golem"), true];
        this.Tier2Rivals[4] = [new RivalInfo(scene, 2, "T2Enemy3", "Atlas", "Atlas", "LightningSpirit", "Atlas", "Golem"), true];
        this.Tier2Rivals[5] = [new RivalInfo(scene, 2, "T2Enemy2", "Atlas", "Atlas", "LightningSpirit", "Atlas", "Golem"), true];
        this.Tier2Rivals[6] = [new RivalInfo(scene, 2, "T2Enemy1", "Atlas", "Atlas", "LightningSpirit", "Atlas", "Golem"), true];
        
        
        this.Tier3Rivals[0] = [new RivalInfo(scene, 3, "T3Enemy1", "Apolo", "Apolo", "LavaSlime", "Apolo", "LavaSlime"), true];
        this.Tier3Rivals[1] = [new RivalInfo(scene, 3, "T3Enemy2", "Apolo", "Apolo", "LavaSlime", "Apolo", "LavaSlime"), true];
        this.Tier3Rivals[2] = [new RivalInfo(scene, 3, "T3Enemy3", "Apolo", "Apolo", "LavaSlime", "Apolo", "LavaSlime"), true];
        this.Tier3Rivals[3] = [new RivalInfo(scene, 3, "T3Enemy4", "Apolo", "Apolo", "LavaSlime", "Apolo", "LavaSlime"), true];
        this.Tier3Rivals[4] = [new RivalInfo(scene, 3, "T3Enemy5", "Apolo", "Apolo", "LavaSlime", "Apolo", "LavaSlime"), true];
        this.Tier3Rivals[5] = [new RivalInfo(scene, 3, "T3Enemy4", "Apolo", "Apolo", "LavaSlime", "Apolo", "LavaSlime"), true];
        this.Tier3Rivals[6] = [new RivalInfo(scene, 3, "T3Enemy3", "Apolo", "Apolo", "LavaSlime", "Apolo", "LavaSlime"), true];

            
    }
    
    getNTierArray(nTier = 1){
        if(nTier <= 0) nTier = 1;
        return this.RivalsArray[nTier - 1];
    }
    getRivalArray(){
        return this.RivalsArray;
    }
    
    getLeaderName(nTier = 1, subIndice){
        return this.RivalsArray[nTier - 1][subIndice][0].getLeaderName();
    }
    
    setNewRival(nTier = 1, rival){

        if(!(rival instanceof RivalInfo)){ throw new TypeError("Se ha llamado al método 'setNewRival' pasando por parámetro algo distinto de 'RivalInfo'");}

        if(nTier <= 0) nTier = 1;

        let newPos = this.RivalsArray[nTier - 1].length;
        this.RivalsArray[nTier - 1][newPos] = rival;
    }
    
}
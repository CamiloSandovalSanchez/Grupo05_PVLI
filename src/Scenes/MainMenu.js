import Pentagon from '../combat/pentagon.js'
import Beast from '../combat/beast.js';
import TeamLeader from '../combat/teamleader.js';
import Sprite from '../render/sprite.js';
import HasHealth from '../health/hashealth.js';
import AttackHandler from '../attack/attackhandler.js';
import AttackInfo from '../utility/attackinfo.js';
import Element from '../utility/element.js';

 export default class MainMenu extends Phaser.Scene{

    constructor()
    {
        super({key: 'nomenu'});
    }

    preload()
    {
		this.load.image('puff', './assets/smokepuff.png');
	}

    create()
    {
        let elementAir = new Element(Element.types.AIR);
        let attackInfo = new AttackInfo(5, AttackInfo.attackTypes.NORMAL, elementAir);

        this.puff1 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5,),
            new Sprite(this, 0, 0, 'puff', 0));
        
        this.puff2 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5),
            new Sprite(this, 0, 0, 'puff', 0));
        
        this.puff3 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5),
            new Sprite(this, 0, 0, 'puff', 0));

        this.puff4 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5),
            new Sprite(this, 0, 0, 'puff', 0));

        this.puff5 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5),
            new Sprite(this, 0, 0, 'puff', 0));
        
        this.leader1 = new TeamLeader(true,
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5)
        )

        this.pentagon1 = new Pentagon(this.puff1, this.puff2, this.puff3, this.puff4, this.puff5, this.leader1, new Sprite(this, 200, 300, 'puff', 0));

        this.puff6 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5,),
            new Sprite(this, 0, 0, 'puff', 0));
        
        this.puff7 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5),
            new Sprite(this, 0, 0, 'puff', 0));
        
        this.puff8 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5),
            new Sprite(this,0, 0, 'puff', 0));

        this.puff9 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5),
            new Sprite(this, 0, 0, 'puff', 0));

        this.puff10 = new Beast(
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5),
            new Sprite(this, 0, 0, 'puff', 0));
        
        this.leader2 = new TeamLeader(false,
            new HasHealth(100, 5, elementAir),
            new AttackHandler(attackInfo, 5)
        )

        this.pentagon2 = new Pentagon(this.puff6, this.puff7, this.puff8, this.puff9, this.puff10, this.leader2, new Sprite(this, 1000, 300, 'puff', 0));
    }


}
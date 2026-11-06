
import Pentagon from '../combat/pentagon.js'
import TeamLeader from '../combat/teamleader.js';
import SpriteContainer from '../render/spritecontainer.js';
import RotateButton from '../render/filldisplay/rotatebutton.js';
import HasHealth from '../health/hashealth.js';
import AttackHandler from '../attack/attackhandler.js';
import AttackInfo from '../utility/attackinfo.js';
import Element from '../utility/element.js';
import BeastManager from '../managers/beastmanager.js';
import menuButton from '../render/menubutton.js';


 export default class combatScene extends Phaser.Scene{

    constructor()
    {
        super({key: 'combatScene'});

    }

    preload()
    {

	}

    create()
    {
        var bgImage = this.add.image(0,0,'fondoPasillo').setOrigin(0,0);
        bgImage.setScale(0.338);
        
        this.BeastManager = new BeastManager(this);
        let elementAir = new Element(Element.types.AIR);
        //let attackInfo = new AttackInfo(50, AttackInfo.attackTypes.NORMAL, elementAir);
        
        
        this.puff1 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);

        this.puff2 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);
        
        this.puff3 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);

        this.puff4 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);

        this.puff5 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);
        
        this.leader1 = new TeamLeader(true,
            new HasHealth(500, 5, elementAir),
            new AttackHandler(new AttackInfo(50, AttackInfo.attackTypes.NORMAL, elementAir), 5000)
        )

        this.pentagon1 = new Pentagon(this.puff1, this.puff2, this.puff3, this.puff4, this.puff5, this.leader1,
            new SpriteContainer(this, 175, 300, 'pent', 0), 
            new RotateButton(this, -100, 200, 'rotatebuttonBG', 0, 'rotatebuttonFILL', 0, 'rotatebuttonFG_CCW', 0, 0, Pentagon.DEFAULT_ROTATIONCOOLDOWN, false, {textLeftMargin: 40, textRightMargin: 40}),
            new RotateButton(this, 100, 200, 'rotatebuttonBG', 0, 'rotatebuttonFILL', 0, 'rotatebuttonFG_CW', 0, 0, Pentagon.DEFAULT_ROTATIONCOOLDOWN, true, {textLeftMargin: 40, textRightMargin: 40})
        );
            

        this.puff6 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);
        
        this.puff7 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);

        this.puff8 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);

        this.puff9 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);

        this.puff10 = this.BeastManager.spawnBeast(elementAir, BeastManager.tags.SmokePuff);
        
        this.leader2 = new TeamLeader(false,
            new HasHealth(500, 5, elementAir),
            new AttackHandler(new AttackInfo(50, AttackInfo.attackTypes.NORMAL, elementAir), 5000)
        )

        this.pentagon2 = new Pentagon(this.puff6, this.puff7, this.puff8, this.puff9, this.puff10, this.leader2,
            new SpriteContainer(this, 625, 300, 'pent', 0),
            new RotateButton(this, -100, 200, 'rotatebuttonBG', 0, 'rotatebuttonFILL', 0, 'rotatebuttonFG_CCW', 0, 0, Pentagon.DEFAULT_ROTATIONCOOLDOWN, false, {textLeftMargin: 40, textRightMargin: 40}),
            new RotateButton(this, 100, 200, 'rotatebuttonBG', 0, 'rotatebuttonFILL', 0, 'rotatebuttonFG_CW', 0, 0, Pentagon.DEFAULT_ROTATIONCOOLDOWN, true, {textLeftMargin: 40, textRightMargin: 40}),
        );

        this.pentagon1.setRivalPentagon(this.pentagon2);
        this.pentagon2.setRivalPentagon(this.pentagon1);

        var backButton = new menuButton("Back to menu", this, 100, 50, 'start', 0.25, 0x880099, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        
        backButton.setScene('mainmenu');
    }

    update(t, dt)
    {
        this.pentagon1.update(dt);
        this.pentagon2.update(dt);
    }

}
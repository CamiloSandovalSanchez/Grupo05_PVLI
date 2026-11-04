import DraggableBeastCard from "../selection/draggablesprites/draggablebeastcard.js";
import Pentagon from "../combat/pentagon.js";
import SpriteContainer from "../render/spritecontainer.js";
import RotateButton from "../render/filldisplay/rotatebutton.js";
import PentagonSelector from "../selection/dropzones/pentagonselector.js";
import Element from "../utility/element.js";
import TeamLeader from "../combat/teamleader.js";
import HasHealth from "../health/hashealth.js";
import AttackHandler from "../attack/attackhandler.js";
import AttackInfo from "../utility/attackinfo.js";
import BeastManager from "../managers/beastmanager.js";

export default class ProtoSelection extends Phaser.Scene{

    constructor()
    {
        super({key: 'mainmenu'});

    }

    preload()
    {
		this.load.image('puff', './assets/smokepuff.png');
        this.load.image('healthbarBG', './assets/health_bar/health_background.png');
        this.load.image('healthbarFILL', './assets/health_bar/health_fill.png');
		this.load.image('start', 'assets/start.png');
        this.load.image('buildupbarBG', './assets/buildup_bar/buildup_background.png');
        this.load.image('buildupbarFILL', './assets/buildup_bar/buildup_fill.png');

        this.load.image('rotatebuttonBG', './assets/rotate_button/rotatebutton_background.png');
        this.load.image('rotatebuttonFILL', './assets/rotate_button/rotatebutton_fill.png');
        this.load.image('rotatebuttonFG_CW', './assets/rotate_button/rotatebutton_clockwise_foreground.png');
        this.load.image('rotatebuttonFG_CCW', './assets/rotate_button/rotatebutton_counterclockwise_foreground.png');
	}

    create()
    {
        new BeastManager(this);

        this.dragqueen = new DraggableBeastCard(this, 100, 100, 'puff', 0, Element.types.AIR, "smokepuff");
        this.dragqueen.setDepth(1);

        this.leader1 = new TeamLeader(true,
                    new HasHealth(500, 5, Element.types.AIR),
                    new AttackHandler(new AttackInfo(50, AttackInfo.attackTypes.NORMAL, Element.types.AIR), 5000)
        );
        this.pentagon = new Pentagon(null, null, null, null, null, this.leader1,
                        new SpriteContainer(this, 175, 300, 'puff', 0), 
                        new RotateButton(this, -100, 200, 'rotatebuttonBG', 0, 'rotatebuttonFILL', 0, 'rotatebuttonFG_CCW', 0, 0, Pentagon.DEFAULT_ROTATIONCOOLDOWN, false, {textLeftMargin: 40, textRightMargin: 40}),
                        new RotateButton(this, 100, 200, 'rotatebuttonBG', 0, 'rotatebuttonFILL', 0, 'rotatebuttonFG_CW', 0, 0, Pentagon.DEFAULT_ROTATIONCOOLDOWN, true, {textLeftMargin: 40, textRightMargin: 40})
        );

        this.selector = new PentagonSelector(this, 500, 100, 'start', 0, this.pentagon, 2);
    }

    update(t, dt)
    {
        this.pentagon.update(dt);
    }

}
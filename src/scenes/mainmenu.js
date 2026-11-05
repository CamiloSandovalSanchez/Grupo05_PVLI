import menuButton from '../render/menubutton.js';

 export default class mainmenu extends Phaser.Scene{

    constructor()
    {
        super({key: 'mainmenu'});

    }

    preload()
    {
		this.load.image('puff', './assets/smokepuff.png');
        this.load.image('Logo', './assets/Logo_JanitorTheRotator.png');
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
        this.add.rectangle( 0, 0, 800, 600, 0x320045, 1).setOrigin(0,0);

        var logoImage= this.add.image(400,125,'Logo');
        logoImage.setScale(0.5);

        //const startButton = this.add.image(200,250,'start').setOrigin(0,0);
        //logoImage.setScale(0.75);


        var startButton = new menuButton("START", this, 400, 320, 'start', 0.75, 0xff00ff, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        
        startButton.setScene('combatScene')

        var creditButton = new menuButton("CREDITOS", this, 400, 480, 'start', 0.75, 0xaa00bb, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        
        creditButton.setScene('creditScene')
        
    }

    update(t, dt)
    {
        
    }

}
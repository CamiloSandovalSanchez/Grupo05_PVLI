import menuButton from '../render/menubutton.js';

 export default class mainmenu extends Phaser.Scene{

    constructor()
    {
        super({key: 'mainmenu'});

    }

    preload()
    {
		this.load.image('puff', './assets/smokepuff.png');
        this.load.image('logo', './assets/logo_janitortherotator.png');
        this.load.image('janitor', './assets/janitor.png');
        this.load.image('fondo', './assets/fondo_jantherot.png');
        this.load.image('fondoPasillo', './assets/pasillo_jantherot.png');
        this.load.image('pent', './assets/pentagon.png');
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
        var bgImage = this.add.image(0,0,'fondo').setOrigin(0,0);
        bgImage.setScale(0.288);
        this.add.rectangle( 0, 0, 800, 600, 0x320045, 0.5).setOrigin(0,0);

        var logoImage= this.add.image(400,125,'logo');
        logoImage.setScale(0.5);

        //const startButton = this.add.image(200,250,'start').setOrigin(0,0);
        //logoImage.setScale(0.75);


        this.startButton = new menuButton("START", this, 0.5, 0.6, 0.5, 0xff00ff, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        this.startButton.setScene('combatScene')

        this.creditButton = new menuButton("CREDITOS", this, 0.5, 0.8, 0.5, 0xaa00bb, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        this.creditButton.setScene('creditScene')
        
    }

    update(t, dt)
    {
        this.startButton.update(dt);
        this.creditButton.update(dt);
    }

}
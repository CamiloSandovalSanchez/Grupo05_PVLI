import menuButton from '../render/menubutton.js';

 export default class mainmenu extends Phaser.Scene{

    constructor()
    {
        super({key: 'mainmenu'});

    }

    preload()
    {
		this.load.image('puff', './assets/criaturas/smokepuff_jtr.png');
		this.load.image('aquablob', './assets/criaturas/aquablob_jtr.png');
		this.load.image('golem', './assets/criaturas/golem_jtr.png');
		this.load.image('lavaslime', './assets/criaturas/lavaslime_jtr.png');
		this.load.image('lightspirit', './assets/criaturas/lightningspirit_jtr.png');
		this.load.image('cerbero', './assets/criaturas/cerbero_jtr.png');
		this.load.image('hada', './assets/criaturas/hada_jtr.png');
		this.load.image('sirena', './assets/criaturas/sirena_jtr.png');
		this.load.image('torbellino', './assets/criaturas/torbellino_jtr.png');
		this.load.image('atlas', './assets/criaturas/atlas_jtr.png');
		this.load.image('barco', './assets/criaturas/barcopirata_jtr.png');
		this.load.image('apolo', './assets/criaturas/apolo_dios_de_sol_jtr.png');


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


        this.startButton = new menuButton("START", this, 0.5, 0.6, 0.4, 0xff00ff, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        this.startButton.setScene('combatScene');

        this.mapButton = new menuButton("MAP", this, 0.5, 0.75, 0.4, 0xcd00cd, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        this.mapButton.setScene('mapScene');

        this.creditButton = new menuButton("CREDITOS", this, 0.5, 0.9, 0.4, 0xaa00bb, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        this.creditButton.setScene('creditScene');
        
    }

    update(t, dt)
    {
        this.startButton.update(dt);
        this.mapButton.update(dt);
        this.creditButton.update(dt);
    }

}
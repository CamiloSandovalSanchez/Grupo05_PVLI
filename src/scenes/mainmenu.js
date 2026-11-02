

 export default class mainmenu extends Phaser.Scene{

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
        const startButton = this.add.image(200,250,'start').setOrigin(0,0);

        startButton.setInteractive({ useHandCursor: true});

        startButton.on('pointerdown', () =>{
            this.scene.start("combatScene");
        });
    }

    update(t, dt)
    {
        
    }

}
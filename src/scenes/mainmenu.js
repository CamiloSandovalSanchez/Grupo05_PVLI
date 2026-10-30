


 export default class MainMenu extends Phaser.Scene{

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
	}

    create()
    {
        const startButton = this.add.image(200,250,'start').setOrigin(0,0);

        startButton.setInteractive({ useHandCursor: true});

        startButton.on('pointerdown', () =>{
            this.scene.start("ProtoCombat");
        });
    }

    update(t, dt)
    {
        
    }

}
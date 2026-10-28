

 export default class MainMenu extends Phaser.Scene{

    constructor()
    {
        super({key: 'MainMenu'});

    }

    preload()
    {
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
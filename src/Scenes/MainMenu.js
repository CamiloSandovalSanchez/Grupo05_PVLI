export class MainMenu extends Phaser.scene{

    preload(){
		this.load.image('puff', 'assets/smokepuff.png');
	}

    create(){
        this.add.image(0, 0, 'puff').setOrigin(0, 0);
    }


}
/**
 * Clase que representa un enemigo
 * @extends Phaser.Scene
 */
 export default class MainMenu extends Phaser.Scene{

    constructor(){
        super({key: 'nomenu'});
    }

    preload(){
		this.load.image('puff', './assets/smokepuff.png');
	}

    create(){
        this.add.image(0, 0, 'puff').setOrigin(0, 0);
    }


}
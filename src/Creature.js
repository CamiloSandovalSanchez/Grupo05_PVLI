/**
 * Clase que representa un enemigo
 * @extends Phaser.GameObjects.Sprite
 */
export class Creature extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.scene.add.existing(this)
        this.setOrigin(x,y)
    }

    

}
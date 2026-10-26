export default class Sprite extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        
        this.setDisplaySize(200,200);

        scene.add.existing(this);
    }

    preUpdate(t, dt)
    {
        super.preUpdate(t,dt);
    }
}
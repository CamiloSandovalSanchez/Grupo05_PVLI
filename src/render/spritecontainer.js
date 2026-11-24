export default class SpriteContainer extends Phaser.GameObjects.Container
{
    // Variables de la clase:
    #sprite;
    #currentAnim;//Variable que almacena el tween de animacion actual que se va a ejecutar

    constructor(scene, x, y, scale, texture, frame)
    {
        super(scene, 0, 0);
        scene.add.existing(this);
        this.setScale(scale);
        const sceneW = this.scene.sys.game.config.width;
        const sceneH = this.scene.sys.game.config.height;
        this.x = x*sceneW;
        this.y = y*sceneH;

        // Crear el sprite
        this.#sprite = scene.add.sprite(0, 0
           
           
            , texture, frame);
        this.#sprite.setDisplaySize(200*scale,200*scale);

        // Añadirlo a nuestro contenedor
        this.add(this.#sprite); 
    }

    flipX(bool)
    {
        this.#sprite.flipX = bool;
    }

    update(dt){
        
    }


    deathAnimation()
    {
        this.#sprite.setTint(0xffff0000); // tinta el sprite de rojo
    }

    hurtAnimation(currentTime)
    {
        let calculated = currentTime-1000*Math.floor(currentTime/1000);
        if(calculated == 999) {

            //console.log("soy hurt");
            
            let posObj = this.#sprite.x + 15*(this.#sprite.flipX ? 1 : -1);
		    this.#currentAnim = this.scene.tweens.add({
			    targets: this.#sprite,
				x: posObj,
				y: -8,
                tint: 0xff0000,
				duration: 400,
				ease: 'Sine.easeInOut',
				yoyo: true,
				
		    });
        }
    }
    attackAnimation(currentTime)
    {
        let calculated = currentTime-1000*Math.floor(currentTime/1000);
        if(calculated == 999) {
            
            //console.log("soy attack");

            let posObj = this.#sprite.x + 25*(this.#sprite.flipX ? -1 : 1);
		    this.#currentAnim = this.scene.tweens.add({
			    targets: this.#sprite, 
				x: posObj,
				y: '-=10',
				duration: 400,
				ease: 'Sine.easeInOut',
				yoyo: true,  
		    });
            this.#currentAnim.play();
        }
    }
    idleAnimation(currentTime)
    {
        let calculated = currentTime-1000*Math.floor(currentTime/1000);
        if(calculated == 999) {

            //console.log("soy idle");

		    this.#currentAnim = this.scene.tweens.add({
		    	targets: this.#sprite,
		    	scale: '*=0.95',
		    	y: 2,
		    	duration: calculated*1,
		    	ease: 'linear',
		    	yoyo: true, 
                x: 0
		    });
            this.#currentAnim.play();
        }
    }
    // Actualiza el texto.
    shapeScale(x, y)
    {
        this.setDisplaySize(this.displayWidth*x, this.displayHeight*y);
    }
}

export default class MenuButton extends Phaser.GameObjects.Sprite
{  
    
    // Variables de la clase:
    #buttonText; // Texto del boton
    #targetScene; // Escena objetivo a la que cambia al presionar
    #roundRect; // Rectangulo de color custom

    // Constructora de la clase
    constructor(text, scene, x, y, texture, scale, color, _font = {fontFamily: 'Georgia, "Times New Roman", Times, serif'})
    {
        super(scene, x, y, texture, 0);
        scene.add.existing(this);
        this.setScale(scale);
        //this.setOrigin(0,0);

        //Texto del boton
        this.#buttonText = this.scene.add.text(x, y, text, _font);
        this.#buttonText.setFontSize(scale*100);
        this.#buttonText.setResolution(100);
        
        
        let txtHorzPadding = this.#buttonText.displayWidth/2;
        let txtVertPadding = this.#buttonText.displayHeight/2;
        this.#buttonText.x -= txtHorzPadding;
        this.#buttonText.y -= txtVertPadding;

        this.setVisible(false);//quitar la imagen de fondo

        //Retangulo de fondo del boton
        this.#roundRect = this.scene.add.rectangle( x, y, txtHorzPadding*2*1.2, txtVertPadding*2*1.4, color, 1);
        this.#roundRect.setRounded(16);

        
        const layer = this.scene.add.layer();

        layer.add([this.#roundRect, this.#buttonText]);

        this.#roundRect.setInteractive({ useHandCursor: true});

        this.#roundRect.on('pointerdown', () =>{
            if(this.#targetScene != null){
                this.scene.scene.start(this.#targetScene);
            }
            else{
                this.scene.scene.start(this.scene);//recarga la misma escena
            }
        });
    }

    // Establecer el porcentaje de sprite que se muestra
    setScene(name)
    {
        this.#targetScene = name;
    }

}
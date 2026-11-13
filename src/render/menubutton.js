
export default class MenuButton extends Phaser.GameObjects.Container
{  
    
    // Variables de la clase:
    #buttonText; // Texto del boton
    #targetScene; // Escena objetivo a la que cambia al presionar
    #roundRect; // Rectangulo de color custom
    #color; // Rectangulo de color custom

    // Constructora de la clase
    constructor(text, scene, x, y, scale, color, _font = {fontFamily: 'Georgia, "Times New Roman", Times, serif'})
    {
        super(scene, 0, 0);
        scene.add.existing(this);
        
        const sceneW = this.scene.sys.game.config.width;
        const sceneH = this.scene.sys.game.config.height;

        //Texto del boton
        this.#buttonText = this.scene.add.text(x*sceneW, y*sceneH, text, _font);
        this.#buttonText.setFontSize(scale*100);
        
        //Posicionamiento del texto y padding del rectangulo
        var txtHorzPadding = this.#buttonText.displayWidth/2;
        var txtVertPadding = this.#buttonText.displayHeight/2;
        this.#buttonText.x -= txtHorzPadding;
        this.#buttonText.y -= txtVertPadding;

        //Retangulo de fondo del boton
        this.#color = color;
        this.#roundRect = this.scene.add.rectangle(x*sceneW, y*sceneH, txtHorzPadding*2*1.2, txtVertPadding*2*1.4, color, 1);
        this.#roundRect.setRounded(32*scale);

        this.add(this.#roundRect);
        this.add(this.#buttonText);

        //Variables para efectos visuales
        this.changingColor = Phaser.Display.Color.ValueToColor(color);//Color base
        this.boxScaleCont = 0;//Contador para cambio de escala
        this.mouseOverBool = false;//Bool de comprobación para sincronizar los inputs con el update

        //Inputs de ratón
        this.#roundRect.setInteractive({ useHandCursor: true});

        this.#roundRect.on('pointerdown', () =>{
            if(this.#targetScene != null){
                this.scene.scene.start(this.#targetScene);
            }
        });

        this.#roundRect.on('pointerover', () =>{
            this.mouseOverBool = true;
        });
        this.#roundRect.on('pointerout', () =>{
            this.mouseOverBool = false;
        });
    }

    // Establecer el porcentaje de sprite que se muestra
    setScene(name)
    {
        this.#targetScene = name;
    }

    update(dt){

        //Cambio de escala y color
        this.#roundRect.setScale(1 + this.boxScaleCont*0.001);
        this.#roundRect.setFillStyle(this.changingColor.color,1);

        //Reseteo de variable de color
        if (!this.mouseOverBool)this.changingColor = Phaser.Display.Color.ValueToColor(this.#color);

        if(this.mouseOverBool){//Cuando el mouse está encima, separado del input porque es asíncrono
            if (this.boxScaleCont < 100){
                this.boxScaleCont += 4;//cambio de variable de escala
                this.changingColor.brighten(1);//cambio de variable de color
            }
        }
        else if(this.boxScaleCont > 0) {
            this.boxScaleCont -= 4;//cambio de variable de escala
        }
        
    }

}
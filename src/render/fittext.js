// Objeto de texto al que le añades un tamaño y se ajusta automáticamente a este.
// Solo busca entre MIN_FONTSIZE y MAX_FONTSIZE.
export default class FitText extends Phaser.GameObjects.Text
{
    static MIN_FONTSIZE = 8;
    static MAX_FONTSIZE = 100;

    // Variables de la clase
    #maxHeight;
    #maxWidth;

    #leftMargin; // margen izquierdo sobre el que se ajusta el texto
    #rightMargin; // igual por la derecha
    #topMargin; // "" por arriba
    #bottomMargin; // "" por abajo
    #originalX;
    #originalY;

    #resizeCallback; // guardar callback de resize para eliminarlo luego con .off
    #scene; // guarda referencia a la escena ya que en destroy no existe.

    _fitTextReady = false;

    // Constructora de la clase.
    // config.fontSize se ignorará.
    constructor(scene, x, y, text, config, width, height, {leftMargin = 0, rightMargin = 0, topMargin = 0,  bottomMargin = 0} = {})
    {
        super(scene, x, y, text, config);
        this._fitTextReady = true;

        this.#maxHeight = height;
        this.#maxWidth = width;
        this.#originalX = x;
        this.#originalY = y;

        this.setMargin({leftMargin, rightMargin, topMargin, bottomMargin});

        this.#resizeCallback = () => {this.fitText()};
        scene.scale.on('resize', this.#resizeCallback);

        this.#scene = scene;
    } 

    // Método que llamar a la que se destruye el objeto.
    destroy(fromScene)
    {
        this.#scene.scale.off('resize', this.#resizeCallback);
        super.destroy(fromScene);
    }

    // Por búsqueda binaria encuentra entre MAX_FONTSIZE y MIN_FONTSIZE el tamaño adecuado para que el texto encaje.
    fitText() 
    {
        let maxFontSize = FitText.MAX_FONTSIZE;
        let minFontSize = FitText.MIN_FONTSIZE;

        let removedX = this.#leftMargin + this.#rightMargin;
        let removedY = this.#topMargin + this.#bottomMargin;
        do
        {
            let midFontSize = Math.ceil((maxFontSize + minFontSize)/2);
            this.setFontSize(midFontSize);

            if (this.width > this.#maxWidth - removedX || this.height > this.#maxHeight - removedY) maxFontSize = midFontSize - 1;
            else minFontSize = midFontSize ;
        }
        while(maxFontSize > minFontSize);

        this.setFontSize(minFontSize);
    }
    
    setText(text)
    {
        super.setText(text);
        if (this._fitTextReady) this.fitText();
        
        return this;
    }

    setMargin({leftMargin = this.#leftMargin, rightMargin = this.#rightMargin, topMargin = this.#topMargin,  bottomMargin = this.#bottomMargin} = {})
    {
        this.x = this.#originalX + (leftMargin - rightMargin)/2;
        this.y = this.#originalY + (topMargin - bottomMargin)/2;

        this.#leftMargin = leftMargin;
        this.#rightMargin = rightMargin;
        this.#topMargin = topMargin;
        this.#bottomMargin = bottomMargin;

        this.fitText();
    }
}
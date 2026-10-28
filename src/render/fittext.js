// Objeto de texto al que le añades un tamaño y se ajusta automáticamente a este.
// Solo busca entre MIN_FONTSIZE y MAX_FONTSIZE.
export default class FitText extends Phaser.GameObjects.Text
{
    static MIN_FONTSIZE = 8;
    static MAX_FONTSIZE = 100;

    // Variables de la clase
    #maxHeight;
    #maxWidth;

    _fitTextReady = false;

    // Constructora de la clase.
    // config.fontSize se ignorará.
    constructor(scene, x, y, text, config, width, height)
    {
        super(scene, x, y, text, config);
        this._fitTextReady = true;

        this.#maxHeight = height;
        this.#maxWidth = width;

        this.fitText();

        scene.scale.on('resize', () => {this.fitText()})
    }

    // Por búsqueda binaria encuentra entre MAX_FONTSIZE y MIN_FONTSIZE el tamaño adecuado para que el texto encaje.
    fitText() 
    {
        let maxFontSize = FitText.MAX_FONTSIZE;
        let minFontSize = FitText.MIN_FONTSIZE;
        do
        {
            let midFontSize = Math.ceil((maxFontSize + minFontSize)/2);
            this.setFontSize(midFontSize);

            if (this.width > this.#maxWidth || this.height > this.#maxHeight) maxFontSize = midFontSize - 1;
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
}
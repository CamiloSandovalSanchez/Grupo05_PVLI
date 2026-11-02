import FillSprite from "../fillsprite.js";
import FillDisplay from "./filldisplay.js";

// Objeto que representa un botón de rotación de pentágono.
// Contiene un booleano que indica la dirección de rotado y un evento al que suscribirse para saber cuando esta siendo clickado.
export default class RotateButton extends FillDisplay
{
    // Variables de la clase.
    #eventTarget; // objeto EventTarget para llevar el evento del clickeo del botón.
    #clockwiseRotation; // booleano que indica si la rotación es a reloj o a contrareloj.
    #foregroundSprite; // sprite dibujado por encima del background y del fillsprite.

    constructor(scene, x, y, textureBackground, frameBackground, textureFillSprite, frameFillSprite, textureForeground, frameForeground, currentRotationTime, maxRotationCooldown, clockwiseRotation)
    {
        super(scene, x, y, textureBackground, frameBackground, textureFillSprite, frameFillSprite, FillSprite.types.DOWN, Math.max(0, (maxRotationCooldown - currentRotationTime/1000)).toFixed(2));
        this.updateButton(currentRotationTime, maxRotationCooldown);

        // Color del texto.
        this._text.setColor('#000000');

        // Se añade por encima del resto el sprite del foreground.
        this.#foregroundSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, textureForeground, frameForeground);
        this.add(this.#foregroundSprite);

        this.#clockwiseRotation = clockwiseRotation;

        // Creación del EventTarget para los clicks
        this.#eventTarget = new EventTarget();

        // Establece que al clicarse realice el evento de rotación
        this._backgroundSprite.on('pointerdown', () =>
        {
            this.#eventTarget.dispatchEvent(new CustomEvent("rotation", {detail: this.#clockwiseRotation}));
        });
    }

    updateButton(currentRotationTime, maxRotationCooldown)
    {
        this.updateFillSprite(Math.max(0, (1 - currentRotationTime/maxRotationCooldown)));
        this.updateFitText(Math.max(0, (maxRotationCooldown - currentRotationTime)).toFixed(2) + " s");

        // Activar o desactivar el botón según el tiempo.
        if (currentRotationTime >= maxRotationCooldown) this.enableButton();
        else this.disableButton();
    }

    enableButton()
    {
        this._backgroundSprite.setInteractive({ useHandCursor: true}); // useHandCursor hace que se cambie el sprite del mouse al de la mano para indicar que se puede tocar
    }

    disableButton()
    {
        this._backgroundSprite.disableInteractive();
    }

    // Evento al que suscribirse que se llama cuando el botón es clickado, enviando el booleano clockwiseRotation.
    onRotation(callback)
    {
        this.#eventTarget.addEventListener("rotation", (event) => {callback(event.detail)});
    }
}
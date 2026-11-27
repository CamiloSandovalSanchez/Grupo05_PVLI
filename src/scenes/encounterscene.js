import MenuButton from "../render/menubutton.js";
import genCombat from "./gencombat.js";

// Pantalla provisional que muestra el rival mientras se conecta el combate real.
// En esta prueba, pulsar Volver al mapa cuenta como terminar el combate.
export default class encounterScene extends Phaser.Scene {
    // Prepara la escena y le da su nombre para abrirla desde el mapa.
    constructor() {
        // La clave debe coincidir con la que envia mapscene.js.
        super({ key: 'encuentroProvisional' });
    }

    // Phaser ejecuta create al abrir esta escena. datos viene del mapa.
    create(datos) {
        // Contiene el tipo, nombre y tier del enemigo de esta casilla.
        const encuentro = datos.encuentro;

        // Solo admite combates y jefe. Las herramientas y mejoras usan los menus del mapa.
        // && une dos condiciones. !== comprueba que los valores son distintos.
        if (encuentro.tipo !== 'Combate' && encuentro.tipo !== 'Jefe') {
            // Abre de nuevo el mapa.
            this.scene.start('mapScene');
            // Termina create para no dibujar esta pantalla con un tipo de encuentro incorrecto.
            return;
        }

        // Dibuja un fondo morado del tamano de la ventana de juego.
        this.add.rectangle(0, 0, 800, 600, 0x320045)
            // Coloca la esquina superior izquierda del fondo en el punto 0, 0.
            .setOrigin(0, 0);

        // Empieza usando el tipo de encuentro como titulo, por ejemplo Jefe.
        let titulo = encuentro.tipo;

        // En las batallas normales prepara el titulo con su tier.
        if (encuentro.tipo === 'Combate') {
            // El signo + une el texto con el numero del tier.
            titulo = 'Combate de Tier ' + encuentro.tier;
        }

        // Muestra el titulo en las coordenadas 40, 40 y con letra de 28 pixeles.
        this.add.text(40, 40, titulo, { fontSize: '28px' });

        // Debajo muestra el nombre del rival asignado a esta casilla.
        this.add.text(40, 90, encuentro.nombre, { fontSize: '22px' });

        let funcButton = 
        this.buttonMapa = new MenuButton("Volver al mapa", this, 0.25, 0.4, 0.36, 0x880099, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        this.buttonMapa.setFuncionality(null,  
            function()
            {
                if ((this instanceof MenuButton)){
                    if (encuentro.tipo === 'Combate') {
                        // Usa la casilla que envio el mapa. Si falta, recupera la ultima posicion guardada.
                        const casillaId = datos.casillaId || this.registry.get('progresoMapa');
                        // Vuelve al mapa y le envia el aviso de combate terminado.
                        this.scene.scene.start('mapScene', {
                            // Este aviso permite que el mapa conceda XP y muestre la eleccion de bestias.
                            // { casillaId } es una forma corta de guardar la variable con su mismo nombre.
                            combateCompletado: { casillaId }
                        });
                    // En el caso del jefe vuelve al mapa sin enviar la recompensa normal de combate.
                    } else {
                        // Abre de nuevo el mapa.
                        this.scene.scene.start('mapScene');
                    }
                }
            }
        );
        
        this.buttonCombate = new MenuButton("COMBAT", this, 0.75, 0.4, 0.36, 0x880099, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        this.buttonCombate.setFuncionality(null, 
            function(datosButton = datos)
            {
                console.log(datosButton);
                if ((this instanceof MenuButton)){
                    this.scene.scene.start(
                        'genCombat', 
                        datosButton.encuentro.rivalInfo, 
                        /*function()
                        {
                            if ((this instanceof MenuButton)){
                                if (encuentro.tipo === 'Combate') {
                                    // Usa la casilla que envio el mapa. Si falta, recupera la ultima posicion guardada.
                                    const casillaId = datos.casillaId || this.registry.get('progresoMapa');
                                    // Vuelve al mapa y le envia el aviso de combate terminado.
                                    this.scene.scene.start('mapScene', {
                                        // Este aviso permite que el mapa conceda XP y muestre la eleccion de bestias.
                                        // { casillaId } es una forma corta de guardar la variable con su mismo nombre.
                                        combateCompletado: { casillaId }
                                    });
                                // En el caso del jefe vuelve al mapa sin enviar la recompensa normal de combate.
                                } else {
                                    // Abre de nuevo el mapa.
                                    this.scene.scene.start('mapScene');
                                }
                            }
                        }*/
                    );
                }
            }
        );

        /*
        // Crea el rectangulo morado del boton en 150, 240 con ancho 220 y alto 50.
        const botonVolver = this.add.rectangle(150, 240, 220, 50, 0x880099);
        // Permite pulsarlo y muestra una mano al poner el raton encima.
        botonVolver.setInteractive({ useHandCursor: true });

        // Dibuja el texto del boton en su centro. setOrigin(0.5) centra las letras en ese punto.
        this.add.text(150, 240, 'Volver al mapa', {
            fontSize: '24px'
        }).setOrigin(0.5);

        // Recuerda si ya hemos pulsado el boton para evitar dos regresos seguidos.
        let regresando = false;

        // Esta funcion se ejecuta al pulsar el rectangulo del boton.
        botonVolver.on('pointerdown', () => {
            // Si ya se esta cambiando de escena, ignora otro clic.
            if (regresando) return;
            // Marca el regreso como iniciado antes de cambiar de escena.
            regresando = true;

            // En las batallas normales prepara el titulo con su tier.
            if (encuentro.tipo === 'Combate') {
                // Usa la casilla que envio el mapa. Si falta, recupera la ultima posicion guardada.
                const casillaId = datos.casillaId || this.registry.get('progresoMapa');
                // Vuelve al mapa y le envia el aviso de combate terminado.
                this.scene.start('mapScene', {
                    // Este aviso permite que el mapa conceda XP y muestre la eleccion de bestias.
                    // { casillaId } es una forma corta de guardar la variable con su mismo nombre.
                    combateCompletado: { casillaId }
                });
            // En el caso del jefe vuelve al mapa sin enviar la recompensa normal de combate.
            } else {
                // Abre de nuevo el mapa.
                this.scene.start('mapScene');
            }
        });*/
    }
}


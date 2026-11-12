    import menuButton from '../render/menubutton.js';
    
    export default class mapScene extends Phaser.Scene
    {
        constructor()
        {
            super({key: 'mapScene'});
        }

        preload()
        {
            this.load.image('fondoMapa', './assets/MapPlaceHolder.png')
        }

        create()
        {
           const escalaJanitor = 0.085;
           const inicio = { x: 425, y: 525 };
           const izquierda = {x: 175, y: 375};
           const derecha = {x: 650, y: 375};

            this.add.image(400, 300, 'fondoMapa').setScale(0.5);
            this.add.image(inicio.x, inicio.y, 'janitor').setScale(escalaJanitor);
           const botonIzquierda = this.add.rectangle(izquierda.x, izquierda.y, 50, 30, 0xffff00);
           botonIzquierda.setInteractive();
           botonIzquierda.on('pointerdown', () => {
            console.log("Pulsado Izq")
            });

           const botonDerecha = this.add.rectangle(derecha.x, derecha.y, 50, 30, 0xffff00);
           botonDerecha.setInteractive();
           botonDerecha.on('pointerdown', () => {
            console.log("Pulsado Der")
            });
        }

        update(t, dt)
        {
            
        }
    }
    import menuButton from '../render/menubutton.js';
    
    export default class mapScene extends Phaser.Scene
    {
        constructor()
        {
            super({key: 'mapScene'});
        }

        preload()
        {
            this.load.image('fondoMapa', './assets/mapplaceholder.png')
        }

        create() 
        {
            const escalaJanitor = 0.085;

            const inicio = {
                id: 'inicio',
                x: 425,
                y: 525,
                salidas: ['izquierda', 'derecha']
            };

            const izquierda = {
                id: 'izquierda',
                x: 175,
                y: 375,
                salidas: ['SigIzq']
            };

            const derecha = {
                id: 'derecha',
                x: 650,
                y: 375,
                salidas: ['SigDer']
            };

            const sigIzquierda = {
                id: 'SigIzq',
                x: 175,
                y: 115,
                salidas: []
            };

            const sigDerecha = {
                id: 'SigDer',
                x: 650,
                y: 115,
                salidas: []
            };

            this.casillaActual = inicio;
            this.destino = null;

            this.add.image(400, 300, 'fondoMapa').setScale(0.5);
            this.janitor = this.physics.add.image(inicio.x, inicio.y, 'janitor')
                .setScale(escalaJanitor)
                .setOrigin(0.5, 0.75);

            const primeraFila = [izquierda, derecha, sigIzquierda, sigDerecha];

            for (const casilla of primeraFila) {
                const boton = this.add.rectangle(casilla.x, casilla.y, 50, 30, 0xffff00);
                boton.setInteractive();

                boton.on('pointerdown', () => {
                    if (this.destino !== null) return;
                    if (!this.casillaActual.salidas.includes(casilla.id)) return;

                    this.destino = casilla;
                    this.physics.moveTo(this.janitor, casilla.x, casilla.y, 240);
                });
            }

            
            this.backButton = new menuButton("Back to menu", this, 0.125, 0.05, 0.25, 0x880099, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
                    
            this.backButton.setScene('mainmenu');
        }

        update(t, dt) {
            if (this.destino === null) return;

            const dx = this.destino.x - this.janitor.x;
            const dy = this.destino.y - this.janitor.y;

            if (Math.hypot(dx, dy) <= 3) {
                this.janitor.body.reset(this.destino.x, this.destino.y);
                this.casillaActual = this.destino;
                this.destino = null;
            }

            this.backButton.update(dt);
        }
    }
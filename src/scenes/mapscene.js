    import menuButton from '../render/menubutton.js';
    
    export default class mapScene extends Phaser.Scene
    {
        constructor()
        {
            super({key: 'mapScene'});
        }

        preload()
        {
            this.load.image('fondoMapa', './assets/mapa_place_holder.png')
        }

create() {
    const camara = this.cameras.main;
    const fondo = this.add.image(0, 0, 'fondoMapa').setOrigin(0, 0);

    fondo.setScale(camara.width / fondo.width);

    const anchoMapa = fondo.displayWidth;
    const altoMapa = fondo.displayHeight;

    camara.setBounds(0, 0, anchoMapa, altoMapa);
    camara.scrollY = Math.max(0, altoMapa - camara.height);

    this.input.on('wheel', (puntero) => {
        camara.scrollY += puntero.deltaY;
    });

    // Cada línea es una casilla: [id, x en el dibujo, y en el dibujo, salidas].
    const datosCasillas = [
        // Inicio y las dos primeras ramas
        ['inicio', 1145, 3740, ['bat1', 'bat2']],
        ['bat1',    780, 3400, ['herr1', 'mej1']],
        ['bat2',   1590, 3450, ['bat4', 'herr3']],
        ['herr1',   520, 3135, ['bat3']],
        ['mej1',    915, 2945, ['2bat1']],
        ['bat3',    345, 2800, ['2bat1']],
        ['bat4',   1375, 2990, ['2bat2']],
        ['herr3',  1980, 2760, ['2bat2']],

        // Las ramas se unen en el yunque del centro
        ['2bat1',   650, 2380, ['herr2', 'mej2']],
        ['2bat2',  1710, 2340, ['mej2', 'bat6', '2bat3']],
        ['herr2',   385, 2040, ['bat5']],
        ['mej2',   1240, 1960, ['bat5', 'bat6']],
        ['2bat3',  2070, 1960, ['herr4']],
        ['bat5',    770, 1780, ['2bat4', 'bat7']],
        ['bat6',   1650, 1835, ['2bat5', '3bat2']],
        ['herr4',  2260, 1540, ['3bat2']],

        // Tramo intermedio
        ['2bat4',   445, 1470, ['mej4', '3bat1']],
        ['bat7',    990, 1520, ['mej3']],
        ['2bat5',  1440, 1520, ['mej3', '3bat2']],
        ['mej4',    255, 1140, ['herr5']],
        ['mej3',   1245, 1265, ['3bat1', 'bat8']],
        ['3bat2', 1985, 1160, ['2bat6', 'herr8']],
        ['3bat1',  835, 1025, ['herr6']],

        // Últimas conexiones y jefe
        ['herr5',   170,  775, ['herr6']],
        ['bat8',   1260,  805, ['mej5']],
        ['2bat6',  1740,  750, ['mej5', 'herr7']],
        ['herr8',  2240,  800, ['3bat3']],
        ['herr6',   655,  490, ['jefe']],
        ['mej5',   1245,  535, ['jefe']],
        ['3bat3', 2445,  490, ['mej6']],
        ['mej6',   2105,  400, ['herr7']],
        ['herr7',  1780,  305, ['jefe']],
        ['jefe',   1235,  175, []]
    ];

    const casillas = datosCasillas.map(([id, x, y, salidas]) => ({
        id,
        x: x / 2613 * anchoMapa,
        y: y / 3840 * altoMapa,
        salidas
    }));

    const primeraBatalla = casillas.find((casilla) => casilla.id === 'bat1');

    let encuentrosDelMapa = this.registry.get('encuentrosMapa1');

    if (!encuentrosDelMapa) {
        const rivalesPorTier = {
            1: Array.from({ length: 12 }, (_, i) => 'Rival T1-' + (i + 1)),
            2: Array.from({ length: 8 }, (_, i) => 'Rival T2-' + (i + 1)),
            3: Array.from({ length: 5 }, (_, i) => 'Rival T3-' + (i + 1))
        };

    encuentrosDelMapa = {};

    for (const casilla of casillas) {
        const id = casilla.id;
        if (id === 'inicio') continue;

        const encuentro = { escena: 'encuentroProvisional' };

        if (id.startsWith('herr')) {
            encuentro.tipo = 'Herramienta';
        } else if (id.startsWith('mej')) {
            encuentro.tipo = 'Vida';
            encuentro.nombre = 'Mejorar';
        } else if (id === 'jefe') {
            encuentro.tipo = 'Jefe';
            encuentro.nombre = 'Jefe final';
        } else {
            encuentro.tipo = 'Combate';
            encuentro.tier = 1;

            if (id.startsWith('2bat')) encuentro.tier = 2;
            if (id.startsWith('3bat')) encuentro.tier = 3;

            const disponibles = rivalesPorTier[encuentro.tier];
            const indice = Math.floor(Math.random() * disponibles.length);
            encuentro.nombre = disponibles.splice(indice, 1)[0];
        }

        encuentrosDelMapa[id] = encuentro;
    }

    this.registry.set('encuentrosMapa1', encuentrosDelMapa);
}

for (const casilla of casillas) {
    casilla.encuentro = encuentrosDelMapa[casilla.id];
}

    const idGuardado = this.registry.get('progresoMapa');
    const casillaGuardada = casillas.find((casilla) => casilla.id === idGuardado);

    if (casillaGuardada) this.casillaActual = casillaGuardada;
    else this.casillaActual = casillas[0];

    this.destino = null;

    this.janitor = this.physics.add.image(this.casillaActual.x, this.casillaActual.y, 'janitor').setScale(0.085).setOrigin(0.5, 0.75).setDepth(1);

    camara.centerOn(camara.width / 2, this.casillaActual.y);

    for (const casilla of casillas) {
        if (casilla.id === 'inicio') continue;

        const boton = this.add.rectangle(
            casilla.x, casilla.y, 75, 50, 0xffff00, 0
        );
        boton.setInteractive();

        boton.on('pointerdown', () => {
            if (this.destino !== null) return;
            if (!this.casillaActual.salidas.includes(casilla.id)) return;

            this.destino = casilla;
            this.physics.moveTo(this.janitor, casilla.x, casilla.y, 240);
        });
    }
}

    update(t, dt) {
        if (this.destino === null) return;

        const dx = this.destino.x - this.janitor.x;
        const dy = this.destino.y - this.janitor.y;

        if (Math.hypot(dx, dy) <= 3) {
            this.janitor.body.reset(this.destino.x, this.destino.y);
            this.casillaActual = this.destino;
            this.destino = null;

            this.registry.set('progresoMapa', this.casillaActual.id);

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
            const encuentro = this.casillaActual.encuentro;
            if (encuentro) {
                this.scene.start(encuentro.escena, { encuentro });
            }
        }
    }
    }
export default class encounterScene extends Phaser.Scene {
    constructor() {
        super({ key: 'encuentroProvisional' });
    }

    create(datos) {
        const encuentro = datos.encuentro;

        this.add.rectangle(0, 0, 800, 600, 0x320045)
            .setOrigin(0, 0);

        let titulo = encuentro.tipo;

        if (encuentro.tipo === 'Combate') {
            titulo = 'Combate de Tier ' + encuentro.tier;
        }

        this.add.text(40, 40, titulo, { fontSize: '28px' });

        if (encuentro.tipo === 'Herramienta') {
            const herramientasDisponibles = [
                'Llave inglesa',
                'Martillo',
                'Destornillador',
                'Alicates',
                'Sierra'
            ];

            for (let i = 0; i < 3; i++) {
                const indice = Math.floor(Math.random() * herramientasDisponibles.length);
                const herramienta = herramientasDisponibles.splice(indice, 1)[0];

                this.add.text(40, 90 + i * 35, herramienta, {
                    fontSize: '22px'
                });
            }
        } else {
            this.add.text(40, 90, encuentro.nombre, { fontSize: '22px' });
        }

        const botonVolver = this.add.rectangle(150, 240, 220, 50, 0x880099);
        botonVolver.setInteractive({ useHandCursor: true });

        this.add.text(150, 240, 'Volver al mapa', {
            fontSize: '24px'
        }).setOrigin(0.5);

        botonVolver.on('pointerdown', () => {
            this.scene.start('mapScene');
        });
    }
}

 // Esta clase contiene la pantalla del mapa y sus menus de recompensas
 export default class mapScene extends Phaser.Scene{
        
    // Se ejecuta al crear la escena por primera vez
    constructor()
    {
        // Permite abrir el mapa con this.scene.start
        super({key: 'mapScene'});
    }

    // Phaser llama a preload antes de create para cargar los archivos
    preload()
    {
        // Carga el dibujo y lo identifica con el nombre fondoMapa
        this.load.image('fondoMapa', './assets/mapa.png')
    }

    // Prepara el mapa cada vez que entramos en esta escena
    // Datos contiene lo que mande la escena anterior. Si no manda nada, usamos un objeto vacio
    create(datos = {}) {

        // Aqui buscamos el nivel, la XP, las almas y el premio pendiente
        let aura = this.registry.get('aura');

        // Si todavia no hay datos de aura, creamos los valores de una partida nueva
        if (!aura) {
        aura = {
            // Empieza en nivel 1
            nivel: 1,
            // XP acumulada hacia el siguiente nivel
            experiencia: 0,
            // Cantidad de almas
            almas: 0,
            // Sera true cuando haya ganado el premio especial
            seleccionTier3Pendiente: false
        };

            // Guarda el estado del aura
            this.registry.set('aura', aura);
        }

        // El nivel maximo es 5
        if (aura.nivel >= 5) {
            aura.nivel = 5;
            aura.experiencia = 0;
            
            this.registry.set('aura', aura);
        }

        // Null indica que no hay ningun menu de recompensa abierto
        this.menuRecompensa = null;

        // Cámara principal
        const camara = this.cameras.main;
        // Coloca la esquina superior izquierda del dibujo
        const fondo = this.add.image(0, 0, 'fondoMapa').setOrigin(0, 0);

        // Ajusta el dibujo al ancho de la pantalla
        fondo.setScale(camara.width / fondo.width);

        // displayWidth y displayHeight son las medidas del dibujo después de escalarlo
        const anchoMapa = fondo.displayWidth;
        const altoMapa = fondo.displayHeight;

        // Limita la camara para que no se salga de los bordes del mapa
        camara.setBounds(0, 0, anchoMapa, altoMapa);

        // Empieza mostrando la parte inferior del mapa.
        // Math.max evita una posicion negativa si el mapa es más pequeño que la pantalla
        camara.scrollY = Math.max(0, altoMapa - camara.height);

        this.input.on('wheel', (puntero) => {
            // Si hay un menú abierto, termina esta funcion para bloquear la accion
            if (this.menuRecompensa !== null) return;

            camara.scrollY += puntero.deltaY;
        });

        // Cada fila guarda el ID, el centro del icono, sus salidas y su zona de clic
        // bat es Tier 1, 2bat es Tier 2 y 3bat es Tier 3
        // herr abre herramientas y mej abre la estacion de mejora
        // Hacer esta parte era un caos, le pedi a la IA que me ordenara bien los tramos, si hay un fallo es por eso
        const datosCasillas = [
            // Entrada y primeros combates.
            ['inicio', 362, 2098, ['bat1', 'bat2'], 146, 146],
            ['bat1', 178, 1934, ['herr1', 'mej1'], 54, 58],
            ['bat2', 542, 1934, ['bat4', 'herr3'], 54, 58],
            ['herr1', 119, 1781, ['bat3'], 74, 74],
            ['mej1', 254, 1788, ['2bat1', 'bat4'], 88, 48],
            ['bat3', 80, 1641, ['2bat1'], 54, 58],
            ['bat4', 425, 1722, ['2bat2'], 54, 58],
            ['herr3', 588, 1760, ['2bat2'], 74, 74],

            ['2bat1', 222, 1539, ['herr2', 'mej2'], 132, 124],
            ['2bat2', 492, 1539, ['mej2', 'bat6', '2bat3'], 132, 124],
            ['herr2', 121, 1374, ['2bat4', 'bat5'], 74, 74],
            ['mej2', 354, 1374, ['bat5', 'bat7'], 88, 48],
            ['2bat3', 664, 1411, ['herr4'], 64, 64],
            ['bat5', 234, 1240, ['2bat4', '3bat1'], 54, 58],
            ['bat6', 534, 1373, ['bat7', 'herr4'], 54, 58],
            ['bat7', 456, 1204, ['3bat1', '3bat2'], 54, 58],
            ['herr4', 665, 1210, ['3bat2'], 74, 74],

            ['2bat4', 102, 1096, ['mej4', '3bat1'], 64, 64],
            ['3bat1', 270, 923, ['2bat5', 'herr5'], 146, 142],
            ['3bat2', 565, 1020, ['herr5', 'mej3'], 146, 142],
            ['mej4', 59, 927, ['2bat5'], 88, 48],
            ['herr5', 430, 735, ['3bat3', '3bat4'], 74, 74],
            ['mej3', 600, 814, ['3bat4'], 88, 48],
            ['2bat5', 154, 769, ['2bat6', '3bat3'], 64, 64],

            ['2bat6', 54, 539, ['herr6'], 64, 64],
            ['3bat3', 270, 562, ['herr6', 'mej5'], 146, 142],
            ['3bat4', 550, 540, ['mej5', 'herr7'], 146, 142],
            ['herr6', 177, 311, ['jefe'], 74, 74],
            ['mej5', 354, 383, ['jefe'], 88, 48],
            ['herr7', 528, 314, ['jefe'], 74, 74],
            ['jefe', 362, 169, [], 176, 176]
        ];

        // Convierte cada fila en un objeto y adapta sus coordenadas al tamano del fondo
        const casillas = datosCasillas.map(([id, x, y, salidas, ancho, alto]) => ({
            id,
            x: x / fondo.width * anchoMapa,
            y: y / fondo.height * altoMapa,
            ancho: ancho / fondo.width * anchoMapa,
            alto: alto / fondo.height * altoMapa,
            salidas
        }));
    
        // Recupera los encuentros ya sorteados
        let encuentrosDelMapa = this.registry.get('encuentrosMapa1');
    
        // Solo hacemos el sorteo cuando comienza un mapa nuevo
        // Si falta una casilla, el reparto guardado pertenece al mapa anterior
        if (!encuentrosDelMapa || casillas.some(casilla =>
            casilla.id !== 'inicio' && !encuentrosDelMapa[casilla.id])) {

            // Cada tier tiene su propia lista de rivales de prueba
            // QUEDA HACER LOS COMBATES DE VERDAD
            const rivalesPorTier = {
                1: Array.from({ length: 12 }, (_, i) => 'Rival T1-' + (i + 1)),
                2: Array.from({ length: 8 }, (_, i) => 'Rival T2-' + (i + 1)),
                3: Array.from({ length: 5 }, (_, i) => 'Rival T3-' + (i + 1))
            };
        
            // Este objeto guardara el encuentro correspondiente a cada ID de casilla
            encuentrosDelMapa = {};
            
            // Recorre las casillas una por una para preparar sus datos o botones
            for (const casilla of casillas) {
                const id = casilla.id;
                // continue salta al siguiente elemento porque Inicio no tiene encuentro
                if (id === 'inicio') continue;
            
                // Prepara los datos del encuentro. Los combates abriran esta escena provisional
                const encuentro = { escena: 'encuentroProvisional' };
            
                // startsWith comprueba si el ID empieza por el texto indicado
                if (id.startsWith('herr')) {
                    encuentro.tipo = 'Herramienta';
                // Los IDs que empiezan por mej abren la estacion de mejora
                } else if (id.startsWith('mej')) {
                    encuentro.tipo = 'Mejora';
                    encuentro.nombre = 'Mejora';
                // El jefe final tiene su encuentro fijo
                } else if (id === 'jefe') {
                    encuentro.tipo = 'Jefe';
                    encuentro.nombre = 'Jefe final';
                } else {
                    // El resto de puntos de encuentro son batallas
                    encuentro.tipo = 'Combate';
                    encuentro.tier = 1;
                
                    // El prefijo del ID decide el tier de la batalla
                    if (id.startsWith('2bat')) encuentro.tier = 2;
                    if (id.startsWith('3bat')) encuentro.tier = 3;
                
                    // Obtiene la lista de rivales del tier de esta casilla
                    // QUEDA HACER LOS COMBATES DE VERDAD
                   const disponibles = rivalesPorTier[encuentro.tier];

                    // Sortea una posicion de la lista (Mejorable)
                    const indice = Math.floor(Math.random() * disponibles.length);

                    // Guarda el enemigo de esa posicion
                    encuentro.nombre = disponibles[indice];

                    // Conserva todos los enemigos excepto el que hemos elegido
                    rivalesPorTier[encuentro.tier] = disponibles.filter(
                        (enemigo) => enemigo !== encuentro.nombre
);
                }
            
                // Guarda este encuentro usando el ID de la casilla como nombre
                encuentrosDelMapa[id] = encuentro;
            }
        
            // Guarda todo el reparto para reutilizarlo al volver al mapa
            this.registry.set('encuentrosMapa1', encuentrosDelMapa);
        }
    
        // Recorre las casillas una por una para preparar sus datos o botones
        for (const casilla of casillas) {
            // Une cada casilla con los datos de su encuentro guardado.
            casilla.encuentro = encuentrosDelMapa[casilla.id];

            // Actualiza las estaciones guardadas con el antiguo tipo Vida.
            if (casilla.id.startsWith('mej')) {
                casilla.encuentro.tipo = 'Mejora';
                casilla.encuentro.nombre = 'Mejora';
            }
        }
    
        // Lee el ID de la ultima casilla alcanzada
        const idGuardado = this.registry.get('progresoMapa');
        const casillaGuardada = casillas.find((casilla) => casilla.id === idGuardado);
    
        // Si hay una posicion guardada, coloca al jugador en esa casilla
        if (casillaGuardada) this.casillaActual = casillaGuardada;
        // En una partida nueva, la primera casilla de la lista es Inicio
        else this.casillaActual = casillas[0];
    
        // El jugador empieza quieto y todavia no ha seleccionado un camino
        this.destino = null;
    
        // Crea al janitor con un cuerpo fisico en su casilla actual
        this.janitor = this.physics.add.image(this.casillaActual.x, this.casillaActual.y, 'janitor').setScale(0.085).setOrigin(0.5, 0.75).setDepth(1);
    
        // Mueve la vista a la altura del jugador para verlo al volver de un encuentro
        camara.centerOn(camara.width / 2, this.casillaActual.y);
    
        // Recorre las casillas una por una para preparar sus datos o botones
        for (const casilla of casillas) {
            // Inicio es solo el punto de partida y no recibe un boton
            if (casilla.id === 'inicio') continue;
        
            // La zona de clic tiene el tamano de este icono en el mapa
            const boton = this.add.rectangle(
                casilla.x, casilla.y, casilla.ancho, casilla.alto, 0xffff00, 0
            );
            // Permite recibir clics en el rectangulo
            boton.setInteractive();
        
            // Esta funcion se ejecuta al pulsar el boton. Cada boton recuerda su casilla
            boton.on('pointerdown', () => {
                // Si hay un menú abierto, termina esta funcion para bloquear la accion
                if (this.menuRecompensa !== null) return;
                // Mientras el janitor esta viajando, ignora otros caminos
                if (this.destino !== null) return;
                // includes comprueba si la casilla pulsada esta en las salidas permitidas
                // El signo ! significa que, si no esta, terminamos el clic
                if (!this.casillaActual.salidas.includes(casilla.id)) return;
            
                // Recuerda el destino para que update pueda comprobar la llegada
                this.destino = casilla;
                // Da velocidad hacia la casilla a 240 pixeles por segundo
                this.physics.moveTo(this.janitor, casilla.x, casilla.y, 240);
            });
        }
        
        // Texto del botón para abandonar la partida
        const textoVolver = this.add.text(100, 60, 'Back to menu', {
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontSize: '25px'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(21);

        this.backbutton = this.add.rectangle(
            100, 60, textoVolver.displayWidth * 1.2,
            textoVolver.displayHeight * 1.4, 0x880099
        ).setRounded(8).setScrollFactor(0).setDepth(20);

        // Activa los clics
        this.backbutton.setInteractive();

        // Al pulsar, abre el menu principal, donde se reinician los datos de la partida
        this.backbutton.on('pointerdown', () => {
            // Si hay un menu abierto, termina esta funcion para bloquear la accion
            if (this.menuRecompensa !== null) return;

            this.scene.start('mainmenu');
        });

        // Situa el panel de aura a 20 pixeles de los bordes derecho e inferior
        const panelX = this.scale.width - 240;
        const panelY = this.scale.height - 85;

        this.add.rectangle(panelX, panelY, 220, 65, 0x320045, 0.95).setOrigin(0, 0).setScrollFactor(0).setDepth(10);

        this.textoAura = this.add.text(panelX + 12, panelY + 10, '', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff'
        })
            .setScrollFactor(0)
            .setDepth(11);

        // Dibuja el fondo gris de la barra de XP
        this.add.rectangle(panelX + 12, panelY + 40, 196, 12, 0x51445c).setOrigin(0, 0).setScrollFactor(0).setDepth(11);

        // Dibuja el relleno morado. Su anchura cambiara según la XP que llevas
        this.barraExperiencia = this.add.rectangle(
            panelX + 12, panelY + 40, 196, 12, 0xaa44ff
        ).setOrigin(0, 0).setScrollFactor(0).setDepth(12);

        // Actualiza el texto y la barra con los valores guardados.
        this.actualizarInterfazAura();
        // Si acabamos de volver de una batalla, concede su XP y prepara la eleccion de bestia.
        this.procesarRegresoCombate(datos);
    }

    // Actualiza los datos que ve el jugador en el panel del mapa
    actualizarInterfazAura() {
        // Lee el objeto compartido con el progreso actual del jugador
        const aura = this.registry.get('aura');
        // La siguiente subida cuesta 50, 75, 100 o 125 XP segun el nivel actual
        const experienciaNecesaria = 25 + aura.nivel * 25;

        // Muestra el nivel y la cantidad de almas del jugador
        this.textoAura.setText(
            'Nivel ' + aura.nivel + '    Almas: ' + aura.almas
        );

        if (aura.nivel >= 5) {
            // Una escala de 1 muestra la barra completa porque ya estas en el nivel maximo
            this.barraExperiencia.scaleX = 1;
        } else {
            // La division calcula la parte de barra llena
            this.barraExperiencia.scaleX = aura.experiencia / experienciaNecesaria;
        }
    }

    // Devuelve los porcentajes de cada tier que corresponden al nivel actual
    obtenerProbabilidadesAura() {

        const aura = this.registry.get('aura');
        // Probabilidades de aparición de bestias o herramientas dependiendo del nivel (Podemos cambiarlo)
        const probabilidadesPorNivel = {
            1: { tier1: 80, tier2: 19, tier3: 1 },
            2: { tier1: 60, tier2: 35, tier3: 5 },
            3: { tier1: 30, tier2: 60, tier3: 10 },
            4: { tier1: 10, tier2: 60, tier3: 30 },
            5: { tier1: 5, tier2: 30, tier3: 65 }
        };

        return probabilidadesPorNivel[aura.nivel];
    }

    // Hace el sorteo del tier que tendra una opción de recompensa
    // Realmente no usamos los datos de "tier3", pero lo pongo para que sepamos sobre 100 su probabilidad
    sortearTierRecompensa() {

        const probabilidades = this.obtenerProbabilidadesAura();
        // Genera un numero entre 0 y casi 100 para compararlo con los porcentajes
        const numero = Math.random() * 100;

        // Si cae en el primer tramo del sorteo, toca Tier 1
        if (numero < probabilidades.tier1) {
            return 1;
        }

        // Si supera el primer tramo pero cae antes de esta suma, toca Tier 2
        if (numero < probabilidades.tier1 + probabilidades.tier2) {
            return 2;
        }

        // El tramo restante del sorteo corresponde al Tier 3
        return 3;
    }

    // Prepara tres herramientas distintas y abre su menu dentro del mapa
    abrirMenuHerramientas() {

        if (this.menuRecompensa !== null) return;

        // Catalogo provisional para probar las recompensas por tier
        // FALTA HACER LAS HERRAMIENTAS REALES
        let herramientasDisponibles = [
            { id: 'martillo1', nombre: 'Martillo básico', tier: 1 },
            { id: 'alicates1', nombre: 'Alicates básicos', tier: 1 },
            { id: 'martillo2', nombre: 'Martillo reforzado', tier: 2 },
            { id: 'sierra2', nombre: 'Sierra reforzada', tier: 2 },
            { id: 'martillo3', nombre: 'Martillo mágico', tier: 3 },
            { id: 'sierra3', nombre: 'Sierra mágica', tier: 3 }
        ];

        const opciones = [];

        // Repite el sorteo tres veces, una por cada opcion del menu
        for (let i = 0; i < 3; i++) {
            // Sortea el tier con las probabilidades del nivel actual
            const tierElegido = this.sortearTierRecompensa();
            let candidatas = herramientasDisponibles.filter(
                herramienta => herramienta.tier === tierElegido
            );

            // Si ese tier se ha agotado, elige entre las herramientas restantes
            if (candidatas.length === 0) {
                candidatas = herramientasDisponibles;
            }

            // Elige una posicion aleatoria dentro de las candidatas
            const indice = Math.floor(Math.random() * candidatas.length);
            const herramienta = candidatas[indice];

            // Conserva todas las herramientas excepto la elegida
            herramientasDisponibles = herramientasDisponibles.filter(
                disponible => disponible.id !== herramienta.id
            );

            opciones.push(herramienta);
        }

        // Usa el menú común para mostrar las tres herramientas
        this.abrirMenuRecompensa('Elige una herramienta', opciones);
    }

    // #hastalapolladelastildes
    // Menú común para herramientas, mejoras y bestias
    // alElegir es una funcion opcional que se ejecuta después de elegir
    abrirMenuRecompensa(titulo, opciones, alElegir) {
        // Si hay un menú abierto, termina esta función para bloquear la acción
        if (this.menuRecompensa !== null) return;

        const ancho = this.scale.width;
        const alto = this.scale.height;

        // Agrupa los elementos para destruirlos juntos al cerrar
        this.menuRecompensa = this.add.group();

        const sombra = this.add.rectangle(
            0, 0, ancho, alto, 0x000000, 0.7
        ).setOrigin(0, 0).setScrollFactor(0).setDepth(100);
        sombra.setInteractive();

        const panel = this.add.rectangle(
            ancho / 2, alto / 2, 720, 320, 0x320045
        ).setScrollFactor(0).setDepth(101);

        const textoTitulo = this.add.text(
            ancho / 2, alto / 2 - 100, titulo, {
                fontFamily: 'Arial',
                fontSize: '26px',
                color: '#ffffff'
            }
        ).setOrigin(0.5).setScrollFactor(0).setDepth(102);

        // Guarda estos elementos en el grupo para poder borrarlos juntos al cerrar
        this.menuRecompensa.addMultiple([sombra, panel, textoTitulo]);

        // Crea un boton por cada opcion
        for (let i = 0; i < opciones.length; i++) {
            const opcion = opciones[i];
            // Reparte los botones a 220 pixeles de distancia y centra el conjunto en pantalla.
            const x = ancho / 2 + (i - (opciones.length - 1) / 2) * 220;
            const y = alto / 2 + 20;

            // Rectángulo pulsable de esta opción
            const boton = this.add.rectangle(x, y, 200, 100, 0x880099).setScrollFactor(0).setDepth(102);
            // Permite pulsarlo y cambia el cursor a una mano.
            boton.setInteractive({ useHandCursor: true });

            // Empieza mostrando el nombre de la opcion.
            let etiqueta = opcion.nombre;
            // Anade el tier solo si existe. El boton de mejora no tiene tier
            if (opcion.tier !== undefined) {
                // El texto \n hace un salto de linea antes de escribir el tier
                etiqueta += '\nTier ' + opcion.tier;
            }

            // Dibuja el nombre encima del rectangulo
            const texto = this.add.text(x, y, etiqueta, {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#ffffff',
                wordWrap: { width: 180 },
                align: 'center'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(103);

            // Incluye el boton y su texto en el grupo del menu
            this.menuRecompensa.addMultiple([boton, texto]);

            // Esta funcion se ejecuta al pulsar el boton. Cada boton recuerda su casilla u opcion
            boton.on('pointerdown', () => {
                // Si el menu ya se ha cerrado, ignora el clic
                if (this.menuRecompensa === null) return;

                // Borra el grupo y todos sus elementos visuales
                this.menuRecompensa.destroy(true);
                // Libera el bloqueo del mapa porque el menu ya esta cerrado
                this.menuRecompensa = null;

                // Si quien abrio el menu paso una funcion, ejecutala con la opcion elegida
                if (alElegir) {
                    alElegir(opcion);
                }
            });
        }
    }

    // Concede XP y almas una sola vez por batalla y prepara su recompensa al volver al mapa
    procesarRegresoCombate(datos) {
        // Recupera las recompensas guardadas
        const recompensas = this.registry.get('recompensasCombateMapa1') || {};
        // La escena provisional envia este dato al pulsar Volver al mapa
        const resultado = datos.combateCompletado;
        // Consulta el encuentro de la casilla en la que esta el jugador
        const encuentro = this.casillaActual.encuentro;

        // Solo concede XP y almas si volvemos de este combate y aun no tiene recompensa
        // && significa que deben cumplirse todas las condiciones
        if (resultado && resultado.casillaId === this.casillaActual.id &&
            encuentro && encuentro.tipo === 'Combate' &&
            !recompensas[this.casillaActual.id]) {
            // Cantidad de XP que entrega cada tipo de batalla
            // Podemos cambiarlo
            const experienciaPorTier = { 1: 30, 2: 65, 3: 110 };
            // Lee el premio de XP que corresponde al tier del encuentro
            const experiencia = experienciaPorTier[encuentro.tier];

            // Comprueba que existe una cantidad de XP para ese tier
            if (experiencia !== undefined) {
                // Suma primero la XP para sortear con el nivel nuevo
                this.ganarExperiencia(experiencia);
                // Cada batalla entrega tantas almas como su tier: 1, 2 o 3
                const aura = this.registry.get('aura');
                aura.almas += encuentro.tier;
                this.registry.set('aura', aura);
                // Actualiza las almas en pantalla, también si ya estamos en nivel 5
                this.actualizarInterfazAura();
                // Guarda las opciones elegidas para no repetir la XP ni las almas de esta casilla
                recompensas[this.casillaActual.id] = {
                    // El sorteo usa el nivel que tienes despues de sumar la experiencia
                    opciones: this.sortearBestias(),
                    // Todavia queda pendiente que el jugador elija una bestia
                    recogida: false
                };
                this.registry.set('recompensasCombateMapa1', recompensas);
            }
        }

        // Abre la eleccion pendiente
        this.abrirMenuBestias();
    }

    // Crea las tres opciones de bestias
    // Con null se sortea el tier de cada una. Si recibe 3, todas seran de Tier 3
    // Otra vez, nos faltan las bestias reales
    sortearBestias(tierFijo = null) {
        // Catalogo provisional hasta que las bestias reales tengan tiers
        // Hay tres bestias provisionales de cada tier, suficientes aunque los tres sorteos den el mismo tier
        const disponibles = [
            { id: 'bestiaT1A', nombre: 'Bestia T1 A', tier: 1 },
            { id: 'bestiaT1B', nombre: 'Bestia T1 B', tier: 1 },
            { id: 'bestiaT1C', nombre: 'Bestia T1 C', tier: 1 },
            { id: 'bestiaT2A', nombre: 'Bestia T2 A', tier: 2 },
            { id: 'bestiaT2B', nombre: 'Bestia T2 B', tier: 2 },
            { id: 'bestiaT2C', nombre: 'Bestia T2 C', tier: 2 },
            { id: 'bestiaT3A', nombre: 'Bestia T3 A', tier: 3 },
            { id: 'bestiaT3B', nombre: 'Bestia T3 B', tier: 3 },
            { id: 'bestiaT3C', nombre: 'Bestia T3 C', tier: 3 }
        ];
        // Empieza una lista vacia donde guardaremos las tres opciones que se mostraran
        const opciones = [];

        // Repite el sorteo tres veces, una por cada opcion del menu
        for (let i = 0; i < 3; i++) {
            // Empieza con el tier fijo, si quien llamo al metodo indico uno
            let tier = tierFijo;
            // Si no hay tier fijo, lo sortea usando el nivel de aura
            if (tier === null) {
                tier = this.sortearTierRecompensa();
            }

            // Conserva solo las bestias del tier que acaba de salir.
            const candidatas = disponibles.filter(bestia => bestia.tier === tier);
            // Elige una posicion aleatoria dentro de las candidatas
            const indice = Math.floor(Math.random() * candidatas.length);
            // Recoge una bestia de entre las candidatas.
            const bestia = candidatas[indice];
            // La retira de esta lista temporal para que no aparezca dos veces en la misma eleccion
            disponibles.splice(disponibles.indexOf(bestia), 1);
            opciones.push(bestia);
        }

        // Devuelve las tres bestias que se mostraran
        return opciones;
    }

    // Muestra primero la recompensa del combate y después el premio especial de nivel, si lo hay
    abrirMenuBestias() {
        if (this.menuRecompensa !== null) return;

        // Recupera las recompensas guardadas
        const recompensas = this.registry.get('recompensasCombateMapa1') || {};
        // Busca la recompensa de esta casilla en concreto
        const recompensa = recompensas[this.casillaActual.id];
        // Lee el objeto compartido con el progreso actual del jugador
        const aura = this.registry.get('aura');
        // Si el combate no tiene una elección pendiente, podemos atender el premio de nivel
        const esPremioNivel = !recompensa || recompensa.recogida;
        let opciones;
        let titulo = 'Elige una bestia';

        // Esta rama gestiona la bestia extra por alcanzar el nivel 5
        if (esPremioNivel) {
            // Si tampoco hay premio de nivel pendiente, no hay nada que mostrar
            if (!aura.seleccionTier3Pendiente) return;

            // Sortea el premio especial solo una vez y guarda sus opciones hasta recogerlo
            if (!aura.opcionesTier3Pendientes) {
                // Pasar 3 obliga a que las tres opciones sean de Tier 3
                aura.opcionesTier3Pendientes = this.sortearBestias(3);
                // Guarda el estado del aura para que otras escenas puedan recuperarlo
                this.registry.set('aura', aura);
            }

            opciones = aura.opcionesTier3Pendientes;
            titulo = 'Premio de nivel 5: elige una bestia';
        } else {
            // Usa las opciones que quedaron guardadas para el combate
            opciones = recompensa.opciones;
        }

        this.abrirMenuRecompensa(titulo, opciones, bestia => {
            // Recupera la lista de bestias ganadas durante la partida, o crea una lista vacia
            const bestias = this.registry.get('bestiasRecompensadas') || [];
            // Guarda los datos de la bestia elegida.
            // Falta conectarlos con el inventario real de combate
            bestias.push(bestia);
            this.registry.set('bestiasRecompensadas', bestias);

            // Esta rama gestiona la bestia extra por alcanzar el nivel 5
            if (esPremioNivel) {
                // Marca el premio especial como recogido para no entregarlo otra vez
                aura.seleccionTier3Pendiente = false;
                // Borra las opciones temporales del premio ya recogido
                delete aura.opcionesTier3Pendientes;
                // Guarda el estado del aura para que otras escenas puedan recuperarlo
                this.registry.set('aura', aura);
            } else {
                // Marca como recogida la recompensa normal de esta batalla
                recompensa.recogida = true;
                this.registry.set('recompensasCombateMapa1', recompensas);
            }

            this.abrirMenuBestias();
        });
    }

    // Suma la XP recibida, sube los niveles necesarios y entrega los premios correspondientes
    ganarExperiencia(cantidad) {
        // Lee el objeto compartido con el progreso actual del jugador
        const aura = this.registry.get('aura');

        // En el nivel maximo termina sin seguir acumulando experiencia
        if (aura.nivel >= 5) return;

        aura.experiencia += cantidad;

        // Costes para subir: 50, 75, 100 y 125 XP
        // Se puede cambiar
        let experienciaNecesaria = 25 + aura.nivel * 25;

        // Repite las subidas mientras quede suficiente XP y aun no hayas llegado al nivel 5
        while (aura.nivel < 5 && aura.experiencia >= experienciaNecesaria) {
            // Resta el coste de esta subida
            aura.experiencia -= experienciaNecesaria;
            // Aumenta el nivel en uno
            aura.nivel += 1;

            // Al llegar al nivel 3 entrega cinco almas, una sola vez al pasar por este nivel
            // Esto podemos cambiarñp, por balanceo puede que 5 no sea una cantidad adecuada
            if (aura.nivel === 3) {
                aura.almas += 5;
            }

            // Al llegar al nivel 5 deja pendiente la seleccion extra de Tier 3
            if (aura.nivel === 5) {
                aura.seleccionTier3Pendiente = true;
                console.log('Tienes pendiente elegir una bestia de Tier 3');
            }

            experienciaNecesaria = 25 + aura.nivel * 25;
        }

        // Al llegar al nivel 5 deja pendiente la seleccion extra de Tier 3
        if (aura.nivel === 5) {
            aura.experiencia = 0;
        }

        this.registry.set('aura', aura);
        // Actualiza el texto y la barra con los valores guardados
        this.actualizarInterfazAura();

        // Al llegar al nivel 5 deja pendiente la seleccion extra de Tier 3
        if (aura.nivel === 5) {
            console.log('Nivel 5: nivel maximo alcanzado');
        } else {
            console.log(
                'Nivel: ' + aura.nivel +
                ' | XP: ' + aura.experiencia + '/' + experienciaNecesaria
            );
        }
    }

    // Phaser ejecuta este metodo en cada fotograma.
    // t es el tiempo del juego y dt el tiempo desde el fotograma anterior. Aqui no necesitamos usarlos.
    update(t, dt) {
        // Si el janitor no esta viajando, no hay que comprobar ninguna llegada
        if (this.destino === null) return;

        // dx es lo que falta en horizontal hasta el destino
        const dx = this.destino.x - this.janitor.x;
        // dy es lo que falta en vertical hasta el destino
        const dy = this.destino.y - this.janitor.y;

        // Math.hypot calcula la distancia recta usando dx y dy
        // Aceptar 3 pixeles de margen evita exigir que coincidan exactamente entre dos fotogramas
        // No se si hacerlo por físicas fue lo correcto, puede que innecesario 
        if (Math.hypot(dx, dy) <= 3) {
            // Frena el cuerpo fisico y coloca al janitor exactamente en las coordenadas del destino
            this.janitor.body.reset(this.destino.x, this.destino.y);
            // La casilla a la que ibamos pasa a ser la casilla actual
            this.casillaActual = this.destino;
            // El trayecto ha terminado y se pueden volver a aceptar caminos
            this.destino = null;

            // Guarda la posición antes de abrir el encuentro o el menu
            this.registry.set('progresoMapa', this.casillaActual.id);

            // Consulta el encuentro de la casilla en la que esta el jugador
            const encuentro = this.casillaActual.encuentro;
            if (encuentro) {
                // Las herramientas abren su menú dentro del mapa
                if (encuentro.tipo === 'Herramienta') {
                    this.abrirMenuHerramientas();
                // Las mejoras abren un menu con un unico boton de prueba
                } else if (encuentro.tipo === 'Mejora') {
                    // Por ahora pulsar Mejora cierra el menú. Falta aplicar una mejora real
                    this.abrirMenuRecompensa('Estación de mejora', [
                        { id: 'mejora', nombre: 'Mejora' }
                    ]);
                } else {
                    // Los combates y el jefe abren la escena provisional y reciben estos datos
                    this.scene.start(encuentro.escena, {
                        encuentro,
                        // Indica desde que casilla salimos para reconocerla cuando volvamos
                        casillaId: this.casillaActual.id
                    });
                }
            }
        }
        
    }
}
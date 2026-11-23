import HasHealth from "../health/hashealth.js";
import AttackHandler from "../attack/attackhandler.js";
import Pentagon from "./pentagon.js"
import AttackInfo from "../attack/attackhandler.js";
import SpriteContainer from "../render/spritecontainer.js";
import HealthBar from "../render/filldisplay/healthbar.js";
import DeathInfo from "../utility/deathinfo.js";

// Clase que servirá como intermediaria para crear un lider de equipo.
// Contiene referencia a las clases básicas HasHealth y AttackHandler, llamando a sus métodos según corresponda.
export default class TeamLeader
{
    // Variables de la clase:
    #lifeObject; // Referencia al objeto de tipo HasHealth que contiene el lider.
    #attackObject; // Referencia al objetico de tipo AttackHandler que contiene el lider.
    #healthBar;
    #pentagon = null; // Referencia al pentágono al que pertenece el lider.
    #rivalPentagon = null; // Referencia al pentágono rival.
    #isPlayer; // Booleano que determina si somos el lider del jugador o el del enemigo.
    #sprite; // Variable de sprite
    constructor(isPlayer, lifeObject, attackObject, sprite, healthBar)
    {
        // Comprobación de tipos e inicialización de las variables
        if (typeof isPlayer === "boolean") this.#isPlayer = isPlayer;
        else throw new TypeError("Se ha intentado crear un TeamLeader con el parámetro \"isPlayer\" no booleano");

        if (lifeObject instanceof HasHealth) this.#lifeObject = lifeObject;
        else throw new TypeError("Se ha intentado crear un TeamLeader con el parámetro \"lifeObject\" sin ser instancia de HasHealth");

        if (attackObject instanceof AttackHandler) this.#attackObject = attackObject;
        else throw new TypeError("Se ha intentado crear un TeamLeader con el parámetro \"attackObject\" sin ser una instancia de AttackHandler");

        if (sprite instanceof SpriteContainer) this.#sprite = sprite;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"sprite\" sin ser instancia de Sprite");

        if (healthBar instanceof HealthBar) this.#healthBar = healthBar;
                else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"healthBar\" sin ser instancia de HealthBar");
                this.#sprite.add(this.#healthBar);

        // Suscripción al evento "death" del lifeObject.
        lifeObject.addEventListener("death", (event) => {this.onDeath(event)});
        // Suscripción al evento "attack" del attackObject.
        attackObject.addEventListener("attack",(event) => this.onAttack(event));

        this.#sprite.setDepth(2);
    }

    setPentagon(pentagon)
    {
        if (pentagon instanceof Pentagon) {
            this.#pentagon = pentagon;
            this.#sprite.x = this.#pentagon.getSpriteX();
            this.#sprite.y = this.#pentagon.getSpriteY();
            if (!this.#isPlayer) this.#sprite.flipX(true);
        }
        else throw new TypeError("Se ha intentado asignar a un TeamLeader con el parámetro \"pentagon\" sin ser una instancia de Pentagon");


    }

    setRivalPentagon(rivalPentagon)
    {
        if (rivalPentagon instanceof Pentagon) this.#rivalPentagon = rivalPentagon;
        else throw new TypeError("Se ha intentado crear un TeamLeader con el parámetro \"rivalPentagon\" sin ser una instancia de Pentagon");
    }

    // Método para actualizar al lider de equipo
    update(dt)
    {
        this.#attackObject.updateBuildup(dt);
    }

    // Método para recibir desde el pentágono un ataque y procesarlo.
    recieveHit(attack)
    {
        this.#lifeObject.hit(attack);
        this._updateHealthBar();
    }

    // Método para recibir desde el pentágono una curación y procesarla.
    recieveHeal(healPoints)
    {
        this.#lifeObject.heal(healPoints);
    }

    // Devuelve si el líder es el jugador
    getIsPlayer()
    {
        return this.#isPlayer;
    }

    // Actualiza la healthbar del líder
    _updateHealthBar()
    {
        this.#healthBar.updateBar(this.#lifeObject.getCurrentHealth(), this.#lifeObject.getMaxHealth());
    }

    // Método que se envia como callback para escuchar la muerte del lifeObject
    onDeath(event)
    {
        let deathInfo = event.detail; // Creamos el evento
        deathInfo.setIsLeader(true); // somos Líder
        if (deathInfo instanceof DeathInfo){
        // Se envia un evento "global" de la escena
        this.#sprite.scene.events.emit('death', deathInfo);
        }
        else console.error("El líder no ha recibido un objeto DeathInfo en la escucha onDeath. No se podrá lanzar el evento");
        
        this.#sprite.deathAnimation();
        this.#sprite.scene.time.addEvent( // esperar a que se vea la animación para borrar el objeto
        {
            delay: 400, // necesario algo de delay ya que se hace un Update Health Bar tras el golpe, si se elimina de inmediato da error. Además queda mejor visualmente.
            callback: ()=> 
            {
                // Destrucción del objeto en Phaser.
                this.#sprite.destroy(true); // true indica que se destruyan los objetos hijos
                this.#healthBar.destroy(true);

                // Destrucción del objeto en memoria
                this.#pentagon.teamLeaderDied();
            }
        })
    }
    
    // Método que se envia como callback para escuchar el ataque del attackObject.
    onAttack(event)
    {
        let attackInfo = event.detail;
        if (attackInfo instanceof AttackInfo)
        {
            if (this.#rivalPentagon !== null) this.#rivalPentagon.attackPosition(attackInfo);
            else console.error("Una Beast ha intentado atacar antes de recibir el setRivalPentagon(). No podrá atacar.");
        }
        else console.error("Una Beast no ha recibido un objeto AttackInfo en la escucha onAttack. No podrá acabar de atacar");
    }
}
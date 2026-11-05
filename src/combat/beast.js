import HasHealth from "../health/hashealth.js";
import AttackHandler from "../attack/attackhandler.js";
import AttackInfo from "../utility/attackinfo.js";
import Pentagon from "./pentagon.js"
import DeathInfo from "../utility/deathinfo.js";

import SpriteContainer from "../render/spritecontainer.js"
import HealthBar from "../render/filldisplay/healthbar.js";
import BuildupBar from "../render/filldisplay/buildupbar.js";

// Clase que servirá como intermediaria para crear una bestia.
// Contiene referencia a las clases básicas HasHealth y AttackHandler, llamando a sus métodos según corresponda.
export default class Beast
{
    // Variables de la clase:
    #lifeObject; // Referencia al objeto de tipo HasHealth que contiene la bestia.
    #attackObject; // Referencia al objetico de tipo AttackHandler que contiene la bestia.
    #pentagon = null; // Referencia al pentágono que contiene la bestia.
    #rivalPentagon = null; // Referencia al pentágono rival.
    #position = 1; // Número entero que contiene la posición actual de la bestia. Ha de ser >= 1 y <= 5; Se inicializa adecuadamente al entrar en un pentágono.

    #sprite; // Sprite de la bestia
    #healthBar; // HealthBar de la bestia
    #buildupBar; // Barra de buildup de la bestia

    constructor(lifeObject, attackObject, sprite, healthBar, buildupBar)
    {
        // Inicialización de las variables, comprobando su tipo.
        if (lifeObject instanceof HasHealth) this.#lifeObject = lifeObject;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"lifeObject\" sin ser instancia de HasHealth");

        if (attackObject instanceof AttackHandler) this.#attackObject = attackObject;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"attackObject\" sin ser una instancia de AttackHandler");

        if (sprite instanceof SpriteContainer) this.#sprite = sprite;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"sprite\" sin ser instancia de Sprite");

        if (healthBar instanceof HealthBar) this.#healthBar = healthBar;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"healthBar\" sin ser instancia de HealthBar");
        this.#sprite.add(this.#healthBar);

        if (buildupBar instanceof BuildupBar) this.#buildupBar = buildupBar;
        else throw new TypeError("Se ha intentado crear una Beast con el parámetro \"buildupBar\" sin ser instancia de BuildupBar");
        this.#sprite.add(this.#buildupBar);

        // Suscripción al evento "death" del lifeObject.
        lifeObject.addEventListener("death", (event) => {this.onDeath(event)});
        // Suscripción al evento "attack" del attackObject.
        attackObject.addEventListener("attack",(event) => this.onAttack(event));
    }

    setPentagon(pentagon)
    {
        if (pentagon instanceof Pentagon) 
        {
            this.#pentagon = pentagon;
        }
        else throw new TypeError("Se ha intentado asignar a una Beast el parámetro \"pentagon\" sin ser una instancia de Pentagon");
    }

    setRivalPentagon(rivalPentagon)
    {
        if (rivalPentagon instanceof Pentagon) 
        {
            this.#rivalPentagon = rivalPentagon;
        }
        else throw new TypeError("Se ha intentado asignar a una Beast  el parámetro \"rivalPentagon\" sin ser una instancia de Pentagon");
    }

    // Método para leer la posición actual de la bestia
    getPosition()
    {
        return this.#position;
    }

    // Método para establecer la posición de la bestia.
    setPosition(newPosition, isInPlayerPentagon)
    {
        if (typeof newPosition === "number" && newPosition >= 1 && newPosition <= 5) 
        {
            if (typeof isInPlayerPentagon === "boolean")
            {
                this.#position = newPosition;
                this.#attackObject.updatePosition(newPosition);

                // Render:
                let angle = Phaser.Math.DegToRad(-72 + 72*(newPosition-1));
                

                if (isInPlayerPentagon) 
                {
                    this.#sprite.flipX(false);
                    this.#sprite.x = this.#pentagon.getSpriteX() + 100*Math.cos(angle);
                }
                else
                {
                    this.#sprite.flipX(true);
                    this.#sprite.x = this.#pentagon.getSpriteX() - 100*Math.cos(angle);
                }
                this.#sprite.y = this.#pentagon.getSpriteY() + 100*Math.sin(angle);
                // TODO: Llamar al evento OnChangePosition;
            }
            else console.error("Se ha intentado cambiar la posición de una bestia introduciendo el parámetro isInPlayerPentagon no booleano")
            
        }
        else console.error("Se ha intentado cambiar la posición de una bestia a una inválida.");
    }

    // Método para actualizar la bestia
    update(dt)
    {
        this.#attackObject.updateBuildup(dt);
        this._updateBuildupBar();
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
        this._updateHealthBar();
    }

    // Método para leer si la bestia a muerto.
    isDead()
    {
        return this.#lifeObject.isDead();
    }

    // Método que se envia como callback para escuchar la muerte del lifeObject
    onDeath(event)
    {
        let deathInfo = event.detail;
        if (deathInfo instanceof DeathInfo)
        {
            deathInfo.setBeastPosition(this.#position);
            deathInfo.setIsOnPlayerTeam(this.#pentagon.isPlayerPentagon());
            deathInfo.setIsLeader(false); // somos bestia

            // Se envia un evento "global" de la escena
            this.#sprite.scene.events.emit('death', deathInfo);
        }
        else console.error("Una Beast no ha recibido un objeto DeathInfo en la escucha onDeath. No se podrá lanzar el evento");

        // "Animación" de muerte. Sprite se pone rojo. Lo importante es el callback
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
                this.#pentagon.beastDied(this.#position);
            }
        })
        
    }

    // Método que se envia como callback para escuchar el ataque del attackObject
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

    _updateHealthBar()
    {
        this.#healthBar.updateBar(this.#lifeObject.getCurrentHealth(), this.#lifeObject.getMaxHealth());
    }

    _updateBuildupBar()
    {
        this.#buildupBar.updateBar(this.#attackObject.getBuildup(), this.#attackObject.getAttackCooldown());
    }
    // TODO: Llevar toda la lógica de dibujado en Phaser...
}
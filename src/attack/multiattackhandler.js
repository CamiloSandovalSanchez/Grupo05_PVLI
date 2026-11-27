import AttackHandler from "./attackhandler.js";

// Clase con el ataque por defecto del juego.
export default class MultiAttack extends AttackHandler
{
    #multiAttackTargets = [];
    #multiAttackInfos = [];
    constructor(attack, attackCooldown)
    {
        super(attack, attackCooldown);
    }

    // Sobreescribe el ataque para crear el de por defecto: se atacan las posiciones (1 <-> 1, 2 <-> 2 y 3 <-> 3)
    _attack()
    {
        let attackPosition = this._attackInfo.getAttackOrigin();

        // Si estamos en la posición de en medio, atacamos a las 3 bestias enemigas
        if (attackPosition === 2)
        {
            //for (let i = 0; i < 3; i++) this.#multiAttackTargets.push(i+1);
            //this._attackInfo.multiAttackSetter(this.#multiAttackTargets);
            //this.doMultiAttack(this._attackInfo);
            for (let i = 0; i < 3; i++){
                this._attackInfo.setAttackTarget(i+1);
                this.doAttack(this._attackInfo);
            }
        }
        else
        {
            this._attackInfo.setAttackTarget(attackPosition);
            this.doAttack(this._attackInfo);
        }
    }

    // Solo puede atacar desde las posiciones 1, 2 y 3.
    _canAttack()
    {
        let attackPosition = this._attackInfo.getAttackOrigin();
        return (attackPosition === 1 || attackPosition === 2 || attackPosition == 3);
    }
}
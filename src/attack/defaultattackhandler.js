
import AttackHandler from "./attackhandler.js";

// Clase con el ataque por defecto del juego.
export default class DeafultAttack extends AttackHandler
{
    constructor(attack, attackCooldown)
    {
        super(attack, attackCooldown);
    }

    // Sobreescribe el ataque para crear el de por defecto: se atacan las posiciones (1 <-> 1, 2 <-> 2 y 3 <-> 3)
    _attack()
    {
        let attackPosition = this._attackInfo.getAttackOrigin();
        console.log("Ataco desde la posición " + attackPosition);
        this._attackInfo.setAttackTarget(attackPosition);
        this.doAttack(this._attackInfo);
    }

    // Solo puede atacar desde las posiciones 1, 2 y 3.
    _canAttack()
    {
        let attackPosition = this._attackInfo.getAttackOrigin();
        return (attackPosition === 1 || attackPosition === 2 || attackPosition == 3);
    }
}
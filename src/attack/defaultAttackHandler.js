
import AttackHandler from "./attackhandler.js";

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
        if(this._rivalPentagon != null) this._rivalPentagon.attackPosition(this._attackInfo);
        else console.error("Método attack() llamado sin haberse realizado SetRivalPentagon(). No se podrá atacar.")
    }

    _canAttack()
    {
        let attackPosition = this._attackInfo.getAttackOrigin();
        return (attackPosition === 1 || attackPosition === 2 || attackPosition == 3);
    }
}
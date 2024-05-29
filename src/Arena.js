class Arena {
    constructor(player1, player2, attackDie, defendDie) {
        this.player1 = player1;
        this.player2 = player2;
        this.attackDie = attackDie;
        this.defendDie = defendDie;
    }

    attack(attacker, defender) {
        const attackRoll = this.attackDie.roll();
        const defenseRoll = this.defendDie.roll();

        const attackDamage = attacker.attack * attackRoll;
        const defenseStrength = defender.strength * defenseRoll;

        const damage = Math.max(0, attackDamage - defenseStrength);
        defender.reduceHealth(damage);

        console.log(`${attacker.getName()} attacks with roll ${attackRoll} (Damage: ${attackDamage})`);
        console.log(`${defender.getName()} defends with roll ${defenseRoll} (Defense: ${defenseStrength})`);
        console.log(`${defender.getName()} takes ${damage} damage, health is now ${defender.getHealth()}\n`);
    }

    fight() {
        while (this.player1.isAlive() && this.player2.isAlive()) {
            if (this.player1.getHealth() <= this.player2.getHealth()) {
                this.attack(this.player1, this.player2);
                if (this.player2.isAlive()) {
                    this.attack(this.player2, this.player1);
                }
            } else {
                this.attack(this.player2, this.player1);
                if (this.player1.isAlive()) {
                    this.attack(this.player1, this.player2);
                }
            }
        }
    }

    startGame() {
        console.log("The battle begins!");

        this.fight();

        if (this.player1.isAlive()) {
            console.log(`${this.player1.getName()} wins the battle!`);
        } else {
            console.log(`${this.player2.getName()} wins the battle!`);
        }
    }
}

module.exports = Arena;

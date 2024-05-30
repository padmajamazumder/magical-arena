
const Die = require('./Die');

class Arena {
    constructor(player1, player2, attackDie, defendDie, rl) {
        this.player1 = player1;
        this.player2 = player2;
        this.attackDie = attackDie;
        this.defendDie = defendDie;
        this.rl = rl; // Add readline interface instance
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

    async manualRollDice(player) {
        const roll = await Die.simulateDieRoll(player.getName(), this.rl); // Pass rl instance here
        return roll;
    }

    async startGameWithManualDiceRoll() {
        console.log("The battle begins!");

        while (this.player1.isAlive() && this.player2.isAlive()) {
            await this.manualRollDice(this.player1);
            if (this.player1.isAlive()) {
                await this.manualRollDice(this.player2);
            }
        }

        if (this.player1.isAlive()) {
            console.log(`${this.player1.getName()} wins the battle!`);
        } else {
            console.log(`${this.player2.getName()} wins the battle!`);
        }
    }

    startGame() {
        console.log("The battle begins!");

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

        if (this.player1.isAlive()) {
            console.log(`${this.player1.getName()} wins the battle!`);
        } else {
            console.log(`${this.player2.getName()} wins the battle!`);
        }
    }
}

module.exports = Arena;


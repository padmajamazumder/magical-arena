const Player = require('./Player');
const Die = require('./Die');

/**
 * Represents an arena where players fight.
 */
class Arena {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    /**
     * Starts the game.
     */
    async startGame() {
        let attacker = this.player1.getHealth() < this.player2.getHealth() ? this.player1 : this.player2;
        let defender = attacker === this.player1 ? this.player2 : this.player1;

        while (attacker.isAlive() && defender.isAlive()) {
            await this.takeTurn(attacker, defender);
            [attacker, defender] = [defender, attacker];
        }

        const winner = this.getWinner();
        console.log(`The winner is: Player ${winner === this.player1 ? 'A' : 'B'}`);
        process.exit();
    }

    /**
     * Executes a single turn in the fight.
     * @param {Player} attacker - The attacking player.
     * @param {Player} defender - The defending player.
     */
    async takeTurn(attacker, defender) {
        try {
            const attackRoll = await Die.simulateDieRoll(attacker === this.player1 ? 'Player A' : 'Player B');
            const defendRoll = await Die.simulateDieRoll(defender === this.player1 ? 'Player A' : 'Player B');
            
            this.attack(attacker, defender, attackRoll, defendRoll);
        } catch (error) {
            console.error('Error during die roll:', error);
        }
    }

    /**
     * Executes the attack logic.
     * @param {Player} attacker - The attacking player.
     * @param {Player} defender - The defending player.
     * @param {number} attackRoll - The result of the attack die roll.
     * @param {number} defendRoll - The result of the defense die roll.
     */
    attack(attacker, defender, attackRoll, defendRoll) {
        const attackDamage = attacker.getAttack() * attackRoll;
        const defendStrength = defender.getStrength() * defendRoll;

        const damage = attackDamage - defendStrength;
        if (damage > 0) {
            defender.reduceHealth(damage);
        }

        console.log(`${attacker === this.player1 ? 'Player A' : 'Player B'} attacked with damage ${attackDamage}`);
        console.log(`${defender === this.player1 ? 'Player A' : 'Player B'} defended with strength ${defendStrength}`);
        console.log(`${defender === this.player1 ? 'Player A' : 'Player B'}'s health is now ${defender.getHealth()}\n`);
    }

    /**
     * Gets the winner of the fight.
     * @returns {Player} The winning player.
     */
    getWinner() {
        return this.player1.isAlive() ? this.player1 : this.player2;
    }
}

module.exports = Arena;

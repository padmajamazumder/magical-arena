/**
 * Represents a player in the magical arena.
 */
class Player {
    #health;
    #strength;
    #attack;

    constructor(health, strength, attack) {
        this.#health = health;
        this.#strength = strength;
        this.#attack = attack;
    }

    getHealth() {
        return this.#health;
    }

    getStrength() {
        return this.#strength;
    }

    getAttack() {
        return this.#attack;
    }

    reduceHealth(damage) {
        this.#health -= damage;
        // Ensure health doesn't drop below zero
        if (this.#health < 0) {
            this.#health = 0;
        }
    }

    isAlive() {
        return this.#health > 0;
    }
}

module.exports = Player;

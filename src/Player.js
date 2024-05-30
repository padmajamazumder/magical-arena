class Player {
    constructor(name, health, strength, attack) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }

    // Get the current health of the player
    getHealth() {
        return this.health;
    }

    // Reduce the player's health by the given amount, ensuring it doesn't go below zero
    reduceHealth(amount) {
        this.health = Math.max(0, this.health - amount);
    }

    // Check if the player is still alive (health > 0)
    isAlive() {
        return this.health > 0;
    }

    // Get the player's name
    getName() {
        return this.name;
    }
}

module.exports = Player;

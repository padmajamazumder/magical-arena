

class Player {
    constructor(name, health, strength, attack) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }

    getHealth() {
        return this.health;
    }

    reduceHealth(amount) {
        this.health = Math.max(0, this.health - amount); // Prevent negative health
    }

    isAlive() {
        return this.health > 0;
    }

    getName() {
        return this.name;
    }
}

module.exports = Player;

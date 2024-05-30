const readline = require('readline');
const Player = require('./Player');
const Arena = require('./Arena');
const Die = require('./Die');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getUserInput(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function main() {
    try {
        console.log("Welcome to the Magical Arena!");

        // Default values
        const defaultHealth = 100;
        const defaultStrength = 10;
        const defaultAttack = 20;

        // Function to get player's details
        async function getPlayerDetails(playerName) {
            console.log(`\nEnter details for ${playerName}:`);
            let useDefault;
            while (true) {
                useDefault = await getUserInput(`Do you want to use default values (Health: ${defaultHealth}, Strength: ${defaultStrength}, Attack: ${defaultAttack})? (yes/no): `);
                if (useDefault.toLowerCase() === 'yes' || useDefault.toLowerCase() === 'no') break;
                console.log("Invalid input. Please enter 'yes' or 'no'.");
            }

            if (useDefault.toLowerCase() === 'yes') {
                return new Player(playerName, defaultHealth, defaultStrength, defaultAttack);
            } else {
                let reference;
                while (true) {
                    reference = await getUserInput("Would you like to see reference values? (yes/no): ");
                    if (reference.toLowerCase() === 'yes' || reference.toLowerCase() === 'no') break;
                    console.log("Invalid input. Please enter 'yes' or 'no'.");
                }
                if (reference.toLowerCase() === 'yes') {
                    console.log(`Reference values: Health: ${defaultHealth}, Strength: ${defaultStrength}, Attack: ${defaultAttack}`);
                }

                let health, strength, attack;
                while (true) {
                    health = parseInt(await getUserInput("Enter the health: "), 10);
                    if (!isNaN(health) && health > 0) break;
                    console.log("Invalid input. Please enter a positive integer for health.");
                }
                while (true) {
                    strength = parseInt(await getUserInput("Enter the strength: "), 10);
                    if (!isNaN(strength) && strength > 0) break;
                    console.log("Invalid input. Please enter a positive integer for strength.");
                }
                while (true) {
                    attack = parseInt(await getUserInput("Enter the attack: "), 10);
                    if (!isNaN(attack) && attack > 0) break;
                    console.log("Invalid input. Please enter a positive integer for attack.");
                }

                return new Player(playerName, health, strength, attack);
            }
        }

        // Get player A details
        const playerAName = await getUserInput("Enter the name of Player A: ");
        const playerA = await getPlayerDetails(playerAName);

        // Get player B details
        const playerBName = await getUserInput("Enter the name of Player B: ");
        const playerB = await getPlayerDetails(playerBName);

        console.log(`\n${playerAName} vs ${playerBName} - Let the battle begin!\n`);

        // Initialize dice
        const attackDie = new Die();
        const defendDie = new Die();

        // Create arena
        const arena = new Arena(playerA, playerB, attackDie, defendDie, rl);

        // Ask the user if they want to roll the dice themselves
        let rollDiceOption;
        while (true) {
            rollDiceOption = await getUserInput("Do you want to roll the dice yourself? (yes/no): ");
            if (rollDiceOption.toLowerCase() === 'yes' || rollDiceOption.toLowerCase() === 'no') break;
            console.log("Invalid input. Please enter 'yes' or 'no'.");
        }

        if (rollDiceOption.toLowerCase() === 'yes') {
            // Start the fight and let the user roll the dice
            console.log("You chose to roll the dice yourself.\n");
            await arena.startGameWithManualDiceRoll();
        } else {
            // Start the fight with automatic dice rolls
            console.log("You chose to let the program roll the dice.\n");
            arena.startGame();
        }
    } catch (error) {
        console.error("An unexpected error occurred:", error);
    } finally {
        // Close readline
        rl.close();
    }
}

main();

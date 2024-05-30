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

function isValidName(name) {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(name) && name.replace(/\s/g, '').length > 0;
}

function isPositiveInteger(value) {
    const num = parseInt(value, 10);
    return Number.isInteger(num) && num > 0;
}

function cleanInput(value) {
    return value.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
}

async function getUniquePlayerName(playerNames) {
    let name;
    while (true) {
        name = await getUserInput("Enter the name of the player: ");
        if (!isValidName(name)) {
            console.log("Invalid name. Please enter a name containing only alphabet characters and spaces.");
        } else if (playerNames.includes(name)) {
            console.log("This name is already taken. Please enter a different name.");
        } else {
            break;
        }
    }
    return name;
}

async function getValidatedPositiveInteger(prompt) {
    let value;
    while (true) {
        value = await getUserInput(prompt);
        const cleanedValue = cleanInput(value);
        if (isPositiveInteger(cleanedValue)) {
            let confirm;
            while (true) {
                confirm = await getUserInput(`Do you want to accept the value "${cleanedValue}"? (yes/no): `);
                if (confirm.toLowerCase() === 'yes') {
                    return parseInt(cleanedValue, 10);
                } else if (confirm.toLowerCase() === 'no') {
                    break;
                } else {
                    console.log("Invalid input. Please enter 'yes' or 'no'.");
                }
            }
        } else {
            console.log("Invalid input. Please enter a positive integer.");
        }
    }
}

async function getPlayerDetails(playerName) {
    const defaultHealth = 100;
    const defaultStrength = 10;
    const defaultAttack = 20;

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

        const health = await getValidatedPositiveInteger("Enter the health: ");
        const strength = await getValidatedPositiveInteger("Enter the strength: ");
        const attack = await getValidatedPositiveInteger("Enter the attack: ");

        return new Player(playerName, health, strength, attack);
    }
}

async function main() {
    try {
        console.log("Welcome to the Magical Arena!");

        const playerNames = [];

        // Get player A details
        const playerAName = await getUniquePlayerName(playerNames);
        playerNames.push(playerAName);
        const playerA = await getPlayerDetails(playerAName);

        // Get player B details
        const playerBName = await getUniquePlayerName(playerNames);
        playerNames.push(playerBName);
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

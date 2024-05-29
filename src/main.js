
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
            const trimmedAnswer = answer.trim();
            console.log(trimmedAnswer);
            resolve(trimmedAnswer);
        });
    });
}

async function main() {
    console.log("Welcome to the Magical Arena!");
    
    const defaultHealth = 100;
    const defaultStrength = 10;
    const defaultAttack = 20;

    async function getPlayerDetails(playerName) {
        console.log(`\nEnter details for ${playerName}:`);
        const useDefault = await getUserInput(`Do you want to use default values (Health: ${defaultHealth}, Strength: ${defaultStrength}, Attack: ${defaultAttack})? (yes/no): `);

        if (useDefault.toLowerCase() === 'yes') {
            return new Player(playerName, defaultHealth, defaultStrength, defaultAttack);
        } else {
            const reference = await getUserInput("Would you like to see reference values? (yes/no): ");
            if (reference.toLowerCase() === 'yes') {
                console.log(`Reference values: Health: ${defaultHealth}, Strength: ${defaultStrength}, Attack: ${defaultAttack}`);
            }
            const health = parseInt(await getUserInput("Enter the health: "), 10);
            const strength = parseInt(await getUserInput("Enter the strength: "), 10);
            const attack = parseInt(await getUserInput("Enter the attack: "), 10);

            return new Player(playerName, health, strength, attack);
        }
    }

    const playerAName = await getUserInput("Enter the name of Player A: ");
    const playerA = await getPlayerDetails(playerAName);
    console.log(`Player A is: ${playerAName}`);

    const playerBName = await getUserInput("Enter the name of Player B: ");
    const playerB = await getPlayerDetails(playerBName);
    console.log(`Player B is: ${playerBName}`);

    console.log(`\n${playerAName} vs ${playerBName} - Let the battle begin!\n`);

    const attackDie = new Die();
    const defendDie = new Die();

    const arena = new Arena(playerA, playerB, attackDie, defendDie);
    arena.startGame();

    rl.close();
}

main();

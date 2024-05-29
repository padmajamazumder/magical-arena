// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// /**
//  * Represents a six-sided die.
//  */
// class Die {
//     roll() {
//         return Math.floor(Math.random() * 6) + 1;
//     }

//     /**
//      * Simulates rolling a die with animation and user interaction.
//      * @param {string} playerName - The name of the player rolling the die.
//      * @returns {Promise<number>} - A promise that resolves to the roll result.
//      */
//     static async simulateDieRoll(playerName) {
//         console.log(`${playerName}, press Enter to roll the die...`);
//         await new Promise(resolve => rl.question('', resolve));
        
//         return new Promise(resolve => {
//             let rollCount = 0;
//             let roll = 0;
//             const rollInterval = setInterval(() => {
//                 roll = Math.floor(Math.random() * 6) + 1;
//                 process.stdout.write(`\rRolling... ${roll}`);
//                 rollCount++;

//                 if (rollCount >= 10) {
//                     clearInterval(rollInterval);
//                     console.log(`\n${playerName} rolled a ${roll}`);
//                     resolve(roll);
//                 }
//             }, 100);
//         });
//     }
// }

// module.exports = Die;

class Die {
    roll() {
        return Math.floor(Math.random() * 6) + 1;
    }
}

module.exports = Die;

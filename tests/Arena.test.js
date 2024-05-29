const Player = require('../src/Player');
const Arena = require('../src/Arena');

test('Fight between players', async () => {
    const playerA = new Player(50, 5, 10);
    const playerB = new Player(100, 10, 5);

    const arena = new Arena(playerA, playerB);
    
    // Mock the simulateDieRoll method to avoid actual user input during tests
    jest.spyOn(global.console, 'log').mockImplementation(() => {}); // Mock console.log
    jest.spyOn(Arena.prototype, 'takeTurn').mockImplementation(async (attacker, defender) => {
        // Simulate predefined die rolls
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async delay
        const attackRoll = 3;
        const defendRoll = 2;
        arena.attack(attacker, defender, attackRoll, defendRoll);
    });

    await arena.startGame();

    expect(playerA.getHealth() === 0 || playerB.getHealth() === 0).toBeTruthy();

    // Restore mocked functions
    jest.restoreAllMocks();
});


const Player = require('../src/Player');

test('Player reduces health', () => {
    const player = new Player('Player1', 50, 5, 10);
    player.reduceHealth(20);
    expect(player.getHealth()).toBe(30);
});

test('Player is alive', () => {
    const player = new Player('Player2', 50, 5, 10);
    expect(player.isAlive()).toBe(true);
    player.reduceHealth(50);
    expect(player.isAlive()).toBe(false);
});

// const Player = require('../src/Player');

// test('Player reduces health', () => {
//     const player = new Player(50, 5, 10);
//     player.reduceHealth(20);
//     expect(player.getHealth()).toBe(30);
// });

// test('Player is alive', () => {
//     const player = new Player(50, 5, 10);
//     expect(player.isAlive()).toBe(true);
//     player.reduceHealth(50);
//     expect(player.isAlive()).toBe(false);
// });

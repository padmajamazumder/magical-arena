const Player = require('./Player');
const Arena = require('./Arena');

// Initialize players
const playerA = new Player(50, 5, 10);
const playerB = new Player(100, 10, 5);

// Create the arena
const arena = new Arena(playerA, playerB);

// Start the game
arena.startGame();

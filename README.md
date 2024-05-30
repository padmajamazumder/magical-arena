# Magical Arena

## Overview
Magical Arena is a simple turn-based battle simulation between two players with attributes such as health, strength, and attack. The players take turns attacking and defending until one of them loses all health.

## Project Structure

magical-arena/
│
├── src/
│   ├── main.js
│   ├── Player.js
│   ├── Arena.js
│   └── Die.js
│
├── tests/
│   ├── Arena.test.js
│   ├── Die.test.js
│   └── Player.test.js
│
├── package.json
└── package-lock.json


- `src/`: Contains the main application files.
  - `Player.js`: Defines the Player class.
  - `Die.js`: Defines the Die class for rolling dice.
  - `Arena.js`: Defines the Arena class for managing the fight between players.
  - `main.js`: Contains the interactive logic for running the game.
- `tests/`: Contains the unit tests for the application.
  - `Player.test.js`: Unit tests for the Player class.
  - `Die.test.js`: Unit tests for the Die class.
  - `Arena.test.js`: Unit tests for the Arena class.

## How to Run the Code
1. Install Node.js if you haven't already.
2. Navigate to the project directory.
3. Install dependencies:
    ```bash
    npm install
    ```
4. To run the game:
    ```bash
    node src/main.js
    ```
5. To run the tests:
    ```bash
    npm test
    ```

## Assumptions
- The game continues until one player's health reaches 0.
- Players take turns attacking and defending.
- Dice rolls are simulated to determine the outcome of attacks and defenses.

## Implementation Details
- Players have attributes such as health, strength, and attack.
- Dice rolls determine the effectiveness of attacks and defenses.
- The Arena class manages the flow of the game.

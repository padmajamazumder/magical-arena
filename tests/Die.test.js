const Die = require('../src/Die');

test('Die roll', () => {
    const die = new Die();
    for (let i = 0; i < 100; i++) {
        const roll = die.roll();
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(6);
    }
});

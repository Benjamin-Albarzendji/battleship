/* eslint-disable no-undef */
const shipFactory = require('./shipFactory');
const GameboardFactory = require('./GameboardFactory');
const Player = require('./player');

describe('Testing the shipFactory module', () => {
  const testBoat = shipFactory(4);
  test('Testing that the isSunk() method works correctly after 4 uses of the hit() method with a length of 4', () => {
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(1);
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(2);
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(3);
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(4);
    expect(testBoat.isSunk()).toBe(true);
  });

  test('Unable to create ship of length < 1 and length > 4', () => {
    expect(shipFactory(0)).toBe(false);
    expect(shipFactory(5)).toBe(false);
    expect(shipFactory(6)).toBe(false);
    expect(shipFactory(7)).toBe(false);
    expect(shipFactory(8)).toBe(false);
    expect(shipFactory(9)).toBe(false);
  });
});

describe('GameboardFactory module', () => {
  const gameBoard = GameboardFactory();

  test('Testing the gridCreator() function', () => {
    expect(gameBoard.gridCreator()).toBe(true);
  });

  test('Testing the toggleAlignment() function', () => {
    expect(gameBoard.toggleAlignment()).toBe('vertical');
    expect(gameBoard.toggleAlignment()).toBe('horizontal');
    expect(gameBoard.toggleAlignment()).toBe('vertical');
    expect(gameBoard.toggleAlignment()).toBe('horizontal');
  });

  test('Testing the shipPlacer() function', () => {
    expect(gameBoard.shipPlacer(4, 5, 5)).toBe(true);
    expect(gameBoard.shipPlacer(4, 5, 5)).toBe(false);
    expect(gameBoard.shipPlacer(4, 5, 6)).toBe(false);
    expect(gameBoard.shipPlacer(4, 6, 6)).toBe(false);
    expect(gameBoard.shipPlacer(4, 4, 6)).toBe(false);
    expect(gameBoard.shipPlacer(4, 4, 4)).toBe(false);

    expect(gameBoard.shipPlacer(2, 0, 0)).toBe(true);
    expect(gameBoard.shipPlacer(2, 0, 0)).toBe(false);
    expect(gameBoard.shipPlacer(2, 0, 1)).toBe(false);
    expect(gameBoard.shipPlacer(2, 0, 2)).toBe(false);
    expect(gameBoard.shipPlacer(2, 1, 1)).toBe(false);
    expect(gameBoard.shipPlacer(2, 1, 2)).toBe(false);
    expect(gameBoard.shipPlacer(2, 1, 0)).toBe(false);
  });

  test('Testing the ReceiveHit() function', () => {
    
    expect(gameBoard.receiveHit(5, 5)).toBe('H');
    expect(gameBoard.receiveHit(5, 6)).toBe('H');
    expect(gameBoard.receiveHit(5, 7)).toBe('H');
    expect(gameBoard.receiveHit(5, 8)).toBe('H');
    expect(gameBoard.receiveHit(4, 5)).toBe('M');
    expect(gameBoard.receiveHit(4, 6)).toBe('M');
    expect(gameBoard.receiveHit(4, 7)).toBe('M');
    expect(gameBoard.receiveHit(4, 8)).toBe('M');
    expect(gameBoard.receiveHit(4, 9)).toBe('M');
    expect(gameBoard.receiveHit(5, 9)).toBe('M');
    expect(gameBoard.receiveHit(6, 9)).toBe('M');
    expect(gameBoard.receiveHit(6, 8)).toBe('M');
    expect(gameBoard.receiveHit(6, 7)).toBe('M');
    expect(gameBoard.receiveHit(6, 6)).toBe('M');
    expect(gameBoard.receiveHit(6, 5)).toBe('M');
    expect(gameBoard.receiveHit(6, 4)).toBe('M');
    expect(gameBoard.receiveHit(5, 4)).toBe('M');
    expect(gameBoard.receiveHit(4, 4)).toBe('M');
  });
});

const shipFactory = require('./shipFactory');


describe('shipFactory module', () => {
    const testBoat = shipFactory(5)
  test('Testing the isSunk() method', () => {
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(1)
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(2)
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(3)
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(4)
    expect(testBoat.isSunk()).toBe(false);
    expect(testBoat.hit()).toEqual(5)
    expect(testBoat.isSunk()).toBe(true);
  
  

  });
});

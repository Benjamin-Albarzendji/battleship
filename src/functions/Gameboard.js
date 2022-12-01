/* eslint-disable no-use-before-define */
/* eslint-disable no-return-assign */

const shipFactory = (length) => {
  let hits = 0;
  const isSunk = (hits = getHits(), length = getLength()) => hits >= length;
  const hit = () => (hits += 1);
  const getHits = () => hits;
  const getLength = () => length;
  return { isSunk, hit, getHits };
};

module.exports = shipFactory;

const GameboardFactory = () => {
  const board = [];
  let alignment = 'horizontal';
  let sunkCounter = 0;

  const sunkIncrementor = () => {
    sunkCounter += 1;
  };
  if (sunkCounter === 10) {
    gameOver();
  }

  // Function to both create and restart the grid
  const gridCreator = () => {
    for (let i = 0; i < 10; i += 1) {
      board[i] = [];
      for (let j = 0; j < 10; j += 1) {
        board[i][j] = 0;
      }
    }
  };

  const gameOver = () => {
    // DECIDE LATER
  };

  // Function to receive a hit on the grid
  const receiveHit = (ROW, COLUMN) => {
    // On miss
    if (board[ROW][COLUMN] === 0) {
      board[ROW][COLUMN] = 'M';
      return 'M';
    }
    // On targetting an already missed row
    if (
      board[ROW][COLUMN] === 'M' ||
      board[ROW][COLUMN] === 'H' ||
      board[ROW][COLUMN] === 1
    ) {
      return false;
    }
    // On hitting ship object
    if (typeof board[ROW][COLUMN] === 'object') {
      board[ROW][COLUMN].hit();
      if (board[ROW][COLUMN].isSunk() === true) {
        sunkIncrementor();
      }
      board[ROW][COLUMN] = 'H';
      return 'H';
    }
  };

  // Function that places a ship on the grid
  const shipPlacer = (size, ROW, COLUMN) => {
    if (!shipPlacerChecker(size, ROW, COLUMN)) {
      return false;
    }

    gridDisabler(size, ROW, COLUMN);

    const ship = shipFactory(size);

    if (alignment === 'horizontal') {
      for (let i = 0; i < size; i += 1) {
        board[ROW][COLUMN + i] = ship;
      }
    }

    if (alignment === 'vertical') {
      for (let i = 0; i < size; i += 1) {
        board[ROW + i][COLUMN] = ship;
      }
    }

    return true;
  };

  const shipPlacerChecker = (size, ROW, COLUMN) => {
    // Confirms the min&max allowed sizes
    if (size < 1 || size > 4) {
      return false;
    }
    // Confirms if the board slot is occupied or not
    if (board[ROW][COLUMN] !== 0) {
      return false;
    }
    if (alignment === 'horizontal') {
      // Fails to place if the limit over the border is exceeded
      if (size + COLUMN > 10) {
        return false;
      }
      // Checks the grid to ensure placement is possible for all grid slots.
      for (let i = 0; i < size; i += 1) {
        if (board[ROW][COLUMN + i] !== 0) {
          return false;
        }
      }
    }

    if (alignment === 'vertical') {
      // Fails to place if the limit over the border is exceeded
      if (size + ROW > 10) {
        return false;
      }
      // Checks the grid to ensure placement is possible for all grid slots.
      for (let i = 0; i < size; i += 1) {
        if (board[ROW + i][COLUMN] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  // This function disables the grid around the ship
  const gridDisabler = (size, ROW, COLUMN) => {
    if (alignment === 'horizontal') {
      if (COLUMN > 0) {
        board[ROW][COLUMN - 1] = 1;
      }

      if (size + COLUMN <= 9) {
        board[ROW][COLUMN + size] = 1;
      }

      if (ROW >= 0 && ROW < 9) {
        for (let i = -1; i < size + 1; i += 1) {
          if (COLUMN + i < 0 || COLUMN + i > 9) {
            continue;
          }
          board[ROW + 1][COLUMN + i] = 1;
        }
      }

      if (ROW <= 9 && ROW > 0) {
        for (let i = -1; i < size + 1; i += 1) {
          if (COLUMN + i < 0 || COLUMN + i > 9) {
            continue;
          }
          board[ROW - 1][COLUMN + i] = 1;
        }
      }
    }

    if (alignment === 'vertical') {
      if (ROW > 0) {
        board[ROW - 1][COLUMN] = 1;
      }

      if (size + ROW <= 9) {
        board[ROW + size][COLUMN] = 1;
      }

      if (COLUMN >= 0 && COLUMN < 9) {
        for (let i = -1; i < size + 1; i += 1) {
          if (ROW + i < 0 || ROW + i > 9) {
            continue;
          }
          board[ROW + i][COLUMN + 1] = 1;
        }
      }

      if (COLUMN <= 9 && COLUMN > 0) {
        for (let i = -1; i < size + 1; i += 1) {
          if (ROW + i < 0 || ROW + i > 9) {
            continue;
          }
          board[ROW + i][COLUMN - 1] = 1;
        }
      }
    }
  };
  // Alignment toggler
  const toggleAlignment = () => {
    if (alignment === 'horizontal') {
      alignment = 'vertical';
    } else {
      alignment = 'horizontal';
    }
  };

  return {
    gridCreator,
    board,
    shipPlacer,
    toggleAlignment,
    receiveHit,
  };
};

const Gameboard = GameboardFactory();

Gameboard.gridCreator();

console.log(Gameboard.shipPlacer(4, 4, 4));

console.log(Gameboard.shipPlacer(2, 0, 0));
console.log(Gameboard.shipPlacer(2, 9, 0));
Gameboard.receiveHit(0, 0);

Gameboard.receiveHit(0, 1);

console.log(Gameboard.board);

module.exports = GameboardFactory;

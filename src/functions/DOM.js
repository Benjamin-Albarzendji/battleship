/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
// const Player = require('./player');

import { startTheGame } from '..';

// Creastes the grid with gridLoop
function createGrid() {
  const gridContainer = document.createElement('div');
  gridContainer.className = 'gridContainer animate__animated animate__fadeIn';
  document.body.appendChild(gridContainer);

  const grid1 = document.createElement('div');
  grid1.className = 'grid1';
  gridContainer.appendChild(grid1);
  gridLoop(grid1, 'P');

  const grid2 = document.createElement('div');
  grid2.className = 'grid2';
  gridLoop(grid2, 'C');
  gridContainer.appendChild(grid2, 'C');
}

function gridLoop(container, typeOfPlayer) {
  for (let i = 0; i < 11; i += 1) {
    const gridRow = document.createElement('div');
    gridRow.className = 'gridRow';

    if (i === 0) {
      gridRow.className = 'gridRowAlphaNum';
    }
    gridRow.setAttribute('value', i);
    container.appendChild(gridRow);

    for (let j = 0; j < 11; j += 1) {
      const gridCell = document.createElement('div');
      gridCell.className = 'gridCell';

      if (j === 0) {
        gridCell.textContent = i;
        gridCell.className = 'gridAlphaNum';
      }
      if (i === 0) {
        const upperGrid = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        gridCell.textContent = upperGrid[j];
        gridCell.className = 'gridAlphaNum';
      }

      gridCell.id = `${i - 1}${typeOfPlayer}${j - 1}`;
      gridRow.appendChild(gridCell);
    }
  }
}

// Paints the player board grid
function gridPainter(grid) {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (typeof grid[i][j] === 'object') {
        const gridCell = document.getElementById(`${i}P${j}`);
        gridCell.className = 'gridCell ship';
      } else {
        const gridCell = document.getElementById(`${i}P${j}`);
        gridCell.className = 'gridCell';
      }
    }
  }
}
// Activates the click listener on the enemy grid
function enemyGridEventListener(compPlayer, player) {
  const enemyGrid = document.querySelectorAll('.grid2 > *> .gridCell');

  const listenerForwarder = function (e) {
    HitOnClick(e.target, compPlayer, listenerForwarder, player);
  };

  enemyGrid.forEach((cell) => {
    cell.addEventListener('click', listenerForwarder);
  });
}

function HitOnClick(cell, compPlayer, listenerForwarder, player) {
  const [row, col] = cell.id.split('C');
  const hitStatus = compPlayer.board.receiveHit(row, col);
  hitStatus === 'M'
    ? (cell.className = 'gridCellM')
    : (cell.className = 'gridCellH');
  if (hitStatus === 'M') {
    const textDiv = document.createElement('div');
    textDiv.textContent = '.';
    cell.appendChild(textDiv);
  }
  cell.removeEventListener('click', listenerForwarder);

  isGameOver(compPlayer, player);
  turnSwitcher(compPlayer, player);
}
// The computer hit function
function compHit(coords, hitConfirmer) {
  const row = coords.x;
  const col = coords.y;
  const cell = document.getElementById(`${row}P${col}`);
  const hitStatus = hitConfirmer(row, col);

  hitStatus === 'M'
    ? (cell.className = 'gridCellM')
    : (cell.className = 'gridCellH');
  if (hitStatus === 'M') {
    const textDiv = document.createElement('div');
    textDiv.textContent = '.';
    cell.appendChild(textDiv);
  }
}

// A turn switcher that hits for the computer and checks if the game is over
function turnSwitcher(compPlayer, player) {
  //   for (let i = 0; i < 100; i++) {
  compHit(compPlayer.CompSendHit(), player.board.receiveHit);
  isGameOver(player, compPlayer);
  //   }
}

// If game is over it will call the gameoverDom
function isGameOver(loser, winner) {
  if (loser.board.gameOver()) {
    gameOverDOM(winner);
  }
}

// Creates UI elements for the game over
function gameOverDOM(winner) {
  // Gameover Container
  const gameOverContainer = document.createElement('div');
  gameOverContainer.className =
    'gameOverContainer animate__animated animate__fadeIn';
  document.body.appendChild(gameOverContainer);

  // Final text div
  const finalTextDiv = document.createElement('div');
  finalTextDiv.className = 'finalTextDiv';
  gameOverContainer.appendChild(finalTextDiv);

  // Play again div
  const playAgain = document.createElement('div');
  playAgain.className = 'playAgain';
  playAgain.textContent =
    'The war is not over! Ready for another battle, Admiral?';
  gameOverContainer.appendChild(playAgain);

  // Play again Button
  const playAgainButton = document.createElement('button');
  playAgainButton.className = 'playAgainButton';
  playAgainButton.textContent = 'Next Battle';
  gameOverContainer.appendChild(playAgainButton);
  const resetForwarder = function (e) {
    reset();
  };
  playAgainButton.addEventListener('click', resetForwarder);

  if (winner.getName() === 'Computer') {
    finalTextDiv.textContent = `You lost the battle!`;
  } else {
    finalTextDiv.textContent = `${winner.getName()} Won The Battle!`;
  }
}

// Resets the game with a function called from the index.js module
function reset() {
  const gridContainer = document.querySelector('.gridContainer');
  gridContainer.className = 'gridContainer animate__animated animate__fadeOut';

  const gameOverContainer = document.querySelector('.gameOverContainer');
  gameOverContainer.className =
    'gameOverContainer animate__animated animate__fadeOut';

  gameOverContainer.addEventListener('animationend', () => {
    gameOverContainer.remove();
    gridContainer.remove();
    startTheGame();
  });
}

export { gridPainter, createGrid, enemyGridEventListener, compHit };

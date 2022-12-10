/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
// const Player = require('./player');

import { startTheGame } from '..';

// Creates the frontPage asking for user name input with event listeners attached to both button and "Enter"
function frontPage() {
  // FrontPage Container
  const frontPageContainer = document.createElement('div');
  frontPageContainer.className = 'frontPage animate__animated animate__zoomIn';
  document.body.appendChild(frontPageContainer);

  // Contains the text content
  const textContent = document.createElement('div');
  textContent.innerHTML = `The battle awaits! <br> What is your name?`;
  frontPageContainer.appendChild(textContent);

  // The input field
  const input = document.createElement('input');
  input.id = 'input';
  frontPageContainer.appendChild(input);

  // The submit button
  const button = document.createElement('button');
  frontPageContainer.appendChild(button);
  button.textContent = 'To the Battle!';

  // Enter button event listener
  input.addEventListener('keydown', bridgeToStartTheGame);

  // Button event listener
  button.addEventListener('click', bridgeToStartTheGame);
}

// Function that removes the frontPage elements and removes eventlisteners.
function bridgeToStartTheGame(e) {
  // remove DOM elements
  const frontPageContainer = document.querySelector('.frontPage');
  const input = document.querySelector('#input');

  // Rejects any key entry (for submit) that is not enter
  if (e instanceof KeyboardEvent && e.keyCode !== 13) {
    return;
  }

  // Enter conifrmation
  if (e.keyCode === 13 && input.value !== '') {
    input.removeEventListener('keydown', bridgeToStartTheGame);
  }

  // If the button is clicked
  if (input.value !== '') {
    frontPageContainer.className =
      'frontPage animate__animated animate__zoomOut';
    frontPageContainer.addEventListener('animationend', () => {
      frontPageContainer.remove();
      startTheGame(input.value);
    });
  }
}

// The preBatttle function where a player can organize their ships
function preBattle(compPlayer, player) {
  // Selects the player grid
  const grid = document.querySelector('.grid1');

  // Button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'buttonContainer';
  grid.appendChild(buttonContainer);

  // Creates a randomizer button ands adds an eventlistener to it.
  const randomizeButton = document.createElement('button');
  buttonContainer.appendChild(randomizeButton);
  randomizeButton.innerText = 'Randomize';
  randomizeButton.className = 'randomizeButton';

  // Event Listener that randomizes the playr board object and calls the gridPainter from DOM.js
  randomizeButton.addEventListener('click', () => {
    player.board.randomizer();
    gridPainter(player.board.getBoard());
  });

  // Creates the start the Battle Button
  const startTheBattleButton = document.createElement('button');
  startTheBattleButton.innerText = 'Start the Battle';
  startTheBattleButton.className = 'startButton';
  buttonContainer.appendChild(startTheBattleButton);

  // Event listener for start the battle & removes them from the DOM.
  startTheBattleButton.addEventListener('click', () => {
    startTheBattleButton.className =
      'startButton animate__animated animate__fadeOut';
    randomizeButton.className =
      'randomizeButton animate__animated animate__fadeOut';
    randomizeButton.addEventListener('animationend', () => {
      buttonContainer.remove();
    });
    startTheBattle(compPlayer, player);
  });
}

// Starts the battle by adding eventlistenrs to the cell of the enemy grid
function startTheBattle(compPlayer, player) {
  enemyGridEventListener(compPlayer, player);
}

// Creastes the grid with gridLoop
function createGrid() {
  const gridContainer = document.createElement('div');
  gridContainer.className = 'gridContainer animate__animated animate__fadeIn';
  document.body.appendChild(gridContainer);

  // Player grid
  const grid1 = document.createElement('div');
  grid1.className = 'grid1';
  gridContainer.appendChild(grid1);
  gridLoop(grid1, 'P');

  // Computer enemy grid
  const grid2 = document.createElement('div');
  grid2.className = 'grid3';
  gridLoop(grid2, 'C');
  gridContainer.appendChild(grid2, 'C');
}

// Creates the grid
function gridLoop(container, typeOfPlayer) {
  for (let i = 0; i < 11; i += 1) {
    const gridRow = document.createElement('div');
    gridRow.className = 'gridRow';

    // If first row
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
      // If first column
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
  // This is to enable hover effect from CSS hence the switch from grid3 to grid2
  const enemyGridClassChange = document.querySelector('.grid3');
  enemyGridClassChange.className = 'grid2';
  const enemyGrid = document.querySelectorAll('.grid2 > *> .gridCell');

  // A listenerforwarded created so removeEventlistener can be added later
  const listenerForwarder = function (e) {
    HitOnClick(e.target, compPlayer, listenerForwarder, player);
  };

  enemyGrid.forEach((cell) => {
    cell.addEventListener('click', listenerForwarder);
  });
}

// Handles hits on the enemy grid
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

export {
  gridPainter,
  createGrid,
  enemyGridEventListener,
  compHit,
  frontPage,
  preBattle,
};

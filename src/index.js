/* eslint-disable no-use-before-define */
import {
  enemyGridEventListener,
  createGrid,
  gridPainter,
  frontPage,
  preBattle,
} from './functions/DOM';
import './style/style.css';
import 'animate.css';

const Player = require('./functions/player');

// Start the game function that calls functions from DOM.js and Player.js. Player.js contains the other submodules.
function startTheGame(name = 'You') {
  // Initializes the player gameboard
  const player = Player(name);
  player.board.randomizer();
  const playerBoard = player.board.getBoard();

  // Initializes the computer
  const compPlayer = Player('Computer');
  compPlayer.board.randomizer();

  // Creates the interactive grid from the DOM.js file
  createGrid();
  gridPainter(playerBoard);
  preBattle(compPlayer, player);
}

// calls frontPage from DOM.js to ask for a name before proceeding
frontPage();

// Exported so it works in the reset() function in the DOM.js module
export { startTheGame };

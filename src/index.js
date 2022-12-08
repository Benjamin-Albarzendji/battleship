import {
  enemyGridEventListener,
  createGrid,
  gridPainter,
} from './functions/DOM';
import './style/style.css';
// const GameboardFactory = require('./functions/GameboardFactory');
const Player = require('./functions/player');

function getName() {


}




function startTheGame(name = "You") {
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
  enemyGridEventListener(compPlayer, player);
}

startTheGame();

// Exported so it works in the reset() function in the DOM.js module
export { startTheGame };

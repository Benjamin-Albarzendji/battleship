/* eslint-disable no-use-before-define */
import {
  enemyGridEventListener,
  createGrid,
  gridPainter,
} from './functions/DOM';
import './style/style.css';
import 'animate.css';
// const GameboardFactory = require('./functions/GameboardFactory');
const Player = require('./functions/player');

function frontPage() {
  // FrontPage Container
  const frontPageContainer = document.createElement('div');
  frontPageContainer.className = 'frontPage animate__animated animate__zoomIn';
  document.body.appendChild(frontPageContainer);

  const textContent = document.createElement('div');
  textContent.innerHTML = `The battle awaits! <br> What is your name?`;
  frontPageContainer.appendChild(textContent);

  const input = document.createElement('input');
  input.id = 'input';
  frontPageContainer.appendChild(input);

  const button = document.createElement('button');
  frontPageContainer.appendChild(button);
  button.textContent = 'To the Battle!';

  // Enter button event listener
  input.addEventListener('keydown', bridgeToStartTheGame);

  // Button event listener
  button.addEventListener('click', bridgeToStartTheGame);
}

function bridgeToStartTheGame(e) {
  const frontPageContainer = document.querySelector('.frontPage');
  const input = document.querySelector('#input');

  if (e instanceof KeyboardEvent && e.keyCode !== 13) {
    return;
  }
  if (e.keyCode === 13 && !input.value !== '') {
    input.removeEventListener('keydown', bridgeToStartTheGame);
  }

  frontPageContainer.className = 'frontPage animate__animated animate__zoomOut';
  frontPageContainer.addEventListener('animationend', () => {
    frontPageContainer.remove();
    startTheGame(input.value);
  });
}

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
}

function startTheBattle(compPlayer, player) {
  enemyGridEventListener(compPlayer, player);
}

frontPage();
// startTheGame();

// Exported so it works in the reset() function in the DOM.js module
export { startTheGame };

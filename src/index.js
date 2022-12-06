import {
  enemyGridEventListener,
  createGrid,
  gridPainter,
  compHit,
} from './functions/DOM';
import './style/style.css';
const GameboardFactory = require('./functions/GameboardFactory');
const Player = require('./functions/player');

const player = Player();
player.board.randomizer();

const compPlayer = Player();
compPlayer.board.randomizer();

const playerBoard = player.board.getBoard();

createGrid();

gridPainter(playerBoard);

enemyGridEventListener(compPlayer, player);



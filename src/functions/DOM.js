/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
// const Player = require('./player');

function createGrid() {
  const gridContainer = document.createElement('div');
  gridContainer.className = 'gridContainer';
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
  for (let i = 0; i < 10; i += 1) {
    const gridRow = document.createElement('div');
    gridRow.className = 'gridRow';
    gridRow.setAttribute('value', i);
    container.appendChild(gridRow);

    for (let j = 0; j < 10; j += 1) {
      const gridCell = document.createElement('div');
      gridCell.className = 'gridCell';
      gridCell.id = `${i}${typeOfPlayer}${j}`;
      gridRow.appendChild(gridCell);
    }
  }
}

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

function enemyGridEventListener(compPlayer, player) {
  const enemyGrid = document.querySelectorAll('.grid2 > *>*');

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

  isGameOver(compPlayer);
  turnSwitcher(compPlayer, player);
}

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

function turnSwitcher(compPlayer, player) {
  compHit(compPlayer.CompSendHit(), player.board.receiveHit);
  isGameOver(player);
}

function isGameOver(board) {
  // TO FIX //
  //   console.log(board.board.gameOver());
}

export { gridPainter, createGrid, enemyGridEventListener, compHit };

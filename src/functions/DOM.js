const Player = require('./player');

function createGrid() {
  const gridContainer = document.createElement('div');
  gridContainer.className = 'gridContainer';
  document.body.appendChild(gridContainer);

  const grid1 = document.createElement('div');
  grid1.className = 'grid1';
  gridContainer.appendChild(grid1);
  gridLoop(grid1);

  const grid2 = document.createElement('div');
  grid2.className = 'grid2';
  gridLoop(grid2);
  gridContainer.appendChild(grid2);
}

function gridLoop(container) {
  for (let i = 0; i < 10; i += 1) {
    const gridRow = document.createElement('div');
    gridRow.className = 'gridRow';
    gridRow.setAttribute('value', i);
    container.appendChild(gridRow);

    for (let j = 0; j < 10; j += 1) {
      const gridCell = document.createElement('div');
      gridCell.className = 'gridCell';
      gridCell.id = `${i} ${j}`;
      gridRow.appendChild(gridCell);
    }
  }
}

function gridPainter(grid) {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (typeof grid[i][j] === 'object') {
        const gridCell = document.getElementById(`${i} ${j}`);
        gridCell.className = 'gridCell ship';
      } else {
        const gridCell = document.getElementById(`${i} ${j}`);
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
  const [row, col] = cell.id.split(' ');
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

  turnSwitcher(compPlayer, player);
}

function compHit(coords, hitConfirmer) {
  const row = coords.x;
  const col = coords.y;
  const cell = document.getElementById(`${row} ${col}`);
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

function hitPainter(row, col, board, alignment) {}

function turnSwitcher(compPlayer, player) {
  compHit(compPlayer.CompSendHit(), player.board.receiveHit);
}

export { gridPainter, createGrid, enemyGridEventListener, compHit };

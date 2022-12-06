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

function enemyGridEventListener(hitConfirmer) {
  const enemyGrid = document.querySelectorAll('.grid2 > *>*');

  const listenerForwarder = function (e) {
    console.log(this);
    HitOnClickListener(e.target, hitConfirmer, listenerForwarder);
  };

  enemyGrid.forEach((cell) => {
    cell.addEventListener('click', listenerForwarder);
  });
}

// function listenerForwarder(e, hitConfirmer){

//     HitOnClickListener(e, hitConfirmer,)
// }

function HitOnClickListener(cell, hitConfirmer, listenerForwarder) {
  const [row, col] = cell.id.split(' ');
  const hitStatus = hitConfirmer(row, col);
  console.log(hitStatus);
  hitStatus === "M" ? cell.className = "gridCellM": cell.className = "gridCellH"
  if (hitStatus === "M") {
    const textDiv = document.createElement("div");
    textDiv.textContent = "."
    cell.appendChild(textDiv)
  }

  cell.removeEventListener('click', listenerForwarder);
}

export { gridPainter, createGrid, enemyGridEventListener };

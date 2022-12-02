const shipFactory = require('./shipFactory');
const GameboardFactory = require('./GameboardFactory');


const PlayerFactory = (name = "Player") => {
    const getName =() => name
    const playerBoard = GameboardFactory()
    playerBoard.gridCreator()


return {board:playerBoard, getName}

}

const player1 = PlayerFactory("Markus")

console.log(player1.getName())
console.log(player1.board.receiveHit(5,5))



module.exports = PlayerFactory
import './style/style.css';
const GameboardFactory =require('./functions/GameboardFactory')
const Player =require('./functions/player')



const Gameboard =GameboardFactory()

Gameboard.gridCreator()
// console.log(Gameboard.shipPlacer(4,5,5))

// console.log(shipFactory(4))





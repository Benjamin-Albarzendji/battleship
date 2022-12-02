import './style/style.css';
import GameboardFactory from './functions/GameboardFactory';
const shipFactory = require('./functions/shipFactory');


const Gameboard =GameboardFactory()

Gameboard.gridCreator()
console.log(Gameboard.shipPlacer(4,5,5))

// console.log(shipFactory(4))





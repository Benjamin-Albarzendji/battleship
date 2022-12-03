const GameboardFactory = require('./GameboardFactory');

const PlayerFactory = (name = 'Player') => {
  const getName = () => name;
  const playerBoard = GameboardFactory();
  playerBoard.gridCreator();

  const sentHits = [];
  const CompSendHit = () => {
    let hitObject = { x: 0, y: 0 };
    let goodToGo = false;
    while (!goodToGo) {
      hitObject = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
      if (!sentHits.includes(hitObject)) {
        goodToGo = true;
      }
    }
    sentHits.push(hitObject);
    return hitObject;
  };

  return { board: playerBoard, getName, CompSendHit };
};

module.exports = PlayerFactory;

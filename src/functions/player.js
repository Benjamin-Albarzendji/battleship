const GameboardFactory = require('./GameboardFactory');

const PlayerFactory = (name = 'Player') => {
  const getName = () => name;

  // Calls the GameboardFactory module to give the player a board
  const playerBoard = GameboardFactory();
  // Creates the data grid
  playerBoard.gridCreator();

  // Container to make sure the computer does not send duplicate hits
  const sentHits = [];
  // The Function that handles computer hits
  const CompSendHit = () => {
    let hitObject = { x: 0, y: 0 };
    let goodToGo = false;
    while (!goodToGo) {
      hitObject = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };

      goodToGo = true;
      let dupeChecker = 0;
      for (let i = 0; i < sentHits.length; i += 1) {
        if (sentHits[i].x === hitObject.x && sentHits[i].y === hitObject.y) {
          dupeChecker += 1;
        }
        dupeChecker === 0 ? (goodToGo = true) : (goodToGo = false);
      }
    }
    sentHits.push(hitObject);
    return hitObject;
  };

  return { board: playerBoard, getName, CompSendHit };
};

module.exports = PlayerFactory;

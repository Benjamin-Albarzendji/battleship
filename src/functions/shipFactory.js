/* eslint-disable no-return-assign */

const shipFactory = (length) => {
  if (length < 1 || length > 4) {
    return false;
  }
  let hits = 0;
  const isSunk = (hits = getHits(), length = getLength()) => hits >= length;
  const hit = () => (hits += 1);
  const getHits = () => hits;
  const getLength = () => length;
  return { isSunk, hit };
};
// export {shipFactory}
module.exports = shipFactory;

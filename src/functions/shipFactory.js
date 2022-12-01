/* eslint-disable no-return-assign */

const shipFactory = (length) => {
  let hits = 0;

  const isSunk = (hits = getHits(), length = getLength()) => hits >= length;
  const hit = () => (hits += 1);
  const getHits = () => hits;
  const getLength = () => length;
  return { isSunk, hit };
};



module.exports = shipFactory;



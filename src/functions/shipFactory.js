/* eslint-disable no-return-assign */

// Creates the ships
const shipFactory = (length) => {
  if (length < 1 || length > 4) {
    return false;
  }
  let alignment = 'notSet';
  let hits = 0;
  const isSunk = (hits = getHits(), length = getLength()) => hits >= length;
  const hit = () => (hits += 1);
  const getHits = () => hits;
  const getLength = () => length;
  const setAlignment = (align) => (alignment = align);
  const getAlignment = () => alignment;
  return { isSunk, hit, setAlignment, getAlignment };
};

module.exports = shipFactory;

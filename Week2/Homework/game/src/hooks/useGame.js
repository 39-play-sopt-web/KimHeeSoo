import { useState } from 'react';
import { LEVELS } from '../constants/game.js'
import { range, shuffle } from '../utils/shuffle.js';

const createGame = (level) => {
    const { size } = LEVELS[level];
    const cellCount = size * size;
    const lastNumber = cellCount * 2;

    return {
    cells: shuffle(range(1, cellCount)),
    pool: shuffle(range(cellCount + 1, lastNumber)),
    next: 1,
    lastNumber,
    size,
  };
};

const useGame = ({ level, onStart, onFinish }) => {
  const [game, setGame] = useState(() => createGame(level));
  const { cells, pool, next, lastNumber, size } = game;

  const isDone = next > lastNumber;

  const handleCellClick = (index) => {
    if (isDone || cells[index] !== next) return;
    if (next === 1) onStart();
    if (next === lastNumber) onFinish();

    const nextCells = [...cells];
    nextCells[index] = pool.length > 0 ? pool[pool.length - 1] : null;

    setGame({
      ...game,
      cells: nextCells,
      pool: pool.slice(0, -1),
      next: next + 1,
    });
  };

  return { cells, size, next, lastNumber, isDone, handleCellClick };
};

export default useGame;
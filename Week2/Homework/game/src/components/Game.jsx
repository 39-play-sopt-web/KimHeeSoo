import { useState } from 'react';
import { LEVELS } from '../constants/game.js';
import { range, shuffle } from '../utils/shuffle.js';
import * as styles from './Game.css.js';

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

const Game = ({ level, onStart, onFinish }) => {
  const [game, setGame] = useState(() => createGame(level));
  const { cells, pool, next, lastNumber, size } = game;
  const isDone = next > lastNumber;

  const handleCellClick = (index) => {
    if (cells[index] !== next) return;

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

  return (
    <section className={styles.container} aria-label="게임판">
      <p className={styles.nextNumber}>
        다음 숫자
        <strong className={styles.nextValue}>{isDone ? '완료!' : next}</strong>
        <span className={styles.progress}>
          ({isDone ? lastNumber : next} / {lastNumber})
        </span>
      </p>

      <div className={styles.board} style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {cells.map((value, index) => (
          <button
            key={index}
            type="button"
            className={styles.cell({ empty: value === null, size })}
            disabled={value === null}
            aria-label={value === null ? '빈 칸' : `${value}`}
            onClick={() => handleCellClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Game;
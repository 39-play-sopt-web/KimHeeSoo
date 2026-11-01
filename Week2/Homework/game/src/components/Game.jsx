import useGame from '../hooks/useGame.js';
import GameBoard from './GameBoard.jsx';
import * as styles from './Game.css.js';

const Game = ({ level, onStart, onFinish }) => {
  const { cells, size, next, lastNumber, isDone, handleCellClick } = useGame({
    level,
    onStart,
    onFinish,
  });

  return (
    <section className={styles.container} aria-label="게임판">
      <p className={styles.nextNumber} aria-live="polite">
        다음 숫자
        <strong className={styles.nextValue}>{isDone ? '완료!' : next}</strong>
        <span className={styles.progress}>
          ({isDone ? lastNumber : next} / {lastNumber}) 
        </span>
      </p>

      <GameBoard cells={cells} size={size} onCellClick={handleCellClick} />
    </section>
  );
};

export default Game;
import * as styles from './Game.css.js';

const GameBoard = ({ cells, size, onCellClick }) => {
  return (
    <div
      className={styles.board}
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {cells.map((value, index) => (
        <button
          key={index}
          type="button"
          className={styles.cell({ empty: value === null, size })}
          disabled={value === null}
          aria-label={value === null ? '빈 칸' : `${value}`}
          onClick={() => onCellClick(index)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
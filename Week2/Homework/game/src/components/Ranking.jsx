import { useState } from 'react';
import { deleteAllRecords, loadRecords } from '../utils/storage.js';
import { formatDate } from '../utils/format.js';
import * as styles from './Ranking.css.js';

const Ranking = () => {
  const [records, setRecords] = useState(loadRecords);
  const sortedRecords = [...records].sort((a, b) => a.time - b.time);

  const handleReset = () => {
    deleteAllRecords();
    setRecords([]);
  };

  return (
    <section className={styles.container} aria-label="랭킹 보드">
      <div className={styles.titleRow}>
        <h2 className={styles.title}>랭킹</h2>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          초기화
        </button>
      </div>

      {sortedRecords.length === 0 ? (
        <p className={styles.empty}>아직 기록이 없어요.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>순위</th>
              <th className={styles.th}>레벨</th>
              <th className={styles.th}>플레이 시간</th>
              <th className={styles.th}>기록 시각</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map(({ id, level, time, playedAt }, index) => (
              <tr key={id}>
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>Level {level}</td>
                <td className={styles.td}>{Number(time).toFixed(2)}초</td>
                <td className={styles.td}>{formatDate(playedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Ranking;
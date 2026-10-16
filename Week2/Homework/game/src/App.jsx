import { useState } from 'react';
import Header from './components/Header.jsx';
import Game from './components/Game.jsx';
import Ranking from './components/Ranking.jsx';
import Modal from './components/Modal.jsx';
import { DEFAULT_LEVEL, TABS } from './constants/game.js';
import { useTimer } from './hooks/useTimer.js';
import { saveRecord } from './utils/storage.js';
import { formatSeconds } from './utils/format.js';
import * as styles from './App.css.js';

const App = () => {
  const [tab, setTab] = useState(TABS.GAME);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState(null);
  const timer = useTimer();

  const handleTabChange = (nextTab) => {
    timer.reset();
    setTab(nextTab);
  };

  const handleLevelChange = (nextLevel) => {
    timer.reset();
    setLevel(nextLevel);
  };

  const handleFinish = () => {
    const finalTime = timer.stop();
    const seconds = formatSeconds(finalTime);

    saveRecord({
      id: crypto.randomUUID(),
      playedAt: new Date().toISOString(),
      level,
      time: Number(seconds),
    });

    setResult(seconds);
  };

  const handleConfirm = () => {
    setResult(null);
    timer.reset();
    setRound(round + 1);
  };

  return (
    <div className={styles.layout}>
      <Header
        tab={tab}
        onTabChange={handleTabChange}
        level={level}
        onLevelChange={handleLevelChange}
        elapsed={timer.elapsed}
      />
      <main className={styles.main}>
        {tab === TABS.GAME ? (
          <Game
            key={`${level}-${round}`}
            level={level}
            onStart={timer.start}
            onFinish={handleFinish}
          />
        ) : (
          <Ranking />
        )}
      </main>

      {result && <Modal level={level} time={result} onConfirm={handleConfirm} />}
    </div>
  );
};

export default App;
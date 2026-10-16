import { useState } from 'react';
import Header from './components/Header.jsx';
import Game from './components/Game.jsx';
import Ranking from './components/Ranking.jsx';
import { DEFAULT_LEVEL, TABS } from './constants/game.js';
import { useTimer } from './hooks/useTimer.js';
import { saveRecord } from './utils/storage.js';
import { formatSeconds } from './utils/format.js';
import * as styles from './App.css.js';

function App() {
  const [tab, setTab] = useState(TABS.GAME);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const timer = useTimer();

  const handleTabChange = (nextTab) => {
    time.reset();
    setTab(nextTab);
  };

  const handleLevelChange = (nextLevel) => {
    timer.reset();
    setLevel(nextLevel);
  };

  const handleFinish = () => {
    const playtime = timer.stop();
    const seconds = formatSeconds(playTime);

    saveRecord({
      id: crypto.randomUUID(),
      playedAt: new Date().toISOString(),
      level,
      time: Number(seconds),
    });

    alert(`게임 종료! 걸린 시간 : ${seconds}초`);
    timer.reset();
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
            key={level}
            level={level}
            onStart={timer.start} 
            onFinish={handleFinish}
          />
        ) : (
          <Ranking />
        )}
      </main>
    </div>
  );
}

export default App;
import { style } from '@vanilla-extract/css';
import { LEVELS, LEVEL_OPTIONS, TABS } from '../constants/game.js';
import { formatSeconds } from '../utils/format.js';
import * as styles from './Header.css.js'; 

const MENUS = [
    {value: TABS.GAME, label: '게임' },
    {value: TABS.RANKING, label: '랭킹'},
];

const Header = ({ tab, onTabChange, level, onLevelChange, elapsed }) => {
    return (
        <header className={styles.header}> {} {/* 좌측 */}
         <h1 className={styles.title}> {}
          <span className={styles.logo} aria-hidden="true"> /* 장식용 로고는 스크린 리더가 읽지 X */
           1 2
           <br />3 4
           </span>
           숫자 클릭 게임
        </h1> {}

        <nav className={styles.nav} aria-label='메뉴'>  {/* 중앙 */}
            {MENUS.map(({ value, label }) => (
                <button
                key={value}
                type="button"
                className={styles.menuButton({ active: tab === value })}
                aria-current={tab === value ? 'page' : undefined} /* 스크린 리더에 현재 메뉴 알림 */
                onClick={() => onTabChange(value)} // onTabChange: 탭 변경 함수
               >
                {label}
               </button>
            ))}
            </nav>
            {}
            {tab == TABS.GAME && ( /* 우측 */
                <div className={styles.right}>
                    {}
                    <select 
                     className={styles.select}
                     aria-label="레벨 선택"
                     value={level}
                     onChange={(e) => onLevelChange(Number(e.target.value))} /* select의 value는 문자열 -> Number 변환 */
                     >
                      {LEVEL_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            Level {option} ({LEVELS[option].size}x{LEVELS[option].size}) 
                        </option>
                      ))} 
                     </select>

                     {}
                     {}
                     <span className={styles.timer} aria-live='off'> {/* 계속 바뀌는 값을 스크린 리더가 계속 읽지 못하도록 */}
                        {formatSeconds(elapsed)}초
                     </span>
                    </div>
                  )}
                </header>
    );
};

export default Header;

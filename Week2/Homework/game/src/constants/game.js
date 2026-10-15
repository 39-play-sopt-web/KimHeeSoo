export const LEVELS = {
  1: { size: 3 },
};

export const LEVEL_OPTIONS = Object.keys(LEVELS).map(Number);

export const DEFAULT_LEVEL = LEVEL_OPTIONS[0];

export const TABS = {
  GAME: 'game',
  RANKING: 'ranking',
};

export const STORAGE_KEY = 'one-to-fifty-records'; // localStorage에 기록을 저장할 때 사용
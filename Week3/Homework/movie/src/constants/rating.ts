export const RATING_OPTIONS = [
    { key: 'all', label: '전체', min: 0, max: 10 },
    { key: '9', label: '9점 이상', min: 9, max: 10 },
    { key: '8', label: '8 ~ 9점', min: 8, max: 8.99 },
    { key: '7', label: '7 ~ 8점', min: 7, max: 7.99 },
    { key: '6', label: '6 ~ 7점', min: 6, max: 6.99 },
    { key: 'under6', label: '6점 미만', min: 0, max: 5.99 },
] as const;

export type RatingOption = (typeof RATING_OPTIONS)[number];

export type RatingKey = RatingOption['key'];

export const DEFAULT_RATING_KEY: RatingKey = 'all';

export const findRatingOption = (key: RatingKey) : RatingOption =>
    RATING_OPTIONS.find((option)=> option.key === key) ?? RATING_OPTIONS[0];
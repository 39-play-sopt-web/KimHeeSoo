const EMPTY = '정보 없음';

export const formatReleaseDate = (date: string): string => {
    if (!date) return '개봉일 미정';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric'});
};

export const formatRating = (rating: number): string => rating.toFixed(1);

export const formatRuntime = (minutes: number | null): string => {
    if (!minutes) return EMPTY;
     
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;

    if (hours == 0) return `${rest}분`;
    return rest === 0 ? `${hours}시간` : `${hours}시간 ${rest}분`;
};

export const formatCount = (count: number): string => count.toLocaleString('ko-KR');

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits:0,
});

export const formatMoney = (amount: number): string =>
    amount > 0 ? usdFormatter.format(amount) : EMPTY;

const languageNames = (() => {
    try {
        return new Intl.DisplayNames(['ko'], { type: 'language' });
    } catch {
        return null;
    }
})();

export const formatLanguage = (code: string): string => {
    if(!code) return EMPTY;
    try {
        return languageNames?.of(code) ?? code;
    } catch {
        return code;
    }
};

export const joinOrEmpty = (items: string[]): string =>
    items.length > 0 ? items.join(', ') : EMPTY;
export const theme = {
    colors: {
        background: '#14161b',
        surface: '#24262d',
        surfaceHover: '#2e3038',
        border: '#2a2d35',

        primary: '#5eead4',
        primaryText: '#0f172a',
        primarySoft: 'rgba(94, 234, 212, 0.12)',

        text: '#f4f4f5',
        textSub: '#a1a1aa',
        textMuted: '#71717a',
    },

    radius: {
        sm: '8px',
        md: '12px',
        full: '999px',
    },

    shadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.3)',
        cardHover: '0 12px 28px rgba(0, 0, 0, 0.5)',
    },

    fonts: {
        base: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif",
    },

    media: {
        tablet: '@media (max-width: 1024px)',
        mobile: '@media )max-width: 640px)',
    },
} as const;

export type AppTheme = typeof theme;
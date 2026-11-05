export const theme = {
    color: {
        background: "#121212",
        surface: "#1e1e1e",
        surfaceHover: "#262626",
        border: "#2c2c2c",
        text: "#ededed",
        textSub: "#a1a1aa",
        primary: "#f5a524",
        primaryHover: "#e0941b",
        onPrimary: "#121212",
        danger: "#f87171",
    },
    radius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
    },
    layout: {
        maxwidth: "860px",
    },
    transition: "0.2s ease",
} as const;

export type Theme = typeof theme;
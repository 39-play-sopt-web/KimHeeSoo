import { createTheme } from '@vanilla-extract/css';

const tokens = {
  color: {
    backgroundStart: '#b4f1ff',
    backgroundEnd: '#7ff3c4', 
    surface: '#ffffff', 
    surfaceDim: 'rgba(255, 255, 255, 0.35)', // 
    mint: '#5eedc0', 
    mintHover: '#c9f9ea', 
    logo: '#4a7fd6',
    text: '#1a1d24', 
    subText: '#5f6673', 
    onAccent: '#ffffff',
    border: '#e3e8ee',
    danger: '#e5484d', 
  },
  radius: {
    sm: '0.5rem',
    md: '0.625rem',
    lg: '1rem',
  },
  font: {
    size: {
      display: '2rem',
      title: '1.25rem',
      body: '1rem', 
      button: '1rem',
      caption: '0.875rem', 
      logo: '0.45rem', 
    },
    
    weight: {
      regular: '400', 
      semibold: '600', 
      bold: '700', 
      extrabold: '800', 
    },
},
  shadow: {
    header: '0 1px 4px rgba(26, 29, 36, 0.06)',
    card: '0 2px 8px rgba(26, 29, 36, 0.06)', 
    cardHover: '0 8px 20px rgba(26, 29, 36, 0.12)', 
  },
};

export const [themeClass, vars] = createTheme(tokens); // 코드리뷰 적극 반영하여 theme 변수 관리
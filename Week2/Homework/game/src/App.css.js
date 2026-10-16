import { style } from '@vanilla-extract/css';
import { vars } from './styles/theme.css';

export const layout = style ({
    minHeight: '100vh',
    background: `linear-gradient(160deg, ${vars.color.backgroungStart} 0%, ${vars.color.backgroundEnd} 100%)`,

});

export const main = style ({
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 1rem',
});


import { style } from '@vanilla-extract/css';
import { vars } from './styles/theme.css';

export const layout = style ({
    minHeight: '100vh',
});

export const main = style ({
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 1rem',
});


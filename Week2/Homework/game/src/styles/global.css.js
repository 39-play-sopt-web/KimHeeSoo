import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css.js';

globalStyle('body', {
  minHeight: '100vh',
  background: `linear-gradient(160deg, ${vars.color.backgroundStart}, ${vars.color.backgroundEnd})`,
  color: vars.color.text,
});
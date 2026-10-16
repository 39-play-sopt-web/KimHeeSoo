import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css.js';


export const overlay = style({
  position: 'fixed', 
  inset: 0, 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(26, 29, 36, 0.45)',
});


export const card = style({
  width: '26rem',
  padding: '2.5rem',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  textAlign: 'center',
});

export const title = style({
  fontSize: vars.font.size.title,
  fontWeight: vars.font.weight.extrabold,
});


export const time = style({
  margin: '1rem 0 1.75rem',
  fontSize: '2.5rem',
  fontWeight: vars.font.weight.extrabold,
});

export const button = style({
  width: '100%',
  padding: '0.875rem',
  border: 'none',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.mint,
  fontSize: vars.font.size.button,
  fontWeight: vars.font.weight.bold,
  cursor: 'pointer',
});
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../styles/theme.css.js';

export const header = style({
    display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  minHeight: '4.75rem',
  padding: '1rem 2.5rem',
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.header,
});

export const title = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: vars.font.size.title,
  fontWeight: vars.font.weight.extrabold,
});

export const logo = style({
  fontSize: '1.5rem',
  lineHeight: 1,
});

export const nav = style({
  display: 'flex',
  gap: '0.75rem',
});

export const menuButton = recipe({
  base: {
    padding: '0.5rem 1.25rem',
    border: 'none',
    borderRadius: vars.radius.md,
    fontSize: vars.font.size.button,
    fontWeight: vars.font.weight.bold,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease', // 색이 부드럽게 바뀜
  },
  variants: {
    active: {
      true: { backgroundColor: vars.color.mint, color: vars.color.text },
      
      false: {
        backgroundColor: 'transparent',
        color: vars.color.subText,
        ':hover': { backgroundColor: vars.color.mintHover },
      },
    },
  },
});

export const right = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end', 
  gap: '1rem',
});

export const select = style({
  padding: '0.5rem 0.75rem',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surface,
  fontSize: vars.font.size.body,
  cursor: 'pointer',
});

export const timer = style({
  minWidth: '6rem',
  padding: '0.5rem 1rem',
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.mint,
  fontSize: vars.font.size.title,
  fontWeight: vars.font.weight.extrabold,
  fontVariantNumeric: 'tabular-nums', //숫자 글자들의 가로 폭을 모두 똑같이 맞추도록 구현
});


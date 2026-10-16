import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../styles/theme.css.js';

export const container = style({
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',
  gap: '2rem',
});


export const nextNumber = style({
  display: 'flex',
  alignItems: 'baseline', // 크기가 다른 글자들의 밑줄 맞춤
  gap: '0.5rem',
  fontSize: vars.font.size.title,
  color: vars.color.subText,
});

// 크게 강조되는 숫자 또는 "완료!"
export const nextValue = style({
  fontSize: vars.font.size.display,
  fontWeight: vars.font.weight.extrabold,
  color: vars.color.text,
});

export const progress = style({
  fontVariantNumeric: 'tabular-nums', // 숫자 폭 고정 
});


export const board = style({
  display: 'grid',
  gap: '0.875rem',
});

export const cell = recipe({
  base: {
    borderRadius: vars.radius.sm,
    fontSize: vars.font.size.display,
    fontWeight: vars.font.weight.extrabold,
    color: vars.color.text,
    transition: 'transform 0.1s, box-shadow 0.15s, background-color 0.1s',
  },
  variants: {
    empty: {
      false: {
        border: `1px solid ${vars.color.border}`,
        backgroundColor: vars.color.surface,
        boxShadow: vars.shadow.card,
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: vars.shadow.cardHover,
        },
        ':active': {
          transform: 'scale(0.92)',
          backgroundColor: vars.color.mintHover,
          boxShadow: 'none',
        },
      },
      true: {
        border: '1px dashed rgba(255, 255, 255, 0.7)',
        backgroundColor: vars.color.surfaceDim,
        cursor: 'default',
      },
    },
    size: {
      3: { width: '9rem', height: '9rem' },
      4: { width: '7rem', height: '7rem' },
      5: { width: '5.75rem', height: '5.75rem' },
    },
  },
});
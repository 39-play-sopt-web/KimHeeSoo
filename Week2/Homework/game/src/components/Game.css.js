import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../styles/theme.css.js';

export const container = style ({
    display: 'flex',
    alignItems: 'baseline', // 크기가 다른 글자들의 밑선 맞추기
    gap: '0.5rem',
    fontSize: vars.font.size.title,
    color: vars.color.subText,
});

export const nextNumber = style ({
    fontSize: vars.font.size.display,
    fontWeight: vars.font.weight.extrabold,
    color: vars.color.text,
});

export const progress = style ({
    fontVariantNumeric: 'tabular-nums', // 숫자 폭 고정   
})

export const board = style({
    display : 'grid',
    gap: '0.875rem',
});

export const cell = recipe({
    base: {
        width: '9rem',
        height: '9rem',
        border: '1px solid ${vars.color.border}',
        borderRadius: vars.radius.sm,
        fontSize: vars.font.size.display,
        fontweight: vars.font.weight.extrabold,
    },
    variants: {
        empty: {
            false: { // 숫자가 있는 칸
                backgroundColor: vars.color.surface,
                boxShadow: vars.shadow.card,
                cursor: 'pointer',
                transition: 'transition 0.15 ease, box-shadow 0.15s ease',
                ':hover': {
                    transfrom: 'translateY(-2px)',
                    boxShadow: vars.shadow.cardHover,
                },
            },
        true: { // 빈 칸
            backgroundColor: vars.color.srfaceDim,
            borderColor: 'transparent',
            cursor: 'default',
        },
      },
    },
});
import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css.js';

export const container = style ({
    width: '100%',
    maxWidth: '45rem',
    border: `1px solid ${vars.color.border}`,
    padding: '1.5rem',
    borderRadius:vars.radius.lg,
    backgroundColor: vars.color.surface,
    boxShadow: vars.shadow.card,
});

export const titleRow = style ({
    display: 'flex',
    alignitems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
});

export const resetButtion = style({
    padding: '0.5rem 1rem',
    border: `1px solid ${vars.color.danger}`,
    borderRadius: vars.radius.sm,
    backgroundColor: 'transparent',
    color: vars.color.danger,
    fontSize: vars.font.size.button,
    fontWeight: vars.font.weight.semibold,
    cursor: 'pointer',
    ':hover' : { backgroundColor: vars.color.danger, color: vars.color.onAccent }    
});

export const empty = style({
    padding: '3rem 0',
    textAlign: 'center',
    color: vars.color.subText,
});

export const table = style({
    width: '100%',
    borderCollapse:  'collapse',
    textAlign: 'center',
});

export const th = style ({
    padding: '0.75rem',
    borderBottom: `2px solid ${vars.color.border}`,
    fontSize: vars.font.size.caption,
    fontWeight: vars.font.weight.semibold,
    color: vars.color.subText,
});

export const td = style({
     padding: '0.75rem',
    borderBottom: `1px solid ${vars.color.border}`,
    fontSize: vars.font.size.body,
    fontWeight: vars.font.weight.regular,
    fontVariantNumeric: 'tabular-nums',
});


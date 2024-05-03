import { style } from '@vanilla-extract/css'
import { flex } from '@/styles/common.css'
import { vars } from '@/styles/vars.css'

export const iconButtonBox = style({
  position: 'relative',
})

export const iconButton = style({
  position: 'relative',
  width: 'fit-content',
})

export const modalBackdrop = style({
  position: 'absolute',
  right: 0,
  top: '100%',
  backgroundColor: vars.colors.white,
  boxShadow: vars.boxShadow['2x'],
  borderRadius: vars.borderRadius['1x'],
  padding: vars.space['1x'],
  zIndex: 100,
});

export const modalTitle = style({
  fontWeight: 'bold',
})

export const modalContent = style({
  width: '100%', 
  padding: vars.space['1x'],
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
});

export const closeBtnBox = style([
  flex({
    direction: 'row',
    align: 'center',
    justify: 'between',
  }),
  {
    width: '100%',
  }
]);

export const closeButton = style({
  cursor: 'pointer',
})
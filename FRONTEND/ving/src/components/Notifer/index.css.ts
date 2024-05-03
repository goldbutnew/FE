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
  borderRadius: vars.borderRadius['1x'],
  boxShadow: vars.boxShadow['2x'],
  zIndex: 100,
});

export const modalTitle = style({
  fontWeight: 'bold',
})

export const modalContent = style({
  borderRadius: '10px',
  width: '100%', 
  padding: vars.space['2x'],
  boxSizing: 'border-box' 
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
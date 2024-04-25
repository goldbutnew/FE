import { style } from '@vanilla-extract/css'
import { flex } from '@/styles/common.css'
import { vars } from '@/styles/vars.css'

export const modalBackdrop = style({
  position: 'fixed',
  left: 580,
  top: 40,
  backgroundColor: vars.colors.white,
  borderRadius: vars.borderRadius['1x'],
  zIndex: 1000, 
  boxShadow: `0 2px 4px ${vars.colors.gray}`,
});

export const modalTitle = style({
  fontWeight: 'bold',
})

export const modalContent = style({
  borderRadius: '10px',
  width: 'auto', 
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
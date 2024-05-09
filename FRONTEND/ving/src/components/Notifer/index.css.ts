import { style } from '@vanilla-extract/css'
import { flex, line, plainButton } from '@/styles/common.css'
import { vars } from '@/styles/vars.css'
import { bold } from '@/styles/fonts.css'
import { betweenWrapper, columnWrapper } from '@/styles/wrapper.css'
import { rotateAnimation } from '@/styles/animation.css'

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

export const modalTitleBox = style([
  betweenWrapper,
  {
    width: '100%',
  }
]);

export const modalTitle = style([
  bold,
  {
  }
])

export const notiferRefreshButton = style([
  plainButton,
  columnWrapper,
  {
  }
])

export const modalContent = style({
  width: '100%', 
  minWidth: '300px',
  padding: vars.space['1x'],
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
});

export const boldHr = style({
  margin: `${vars.space['1x']} 0`,
  padding: 0,
  border: 'none',
  borderBottom: `3px solid ${vars.colors.lightGray}`,
})

export const myAlarmItem = style({
  display: 'block',
  fontSize: vars.fontSize['0.75x']
})
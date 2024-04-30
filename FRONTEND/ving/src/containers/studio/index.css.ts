import { plainButton } from '@/styles/common.css'
import { vars } from '@/styles/vars.css'
import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
})

export const sideMenuContainer = style({
  position: 'sticky',
  minWidth: 200,
  background: vars.colors.lightGray,
  top: 0,
  bottom: 0,
  height: '100vh',
  padding: `${vars.space['8x']} ${vars.space['1x']} ${vars.space['1x']} ${vars.space['1x']}`,
})

export const menuItem = style([
  plainButton,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: `0 0 0 ${vars.space['1.5x']}`,
    height: '50px',
    ':hover': {
      backgroundColor: vars.colors.darkGray,
      color: vars.colors.white,
      borderRadius: vars.borderRadius['0.5x']
    },
  }
])

export const content = style({
  flex: 1,
  padding: '0px 20px 20px 20px',
})

export const card = style({
  background: vars.colors.white,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: vars.borderRadius['0.5x'],
  padding: 16,
  margin: '0px 0px 16px 0',
})

export const stats = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 16px',
  alignItems: 'center',
})

export const statItem = style({
  textAlign: 'center',
})

export const cardContainer = style({
  backgroundColor: vars.colors.white,
  borderRadius: vars.borderRadius['1x'],
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  padding: 20,
  maxWidth: 400, // adjust as needed
  margin: 20,
})

export const cardTitle = style({
  fontSize: vars.fontSize['2x'],
  margin: '0px 0px 10px 0px',
})

// export const letStreaming = style({
//   fontSize: vars.fontSize['2x'],
//   margin: '10px 0px 0px 0px',
// })

export const cardContent = style({
  lineHeight: vars.lineHeight['2x'],
  color: '#333',
  marginBottom: '0px 0px 20px 0px',
})
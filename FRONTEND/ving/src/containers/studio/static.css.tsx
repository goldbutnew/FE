import { vars } from '@/styles/vars.css'
import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
})

export const sidebar = style({
  minWidth: 200,
  background: vars.colors.lightGray,
  height: '100vh',
  padding: 20,
  boxSizing: 'border-box',
})

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

export const navItem = style({
  marginBottom: '1rem',
  cursor: 'pointer',
  ':hover': {
    color: vars.colors.darkGray,
  },
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
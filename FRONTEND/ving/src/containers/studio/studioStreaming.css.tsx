import { vars } from '@/styles/vars.css'
import { style } from '@vanilla-extract/css'

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
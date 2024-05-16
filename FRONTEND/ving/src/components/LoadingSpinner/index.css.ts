import { vars } from '@/styles/vars.css'
import { style, keyframes } from '@vanilla-extract/css'

const bounce = keyframes({
  '0%, 100%': {
    transform: 'scale(1)',
  },
  '50%': {
    transform: 'scale(1.5)',
    opacity: '85%'
  },
})

export const spinner = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20vh',
})

export const dot = style({
  width: 12,
  height: 12,
  margin: `0 ${vars.space['0.5x']}`,
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.colors.gray,
  animation: `${bounce} 0.6s infinite alternate`,
  selectors: {
    '&:nth-child(1)': {
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      animationDelay: '0.2s',
    },
    '&:nth-child(3)': {
      animationDelay: '0.4s',
    },
  },
})
import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css'

export const container = style({
  backgroundColor: vars.colors.white,
  display: 'flex',
  alignItems: 'center',
  height: 50,
  padding: `0 ${vars.space['1x']} 0 ${vars.space['1x']}`,
  boxShadow: `0 2px 4px ${vars.colors.gray}`,
})

export const logo = style({
  width: 'auto',
  height: 32,
})
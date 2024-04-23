import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css'

export const container = style({
  backgroundColor: vars.colors.white,
  display: 'flex',
  alignItems: 'center',
  height: 50,
  boxShadow: `0 2px 4px ${vars.colors.gray}`,
})
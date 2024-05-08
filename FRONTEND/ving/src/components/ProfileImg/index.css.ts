import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'

export const ProfileImage = style({
  width: 80,
  height: 80, 
  borderRadius: vars.borderRadius.full,
  border: `2.5px solid ${vars.colors.black}`
})
import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'
import { columnbox } from '@/styles/box.css'

export const ProfileImage = style([
  columnbox,
  { 
    borderRadius: vars.borderRadius.full,
    border: `2px solid ${vars.colors.black}`,
  }
])
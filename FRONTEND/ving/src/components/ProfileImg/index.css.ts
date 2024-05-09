import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'
import { columnWrapper } from '@/styles/wrapper.css'

export const ProfileImage = style([
  columnWrapper,
  { 
    borderRadius: vars.borderRadius.full,
    border: `2px solid ${vars.colors.black}`,
  }
])
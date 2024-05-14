import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'

export const container = style({
  flexGrow: 1,
  padding: `${vars.space['10x']} ${vars.space['10x']} 0 ${vars.space['10x']}`,
})


export const videoContainer = style({
  flexGrow: 1,
  padding: `50px 0 0 0`,
})
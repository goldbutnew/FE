import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'
import { endBox } from '@/styles/box.css'

export const chatBox = style({
  height: '100%',
  overflow: 'auto',
})

export const InputBox = style({
  width: '100%',
  backgroundColor: vars.colors.white,
  zIndex: 3001,
})

export const buttonContainer = style([
  endBox,
  {
    width: "100%",
    margin: `${vars.space['0.5x']} 0 0 0`
  }
])

export const emojiPicker = style({
  width: '100%',
  margin: `0 0 ${vars.space['0.5x']} 0`
})
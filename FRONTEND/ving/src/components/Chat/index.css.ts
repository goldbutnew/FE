import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'
import { betweenBox, defaultBox, endBox, rowbox } from '@/styles/box.css'

export const chatBox = style({
  height: '100%',
  overflow: 'auto',
})

export const InputBox = style({
  width: '100%',
  backgroundColor: vars.colors.white,
  zIndex: 3001,
})

export const sendButtonBox = style([
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

// chatProfile.tsx
export const dateBox = style({
  margin: `0 0 0 ${vars.space['0.5x']}`,
  width: '100%',
  fontSize: vars.fontSize['1.5x'],
  color: vars.colors.darkGray,
})


// donation.tsx
export const myChoco = style({

})

export const selectedChocoBox = style([
  defaultBox,
  {
    color: vars.colors.black,
    backgroundColor: vars.colors.lightGray,
    borderRadius: vars.borderRadius['1x'],
    margin: `0 0 ${vars.space['0.5x']} 0`,
    padding: vars.space['0.5x']
    // padding: `0 ${vars.space['0.5x']} 0 ${vars.space['0.5x']}`,
  }
])

export const buttonGroup = style([
  betweenBox
])
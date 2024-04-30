import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'
import { betweenBox, defaultBox, endBox, rowbox } from '@/styles/box.css'
import { space } from 'postcss/lib/list'
import { bold } from '@/styles/fonts.css'
import { plainButton } from '@/styles/common.css'

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = Math.floor(Math.random() * 10) + 80
  const lightness = Math.floor(Math.random() * 20) + 70
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

export const topContainer = style({
  position: 'relative'
})

export const chatBox = style({
  width: '100%',
  height: '100%',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
})

export const chatItem = style({
  fontSize: vars.fontSize['0.75x'],
})

export const chatNickname = style([
  bold,
  plainButton,
  {
    color: getRandomColor()
  }
])

export const inputBox = style({
  width: '100%',
})

export const emojiBox = style({
  margin: `0 0 ${vars.space['1x']} 0`
})

export const sendButtonBox = style([
  betweenBox,
  {
    width: "100%",
    margin: `${vars.space['1x']} 0 0 0`
  }
])

export const emojiPicker = style({
  display: 'block',
  width: '100%',
  margin: `0 0 ${vars.space['0.5x']} 0`
})

// chatProfile.tsx
export const dateBox = style({
  margin: `0 0 0 ${vars.space['0.5x']}`,
  width: '100%',
  fontSize: vars.fontSize['0.5x'],
  color: vars.colors.darkGray,
})


// donation.tsx
export const myChoco = style({

})

export const selectedChocoBox = style([
  rowbox,
  {
    color: vars.colors.black,
    backgroundColor: vars.colors.lightGray,
    borderRadius: vars.borderRadius['1x'],
    margin: `0 0 ${vars.space['1x']} 0`,
    padding: vars.space['0.5x']
    // padding: `0 ${vars.space['0.5x']} 0 ${vars.space['0.5x']}`,
  }
])

export const chocoInputBox = style({
  width: '100%',
  margin: `0 0 0 ${vars.space['0.5x']}`
})

export const donationInputBox = style([
  defaultBox,
  {
    width: '100%',
    padding: vars.space['2x'],
    backgroundColor: vars.colors.darkGray,
    borderRadius: vars.borderRadius['1x'],
    zIndex: 3001,
  }
])

export const buttonGroup = style([
  betweenBox,
  {
    padding: `0 0 ${vars.space['0.5x']} 0`,
  }
])

export const warningBox = style([
  rowbox,
  {
    color: vars.colors.red,
    fontSize: vars.fontSize['0.5x'],
  }
])

export const toggleBox = style({
})

export const donatorName = style({
  color: vars.colors.white,
  margin: `0 0 ${vars.space['1x']} 0`,
})

export const donationEmojiPicker = style({
  position: 'absolute', 
  zIndex: 3001, 
  width: '101%',
  bottom: '65%', 
  left: '50%',
  transform: 'translate(-50%, 50%)',
  margin: `0 0 ${vars.space['0.5x']} 0`,
});

export const donationSendButtonBox = style([
  endBox,
  {
    width: "100%",
    margin: `${vars.space['1x']} 0 0 0`
  }
])

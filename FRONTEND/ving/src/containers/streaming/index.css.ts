import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css';
import { bold } from '@/styles/fonts.css';
import { betweenBox, columnbox, endBox, rowbox, startBox } from '@/styles/box.css';

export const contentContainer = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
});


// UserStreaming.tsx
export const container = style({
  flexGrow: 1,
})



export const videoPlayer = style({
  width: "100%",
  aspectRatio: "16/9",
  // backgroundColor: vars.colors.black,
})

export const userInfoContainer = style([
  betweenBox,
  {
    padding: vars.space['2x'],
  }
])

export const leftBoxContainer = style([
  rowbox,
  {
    gap: 10,
  }
])

export const leftBox = style([
  columnbox,
  {
    // gap: 10,
  }
])

export const rightBox = style([
  columnbox,
  {
    gap: 10,
  }
])

export const leftBoxItem = style([
  startBox,
  {
    height: '100%',
  }
])

export const rightBoxItme = style([
  endBox,
  {
    height: '100%',
  }
])

export const streamerImage = style({
  width: 80,
  height: 80, 
  borderRadius: vars.borderRadius.full,
  border: `2.5px solid ${vars.colors.black}`
})

export const streamingTitle = style([
  bold,
  {
    fontSize: vars.fontSize['2x']
  }
])

export const streamerName = style({
  fontSize: vars.fontSize['1x']
})

export const stremingInfo = style({
  fontSize: vars.fontSize['0.5x']
})
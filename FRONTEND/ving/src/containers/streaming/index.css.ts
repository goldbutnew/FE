import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css';
import { bold } from '@/styles/fonts.css';
import { betweenBox, endBox, rowbox } from '@/styles/box.css';

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
    gap: 10,
  }
])

export const leftBox = style([
  rowbox,
  {
    
  }
])

export const rightBoxItme = style([
  endBox,
  {
    height: '100%',
  }
])

export const stremerImage = style({
  width: 80,
  height: 80, 
  borderRadius: vars.borderRadius.full,
  border: `2.5px solid ${vars.colors.black}`
})

export const streamingTitle = style([
  bold,
  {
    fontSize: vars.fontSize['3x']
  }
])

export const stremerName = style({
  fontSize: vars.fontSize['1.5x']
})


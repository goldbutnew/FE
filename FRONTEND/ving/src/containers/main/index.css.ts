import { vars } from '@/styles/vars.css'
import { style } from '@vanilla-extract/css'

export const test = style({
  backgroundColor: 'black',
  width: 200,
  aspectRatio: "4/3",
  color: "white",
  textAlign: 'center',
  padding: '20px',
})

export const mainVideoGridBox = style({
  width: '100%',
  padding: `0 ${vars.space['2x']} 0 ${vars.space['2x']}`
})

export const mainVideoGrid = style({
  display: 'grid',
  // gridTemplateColumns: 'repeat(4, 1fr)', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  margin: `${vars.space['2x']} 0`,
  gap: vars.space['2x'],
  // '& > :nth-child(4n)': { 
  //   margin: `0 ${vars.space['2x']} 0 0`
  // }
})

export const mainVideoItem = style({
  width: "100%",
  aspectRatio: "4/3",
  objectFit: 'cover',
  backgroundColor: 'black',
  color: vars.colors.white,
})
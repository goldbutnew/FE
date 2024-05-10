import { plainButton } from '@/styles/common.css'
import { bold } from '@/styles/fonts.css'
import { vars } from '@/styles/vars.css'
import { columnWrapper, rowWrapper, startWrapper } from '@/styles/wrapper.css'
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

export const mainVideoItem = style([
  plainButton,
  {
    width: "100%",
    aspectRatio: "4/3",
    objectFit: 'cover',
    // backgroundColor: 'black',
  }
])

export const imageStyle = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // 이미지 비율을 유지하면서 div에 꽉 차게 채우기
})

export const roomInfoBox = style([
  rowWrapper, 
  {
  }
])

export const leftBoxContainer = style([
  rowWrapper,
  {
    gap: 10,
  }
])

export const leftBox = style([
  columnWrapper,
  {
    margin: `0 0 0 ${vars.space['0.5x']}`
  }
])

export const rightBox = style([
  columnWrapper,
  {
    gap: 5,
  }
])

export const leftBoxItem = style([
  startWrapper,
  {
    height: '100%',
  }
])

export const streamingTitle = style([
  bold,
  {
    fontSize: vars.fontSize['1x']
  }
])

export const streamerName = style({
  fontSize: vars.fontSize['0.5x']
})

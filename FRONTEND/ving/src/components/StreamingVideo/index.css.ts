import { style } from '@vanilla-extract/css'

export const videoResize = style({
  width: "100%",
  aspectRatio: "16/9",
})


// 컨트롤러 패널 스타일
export const controls = style({
  position: 'absolute',
  width: '10%',
  background: 'transparent',
  display: 'flex',
  alignItems: 'start',
})

// 버튼 스타일
export const button = style({
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%'
})

// 슬라이더 스타일
export const slider = style({
  width: '100%',
  height: '4px', // 높이를 줄임
  cursor: 'pointer',
  display: 'none',
  backgroundColor: 'silver',
  borderRadius: '2px' // 모서리를 약간 둥글게
})
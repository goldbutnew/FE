import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'


export const videoResize = style({
  width: "100%",
  aspectRatio: "16/9",
})

// 비디오 플레이어 스타일
export const videoPlayer = style({
  width: '100%',
  height: 'auto'
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
  width: '200px',
  cursor: 'pointer',
  display: 'none'
})
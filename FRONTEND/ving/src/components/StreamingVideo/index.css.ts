import { style } from '@vanilla-extract/css'
import { globalStyle } from '@vanilla-extract/css'


export const videoResize = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '16/9',
})

// 재생바와 컨트롤러 같이
export const player = style({
  position: 'absolute',
  width: '100%',
  top: '95%',
  zIndex: 1,
})

// 재생바
export const playBarContainer = style({
  display: 'flex',
  justifyContent: 'center',
})

// 컨트롤러 패널 스타일
export const controls = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: 1,
})

export const justify = style({
  display: 'flex',
  flexDirection: 'row',
})


// 볼륨 슬라이더 스타일
export const volumeSlider = style({
  width: '100px',
  height: '4px',
  cursor: 'pointer',
  display: 'none',
  backgroundColor: 'silver',
  borderRadius: '2px',
  alignSelf: 'center'
})

// 재생 슬라이더 스타일
export const videoSlider = style({
  width: '95%',
  height: '4px',
  cursor: 'pointer',
  backgroundColor: 'silver',
  borderRadius: '2px',
})

// 글로벌 스타일로 브라우저 내장 비디오 컨트롤 숨기기
globalStyle('video::-webkit-media-controls', {
  display: 'none !important',
})

globalStyle('video::-moz-fullscreen-video-controls', {
  display: 'none !important',
})
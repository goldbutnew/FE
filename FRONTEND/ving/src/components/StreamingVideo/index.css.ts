import { style } from '@vanilla-extract/css'
import { globalStyle } from '@vanilla-extract/css'


export const videoResize = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '16/9',
})


// 화면에 호버시만 플레이어 div 등장
export const playerHover = style({
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out'
})

export const playerHoverVisible = style({
  opacity: 1,
  visibility: 'visible',
  transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out'
})

// 재생바와 컨트롤러 같이
export const player = style({
  position: 'absolute',
  width: '100%',
  top: '90%',
  zIndex: 1,
})

// 재생바
export const playBarContainer = style({
  display: 'flex',
  justifyContent: 'center',
})

// 컨트롤러 패널 스타일
export const controls = style({
  width: '95%',
  marginTop: '1%',
  marginLeft: '2.5%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 1,
})

// 컨트롤러 정렬 (재생/볼륨/글자 ||| pip/전체화면/화질설정)
export const justifyControls = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px'
})

// 볼륨 버튼과 볼륨바를 묶음
export const justifyVolume = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px'
})

// 현재 시간 표시 스타일
export const timeText = style({
  color: 'white',
  fontWeight: 'bold',
})

// 전체 시간 표시 스타일
export const durationText = style({
  color: 'silver',
  fontWeight: 'bold',
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
import { style } from '@vanilla-extract/css'
import { globalStyle } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'
import { defaultWrapper } from '@/styles/wrapper.css'

export const videoResize = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '16/9',
})

// 화면에 호버시만 플레이어 div 등장
export const playerHover = style({
  opacity: 0,
  visibility: 'hidden',
  transition: `opacity ${vars.transition.default}, visibility ${vars.transition.default}`,
})

export const playerHoverVisible = style({
  opacity: 1,
  visibility: 'visible',
  transition: `opacity ${vars.transition.default}, visibility ${vars.transition.default}`,
})

// 재생바와 컨트롤러 같이
export const player = style({
  position: 'absolute',
  width: '100%',
  top: '90%',
  zIndex: vars.zIndex.sticky,
})

// 재생바
export const playBarContainer = style({
  display: 'flex',
  justifyContent: 'center',
})

// 컨트롤러 패널 스타일
export const controls = style({
  width: '95%',
  marginTop: vars.space['1x'],
  marginLeft: '2.5%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: vars.zIndex.sticky,
})

// 컨트롤러 정렬 (재생/볼륨/글자 ||| pip/전체화면/화질설정)
export const justifyControls = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space['1x'],
})

// 볼륨 버튼과 볼륨바를 묶음
export const justifyVolume = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space['1x'],
})

// 현재 시간 표시 스타일
export const timeText = style({
  color: vars.colors.white,
  fontWeight: 'bold',
})

// 전체 시간 표시 스타일
export const durationText = style({
  color: vars.colors.gray,
  fontWeight: 'bold',
})

// 볼륨 슬라이더 스타일
export const volumeSlider = style({
  width: '95%',
  height: vars.space['0.5x'],
  cursor: 'pointer',
  borderRadius: vars.borderRadius['0.5x'],
  alignSelf: 'center',
  display: 'none',
  backgroundColor: vars.colors.gray,
  '::-webkit-slider-thumb': {
    appearance: 'none',
    backgroundColor: vars.colors.white,
    width: vars.space['1.5x'],
    height: vars.space['1.5x'],
    borderRadius: vars.borderRadius.full,
    cursor: 'pointer',
  },
  '::-moz-range-thumb': {
    backgroundColor: vars.colors.white,
    width: vars.space['1.5x'],
    height: vars.space['1.5x'],
    borderRadius: vars.borderRadius.full,
    cursor: 'pointer',
  },
})

// 재생 슬라이더 스타일
export const videoSlider = style({
  width: '95%',
  height: vars.space['0.5x'],
  cursor: 'pointer',
  borderRadius: vars.borderRadius['0.5x'],
  backgroundColor: vars.colors.gray,
  '::-webkit-slider-thumb': {
    appearance: 'none',
    backgroundColor: vars.colors.white,
    width: vars.space['1.5x'],
    height: vars.space['1.5x'],
    borderRadius: vars.borderRadius.full,
    cursor: 'pointer',
  },
  '::-moz-range-thumb': {
    backgroundColor: vars.colors.white,
    width: vars.space['1.5x'],
    height: vars.space['1.5x'],
    borderRadius: vars.borderRadius.full,
    cursor: 'pointer',
  },
})

// 글로벌 스타일로 브라우저 내장 비디오 컨트롤 숨기기
globalStyle('video::-webkit-media-controls', {
  display: 'none !important',
})

globalStyle('video::-moz-fullscreen-video-controls', {
  display: 'none !important',
})

// dropdown 내부
export const dropdownMenuConatiner = style({
  display: 'inline-block',
})

export const dropdownButton = style({
  position: 'relative',
})

export const dropdownMenu = style({
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: vars.colors.white,
  boxShadow: vars.boxShadow['2x'],
  borderRadius: vars.borderRadius['1x'],
  padding: vars.space['1x'],
  zIndex: 100,
});

export const dropdownMenuTop = style({
  position: 'absolute',
  bottom: '1%',
  right: '2%',
  width: '15%', 
  backgroundColor: 'rgba(80, 80, 80, 0.8)',
  color: vars.colors.white,
  boxShadow: vars.boxShadow['2x'],
  borderRadius: vars.borderRadius['0.5x'],
  padding: vars.space['1x'],
  zIndex: vars.zIndex.dropdown,
  transform: 'translateY(-50%)', 
})

export const dropdownItem = style([
  defaultWrapper,
  {
    color: vars.colors.white,
    width: '100%',
    padding: vars.space['1x'],
    display: 'block',
    whiteSpace: 'nowrap',
    fontSize: vars.fontSize['1x'],
    ':hover': {
      backgroundColor: 'rgba(80, 80, 80, 0.5)',
    },
  },
])
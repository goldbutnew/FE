import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'

// 비디오 컨테이너 스타일
export const videoContainer = style({
  position: 'relative',
  width: '100%',
  maxWidth: '640px',
  margin: 'auto',
  marginBottom: vars.space['2x'],
})

// 비디오 플레이어 스타일
export const videoPlayer = style({
  width: '100%',
  height: 'auto',
})

// 컨트롤러 패널 스타일
export const controls = style({
  position: 'absolute',
  bottom: '10px',
  width: '100%',
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '5px',
})

// 버튼 스타일
export const button = style({
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
})
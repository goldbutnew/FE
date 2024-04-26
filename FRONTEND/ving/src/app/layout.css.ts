import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

// HTML 및 body에 대한 기본 스타일을 리셋합니다.
globalStyle('html, body', {
  padding: vars.space.none,
  margin: vars.space.none,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  lineHeight: 1.5,
});

// 모든 요소에 대한 box-sizing을 border-box로 설정합니다.
globalStyle('*, *:before, *:after', {
  boxSizing: 'border-box'
})

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

export const contentContainer = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
});

export const mainContent = style({
  flexGrow: 1,
  padding: `${vars.space['8x']} 0 0 ${vars.space['2x']}`,
});
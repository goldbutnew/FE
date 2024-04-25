import { keyframes, style } from '@vanilla-extract/css';
import { vars } from './vars.css';

// 키 프레임 정의
const fadeInKeyframes = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

// 페이드인
export const fadeIn = style({
  animation: `${fadeInKeyframes} 1s ease-in-out`
});

// 스케일업
export const scaleUp = style({
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    transform: 'scale(1.1)'
  }
});

// 버튼 효과
export const buttonEffect = style({
  padding: `${vars.space['1x']} ${vars.space['1x']}`,
  // transition: 'background-color 0.3s ease', 
  transition: vars.transition.default,
  ':hover': {
    backgroundColor: vars.colors.black,
    color: vars.colors.white,
  }
});

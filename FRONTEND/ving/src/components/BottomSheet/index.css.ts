import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
});

const slideDown = keyframes({
  '0%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(100%)' },
});

export const bottomSheet = style({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: vars.colors.white,
  borderTopLeftRadius: vars.borderRadius['2x'],
  borderTopRightRadius: vars.borderRadius['2x'],
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  padding: `${vars.space['2x']} ${vars.space['2x']} 88px ${vars.space['2x']}`,
  maxHeight: '80vh',
  overflowY: 'auto',
  transform: 'translateY(100%)',
  animation: `${slideUp} 300ms ease-out forwards`,
});

export const slideOut = style({
  // animation: `${slideDown} 300ms ease-out forwards`,
});

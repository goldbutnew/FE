import { style, keyframes } from '@vanilla-extract/css';

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
  backgroundColor: 'white',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  maxHeight: '80vh',
  overflowY: 'auto',
  transform: 'translateY(100%)',
  animation: `${slideUp} 300ms ease-out forwards`,
});

export const slideOut = style({
  animation: `${slideDown} 300ms ease-out forwards`,
});

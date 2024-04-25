import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

export const baseSidebar = style({
  position: 'fixed',
  top: 0,
  bottom: 0,
  width: '300px',
  margin: vars.space.none,
  backgroundColor: vars.colors.lightGray,
  padding: vars.space['1x'],
  boxShadow: `0 4px 4px rgba(0, 0, 0, 0.2)`,
  zIndex: 1000,
  transition: 'transform 0.3s ease-in-out',
});

export const leftSidebar = style([
  baseSidebar,
  {
    left: 0,
    transform: 'translateX(-100%)',
  },
]);

export const rightSidebar = style([
  baseSidebar,
  {
    right: 0,
    transform: 'translateX(100%)',
  },
]);

export const toggleButton = style({  
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: vars.colors.black,
});

export const open = style({
  transform: 'translateX(0)',
  backgroundColor: vars.colors.white
});

export const close = style({
  transform: 'translateX(0)',
  width: '100px',
});
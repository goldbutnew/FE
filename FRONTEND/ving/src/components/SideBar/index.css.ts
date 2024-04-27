import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';
import { columnbox, defaultBox } from '@/styles/box.css';
import { bold } from '@/styles/fonts.css';
import { calc } from '@vanilla-extract/css-utils';

export const baseSidebar = style({
  position: 'sticky',
  top: 0,
  bottom: 0,
  height: '100vh',
  margin: vars.space.none,
  backgroundColor: vars.colors.lightGray,
  padding: `${vars.space['8x']} ${vars.space['1x']} ${vars.space['1x']} ${vars.space['1x']}`,
  boxShadow: vars.boxShadow['2x'],
  zIndex: 3000,
  transition: '0.3s ease-in-out',
  overflow: 'hidden',
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
  cursor: 'pointer',
  color: vars.colors.black,
});

export const open = style({
  transform: 'translateX(0)',
  backgroundColor: vars.colors.white
});

export const close = style({
  transform: 'translateX(0)',
});

export const hidden = style({
  position: 'fixed',
  transform: 'translateX(0)',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  opacity: 0.3,
  transition: 'opacity 0.3s ease',
  ':hover': {
    opacity: 1,
  },
});

export const sidebarTitle = style([
  bold,
  {
    height: 20,
    fontSize: vars.fontSize['1.5x'],
  }
])

export const sidebarContent = style([
  defaultBox,
  {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    width: '100%',
    height: calc.subtract(`100% - ${vars.space['5x']}`)
  }
]);
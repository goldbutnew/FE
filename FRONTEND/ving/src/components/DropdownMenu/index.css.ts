import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css';
import { defaultWrapper } from '@/styles/wrapper.css';

export const dropdownMenuConatiner = style({
  display: 'inline-block',
  position: 'relative',
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
  // opacity: 0.8,
  zIndex: 100,
});

export const dropdownMenuLeft = style({
  position: 'absolute',
  top: '100%',
  left: 4,
  backgroundColor: vars.colors.white,
  boxShadow: vars.boxShadow['2x'],
  borderRadius: vars.borderRadius['1x'],
  padding: vars.space['1x'],
  zIndex: 100,
});

export const dropdownMenuRight = style({
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: vars.colors.white,
  boxShadow: vars.boxShadow['2x'],
  borderRadius: vars.borderRadius['1x'],
  padding: vars.space['1x'],
  zIndex: 100,
});

export const dropdownItem = style([
  defaultWrapper,
  {
    width: '100%',
    padding: vars.space['1x'],
    display: 'block',
    whiteSpace: 'nowrap',
    fontSize: vars.fontSize['1x'],
    ':hover': {
      backgroundColor: vars.colors.lightGray
    }
  }
]);

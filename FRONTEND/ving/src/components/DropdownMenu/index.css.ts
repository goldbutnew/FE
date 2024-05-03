import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css';

export const dropdownMenu = style({
  position: 'absolute',
  top: '100%',
  right: '0',
  backgroundColor: vars.colors.white,
  boxShadow: vars.boxShadow['2x'],
  borderRadius: vars.borderRadius['1x'],
  padding: vars.space['1x'],
  zIndex: 100,
});

export const dropdownItem = style({
  padding: '8px 16px',
  display: 'block',
  whiteSpace: 'nowrap',
  ':hover': {
    backgroundColor: vars.colors.gray
  }
});

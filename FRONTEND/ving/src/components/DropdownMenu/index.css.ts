import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css';
import { defaultWrapper } from '@/styles/wrapper.css';

export const dropdownMenu = style({
  position: 'absolute',
  top: '100%',
  right: '0',
  backgroundColor: vars.colors.white,
  boxShadow: vars.boxShadow['2x'],
  borderRadius: vars.borderRadius['1x'],
  padding: vars.space['1x'],
  // opacity: 0.8,
  zIndex: 100,
});

export const dropdownMenuTop = style({
  position: 'absolute',
  bottom: '100%',  // top이 true일 때 드롭다운을 버튼 위로 위치시킴
  right: '0',
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
    ':hover': {
      backgroundColor: vars.colors.lightGray
    }
  }
]);

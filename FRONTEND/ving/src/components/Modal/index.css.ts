import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';
import { columnbox, rowbox } from '@/styles/box.css';

export const overlay = style([
  rowbox,
  {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  }
]);

export const modalContainer = style([
  columnbox,
  {
    backgroundColor: vars.colors.white,
    padding: vars.space['3x'],
    borderRadius: vars.borderRadius['1x'],
    boxShadow: vars.boxShadow['2x'],
    // minWidth: '300px',
    // minHeight: '200px',
  }
]);
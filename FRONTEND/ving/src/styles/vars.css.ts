import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  space: {
    none: '0',
    '0.5x': '4px',
    '1x': '8px',
    '2x': '16px',
    '3x': '24px',
    '4x': '32px',
    '5x': '40px',
    '6x': '48px',
    '7x': '56px',
    '8x': '64px',
  },

  colors: {
    white: '#ffffff',
    black: '#000000',
    darkGray: '#505050',
    red: '#F00000',
    gray: '#CFCFCF',
    lightGray: '#F2F2F2',
    pink: '#D16D6A',
  },

  borderRadius: {
    '0x': '0px',
    '0.5x': '4px',
    '1x': '8px',
    '2x': '16px',
    '3x': '24px',
    '4x': '32px',
    '5x': '40px',
    top: '32px 32px 0 0',
    full: '9999px',
  },

  fontFamily: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },

  fontSize: {
    '0x': '8px',
    '1.5x': '12px',
    '1x': '16px',
    '2x': '24px',
    '3x': '32px',
    '4x': '40px',
    '5x': '48px',
  },

  lineHeight: {
    '0x': '1',
    '1x': '1.25',
    '2x': '1.5',
    '3x': '1.75',
    '4x': '2',
    '5x': '2.25',
    '6x': '2.5',
    '7x': '2.75',
    '8x': '3',
  },

  zIndex: {
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
    sidebar: '2000',
    navbar: '3001'
  },

  boxShadow: {
    '0x': 'none',
    '1x': '0px 1px 2px rgba(0, 0, 0, 0.2)',
    '2x': '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '3x': '0px 4px 8px rgba(0, 0, 0, 0.)',
    '4x': '0px 8px 16px rgba(0, 0, 0, 0.2)',
    '5x': '0px 16px 24px rgba(0, 0, 0, 0.25)',
    '6x': '0px 24px 32px rgba(0, 0, 0, 0.3)',
    border : '0 0 0 rgba(0, 0, 0, 1)',
  },

  transition: {
    'default': '0.3s ease-in-out',
  }
});
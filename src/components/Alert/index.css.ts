import { style, createTheme, createThemeContract } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

export const alertContainer = style({
  padding: vars.space['1x'],
  marginBottom: vars.space['1x'],
  borderRadius: vars.borderRadius['1x'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space['1x'],
});

export const alertText = style({
  flex: '1',
  fontSize: vars.fontSize['1x'],
});

export const alertButton = style({
  background: 'none',
  border: 'none',
  fontSize: vars.fontSize['1.5x'],
  cursor: 'pointer',
});

export const alertThemes = createThemeContract({
  success: {
    backgroundColor: '',
    color: '',
  },
  error: {
    backgroundColor: '',
    color: '',
  },
  info: {
    backgroundColor: '',
    color: '',
  },
  warning: {
    backgroundColor: '',
    color: '',
  },
});

export const alertThemeVars = createTheme(alertThemes, {
  success: {
    backgroundColor: vars.colors.superLightGray,
    color: vars.colors.darkGray,
  },
  error: {
    backgroundColor: vars.colors.red,
    color: vars.colors.white,
  },
  info: {
    backgroundColor: vars.colors.lightGray,
    color: vars.colors.black,
  },
  warning: {
    backgroundColor: vars.colors.pink,
    color: vars.colors.white,
  },
});

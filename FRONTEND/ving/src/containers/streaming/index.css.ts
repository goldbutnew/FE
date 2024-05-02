import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css';

export const contentContainer = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
});

export const mainContent = style({
  flexGrow: 1,
  padding: `${vars.space['8x']} ${vars.space['2x']} 0 ${vars.space['2x']}`,
});
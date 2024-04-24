import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';


export const modalContainer = style({
  lineHeight: vars.lineHeight['6x'], 
});

export const modalTitle = style ({
  margin: `0 0 ${vars.space['1x']}`,
})

export const InputBox = style({
  margin: `0 0 ${vars.space['1x']}`,
})

export const logo = style({
  width: 'auto',
  height: 32,
})

export const labelText = style({
  width: 100,
})
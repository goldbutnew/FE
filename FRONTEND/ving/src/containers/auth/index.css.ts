import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';


export const modalContainer = style({
  lineHeight: vars.lineHeight['5x'], 
});

export const modalTitle = style ({
  // margin: vars.space.none,
  // padding: vars.space.none,
})

export const logo = style({
  width: 'auto',
  height: 32,
})

export const labelText = style({
  width: 100,
})
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

export const body = style({
  margin: vars.margin.none
})

export const container = style({
  padding: vars.padding['2x']
})
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';
import { columnbox, rowbox } from '@/styles/box.css';


export const modalContainer = style([
  columnbox,
  {
  }
]);

export const modalTitle = style ([
  rowbox,
  {
    margin: `0 0 ${vars.space['1x']}`,
  }
])

export const modalItem = style([  
  rowbox,
  {
    margin: `0 0 ${vars.space['1x']}`,
  }
])

export const logo = style({
  width: 'auto',
  height: 32,
})

export const labelText = style({
  width: 100,
})
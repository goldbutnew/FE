import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';
import { centerWrapper, columnWrapper, rowWrapper } from '@/styles/wrapper.css';


export const modalContainer = style([
  columnWrapper,
  {
  }
]);

export const modalTitle = style ([
  centerWrapper,
  {
    margin: `0 0 ${vars.space['1x']}`,
  }
])

export const modalItem = style([  
  rowWrapper,
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
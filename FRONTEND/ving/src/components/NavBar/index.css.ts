import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css'
import { betweenBox, rowbox } from '@/styles/box.css';

export const container = style([
  betweenBox,
  {
    position: 'fixed',
    width: '100%',
    backgroundColor: vars.colors.white,
    height: 50,
    padding: `0 ${vars.space['1x']} 0 ${vars.space['1x']}`,
    boxShadow: vars.boxShadow['1x'],
    zIndex: 3001,
    // overflow: 'visible'
  }
])

export const rightNavBox = style([
  rowbox
])

export const leftNavBox = style([
  rowbox
])

export const rightNavItem = style([{
  margin: `0 ${vars.space['0.5x']} 0 0`
}])

export const leftNavItem = style({
  margin: `0 0 0 ${vars.space['0.5x']}`
})

export const logo = style([
  rowbox,
  {
    width: 'auto',
    height: 32,
  }
])
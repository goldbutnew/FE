import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/vars.css';
import { style, composeStyles } from '@vanilla-extract/css';
import { columnbox } from '@/styles/box.css';
import { buttonEffect } from '@/styles/animation.css';

export const defaultButton = recipe({
  base: composeStyles(
    buttonEffect,
    columnbox,
    style({
      border: 'none',
      outline: 'none',
      backgroundColor: 'inherit',
      cursor: 'pointer',
      borderRadius: vars.borderRadius['1x'],
      padding: `${vars.space['1x']} ${vars.space['1x']}`,
    })
  ),
  variants: {
    size: {
      small: {
        padding: `${vars.space['0.5x']} ${vars.space['1x']}`
      },
      // medium: {
      //   padding: `${vars.space['1x']} ${vars.space['2x']}` // 패딩 증가
      // },
      large: {
        width: '100%',
      }
    }
  }
})

export const iconButton = composeStyles(
  buttonEffect,
  style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${vars.colors.black}`,
    outline: 'none',
    backgroundColor: 'inherit',
    cursor: 'pointer',
    borderRadius: vars.borderRadius.full,
    padding: vars.space['0.5x'],
  })
);


// ToggleButton.tsx

export const toggleButton = style({
  cursor: 'pointer',
  position: 'relative',
  width: '50px',
  height: '25px',
  backgroundColor: '#ccc',
  borderRadius: '25px',
  transition: 'background-color 0.2s',
});

export const toggleButtonKnob = style({
  position: 'absolute',
  top: '2px',
  left: '2px',
  width: '21px',
  height: '21px',
  borderRadius: '50%',
  backgroundColor: 'white',
  transition: 'transform 0.2s',
});

export const toggleButtonActive = style({
  backgroundColor: '#4cd137',
});

export const toggleButtonKnobActive = style({
  transform: 'translateX(25px)',
});

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
  position: 'relative',
  cursor: 'pointer',
  width: '32px',
  height: '16px',
  backgroundColor: vars.colors.gray,
  borderRadius: vars.borderRadius['2x'],
  transition: 'background-color 0.2s',
});

export const toggleButtonKnob = style({
  position: 'absolute',
  top: '2px',
  left: '2px',
  width: '12px',
  height: '12px',
  borderRadius: vars.borderRadius.full,
  backgroundColor: 'white',
  transition: 'transform 0.2s',
});

export const toggleButtonActive = style({
  backgroundColor: vars.colors.black,
});

export const toggleButtonKnobActive = style({
  transform: 'translateX(16px)',
});
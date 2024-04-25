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


// export const defaultButton = recipe({
//   base: {
//     border: 'none',
//     outline: 'none',
//     backgroundColor: 'inherit',
//     cursor: 'pointer',
//     borderRadius: vars.borderRadius['1x'],
//     // fontSize: '16px',
//     padding: `${vars.space['1x']} ${vars.space['1x']}`,
//     // transition: 'background-color 0.3s ease', 
//     // ':hover': {
//     //   backgroundColor: vars.colors.black,
//     //   color: vars.colors.white,
//     // }
//     ButtonEffect
//   },
//   variants: {
//     size: {
//       small: {
//         padding: `${vars.space['0.5x']} ${vars.space['1x']}`
//       },
//       // medium: {
//       //   padding: `${vars.space['1x']} ${vars.space['2x']}` // 패딩 증가
//       // },
//       large: {
//         width: '100%',
//       }
//     }
//   }
// })


// export const iconButton = style({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   border: `1px solid ${vars.colors.black}`,
//   outline: 'none',
//   backgroundColor: 'inherit',
//   cursor: 'pointer',
//   borderRadius: vars.borderRadius.full,
//   padding: vars.space['0.5x'],
//   transition: 'background-color 0.3s ease', 
//   ':hover': {
//     backgroundColor: vars.colors.black,
//     color: vars.colors.white,
//   }
// })
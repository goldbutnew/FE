import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/vars.css';

export const defaultButton = recipe({
  base: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'inherit',
    cursor: 'pointer',
    borderRadius: vars.space['1x'],
    fontSize: '16px',
    padding: `${vars.space['1x']} ${vars.space['1x']}`,
    transition: 'background-color 0.3s ease', 
    ':hover': {
      backgroundColor: vars.colors.black // 호버 상태에서의 배경색 변경
    }
  },
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
});
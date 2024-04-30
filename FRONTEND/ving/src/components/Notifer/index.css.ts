import { style } from '@vanilla-extract/css'
import { flex } from '@/styles/common.css'
import { vars } from '@/styles/vars.css'

export const iconButtonBox = style({
  display: 'inline-block', // 인라인 블록 요소로 설정하여 가로 너비를 아이콘 버튼 크기에 맞춥니다.
  width: 'fit-content', // 아이콘 버튼의 크기에 맞추도록 설정
})

export const iconButton = style({
  width: 'fit-content',
})

export const modalBackdrop = style({
  position: 'absolute',
  right: 80,
  top: 40,
  backgroundColor: vars.colors.white,
  borderRadius: vars.borderRadius['1x'],
  // zIndex: 1000, 
  boxShadow: vars.boxShadow['2x'],
});

export const modalTitle = style({
  fontWeight: 'bold',
})

export const modalContent = style({
  borderRadius: '10px',
  width: 'auto', 
  padding: vars.space['2x'],
  boxSizing: 'border-box' 
});

export const closeBtnBox = style([
  flex({
    direction: 'row',
    align: 'center',
    justify: 'between',
  }),
  {
    width: '100%',
  }
]);

export const closeButton = style({
  cursor: 'pointer',
})
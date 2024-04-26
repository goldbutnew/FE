import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@/styles/vars.css'
import { columnbox } from '@/styles/box.css'
import { plainButton } from '@/styles/common.css'

// common
export const characterCount = style({
  textAlign: 'right',
  fontSize: vars.fontSize['0x'],
  color: vars.colors.darkGray,
  padding: vars.space['1x'],
  whiteSpace: 'nowrap'
})

export const emojiButton = style([
  columnbox,
  plainButton,
  {
    padding: `0 ${vars.space['1x']} 0 ${vars.space['1x']}`,
  }
])

// defaultInput.tsx
export const defaultInputBox = style({
  width: '100%',
  border: `2px solid ${vars.colors.gray}`,
  borderRadius: vars.borderRadius['1x'],
  backgroundColor: vars.colors.white,
})

export const defaultInputForm = style({
  width: '100%',
  padding: vars.space['1x'],
})

// TextArea.tsx
export const TextAreaBox = style({
  width: '100%',
  border: `2px solid ${vars.colors.gray}`,
  borderRadius: vars.borderRadius['1x'],
})

export const TextAreaForm = style({
  width: '100%',
  padding: vars.space['1x'],
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  overflow: 'auto'
})

// Radio.tsx
export const RadioButton = style({
  borderRadius: vars.borderRadius.full,
  outline: `2px solid ${vars.colors.black}`,
  width: '12px',
  height: '12px',
  margin: `0 ${vars.space['0.5x']} 0 0`,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  selectors: {
    '&:hover': {
      animation: `0.5s ease infinite`,
    },
    '&:checked': {
      backgroundColor: vars.colors.black, // 체크 시 내부 원으로 표시될 색상
      border: `2px solid ${vars.colors.white}`,
      boxShadow: vars.boxShadow.border,
    },
  },
});
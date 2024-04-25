import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@/styles/vars.css'

// common
export const characterCount = style({
  textAlign: 'right',
  fontSize: 10,
  color: vars.colors.darkGray,
  margin: vars.space['0.5x']
})

// defaultInput.tsx
export const defaultInputBox = style({
  width: '100%',
  border: `2px solid ${vars.colors.gray}`,
  borderRadius: vars.borderRadius['1x'],
})

export const defaultInputForm = style({
  // width: '100%',
  padding: vars.space['0.5x'],
})

// TextArea.tsx
export const TextAreaBox = style({
  width: '100%',
  border: `2px solid ${vars.colors.gray}`,
  borderRadius: vars.borderRadius['1x'],
})

export const TextAreaForm = style({
  width: '100%',
  padding: vars.space['0.5x'],
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  overflow: 'auto'
})

// Radio.tsx
export const RadioButton = style({
  borderRadius: vars.borderRadius.full,
  border: `1px solid ${vars.colors.black}`,
  width: '16px',
  height: '16px',
  cursor: 'pointer',
  selectors: {
    '&:checked': {
      backgroundColor: '#22d3ee', // 체크 시 내부 원으로 표시될 색상
      border: `1px solid ${vars.colors.black}`,
      boxShadow: "0 0 0 1.6px #22d3ee",
    },
  },
});
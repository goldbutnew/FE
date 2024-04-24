import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@/styles/vars.css'

// defaultInput.tsx
export const InputConatiner = style({
   border: `2px solid ${vars.colors.gray}`,
   padding: vars.space['0.5x'],
   borderRadius: vars.borderRadius['1x']
})
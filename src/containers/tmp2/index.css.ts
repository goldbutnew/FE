import { flex } from "@/styles/common.css"
import { vars } from "@/styles/vars.css"
import { style } from "@vanilla-extract/css"


// SearchNone.tsx
export const searchNoneBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${vars.space["10x"]} 20 20 20`,
  height: 500,
})

export const searchNoneTitle = style({
  fontSize: vars.fontSize["2x"],
  padding: 20,
  textAlign: 'center', 
  color: vars.colors.black,
  justifyContent: 'center',
})

export const searchConform = style({
  fontSize: vars.fontSize["1.5x"],
  textAlign: 'center', 
  color: vars.colors.darkGray
})
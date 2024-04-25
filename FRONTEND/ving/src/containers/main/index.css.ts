
// 어떻게 쓰는지 예시용 나중에 지우는 용
import { style } from '@vanilla-extract/css'
import { rowbox } from '@/styles/box.css'

export const container = style({
  padding: '20px',
  backgroundColor: 'blue',
  color: 'white',
})

export const test = style([
  rowbox
])
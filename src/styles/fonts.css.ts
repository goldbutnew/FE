import { globalFontFace, style } from '@vanilla-extract/css'

const pretendard = 'GlobalPretendard'

globalFontFace(pretendard, {
  src: '../../public/fonts/woff2/Pretendard-SemiBold.woff',
})

export const bold = style({
  fontFamily: 'pretendard-SemiBold',
  fontWeight: 600,
})
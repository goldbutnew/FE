import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'
import { bold } from '@/styles/fonts.css'
import { defaultWrapper, rowWrapper } from '@/styles/wrapper.css'

export const newsFeedContainer = style([
  {
    width: '100%',
    height: '50vh',
    padding: `0 ${vars.space['1x']} ${vars.space['1x']} ${vars.space['1x']}`,
    backgroundColor: vars.colors.white,
    overflow: 'hidden',
  }
])

export const title = style([
  bold,
  {
    height: 20,
    fontSize: vars.fontSize['0.5x'],
  }
])

export const newsFeedContent = style([
  defaultWrapper,
  {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    width: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }
])

export const newfeedItemBox = style([
  // rowWrapper,
  {
    fontSize: vars.fontSize['0.75x'],
    margin: `${vars.space['0.5x']} 0`
  }
])

export const newfeedItemNickname = style([
  bold,
])


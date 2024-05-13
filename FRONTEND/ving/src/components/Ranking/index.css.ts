import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'
import { rowWrapper } from '@/styles/wrapper.css'

export const openRankingList = style({
  position: 'absolute',
  // 테두리 주니까 밑줄 모양이 남음.. 일단 보류
  // border: `1px solid ${vars.colors.gray}`,
  width: '96%',
  maxHeight: 272,
  overflowY: 'auto',
  zIndex: 100,
  selectors: {
    '&::-webkit-scrollbar': {
      width: 5,
      height: 2,
      backgroundColor: vars.colors.lightGray
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.darkGray
    }
    },
})

export const rankingListItem = style([
  rowWrapper, 
  {
    margin: `${vars.space['0.5x']} 0`,
    width: '100%'
  }
])

export const closeRankingList = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // 테두리 주니까 밑줄 모양이 남음.. 일단 보류
  // border: `1px solid ${vars.colors.gray}`,
  width: '93%',
  maxHeight: 272,
  overflowY: 'auto',
  zIndex: 100,
  selectors: {
    '&::-webkit-scrollbar': {
      width: 5,
      height: 2,
      backgroundColor: vars.colors.lightGray
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.darkGray
    }
    },
})

export const closeRankingListItem = style({
  margin: `${vars.space['0.5x']} 0`,
  width: '100%'
})

export const rankingUserName = style({
  overflow: 'hidden', 
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  margin: `0 0 0 ${vars.space['0.5x']}`,
})
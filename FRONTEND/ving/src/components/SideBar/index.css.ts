import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';
import { columnWrapper, defaultWrapper, rowWrapper } from '@/styles/wrapper.css';
import { bold } from '@/styles/fonts.css';
import { calc } from '@vanilla-extract/css-utils';

export const baseSidebar = style({
  position: 'sticky',
  top: 0,
  bottom: 0,
  height: '100vh',
  margin: vars.space.none,
  backgroundColor: vars.colors.lightGray,
  padding: `${vars.space['8x']} ${vars.space['1x']} ${vars.space['1x']} ${vars.space['1x']}`,
  boxShadow: vars.boxShadow['2x'],
  zIndex: 3000,
  transition: '0.3s ease-in-out',
  overflow: 'hidden',
})

export const leftSidebar = style([
  baseSidebar,
  {
    left: 0,
    transform: 'translateX(-100%)',
  },
]);

export const rightSidebar = style([
  baseSidebar,
  {
    right: 0,
    transform: 'translateX(100%)',
  },
]);

export const toggleButton = style({  
  cursor: 'pointer',
  color: vars.colors.black,
});

export const open = style({
  transform: 'translateX(0)',
  backgroundColor: vars.colors.white
});

export const close = style([
  {
    transform: 'translateX(0)',
    display: 'flex',
    width: "80px",
    justifyContent: 'center',
    flexDirection: 'column',
  }
]);

export const hidden = style({
  position: 'fixed',
  transform: 'translateX(0)',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  margin: `0 ${vars.space['0.5x']}`,
  opacity: 0.3,
  ':hover': {
    opacity: 1,
  },
});

export const sidebarTitle = style([
  bold,
  {
    height: 20,
    fontSize: vars.fontSize['0.5x'],
  }
])

export const sidebarContent = style([
  defaultWrapper,
  {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    width: '100%',
    height: calc.subtract(`100% - ${vars.space['5x']}`)
  }
]);

// 사이드 랭킹 관련 스타일 시작

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
  rowWrapper, {
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
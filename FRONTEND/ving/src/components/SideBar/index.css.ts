import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';
import { columnbox, defaultBox, rowbox } from '@/styles/box.css';
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
    justifyContent: 'center'
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
  defaultBox,
  {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    width: '100%',
    height: calc.subtract(`100% - ${vars.space['5x']}`)
  }
]);

// 사이드 랭킹 관련 스타일 시작

export const SearchBarContainer = style([
  rowbox, {

}])

export const SearchBarInputBox = style({
  width: '100%',
  border: `1px solid ${vars.colors.gray}`,
  padding: '4px 8px',
  borderRadius: vars.borderRadius['0.5x'],
})

export const input = style({
  flex: 1,
  border: 'none',
  outline: 'none',
  padding: '8px',
})

export const searchIcon = style({
  backgroundColor: vars.colors.lightGray,
  borderRadius: vars.borderRadius['0.5x'],
  border: 'none',
  cursor: 'pointer',
  margin: '0px 0px 0px 3px',
  padding: '8px',
  fontSize: vars.fontSize['2x'],
})

export const autocompleteList = style({
  position: 'absolute',
  backgroundColor: vars.colors.white,
  // 테두리 주니까 밑줄 모양이 남음.. 일단 보류
  // border: `1px solid ${vars.colors.gray}`,
  maxHeight: 200,
  width: 243,
  overflowY: 'auto',
  zIndex: 100,
})

export const searchUserImage = style({
  width: 45,
  height: 45, 
  borderRadius: vars.borderRadius.full,
  border: `2.5px solid ${vars.colors.black}`,
  margin: '0px 5px 0px 0px'
})

export const autocompleteItem = style([
  rowbox, {
  margin: '5px 0px 5px 0px'
  }
])
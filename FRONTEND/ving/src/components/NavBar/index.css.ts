import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css'
import { betweenBox, columnbox, defaultBox, rowbox } from '@/styles/box.css';

export const container = style([
  betweenBox,
  {
    position: 'fixed',
    width: '100%',
    backgroundColor: vars.colors.white,
    height: 50,
    padding: `0 ${vars.space['1x']} 0 ${vars.space['1x']}`,
    boxShadow: vars.boxShadow['1x'],
    zIndex: 3001,
    // overflow: 'visible'
  }
])

export const leftNavBox = style([
  rowbox,
  {
    gap: vars.space['1x']
  }
])

export const centerBox = style([
  rowbox,
  {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  }
])

export const rightNavBox = style([
  rowbox,
  {
    gap: vars.space['1x']
  }
])

export const logo = style([
  rowbox,
  {
    width: 'auto',
    height: 32,
  }
])


// studioNav.tsx

export const studioNavBox = style([
  rowbox,
  {
    gap: vars.space.none,
  }
])

export const textLogo = style([
  rowbox,
  {
    width: 'auto',
    height: 12,
  }
])


// profileMenu.tsx

export const profileMenuContainer = style({
  position: 'relative',
  cursor: 'pointer',
});

export const avatarButton = style([
  columnbox,
  {
    backgroundImage: 'url("/path/to/avatar.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    border: 'none',
    borderRadius: '50%',
  }
]);

// SeachBar 관련 style 시작

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

// SeachBar 관련 style 끝
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
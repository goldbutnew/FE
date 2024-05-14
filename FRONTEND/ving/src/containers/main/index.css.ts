import { slideOut } from '@/components/BottomSheet/index.css'
import { plainButton } from '@/styles/common.css'
import { bold } from '@/styles/fonts.css'
import { vars } from '@/styles/vars.css'
import { centerWrapper, columnWrapper, rowWrapper, startWrapper } from '@/styles/wrapper.css'
import { style } from '@vanilla-extract/css'

// MainGrid.tsx 시작

export const mainVideoGridBox = style({
  width: '100%',
  padding: `0 ${vars.space['2x']} 0 ${vars.space['2x']}`
})

export const mainVideoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  margin: `${vars.space['2x']} 0 ${vars.space['4x']} 0`,
  gap: vars.space['2x'],
})

export const mainVideoItem = style([
  plainButton
])


export const videoThumnailContaienr = style({
  position: 'relative',
  // selectors: {
  //   '&:hover': {
  //     backgroundColor: vars.colors.lightGray
  //   }
  // }
})
  

export const LiveTextBadge = style({
  position: 'absolute',
  top: 8,
  left: 8,
  display: 'inline-block',
  padding: `0 ${vars.space['0.5x']}`,
  backgroundColor: vars.colors.red, 
  borderRadius: vars.borderRadius['0.5x'],
  color: vars.colors.white,
  fontSize: vars.fontSize['0.5x'],
  zIndex: 100,
})

export const viewerCounterTextBadge = style({
  position: 'absolute',
  top: 8,
  left: 44,
  display: 'inline-block',
  padding: `0 ${vars.space['0.5x']}`,
  backgroundColor: vars.colors.black,
  opacity: "0.8", 
  borderRadius: vars.borderRadius['0.5x'],
  color: vars.colors.white,
  fontSize: vars.fontSize['0.5x'],
  zIndex: 100,
})

export const imageStyle = style({
  aspectRatio: '16/9',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  borderRadius: vars.borderRadius['1x'],
  objectFit: 'cover', // 이미지 비율을 유지하면서 div에 꽉 차게 채우기
  border: `1px solid ${vars.colors.lightGray}`,
  ':hover': {
    backgroundColor: vars.colors.black,
    opacity: '0.3',
  }
})

export const roomInfoBox = style([
  rowWrapper, 
  {
  }
])

export const leftBox = style([
  columnWrapper,
  {
    // gap: vars.space['0.5x']
    margin: `0 0 0 ${vars.space['0.5x']}`
  }
])

export const rightBox = style([
  columnWrapper,
  {
    gap: vars.space['0.5x'],
  }
])

export const leftBoxItem = style([
  startWrapper,
  {
    height: '100%',
  }
])

export const streamingTitle = style([
  bold,
  {
    fontSize: vars.fontSize['1x'],
    overflow: 'hidden', 
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
])

export const streamerName = style({
  fontSize: vars.fontSize['0.5x'],
  ':hover': {
    backgroundColor: vars.colors.gray,
    borderRadius: vars.borderRadius['0.5x']
  },
})

export const showMoreContainer= style([
  rowWrapper,
  {
    // margin: `0 0 ${vars.space['4x']} 0`,
    // opacity: 50,
    // transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out',
  }
])

export const showMoreButtonBox = style([
  plainButton,
  {
    margin: `${vars.space['1x']} 0`,
    padding: `${vars.space['0.5x']} ${vars.space['2x']}`,
    border: `1px solid ${vars.colors.gray}`,
    borderRadius: vars.borderRadius['2x'],
    color: vars.colors.darkGray,
    fontSize: vars.fontSize['0.5x'],
    whiteSpace: 'nowrap',
  }
])

export const showMoreButtonText = style([
  centerWrapper,
  {
    width: "100%",
    ":hover": {
      opacity: '0.7',
    }
}])

export const showMoreBox = style({
  width: '100%'
})

export const carouselContainer = style({
  display: 'flex',
  flexDirection: 'row',
  margin: `${vars.space['6x']} auto`,
  overflow: 'hidden'
})

export const carouselSlide = style({
  display: 'flex',
  width: '300%',
  transition: 'transform 0.5s ease-in-out',
  willChange: 'transform'
})

export const carouselItem = style({
  width: 'calc(100% / 3)',
  display: 'flex',
  alignItems: 'center',
})

export const itemDetails = style({
  backgroundColor: vars.colors.white,
  padding: 20,
  width: 350,
  height: '100%',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
})

export const prev = style({
  backgroundColor: vars.colors.white,
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  selectors: {
    '&:hover': {
    backgroundColor: vars.colors.white
    }
  }
})

export const next = style({
  backgroundColor: vars.colors.white,
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  selectors: {
    '&:hover': {
    backgroundColor: vars.colors.white
    }
  }
})

export const carouselImage = style({
  width: 400,
  aspectRatio: "4/3",
  objectFit: 'cover',
})

// Footer.tsx

export const footerContainer = style([
  centerWrapper,
  {
    flexDirection: 'column',
    width: '100%',
    fontSize: vars.fontSize['0.75x'],
    margin: `${vars.space['5x']} 0`,
    color: vars.colors.darkGray
  }
])

export const contactEmail = style({
  ':hover': {
    opacity: '0.7',
  }
})
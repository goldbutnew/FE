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
  // gridTemplateColumns: 'repeat(4, 1fr)', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  margin: `${vars.space['2x']} 0`,
  gap: vars.space['2x'],
  // '& > :nth-child(4n)': { 
  //   margin: `0 ${vars.space['2x']} 0 0`
  // }
})

export const mainVideoItem = style([
  plainButton,
  {
    width: "100%",
    aspectRatio: "4/3",
    objectFit: 'cover',
    // backgroundColor: 'black',
  }
])

export const imageStyle = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // 이미지 비율을 유지하면서 div에 꽉 차게 채우기
})

export const roomInfoBox = style([
  rowWrapper, 
  {
  }
])

export const leftBoxContainer = style([
  rowWrapper,
  {
    gap: 10,
  }
])

export const leftBox = style([
  columnWrapper,
  {
    margin: `0 0 0 ${vars.space['0.5x']}`
  }
])

export const rightBox = style([
  columnWrapper,
  {
    gap: 5,
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
  fontSize: vars.fontSize['0.5x']
})

export const showMoreBox = style([
  rowWrapper,
  {
    margin: `0 0 ${vars.space['4x']} 0`,
    opacity: 50,
    transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out',
  }
])

export const showMoreButtonBox = style([
  centerWrapper,
  plainButton,
  {
    margin: `${vars.space['1x']} ${vars.space['0.5x']}`,
    border: `2px solid ${vars.colors.gray}`,
    padding: `${vars.space['0.5x']} ${vars.space['2x']}`,
    borderRadius: vars.borderRadius['2x'],
    color: vars.colors.darkGray,
  }
])

export const showMoreLineBottomBox = style({
  width: '100%'
})

export const showMoreLineTopBox = style({
  width: '100%',
  borderBottom: `2px solid ${vars.colors.gray}`,
})

export const showMoreLeftBox = style({
  width: '100%'
})

export const showMoreRightBox = style({
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
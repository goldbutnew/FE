import { vars } from '@/styles/vars.css'
import { style } from '@vanilla-extract/css'
import { flex } from '@/styles/common.css'
import { betweenWrapper, centerWrapper, columnWrapper, defaultWrapper, endWrapper, rowWrapper } from '@/styles/wrapper.css'
import { bold } from '@/styles/fonts.css'

// ProfileUserInfoBox.tsx

export const userInfoBox = style([
  betweenWrapper, 
  {
    margin: `0 0 ${vars.space['2x']} 0`
  }
])

export const userImageNameInfoBox = style([
  rowWrapper, 
  {
  }
])

export const userTextInfoBox = style([
  columnWrapper,
  {
    gap: vars.space['0.5x'],
    margin: `0 0 0 ${vars.space['1.5x']}`
  }
])

export const userName = style([
  bold,
  {
    fontSize: vars.fontSize['2x'],
  }
])

export const followerText = style([
  bold,
  {
    fontSize: vars.fontSize['0.75x'],
    color: vars.colors.darkGray
  }
])

export const userIntroduce = style({
  fontSize: vars.fontSize['1x'],
})

export const followerBox = style([
  rowWrapper, 
  {
    alignItems: 'flex-end',
  }
])


export const alarmIcon = style([
  centerWrapper,
  {
    borderRadius: vars.borderRadius.full,
    backgroundColor: vars.colors.lightGray,
    border: 'none',
    cursor: 'pointer',
    margin: `0 0 0 ${vars.space['1x']}`,
    padding: 3,
    // selectors: {
    //   '&:hover .tooltip': {
    //     visibility: 'visible',
    //     opacity: 1,
    //   }
    // }
  }
])

export const notificationHoverText = style({
  position: 'relative',
  selectors: {
    '&::before': { 
      fontSize: vars.fontSize['0.5x'],
      content: 'attr(data-hover)',  
      visibility: 'hidden',
      opacity: 0,
      width: 'max-content',
      backgroundColor: vars.colors.black,
      color: vars.colors.white,
      textAlign: 'center',
      borderRadius: vars.borderRadius['1x'],
      padding: `${vars.space['0.5x']} ${vars.space['1x']}`,
      transition: 'opacity 1s ease-in-out',
      position: 'absolute',
      zIndex: 1,
      left: 0,
      top: '110%',
    },
    '&:hover::before': {  
      opacity: 1,
      visibility: 'visible',
    }
  }
})

// export const tooltipStyle = style({
//   position: 'absolute',
//   backgroundColor: 'black',
//   color: 'white',
//   padding: '5px 10px',
//   borderRadius: '4px',
//   visibility: 'hidden',
//   opacity: 0,
//   transition: 'visibility 0s, opacity 0.5s linear',
//   bottom: '100%',
//   left: '50%',
//   transform: 'translateX(-50%)',
//   whiteSpace: 'nowrap',
// })


// TabsComponent.tsx

export const tabList = style({
  display: 'flex',
  listStyle: 'none',
  gap: vars.space['1x'],
  margin: 0,
  padding: 0,
})

export const tab = style({
  padding: `${vars.space['1x']} ${vars.space['2x']}`,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.lightGray,
      borderRadius: vars.borderRadius['1x']
    },
    '&[data-active="true"]': {
      backgroundColor: vars.colors.lightGray,
      borderRadius: vars.borderRadius['1x']
    },
  },
})

export const tabPanel = style({
})


// ProfileTabComponent.tsx

export const socialLinkBox = style([
  rowWrapper,
  {
    gap: vars.space['0.5x'],
    padding: `${vars.space['0.5x']} 0`,
    fontSize: vars.fontSize['0.75x']  
  }
])

export const socialLinkItemTitle = style([
  bold,
  {
    
  }
])

export const profileTabItemTitleBox = style([
  rowWrapper,
  {
    margin: `0 0 ${vars.space['1x']} 0`
  }
])

export const profileTabItemTitle = style([
  bold,
  {
    margin: `0 0 0 ${vars.space['1x']}`,
    fontSize: vars.fontSize['1x']
  }
])

export const representativeVideoInfo = style([
  rowWrapper, 
  {
  }
])

export const representativevideoThumnail = style({
  width: 200,
  aspectRatio: "4/3",
  cursor: 'pointer',
})

export const representativevideoInfoBox = style([
  columnWrapper, 
  {
    gap: vars.space['1x'],
    margin: `0 0 0 ${vars.space['1x']}`,
    cursor: 'pointer',
  }
])


// VideoTabComponent.tsx

export const videoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  margin: `${vars.space['2x']} 0`,
  gap: vars.space['2x'] /* 모든 그리드 아이템 사이에 15px의 간격 */
})

export const videoItem = style({
  position: 'relative',
  width: '100%',
  margin: `0 0 ${vars.space['2x']} 0`
})

export const pinIcon = style({
  position: 'absolute',
  top: 10,
  left: 10,
  color: vars.colors.black,
})

export const videoThumbnail = style({
  width: "100%",
  aspectRatio: "16/9",
  objectFit: 'cover',
  cursor: 'pointer',
})

export const videoInfoContainer = style([
  rowWrapper,
  {
    cursor: 'pointer',
  }
])

export const videoInfoBox = style([
  columnWrapper, 
  {
    alignItems: 'flex-start',
    padding: `0 0 0 ${vars.space['0.5x']}`,
    width: '100%'
  }
])

export const videoInfoText = style({
  fontSize: vars.fontSize['0.5x']
})

export const videoItemellipsisButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: vars.borderRadius['0.5x'],
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.lightGray
    }
  }
})

// VideoTabComponent 관련 style 끝

export const rankListBox = flex({
  justify: 'start',
  align: 'start',
})

export const rankList = style({
  listStyleType: 'none',
})

export const rankNumber = style({
  fontSize: `${vars.fontSize['4x']}`
})

export const rankerImage = style({
  width: 40,
  height: 40,
  borderRadius:  vars.borderRadius.full
})

export const rankOutBox = style({
  width: 150,
  // padding: '0px 0px 0px 5px'
})

// export const pinIconStyle = style({
//   width: 60,
//   height: 60
// })
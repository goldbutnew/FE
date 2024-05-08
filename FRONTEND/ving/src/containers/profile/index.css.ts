import { vars } from '@/styles/vars.css'
import { style } from '@vanilla-extract/css'
import { flex } from '@/styles/common.css'
import { betweenBox, columnbox, defaultBox, endBox, rowbox } from '@/styles/box.css'

// ProfileUserInfoBox 관련 style 시작
export const userInfoBox = style([
  betweenBox, {
    backgroundColor: vars.colors.white,
    padding: '8px 16px',
}])

export const userImageNameInfoBox = style([
  rowbox, {
}])

export const userImage = style({
  width: 80,
  height: 80, 
  borderRadius: vars.borderRadius.full,
  border: `2.5px solid ${vars.colors.black}`
})

export const userTextInfoBox = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '0px 0px 0px 10px'
})

export const userName = style({
  fontSize: vars.fontSize['2x'],
  padding: '0px 0px 3px 0px'
})

export const userIntroduce = style({
  fontSize: vars.fontSize['1x'],
})

export const followerBox = style([
  defaultBox, {
    justifySelf: 'flex-end',
}])

export const followerNotification = style([
  rowbox, {
  }
])

export const alarmIcon = style({
  display: 'flex',
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.colors.lightGray,
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',
  margin: '0px 0px 0px 5px',
  padding: 3,
  // selectors: {
  //   '&:hover .tooltip': {
  //     visibility: 'visible',
  //     opacity: 1,
  //   }
  // }
})

export const notificationHoverText = style({
  position: 'relative',
  selectors: {
    '&::before': { 
      content: 'attr(data-hover)',  
      visibility: 'hidden',
      opacity: 0,
      width: 'max-content',
      backgroundColor: 'black',
      color: '#fff',
      textAlign: 'center',
      borderRadius: '5px',
      padding: '5px',
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

// ProfileUserInfoBox 관련 style 끝
// TabsComponent 관련 style 시작

export const tabsContainer = style({
  padding: 16
})

export const tabList = style({
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const tab = style({
  padding: '10px 20px',
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
  margin: '15px 0px 0px 0px',
  padding: '20px 0px 20px 0px',
  borderTop: `3px solid ${vars.colors.lightGray}`,
})

// TabsComponent 관련 style 끝
// ProfileTabComponent 관련 style 시작
export const socialLinkBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  padding: '3px 0',
})

export const socialTitleBox = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  margin: '0px 0px 15px 0px'
})

export const socialTitle = style({
  margin: '0px 0px 0px 10px',
  fontSize: vars.fontSize['2x']
})

export const representativeVideoTitleBox = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  margin: '0px 0px 15px 0px'
})

export const representativeVideoTitle = style({
  margin: '0px 0px 0px 10px',
  fontSize: vars.fontSize['2x']
})

export const representativeVideoInfo = style([
  defaultBox, {
    flexDirection: 'row',
    alignItems: 'center'
}])

export const videoInfoBox = style([
  columnbox, {
  alignItems: 'flex-start',
  gap: '5px',
  padding: '0px 0px 0px 10px',
}])

export const videoAdditionalInfoText = style({
  fontSize: vars.fontSize['0.5x']
})

// ProfileTabComponent 관련 style 끝
// VideoTabComponent 관련 style 시작

export const videoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '15px' /* 모든 그리드 아이템 사이에 15px의 간격 */
})

export const videoItem = style({
  position: 'relative',
  width: '100%',
  height: 180,
  margin: '0px 0px 45px 0px'
  // overflow: 'hidden'
})

export const pinIcon = style({
  position: 'absolute',
  top: '10px',
  left: '10px',
  color: 'white',
})

export const videoThumbnail = style({
  width: "100%",
  aspectRatio: "16/9",
  objectFit: 'cover'
})

export const videoItemInfoBox = style({
  fontSize: vars.fontSize['1x'],
  padding: '4px 8px',
})

export const videoItemAdditionalInfo = style([
  rowbox, {
    alignItems: 'center',
}])

export const videoItemAdditionalTextInfo = style([
  columnbox, {
    alignItems: 'flex-start',
    padding: '0px 0px 0px 10px',
    width: '100%'
}])

export const videoItemAdditionalInfoText = style({
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
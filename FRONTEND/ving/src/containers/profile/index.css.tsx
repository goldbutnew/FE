import { vars } from '@/styles/vars.css'
import { style } from '@vanilla-extract/css'
import { flex } from '@/styles/common.css'
import { betweenBox, defaultBox, endBox, rowbox } from '@/styles/box.css'

export const userInfoBox = style([
  betweenBox, {
    backgroundColor: '#fff',
    padding: '8px 16px',
}])

export const userImageNameInfoBox = style([
  rowbox, {
}])

export const userTextInfoBox = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '0px 0px 0px 10px'
})

export const userImage = style({
  width: '80px',
  height: '80px', 
  borderRadius: '50%',
  border: '2.5px solid black'
})

export const userName = style({
  color: '#333',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  padding: '0px 0px 10px 0px'
})

export const userIntroduce = style({
  color: '#333',
  fontSize: '0.8rem',
  fontWeight: 'bold',
})


export const followerBox = style([
  defaultBox, {
    justifySelf: 'flex-end',
}])

export const tabsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#f9f9f9',
  borderRadius: '5px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
  borderBottom: '3px solid transparent',
  selectors: {
    '&:hover': {
      backgroundColor: '#F2F2F2',
      borderRadius: '10px'
    },
    '&[data-active="true"]': {
      backgroundColor: '#F2F2F2',
      borderRadius: '10px'
    },
  },
})

export const tabPanel = style({
  margin: '15px 0px 0px 0px',
  padding: '20px',
  borderTop: '3px solid #F2F2F2',
})

export const socialLinkContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  borderRadius: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '25px 20px 25px 20px'
})

export const socialTitleBox = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  margin: '0px 0px 15px 0px'
})

export const socialTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: '#666',
  textDecoration: 'none',
  margin: '0px 0px 0px 10px',
  fontSize: '27px'
})

export const socialLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: '#666',
  textDecoration: 'none',
  padding: '5px 0',
})

export const socialLogo = style({
  width: '30px',
  height: '30px'
})

export const representativeBox = style({
  margin: '25px 0px 0px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  borderRadius: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '25px 20px 25px 20px'
})

export const representativeVideoTitleBox = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  margin: '0px 0px 15px 0px'
})

export const representativeVideoTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: '#666',
  textDecoration: 'none',
  margin: '0px 0px 0px 10px',
  fontSize: '27px'
})

export const videoInfoBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: '#666',
  flexDirection: 'column',
  padding: '5px 0',
})

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
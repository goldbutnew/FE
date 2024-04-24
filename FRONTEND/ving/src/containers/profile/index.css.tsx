import { style } from '@vanilla-extract/css'

export const userInfoBox = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '8px 16px',
})

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
  color: '#333', // 여기에 실제 텍스트 색상 코드를 적용하세요.
  fontSize: '1.5rem',
  fontWeight: 'bold',
  padding: '0px 0px 10px 0px'
})

export const userIntroduce = style({
  color: '#333', // 여기에 실제 텍스트 색상 코드를 적용하세요.
  fontSize: '0.8rem',
  fontWeight: 'bold',
})

export const tabsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#f9f9f9',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
  boxShadow: '3px 3px 5px 3px #F2F2F2',
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
  boxShadow: '3px 3px 5px 3px #eee',
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

export const rankList = style({
  listStyleType: 'none',
})
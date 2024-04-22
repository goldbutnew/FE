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
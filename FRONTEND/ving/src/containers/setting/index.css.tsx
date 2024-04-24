import { style } from '@vanilla-extract/css'

export const formContainer = style({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

export const profileImageContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const profileImage = style({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  border: '2.5px solid black'
});

export const inputField = style({
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '10px 15px',
  margin: '10px 0',
  width: '100%',
});

export const submitButton = style({
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 15px',
  margin: '10px 0',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#0056b3',
  },
});
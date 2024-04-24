import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'

export const formContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: vars.borderRadius['1x'],
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
})

export const profileImageContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
})

export const profileImage = style({
  width: 80,
  height: 80,
  borderRadius: vars.borderRadius.full,
  border: `2px solid ${vars.colors.black}`,
})

export const infoText = style({
  fontSize: `${vars.fontSize['2x']}`
})

export const inputField = style({
  border: '1px solid #ddd',
  borderRadius: vars.borderRadius['1x'],
  padding: '10px 15px',
  margin: '10px 0',
  width: '100%',
})

export const submitButton = style({
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: vars.borderRadius['1x'],
  padding: '10px 15px',
  margin: '10px 0',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#0056b3',
  },
})

export const labelStyle = style({
  fontSize: '14px',
  color: '#666666',
  marginBottom: '5px',
});

export const inputStyle = style({
  border: '1px solid #e1e1e1',
  borderRadius: '4px',
  padding: '10px',
  fontSize: '14px',
  color: '#333333',
  '::placeholder': {
    color: '#aaaaaa',
  },
});

export const textInput = style([
  inputStyle,
  {
    height: '40px', // Fixed height for single-line text input
  },
]);

export const textAreaInput = style([
  inputStyle,
  {
    minHeight: '80px', // Minimum height for multi-line text area
    resize: 'vertical', // Allow vertical resize only
  },
]);

export const charLimit = style({
  fontSize: '12px',
  color: '#aaaaaa',
  textAlign: 'right',
  marginTop: '5px',
});
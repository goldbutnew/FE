import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'

export const formContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: '#fff',
  padding: 20,
  margin: '0px 0px 10px 0px',
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
])

export const charLimit = style({
  fontSize: '12px',
  color: '#aaaaaa',
  textAlign: 'right',
  marginTop: '5px',
})

export const linkLimitNote = style({
  fontStyle: 'italic',
  color: '#666', 
  fontSize: '0.75rem', 
  marginTop: '5px',
})

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px',
})

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#121212', // Dark background
  color: 'white', // White text color
  padding: '20px',
  borderRadius: '8px',
})

export const linkField = style({
  display: 'flex',
  flexDirection: 'column',
})

export const input = style({
  background: 'none',
  border: '1px solid #333',
  borderRadius: vars.borderRadius['0x'],
  padding: '8px 12px',
  color: 'white',
  margin: '0px 0px 8px 0px',
})

export const customFileUpload = style({
  padding: '6px 12px',
  cursor: 'pointer',
  background: vars.colors.white,
  borderRadius: vars.borderRadius['1x'],
  border: '1px solid #ccc'
})

export const fileInputContainer = style({
  margin: '10px 0px 0px 0px'
})

// export const linkButton = style({
//   padding: '5px 10px',
//   background: '#333',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// })
import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'
import { columnbox, defaultBox, rowbox } from '@/styles/box.css'

export const infoText = style({
  fontSize: `${vars.fontSize['2x']}`,
  margin: '15px 0px 15px 0px'
})

export const formContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  padding: 20,
  margin: '0px 0px 10px 0px',
  borderRadius: vars.borderRadius['1x'],
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
})

export const profileImageContainer = style([
  rowbox, {
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'row',
}])

export const profileImageContentBox = style([
  rowbox, {
    padding: '0px 0px 0px 30px',
}])

export const profileImage = style({
  width: 80,
  height: 80,
  borderRadius: vars.borderRadius.full,
  border: `2px solid ${vars.colors.black}`,
})

export const fileInputContainer = style({
  margin: '10px 0px 0px 0px'
})

export const customFileUpload = style({
  padding: '4px 8px',
  margin: '0px 0px 0px 10px',
  cursor: 'pointer',
  border: `2px solid ${vars.colors.lightGray}`,
  borderRadius: vars.borderRadius['1x']
})

export const profileNicknameContainer = style([
  defaultBox, {
    flexDirection: 'row'
}])

export const profileNicknameText = style({
  fontSize: `${vars.fontSize['1x']}`,
  width: 60
})

export const profileNicknameInputBox = style([
  rowbox, {
    padding: '0px 0px 0px 65px',
    width: '100%'
}])

export const profileChannelIntroduceContainer = style([
  defaultBox, {
    flexDirection: 'row',
}])

export const profileChannelIntroduceText = style({
  fontSize: `${vars.fontSize['1x']}`,
  width: 90
})

export const profileChannelIntroduceInputBox = style([
  rowbox, {
    padding: '0px 0px 0px 40px',
    width: '100%'
}])

export const registerLinkBox = style([
  defaultBox, {
    flexDirection: 'row',
    alignItems: 'center'
}])

export const registerLinkIcon = style({
  backgroundColor: vars.colors.lightGray, 
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: vars.borderRadius.full, 
  padding: 10,
  width: 40, 
  height: 40,
})

export const registerLinkContentBox = style([
  rowbox, {
    alignItems: 'center',
    width: '100%',
}])

export const registerLinkNameUrlBox = style([
  columnbox, {
    alignItems: 'flex-start',
    width: '100%',
    padding: '0px 0px 0px 20px'
}])

export const linkField = style([
  defaultBox, {
  flexDirection: 'column',
}])

export const linkEnterField = style([
  defaultBox, {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0px 0px 5px 0px',
    width: '100%'
}])

export const inputField = style({
  border: '1px solid #ddd',
  borderRadius: vars.borderRadius['1x'],
  padding: '10px 15px',
  margin: '10px 0',
  width: '100%',
})

export const linkDeleteField = style([
  defaultBox, {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
}])

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

export const linkInputBox = style({
  width: '100%',
  padding: '0px 7px 0px 0px',
})
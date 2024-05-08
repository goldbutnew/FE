import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'
import { columnbox, defaultBox, rowbox, startBox } from '@/styles/box.css'
import { bold } from '@/styles/fonts.css'

// 기본 정보

export const settingTitle = style([
  bold,
  {
    fontSize: vars.fontSize['2x'],
    margin: `0 0 ${vars.space['3x']} 0`
  }
])

export const settingSubtitle = style({
  fontSize: `${vars.fontSize['1.5x']}`,
})

export const CardContentContainer = style([
  columnbox,
  {
    margin: `0 0 ${vars.space['1x']} 0`,
    gap: vars.space['2x']
  }
])

export const defaultSettingItemBox = style([
  rowbox, 
  {
  }
])

export const defaultSettingItemTitle = style({
  display: 'flex',
  flex: '0 0 30%',
})

export const defaultSettingItemContent = style([
  rowbox, 
  {
  }
])


// 채널 정보

export const channelSettingItemBox = style([
  rowbox, 
  {
    alignItems: 'flex-start',
  }
])

export const channelSettingItemTitle = style({
  display: 'flex',
  flex: '0 0 30%',
  margin: `${vars.space['2x']} 0`
})


export const channelSettingItemContent = style([
  columnbox, 
  {
    width: '100%'
  }
])

export const socailLinkItemContainer = style({
  borderRadius: vars.borderRadius['1x'],
  backgroundColor: vars.colors.lightGray,
  padding: vars.space['2x'],
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

export const addLinkButtonContainer = style({
  margin: `${vars.space['1x']} 0`,
})

export const linkLimitNote = style({
  // fontStyle: 'italic',
  color: vars.colors.darkGray, 
  fontSize: vars.fontSize['0.5x'], 
  margin: `0 0 ${vars.space['0.5x']} 0`
})

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.space['0.5x'],
  margin: `${vars.space['1x']} 0 ${vars.space['4x']} 0`,
})
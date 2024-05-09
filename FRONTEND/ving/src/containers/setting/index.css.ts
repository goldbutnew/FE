import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/vars.css'
import { centerWrapper, columnWrapper, defaultWrapper, endWrapper, rowWrapper, startWrapper } from '@/styles/wrapper.css'
import { bold } from '@/styles/fonts.css'
import { plainButton } from '@/styles/common.css'

// index.tsx

export const settingTitle = style([
  bold,
  {
    fontSize: vars.fontSize['2x'],
    margin: `0 0 ${vars.space['5x']} 0`
  }
])

export const settingFormContainer = style([
  {
  }
])

// 기본 정보


export const settingSubtitle = style({
  fontSize: `${vars.fontSize['1.5x']}`,
})

export const CardContentContainer = style([
  columnWrapper,
  {
    margin: `0 0 ${vars.space['1x']} 0`,
    gap: vars.space['2x'],
    // border: '1px solid red',
  }
])

export const defaultSettingItemBox = style([
  rowWrapper, 
  {
  }
])

export const defaultSettingItemTitle = style({
  display: 'flex',
  flex: '0 0 20%',
})

export const defaultSettingItemContent = style([
  rowWrapper, 
  {
  }
])

export const customFileUpload = style([
  plainButton,
  {
    padding: `${vars.space['0.5x']} ${vars.space['1x']}`,
    margin: `0 0 0 ${vars.space['1x']}`,
    cursor: 'pointer',
    border: `2px solid ${vars.colors.lightGray}`,
    borderRadius: vars.borderRadius['1x']
  }
])


// 채널 정보

export const channelSettingItemBox = style([
  rowWrapper, 
  {
    alignItems: 'flex-start',
  }
])

export const channelSettingItemTitle = style({
  display: 'flex',
  flex: '0 0 20%',
  margin: `${vars.space['2x']} 0`
})

export const channelSettingItemContent = style([
  columnWrapper, 
  {
    width: '100%',
    gap: vars.space['1x'],
  }
])

export const registerLinkBox = style([
  rowWrapper, 
  {
    width: '100%',
    borderRadius: vars.borderRadius['1x'],
    backgroundColor: vars.colors.lightGray,
    padding: vars.space['2x'],
  }
])

export const registerLinkIcon = style([
  centerWrapper,
  {
    backgroundColor: vars.colors.gray, 
    borderRadius: vars.borderRadius.full, 
    padding: vars.space['1.5x'],
  }
])

export const registerLinkNameUrlBox = style([
  columnWrapper,
  {
    width: '100%',
    padding: `0 0 0 ${vars.space['2x']}`,
}])

export const addLinkBox = style([
  defaultWrapper, 
  {
    margin: `${vars.space['1x']} 0`,
    flexDirection: 'column',
    gap: vars.space['1x']
  }
])

export const registerLinkButtonContainer = style([
  endWrapper,
  {
    width: '100%',
    gap: vars.space['0.5x']
  }
])

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
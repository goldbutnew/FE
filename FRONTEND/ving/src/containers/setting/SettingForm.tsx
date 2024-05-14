import React, { useEffect, useState } from 'react'
import * as styles from './index.css'

import SmallButton from "@/components/Button/SmallButton"
import Textarea from '@/components/Input/TextArea'
import DefaultInput from '@/components/Input/DefaultInput'
import useProfileStore from '@/store/ProfileStore'
import { FiLink } from "react-icons/fi"
import useAuthStore from '@/store/AuthStore'
import useSettingStore from '@/store/SettingStore'
import Card from '@/components/Card'
import ProfileImage from '@/components/ProfileImg'
import { vars } from '@/styles/vars.css'

interface Link {
  id: number
  title: string
  url: string
}

interface UserInfoBoxProps {
  nickname: string
  photoUrl: string
  introduction: string
}

export default function SettingForm() {
  const { profileData, getUserProfileInfo, patchUserProfileInfo, getLoginUserInfo } = useProfileStore()

  const [nickname, setNickname] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthStore()
  const loginUserName = userData.username
  
  useEffect(() => {
    const initData = async () => {
      await getUserProfileInfo(userData.username)
    }
    initData()
    setIsLoading(true)
    console.log(profileData)
  }, [getUserProfileInfo, loginUserName])

  useEffect(() => {
    if (profileData) {
      setPhotoUrl(profileData.photoUrl || '')
      setNickname(profileData.nickname || '')
      setIntroduction(profileData.introduction || '')
      setRegisterLinks(profileData.links || [])
    }
  }, [profileData])
  

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        setPhotoUrl(event.target.result)
      }
      reader.readAsDataURL(file)
      setFile(file)
    }
  }

  const handleUpdateProfile = async () =>  {
    const formData = new FormData()
  
    if (nickname !== profileData.nickname) {
      formData.append('nickname', nickname)
    } else {
      formData.append('nickname', profileData.nickname)
    }
  
    if (introduction !== profileData.introduction) {
      formData.append('introduction', introduction)
    } else {
      formData.append('introduction', profileData.introduction)
    }
  
    if (file) {
      formData.append('photo', file)
    } else if (profileData.photoUrl) {
      // 사진은 수정 안 하고 닉네임이랑 채널 소개만 할 경우
      console.log(profileData.photoUrl)
      try {
        const response = await fetch(profileData.photoUrl)
        if (!response.ok) {
          throw new Error('네트워크 오류')
        }
        const imageBlob = await response.blob()
        console.log(imageBlob, '이미지 블롭화~~~~~~')
        formData.append('photo', imageBlob, 'image.jpg')
      } catch (error) {
        console.error('이미지 블롭화 실패', error)
      }
    }

    for (let [key, value] of formData) {
      console.log(key, value)
    }

    try {
      // 프로필 업데이트 API 호출
      await patchUserProfileInfo(formData)
      console.log(loginUserName, '프로필 수정하면 우측 상단 사진도 바뀌어야지. 그래야지. 왜 안돼----------')
      
      // 로그인 사용자 정보 갱신
      await getLoginUserInfo(loginUserName)
    } catch (error) {
        console.error('프로필 업데이트 중 에러 발생:', error)
    }

      // location.reload()
    }

  const [file, setFile] = useState(null)
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')

  const [links, setLinks] = useState<Link[]>([])
  const [registerLinks, setRegisterLinks] = useState<Link[]>(profileData.links || [])
  const {doAddLink, doDeleteLink} = useSettingStore()

  const addLinkField = ({ url, title }: { linkId: number, url: string, title: string  }) => {
    setLinks([...links, { id: Date.now(), title: title, url: url }])
  }

  const addRegisterList = ({ linkId, url, title }: { linkId: number, url: string, title: string  }) => {
    setRegisterLinks([...registerLinks, { id: Date.now(), title: title, url: url }])
    setLinks(links.filter((link) => link.id !== linkId))
    doAddLink(url, title)
  }

  const updateLink = (id: number, field: 'title' | 'url', value: string) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    )
  }

  const removeLinkField = (id: number) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const removeRegisterLinkField = ({ linkId, url, title }: { linkId: number, url: string, title: string }) => {
    setRegisterLinks(registerLinks.filter((link) => link.title !== title))
    doDeleteLink(url, title)
  }

  if (isLoading) {
  return (
    <div>
      <span className={styles.settingSubtitle}>기본 정보</span>
      <Card>
        <div className={styles.CardContentContainer}>
          <div className={styles.defaultSettingItemBox}>
          <span className={styles.defaultSettingItemTitle}>
            프로필 이미지
          </span>
          <div className={styles.defaultSettingItemContent}>
            <ProfileImage
              url={photoUrl}
              width={80}
              alt="Profile"
            />
            <input
              type="file"
              id="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <label htmlFor="file" className={styles.customFileUpload}>
              이미지 수정
            </label>
          </div>
        </div>
        <div className={styles.defaultSettingItemBox}>
          <span className={styles.defaultSettingItemTitle}>
            닉네임
          </span>
          <DefaultInput
            type="text"
            value={nickname || ''}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={30}
          />
        </div>
        <div className={styles.defaultSettingItemBox}>
          <span className={styles.defaultSettingItemTitle}>
            채널 소개
          </span>
          <Textarea
            value={introduction || ''}
            onChange={(event) => setIntroduction(event.target.value)}
            maxLength={100}
          />
        </div>        
      </div>
    </Card>
    <br />
    <span className={styles.settingSubtitle}>채널 정보</span>
    <Card>
      <div className={styles.CardContentContainer}>
        <div className={styles.channelSettingItemBox}> 
          <span className={styles.channelSettingItemTitle}>
            소셜 링크
          </span>
          <div className={styles.channelSettingItemContent}>
            {registerLinks.map((link, index) => (
              <div key={index} className={styles.registerLinkBox}>
                  <div className={styles.registerLinkIcon}>
                    <FiLink />
                  </div>
                  <div className={styles.registerLinkNameUrlBox}>
                    <span>{link.title}</span>
                    <span>{link.url}</span>
                  </div>
                  <SmallButton 
                    text='삭제' 
                    color={vars.colors.gray} 
                    onClick={() => removeRegisterLinkField({linkId: link.id, url: link.url, title: link.title})} 
                  />
              </div>
            ))}
            {links.map((link, index) => (
              <div key={link.id}>
                <div className={styles.addLinkBox}>
                  <DefaultInput
                    type="text"
                    value={link.title}
                    onChange={(event) => updateLink(link.id, 'title', event.target.value)}
                    placeholder="링크 제목을 입력해 주세요"
                    maxLength={30}
                  />
                  <DefaultInput
                    type="text"
                    value={link.url}
                    onChange={(event) => updateLink(link.id, 'url', event.target.value)}
                    placeholder="링크 URL을 입력해 주세요"
                    maxLength={30}
                  />
                  <div className={styles.registerLinkButtonContainer}>
                    <SmallButton text='등록' color={vars.colors.gray} onClick={() => addRegisterList({linkId: link.id, url: link.url, title: link.title})} />
                    <SmallButton text='취소' color={vars.colors.gray} onClick={() => removeLinkField(link.id)} />
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.addLinkButtonContainer}>
              {(registerLinks.length + links.length) < 3 && (
                <SmallButton text='링크 추가' color={vars.colors.gray} onClick={() => addLinkField({ url: '', title: '' })} />
              )}
            </div>
            <span className={styles.linkLimitNote}>· 최대 3개까지 등록할 수 있습니다.</span>
          </div>
        </div>
      </div>
    </Card> 

    <div className={styles.buttonContainer}>
      <SmallButton text="취소" color={vars.colors.gray} />
      <SmallButton 
        onClick={() => {handleUpdateProfile()}} 
        text="저장" 
        color='black' 
      />
    </div>
  </div>
)}}
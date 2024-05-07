import React, { useEffect, useState } from 'react'
import * as styles from './index.css'

import SmallButton from "@/components/Button/SmallButton"
import Textarea from '@/components/Input/TextArea'
import DefaultInput from '@/components/Input/DefaultInput'
import useProfileStore from '@/store/ProfileStore'
import { FiLink } from "react-icons/fi"
import useAuthStore from '@/store/AuthStore'
import useSettingStore from '@/store/SettingStore'

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
  const { profileData, getUserProfileInfo, patchUserProfileInfo } = useProfileStore<UserInfoBoxProps>()

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
  
  const formData = new FormData()

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        setPhotoUrl(event.target.result)
        formData.append('photo', file)
      }
      reader.readAsDataURL(file)
      setFile(file)
    }
  }

  const handleUpdateProfile = () => {
    const formData = new FormData()
  
    if (nickname !== profileData.nickname) {
      formData.append('nickname', nickname)
    }
  
    if (introduction !== profileData.introduction) {
      formData.append('introduction', introduction)
    }
  
    if (file) { // file 상태를 직접 사용
      formData.append('photo', file)
    }

    // if (photoUrl !== profileData.photoUrl) {
    //   formData.append('photoUrl', file, 'profile-image.png')
    // }
    for (let [key, value] of formData) {
      console.log(key, value)
    }
    patchUserProfileInfo(formData)

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
    <p className={styles.infoText}>기본 정보</p>
    <div className={styles.formContainer}>
      <div className={styles.profileImageContainer}>
        <span>프로필 이미지</span>
        <div className={styles.profileImageContentBox}>
          <img
            src={photoUrl}
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.fileInputContainer}>
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
      </div>
      <div className={styles.profileNicknameContainer}>
        <span className={styles.profileNicknameText}>닉네임</span>
        <div className={styles.profileNicknameInputBox}>
          <DefaultInput
            type="text"
            value={nickname || ''}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={30}
          />
        </div>
      </div>
      <div className={styles.profileChannelIntroduceContainer}>
        <span className={styles.profileChannelIntroduceText}>채널 소개</span>
        <div className={styles.profileChannelIntroduceInputBox}>
          <Textarea
            value={introduction || ''}
            onChange={(event) => setIntroduction(event.target.value)}
            maxLength={100}
          />
        </div>
      </div>
    </div>
    <p className={styles.infoText}>채널 정보</p>
    {registerLinks.map((link, index) => (
      <div key={link.id} className={`${styles.formContainer}`}>
        <div className={styles.registerLinkBox}>
          <div className={styles.registerLinkIcon}>
            <FiLink />
          </div>
          <div className={styles.registerLinkContentBox}>
            <div className={styles.registerLinkNameUrlBox}>
              <span>{link.title}</span>
              <span>{link.url}</span>
            </div>
            <SmallButton text='삭제' color='lightGray' onClick={() => removeRegisterLinkField({linkId: link.id, url: link.url, title: link.title})} />
          </div>
        </div>
      </div>
      ))}
    {links.map((link, index) => (
    <div key={link.id} className={`${styles.formContainer}`}>
        <div className={styles.linkField}>
          <div className={styles.linkEnterField}>
            <div className={styles.linkInputBox}>
              <DefaultInput
                type="text"
                value={link.title}
                onChange={(event) => updateLink(link.id, 'title', event.target.value)}
                placeholder="링크 제목을 입력해 주세요"
                maxLength={30}
              />
            </div>
              <SmallButton text='등록' color='lightGray' onClick={() => addRegisterList({linkId: link.id, url: link.url, title: link.title})} />
          </div>
          <div className={styles.linkDeleteField}>
            <div className={styles.linkInputBox}>
              <DefaultInput
                type="text"
                value={link.url}
                onChange={(event) => updateLink(link.id, 'url', event.target.value)}
                placeholder="링크 URL을 입력해 주세요"
                maxLength={30}
              />
            </div>
              <SmallButton text='삭제' color='lightGray' onClick={() => removeLinkField(link.id)} />
          </div>
        </div>
      </div>
      ))}
      {(registerLinks.length + links.length) < 3 && (
        <SmallButton text='링크 추가' color='lightGray' onClick={() => addLinkField({ url: '', title: '' })} />
      )}
        <span className={styles.linkLimitNote}>· 최대 3개까지 등록할 수 있습니다.</span>
        <div className={styles.buttonContainer}>
        <SmallButton text="취소" color='lightGray' />
        <SmallButton onClick={() => {
          handleUpdateProfile()
        }} text="저장" color='black' />
      </div>
  </div>
  )
}
}
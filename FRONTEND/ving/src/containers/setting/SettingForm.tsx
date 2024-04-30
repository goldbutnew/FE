import React, { useEffect, useState } from 'react'
import * as styles from './index.css'

import SmallButton from "@/components/Button/SmallButton"
import { columnbox, rowbox, betweenBox } from "@/styles/box.css"
import Textarea from '@/components/Input/TextArea'
import DefaultInput from '@/components/Input/DefaultInput'
import useProfileStore from '@/store/ProfileStore'

interface Link {
  id: number
  name: string
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
  
  useEffect(() => {
    const initData = async () => {
      await getUserProfileInfo()
    }
    initData()
    setIsLoading(true)
    console.log(profileData)
  }, [getUserProfileInfo])

  useEffect(() => {
    if (profileData) {
      setPhotoUrl(profileData.photoUrl || '')
      setNickname(profileData.nickname || '')
      setIntroduction(profileData.introduction || '')
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
        console.log(file)
      }
      reader.readAsDataURL(file)
      setFile(file)
    }
    console.log('--------', file)

    // formData.append('photo', {
    //   name: imageName,
    //   type: imageType,
    //   uri: imageUri,
    //   // uri: 'http://www.foodsafetykorea.go.kr/uploadimg/20141118/20141118102019_1416273619379.jpg',
    // })
  }

  const handleUpdateProfile = () => {
    const formData = new FormData();
  
    if (nickname !== profileData.nickname) {
      formData.append('nickname', nickname);
    }
  
    if (introduction !== profileData.introduction) {
      formData.append('introduction', introduction);
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
  const [linkName, setLinkName] = useState('')
  const [linkUrl, setLinkUrl] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  const [links, setLinks] = useState<Link[]>([])
  const addLinkField = () => {
    setLinks([...links, { id: Date.now(), name: '', url: '' }]);
  }

  const updateLink = (id: number, field: 'name' | 'url', value: string) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    )
  }

  const removeLinkField = (id: number) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  if (isLoading) {
  return (
    <>
    <span className={styles.infoText}>기본 정보</span>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={` ${rowbox} ${styles.profileImageContainer}`}>
        <span>프로필 이미지</span>
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
      <div className={`${rowbox}`}>
        <span>닉네임</span>
        <div className={`${rowbox}`}>
          <DefaultInput
            type="text"
            value={nickname || ''}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={30}
          />
        </div>
      </div>
      <div className={`${rowbox}`}>
        <span>채널 소개</span>
        <div className={`${rowbox}`}>
          <Textarea
            value={introduction || ''}
            onChange={(event) => setIntroduction(event.target.value)}
            maxLength={100}
          />
        </div>
      </div>
    </form>
    <p className={styles.infoText}>채널 정보</p>
    {links.map((link, index) => (
    <form key={link.id} className={`${styles.formContainer}`} onSubmit={handleSubmit}>
        <div className={styles.linkField}>
          <div className={`${rowbox}`}>
            <DefaultInput
              type="text"
              value={link.name}
              onChange={(event) => updateLink(link.id, 'name', event.target.value)}
              placeholder="링크 제목을 입력해 주세요"
              maxLength={30}
            />
            <SmallButton text='등록' color='lightGray' onClick={() => removeLinkField(link.id)} />
          </div>
          <div className={`${rowbox}`}>
            <DefaultInput
              type="text"
              value={link.url}
              onChange={(event) => updateLink(link.id, 'url', event.target.value)}
              placeholder="링크 URL을 입력해 주세요"
              maxLength={30}
            />
            <SmallButton text='삭제' color='lightGray' onClick={() => removeLinkField(link.id)} />
          </div>
        </div>
      </form>
      ))}
      {links.length < 3 && ( // Limit to 3 links
        <SmallButton text='링크 추가' color='lightGray' onClick={addLinkField} />
      )}
        <span className={styles.linkLimitNote}>· 최대 3개까지 등록할 수 있습니다.</span>
        <div className={styles.buttonContainer}>
        <SmallButton text="취소" color='lightGray' />
        <SmallButton onClick={() => {
          handleUpdateProfile()
        }} text="저장" color='black' />
      </div>
  </>
  )
}
}
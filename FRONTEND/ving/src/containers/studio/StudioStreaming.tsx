'use client'

import { useState, useEffect  } from 'react'
import useStreamingStore from '@/store/StreamingStore'

import Image from 'next/image'
import logo from '#/images/main-logo.png'
import DefaultInput from '@/components/Input/DefaultInput'
import Radio from '@/components/Input/Radio'
import SmallButton from '@/components/Button/SmallButton'
import StreamingVideo from '@/components/StreamingVideo'
import * as styles from './index.css'


export default function StudioStreaming() {
  const { openPort, startStreaming, sendStreamTitle, sendStreamThumbnail, sendStreamLimit } = useStreamingStore()
  const [ isOnline, setIsOnline ] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ limit, setLimit ] = useState(false)
  const [ thumbnail, setThumbnail ] = useState('')
  const [ photoUrl, setPhotoUrl ] = useState('')

  const submitStreamSetting = () => {
    sendStreamTitle(title)
    sendStreamThumbnail(thumbnail)
    sendStreamLimit(limit)
  }
  
  const handleStream = () => {
    const formData = new FormData()
  
    formData.append('roomName', title)
    formData.append('isAdult', limit)
    formData.append('thumbNail', thumbnail)

    for (let [key, value] of formData) {
      console.log(key, value)
    }

    startStreaming(formData)
    openPort()
  } 

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const toggleLimit = () => {
    setLimit(!limit)  // limit 상태를 토글
  }

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        setPhotoUrl(event.target.result)
      }
      reader.readAsDataURL(file)
      setThumbnail(file)
    }
  }

  return (
    <div className={styles.studioStreamingContainer}>
      <div>
        <StreamingVideo />
      </div>

      <div className={styles.streamingInfoContainer}>
        <div className={styles.streamingInfoItem}>
          <label className={styles.streamingInfoTitle}>방송 제목</label>
          <DefaultInput type='text' value={title} onChange={handleTitle} placeholder='방송 제목을 입력해주세요.'/>
        </div>

        <div className={styles.streamingInfoItem}>
          {/* <label className={styles.streamingInfoTitle}>미리 보기 이미지</label>
          <Image src={logo} alt="logo" /> */}
          <img
            src={photoUrl}
            alt="Profile"
          />
          <div>
            <label className={styles.streamingInfoTitle} htmlFor="file">
              미리보기 이미지
            </label>
            <input
              type="file"
              id="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </div>
        </div>

        <div className={styles.streamingInfoItem}>
          <label className={styles.streamingInfoTitle}>연령제한</label>
          <Radio 
            text='시청자를 19세로 제한하겠습니까?'
            isActive={limit} 
            onChange={toggleLimit}
          />
        </div>
        <div className={styles.updateButtonBox}>
          <SmallButton text="업데이트" onClick={submitStreamSetting}/>
        </div>
        <div className={styles.updateButtonBox}>
          <SmallButton text="방송시작" onClick={handleStream}/>
        </div>
      </div>
    </div>
  )
}



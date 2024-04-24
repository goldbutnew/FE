import React, { useState } from 'react'
import * as styles from './index.css'

import SmallButton from "@/components/Button/SmallButton"
import { columnbox, rowbox } from "@/styles/box.css"

export default function SettingForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log({ name, message })
  }

  return (
    <>
    <span className={styles.infoText}>기본 정보</span>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={` ${rowbox} ${styles.profileImageContainer}`}>
        <span>프로필 이미지</span>
        <img 
          src='https://picsum.photos/id/1/200/300'
          alt="Profile"
          className={styles.profileImage}
        />
      </div>
      <div className={`${rowbox}`}>
        <span>닉네임</span>
        <div className={`${rowbox}`}>
          <input
            type="text"
            className={styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="황재언안티(엔씨바보)"
            maxLength={30}
          />
          <div className={styles.charLimit}>{name.length}/30</div>
        </div>
      </div>
      <div className={`${rowbox}`}>
        <span>채널 소개</span>
        <div className={`${rowbox}`}>
          <textarea
            className={styles.inputField}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="엔씨 짜증 zI대로(한화 짱...!)"
            maxLength={100}
          />
          <div className={styles.charLimit}>{message.length}/100</div>
        </div>
      </div>
    </form>
    <p className={styles.infoText}>채널 정보</p>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.inputField}
        value={name}
        onChange={(e) => setLink(e.target.value)}
        placeholder="링크 제목을 입력해 주세요"
        maxLength={30}
      />
      <div className={styles.charLimit}>{link.length}/30</div>
      <input
        type="text"
        className={styles.inputField}
        value={name}
        onChange={(e) => setLink(e.target.value)}
        placeholder="링크 제목을 입력해 주세요"
        maxLength={30}
      />
      <div className={styles.charLimit}>{link.length}/30</div>
    </form>
      <SmallButton text="취소" color='lightGray'/>
      <SmallButton text="저장" color='black' />
  </>
  )
}
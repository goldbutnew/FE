import React, { useState } from 'react'
import * as styles from './index.css'

export default function SettingForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log({ name, message });
  };

  return (
    <>
    <p>기본 정보</p>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.profileImageContainer}>
        <img 
          src='https://picsum.photos/id/1/200/300'
          alt="Profile"
          className={styles.profileImage}
        />
      </div>
      <input
        type="text"
        className={styles.inputField}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="황재언안티(엔씨바보)"
        maxLength={30}
      />
      <textarea
        className={styles.inputField}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="엔씨 짜증 zI대로(한화 짱...!)"
        maxLength={100}
      />
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
    <p>채널 정보</p>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.inputField}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="링크 제목을 입력해 주세요"
        maxLength={30}
      />
      <textarea
        className={styles.inputField}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="엔씨 짜증 zI대로(한화 짱...!)"
        maxLength={100}
      />
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  </>
  )
}
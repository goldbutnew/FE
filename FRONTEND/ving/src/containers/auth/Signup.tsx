'use client'

import { useState } from "react"
import useAuthStore from "@/store/AuthStore"

import Image from "next/image"
import logo from '#/images/MainLogo.png'
import { vars } from "@/styles/vars.css"
import { columnbox, rowbox } from "@/styles/box.css"
import * as styles from "./index.css"
import SmallButton from "@/components/Button/SmallButton"
import LargeButton from "@/components/Button/LargeButton"

export default function Signup() {
  const { isLogin, isCheck, duplicatedCheck, signup } = useAuthStore()
  
  const [userID, setUserID] = useState('')
  const [userPW, setUserPW] = useState('')
  const [userPW2, setUserPW2] = useState('')
  const [userNickname, setUserNickname] = useState('')

  const handleID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(event.target.value)
  }

  const handleCheck = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    duplicatedCheck(userID)
  }

  const handlePW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPW(event.target.value)
  }
  
  const handlePW2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPW2(event.target.value)
  }

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNickname(event.target.value)
  }

  const handleSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const data = {
      'username': userID,
      'password': userPW,
      'nickname': userNickname
    }

    signup(data)
  }

  return (
    <div className={`${columnbox} ${styles.modalContainer}`}>
      <div className={`${styles.modalTitle} ${rowbox}`}>
        <Image src={logo} alt="logo" className={styles.logo} />
        에 가입하세요!
      </div>
      <form className={columnbox}>
        <div className={rowbox}>
          <label className={styles.labelText} htmlFor="id">아이디</label>
          <input
            name="id"
            value={userID}
            onChange={handleID}
          />
          <SmallButton 
            text="중복확인"
            onClick={handleCheck}
          />
        </div>
          
        <div className={rowbox}>
          <label className={styles.labelText} htmlFor="pw">비밀번호1</label>
          <input
            name="pw"
            type="password"
            value={userPW}
            onChange={handlePW}
          />
        </div>

        <div className={rowbox}>
          <label className={styles.labelText} htmlFor="pw2">비밀번호2</label>
          <input
            name="pw2"
            type="password"
            value={userPW2}
            onChange={handlePW2}
          />
        </div>

        <div className={rowbox}>
          <label className={styles.labelText} htmlFor="pw2">닉네임</label>
          <input
            name="pw2"
            value={userNickname}
            onChange={handleNickname}
          />
        </div>
        <LargeButton 
          text="가입하기"
          onClick={handleSignup}
        />
        {/* 나중에 라지 버튼에 밑에 예시처럼 disabled 넣으면 끝 */}
        {/* <button onClick={handleSignup} disabled={!isCheck}>asdadasdada</button> */}
      </form>

    </div>
  )
}
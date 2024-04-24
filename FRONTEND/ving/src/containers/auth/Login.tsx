'use client'

import { useState } from "react"
import Image from "next/image"
import useAuthStore from "@/store/AuthStore"
import logo from '../../../public/images/MainLogo.png'
import { columnbox, rowbox } from "@/styles/box.css"
import * as styles from "./index.css"
import LargeButton from "@/components/Button/LargeButton"
import SmallButton from "@/components/Button/SmallButton"
import { vars } from "@/styles/vars.css"
import DefaultInput from "@/components/Input/defaultInput"
import Textarea from "@/components/Input/TextArea"

export default function Login() {
  const { login } = useAuthStore()
  
  const [userID, setUserID] = useState('')
  const [userPW, setUserPW] = useState('')

  const handleID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(event.target.value)
  }

  const handlePW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPW(event.target.value)
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      'userName': userID,
      'password': userPW
    }

    login(data)
  }

  return (
    <div className={`${columnbox} ${styles.modalContainer}`}>
      <div className={`${styles.modalTitle} ${rowbox}`}>
        <Image src={logo} alt="logo" className={styles.logo} />
        에 로그인      
      </div>
      <form className={columnbox} onSubmit={handleLogin}>
        <div className={`${styles.modalItem} ${rowbox}`}>
          <label className={styles.labelText} htmlFor="id">아이디</label>
          <DefaultInput
            type="text"
            value={userID}
            onChange={handleID}
            placeholder="아이디"
          />
        </div>
        <div className={`${styles.modalItem} ${rowbox}`}>
          <label className={styles.labelText} htmlFor="pw">비밀번호</label>
          <DefaultInput
            type="text"
            value={userPW}
            onChange={handlePW}
            placeholder="비밀번호"
          />          
        </div>          
        <LargeButton text="로그인" />
      </form>
    </div>
  )
}
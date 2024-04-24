'use client'

import { useState } from "react"
import Image from "next/image"
import useLoginStore from "@/store/LoginStore"
import logo from '../../../public/images/MainLogo.png'
import { columnbox, rowbox } from "@/styles/box.css"
import * as styles from "./index.css"
import LargeButton from "@/components/Button/LargeButton"
import SmallButton from "@/components/Button/SmallButton"
import { vars } from "@/styles/vars.css"
import Input from "@/components/Input/defaultInput"
import Textarea from "@/components/Input/TextArea"

export default function Login() {
  const { login } = useLoginStore()
  
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

    const userData =new URLSearchParams()
    userData.append('username', userID)
    userData.append('password', userPW)

    login(userData)
  }

  return (
    <div className={`${columnbox} ${styles.modalContainer}`}>
      <div className={`${styles.modalTitle} ${rowbox}`}>
        <Image src={logo} alt="logo" className={styles.logo} />
        에 로그인      
      </div>
      <form className={columnbox} onSubmit={handleLogin}>
        <div className={styles.InputBox}>
          <div className={rowbox}>
            <label className={styles.labelText} htmlFor="id">아이디</label>
            <Input
              type="id"
              value={userID}
              onChange={handleID}
              placeholder="아이디"
            />
          </div>
          <div className={rowbox}>
            <label className={styles.labelText} htmlFor="pw">비밀번호</label>
            <Input
              type="password"
              value={userPW}
              onChange={handlePW}
              placeholder="비밀번호"
            />          
          </div>          
        </div>
        <LargeButton text="로그인" />
        <Textarea 
          type="password"
          value={userPW}
          onChange={handlePW}
          placeholder="비밀번호"
        />
      </form>
    </div>
  )
}
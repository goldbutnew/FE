'use client'

import { useState } from "react"
import Image from "next/image"
import useLoginStore from "@/store/LoginStore"
import logo from '../../../public/images/MainLogo.png'
import { columnbox, rowbox } from "@/styles/box.css"
import * as styles from "./index.css"
import LargeButton from "@/components/Button/LargeButton"
import { vars } from "@/styles/vars.css"

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
        <div className={rowbox}>
          <label className={styles.labelText} htmlFor="id">아이디</label>
          <input
            name="id"
            value={userID}
            onChange={handleID}
          />
        </div>
        <div className={rowbox}>
          <label className={styles.labelText} htmlFor="pw">비밀번호</label>
          <input
            name="pw"
            type="password"
            value={userPW}
            onChange={handlePW}
          />          
        </div>
        <LargeButton text="로그인" color={vars.colors.black} />
      </form>
    </div>
  )
}
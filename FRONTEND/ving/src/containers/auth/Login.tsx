'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/store/AuthStore"
import { Modal } from "@/components/Modal"
import useModal from "@/hooks/useModal"

import Image from "next/image"
import logo from '#/images/main-logo.png'
import { columnWrapper, rowWrapper } from "@/styles/wrapper.css"
import * as styles from "./index.css"
import LargeButton from "@/components/Button/LargeButton"
import SmallButton from "@/components/Button/SmallButton"
import { vars } from "@/styles/vars.css"
import DefaultInput from "@/components/Input/DefaultInput"
import Textarea from "@/components/Input/TextArea"
import useProfileStore from "@/store/ProfileStore"

export default function Login({ onLoginSuccess }) {
  const { Token, login, userData } = useAuthStore()
  const { getLoginUserInfo, getCurrentTopSubscribers } = useProfileStore()

  const router = useRouter()
  const [userID, setUserID] = useState('')
  const [userPW, setUserPW] = useState('')
  const { isOpen, open, close } = useModal();

  const handleID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(event.target.value)
  }

  const handlePW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPW(event.target.value)
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      'username': userID,
      'password': userPW
    }

    login(data)
  }

  useEffect (() => {
    console.log(Token)
    if (Token) {
      getLoginUserInfo(userData.username)
      getCurrentTopSubscribers()
      router.push('/')
      onLoginSuccess()
      close()
    }
  }, [Token])

  return (
    <div className={styles.modalContainer}>
      <SmallButton
        text="로그인" 
        onClick={open}
        color={vars.colors.gray}
      />
      <Modal isOpen={isOpen} onClose={close}>
        <div className={styles.modalTitle}>
          <Image src={logo} alt="logo" className={styles.logo} />
          에 로그인      
        </div>
        <form className={columnWrapper} onSubmit={handleLogin}>
          <div className={styles.modalItem}>
            <label className={styles.labelText} htmlFor="id">아이디</label>
            <DefaultInput
              type="text"
              value={userID}
              onChange={handleID}
              placeholder="아이디"
            />
          </div>
          <div className={styles.modalItem}>
            <label className={styles.labelText} htmlFor="pw">비밀번호</label>
            <DefaultInput
              type="password"
              value={userPW}
              onChange={handlePW}
              placeholder="비밀번호"
            />          
          </div>          
          <LargeButton text="로그인" />
        </form>
      </Modal>
    </div>
  )
}
'use client'

import { useState } from "react"
import useLoginStore from "@/store/LoginStore"

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
    <div>
      <img src="/images/loginModalTitleImg.png" alt="" />
      <h2>에 로그인</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="id">아이디</label>
        <input
          name="id"
          value={userID}
          onChange={handleID}
        />
        <label htmlFor="pw">비밀번호</label>
        <input
          name="pw"
          type="password"
          value={userPW}
          onChange={handlePW}
        />
        <button type="submit">
          로그인
        </button>
      </form>
    </div>
  )
}
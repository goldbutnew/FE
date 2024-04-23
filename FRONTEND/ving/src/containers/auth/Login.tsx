'use client'

import { useState } from "react"
import useAuthStore from "@/store/AuthStore"

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
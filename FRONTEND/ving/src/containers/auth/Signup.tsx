'use client'

import { useState } from "react"
import useLoginStore from "@/store/LoginStore"

export default function Signup() {
  
  const [userID, setUserID] = useState('')
  const [userPW, setUserPW] = useState('')
  const [userPW2, setUserPW2] = useState('')
  const [userNickname, setUserNickname] = useState('')
  const [isCheck, setIsCheck] = useState(false)

  const handleID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(event.target.value)
  }

  const handleCheck = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsCheck(!isCheck)
    console.log(isCheck)
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
    const userData =new URLSearchParams()
    userData.append('username', userID)
    userData.append('password', userPW)

    // login(userData)
  }

  return (
    <div>
      <img src="/images/loginModalTitleImg.png" alt="" />
      <h2>에 가입하세요!</h2>
      <form>
        <label htmlFor="id">아이디</label>
        <input
          name="id"
          value={userID}
          onChange={handleID}
        />
        <button onClick={handleCheck}>
          중복확인
        </button>
        <label htmlFor="pw">비밀번호1</label>
        <input
          name="pw"
          type="password"
          value={userPW}
          onChange={handlePW}
        />

        <label htmlFor="pw2">비밀번호2</label>
        <input
          name="pw2"
          type="password"
          value={userPW2}
          onChange={handlePW2}
        />

        <label htmlFor="pw2">닉네임</label>
        <input
          name="pw2"
          value={userNickname}
          onChange={handleNickname}
        />

        <button onClick={handleSignup}>
          가입하기
        </button>
      </form>
    </div>
  )
}
'use client'

import React, { useState } from "react"
import useAuthStore from "@/store/AuthStore"

export default function MainPage() {
  const { userData } = useAuthStore()

  return (
    <div>
      <h3>메인 페이지</h3>
      <h3>{userData.nickname} 계정으로 로그인되었습니다.</h3>
    </div>
  )
}
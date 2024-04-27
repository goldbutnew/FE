'use client'

import React, { useState } from "react"
import useAuthStore from "@/store/AuthStore"

export default function MainPage() {
  const { userData } = useAuthStore()

  return (
    <div>
      <h1>메인 페이지</h1>
      <p>{userData.nickname}</p>
    </div>
  )
}
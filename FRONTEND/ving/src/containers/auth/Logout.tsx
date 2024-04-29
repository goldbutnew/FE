'use client'

import { useState, useEffect } from "react"
import useAuthStore from "@/store/AuthStore"
import { useRouter } from "next/navigation"

import SmallButton from "@/components/Button/SmallButton"

export default function Logout({ onLogoutSuccess }) {
  const { Token, logout } = useAuthStore()
  const router = useRouter()
  
  const handleLogout = () => {
    logout()
    onLogoutSuccess()
    router.push('/')
  }

  return (
    <div>
      {Token ? 
        <SmallButton 
          text="로그아웃"
          onClick={handleLogout}
        />:
        ''
      } 
    </div>
  )
}
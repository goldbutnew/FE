'use client'

import useAuthStore from "@/store/AuthStore"

import SmallButton from "@/components/Button/SmallButton"

export default function Logout({ onLogoutSuccess }) {
  const { Token, logout } = useAuthStore()
  
  const handleLogout = () => {
    logout()
    onLogoutSuccess()
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
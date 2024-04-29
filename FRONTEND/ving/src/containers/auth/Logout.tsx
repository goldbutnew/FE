'use client'

import useAuthStore from "@/store/AuthStore"

export default function Logout() {
  const { Token, logout } = useAuthStore()
  
  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      {Token ? 
        <button onClick={handleLogout}>로그아웃</button>:
        ''
      }
    </div>
  )
}
'use client'

import useAuthStore from "@/store/AuthStore"
import SideBar from "@/components/SideBar/SideBar"

export default function MainPage() {
  const { userData } = useAuthStore()
  const sidebarContent = (
    <div>
      {
        <div>
          zzzzzzzzzzzzzzzzzzzzzz
          ㅋㅋㅋㅋㅋ
          ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        </div>
      }
    </div>
  )

  return (
    <div>
      <SideBar 
        title="랭킹"
        side="left" 
        content={sidebarContent} 
      />
      <SideBar 
        title="채팅"
        side="right" 
        content={sidebarContent} 
      />
      <h1>메인 페이지</h1>
      <p>{userData.nickname}</p>
    </div>
  )
}
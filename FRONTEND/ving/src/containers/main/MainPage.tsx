'use client'

import React, { useState } from "react"
import useAuthStore from "@/store/AuthStore"
import SideBar from "@/components/SideBar/SideBar"

export default function MainPage() {
  const { userData } = useAuthStore()
  const [isLeftOpen, setLeftOpen] = useState(true);
  const [isRightOpen, setRightOpen] = useState(false);

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
      <h1>메인 페이지</h1>
      <p>{userData.nickname}</p>
    </div>
  )
}
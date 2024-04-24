'use client'

import { useRouter, useParams } from 'next/navigation'
import { ProfileUserInfoBox } from './ProfileUserInfoBox'
import { ProfileTabComponent } from './ProfileTabComponent'
import TabsComponent from './TabsComponent'
import SideBar from './SideBar'

export default function ProfilePage() {

  const router = useRouter()
  const params = useParams()

  return (
    <div>
      <SideBar />
      <h1>누군가의 프로필 페이지</h1>
      <ProfileUserInfoBox />
      <TabsComponent />
      {/* <ProfileTabComponent /> */}
      <button onClick={() => router.push(`${params.userId}/video`)}>
        비디오
      </button>
    </div>
  )
}
'use client'

import { useRouter, useParams } from 'next/navigation'
import ProfileUserInfoBox from './ProfileUserInfoBox'
import { ProfileTabComponent } from './ProfileTabComponent'
import TabsComponent from './TabsComponent'
import SideBar from './SideBar'

export default function ProfilePage() {

  return (
    <div>
      <SideBar />
      <h1>누군가의 프로필 홈페이지</h1>
      <ProfileUserInfoBox btnName='채널 관리' />
      <TabsComponent where='home'/>
      {/* <ProfileTabComponent /> */}
    </div>
  )
}
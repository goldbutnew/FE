'use client'

import { useRouter, useParams } from 'next/navigation'
import ProfileUserInfoBox from './ProfileUserInfoBox'
import { ProfileTabComponent } from './ProfileTabComponent'
import TabsComponent from './TabsComponent'

export default function ProfilePage() {

  return (
    <div>
      <h1>누군가의 프로필 홈페이지</h1>
      <ProfileUserInfoBox />
      <TabsComponent where='home'/>
      {/* <ProfileTabComponent /> */}
    </div>
  )
}
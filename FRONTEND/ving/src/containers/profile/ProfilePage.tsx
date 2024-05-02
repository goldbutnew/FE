'use client'

import { useRouter, useParams } from 'next/navigation'
import ProfileUserInfoBox from './ProfileUserInfoBox'
import { ProfileTabComponent } from './ProfileTabComponent'
import TabsComponent from './TabsComponent'
import SearchPage from './SearchPage'

export default function ProfilePage() {

  return (
    <div>
      <ProfileUserInfoBox />
      <TabsComponent where='home'/>
      <SearchPage />
      {/* <ProfileTabComponent /> */}
    </div>
  )
}
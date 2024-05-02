
'use client'

import { useRouter, useParams } from 'next/navigation'
import ProfileUserInfoBox from './ProfileUserInfoBox'
import { ProfileTabComponent } from './ProfileTabComponent'
import TabsComponent from './TabsComponent'
import SearchPage from './SearchPage'
import Container from '@/components/Container'

export default function Profile() {

  return (
    <Container>
      <div>
        <ProfileUserInfoBox />
        <TabsComponent where='home'/>
        <SearchPage />
        {/* <ProfileTabComponent /> */}
      </div>
    </Container>
  )
}

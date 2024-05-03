'use client'

import { useRouter, useParams } from 'next/navigation'
import ProfileUserInfoBox from './ProfileUserInfoBox'
import { ProfileTabComponent } from './ProfileTabComponent'
import TabsComponent from './TabsComponent'
import Container from '@/components/Container'

export default function ProfilePage() {

  return (
    <Container>
      <ProfileUserInfoBox />
      <TabsComponent where='home'/>
    </Container>
  )
}
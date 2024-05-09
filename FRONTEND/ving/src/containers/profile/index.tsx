
'use client'

import ProfileUserInfoBox from './ProfileUserInfoBox'
import TabsComponent from './TabsComponent'
import Container from '@/components/Container'

export default function Profile() {

  return (
    <Container>
      <ProfileUserInfoBox />
      <TabsComponent where='home'/>
    </Container>
  )
}


'use client'

import { useRouter, useParams } from 'next/navigation'
import ProfileUserInfoBox from './ProfileUserInfoBox'
import ProfileTabComponent from './ProfileTabComponent'
import TabsComponent from './TabsComponent'
import Container from '@/components/Container'
import * as styles from './index.css'

export default function Profile() {

  return (
    <Container>
      <ProfileUserInfoBox />
      <TabsComponent where='home'/>
    </Container>
  )
}

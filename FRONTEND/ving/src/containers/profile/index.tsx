'use client'

import { useSearchParams } from 'next/navigation'
import ProfileUserInfoBox from './ProfileUserInfoBox'
import TabsComponent from './TabsComponent'
import Container from '@/components/Container'

export default function Profile() {
  const searchParams = useSearchParams()
  console.log(searchParams.get('message'))
  const message = searchParams.get('message')

  console.log(message)

  return (
    <Container>
      <ProfileUserInfoBox />
      <TabsComponent where='home'/>
    </Container>
  )
}

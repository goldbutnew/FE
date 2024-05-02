'use client'

import Container from "@/components/Container"
import ProfileUserInfoBox from "./ProfileUserInfoBox"
import TabsComponent from "./TabsComponent"

export default function ProfileVideo() {

  return (
    <Container>
      <ProfileUserInfoBox />
      <TabsComponent where='video' />
    </Container>
  )
}
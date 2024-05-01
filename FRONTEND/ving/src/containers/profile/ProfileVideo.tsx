'use client'

import ProfileUserInfoBox from "./ProfileUserInfoBox"
import TabsComponent from "./TabsComponent"

export default function ProfileVideo() {

  return (
    <div>
      <ProfileUserInfoBox />
      <TabsComponent where='video' />
    </div>
  )
}
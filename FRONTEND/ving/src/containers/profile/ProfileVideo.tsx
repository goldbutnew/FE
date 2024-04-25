'use client'

import ProfileUserInfoBox from "./ProfileUserInfoBox"
import TabsComponent from "./TabsComponent"

export default function ProfileVideo() {

  return (
    <div>
      <h1>누군가의 비디오 페이지</h1>
      <ProfileUserInfoBox />
      <TabsComponent where='video' />
    </div>
  )
}
'use client'

import Container from "@/components/Container"
import ProfileUserInfoBox from "./ProfileUserInfoBox"
import TabsComponent from "./TabsComponent"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useEffect, useState } from "react"
import useProfileStore from "@/store/ProfileStore"

export default function ProfileVideo() {
  const [loadingUserInfo, setLoadingUserInfo] = useState(false)
  const [loadingTabs, setLoadingTabs] = useState(false)
  const [loadingProfileTab, setLoadingProfileTab] = useState(false)
  const { profileData } = useProfileStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profileData) {
      setLoading(true)
    }
  }, [profileData, setLoading])

  const allLoaded = loadingUserInfo && loadingTabs && loadingProfileTab

  useEffect(() => {
    // console.log('Loading states:', loadingUserInfo, loadingTabs, loadingProfileTab, allLoaded)
  }, [allLoaded, loadingUserInfo, loadingTabs, loadingProfileTab])

  // true 일 경우,
  if (loading) {
    return (
      <Container>
        <ProfileUserInfoBox />
        <TabsComponent 
          where='video'
        />
      </Container>
    )
  } else {
      return (
      <Container>
        <LoadingSpinner />
      </Container>
      )
  }
}

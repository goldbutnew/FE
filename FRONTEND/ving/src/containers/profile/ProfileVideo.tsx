'use client'

import Container from "@/components/Container"
import ProfileUserInfoBox from "./ProfileUserInfoBox"
import TabsComponent from "./TabsComponent"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useEffect, useState } from "react"

export default function ProfileVideo() {
  const [loadingUserInfo, setLoadingUserInfo] = useState(false)
  const [loadingTabs, setLoadingTabs] = useState(false)
  const [loadingProfileTab, setLoadingProfileTab] = useState(false)
  const [loadingVideoTab, setLoadingVideoTab] = useState(false)

  const allLoaded = loadingUserInfo && loadingTabs && loadingVideoTab

  useEffect(() => {
    console.log(loadingUserInfo, loadingTabs, loadingProfileTab, loadingVideoTab)
  }, [allLoaded])
  

  return (
    <Container>
    {allLoaded ? (
      <LoadingSpinner />
    ) : (
      <>
        <ProfileUserInfoBox setLoading={setLoadingUserInfo} />
        <TabsComponent 
          where='video' 
          setLoading={setLoadingTabs} 
          setLoadingProfileTab={setLoadingProfileTab} 
          setLoadingVideoTab={setLoadingVideoTab} 
        />
      </>
    )}
  </Container>
  )
}
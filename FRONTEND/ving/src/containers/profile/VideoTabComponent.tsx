import useProfileStore from '@/store/ProfileStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function VideoTabComponent() {

  const router = useRouter()
  const params = useParams()

  const { profileData, getUserProfileInfo } = useProfileStore()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const initData = async (userIdNum:number) => {
      await getUserProfileInfo(userIdNum)
      // setLoading(true)
    }
    initData(params.userId)
    console.log('뭔데;;;;;;;')
  }, [getUserProfileInfo])

  useEffect(() => {
    if (profileData) {
      setVideos(profileData.videos || [])
    }
  }, [profileData])

  return (
    <div>
      {videos && videos.length > 0 ? (
        <p>비디오 자리</p>
      ) : (
        <p>아직 비디오가 없어요</p>
      )}
    </div>
  )
}

export default VideoTabComponent
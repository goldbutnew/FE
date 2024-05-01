import useProfileStore from '@/store/ProfileStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import { BsFillPinAngleFill } from "react-icons/bs"

export default function VideoTabComponent() {

  const router = useRouter()
  const params = useParams()
  const { profileData, getUserProfileInfo } = useProfileStore()
  const [videos, setVideos] = useState([{
    "thumbnail" : "https://picsum.photos/id/1/200/300",
    "title" : "동영상동영상동영상동영상1",
    "videoPlay" : 3,
    "isFixed" : false,
    },
    {
      "thumbnail" : "https://picsum.photos/id/1/200/300",
      "title" : "동영상동영상동영상2",
      "videoPlay" : 5,
      "isFixed" : true,
    },
    {
      "thumbnail" : "https://picsum.photos/id/1/200/300",
      "title" : "동영상동영상동영상동영상3",
      "videoPlay" : 3,
      "isFixed" : false,
    },
    {
      "thumbnail" : "https://picsum.photos/id/1/200/300",
      "title" : "동영상동영상동영상4",
      "videoPlay" : 3,
      "isFixed" : false,
    },  
  ])

  const togglePin = (videoTitle:string) => {
    setVideos(videos.map(video => {
      if (video.title === videoTitle) {
        return { ...video, isFixed: !video.isFixed }
      } else if (video.isFixed) {
        return { ...video, isFixed: false }
      }
      return video
    }))
  }

  useEffect(() => {
    const initData = async (userIdNum:number) => {
      await getUserProfileInfo(userIdNum)
      // setLoading(true)
    }
    initData(params.userId)
    const sortedVideos = [...videos].sort((a, b) => b.isFixed - a.isFixed)
    setVideos(sortedVideos)
    console.log('gggg')
  }, [getUserProfileInfo. videos])

  // useEffect(() => {
  //   if (profileData) {
  //     setVideos(profileData.videos || [])
  //   }
  // }, [profileData])

  return (
    <div>
      {videos && videos.length > 0 ? (
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <div key={video.title} className={styles.videoItem}>
              <div onClick={() => togglePin(video.title)} className={styles.pinIcon}>
              {video.isFixed ? <BsFillPinAngleFill color='white' size={24} /> : <BsFillPinAngleFill size={0} />}
            </div>
              <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
              <div className={styles.videoItemAdditionalInfo}>
                <span>{video.title}</span>
                <span className={styles.videoItemAdditionalInfoText}>조회수 {video.videoPlay}회</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>아직 비디오가 없어요</p>
      )}
    </div>
  )
}

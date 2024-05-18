'use client'

import useProfileStore from '@/store/ProfileStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import { BsFillPinAngleFill  } from "react-icons/bs"
import { HiEllipsisVertical } from "react-icons/hi2"
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu'
import MenuItem from '@/components/DropdownMenu/MenuItem'
import useAuthStore from '@/store/AuthStore'

interface VideoData {
  createdAt: string
  isFixed: boolean
  thumbnail: string
  title: string
  videoId: number
  videoLength: number
  videoPlay: number
  videoSerial: number
}

export default function ProfileTabComponent() {
  const params = useParams()
  const { userData } = useAuthStore()
  const { profileUserName, profileData, getUserProfileInfo, doFixVideo, unDoFixVideo, doDeleteVideo } = useProfileStore()
  const [isOpen, setIsOpen] = useState({})
  const loginUserName = userData.username
  const [videos, setVideos] = useState<VideoData[]>([])
  const router = useRouter()

  const toggleMenu = (videoId: number) => {
    setIsOpen(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
  }

  const handleDelete = (videoId: number) => {
    doDeleteVideo(videoId)
  }

  const togglePin = async (videoId: number) => {
    setVideos(prevVideos => {
      const updatedVideos = prevVideos.map(video => {
        if (video.videoId === videoId) {
          video.isFixed ? unDoFixVideo(videoId) : doFixVideo(videoId)
          return { ...video, isFixed: !video.isFixed }
        }
        return video
      })
      return updatedVideos.sort((a, b) => Number(b.isFixed) - Number(a.isFixed))
    })
  }

  const goRecordedVideo = (videoSerial: number, username: string) => {
    // console.log(videoSerial, username)
    router.push(`/streaming/${btoa(username)}/${videoSerial}`)
  }

  useEffect(() => {
    if (profileData && profileData.videos) {
      const sortedVideos = [...profileData.videos].sort((a, b) => Number(b.isFixed) - Number(a.isFixed))
      setVideos(sortedVideos)
    }
  }, [profileData])

  useEffect(() => {
    let encodedUsername = params.username
    encodedUsername = String(encodedUsername).replace(/%3D/g, '')
    const decodedUsername = atob(encodedUsername)

    const initData = async () => {
      await getUserProfileInfo(decodedUsername)
    }

    // console.log('-------------')
    if (!profileUserName) {
      initData()
    }
  }, [params.username, getUserProfileInfo, profileUserName])

  return (
    <div>
      {videos && videos.length > 0 ? (
        <div className={styles.videoGrid}>
          {videos.map((video: VideoData) => (
            <div key={video.videoId} className={styles.videoItem}>
              <div className={styles.pinIcon}>
                {video.isFixed && <BsFillPinAngleFill color='white' size={24} />}
              </div>
              <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail}
                  onClick={() => goRecordedVideo(video.videoSerial, profileUserName)} />
              <div className={styles.videoInfoContainer}>
                <div className={styles.videoInfoBox}>
                  <span>{video.title}</span>
                  <span className={styles.videoInfoText}>조회수 {video.videoPlay}회</span>
                </div>
                {`${profileUserName}` === loginUserName &&
                  <DropdownMenu 
                    button={<button onClick={() => toggleMenu(video.videoId)} className={styles.videoItemellipsisButton}>
                      <HiEllipsisVertical size={20} />
                    </button>}
                    // top={true}
                    >
                    <MenuItem onClick={() => togglePin(video.videoId)}>
                        {video.isFixed ? '상단 고정 취소' : '상단 고정'}
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(video.videoId)}>
                        <span>삭제</span>
                    </MenuItem>
                  </DropdownMenu>
                }
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

import useProfileStore from '@/store/ProfileStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import * as styles from './index.css'
import { BsFillPinAngleFill  } from "react-icons/bs"
import { HiEllipsisVertical } from "react-icons/hi2"
import SmallButton from '@/components/Button/SmallButton'
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu'
import MenuItem from '@/components/DropdownMenu/MenuItem'
import Link from 'next/link'

export default function VideoTabComponent() {

  const router = useRouter()
  const params = useParams()
  const { profileData, getUserProfileInfo, doFixVideo, unDoFixVideo } = useProfileStore()
  const [isOpen, setIsOpen] = useState({})

  const toggleMenu = (videoId:number) => {
    setIsOpen(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
  }

  const [videos, setVideos] = useState([{
    "videoId": 1,
    "thumbnail" : "https://picsum.photos/id/1/200/300",
    "title" : "동영상동영상동영상동영상1",
    "videoPlay" : 3,
    "isFixed" : false,
    },
    {
      "videoId": 2,
      "thumbnail" : "https://picsum.photos/id/1/200/300",
      "title" : "동영상동영상동영상2",
      "videoPlay" : 5,
      "isFixed" : true,
    },
    {
      "videoId": 3,
      "thumbnail" : "https://picsum.photos/id/1/200/300",
      "title" : "동영상동영상동영상동영상3",
      "videoPlay" : 3,
      "isFixed" : false,
    },
    {
      "videoId": 4,
      "thumbnail" : "https://picsum.photos/id/1/200/300",
      "title" : "동영상동영상동영상4",
      "videoPlay" : 3,
      "isFixed" : false,
    },  
  ])

  const togglePin = (videoId:number) => {
    setVideos(videos.map(video => {
      // 상단 고정이 안 된 비디오
      if (video.videoId === videoId) {
        doFixVideo(videoId)
        console.log('상단 고정')
        return { ...video, isFixed: !video.isFixed }
      }
      // 상단 고정이 된 비디오 
      else if (video.isFixed) {
        unDoFixVideo(videoId)
        console.log('상단 고정 취소')
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

  return (
    <div>
      {videos && videos.length > 0 ? (
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <div key={video.title} className={styles.videoItem}>
              <div className={styles.pinIcon}>
                {video.isFixed && <BsFillPinAngleFill color='white' size={24} />}
              </div>
              <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
              <div className={styles.videoItemAdditionalInfo}>
                <div className={styles.videoItemAdditionalTextInfo}>
                  <span>{video.title}</span>
                  <span className={styles.videoItemAdditionalInfoText}>조회수 {video.videoPlay}회</span>
                </div>
                  <DropdownMenu 
                    button={<button onClick={() => toggleMenu(video.videoId)} className={styles.videoItemellipsisButton}>
                      <HiEllipsisVertical size={20} />
                    </button>}>
                    <MenuItem>
                      <div onClick={() => togglePin(video.videoId)}>
                      {video.isFixed ? '상단 고정 취소' : '상단 고정'}</div>
                    </MenuItem>
                    <MenuItem>
                      <span>삭제</span>
                    </MenuItem>
                  </DropdownMenu>
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

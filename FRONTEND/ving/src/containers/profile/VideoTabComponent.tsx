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
  const { profileData, getUserProfileInfo } = useProfileStore()
  const [isOpen, setIsOpen] = useState({})
  const dropdownRefs = useRef({})

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

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      Object.keys(isOpen).forEach(videoId => {
        if (isOpen[videoId] && dropdownRefs.current[videoId] && !dropdownRefs.current[videoId].contains(event.target)) {
          setIsOpen(prev => ({
            ...prev,
            [videoId]: false
          }))
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen])
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
              <div className={styles.pinIcon}>
                {video.isFixed && <BsFillPinAngleFill color='white' size={24} />}
              </div>
              <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
              <div className={styles.videoItemAdditionalInfo}>
                <div className={styles.videoItemAdditionalTextInfo}>
                  <span>{video.title}</span>
                  <span className={styles.videoItemAdditionalInfoText}>조회수 {video.videoPlay}회</span>
                </div>
                <button onClick={() => toggleMenu(video.videoId)} className={styles.videoItemellipsisButton}>
                  <HiEllipsisVertical size={20}/>
                </button>
                {isOpen[video.videoId] && (
                  <div ref={el => dropdownRefs.current[video.videoId] = el}>
                    <DropdownMenu>
                      <MenuItem>
                        <div onClick={() => togglePin(video.title)}>
                        {video.isFixed ? '상단 고정 취소' : '상단 고정'}</div>
                      </MenuItem>
                      <MenuItem>
                        <span>삭제</span>
                      </MenuItem>
                    </DropdownMenu>
                  </div>
                )}
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

import useProfileStore from '@/store/ProfileStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import * as styles from './index.css'
import { BsFillPinAngleFill  } from "react-icons/bs"
import { HiEllipsisVertical } from "react-icons/hi2"
import SmallButton from '@/components/Button/SmallButton'
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu'
import MenuItem from '@/components/DropdownMenu/MenuItem'

export default function VideoTabComponent() {

  const params = useParams()
  const { profileUserName, profileData, getUserProfileInfo, doFixVideo, unDoFixVideo, doDeleteVideo } = useProfileStore()
  const [isOpen, setIsOpen] = useState({})
  const [loading, setLoading] = useState(false)

  const toggleMenu = (videoId:number) => {
    setIsOpen(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
  }

  // 비디오 삭제 함수
  const handleDelete = (videoId:number) => {
    doDeleteVideo(videoId)
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

  // const togglePin = (videoId:number) => {
  //   setVideos(videos.map(video => {
  //     // 클릭한 비디오일 경우, 상단 고정 반대로 함.
  //     if (video.videoId === videoId) {
  //       if (video.isFixed) {
  //         unDoFixVideo(videoId)
  //         console.log('상단고정해제')
  //       } 
  //       else {
  //         doFixVideo(videoId)
  //         console.log('상단 고정')
  //       }
  //       return { ...video, isFixed: !video.isFixed }
  //     }
  //     // 클릭한 비디오가 아닐 경우, 만약 상단 고정된 비디오일 경우,
  //     // false로 한다.
  //     else if (video.isFixed) {
  //       console.log('다른 비디오 상단 고정 해제')
  //       return { ...video, isFixed: false }
  //     }
  //     return video
  //   }))
  // }

  const togglePin = async (videoId:number) => {
    setVideos(prevVideos => {
      const updatedVideos = prevVideos.map(video => {
        if (video.videoId === videoId) {
          video.isFixed ? unDoFixVideo(videoId) : doFixVideo(videoId)
          return { ...video, isFixed: !video.isFixed }
        }
        return video;
      })
      return updatedVideos.sort((a, b) => Number(b.isFixed) - Number(a.isFixed))
    })
  }

  useEffect(() => {
  //   let encodedUsername = params.username
  //   encodedUsername = String(encodedUsername).replace(/%3D/g, '')
  //   const decodedUsername = atob(encodedUsername)
  //   if (!profileUserName) {
  //   const initData = async () => {
  //     await getUserProfileInfo(decodedUsername)
  //     // setLoading(true)
  //   }
  //   initData()
  // }
    const sortedVideos = [...videos].sort((a, b) => b.isFixed - a.isFixed)
    setVideos(sortedVideos)
  }, [getUserProfileInfo. videos])

  useEffect(() => {
    if (profileData) {
      setLoading(true)
    }
  }, [profileData])
  
  if (loading) {
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
              <div className={styles.videoInfoContainer}>
                <div className={styles.videoInfoBox}>
                  <span>{video.title}</span>
                  <span className={styles.videoInfoText}>조회수 {video.videoPlay}회</span>
                </div>
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
}

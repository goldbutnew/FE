'use client'

import React, { useState, useEffect } from "react"
import useAuthStore from "@/store/AuthStore"
import useStreamingStore from "@/store/StreamingStore"

import * as styles from './index.css'
import ProfileImage from "@/components/ProfileImg"
import { useRouter } from "next/navigation"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import { line } from "@/styles/common.css"
import { GrNext, GrPrevious } from 'react-icons/gr'
import useProfileStore from "@/store/ProfileStore"
import MainLoading from "./MainLoading"
import Container from "@/components/Container"

interface StreamData {
  createdAt: string
  nickname: string
  roomId: number
  streamerThumbnail: string
  thumbnail: string
  title: string
  username: string
  viewers: number
}

export default function MainGrid() {
  const { streamRoomsData, getStreamInfo, setStreamRoomData } = useStreamingStore()
  const { getUserProfileInfo } = useProfileStore()
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  const [visibleCount, setVisibleCount] = useState(8)

  const handleStreamDataChange = (data: Object) => {
    // console.log(data)
    setStreamRoomData(data)
  }
  
  useEffect (() => {
    getStreamInfo()  
  }, [])

  useEffect(() => {
    if (streamRoomsData) {
      setLoading(true)
    }
    console.log(streamRoomsData)
  }, [])
  

  const toggleShowMore = () => {
    setVisibleCount(prevCount => 
      prevCount >= streamRoomsData.length ? 8 : streamRoomsData.length
    )
    setIsExpanded(!isExpanded);
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  
  const moveSlide = (step:number) => {
    setCurrentSlide((prevSlide) => {
      let newIndex = prevSlide + step
      const totalSlides = 3
      if (newIndex < 0) newIndex = totalSlides - 1
      else if (newIndex >= totalSlides) newIndex = 0
      return newIndex
    })
  }


  if (loading) {
  return (
      <div className={styles.mainVideoGridBox}>
        {/* <div className={styles.carouselContainer}>
          <button className={styles.prev} onClick={() => moveSlide(-1)}><GrPrevious size={30}/></button>
          <div className={styles.carouselSlide} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              <div className={styles.carouselItem}>
                <img src='https://picsum.photos/id/1/200/300' alt="Toy Character" className={styles.carouselImage}/>
                <div className={styles.itemDetails}>
                  <h3>Rubius</h3>
                  <p>LOST ARK</p>
                  <p>3K viewers</p>
                  <p>English | Educational</p>
                  <p>Description here...</p>
                </div>
              </div>
            </div>
          <button className={styles.next} onClick={() => moveSlide(1)}><GrNext size={30} /></button>
        </div> */}

        <div className={styles.mainVideoGrid}>
        {streamRoomsData.slice(0, visibleCount).map((data: StreamData, index: number) => {
            return (
              <div 
                key={index} 
                className={styles.mainVideoItem} 
                onClick={() => handleStreamDataChange(data)}
              >
                <div className={styles.videoThumnailContainer} onClick={() => router.push(`/streaming/${btoa(data.username)}`)}>
                  <div className={styles.LiveTextBadge}>Live</div>
                  <div className={styles.viewerCounterTextBadge}>{data.viewers}명 시청 중</div>
                  <img
                    src={data.thumbnail} 
                    alt="비디오 썸네일"
                    className={styles.imageStyle}
                  />
                </div>
                <div className={styles.roomInfoBox}>
                  <div onClick={() => {router.push(`/profile/${btoa(data.username)}`) ,getUserProfileInfo(data.username)}}>
                    <ProfileImage 
                      url={data.streamerThumbnail} 
                      width={35}
                      alt="streamer profile" 
                    />
                  </div>
                  <div className={styles.leftBox}>
                    <div className={styles.leftBoxItem}>
                      <div className={styles.streamingTitle} onClick={() => router.push(`/streaming/${btoa(data.username)}`)}>{data.title}</div>
                    </div>
                    <div className={styles.leftBoxItem}>
                      <div className={styles.streamerName} onClick={() => {router.push(`/profile/${btoa(data.username)}`), getUserProfileInfo(data.username)}}>{data.nickname}</div>    
                    </div>  
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {streamRoomsData.length <= 8 && (
          <div className={line}></div>
        )}
        {streamRoomsData.length > 8 && (
          <div className={styles.showMoreContainer}>
            <div className={styles.showMoreBox}>
              <div className={line}></div>
            </div>
            <div className={styles.showMoreButtonBox} onClick={toggleShowMore}>
              <div className={styles.showMoreButtonText}>
                {visibleCount >= streamRoomsData.length ? "접기 " : "더보기 "} 
                {visibleCount >= streamRoomsData.length ? <MdExpandLess size={16} /> : <MdExpandMore size={16} />}
              </div>
            </div>
            <div className={styles.showMoreBox}>
              <div className={line}></div>
            </div>
          </div>
        )}
      </div>
  )
} else {
    return (
    <MainLoading />
    )
}
}
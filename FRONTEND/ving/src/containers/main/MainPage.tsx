'use client'

import React, { useState, useEffect } from "react"
import useAuthStore from "@/store/AuthStore"
import useStreamingStore from "@/store/StreamingStore"

import Link from 'next/link'
import * as styles from './index.css'
import Image from "next/image"
import ProfileImage from "@/components/ProfileImg"
import { useRouter } from "next/navigation"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import { GrNext, GrPrevious } from "react-icons/gr"

export default function MainPage() {
  const { userData, code } = useAuthStore()
  const { streamRoomsData, getStreamInfo, setStreamRoomData } = useStreamingStore()
  const router = useRouter()

  const [visibleCount, setVisibleCount] = useState(8)

  const handleStreamDataChange = (data: Object) => {
    console.log(data)
    setStreamRoomData(data)
  }
  
  useEffect (() => {
    getStreamInfo()  
  }, [])

  const toggleShowMore = () => {
    setVisibleCount(prevCount => 
      prevCount >= streamRoomsData.length ? 8 : streamRoomsData.length
    )
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

  return (
    <div className={styles.mainVideoGridBox}>
      <h3>메인 페이지</h3>
      <h3>{userData.nickname} 님 ving에 오신 걸 환영합니다.</h3>

      <div className={styles.carouselContainer}>
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
      </div>

      <div className={styles.mainVideoGrid}>
      {streamRoomsData.slice(0, visibleCount).map((data, index) => {
          return (
            <div 
              key={index} 
              className={styles.mainVideoItem} 
              onClick={() => handleStreamDataChange(data)}
            >
              <img 
              src={data.thumbnail} 
              alt="비디오 자리"
              className={styles.imageStyle}
              />
              <div className={styles.roomInfoBox} onClick={() => router.push(`/streaming/${btoa(data.username)}`)}>
                <ProfileImage 
                  url={data.username} 
                  width={35}
                  alt="streamer profile" 
                />
                {/* <Link href={`/streaming/${btoa(data.username)}`}>{data.title}</Link>  */}
                {/* <div>
                  <span>{data.title}</span>
                  <span>뭐니</span>
                </div> */}
                <div className={styles.leftBox}>
                  <div className={styles.leftBoxItem}>
                    <div className={styles.streamingTitle}>{data.title}</div>
                  </div>
                  <div className={styles.leftBoxItem}>
                    <div className={styles.streamerName}>{data.username}</div>    
                  </div>  
                </div>
              </div>
            </div>
          )
        })}
      </div>
        <div className={styles.showMoreBox}>
          <div className={styles.showMoreLeftBox}>
            <div className={styles.showMoreLineTopBox}></div>
            <div className={styles.showMoreLineBottomBox}></div>
          </div>
          <div className={styles.showMoreButtonBox} onClick={toggleShowMore}>
            <button className={styles.showMoreButton}>
              {visibleCount >= streamRoomsData.length ? "접기 " : "더보기 "} 
              {visibleCount >= streamRoomsData.length ? <MdExpandLess /> : <MdExpandMore />}
            </button>
          </div>
          <div className={styles.showMoreRightBox}>
            <div className={styles.showMoreLineTopBox}></div>
            <div className={styles.showMoreLineBottomBox}></div>
          </div>
        </div>
    </div>
  )
}
'use client'

import React, { useState, useEffect } from "react"
import useAuthStore from "@/store/AuthStore"
import useStreamingStore from "@/store/StreamingStore"

import Link from 'next/link'
import * as styles from './index.css'
import Image from "next/image"
import ProfileImage from "@/components/ProfileImg"
import { useRouter } from "next/navigation"


export default function MainPage() {
  const { userData, code } = useAuthStore()
  const { streamRoomsData, getStreamInfo, setStreamRoomData } = useStreamingStore()
  const router = useRouter()

  const handleStreamDataChange = (data: Object) => {
    console.log(data)
    setStreamRoomData(data)
  }
  
  useEffect (() => {
    getStreamInfo()  
  }, [])

  return (
    <div className={styles.mainVideoGridBox}>
      <h3>메인 페이지</h3>
      <h3>{userData.nickname} 계정으로 로그인되었습니다.</h3>

      <div>~~~~~~~~~~~~~~~테스트 페이지로 이동~~~~~~~~~~~~~</div>
      <Link href={`/tmp`}>test</Link>

      <div className={styles.mainVideoGrid}>
        {streamRoomsData.map((data, index) => {
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
      <hr />
    </div>
  )
}
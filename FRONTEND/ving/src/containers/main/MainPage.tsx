'use client'

import React, { useState, useEffect } from "react"
import useAuthStore from "@/store/AuthStore"
import useStreamingStore from "@/store/StreamingStore"

import Link from 'next/link'
import * as styles from './index.css'


export default function MainPage() {
  const { userData, code } = useAuthStore()
  const { streamRoomsData, getStreamInfo, setStreamRoomData } = useStreamingStore()

  const handleStreamDataChange = (data: Object) => {
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
              <Link href={`/streaming/${btoa(data.username)}`}>{data.title}</Link> 
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}
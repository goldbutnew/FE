'use client'

import React, { useState } from "react"
import useAuthStore from "@/store/AuthStore"
import useMainStore from "@/store/MainStore"

import Link from 'next/link'
import * as styles from './index.css'
import { on } from "events"

export default function MainPage() {
  const { userData } = useAuthStore()
  const { onAirData } = useMainStore()
  const username = btoa(userData.username)

  return (
    <div>
      <h3>메인 페이지</h3>
      <h3>{userData.nickname} 계정으로 로그인되었습니다.</h3>

      <div>//////// 테스트 페이지로 이동////////</div>
      <Link href={`/tmp`}>test</Link>

      <div>
        {onAirData.map((data, index) => {
          return (
            <div key={index} className={styles.test}>
              <Link href={`/streaming/${username}`}>{data.title}</Link> 
            </div>
          )
        })}
      </div>

      <div className={styles.test}>
        <Link href={`/streaming/${username}`}>방송중인누군가의방</Link> 
      </div>
      
      <hr />
    </div>
  )
}
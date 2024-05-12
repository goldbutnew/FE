'use client'

import * as styles from './index.css'
import useProfileStore from '@/store/ProfileStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5 } from "react-icons/ri"
import ProfileImage from '../ProfileImg'
import { vars } from '@/styles/vars.css'
import SideBar from '../SideBar/SideBar'

interface User {
  username: string
  nickname: string
  thumbnail: string
}

export default function Ranking() {
  const { getCurrentTopViewers, currentTopViewersData, getUserProfileInfo, getUserNicknameSearch, searchData } = useProfileStore()
  const [users, setUsers] = useState<User[]>(currentTopViewersData || [])
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initData = async () => {
      await getCurrentTopViewers()
    }
    initData()
    console.log('유저 랭킹 가져오기')
  }, [getCurrentTopViewers])

  useEffect(() => {
    if (currentTopViewersData) {
      setUsers(currentTopViewersData || [])
    }
    console.log('뭔데---------')
    setLoading(true)
  }, [currentTopViewersData])
  

  const moveSearchUser = (username: string) => {
    getUserProfileInfo(username)
    console.log('이동 전에 데이터 담는다')
    router.push(`/profile/${btoa(username)}`)
  }

  console.log(currentTopViewersData)
  
  return (
    <SideBar
      title="랭킹"
      side="left"
      initOpen={isOpen}
      width={200}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <div className={isOpen ? styles.openRankingList : styles.closeRankingList}>
        {users.map((user: User) => (
          <div key={user.username} onClick={() => moveSearchUser(user.username)}>
            {isOpen ? (
              <div className={styles.rankingListItem}>
                <ProfileImage 
                  url={user.thumbnail} 
                  width={45}
                  alt="User profile" 
                />
                <div className={styles.rankingUserName}>{user.nickname}</div>
              </div>
            ) : (
              <div className={styles.closeRankingListItem}>
                <ProfileImage 
                  url={user.thumbnail} 
                  width={45}
                  alt="User profile"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </ SideBar>
  )
}
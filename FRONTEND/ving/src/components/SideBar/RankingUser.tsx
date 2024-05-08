'use client'

import * as styles from './index.css'
import useProfileStore from '@/store/ProfileStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5 } from "react-icons/ri"

interface User {
  username: string
  nickname: string
  thumbnail: string
}

export default function RankingUser() {
  const { getCurrentTopViewers, currentTopViewersData, getUserProfileInfo, getUserNicknameSearch, searchData } = useProfileStore()
  const [users, setUsers] = useState<User[]>(currentTopViewersData || [])
  const router = useRouter()
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
    <div>
      <div className={styles.autocompleteList}>
        {users.map((user: User)=> (
          <div key={user.username} onClick={() => moveSearchUser(user.username)}>
            <div className={styles.autocompleteItem}>
              <img 
                className={styles.searchUserImage} 
                src={user.thumbnail || 'path_to_default_image.png'}
                alt={user.nickname}
              />
              <span>{user.nickname}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
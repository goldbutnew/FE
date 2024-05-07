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
  const { getUserProfileInfo, getUserNicknameSearch, searchData } = useProfileStore()
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()

  useEffect(() => {
    getUserNicknameSearch()
    if (Array.isArray(searchData)) {
      setUsers(searchData)
    } else {
      console.error('Expected an array for searchData, received:', searchData)
    }
  }, [getUserNicknameSearch])

  const moveSearchUser = (username: string) => {
    router.push(`/profile/${btoa(username)}`)
  }

  console.log(users)
  return (
    <div>
      <div className={styles.autocompleteList}>
        {users.map((user: User)=> (
          <div key={user.username} onClick={() => moveSearchUser(user.username)}>
            <div className={styles.autocompleteItem}>
              <img 
                className={styles.searchUserImage} 
                src={user.thumbnail || 'path_to_default_image.png'} // Provide a default thumbnail if none exists
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
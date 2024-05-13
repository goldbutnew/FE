import React, { useEffect, useState, useRef } from 'react'
import * as styles from './index.css'
import { FiSearch } from "react-icons/fi"
import useProfileStore from '@/store/ProfileStore'
import { useRouter } from 'next/navigation'
import ProfileImage from '../ProfileImg'

interface User {
  username: string
  nickname: string
  thumbnail: string
}

export default function SearchBar() {
  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('')
  const { profileUserName, getUserProfileInfo, doFollowUser, unDoFollowUser, getUserNicknameSearch, searchData } = useProfileStore()
  const router = useRouter()

  const filterUsers = (searchTerm: string) => {
    const filteredUsers = searchData.filter(user => {
      return user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    })
    return filteredUsers
  }

  const handleInputChange = (event:any) => {
    const searchTerm = event.target.value
    setNickname(searchTerm)
    setUsername(searchTerm)
    const filteredUsers = filterUsers(searchTerm)
    setUsers(filteredUsers)
  }

  const handleAutoComplete = (selectedUser: User) => {
    setNickname(selectedUser.nickname)
    setUsername(selectedUser.username)
    setUsers([])
  }

  // 검색어 자동완성 외 부분 마우스 클릭하면 자동완성리스트 사라지는 로직
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setUsers([])
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [autocompleteRef])

  useEffect(() => {
    getUserNicknameSearch()
  }, [getUserNicknameSearch])

  const moveSearchUser = (username:string) => {
    getUserProfileInfo(username)
    console.log('이동 전에 데이터 담는다')
    router.push(`/profile/${btoa(username)}`)
  }

  return (
    <div>
      <div className={styles.SearchBarContainer}>
        <div className={styles.SearchBarInputBox}>
          <input
            type="text"
            placeholder="지금 스트리머를 검색해 보세요!"
            className={styles.searchInput}
            value={nickname}
            onChange={handleInputChange}
          />
        </div>
        <button className={styles.searchIcon} onClick={() => moveSearchUser(username)}>
          <FiSearch size={16}/>
        </button>
      </div>
      <div>
        <div ref={autocompleteRef} className={styles.autocompleteList}>
          {users.map(user => (
            <div key={user.username} onClick={() => handleAutoComplete(user)}>
              <div className={styles.autocompleteItem}>
                {/* 이미지가 null이라서 width를 줄 수 없어 에러가 뜨니 잠시 Image 말고 img 쓰겠슴다 */}
                <ProfileImage 
                  url={user.thumbnail}
                  width={40}
                  alt={user.nickname}
                />
                <span className={styles.searchUserName}>{user.nickname}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

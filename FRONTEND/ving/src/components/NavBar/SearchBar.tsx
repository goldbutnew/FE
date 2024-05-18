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
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const [searchQeury, setSearchQeury] = useState('')
  const { getUserProfileInfo, getUserNicknameSearch, searchData } = useProfileStore()
  const router = useRouter()

  const filterUsers = (searchTerm: string) => {
    const filteredUsers = searchData.filter((user:User) => {
      return user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    })
    return filteredUsers
  }

  const hasNicknameMatch = (searchTerm: string) => {
    const filteredUsers = searchData.filter((user: User) => {
      return user.nickname.toLowerCase() === searchTerm.toLowerCase()
    })
    return filteredUsers.length > 0
  }

  // 입력 시 추적 - 닉네임
  const handleInputChange = (event:any) => {
    const searchTerm = event.target.value
    setNickname(searchTerm)

    const matchExists = hasNicknameMatch(searchTerm)

    setUsername(searchTerm)
    const filteredUsers = filterUsers(searchTerm)

    if (filteredUsers.length > 0 && matchExists) {
      if (filteredUsers.length === 1) {
        setUsername(filteredUsers[0].username)
      } else {
        setUsername('')
      }
      setSearchQeury('')
    } else {
      setSearchQeury(`${searchTerm}`)
      setUsername('')
    }

    setUsers(filteredUsers)
  }

  // 자동완성 클릭 시
  const handleAutoComplete = (selectedUser: User) => {
    setNickname(selectedUser.nickname)
    setUsername(selectedUser.username)
    setUsers([])

    setSearchQeury('')
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
    // console.log('이동 전에 데이터 담는다', username)
    if (searchQeury) {
      router.push(`/tmp2?searchQeury=${searchQeury}`)
    } else {
      getUserProfileInfo(username)
      router.push(`/profile/${btoa(username)}`)
    }
    setNickname('')
    setSearchQeury('')
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

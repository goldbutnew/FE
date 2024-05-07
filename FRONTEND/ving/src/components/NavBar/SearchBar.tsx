import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import axios from 'axios'
import { FiSearch } from "react-icons/fi"
import useProfileStore from '@/store/ProfileStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface User {
  username: string
  nickname: string
  thumbnail: string
}

export default function SearchBar() {
  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState('')
  const { getUserProfileInfo, doFollowUser, unDoFollowUser, getUserNicknameSearch, searchData } = useProfileStore()
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

  useEffect(() => {
    getUserNicknameSearch()
  }, [getUserNicknameSearch])

  const moveSearchUser = (username:string) => {
    router.push(`/profile/${username}`)
  }
  
  
  //   try {
  //     const response = await axios.post('/api/search/nickname', { nickname })
  //     // setUsers(response.data.data.users)
  //     // setUsers({
  //     //   userid: 1,
  //     //   nickname: '발루',
  //     //   photo: 'https://picsum.photos/id/1/200/300'
  //     // })
  //     setMessage(response.data.message)
  //     console.log(nickname, '성공')
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //     setMessage('Failed to fetch data')
  //   }
  // }

  return (
    <div>
      <div className={styles.SearchBarContainer}>
        <div className={styles.SearchBarInputBox}>
          <input
            type="text"
            placeholder="Search"
            className={styles.input}
            value={nickname}
            onChange={handleInputChange}
          />
        </div>
        <button className={styles.searchIcon} onClick={() => moveSearchUser(btoa(username))}>
          <FiSearch size={20}/>
        </button>
      </div>
      <div>
        <div className={styles.autocompleteList}>
          {users.map(user => (
            <div key={user.username} onClick={() => handleAutoComplete(user)}>
              <div className={styles.autocompleteItem}>
                {/* 이미지가 null이라서 width를 줄 수 없어 에러가 뜨니 잠시 Image 말고 img 쓰겠슴다 */}
                <img className={styles.searchUserImage} src={user.thumbnail} alt={user.nickname} />
                <span>{user.nickname}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

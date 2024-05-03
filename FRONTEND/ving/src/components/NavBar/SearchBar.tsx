import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import axios from 'axios'
import { FiSearch } from "react-icons/fi"
import useProfileStore from '@/store/ProfileStore'

interface User {
  user_id: number
  nickname: string
  photo: string
}

export default function SearchBar() {
  const [nickname, setNickname] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState('')
  const { getUserProfileInfo, doFollowUser, unDoFollowUser, getUserNicknameSearch, searchData } = useProfileStore()
  
  const handleSearch = async () => {
    setUsers(users => [
      ...users,
      {
        userid: 1,
        nickname: '발루',
        photo: 'https://picsum.photos/id/1/200/300'
      }
    ])
  }

  useEffect(() => {
    getUserNicknameSearch()
  }, [getUserNicknameSearch])


  
  
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
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <button onClick={handleSearch} className={styles.searchIcon}>
          <FiSearch size={20}/>
        </button>
      </div>
      <div>
        {users.map(user => (
          <div key={user.user_id}>
            <p>{user.nickname}</p>
            <img src={user.photo} alt={user.nickname} />
          </div>
        ))}
      </div>
    </div>
  )
}

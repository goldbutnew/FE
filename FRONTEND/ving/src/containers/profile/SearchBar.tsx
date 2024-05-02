import React, { useState } from 'react'
import * as styles from './index.css'
import axios from 'axios'
import { FiSearch } from "react-icons/fi"

interface User {
  user_id: number
  nickname: string
  photo: string
}

export default function SearchBar() {
  const [nickname, setNickname] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState('')
  
  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/search/nickname', { nickname })
      setUsers(response.data.data.users)
      setMessage(response.data.message)
      console.log(nickname, '성공')
    } catch (error) {
      console.error('Error fetching data:', error)
      setMessage('Failed to fetch data')
    }
  }

  return (
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
      {users.map(user => (
        <div key={user.user_id}>
          <p>{user.nickname}</p>
          <img src={user.photo} alt={user.nickname} />
        </div>
      ))}
    </div>
  )
}

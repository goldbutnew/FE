'use client'

import * as styles from './index.css'
import useProfileStore from '@/store/ProfileStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5 } from "react-icons/ri"
import ProfileImage from '../ProfileImg'
import { vars } from '@/styles/vars.css'
import SideBar from '../SideBar/SideBar'
import { lightLine, line } from '@/styles/common.css'
import useStreamingStore from '@/store/StreamingStore'

interface User {
  username: string
  nickname: string
  thumbnail: string
  streamerThumbnail: string
}

export default function Ranking() {
  const { getCurrentTopSubscribers, currentTopSubscribersData, getUserProfileInfo, getUserNicknameSearch, searchData } = useProfileStore()
  const { streamRoomsData, currentTopViewersStreamer, setCurrentTopViewersStreamer } = useStreamingStore()
  const [users, setUsers] = useState<User[]>(currentTopSubscribersData || [])
  const [viewerUsers, setViewerUsers] = useState<User[]>(currentTopViewersStreamer|| [])
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  type StreamData = {
    createdAt: string
    nickname: string
    roomId: number
    streamerThumbnail: string
    thumbnail: string
    title: string
    username: string
    viewers: number
  }

  useEffect(() => {
    if (streamRoomsData.length > 0) {
      const topStreams = getTopStreams(streamRoomsData, 5)
      setViewerUsers(topStreams)
      setCurrentTopViewersStreamer(topStreams)
      setLoading(false)
    }
  }, [streamRoomsData])

  function getTopStreams(streamRoomsData: StreamData[], count: number): StreamData[] {
    return [...streamRoomsData]
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, count)
  }

  useEffect(() => {
    const initData = async () => {
      await getCurrentTopSubscribers()
    }
    initData()
    // console.log('유저 랭킹 가져오기')
  }, [getCurrentTopSubscribers])

  useEffect(() => {
    if (currentTopSubscribersData) {
      setUsers(currentTopSubscribersData || [])
    }

    if (currentTopViewersStreamer) {
      setViewerUsers(currentTopViewersStreamer || [])
    }
    setLoading(true)
  }, [currentTopSubscribersData, currentTopViewersStreamer])
  

  const moveSearchUser = (username: string) => {
    getUserProfileInfo(username)
    // console.log('이동 전에 데이터 담는다')
    router.push(`/profile/${btoa(username)}`)
  }

  // console.log(currentTopViewersStreamer, viewerUsers, streamRoomsData)
  
  return (
    <SideBar
      title="랭킹"
      side="left"
      initOpen={true}
      isOpen={isOpen}
      width={200}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <div className={styles.rankingList}>
        {isOpen ? ( 
          <div className={styles.rankingTitle}>구독자 수</div>
        ) : (
          <div></div>
        )}
        {/* <hr className={lightLine} /> */}
        {users.map((user: User) => (
          <div key={user.username} onClick={() => moveSearchUser(user.username)}>
            {isOpen ? (
              <div className={styles.openRankingListItem}>
                <ProfileImage url={user.thumbnail} width={40} alt="User profile" />
                <div className={styles.rankingUserName}>{user.nickname}</div>
              </div>
            ) : (
              <div className={styles.closeRankingListItem}>
                <div className={styles.rankingUserName}></div>
                <ProfileImage url={user.thumbnail} width={40} alt="User profile" />
              </div>
            )}
          </div>
        ))}
      </div>
      {isOpen ? (<hr className={lightLine} />) : (<hr className={lightLine} />)}
      <div className={styles.rankingList}>
        {isOpen ? ( 
          <div className={styles.rankingTitle}>현재 시청자 수</div>
        ) : (
          <div></div>
        )}
        {viewerUsers.map((user: User) => (
          <div key={user.username} onClick={() => moveSearchUser(user.username)}>
            {isOpen ? (
              <div className={styles.openRankingListItem}>
                <ProfileImage url={user.streamerThumbnail} width={40} alt="User profile" />
                <div className={styles.rankingUserName}>{user.nickname}</div>
              </div>
            ) : (
              <div className={styles.closeRankingListItem}>
                <ProfileImage url={user.streamerThumbnail} width={40} alt="User profile" />
              </div>
            )}
          </div>
        ))}
      </div>
    </ SideBar>
  )
}
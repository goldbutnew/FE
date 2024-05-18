'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import * as styles from './index.css'
import useProfileStore from '@/store/ProfileStore'
import useAuthStore from '@/store/AuthStore'
import { MdNotifications, MdNotificationsOff } from "react-icons/md"
import { vars } from '@/styles/vars.css'
import ProfileImage from '@/components/ProfileImg'
import SmallButton from '@/components/Button/SmallButton'

export default function ProfileUserInfoBox() {
  const router = useRouter()
  const params = useParams()
  const { profileData, profileUserName, getUserProfileInfo, doFollowUser, unDoFollowUser, doChangeAlarm } = useProfileStore()
  const { userData } = useAuthStore()
  const [subscriberCount, setSubscriberCount] = useState(profileData.followers || 0)
  const [isFollowed, setIsFollowed] = useState(profileData.isFollowed)
  const [isAlarmed, setIsAlarmed] = useState(false)
  const alarmText = isAlarmed ? "알림 켜기" : "알림 끄기"
  const loginUserName = userData.username
  const [loading, setLoading] = useState(false)

  const toggleFollow = () => {
    if (isFollowed) {
      setIsFollowed(false)
      setSubscriberCount(subscriberCount - 1)
      unDoFollowUser(profileUserName)
    } else {
      setIsFollowed(true)
      setSubscriberCount(subscriberCount + 1)
      doFollowUser(profileUserName)
      setIsAlarmed(true)
    }
  }
  
  const toggleAlarm = () => {
    if (isFollowed) {
      setIsAlarmed(!isAlarmed)
      doChangeAlarm(profileUserName)
    }
  }

  useEffect(() => {
    let encodedUsername = params.username
    encodedUsername = String(encodedUsername).replace(/%3D/g, '')
    const decodedUsername = atob(encodedUsername)
    const initData = async () => {
      await getUserProfileInfo(decodedUsername)
    }
    initData()
    setLoading(true)
  }, [getUserProfileInfo, params.username, setLoading])

  useEffect(() => {
    if (profileData) {
      setSubscriberCount(profileData.followers || 0)
      setIsFollowed(profileData.isFollowed || false)
      setIsAlarmed(profileData.isAlarmed || false)
    }
  }, [profileData])

  if (loading) {
  return (
    <div className={styles.userInfoBox}>
      <div className={styles.userImageNameInfoBox}>
        <ProfileImage 
          url={profileData.photoUrl} 
          width={80}
          alt="User profile" 
        />
        <div className={styles.userTextInfoBox}>
          <span className={styles.userName}>{profileData.nickname}</span>
          <span className={styles.followerText}>팔로워 {subscriberCount}명</span>
          <span className={styles.userIntroduce}>{profileData.introduction || '자기 소개를 입력해 주세요!'}</span>
        </div>
      </div>
      {`${profileUserName}` === loginUserName ? (
        <SmallButton text='채널관리' color={vars.colors.gray} onClick={() => router.push(`/setting/${loginUserName}`)} />
      ) : (
        <div className={styles.followerBox}>             
            <SmallButton
              text={isFollowed ? '팔로잉' : '팔로우'}
              color={isFollowed ? 'lightGray' : 'black'}
              onClick={() => toggleFollow()}
            />
            {isFollowed && (
              <div className={styles.notificationHoverText} data-hover={alarmText}>
                <div className={styles.alarmIcon} onClick={toggleAlarm}>
                  {isAlarmed ? <MdNotifications size={20} /> : <MdNotificationsOff size={20} /> }
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  )
}
}

'use client'

import React, { useEffect, useState } from "react";
import * as styles from './index.css'
import Container from "@/components/Container";
import Image from "next/image";
import dummy from '#/images/dummy-profile-img.jpg'
import SmallButton from "@/components/Button/SmallButton";
import StreamingVideo from "@/components/StreamingVideo";
import { rowbox } from "@/styles/box.css";
import { useParams, useRouter } from 'next/navigation';
import useProfileStore from "@/store/ProfileStore";
import ProfileImage from "@/components/ProfileImg";
import useAuthStore from "@/store/AuthStore";
import { vars } from "@/styles/vars.css";
import useMainStore from "@/store/MainStore";

export default function UserStreaming() {

  const [loading, setLoading] = useState(false)
  const { userData } = useAuthStore()
  const { streamRoomTitle } = useMainStore()
  const { streamerProfileData, streamerUserName, getStreamerProfileInfo, doFollowUser, unDoFollowUser } = useProfileStore()
  const [subscriberCount, setSubscriberCount] = useState(streamerProfileData.followers || 0)
  const [isFollowed, setIsFollowed] = useState(streamerProfileData.isFollowed)

  const router = useRouter()
  const params = useParams()

  console.log('-------여기는 스트리머 방 페이지 팔로잉 팔로우 확인용')

  const loginUserName = userData.username

  const toggleFollow = () => {
    setLoading(true)

    if (isFollowed) {
      setIsFollowed(false)
      setSubscriberCount(subscriberCount - 1)
      unDoFollowUser(streamerUserName)
    } else {
      setIsFollowed(true)
      setSubscriberCount(subscriberCount + 1)
      doFollowUser(streamerUserName)
    }
    setLoading(true)
  }

  useEffect(() => {
    let encodedUsername = params.username
    encodedUsername = String(encodedUsername).replace("%3D", '')
    const decodedUsername = atob(encodedUsername)
    if (!streamerUserName) {
      // decodedUsername이 null인 경우만 initData를 호출
      const initData = async () => {
        console.log('스트리머 방 관련 정보 가져오기', decodedUsername)
        await getStreamerProfileInfo(decodedUsername)
        setLoading(true)
      }
      initData()
    }
  }, [getStreamerProfileInfo])

  useEffect(() => {
    setLoading(true)
    if (streamerProfileData) {
      setIsFollowed(streamerProfileData.isFollowed || false)
      // 팔로우가 된 상태라면
      // 맨 처음에 팔로우 안 되어 있으면 자동으로 false
    }
  }, [streamerProfileData])

  console.log(streamerProfileData)
  return (
    <div className={styles.container}>
      <div className={styles.videoPlayer}>
        {/* <StreamingVideo /> */}
      </div>
      <div className={styles.streamerInfoContainer}>
        <div className={styles.leftBoxContainer}>
          <ProfileImage url={streamerProfileData.photoUrl} width={80} alt={"User profile"}/>
          <div className={styles.leftBox}>
            <div className={styles.leftBoxItem}>
              <div className={styles.streamingTitle}>{streamRoomTitle}</div>
            </div>
            <div className={styles.leftBoxItem}>
              <div className={styles.streamerName}>{streamerProfileData.nickname}</div>    
            </div>  
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.rightBoxItme}>
            {`${streamerUserName}` === loginUserName ? (
              <SmallButton text='채널관리' color={vars.colors.gray} onClick={() => router.push(`/setting/${loginUserName}`)} />
            ) : (
                  <SmallButton
                    text={isFollowed ? '팔로잉' : '팔로우'}
                    color={isFollowed ? 'lightGray' : 'black'}
                    onClick={() => toggleFollow()}
                  />
            )}
          </div>
          <div className={styles.rightBoxItme}>
            <div className={styles.stremingInfo}>1,549명 시청 중 03:43:14 스트리밍 중</div>
          </div>
        </div>
      </div>
    </div>
  )
}
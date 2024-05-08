'use client'

import React, { useEffect } from "react";
import * as styles from './index.css'
import Container from "@/components/Container";
import Image from "next/image";
import dummy from '#/images/dummy-profile-img.jpg'
import SmallButton from "@/components/Button/SmallButton";
import StreamingVideo from "@/components/StreamingVideo";
import { rowbox } from "@/styles/box.css";
import { useParams } from "next/navigation";
import useProfileStore from "@/store/ProfileStore";

export default function UserStreaming() {

  // const { getCurrentTopViewers, currentTopViewersData, getUserProfileInfo, getUserNicknameSearch, searchData } = useProfileStore()
  // const [subscriberCount, setSubscriberCount] = useState(profileData.followers || 0)
  // const [isFollowed, setIsFollowed] = useState(profileData.isFollowed)

  // const params = useParams()

  // useEffect(() => {
  //   let encodedUsername = params.username
  //   encodedUsername = String(encodedUsername).replace("%3D", '')
  //   const decodedUsername = atob(encodedUsername)
  //   if (!profileUserName) {
  //     // decodedUsername이 null인 경우만 initData를 호출
  //     const initData = async () => {
  //       console.log('-----------왜 안 되는데', decodedUsername)
  //       await getUserProfileInfo(decodedUsername)
  //       setLoading(true)
  //     }
  //     initData()
  //   }
  // }, [getUserProfileInfo, params.username])

  return (
    <div className={styles.container}>
      <div className={styles.videoPlayer}>
        <StreamingVideo />
      </div>
      <div className={styles.streamerInfoContainer}>
        <div className={styles.leftBoxContainer}>
          <Image src={dummy} className={styles.streamerImage} alt="User profile" />
          <div className={styles.leftBox}>
            <div className={styles.leftBoxItem}>
              <div className={styles.streamingTitle}>이글스여 비상하라</div>
            </div>
            <div className={styles.leftBoxItem}>
              <div className={styles.streamerName}>아기수리</div>    
            </div>  
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.rightBoxItme}>
            <SmallButton 
              text="팔로우"
            />
          </div>
          <div className={styles.rightBoxItme}>
            <div className={styles.stremingInfo}>1,549명 시청 중 03:43:14 스트리밍 중</div>
          </div>
        </div>
      </div>
    </div>
  )
}
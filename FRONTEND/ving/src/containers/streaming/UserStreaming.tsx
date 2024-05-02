'use client'

import React from "react";
import * as styles from './index.css'
import Container from "@/components/Container";
import Image from "next/image";
import dummy from '#/images/dummy-profile-img.jpg'
import SmallButton from "@/components/Button/SmallButton";
import StreamingVideo from "@/components/StreamingVideo";
import { rowbox } from "@/styles/box.css";

export default function UserStreaming() {
  return (
    <div className={styles.container}>
      <div className={styles.videoPlayer}>
        <StreamingVideo />
      </div>
      <div className={styles.userInfoContainer}>
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
'use client'

import React from "react";
import * as styles from './index.css'
import Container from "@/components/Container";
import Image from "next/image";
import dummy from '#/images/dummy-profile-img.jpg'
import { columnbox, defaultBox, startBox } from "@/styles/box.css";
import SmallButton from "@/components/Button/SmallButton";
import StreamingVideo from "@/components/StreamingVideo";

export default function UserStreaming() {
  return (
    <div className={styles.container}>
      <div className={styles.videoPlayer}>
        <StreamingVideo />
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.leftBox}>
          <Image src={dummy} className={styles.stremerImage} alt="User profile" />
          <div className={columnbox}>
            <div className={styles.streamingTitle}>이글스여 비상하라</div>
            <div className={styles.stremerName}>아기수리</div>            
          </div>
        </div>
        <div className={columnbox}>
          <div className={styles.rightBoxItme}>
            <SmallButton 
              text="팔로우"
            />
          </div>
          <div className={styles.rightBoxItme}>1,549명 시청 중 03:43:14 스트리밍 중</div>
        </div>
      </div>
    </div>
  )
}
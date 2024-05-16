import React from "react";
import Chat from "@/components/Chat";
import StudioStreaming from "./StudioStreaming";
import * as styles from '../index.css'
import NewsFeed from "@/components/NewsFeed";
import StudioChat from "@/components/Chat/StudioChat";
import { lightLine, line } from "@/styles/common.css";

export default function StartStreaming() {
  return (
    <div className={styles.contentContainer}>
      <StudioStreaming />
      <div className={styles.startStreamingRightBox}>
        <div className={styles.streamKeyBox}>
          <span className={styles.streamKeyBoxTitle}>스트림 키</span>:&nbsp;
          <span className={styles.streamKeyBoxContent}>
            방송 시작을 누르시면 스트림 키가 생성됩니다.
          </span>
        </div>
        <hr className={line} />
        <StudioChat />
        <hr className={line} />
        <NewsFeed />        
      </div>
    </div>
  )
}
import React from "react";
import Chat from "@/components/Chat";
import StudioStreaming from "./StudioStreaming";
import * as styles from '../index.css'
import NewsFeed from "@/components/NewsFeed";
import StudioChat from "@/components/Chat/StudioChat";
import { line } from "@/styles/common.css";

export default function StartStreaming() {
  return (
    <div className={styles.contentContainer}>
      <StudioStreaming />
      <div className={styles.startStreamingRightBox}>
        <StudioChat />
        <hr className={line} />
        <NewsFeed />        
      </div>
    </div>
  )
}
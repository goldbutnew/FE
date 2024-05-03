'use client'

import Chat from "@/components/Chat"
import * as styles from "./index.css"
import UserStreaming from "./UserStreaming"

export default function Streaming() {
  return (
    <div className={styles.contentContainer}>
      <UserStreaming /> 
      <Chat />
    </div>
  )
}
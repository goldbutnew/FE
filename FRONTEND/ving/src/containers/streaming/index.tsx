'use client'

import Chat from "@/components/Chat"
import * as styles from "./index.css"
import ViewerStreaming from "./ViewerStreaming"

export default function Streaming() {
  return (
    <div className={styles.contentContainer}>
      <ViewerStreaming /> 
      <Chat />
    </div>
  )
}
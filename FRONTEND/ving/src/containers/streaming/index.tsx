'use client'

import Chat from "@/components/Chat"
import * as styles from "./index.css"
import Container from "@/components/Container"

export default function Streaming() {
  return (
    <Container>
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          
        </div>   
        <Chat />
      </div>
    </Container>
  )
}
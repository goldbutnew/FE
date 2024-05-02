'use client'

import Chat from "@/components/Chat"
import * as styles from "./index.css"
import Container from "@/components/Container"

export default function Streaming() {
  return (
    <div className={styles.contentContainer}>
      <Container>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Container>   
      <Chat />
    </div>
  )
}
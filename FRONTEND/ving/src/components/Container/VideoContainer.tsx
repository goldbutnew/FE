import React from "react";
import * as styles from './index.css'

interface ContainerProps {
  children?: React.ReactNode
}

export default function VideoContainer({ children }: ContainerProps) {
  return (
    <div className={styles.videoContainer}>
      {children}
    </div>
  )
}
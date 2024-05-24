import React from "react";
import * as styles from './index.css'

interface ContainerProps {
  children?: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
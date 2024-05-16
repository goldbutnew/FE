import React from 'react'
import * as styles from './index.css'

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
  </div>
  )
}

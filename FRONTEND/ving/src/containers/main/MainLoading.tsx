import Container from '@/components/Container'
import React from 'react'
import * as styles from './index.css'

export default function MainLoading() {
  return (
    <div className={styles.mainVideoGridBox}>
      <div className={styles.loadingGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.loadingCard}>
            <div className={styles.loadingThumbnail}></div>
            <div className={styles.loadingProfileContainer}>
              <div className={styles.loadingProfileImageBox}>
                <div className={styles.loadingProfileImage}></div>
              </div>
              <div className={styles.loadingProfileInfoBox}>
                <div className={styles.loadingTextPlaceholder}></div>
                <div className={styles.loadingTextSmall}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

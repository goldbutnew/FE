import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import * as styles from './index.css'
import { ProfileTabComponent } from './ProfileTabComponent'

export default function TabsComponent({ where }) {
  const [activeTab, setActiveTab] = useState(where)
  const router = useRouter()
  const params = useParams()

  const move = (tabName) => {
    if ((tabName) === 'video' ) {
      console.log('hiiiiii', (tabName))
      setActiveTab('home')
      router.push(`/profile/${params.userId}`)
    } 
    else {
      console.log('hi', (tabName))
      setActiveTab('video')
      router.push(`${params.userId}/video`)
    }
  }

  return (
    <div>
      <ul className={styles.tabList}>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'home'} 
          onClick={() => {
            move('home')
          }}
        >
          홈
        </li>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'video'} 
          onClick={() => {
            move('video')
          }}
        >
          동영상
        </li>
      </ul>
      <div className={styles.tabPanel}>
        {activeTab === 'home' && <ProfileTabComponent />}
      </div>
    </div>
  )
}
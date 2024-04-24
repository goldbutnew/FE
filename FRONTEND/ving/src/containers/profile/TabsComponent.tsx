import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import * as styles from './index.css'
import { ProfileTabComponent } from './ProfileTabComponent'

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState('home')
  const router = useRouter()
  const params = useParams()

  return (
    <div>
      <ul className={styles.tabList}>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')}
        >
          홈
        </li>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'video'} 
          onClick={() => {
            setActiveTab('video')
            router.push(`${params.userId}/video`)}
          }
        >
          동영상
        </li>
      </ul>
      <div className={styles.tabPanel}>
        {activeTab === 'home' && <ProfileTabComponent />}
        {activeTab === 'video' && <div>Video content...</div>}
      </div>
    </div>
  )
}
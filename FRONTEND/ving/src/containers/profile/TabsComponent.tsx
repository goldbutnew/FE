import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import * as styles from './index.css'
import ProfileTabComponent from './ProfileTabComponent'
import VideoTabComponent from './VideoTabComponent'
import { line } from '@/styles/common.css'
import useProfileStore from '@/store/ProfileStore'

type TabsComponentProps = {
  where: string
  userProfileData: any
}

const TabsComponent = ({ where }: TabsComponentProps) =>  {
  const [activeTab, setActiveTab] = useState(where)
  const router = useRouter()
  const params = useParams()
  const { profileData } = useProfileStore()

  const move = (tabName: string) => {
    if (tabName === 'video') {
      setActiveTab('video')
      router.push(`/profile/${params.username}/video`)
    } else {
      setActiveTab('home')
      router.push(`/profile/${params.username}`)
    }
  }

  useEffect(() => {
    if (profileData) {
    }
  }, [profileData])

  return (
    <div>
      <ul className={styles.tabList}>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'home'} 
          onClick={() => move('home')}
        >
          홈
        </li>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'video'} 
          onClick={() => move('video')}
        >
          동영상
        </li>
      </ul>
      <hr className={line} />
      <div className={styles.tabPanel}>
        {activeTab === 'home' && <ProfileTabComponent />}
        {activeTab === 'video' && <VideoTabComponent />}
      </div>
    </div>
  )
}

export default TabsComponent

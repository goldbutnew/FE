import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import * as styles from './index.css'
import ProfileTabComponent from './ProfileTabComponent'
import VideoTabComponent from './VideoTabComponent'
import { line } from '@/styles/common.css'
import useProfileStore from '@/store/ProfileStore'

type TabsComponentProps = {
  where: string
}

const TabsComponent = ({ where }: TabsComponentProps) =>  {
  const [activeTab, setActiveTab] = useState(where)
  const router = useRouter()
  const params = useParams()
  const { profileData } = useProfileStore()
  const [loading, setLoading] = useState(false)

  const move = (tabName:string) => {
    if ((tabName) === 'video' ) {
      console.log('hiiiiii', (tabName))
      setActiveTab('video')
      router.push(`/profile/${params.username}/video`)
    } 
    else {
      console.log('hi', (tabName))
      setActiveTab('home')
      router.push(`/profile/${params.username}`)
    }
  }

  useEffect(() => {
    if (profileData) {
      setLoading(true)
    }
    console.log("홈동영상 탭 페이지 디버깅----")
  }, [setLoading])
  
  if (loading) {
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
      <hr className={line} />
      <div className={styles.tabPanel}>
        {activeTab === 'home' && <ProfileTabComponent />}
        {activeTab === 'video' && <VideoTabComponent />}
      </div>
    </div>
  )
}
}

export default TabsComponent
import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import { BsFillPinAngleFill, BsYoutube, BsInstagram } from "react-icons/bs"
import useProfileStore from '@/store/ProfileStore'
import { useParams } from 'next/navigation'
import { FiLink } from "react-icons/fi"
import Card from '@/components/Card'

interface SocialLinkProps {
  title: string
  url: string
}

interface representativeVideoProps {
  videoThumbnail: string
  title: string
  viewCount: number
  day: number
}

const representativeVideoInfo: representativeVideoProps[] = [
  {
    videoThumbnail: 'https://picsum.photos/id/1/200/300',
    title: '석촌호수 사람 짱많음 ㅋ',
    viewCount: 70,
    day: 3,
  },
]

const SocialLink:React.FC<SocialLinkProps> = ({ url }) => {
  const renderIcon = () => {
    if (url.toLowerCase().includes('www.instagram.com')) {
      return <BsInstagram size={16} />
    } else if (url.toLowerCase().includes('www.youtube.com')) {
      return <BsYoutube size={16} />
    }
    return <FiLink size={16} />
  }

  const platformName = () => {
    if (url.toLowerCase().includes('www.instagram.com')) {
      return '인스타그램'
    } else if (url.toLowerCase().includes('www.youtube.com')) {
      return '유튜브'
    }
    return '기타'
  }

  return (
    <div className={styles.socialLinkBox}>
      {renderIcon()}
      <span className={styles.socialLinkItemTitle}>{platformName()}:</span>
      <a href={url}>
        <span>{url}</span>
      </a>
    </div>
  )
}

export default function ProfileTabComponent() {

  const params = useParams()

  const { profileData, getUserProfileInfo } = useProfileStore()
  const profileUserName = params.username
  const [links, setLinks] = useState(profileData.links || [])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const initData = async () => {
  //     await getUserProfileInfo(atob(profileUserName))
  //   }
  //   initData()
  //   console.log(profileData)
  // }, [getUserProfileInfo])

  useEffect(() => {
    if (profileData) {
      setLoading(true)
    }
    console.log('hi')
  }, [profileData])
  
  if (loading) {
  return (
    <div>
      <Card>
          <div className={styles.profileTabItemTitleBox}>
            <BsFillPinAngleFill size={24} />
            <span className={styles.profileTabItemTitle}>소셜링크</span>
          </div>
          {links.map((link) => (
            <SocialLink key={link.title} {...link} />
          ))}
      </Card>

      <Card>
        <div className={styles.profileTabItemTitleBox}>
          <BsFillPinAngleFill size={24} />
          <span className={styles.profileTabItemTitle}>대표영상</span>
        </div>
        {representativeVideoInfo.map(video => (
          <div key={video.title} className={styles.representativeVideoInfo}>
            <img src={video.videoThumbnail} className={styles.representativevideoThumnail}></img>
            <div className={styles.representativevideoInfoBox}>
              <span>{video.title}</span>
              <span className={styles.videoInfoText} >조회수 {video.viewCount}회 · {video.day}일 전</span>
            </div>
          </div>
            ))}
      </Card>
    </div>
  )
}
}
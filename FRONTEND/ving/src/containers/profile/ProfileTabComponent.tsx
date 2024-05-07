import React from 'react'
import * as styles from './index.css'
import { rowbox } from '@/styles/box.css'
import { BsFillPinAngleFill, BsYoutube, BsInstagram } from "react-icons/bs"

interface SocialLinkProps {
  platform: string
  link: string
}

interface representativeVideoProps {
  videoThumbnail: string
  title: string
  viewCount: number
  day: number
}

const socialLinks: SocialLinkProps[] = [
  {
    platform: '유튜브',
    link: 'https://www.youtube.com/user/yourusername',
  },
  {
    platform: '인스타그램',
    link: 'https://www.instagram.com/yourusername', 
  },
]

const representativeVideoInfo: representativeVideoProps[] = [
  {
    videoThumbnail: 'https://picsum.photos/id/1/200/300',
    title: '석촌호수 사람 짱많음 ㅋ',
    viewCount: 70,
    day: 3,
  },
]

const SocialLink: React.FC<SocialLinkProps> = ({ platform, link }) => {
  const renderIcon = () => {
    if (platform.toLowerCase() === '인스타그램') {
      return <BsInstagram size={30} />
    } else if (platform.toLowerCase() === '유튜브') {
      return <BsYoutube size={30} />
    }
  }
  
  return (
    <>
    <div className={styles.socialLinkBox}>
      {renderIcon()}
      <span>{platform}:</span>
      <a href={link}>
        <span>{link}</span>
      </a>
    </div>
    </>
  )
}

// interface UserInfoBoxProps {
//   username: string
//   userImage: string
//   socialLinks: SocialLinkProps[]
// }

export function ProfileTabComponent() {
  return (
    <div>
      <div className={styles.socialLinkContainer}>
          <div className={styles.socialTitleBox}>
            <BsFillPinAngleFill size={32} />
            <span className={styles.socialTitle}>소셜 링크</span>
          </div>
          {socialLinks.map((link) => (
            <SocialLink key={link.platform} {...link} />
          ))}
      </div>
      <div className={styles.representativeContainer}>
        <div className={styles.representativeVideoTitleBox}>
          <BsFillPinAngleFill size={32} />
          <span className={styles.representativeVideoTitle}>대표 영상</span>
        </div>
        {representativeVideoInfo.map(video => (
          <div key={video.title} className={styles.representativeVideoInfo}>
            <img src={video.videoThumbnail} width={360} height={250}></img>
            <div className={styles.videoInfoBox}>
              <span>{video.title}</span>
              <span className={styles.videoAdditionalInfoText} >조회수 {video.viewCount}회 · {video.day}일 전</span>
            </div>
          </div>
            ))}
      </div>
    </div>
  )
}
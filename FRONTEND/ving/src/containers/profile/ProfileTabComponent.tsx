import React from 'react'
import * as styles from './index.css'
import Image from 'next/image'
import { rowbox } from '@/styles/box.css'
import youtubeLogo from '#/images/youtubeLogo.png'
import instagramLogo from '#/images/instagramLogo.png'
import pin from '#/images/pin.png'

interface SocialLinkProps {
  platform: string
  link: string
  logo: object
}

interface representativeVideoProps {
  videoThumbnail: string
  title: string
  viewCount: number
  day: number
}

const socialLinks: SocialLinkProps[] = [
  {
    platform: '유튜브:',
    link: 'https://www.youtube.com/user/yourusername',
    logo: youtubeLogo,
  },
  {
    platform: '인스타그램:',
    link: 'https://www.instagram.com/yourusername', 
    logo: instagramLogo
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

const SocialLink: React.FC<SocialLinkProps> = ({ platform, link, logo }) => {
  return (
    <>
    <a href={link} className={styles.socialLink}>
      <Image src={logo} alt='socialLogo' className={styles.socialLogo} width={30} height={30}></Image>
      <span>{platform}</span>
    </a>
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
    <>
      <div className={styles.socialLinkContainer}>
          <div className={styles.socialTitleBox}>
            <Image src={pin} alt='pinImage' width={40} height={40}></Image>
            <span className={styles.socialTitle}>소셜 링크</span>
          </div>
          {socialLinks.map((link) => (
            <SocialLink key={link.platform} {...link} />
          ))}
      </div>
      <div className={styles.representativeBox}>
      <div className={styles.representativeVideoTitleBox}>
        <Image src={pin} alt='pinImage' width={40} height={40}></Image>
        <span className={styles.representativeVideoTitle}>대표 영상</span>
      </div>
      {representativeVideoInfo.map(video => (
        <div key={video.title} className={`${rowbox}`}>
          <img src={video.videoThumbnail} width={360} height={250}></img>
          <div className={styles.videoInfoBox}>
            <span>{video.title}</span>
            <span>조회수 {video.viewCount}회</span>
            <span>{video.day}일 전</span>
          </div>
        </div>
          ))}
      </div>
    </>
  )
}
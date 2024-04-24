import React from 'react'
import * as styles from './index.css'

interface SocialLinkProps {
  platform: string
  link: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ platform, link }) => {
  return (
    <a href={link} className={styles.socialLink}>
      <span>{platform}</span>
    </a>
  )
}

interface UserInfoBoxProps {
  username: string
  userImage: string
  socialLinks: SocialLinkProps[]
}

const dummyUserInfo = {
  userImage: 'https://picsum.photos/id/1/200/300',
  userNickname: '이우주안티',
  userIntroduce: '하이 여긴 이우주안티의 개인홈 ><!',
}

export function ProfileUserInfoBox() {
  return (
    <div className={styles.userInfoBox}>
      <img src={dummyUserInfo.userImage} className={styles.userImage} alt="User profile" />
      <div className={styles.userTextInfoBox}>
        <span className={styles.userName}>이우주안티</span>
        <span className={styles.userIntroduce}>하이 여긴 이우주안티의 개인홈</span>
      </div>
    </div>
  )
}
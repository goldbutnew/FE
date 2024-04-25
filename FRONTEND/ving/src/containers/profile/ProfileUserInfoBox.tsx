import React from 'react'
import * as styles from './index.css'
import SmallButton from '@/components/Button/SmallButton'
import { useParams, useRouter } from 'next/navigation'

interface SocialLinkProps {
  platform: string
  link: string
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

export default function ProfileUserInfoBox({ btnName }) {

  const router = useRouter()
  const params = useParams()

  return (
    <div className={styles.userInfoBox}>
      <img src={dummyUserInfo.userImage} className={styles.userImage} alt="User profile" />
      <div className={styles.userTextInfoBox}>
        <span className={styles.userName}>이우주안티</span>
        <span className={styles.userIntroduce}>하이 여긴 이우주안티의 개인홈</span>
      </div>
      <SmallButton text={btnName} color='lightGray' onClick={() => {
        // 로그인한 사람이랑 userId가 같을 경우
        if (btnName === '채널 관리') {
          router.push(`/profile/${params.userId}`)}
        else {
        // 로그인한 사람이랑 userId가 다를 경우
        // 내가 이미 팔로우 했을 경우
        // 내가 팔로우 하지 않은 사람일 경우
          router.push(`/profile/${params.userId}`)
        }
      }}/>
    </div>
  )
}
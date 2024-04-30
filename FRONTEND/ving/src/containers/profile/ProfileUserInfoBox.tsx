import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import SmallButton from '@/components/Button/SmallButton'
import { useParams, useRouter } from 'next/navigation'
import useProfileStore from '@/store/ProfileStore'

interface SocialLinkProps {
  platform: string
  link: string
}

interface UserInfoBoxProps {
  username: string
  userImage: string
  socialLinks: SocialLinkProps[]
}

// const profileData = {
//   userImage: 'https://picsum.photos/id/1/200/300',
//   userNickname: '이우주안티',
//   userIntroduce: '하이 여긴 이우주안티의 개인홈 ><!',
//   userSubscriberCount: 100,
// }

export default function ProfileUserInfoBox() {

  const router = useRouter()
  const params = useParams()

  // 임시 로그인 유저
  const loginUserId = 10

  const [loading, setLoading] = useState(false)
  const { profileData, getUserProfileInfo } = useProfileStore()
  const [subscriberCount, setSubscriberCount] = useState(profileData.followers || 0)
  const [isFollowed, setIsFollowed] = useState(profileData.isFollowed)
  
  const toggleFollow = () => {
    const userIdNum = parseInt(params.userId)
    setLoading(true)
    
    // const nickname = 'baloo366'

    if (isFollowed) {
      setIsFollowed(false)
      setSubscriberCount(subscriberCount - 1)
    } else {
      setIsFollowed(true)
      setSubscriberCount(subscriberCount + 1)
    }
    setLoading(true)
  }

  useEffect(() => {
    const initData = async (userIdNum:number) => {
      await getUserProfileInfo(userIdNum)
      setLoading(true)
    }
    initData(params.userId)
    console.log('뭔데;;;;;;;')
  }, [getUserProfileInfo])

  useEffect(() => {
    if (profileData) {
      setSubscriberCount(profileData.followers || 0)
    }
    console.log('hiiiiiiiiiiiiiiiiiiii')
  }, [profileData])

  useEffect(() => {
    if (params.userId && params.userId !== String(loginUserId)) {
      console.log('다른 유저네')
      setLoading(true)
    }
    console.log('뭐냐고;;;;;;;')
  }, [params.userId, isFollowed])

  // 팔로우 여부 관련 api 호출
  // const checkFollowStatus = async (userId:String) => {
  //   try {
  //     const response = await axios.get(`/api/follow/${userId}`)
  //     setIsFollowed(response.data.isFollowed)
  //   } catch (error) {
  //     setLoading(false)
  //     console.error(error)
  //   }
  // }
  if (loading) {
  return (
    <div className={styles.userInfoBox}>
      <img src={profileData.photoUrl} className={styles.userImage} alt="User profile" />
      <div className={styles.userTextInfoBox}>
        <span className={styles.userName}>{profileData.nickname}</span>
        <span className={styles.userIntroduce}>{profileData.userIntroduce}</span>
      </div>
      {`${params.userId}` === String(loginUserId) ? (
        <SmallButton text='채널관리' color='lightGray' onClick={() => router.push('/setting')} />
      ) : (
        <div>
          <SmallButton
            text={isFollowed ? '팔로우 취소' : '팔로우'}
            color='lightGray'
            onClick={() => toggleFollow(params.userId)}
          />
          <div>팔로워 {subscriberCount}명</div>
        </div>
      )}
    </div>
  )
}
}
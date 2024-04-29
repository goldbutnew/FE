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
  const loginUserId = 1

  const [isFollowed, setIsFollowed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [followList, setFollowList] = useState([2, 3, 4])
  const { profileData, getUserProfileInfo } = useProfileStore()
  const [subscriberCount, setSubscriberCount] = useState(profileData.userSubscriberCount)

  const toggleFollow = (userId: string) => {
    const userIdNum = parseInt(userId)
    setLoading(true)
    
    // const nickname = 'baloo366'

    if (followList.includes(userIdNum)) {
      setFollowList(followList.filter(id => id !== userIdNum))
      setIsFollowed(false)
      setSubscriberCount(subscriberCount - 1)
    } else {
      setFollowList([...followList, userIdNum])
      setIsFollowed(true)
      setSubscriberCount(subscriberCount + 1)
    }
    setLoading(true)
  }

  useEffect(() => {
    const initData = async () => {
      await getUserProfileInfo(7)
      setLoading(false)
      if (profileData) {
        setSubscriberCount(profileData.userSubscriberCount)
      }
    }
    initData()
  }, [getUserProfileInfo, profileData])

  useEffect(() => {
    if (params.userId && params.userId !== String(loginUserId)) {
      setLoading(true)
      setIsFollowed(followList.includes(parseInt(params.userId)))
    }
  }, [params.userId, followList])

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

  return (
    <div className={styles.userInfoBox}>
      <img src={profileData.userImage} className={styles.userImage} alt="User profile" />
      <div className={styles.userTextInfoBox}>
        <span className={styles.userName}>{profileData.userNickname}</span>
        <span className={styles.userIntroduce}>{profileData.userIntroduce}</span>
      </div>
      {`${params.userId}` === String(loginUserId) ? (
        <SmallButton text='채널관리' color='lightGray' onClick={() => router.push('/setting')} />
      ) : loading && (
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
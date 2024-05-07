import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import SmallButton from '@/components/Button/SmallButton'
import { useParams, useRouter } from 'next/navigation'
import useProfileStore from '@/store/ProfileStore'
import useAuthStore from '@/store/AuthStore'

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


  const [loading, setLoading] = useState(false)
  const { profileData, getUserProfileInfo, doFollowUser, unDoFollowUser, getUserNicknameSearch, searchData } = useProfileStore()
  const { userData } = useAuthStore()
  const [subscriberCount, setSubscriberCount] = useState(profileData.followers || 0)
  const [isFollowed, setIsFollowed] = useState(profileData.isFollowed)
  
  // const username = btoa(userData.username)
  const loginUserName = btoa(userData.username)
  const profileUserName = atob(params.username)

  const toggleFollow = () => {
    setLoading(true)
    
    // const nickname = 'baloo366'

    if (isFollowed) {
      setIsFollowed(false)
      setSubscriberCount(subscriberCount - 1)
      unDoFollowUser(profileUserName)
    } else {
      setIsFollowed(true)
      setSubscriberCount(subscriberCount + 1)
      doFollowUser(profileUserName)
    }
    setLoading(true)
  }

  useEffect(() => {
    console.log(params.username)
    console.log(atob(params.username))

    getUserNicknameSearch()
    const initData = async (profileUserName:string) => {
      await getUserProfileInfo(profileUserName)
      setLoading(true)
    }
    initData(profileUserName)
  }, [getUserProfileInfo])

  useEffect(() => {
    if (profileData) {
      setSubscriberCount(profileData.followers || 0)
    }
  }, [profileData])

  useEffect(() => {
    if (profileUserName && profileUserName !== String(loginUserName)) {
      setLoading(true)
    }
  }, [profileUserName, isFollowed])

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
      <div className={styles.userImageNameInfoBox}>
        <img src={profileData.photoUrl} className={styles.userImage} alt="User profile" />
        <div className={styles.userTextInfoBox}>
          <span className={styles.userName}>{profileData.nickname}</span>
          <span className={styles.userIntroduce}>{profileData.userIntroduce || '안녕하세요 반가워요 이제 안녕히 가세요'}</span>
        </div>
      </div>
      {`${profileUserName}` === String(loginUserName) ? (
        <SmallButton text='채널관리' color='lightGray' onClick={() => router.push('/setting')} />
      ) : (
        <div className={styles.followerBox}>
          <SmallButton
            text={isFollowed ? '팔로잉' : '팔로우'}
            color={isFollowed ? 'lightGray' : 'black'}
            onClick={() => toggleFollow()}
          />
          <div>팔로워 {subscriberCount}명</div>
        </div>
      )}
    </div>
  )
}
}
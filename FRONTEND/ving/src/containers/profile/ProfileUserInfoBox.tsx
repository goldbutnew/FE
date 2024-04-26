import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import SmallButton from '@/components/Button/SmallButton'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

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

export default function ProfileUserInfoBox() {

  const router = useRouter()
  const params = useParams()

  // 임시 로그인 유저
  const loginUserId = 1

  const [isFollowed, setIsFollowed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [followList, setFollowList] = useState([2, 3, 4])

  const toggleFollow = (userId) => {
    const userIdNum = parseInt(userId)
    setLoading(true)

    if (followList.includes(userIdNum)) {
      setFollowList(followList.filter(id => id !== userIdNum))
      setIsFollowed(false)
    } else {
      setFollowList([...followList, userIdNum])
      setIsFollowed(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (params.userId && params.userId !== String(loginUserId)) {
      setLoading(true)
      // checkFollowStatus(params.userId)
      // 임시 더미 팔로우 확인용 함수
      if (followList.includes(parseInt(params.userId))) {
        setIsFollowed(false)
      } else {
        setIsFollowed(true)
      }
      setLoading(true)
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
      <img src={dummyUserInfo.userImage} className={styles.userImage} alt="User profile" />
      <div className={styles.userTextInfoBox}>
        <span className={styles.userName}>이우주안티</span>
        <span className={styles.userIntroduce}>하이 여긴 이우주안티의 개인홈</span>
      </div>
      {`${params.userId}` === String(loginUserId) ? 
      (<SmallButton text='채널관리' color='lightGray' onClick={() => {
        router.push('/setting')
      }} />) :
      loading && (isFollowed ? <SmallButton text='팔로우 취소' color='lightGray' onClick={() => {
        toggleFollow(params.userId)
      }} /> : <SmallButton text='팔로우' color='lightGray' onClick={() => {
        toggleFollow(params.userId)
      }} />)
      }
    </div>
  )
}
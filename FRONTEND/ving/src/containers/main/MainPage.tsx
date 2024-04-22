'use client'

import { useRouter } from 'next/navigation'
import * as styles from './index.css'

export default function MainPage() {

  const router = useRouter()
  
  // 임시 유저 아이디
  const userId = 1

  return (
    <div>
      <h1 className={styles.container}>메인 페이지</h1>
      <button onClick={() => router.push('/setting')}>
        세팅
      </button>
      <button onClick={() => router.push(`/profile/${userId}`)}>
        내 채널
      </button>
      <button onClick={() => router.push(`/studio/${userId}`)}>
        내 스튜디오
      </button>
      <button onClick={() => router.push(`/streaming/${userId}`)}>
        방송중인 누군가의 방
      </button>
    </div>
  )
}
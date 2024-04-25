'use client'

import LargeButton from '@/components/Button/LargeButton'
import * as styles from './studioStreaming.css'
import { useParams, useRouter } from 'next/navigation'

export default function StudioPage() {
  
const router = useRouter()
const params = useParams()

  return (
    <div>
      <h1>누군가의 스튜디오 페이지</h1>
      <button onClick={() => router.push(`${params.userId}/static`)}>
        통계
      </button>
      <button onClick={() => router.push(`${params.userId}/streaming`)}>
        방송하기
      </button>
      <div className={styles.cardContainer}>
      <div className={styles.cardTitle}>환영합니다, 이우주안티 님!</div>
      <div className={styles.cardContent}>
        지금 Ving에서 당신의 현재를 스트리밍 해보세요
        {/* <div className={styles.letStreaming}>방송하기</div> */}
        <ol>
          <li>스트리밍 소프트웨어를 다운로드 해주세요.</li>
          <li>스트리밍 키를 소프트웨어에 붙여 넣어주세요.
          </li>
          <li>스트리밍 소프트웨어에서 방송을 시작하면 라이브 방송이 진행됩니다.</li>
              방송 시작과 종료를 스트리밍 소프트웨어에서 진행해주세요.
        </ol>
      </div>
      <LargeButton text='방송하기' color='lightGrey'></LargeButton>
    </div>
    </div>
  )
}
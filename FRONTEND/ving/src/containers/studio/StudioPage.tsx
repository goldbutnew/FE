'use client'

import LargeButton from '@/components/Button/LargeButton'
import * as styles from './static.css'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function StudioPage() {
  
const router = useRouter()
const params = useParams()

  return (
    <div>
      <h1>누군가의 스튜디오 페이지</h1>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.navItem}>
            <Link href={`/studio/${params.userId}`}>
              <div>대시보드</div>
            </Link>
          </div>
          <div className={styles.navItem}>
            <Link href={`/studio/${params.userId}/streaming`}>
              <div>방송하기</div>
            </Link>
          </div>
          <div className={styles.navItem}>
          <Link href={`/studio/${params.userId}/static`}>
              <div>통계/분석</div>
            </Link>
          </div>
        </div>
        <div className={styles.content}>
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
      </div>
    </div>
  )
}
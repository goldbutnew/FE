'use client'

import Link from 'next/link'
import * as styles from './static.css'
import { useParams, useRouter } from 'next/navigation'

export default function Static() {
  const params = useParams()

  return (
    <div>
      <h1>통계 페이지</h1>
      <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.navItem}>
          <Link href={`/studio/${params.userId}`}>
            <div>대시보드</div>
          </Link>
        </div>
        <div className={styles.navItem}>
          <Link href={`/${params.userId}/static`}>
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
        {/* Main content here */}
        <div className={styles.card}>
          {/* Statistic cards */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h3>총 방문수</h3>
              <p>35</p>
            </div>
            <div className={styles.statItem}>
              <h3>전체 시청자 수</h3>
              <p>3</p>
            </div>
            <div className={styles.statItem}>
              <h3>평균 시청자 수</h3>
              <p>4</p>
            </div>
            <div className={styles.statItem}>
              <h3>최대 시청자 수</h3>
              <p>7</p>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          {/* Streaming list */}
          <h2>스트리밍</h2>
          {/* Repeat this div for each streaming item */}
          <div>
            <div>영상</div>
            <div>설명추가 시사용 필요한문구</div>
            <div className={styles.stats}>
              <div className={styles.statItem}>시청 수</div>
              <div className={styles.statItem}>전체 시청자 수</div>
            </div>
          </div>
          {/* ...more streaming items */}
        </div>
      </div>
    </div>
    </div>
  )
}
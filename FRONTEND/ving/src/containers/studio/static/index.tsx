'use client'

import * as styles from '../index.css'
import { useParams, useRouter } from 'next/navigation'
import Container from '@/components/Container'

export default function Static() {
  const params = useParams()

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.title}>
          통계/분석
        </div>
        <div className={styles.contentBox}>
          {/* 통계 요약 */}
          <div className={styles.SummuryContainer}>
              <div className={styles.SummuryItemBox}>
                <div className={styles.itemTitle}>총 방문수</div>
                <div>35</div>
              </div>
              <div className={styles.SummuryItemBox}>
                <div className={styles.itemTitle}>전체 시청자 수</div>
                <div>3</div>
              </div>
              <div className={styles.SummuryItemBox}>
                <div className={styles.itemTitle}>평균 시청자 수</div>
                <div>4</div>
              </div>
              <div className={styles.SummuryItemBox}>
                <div className={styles.itemTitle}>최대 시청자 수</div>
                <div>7</div>
              </div>
          </div>

          {/* Streaming list */}
      
          <div className={styles.contentBox}>
            <div className={styles.subtitle}>스트리밍</div>
            <div className={styles.SummuryContainer}>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
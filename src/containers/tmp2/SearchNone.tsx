'use client'
import Container from '@/components/Container'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import * as styles from './index.css'

export default function SearchNone() {

  const searchParams = useSearchParams()
  const searchQeury = searchParams.get('searchQeury')

  return (
    <Container>
      <div className={styles.searchNoneBox}>
        <div className={styles.searchNoneTitle}>
          {`'${searchQeury}'에 대한 검색 결과가 없습니다.`}
          <div className={styles.searchConform}>
            검색어를 확인해주세요.
          </div>
        </div>
      </div>
    </Container>
  )
}

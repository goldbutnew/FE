'use client'
import Container from '@/components/Container'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import * as styles from './index.css'

export default function SearchNone() {

  const searchParams = useSearchParams()
  console.log(searchParams.get('message'))
  const message = searchParams.get('message')

  console.log(message)

  return (
    <Container>
      <div className={styles.searchNoneTitle}>
        {decodeURIComponent(message as string)}에 대한 검색 결과가 없습니다.
        <div>
          검색어를 확인해주세요.
        </div>
      </div>
    </Container>
  )
}

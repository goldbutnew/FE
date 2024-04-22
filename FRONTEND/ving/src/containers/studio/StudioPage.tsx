'use client'

import { useRouter, useParams } from 'next/navigation'

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
    </div>
  )
}
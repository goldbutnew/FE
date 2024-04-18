'use client'

import { useRouter, useParams } from 'next/navigation'

export default function ProfileHome() {

  const router = useRouter()
  const params = useParams()

  return (
    <div>
      <h1>누군가의 프로필 페이지</h1>
      <button onClick={() => router.push(`${params.userId}/video`)}>
        비디오
      </button>
    </div>
  )
}
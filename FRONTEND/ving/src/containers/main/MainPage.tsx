'use client'

import { useRouter } from 'next/navigation'
import * as styles from './index.css'

export default function MainPage() {

  const router = useRouter()
  
  // 임시 유저 아이디
  const userId = 1

  return (
    <div>
      <h1>메인 페이지</h1>
    </div>
  )
}
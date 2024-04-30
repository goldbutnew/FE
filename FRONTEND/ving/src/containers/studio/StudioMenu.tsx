'use client'

import React from "react";
import Link from "next/link";
import * as styles from './index.css'
import { useParams } from 'next/navigation'

export default function StudioMenu() {
  const params = useParams()

  return (
    <div className={styles.sideMenuContainer}>
      <div className={styles.menuItem}>
        <Link href={`/studio/${params.userId}`}>
          대시보드
        </Link>
      </div>
      <div className={styles.menuItem}>
        <Link href={`/studio/${params.userId}/streaming`}>
          방송하기
        </Link>
      </div>
      <div className={styles.menuItem}>
        <Link href={`/studio/${params.userId}/static`}>
          통계/분석
        </Link>
      </div>
    </div>
  )
}
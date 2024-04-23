'use clinet'

import React from "react";
import Link from 'next/link';
import * as styles from './index.css'

export default function NavBar() {
  const userId = 1
  
  return (
    <nav className={styles.container}>
      <Link href='/setting'>세팅</Link>　|　 
      <Link href={`/profile/${userId}`}>내 채널</Link>　|　 
      <Link href={`/studio/${userId}`}>내 스튜디오</Link>　|　 
      <Link href={`/streaming/${userId}`}>방송중인 누군가의 방</Link>　|　 
    </nav>
  )
}
'use clinet'

import React from "react";
import Image from "next/image";
import Link from 'next/link';

import logo from '../../../public/images/MainLogo.png'
import * as styles from './index.css'

export default function NavBar() {
  const userId = 1
  
  return (
    <nav className={styles.container}>
      <Link href='/'>
        <Image src={logo} alt="main" className={styles.logo} />
      </Link>　|　 
      <Link href='/setting'>세팅</Link>　|　 
      <Link href={`/profile/${userId}`}>내 채널</Link>　|　 
      <Link href={`/studio/${userId}`}>내 스튜디오</Link>　|　 
      <Link href={`/streaming/${userId}`}>방송중인 누군가의 방</Link>　|　 
      {/* 로그인 버튼 경로 수정 필요 */}
      <Link href={'/tmp'}>로그인</Link>　|　 
    </nav>
  )
}
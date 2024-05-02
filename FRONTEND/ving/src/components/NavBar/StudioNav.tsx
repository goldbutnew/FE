'use client'

import React from "react"
import Image from "next/image"
import Link from "next/link"

import logo from '#/images/simple-logo.png'
import textLogo from '#/images/studio-text-logo.png'
import * as styles from './index.css'

import useAuthStore from "@/store/AuthStore"

export default function StudioNav() {
  const { userData } = useAuthStore()
  // const userId = btoa(userData.username)
  const userId = 1

  return (
    <nav className={styles.container}>
      <div className={styles.studioNavBox}>
        <Link href='/'>
          <Image src={logo} alt="main" className={styles.logo} />
        </Link>
        <Link href={`/studio/${userId}`}>
          <Image src={textLogo} alt="main" className={styles.textLogo} />
        </Link>
      </div>
    </nav>
  )
}
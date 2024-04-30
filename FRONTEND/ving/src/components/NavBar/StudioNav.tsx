'use clinet'

import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from '#/images/simple-logo.png'
import textLogo from '#/images/studio-text-logo.png'
import * as styles from './index.css'

export default function StudioNav() {
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
'use client'

import React from "react";
import * as styles from './index.css'

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div>All services are provided by Ving Co., Ltd. For inquiries</div>
      <div>Contact us at&nbsp;
        <a className={styles.contactEmail} href="mailto:teamvideoing@gmail.com">
          teamvideoing@gmail.com
        </a>
      </div>
    </div>
  )
}
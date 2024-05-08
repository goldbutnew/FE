'use client'

import Container from "@/components/Container"
import SettingForm from "./SettingForm"
import * as styles from './index.css'

export default function Setting() {
  return (
    <Container>
      <div className={styles.settingTitle}>채널 관리</div>
      <SettingForm />
    </Container>
  )
}
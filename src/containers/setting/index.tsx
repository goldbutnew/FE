'use client'

import Container from "@/components/Container"
import SettingForm from "./SettingForm"
import * as styles from './index.css'
import { useEffect, useState } from "react"
import useProfileStore from "@/store/ProfileStore"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useRouter } from "next/navigation"

export default function Setting() {

  const [loading, setLoading] = useState(false)
  const { profileData } = useProfileStore()

  useEffect(() => {
    if (profileData) {
      setLoading(true)
    }
  }, [profileData, setLoading])

  if (loading) {
    return (
      <Container>
        <div className={styles.settingTitle}>채널 관리</div>
        <div className={styles.settingFormContainer}>
          <SettingForm />
        </div>
      </Container>
    )
  } else {
      return (
      <Container>
        <LoadingSpinner />
      </Container>
      )
  }
}
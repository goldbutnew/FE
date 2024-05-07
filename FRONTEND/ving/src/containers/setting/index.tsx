'use client'

import Container from "@/components/Container"
import SettingForm from "./SettingForm"

export default function Setting() {
  return (
    <Container>
      <div>
        <h1>채널 관리</h1>
        <SettingForm />
      </div>
    </Container>
  )
}
'use client'

import LargeButton from '@/components/Button/LargeButton'
import * as styles from './index.css'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import useAuthStore from '@/store/AuthStore'
import Container from '@/components/Container'

export default function Studio() {
  const { userData } = useAuthStore()
  
  const router = useRouter()
  const params = useParams()

  return (
      <Container>
        <div>    
          <div className={styles.dashboardContainer}>
            <div className={styles.leftBox}>
            <div className={styles.dashboardBox}>
              <div className={styles.title}>환영합니다, {userData.nickname} 님!</div>
              <p>지금 Ving에서 당신의 현재를 스트리밍 해보세요</p>
              <div className={styles.dashboardItemContent}>
                <div className={styles.subtitle}>방송하기</div>
                <div>
                  <span>1. 스트리밍 소프트웨어를 다운로드 해주세요.</span>
                </div>
                <div>
                  <span>2. 스트리밍 키를 소프트웨어에 붙여 넣어주세요.</span>
                  <span className={styles.dashboardOrderCf}>스트림 키는 방송 관리 {'>'} 설정에서 확인 가능합니다.</span>
                </div>
                <div>
                  <span>3. 스트리밍 소프트웨어에서 방송을 시작하면 라이브 방송이 진행됩니다.</span>
                  <span className={styles.dashboardOrderCf}>방송 시작과 종료를 스트리밍 소프트웨어에서 진행해주세요.</span>
                </div>
              </div>
              <LargeButton text='방송하기' color='lightGrey'></LargeButton>
            </div>
            </div>

            <div className={styles.rightBox}>
              <div className={styles.dashboardBox}>
                <div className={styles.title}>제목</div>
                <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                </div>
              </div>

              <div className={styles.dashboardBox}>
                <div className={styles.title}>제목</div>
                <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
  )
}
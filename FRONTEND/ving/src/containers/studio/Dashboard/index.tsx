'use client'

import LargeButton from '@/components/Button/LargeButton'
import * as styles from '../index.css'
import { useParams, useRouter } from 'next/navigation'
import useAuthStore from '@/store/AuthStore'
import Container from '@/components/Container'
import { vars } from '@/styles/vars.css'
import { lightLine } from '@/styles/common.css'

export default function Dashboard() {
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
                  <span className={styles.dashboardOrderCf}>스트리밍 키 받기 버튼 클릭 시 확인 가능합니다.</span>
                </div>
                <div>
                  <span>3. 스트리밍 소프트웨어에서 방송을 시작하면 라이브 방송이 진행됩니다.</span>
                  <span className={styles.dashboardOrderCf}>방송 시작과 종료를 스트리밍 소프트웨어에서 진행해주세요.</span>
                </div>
              </div>
              <LargeButton text='방송하기' color={vars.colors.darkGray}></LargeButton>
            </div>
            </div>

            <div className={styles.rightBox}>
              <div className={styles.dashboardBox}>
                <div className={styles.title}>방송 정보 설정 가이드</div>
                <div className={styles.dashboardItemContent}>
                  <div>
                    <div className={styles.streamingGuideSubtitle}>📝 방송 제목</div>
                    <span className={styles.streamingGuideItem}>
                      매력적인 제목으로 시청자의 관심을 유도해보세요.<br />
                      시청자가 방송을 찾을 때 사용할 만한 키워드를 넣는 것이 좋습니다.
                    </span>
                  </div>
                  <div>
                    <div className={styles.streamingGuideSubtitle}>🎨 미리보기 이미지</div>
                    <span className={styles.streamingGuideItem}>
                      진행 중인 방송을 설명할 수 있는 사진을 업로드하세요.<br />
                      시청자의 관심을 끄는 이미지가 좋습니다.
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.dashboardBox}>
                <div className={styles.title}>공지사항</div>
                <div>
                  <span>후원 메시지 읽어 주기 기능 추가 (24/05/17)</span>
                  <hr className={lightLine} />
                  <span>Ving 업데이트 안내 (24/05/12)</span>
                  <hr className={lightLine} />
                  <span>개인 사업자라면 정산 정보를 등록해 주세요!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
  )
}
'use client'

import * as styles from '../index.css'
import { useParams, useRouter } from 'next/navigation'
import Container from '@/components/Container'
import { useEffect, useState } from 'react'
import useAuthStore from '@/store/AuthStore'
import useProfileStore from '@/store/ProfileStore'
import Card from '@/components/Card'

interface VideoData {
  createdAt: string
  isFixed: boolean
  thumbnail: string
  title: string
  videoId: number
  videoLength: number
  videoPlay: number
  videoSerial: number
}

export default function Static() {
  const params = useParams()
  const { profileUserName, profileData, getUserProfileInfo } = useProfileStore()
  const [videos, setVideos] = useState<VideoData[]>([])
  const [totalVideoPlays, setTotalVideoPlays] = useState<number>(0)

  useEffect(() => {
    let encodedUsername = params.username
    // console.log(encodedUsername, profileData)
    encodedUsername = String(encodedUsername).replace(/%3D/g, '')
    const decodedUsername = atob(encodedUsername)
      // decodedUsername이 null인 경우만 initData를 호출
      const initData = async () => {
        // console.log('스트리머 방 관련 정보 가져오기', decodedUsername)
        await getUserProfileInfo(decodedUsername)
      }
      initData()

    if (!profileUserName) {
      initData()
    }
  }, [getUserProfileInfo, profileUserName])

  useEffect(() => {
    if (profileData && profileData.videos) {
      setVideos(profileData.videos)
      const totalPlays = profileData.videos.reduce((total: number, video: VideoData) => total + video.videoPlay, 0)
      setTotalVideoPlays(totalPlays)
    }
  }, [profileData])

  return (
    <Container>
      <div className={styles.title}>
        통계/분석
      </div>
      <div className={styles.contentBox}>
        {/* 통계 요약 */}
        <div className={styles.SummaryContainer}>
            <div className={styles.SummaryItemBox}>
              <div className={styles.itemTitle}>재생 수</div>
              <div>{totalVideoPlays}</div>
            </div>
            <div className={styles.SummaryItemBox}>
              <div className={styles.itemTitle}>전체 시청자 수</div>
              <div>{totalVideoPlays}</div>
            </div>
            <div className={styles.SummaryItemBox}>
              <div className={styles.itemTitle}>평균 시청자 수</div>
              <div>1</div>
            </div>
            <div className={styles.SummaryItemBox}>
              <div className={styles.itemTitle}>최대 시청자 수</div>
              <div>2</div>
            </div>
        </div>

        {/* Streaming list */}
    
        <div className={styles.contentBox}>
          <div className={styles.subtitle}>스트리밍</div>
          <Card>
            <div className={styles.streamingTitleContentBox}>
              <div className={styles.streamingTableRow}>
                <div className={styles.itemTitle}>영상</div>
              </div>
              <div className={styles.streamingTableRow}>
                <div className={styles.itemTitle}>재생 수</div>
              </div>
              <div className={styles.streamingTableRow}>
                <div className={styles.itemTitle}>전체 시청자 수</div>
              </div>
            </div>
            <div className={styles.streamingContentBox}>
              {videos.map((video, index) => (
                  <div key={video.videoId} className={styles.streamingContentRowItem}>
                    <div className={styles.streamingTableRow}>
                      <div className={styles.streamingTableLeftRow}>
                        <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
                        <div className={styles.videoInfo}>
                          <div>{video.title}</div>
                          <div className={styles.videoBonusInfo}>조회수 {video.videoPlay}회 · {Math.ceil((new Date().getTime() - new Date(video.createdAt).getTime()) / (1000 * 60 * 60 * 24))}일 전</div>
                        </div>
                      </div>
                    </div>
                      <div className={styles.streamingTableRow}>
                        <div className={styles.streamingTableRightItem}>{video.videoPlay}</div>
                      </div>
                      <div className={styles.streamingTableRow}>
                        <div className={styles.streamingTableRightItem}>{video.videoPlay}</div>
                    </div>
                  </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Container>
  )
}
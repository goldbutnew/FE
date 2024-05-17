'use client'

import Container from '@/components/Container'
import useStreamingStore from '@/store/StreamingStore'
import Hls from 'hls.js'
import React, { useEffect, useRef, useState } from 'react'
import * as styles from './index.css'
import ViewerStreaming from '../ViewerStreaming'
import ProfileImage from '@/components/ProfileImg'
import SmallButton from '@/components/Button/SmallButton'
import useAuthStore from '@/store/AuthStore'
import { useParams, useRouter } from 'next/navigation'
import { vars } from '@/styles/vars.css'
import useProfileStore from '@/store/ProfileStore'

export default function RecordedVideo() {
  const { isPlaying, setIsPlaying } = useStreamingStore()
  const [chunk, setChunk] = useState(0)
  const [resolution, setResolution] = useState<'auto' | number>('auto')
  const videoRef: React.RefObject<HTMLVideoElement> = useRef(null)
  const hls = useRef<Hls | null>(null)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const params = useParams()

  const encodedUsername = String(params.username).replace(/%3D/g, '')
  const videoSerial = params.videoSerial

  const syncPlayPause = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.play()
    } else {
      videoElement.pause()
    }
  }

  useEffect(() => {
    syncPlayPause()
  }, [isPlaying])

  const loadStream = (resolution: 'auto' | number) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (hls.current) {
      hls.current.destroy()
    }

    hls.current = new Hls({
      maxBufferLength: 30,
      maxMaxBufferLength: 60,
      maxBufferSize: 60 * 1000 * 1000, // 60MB
      maxBufferHole: 0.5,
      startFragPrefetch: true,
      enableWorker: true,
      startLevel: resolution === 'auto' ? -1 : resolution,
    })

    hls.current.loadSource(`https://vingving.s3.ap-northeast-2.amazonaws.com/files//master_${encodedUsername}_${videoSerial}.m3u8`)
    hls.current.attachMedia(videoElement)

    hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
      videoElement.play()
    })

    hls.current.on(Hls.Events.FRAG_LOADED, (event, data) => {
      setChunk(data.frag.stats.total)
      if (data.frag.sn === 0) { // 첫 번째 프래그먼트가 로드되었을 때
        videoElement.currentTime = 0 // 비디오를 처음부터 재생
      }
    })

    hls.current.on(Hls.Events.ERROR, (event, data) => {
      console.error('Hls.js 오류 발생:', data)
      setError(`Hls.js 오류 발생: ${data.details}`)
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.error('네트워크 오류 발생 - 재시도')
            hls.current.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.error('미디어 오류 발생 - 복구 시도')
            hls.current.recoverMediaError()
            break
          default:
            hls.current.destroy()
            break
        }
      }
    })

    if (resolution !== 'auto') {
      hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
        hls.current.currentLevel = resolution
      })
    }

    videoElement.onloadedmetadata = () => {
      videoElement.currentTime = 0
    }
  }

  useEffect(() => {
    loadStream(resolution)
  }, [resolution])

  const [loading, setLoading] = useState(false)
  const { userData } = useAuthStore()
  const { streamRoomData, setIsStreamerFollowed, isStreamerFollowed } = useStreamingStore()
  const { streamerProfileData, streamerUserName, getStreamerProfileInfo, doFollowUser, unDoFollowUser } = useProfileStore()
  const [subscriberCount, setSubscriberCount] = useState(streamerProfileData.followers || 0)
  const [isFollowed, setIsFollowed] = useState(streamerProfileData.isFollowed)

  const streamKey = `${streamRoomData.username}_${streamRoomData.roomId}`
  console.log('-------여기는 스트리머 방 페이지 팔로잉 팔로우 확인용')

  const loginUserName = userData.username

  const toggleFollow = () => {
    setLoading(true)

    if (isFollowed) {
      setIsFollowed(false)
      setIsStreamerFollowed(false)
      setSubscriberCount(subscriberCount - 1)
      unDoFollowUser(streamerUserName)
    } else {
      setIsFollowed(true)
      setIsStreamerFollowed(true)
      setSubscriberCount(subscriberCount + 1)
      doFollowUser(streamerUserName)
    }
    setLoading(true)
  }

  useEffect(() => {
    let encodedUsername = params.username
    console.log(encodedUsername)
    encodedUsername = String(encodedUsername).replace(/%3D/g, '')
    const decodedUsername = atob(encodedUsername)
      // decodedUsername이 null인 경우만 initData를 호출
      const initData = async () => {
        console.log('스트리머 방 관련 정보 가져오기', decodedUsername)
        await getStreamerProfileInfo(decodedUsername)
        setLoading(true)
      }
      initData()
    console.log(streamerUserName, decodedUsername, '의 방입니다^^^^^^^^')
  }, [getStreamerProfileInfo])

  useEffect(() => {
    setLoading(true)
    if (streamerProfileData) {
      setIsFollowed(streamerProfileData.isFollowed || false)
      setIsStreamerFollowed(streamerProfileData.isFollowed || false)
      // 팔로우가 된 상태라면
      // 맨 처음에 팔로우 안 되어 있으면 자동으로 false
    }
  }, [streamerProfileData])

  return (
    <Container>
      <video
        className={styles.videoResize}
        ref={videoRef}
        autoPlay={true}
        muted={true}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls
      />
      <div>
        <button onClick={() => setResolution('auto')}>Auto</button>
        <button onClick={() => setResolution(0)}>240p</button>
        <button onClick={() => setResolution(1)}>360p</button>
        <button onClick={() => setResolution(2)}>480p</button>
        <button onClick={() => setResolution(3)}>720p</button>
        <button onClick={() => setResolution(4)}>1080p</button>
      </div>
      <div className={styles.streamerInfoContainer}>
        <div className={styles.leftBoxContainer}>
          <ProfileImage url={streamerProfileData.photoUrl} width={80} alt={"User profile"}/>
          <div className={styles.leftBox}>
            <div className={styles.leftBoxItem}>
              <div className={styles.streamingTitle}>{streamRoomData.title}</div>
            </div>
            <div className={styles.leftBoxItem}>
              <div className={styles.streamerName}>{streamerProfileData.nickname}</div>    
            </div>  
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.rightBoxItme}>
            {`${streamerUserName}` === loginUserName ? (
              <SmallButton text='채널관리' color={vars.colors.gray} onClick={() => router.push(`/setting/${loginUserName}`)} />
            ) : (
                  <SmallButton
                    text={isFollowed ? '팔로잉' : '팔로우'}
                    color={isFollowed ? 'lightGray' : 'black'}
                    onClick={() => {toggleFollow()}}
                  />
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

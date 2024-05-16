'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import useStreamingStore from '@/store/StreamingStore'

import VideoPlayer from '@/components/StreamingVideo/Player'
import Abs from './Abs'
import * as styles from './index.css'


export default function StreamingVideo({ streamKey }) {
  const { isPlaying, setIsPlaying } = useStreamingStore()
  const [ resolution, setResolution ] = useState<'auto' | number>('auto')
  const [ speed, setSpeed ] = useState<number>(0)
  const [ chunk, setChunk ] = useState(0)
  const [ buffer, setBuffer ] = useState(0)
  const [ isHovering, setIsHovering ] = useState(false)
  const [ isMouseMoving, setIsMouseMoving ] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef: React.RefObject<HTMLVideoElement> = useRef(null)
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null)
  const hls = useRef<Hls | null>(null)

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

  useEffect(() => {
    const checkBufferStatus = () => {
      if (videoRef.current === null) {
        return 0
      } else {
        const buffered = videoRef.current.buffered
        const currentTime = videoRef.current.currentTime
        let bufferEnd = 0

        // 현재 재생 시간 이후로 버퍼링된 구간을 찾음
        for (let i = 0; i < buffered.length; i++) {
          if (buffered.start(i) <= currentTime && currentTime < buffered.end(i)) {
            bufferEnd = buffered.end(i)
            break
          }
        }

        // 버퍼링된 길이 계산
        const bufferedAhead = bufferEnd - currentTime
        console.log(`Buffered ahead time: ${bufferedAhead} seconds.`)
        return bufferedAhead
      }
    }

    setBuffer(checkBufferStatus())

    const definePosition = () => {
      if (!hls.current) return
      let evaluateThisRate = chunk / speed
      const currentLevel = hls.current.currentLevel
      const maxLevel = hls.current.levels.length - 1
      if (evaluateThisRate < buffer && currentLevel < maxLevel) {
        hls.current.currentLevel = currentLevel + 1
      } else if (evaluateThisRate > buffer && currentLevel > 0) {
        hls.current.currentLevel = currentLevel - 1
      }
    }

    if (resolution === 'auto') {
      definePosition()
    } else {
      if (hls.current) {
        hls.current.currentLevel = resolution
      }
    }
  }, [speed])

  useEffect (() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (Hls.isSupported()) {
      hls.current = new Hls()
      hls.current.loadSource(`https://vingving.s3.ap-northeast-2.amazonaws.com/files//master_${streamKey}.m3u8`)
      hls.current.attachMedia(videoElement)
      hls.current.on(Hls.Events.MANIFEST_PARSED, () => videoElement.play())

      hls.current.on(Hls.Events.FRAG_LOADED, (event, data) => {
        setChunk(data.frag.stats.total)
      })

      hls.current.on(Hls.Events.ERROR, (event, data) => {
        console.error('Hls.js 오류 발생:', data)
      })
    }
  }, [])

  // hover timer 코드
  const handleMouseEnter = () => {
    setIsHovering(true)
    resetHideControlsTimer()
  }

  const handleMouseLeave = () => setIsHovering(false)

  const handleMouseMove = () => {
    setIsMouseMoving(true)
    resetHideControlsTimer()
  }

  const resetHideControlsTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setIsMouseMoving(false)
    }, 3000)
  }

  const handleFullscreenChange = () => {
    const fullscreenElement = document.fullscreenElement
    if (fullscreenElement) {
      setIsHovering(false)
    }
  }

  useEffect(() => {
    const videoContainer = containerRef.current
    if (videoContainer) {
      videoContainer.addEventListener('mousemove', handleMouseMove)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener('mousemove', handleMouseMove)
      }
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])


  return (
    // videoResize 하나로 줄여보기
    <div className={styles.videoResize} ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video
        className={styles.videoResize}
        ref={videoRef}
        autoPlay={true}
        muted={true}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className={(isHovering || isMouseMoving) ? styles.playerHoverVisible : styles.playerHover}>
        <VideoPlayer containerRef={containerRef} videoRef={videoRef} setResolution={setResolution}/>
      </div>
      <Abs setSpeed = {setSpeed}/>
    </div>
  )
}

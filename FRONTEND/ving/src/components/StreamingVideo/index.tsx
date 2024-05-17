'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Hls, { HlsConfig, ErrorData, ErrorDetails } from 'hls.js'
import useStreamingStore from '@/store/StreamingStore'

import VideoPlayer from '@/components/StreamingVideo/Player'
import Abs from './Abs'
import * as styles from './index.css'

interface StreamingVideoProps {
  streamKey: string
}

const StreamingVideo: React.FC<StreamingVideoProps> = ({ streamKey }) => {
  const { isPlaying, setIsPlaying } = useStreamingStore()
  const [ resolution, setResolution ] = useState<'auto' | number>('auto')
  const [ speed, setSpeed ] = useState<number>(0)
  const [ chunk, setChunk ] = useState<number>(0)
  const [ buffer, setBuffer ] = useState<number>(0)
  const [ isHovering, setIsHovering ] = useState<boolean>(false)
  const [ isMouseMoving, setIsMouseMoving ] = useState<boolean>(true)
  const [ isStreamLoaded, setIsStreamLoaded ] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef: React.RefObject<HTMLVideoElement> = useRef(null)
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null)
  const hls = useRef<Hls | null>(null)

  useEffect(() => {
    console.log(isStreamLoaded, 'dasdadssadadsdsda')
  }, [isStreamLoaded])

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

    const hlsConfig: Partial<HlsConfig> = {}
    hls.current = new Hls(hlsConfig)
    hls.current.loadSource(`https://vingving.s3.ap-northeast-2.amazonaws.com/files//master_${streamKey}.m3u8`)
    hls.current.attachMedia(videoElement)

    hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
      videoElement.play()
      setIsStreamLoaded(true)
    })

    hls.current.on(Hls.Events.FRAG_LOADED, (_event, data) => {
      setChunk(data.frag.stats.total)
    })

    hls.current.on(Hls.Events.ERROR, (_event, data: ErrorData) => {
      if (data.details === ErrorDetails.MANIFEST_LOAD_ERROR || data.details === ErrorDetails.MANIFEST_LOAD_TIMEOUT) {
        console.error('M3U8 파일을 로드할 수 없습니다. 스트림이 아직 생성되지 않았을 수 있습니다.')
        setIsStreamLoaded(false)
      } else {
        console.error('Hls.js 오류 발생:', data)
      }
    })

    if (resolution !== 'auto') {
      hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
        if (hls.current) {
          hls.current.currentLevel = resolution
        }
      })
    }
  }

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

  useEffect(() => {
    loadStream(resolution)
  }, [resolution, streamKey])

  useEffect(() => {
    if (resolution === 'auto') {
      definePosition()
    }
  }, [speed, resolution])

  useEffect(() => {
    const checkBufferStatus = (): number => {
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
  }, [speed])

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
  
const intervalRef = useRef<NodeJS.Timeout | null>(null)

useEffect(() => {
  intervalRef.current = setInterval(() => {
    loadStream('auto') // 필요한 경우 'auto' 대신 원하는 resolution을 전달
  }, 5000) // 5초 주기로 loadStream 함수를 호출

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // 컴포넌트 언마운트 시 반복 중지
    }
  }
}, []) // 빈 배열로 한 번만 설정

useEffect(() => {
  if (isStreamLoaded && intervalRef.current) {
    clearInterval(intervalRef.current) // isStreamLoaded가 true가 되면 반복 중지
  }
}, [isStreamLoaded])


  return (
    <div className={styles.videoResize} ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video
        className={styles.videoResize}
        ref={videoRef}
        autoPlay
        muted
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className={(isHovering || isMouseMoving) ? styles.playerHoverVisible : styles.playerHover}>
        <VideoPlayer containerRef={containerRef} videoRef={videoRef} setResolution={setResolution} />
      </div>
      <Abs setSpeed={setSpeed}/>
    </div>
  )
}

export default StreamingVideo

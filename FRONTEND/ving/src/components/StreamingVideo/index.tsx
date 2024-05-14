'use client'

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import useStreamingStore from '@/store/StreamingStore'

import VideoPlayer from '@/components/StreamingVideo/Player'
import * as styles from './index.css'

export default function StreamingVideo() {
  const { isPlaying, setIsPlaying } = useStreamingStore()
  const [ resolution, setResolution ] = useState(0)
  const videoRef:React.RefObject<HTMLVideoElement> = useRef(null)
  const containerRef = useRef(null)

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
    const videoElement = videoRef.current

    const setupHls = (element, src) => {
      if (Hls.isSupported() && element) {
        const hls = new Hls({
          liveSyncDurationCount: 2,
          maxLatency: 2,
          highLatency: 3
      })
        
        console.log(src)

        hls.loadSource(src)
        hls.attachMedia(element)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          element.play()
        })
        return hls
      }
    }

    const hlsVideo = setupHls(videoElement, `https://vingving.s3.ap-northeast-2.amazonaws.com/master.m3u8`)

    return () => {
      if (hlsVideo) hlsVideo.destroy()
    }
  }, [resolution])

  return (
    <div className={styles.videoResize} ref={containerRef}>
      <video
        className={styles.videoResize}
        ref={videoRef}
        autoPlay={true}
        muted={true}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <VideoPlayer containerRef={containerRef} videoRef={videoRef} setResolution={setResolution}/>
    </div>
  )
}
